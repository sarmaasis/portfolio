---
slug: cloudflare-workers-database-d1-hyperdrive-planetscale
title: "Choosing a database for Cloudflare Workers: D1, Hyperdrive with Postgres, or PlanetScale"
seoTitle: "D1 vs Hyperdrive vs PlanetScale: A Database for Workers"
description: Which database to use with Cloudflare Workers: when D1 is enough, when to run Postgres or MySQL behind Hyperdrive, and where PlanetScale fits. A decision guide.
capsule: Use D1 when your data fits comfortably in SQLite and you want zero connection management. Use Postgres or MySQL behind Hyperdrive when you need a full relational database, existing tooling or data that lives in a region. PlanetScale is a strong managed option for either engine. Here is how I decide.
date: 2026-10-10
rank: 4
tags:
  - Cloudflare Workers
  - Cloudflare D1
  - Hyperdrive
  - PlanetScale
  - Databases
takeaways:
  - D1 is SQLite run by Cloudflare. Excellent for MVPs and per-tenant data; check its per-database size limit against your growth.
  - Hyperdrive pools and caches connections to an existing Postgres or MySQL database, which is what makes a regional database practical from Workers.
  - PlanetScale works with Workers through Hyperdrive or its HTTP driver. I've run it in production behind 4M+ requests a day.
  - Pick based on data shape, size and team familiarity, not on benchmarks. An ORM like Drizzle keeps a later move possible.
---

The first architecture question on almost every Cloudflare Workers project I build is the database. Workers run in hundreds of locations; a traditional database runs in one. How you bridge that gap decides your latency, your costs and how painful your first migration will be.

There are three realistic answers today: **D1**, Cloudflare's own SQLite-based database; **Postgres or MySQL behind Hyperdrive**, Cloudflare's connection pooler and cache; and a managed provider like **PlanetScale**, which can sit behind Hyperdrive or be reached over HTTP. This is how I choose between them.

> **Check the current limits** Cloudflare and database providers update limits and pricing regularly. The trade-offs below are stable; confirm specific numbers on each provider's docs before you commit.

## The short answer

| If your situation is… | Use |
|---|---|
| New product, modest data, want the least operational work | D1 |
| One small database per customer (multi-tenant isolation) | D1 |
| Need full Postgres features, extensions or existing Postgres tooling | Postgres + Hyperdrive |
| Existing MySQL or Postgres database you're moving onto Workers | That database + Hyperdrive |
| High write volume, large datasets, want managed scaling and branching | PlanetScale (via Hyperdrive or HTTP driver) |
| Heavy analytics or long-running queries | A regional database, not queried from the hot path |

## D1: SQLite, managed by Cloudflare

D1 is a serverless database built on SQLite. You bind it to a Worker like any other resource and query it with prepared statements, with no connection strings, pools or VPCs.

```ts title="src/index.ts"
export default {
  async fetch(request: Request, env: { DB: D1Database }) {
    const { results } = await env.DB
      .prepare('SELECT id, name FROM projects WHERE owner_id = ? ORDER BY created_at DESC LIMIT 20')
      .bind('user_123')
      .all();
    return Response.json(results);
  },
};
```

**Where D1 shines:**

- **MVPs and early products.** Nothing to provision or tune; migrations run with `wrangler d1 migrations apply`.
- **Per-tenant databases.** D1 makes it practical to give each customer their own small database, which simplifies isolation and deletion.
- **Read-heavy workloads.** D1 offers read replication, so reads can be served closer to users.
- **Local development.** `wrangler dev` runs a local SQLite copy, so tests and dev environments are cheap and fast.

**Where to be careful:**

- **Database size.** Each D1 database has a maximum size (10 GB at the time of writing). That is a lot for an MVP, but check it against your growth curve, or design for multiple databases from the start.
- **SQLite semantics.** Fewer types, different date handling, no Postgres extensions. If your team thinks in Postgres, there will be friction.
- **Write throughput.** Each database has a single primary for writes. Very write-heavy single-tenant workloads may outgrow it.

For most of the MVPs I scope, with one core workflow and a few thousand users in year one, D1 is the right default. It removes a whole category of operational work.

## Hyperdrive: making a regional database fast from Workers

A Postgres or MySQL database usually runs in one region. Connecting to it from a Worker naively means a new TCP and TLS connection per request, from wherever the Worker happens to run. That's slow and it exhausts connection limits.

Hyperdrive fixes both. It keeps a pool of warm connections close to your database and routes Worker queries through it, and it can cache the results of read queries. From your code, it looks like a normal connection string:

```jsonc title="wrangler.jsonc"
{
  "compatibility_flags": ["nodejs_compat"],
  "hyperdrive": [
    { "binding": "HYPERDRIVE", "id": "<your-hyperdrive-id>" }
  ]
}
```

