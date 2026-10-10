---
slug: stripe-webhooks-cloudflare-workers
title: "Stripe webhooks on Cloudflare Workers: signature verification, queues and idempotency"
seoTitle: Stripe Webhooks on Cloudflare Workers: A Production Guide
description: Handle Stripe webhooks on Cloudflare Workers properly: verify signatures with Web Crypto, acknowledge fast, process in Queues, dedupe events and survive retries.
capsule: A production Stripe webhook on Cloudflare Workers does four things: verifies the signature against the raw body, acknowledges in milliseconds, hands the work to a queue, and processes each event idempotently. Full TypeScript code below.
date: 2026-10-10
rank: 3
tags:
  - Cloudflare Workers
  - Stripe
  - Cloudflare Queues
  - Webhooks
takeaways:
  - Verify with constructEventAsync and Stripe's SubtleCrypto provider, against the raw request body.
  - Return 200 as soon as the event is verified and queued. Do the real work in a Queues consumer.
  - Stripe delivers at least once and not always in order. Dedupe by event ID and re-fetch the object from Stripe before writing.
  - Give the queue a dead-letter queue, so a failing event is parked for inspection instead of lost.
---

Stripe webhooks look simple: Stripe sends a POST, you update your database. In production, three things go wrong. Signatures fail because the body was parsed before verification. Slow handlers time out and Stripe retries, so the same event is processed twice. And events arrive out of order, so a stale `customer.subscription.updated` overwrites a newer one.

Cloudflare Workers are a good fit for webhook receivers, which I covered in [12 production patterns for Workers](/blog/cloudflare-workers-use-cases). This guide builds one properly: a Worker that verifies, queues and idempotently processes Stripe events, using Cloudflare Queues and D1.

## What a production webhook receiver must do

1. **Verify the signature** against the exact bytes Stripe sent.
2. **Acknowledge fast.** Return a 2xx within a second or two, before any slow work.
3. **Process asynchronously**, with retries that don't depend on Stripe resending.
4. **Process idempotently.** The same event twice must have the same effect as once.
5. **Tolerate ordering.** Never assume `created` arrives before `updated`.

The architecture is one Worker with two handlers: `fetch` receives and verifies, then sends the event ID to a queue; `queue` consumes, re-fetches from Stripe and writes to the database.

## Project setup

Create the Worker and install the Stripe SDK. The Stripe Node library runs on Workers when you give it a fetch-based HTTP client and the Web Crypto provider.

```bash
npm create cloudflare@latest billing-webhooks -- --type=hello-world --lang=ts
cd billing-webhooks
npm install stripe
npx wrangler d1 create billing
npx wrangler queues create stripe-events
npx wrangler queues create stripe-events-dlq
```

Then wire the bindings. The consumer settings matter: `max_retries` and `dead_letter_queue` decide what happens to an event that keeps failing.

```jsonc title="wrangler.jsonc"
{
  "name": "billing-webhooks",
  "main": "src/index.ts",
  "compatibility_date": "2026-09-01",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [
    { "binding": "DB", "database_name": "billing", "database_id": "<your-database-id>" }
  ],
  "queues": {
    "producers": [{ "binding": "STRIPE_EVENTS", "queue": "stripe-events" }],
    "consumers": [
      {
        "queue": "stripe-events",
        "max_batch_size": 10,
        "max_retries": 5,
        "dead_letter_queue": "stripe-events-dlq"
      }
    ]
  }
}
```

## The database tables

Two tables: one records which events have been processed, one holds the subscription state your app reads.

```sql title="migrations/0001_billing.sql"
CREATE TABLE processed_stripe_events (
  event_id     TEXT PRIMARY KEY,
  type         TEXT NOT NULL,
  processed_at INTEGER NOT NULL
);

CREATE TABLE subscriptions (
  stripe_subscription_id TEXT PRIMARY KEY,
  stripe_customer_id     TEXT NOT NULL,
  status                 TEXT NOT NULL,
  price_id               TEXT,
  synced_at              INTEGER NOT NULL
);
```

Apply it locally and remotely with `npx wrangler d1 migrations apply billing --local` and `--remote`.

## Step 1: verify the signature on Workers

The most common bug is calling `request.json()` before verifying. Stripe signs the raw bytes; any re-serialisation changes them and the check fails. Read the body once with `request.text()` and pass that string to the SDK.

On Workers, use the async variant, `constructEventAsync`, with `Stripe.createSubtleCryptoProvider()`, because Web Crypto's HMAC is asynchronous.

