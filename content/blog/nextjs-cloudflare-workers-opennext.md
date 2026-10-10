---
slug: nextjs-cloudflare-workers-opennext
title: "Deploying Next.js on Cloudflare Workers with OpenNext: setup, bindings and caching"
seoTitle: Deploy Next.js on Cloudflare Workers with OpenNext
description: How to run a Next.js app on Cloudflare Workers with the OpenNext adapter: setup, Wrangler config, using D1/R2 bindings, ISR caching with R2, and limits to check.
capsule: The OpenNext Cloudflare adapter runs a standard Next.js app, App Router and Node.js runtime included, on Cloudflare Workers. You add a Wrangler config, an OpenNext config and two scripts, then reach D1, R2 and KV through getCloudflareContext. Here is the setup I use for MVPs.
date: 2026-10-10
rank: 5
tags:
  - Next.js
  - Cloudflare Workers
  - OpenNext
takeaways:
  - Use the @opennextjs/cloudflare adapter for new projects; it runs Next.js on Workers with the Node.js runtime via nodejs_compat.
  - Bindings (D1, R2, KV, Queues) are available in route handlers, server components and server actions through getCloudflareContext().env.
  - Configure an incremental cache (R2 is the common choice) so ISR and the data cache persist between requests.
  - Check bundle size and CPU limits for your plan before committing a large app to Workers.
---

Next.js is the frontend I reach for on most MVPs, and Cloudflare Workers is where I prefer to deploy the backend. For a while those two didn't fit together cleanly. The OpenNext Cloudflare adapter changed that: it takes the output of a normal `next build` and runs it on Workers, so the frontend and API live in one deployment, next to D1, R2 and Queues.

This is the setup I use, and the things worth checking before you commit.

> **Check the adapter docs for your version** OpenNext and Next.js both move quickly. The shape below is stable, but confirm package versions and config option names against the current `@opennextjs/cloudflare` documentation.

## Why run Next.js on Workers

- **One deployment.** Pages, route handlers and server actions run in the same Worker as your API logic, with direct access to Cloudflare bindings.
- **Global by default.** Requests are served from Cloudflare's network, close to users.
- **Cheap at low traffic.** A Workers Paid plan starts at $5 a month, which suits an MVP that might get ten users or ten thousand.
- **Cloudflare's platform.** D1, R2, KV, Queues, Durable Objects and Hyperdrive are bindings, not separate services to wire up.

## What the OpenNext adapter does

`@opennextjs/cloudflare` converts a Next.js build into a Worker plus static assets. It targets the **Node.js runtime** (not the more limited Edge runtime), relying on Workers' `nodejs_compat` flag, so most Next.js features and npm packages work as they do on a Node server: App Router, server components, server actions, route handlers, middleware, ISR and image handling.

For new projects, use this adapter rather than the older `@cloudflare/next-on-pages`, which only supported the Edge runtime.

## Setup

Start with a Next.js app (new or existing), then add the adapter and Wrangler:

```bash
npm install @opennextjs/cloudflare@latest
npm install --save-dev wrangler@latest
```

Add a Wrangler config at the project root. `main` points to the Worker the adapter generates, and `assets` serves your static files:

```jsonc title="wrangler.jsonc"
{
  "name": "my-mvp",
  "main": ".open-next/worker.js",
  "compatibility_date": "2026-09-01",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "d1_databases": [
    { "binding": "DB", "database_name": "my-mvp", "database_id": "<your-database-id>" }
  ],
  "r2_buckets": [
    { "binding": "NEXT_INC_CACHE_R2_BUCKET", "bucket_name": "my-mvp-cache" }
  ]
}
```

Add an OpenNext config. This is where caching is set up (more below):

```ts title="open-next.config.ts"
import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
```

Add scripts to `package.json`. `next dev` stays your everyday dev server; `preview` runs the built app in the Workers runtime locally, which is where runtime-specific bugs show up:

```json title="package.json"
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "cf-typegen": "wrangler types --env-interface CloudflareEnv"
  }
}
```

Finally, so bindings also work under `next dev`, initialise the adapter's dev helper in your Next config:

```ts title="next.config.ts"
import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const nextConfig: NextConfig = {};

export default nextConfig;

initOpenNextCloudflareForDev();
```

Add `.open-next` to `.gitignore`, then `npm run preview` to test and `npm run deploy` to ship.

## Using D1, R2 and other bindings in Next.js

