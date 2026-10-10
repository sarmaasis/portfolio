---
slug: cloudflare-queues-retries-dead-letter-queues
title: "Cloudflare Queues in production: retries, dead-letter queues and idempotency"
seoTitle: Cloudflare Queues in Production: Retries, DLQs, Idempotency
description: How to run Cloudflare Queues reliably: batching, per-message ack and retry, exponential backoff, dead-letter queues, idempotency keys and replaying failures.
capsule: Cloudflare Queues delivers at least once, so a production consumer acks each message individually, retries with backoff, sends repeat failures to a dead-letter queue and makes every job idempotent. Here is the setup I use, with code.
date: 2026-10-10
rank: 6
tags:
  - Cloudflare Queues
  - Cloudflare Workers
  - Backend architecture
takeaways:
  - Queues is at-least-once delivery. Design every consumer to be safe when a message arrives twice.
  - Ack and retry per message, not per batch, so one bad message doesn't replay nine good ones.
  - Use message.attempts for exponential backoff, and cap it.
  - Configure a dead-letter queue on every consumer. Without one, a message that exhausts its retries is gone.
---

A queue is what turns "the user waited while we called three slow APIs" into "the user got a response in 50 ms and the slow work happened anyway". On Cloudflare, that's Queues: a producer binding in any Worker, and a consumer Worker that receives messages in batches.

I've used Queues in production as a reliability boundary, for example to keep background work off donor-facing requests on [a platform serving 4M+ API requests a day](/work/whydonate-api-scale). The API is small, but the defaults won't make your system reliable on their own. This is what does.

## When to use a queue at all

Move work behind a queue when it doesn't need to finish before the user gets a response, and when it can fail or be slow:

- Sending email and notifications
- Processing webhook follow-ups ([Stripe webhooks are a good example](/blog/stripe-webhooks-cloudflare-workers))
- Updating a search index after a write
- Calling slow or rate-limited partner APIs
- Generating exports, reports and thumbnails
- Fan-out: one event that triggers several independent jobs

Don't use a queue when the user needs the result in the response, or when you need strict ordering across all messages. Queues doesn't promise global ordering.

## The delivery guarantee you're designing for

Cloudflare Queues gives **at-least-once delivery**. Every message is delivered, but a message can occasionally be delivered more than once, for example when a consumer processes it and then fails before the ack is recorded.

That single fact drives everything below. Your consumer must be **idempotent**: processing a message twice must leave the system in the same state as processing it once.

## Producer: send small, self-describing messages

```ts title="producer.ts"
interface EmailJob {
  kind: 'welcome-email';
  userId: string;
  idempotencyKey: string;
}

export default {
  async fetch(request: Request, env: { JOBS: Queue<EmailJob> }) {
    const { userId } = await request.json<{ userId: string }>();

    await env.JOBS.send({
      kind: 'welcome-email',
      userId,
      idempotencyKey: `welcome-email:${userId}`,
    });

    return Response.json({ ok: true }, { status: 202 });
  },
};
```

Three habits pay off:

- **Send IDs, not snapshots.** The consumer loads current data when it runs. A message holding a full record can be stale by the time it's processed, and messages are capped at 128 KB anyway.
- **Include a `kind`.** One queue can carry several job types, and the consumer can route on it.
- **Include an idempotency key** derived from the business action, not a random UUID, so retries and duplicates share a key.

Use `sendBatch` when one request produces many jobs; it's one call instead of many.

## Consumer configuration

These settings live on the consumer in your Wrangler config:

```jsonc title="wrangler.jsonc"
{
  "queues": {
    "producers": [{ "binding": "JOBS", "queue": "jobs" }],
    "consumers": [
      {
        "queue": "jobs",
        "max_batch_size": 10,
        "max_batch_timeout": 5,
        "max_retries": 5,
        "dead_letter_queue": "jobs-dlq"
      }
    ]
  }
}
```

- `max_batch_size`: how many messages a single invocation receives.
- `max_batch_timeout`: how many seconds to wait to fill a batch before delivering a partial one. Lower means lower latency; higher means fewer invocations.
- `max_retries`: how many times a message is retried before it's given up on.
- `dead_letter_queue`: where messages go when they exhaust their retries. Create it with `npx wrangler queues create jobs-dlq`.

## Ack and retry each message individually

By default, if your `queue()` handler throws, the **whole batch** is retried, including the messages that succeeded. With side effects like sending email, that means duplicates. Handle each message explicitly instead:

```ts title="consumer.ts"
export default {
  async queue(batch: MessageBatch<EmailJob>, env: Env): Promise<void> {
    for (const message of batch.messages) {
      try {
        await runJob(message.body, env);
        message.ack();
      } catch (error) {
        console.error('job failed', { id: message.id, attempts: message.attempts, error });
        message.retry({ delaySeconds: backoff(message.attempts) });
      }
    }
  },
};

// 30s, 60s, 120s, 240s… capped at 15 minutes.
function backoff(attempts: number) {
  return Math.min(15 * 2 ** attempts, 900);
}
```

`message.attempts` starts at 1 on first delivery and goes up on each retry, which makes it a natural input for exponential backoff. Backoff matters when the failure is a downstream outage or rate limit: retrying instantly just hits the same wall.