```ts title="src/index.ts"
import Stripe from 'stripe';

export interface StripeJob {
  eventId: string;
  type: string;
}

export interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  DB: D1Database;
  STRIPE_EVENTS: Queue<StripeJob>;
}

const cryptoProvider = Stripe.createSubtleCryptoProvider();

function stripeClient(env: Env) {
  return new Stripe(env.STRIPE_SECRET_KEY, { httpClient: Stripe.createFetchHttpClient() });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname !== '/webhooks/stripe') return new Response('Not found', { status: 404 });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

    const signature = request.headers.get('stripe-signature');
    if (!signature) return new Response('Missing signature', { status: 400 });

    // Verify the raw body. Parsing JSON first changes the bytes and breaks the signature.
    const payload = await request.text();

    let event: Stripe.Event;
    try {
      event = await stripeClient(env).webhooks.constructEventAsync(
        payload,
        signature,
        env.STRIPE_WEBHOOK_SECRET,
        undefined,
        cryptoProvider,
      );
    } catch {
      return new Response('Invalid signature', { status: 400 });
    }

    // Step 2: acknowledge fast. The consumer does the real work.
    await env.STRIPE_EVENTS.send({ eventId: event.id, type: event.type });
    return new Response(null, { status: 200 });
  },

  async queue(batch: MessageBatch<StripeJob>, env: Env): Promise<void> {
    await processBatch(batch, env);
  },
} satisfies ExportedHandler<Env, StripeJob>;
```

Store the secrets with `npx wrangler secret put STRIPE_SECRET_KEY` and `npx wrangler secret put STRIPE_WEBHOOK_SECRET`. Never commit them to `wrangler.jsonc`.

## Step 2: acknowledge fast, process in a queue

Notice the receiver does almost nothing after verification: it sends a small message and returns 200. That's deliberate. If your handler calls Stripe, writes to a database and sends an email inline, a slow dependency makes Stripe's request time out. Stripe then retries, and you process the event twice, or it eventually marks your endpoint as failing.

If `send` throws (rare, but possible), the Worker returns a 500, Stripe retries the delivery later, and nothing is lost. Stripe keeps retrying failed deliveries for up to three days in live mode.

I only enqueue the event ID and type, not the whole payload. The consumer re-fetches the event from Stripe, which keeps messages small and means the data you act on is authoritative.

## Step 3: process idempotently

Stripe delivers events at least once, and Cloudflare Queues also delivers at least once. Duplicates are normal, so the consumer has to make them harmless. Two layers do that:

1. **Skip events already processed**, using the `processed_stripe_events` table.
2. **Make each handler idempotent anyway**, using upserts keyed on Stripe IDs, so even a duplicate that slips past layer one writes the same row.

```ts title="src/process.ts"
import Stripe from 'stripe';
import type { Env, StripeJob } from './index';

export async function processBatch(batch: MessageBatch<StripeJob>, env: Env) {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, { httpClient: Stripe.createFetchHttpClient() });

  for (const message of batch.messages) {
    const { eventId } = message.body;
    try {
      const seen = await env.DB
        .prepare('SELECT 1 FROM processed_stripe_events WHERE event_id = ?')
        .bind(eventId)
        .first();
      if (seen) {
        message.ack();
        continue;
      }

      const event = await stripe.events.retrieve(eventId);
      await handleEvent(event, env, stripe);

      await env.DB
        .prepare('INSERT INTO processed_stripe_events (event_id, type, processed_at) VALUES (?, ?, ?) ON CONFLICT(event_id) DO NOTHING')
        .bind(event.id, event.type, Date.now())
        .run();
      message.ack();
    } catch (error) {
      console.error('Stripe event failed', eventId, error);
      // Back off: 60s, 120s, 240s… capped at 15 minutes. After max_retries it goes to the DLQ.
      message.retry({ delaySeconds: Math.min(30 * 2 ** message.attempts, 900) });
    }
  }
}
```

Acknowledging each message individually matters. If one event in a batch of ten fails, only that one is retried; the other nine aren't processed again.

## Step 4: handle out-of-order events

Stripe doesn't guarantee delivery order. A `customer.subscription.updated` can arrive before the `customer.subscription.created` for the same subscription, or an older update can arrive after a newer one.

The simplest robust fix: **don't write the object from the event payload. Re-fetch the current object from Stripe and write that.** Whatever order events arrive in, the last write reflects Stripe's current state.