Bindings aren't environment variables, so `process.env` won't have them. Get them from the request context:

```ts title="app/api/projects/route.ts"
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET() {
  const { env } = getCloudflareContext();
  const { results } = await env.DB
    .prepare('SELECT id, name FROM projects ORDER BY created_at DESC LIMIT 20')
    .all();
  return Response.json(results);
}
```

The same call works in server components and server actions. Run `npm run cf-typegen` after changing bindings, so `env.DB` and friends are typed.

Keep data access in a small server-only module (`lib/db.ts`) with named functions, and call those from components and routes. It keeps SQL out of your UI code and makes a later database change contained. I compared the database options in [D1 vs Hyperdrive vs PlanetScale](/blog/cloudflare-workers-database-d1-hyperdrive-planetscale).

## Caching and ISR

Next.js caches rendered pages and `fetch` results in its incremental cache. On a Node server that's the local disk; on Workers there's no persistent disk, so you configure where the cache lives. R2 is the usual choice, which is what the config above does with the `NEXT_INC_CACHE_R2_BUCKET` binding.

With an incremental cache in place, `revalidate` and on-demand revalidation (`revalidatePath`, `revalidateTag`) behave as you'd expect. If you rely on tag-based revalidation heavily, the adapter also offers a tag cache and a queue for background revalidation; enable them when you need them, not by default.

For an MVP, the simplest robust approach: render dynamic pages per request, cache only the pages that are genuinely static (marketing pages, docs), and add ISR where you've measured a need.

## Images

`next/image` optimisation needs somewhere to run. Either connect Cloudflare Images through the adapter's image binding, or set `images.unoptimized: true` and serve pre-sized images from R2 or your static assets. For most MVPs, pre-sized images are fine and cost nothing extra.

## Limits to check before you commit

- **Worker size.** Your bundled Worker must fit within the size limit for your plan. Large dependency trees (heavy SDKs, big icon packs) are the usual cause of trouble. Check the size the build reports.
- **CPU time per request.** Workers bill and limit CPU time, not wall time, so waiting on a database is cheap but heavy computation isn't. Move CPU-heavy work (PDF generation, image processing, large data transforms) to a queue or a regional service.
- **Node.js APIs.** `nodejs_compat` covers most of what Next.js and common libraries use, but packages with native binaries won't run. Check unusual dependencies with `npm run preview` early.

## When not to use Workers for Next.js

- The app depends on packages with native binaries or a long-running server process.
- You need very long requests or heavy server-side computation on most routes.
- The team is deeply invested in another platform's features and the app is already running fine there.

None of these stop you using Cloudflare for the rest of the backend: a Next.js app hosted elsewhere can still call Workers APIs, Queues and R2.

## A deployment checklist

- `compatibility_flags` includes `nodejs_compat`, and the compatibility date is recent
- `.open-next` is in `.gitignore`
- Bindings are typed with `wrangler types`
- An incremental cache is configured if you use ISR or the data cache
- Secrets are set with `wrangler secret put`, not committed
- `npm run preview` passes before the first `deploy`
- Bundle size is comfortably under your plan's limit

This is the stack behind most of my [14-day MVP builds](/pricing): Next.js on the front, TypeScript on Workers behind it, with D1 or Postgres, Queues for anything slow and R2 for files. If you're deciding what goes where, [12 Cloudflare Workers use cases](/blog/cloudflare-workers-use-cases) is a good next read.

## Frequently asked questions

### Can I run Next.js on Cloudflare Workers?

Yes. The OpenNext Cloudflare adapter (`@opennextjs/cloudflare`) runs Next.js on Workers using the Node.js runtime, including the App Router, server components, server actions, route handlers and ISR.

### Should I use next-on-pages or OpenNext?

Use the OpenNext adapter for new projects. `@cloudflare/next-on-pages` targets only the Edge runtime, while OpenNext supports the Node.js runtime and a wider set of Next.js features.

### How do I access D1 or R2 from Next.js on Cloudflare?

Call `getCloudflareContext()` from `@opennextjs/cloudflare` in a route handler, server component or server action, and use `env.DB`, `env.BUCKET` and so on. Bindings aren't available on `process.env`.

### Does ISR work on Cloudflare Workers?

Yes, once you configure an incremental cache, usually an R2 bucket, in `open-next.config.ts`. Without one, there's nowhere persistent to store cached pages between requests.