If you want to process messages concurrently instead of in sequence, use `Promise.allSettled` over the batch and still ack or retry each message based on its own result.

## Idempotency: make duplicates harmless

There are three common ways to make a job idempotent. Use the first one that fits.

1. **Natural idempotency.** Writes that are upserts keyed on a stable ID ("set subscription X to status Y") are already safe to repeat.
2. **A processed-keys table.** Before running a non-idempotent side effect, check whether its idempotency key has been recorded; record it after success.
3. **Downstream idempotency keys.** Many APIs (payment providers, some email services) accept an idempotency key header. Pass yours through, and the provider dedupes for you.

```ts title="run-job.ts"
async function runJob(job: EmailJob, env: Env) {
  const done = await env.DB
    .prepare('SELECT 1 FROM processed_jobs WHERE key = ?')
    .bind(job.idempotencyKey)
    .first();
  if (done) return;

  const user = await loadUser(env, job.userId);
  await sendWelcomeEmail(env, user, { idempotencyKey: job.idempotencyKey });

  await env.DB
    .prepare('INSERT INTO processed_jobs (key, processed_at) VALUES (?, ?) ON CONFLICT(key) DO NOTHING')
    .bind(job.idempotencyKey, Date.now())
    .run();
}
```

There's still a small window between the side effect and recording the key. That's why the downstream key (option 3) is passed as well: belt and braces for the operations where a duplicate actually hurts.

## Poison messages and permanent failures

Some messages will never succeed: a user that was deleted, a payload from an old schema, a bug. Retrying them five times wastes invocations and delays alerting. Distinguish the two kinds of failure:

```ts
class PermanentError extends Error {}

try {
  await runJob(message.body, env);
  message.ack();
} catch (error) {
  if (error instanceof PermanentError) {
    console.warn('dropping job', message.id, error.message);
    message.ack(); // or forward to the DLQ yourself with env.JOBS_DLQ.send(...)
  } else {
    message.retry({ delaySeconds: backoff(message.attempts) });
  }
}
```

Throw `PermanentError` for validation failures and missing records; let everything else retry.

## Dead-letter queues: where failures go to be fixed

A dead-letter queue (DLQ) is just another queue. When a message exhausts `max_retries`, Queues moves it there instead of deleting it. Without a DLQ configured, the message is dropped.

Two ways to work with it:

- **Alerting consumer.** Attach a small consumer to the DLQ that logs each message with context and pings you (email, Slack, an incident tool). Don't let it retry; just record and ack.
- **Manual replay.** After fixing the bug, drain the DLQ and re-send messages to the main queue. Because jobs are idempotent, replaying a message that partly succeeded is safe.

```ts title="dlq-replay.ts"
export default {
  async queue(batch: MessageBatch<EmailJob>, env: { JOBS: Queue<EmailJob>; REPLAY: string }) {
    for (const message of batch.messages) {
      if (env.REPLAY === 'on') {
        await env.JOBS.send(message.body);
      } else {
        console.error('dead letter', JSON.stringify(message.body));
      }
      message.ack();
    }
  },
};
```

A feature flag variable (`REPLAY`) lets the same consumer switch from "record" to "replay" with a config change.

## Observability: what to log

Log enough to answer "what happened to job X?" without opening the code:

- The message ID, `attempts` and the job's idempotency key on every failure
- The job `kind` and the entity ID (user, order, subscription)
- Duration of the job, to spot downstream slowdowns before they become timeouts

Watch the queue's backlog in the Cloudflare dashboard. A growing backlog means consumers can't keep up, usually because a downstream dependency got slow.

## Production checklist

- Every consumer has a `dead_letter_queue`
- Messages carry IDs, a `kind` and an idempotency key, not full snapshots
- Each message is acked or retried individually
- Retries use exponential backoff from `message.attempts`, with a cap
- Permanent errors are acked (or forwarded), not retried
- Side effects are idempotent, with downstream idempotency keys where available
- Failures are logged with message ID, attempts and entity ID
- DLQ has an alerting consumer and a replay path

Queues is one of the pieces that keeps a Cloudflare-first backend simple: Workers own request paths, Queues own anything that can wait. I covered how the pieces fit together in [Cloudflare-first backend architecture](/blog/cloudflare-workers-queues-r2-planetscale-typesense-backend).

## Frequently asked questions

### Does Cloudflare Queues guarantee exactly-once delivery?

No. Queues guarantees at-least-once delivery, so a message can occasionally arrive more than once. Make consumers idempotent with upserts, a processed-keys table or downstream idempotency keys.

### What happens to a message after max_retries in Cloudflare Queues?

If the consumer has a dead-letter queue configured, the message is moved there. If not, it is dropped. Always configure a DLQ for production consumers.

### How do I add exponential backoff to Cloudflare Queues retries?

Call `message.retry({ delaySeconds })` with a delay computed from `message.attempts`, for example `Math.min(15 * 2 ** message.attempts, 900)`, so each retry waits longer up to a cap.

### Does Cloudflare Queues preserve message order?

Not as a guarantee. If ordering matters for a specific entity, include a version or timestamp in your data and ignore stale updates, or re-read the current state when the job runs.