```ts title="src/process.ts (continued)"
async function handleEvent(event: Stripe.Event, env: Env, stripe: Stripe) {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      if (session.mode === 'subscription' && typeof session.subscription === 'string') {
        await syncSubscription(session.subscription, env, stripe);
      }
      break;
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      await syncSubscription(event.data.object.id, env, stripe);
      break;
    case 'invoice.payment_failed':
      // Tell the customer: enqueue an email job rather than sending inline.
      break;
    default:
      // Acknowledge events you don't handle; don't fail them.
      break;
  }
}

async function syncSubscription(subscriptionId: string, env: Env, stripe: Stripe) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;

  await env.DB
    .prepare(
      `INSERT INTO subscriptions (stripe_subscription_id, stripe_customer_id, status, price_id, synced_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(stripe_subscription_id) DO UPDATE SET
         status = excluded.status,
         price_id = excluded.price_id,
         synced_at = excluded.synced_at`,
    )
    .bind(subscription.id, customerId, subscription.status, subscription.items.data[0]?.price.id ?? null, Date.now())
    .run();
}
```

Re-fetching costs one Stripe API call per event, which is well worth it at MVP and early-growth volume. At very high volume you can compare the event's `created` timestamp against a stored one instead, and skip anything older.

## Which Stripe events to subscribe to

Subscribe only to the events you handle. Fewer events mean fewer invocations and less noise in your logs. For a typical subscription SaaS:

| Event | Why you need it |
|---|---|
| `checkout.session.completed` | A customer finished Checkout; link the subscription to your user |
| `customer.subscription.created` | A subscription exists, including ones created outside Checkout |
| `customer.subscription.updated` | Plan changes, trials ending, cancellations scheduled |
| `customer.subscription.deleted` | Access should end |
| `invoice.paid` | Renewal succeeded; useful for receipts and usage resets |
| `invoice.payment_failed` | Card declined; start your dunning email |

## Testing locally with the Stripe CLI

Run the Worker locally, then forward test events to it with the Stripe CLI:

```bash
npx wrangler dev
# in another terminal
stripe listen --forward-to localhost:8787/webhooks/stripe
stripe trigger checkout.session.completed
```

`stripe listen` prints a signing secret starting with `whsec_`. Put it, and a test-mode secret key, in `.dev.vars` (which stays out of git):

```bash title=".dev.vars"
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Wrangler runs the queue consumer locally too, so you can watch the whole path (verify, enqueue, consume, write) in one terminal.

## Deploying and going live

1. `npx wrangler deploy`
2. In the Stripe Dashboard, add an endpoint pointing at `https://<your-worker>/webhooks/stripe` and select only the events above.
3. Copy that endpoint's signing secret into `npx wrangler secret put STRIPE_WEBHOOK_SECRET`. Each endpoint has its own secret, and test and live mode secrets differ.
4. Send a test event from the Dashboard and check the Worker's logs.

## Monitoring and replaying failed events

After `max_retries`, a failing message moves to `stripe-events-dlq` instead of disappearing. A dead-letter queue is an ordinary queue, so you can attach a small consumer that logs and alerts, or drain it by hand once you've fixed the bug, re-sending each `eventId` to the main queue. Because processing is idempotent, replaying is safe.

On the Stripe side, the Dashboard shows every delivery attempt per endpoint and lets you resend individual events, which is useful when you're debugging a single customer.

I go deeper on retries, backoff and dead-letter queues in [Cloudflare Queues in production](/blog/cloudflare-queues-retries-dead-letter-queues).

## A checklist before you ship

- Signature verified against `request.text()`, never parsed JSON
- Separate signing secrets for test and live mode, stored with `wrangler secret`
- Receiver returns 200 only after the event is safely queued
- Consumer acks per message, with backoff on retry
- `processed_stripe_events` dedupe plus idempotent upserts
- Objects re-fetched from Stripe before writing
- Dead-letter queue configured and watched
- Only the events you handle are enabled on the endpoint

Billing is one of the parts of an MVP I most often see built quickly and then rebuilt. If you'd rather have it right the first time, it's part of what I set up in a [14-day MVP build](/pricing).

## Frequently asked questions

### Why does Stripe signature verification fail on Cloudflare Workers?

Almost always because the body was parsed before verification, or the synchronous `constructEvent` was used. Read the body with `request.text()` and verify it with `constructEventAsync` and `Stripe.createSubtleCryptoProvider()`.

### Do I need a queue for Stripe webhooks?

For a toy project, no. In production, yes: a queue lets you return 200 to Stripe immediately and retry your own processing with backoff, independently of Stripe's retry schedule.

### How do I stop processing the same Stripe event twice?

Record each processed event ID in a table and skip IDs you've seen, and make each handler an upsert keyed on Stripe object IDs so a duplicate writes the same result.

### Can I use the Stripe Node library on Cloudflare Workers?

Yes. Pass `Stripe.createFetchHttpClient()` as the HTTP client, and use the async webhook verification with the SubtleCrypto provider.