```ts title="src/index.ts"
import postgres from 'postgres';

export default {
  async fetch(request: Request, env: { HYPERDRIVE: Hyperdrive }) {
    const sql = postgres(env.HYPERDRIVE.connectionString, { max: 5, fetch_types: false });
    const projects = await sql`SELECT id, name FROM projects ORDER BY created_at DESC LIMIT 20`;
    return Response.json(projects);
  },
};
```

Create the config with `npx wrangler hyperdrive create my-db --connection-string="postgres://..."`. Hyperdrive supports both PostgreSQL and MySQL drivers.

**Choose Postgres + Hyperdrive when:**

- You want full relational features: rich types, JSONB, extensions, mature migrations.
- You already have a Postgres database, or a team and tooling built around it.
- Data residency or compliance means data must live in a specific region.
- Other services (a Python worker, BI tools, a regional API on AWS) also need the same database.

**Watch for:**

- **Write latency.** Writes still travel to the database's region. Turn on Smart Placement for Workers that make several queries per request, so the Worker runs near the database instead of near the user.
- **Query caching.** Cached reads are fast but can be briefly stale. Disable caching for queries that must be fresh.

## PlanetScale: managed MySQL or Postgres at scale

PlanetScale is a managed database built on Vitess for MySQL, and it now offers Postgres as well. It's known for horizontal scaling, safe schema changes through deploy requests, and database branching.

On [Whydonate](/work/whydonate-api-scale), PlanetScale MySQL was the transactional database behind a Cloudflare Workers API serving 4M+ requests a day, with Typesense handling search so the primary database wasn't doing search work. The lesson from that project: PlanetScale was a good fit because each component had one job, not because of any single feature.

Two ways to connect from Workers:

- **Through Hyperdrive**, with a standard MySQL or Postgres driver. Best when queries per request are high or you want pooling and read caching.
- **Through PlanetScale's serverless driver** over HTTP. Simple, no TCP sockets, a good fit for lighter workloads.

**Choose PlanetScale when** you expect large datasets or high write volume, you want schema changes without downtime, and you'd rather pay for managed scaling than run it yourself. For a small MVP it can be more database than you need.

## Neon and other serverless Postgres

Neon and similar serverless Postgres providers also work well with Workers, either through Hyperdrive or their own HTTP/WebSocket drivers. Treat them like any regional Postgres: the Hyperdrive advice above applies.

## A decision checklist

Answer these in order. The first strong "yes" usually decides it.

1. **Does other infrastructure (non-Workers services, BI tools) need direct SQL access?** If yes, use a regional Postgres or MySQL behind Hyperdrive.
2. **Is there an existing database you're keeping?** Keep it, and put Hyperdrive in front.
3. **Will a single database plausibly outgrow D1's size limit in the next 18 months, with no natural way to shard per tenant?** Use Postgres or PlanetScale.
4. **Is the team fluent in Postgres and reliant on its features?** Postgres + Hyperdrive.
5. **None of the above?** Start with D1. It's the least work today, and with an ORM you keep the option to move later.

## Keep your options open with an ORM

Whatever you choose, use a query layer that works across engines. Drizzle ORM supports D1, Postgres and MySQL with the same schema-first API, and its migrations work with Wrangler. Moving from D1 to Postgres later is then a matter of porting the schema and a data migration, not rewriting every query.

Keep database access behind a small module of named functions (`getProjectsForOwner`, `createInvoice`) rather than scattering SQL through route handlers. That's what makes a later move a week, not a quarter.

## What I usually pick for an MVP

For a [14-day MVP](/pricing): D1 by default, Postgres behind Hyperdrive if the product needs Postgres features or regional data from day one, and PlanetScale when the client already uses it or expects scale early. The database choice is part of the scoping in the first two days, alongside the rest of the stack. If you're working out what fits, the [MVP scoping guide](/blog/how-to-scope-an-mvp) covers the other decisions.

## Frequently asked questions

### Is Cloudflare D1 production-ready?

Yes, for workloads that fit SQLite's model and D1's per-database size limit. It's a strong choice for MVPs, read-heavy apps and per-tenant databases. Very large single databases or heavy write throughput are better served by Postgres or MySQL.

### Can Cloudflare Workers connect to PostgreSQL?

Yes. Use Hyperdrive with a Postgres driver such as postgres.js or node-postgres, with the `nodejs_compat` flag enabled. Hyperdrive pools connections and can cache reads, which makes a regional Postgres database practical from Workers.

### D1 or PlanetScale for a startup?

D1 if you want the least operational work and your data fits comfortably within its limits. PlanetScale if you expect large datasets or high write volume early, or need non-blocking schema changes and branching for a growing team.

### Do I need Hyperdrive to use PlanetScale with Workers?

No. PlanetScale's serverless driver works over HTTP without Hyperdrive. Hyperdrive helps when you make many queries per request or want connection pooling and read caching with a standard driver.
