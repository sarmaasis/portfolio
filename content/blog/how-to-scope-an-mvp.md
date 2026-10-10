---
slug: how-to-scope-an-mvp
title: How to scope an MVP you can launch in two weeks
seoTitle: How to Scope an MVP You Can Launch in Two Weeks
description: A practical method for scoping an MVP: the one-workflow rule, a critical-path map, a cut list, acceptance criteria and a one-page scope template.
capsule: An MVP ships on time when its scope is one workflow, written down, with a cut list and acceptance criteria agreed before any code. The method below is the one I use before every 14-day build, including the one-page template.
date: 2026-10-10
rank: 2
tags:
  - MVP development
  - Product scoping
  - Startups
takeaways:
  - Scope one workflow, the shortest path from a new user to the core value, and build it end to end.
  - Write a cut list. Admin panels, settings, notifications, roles and dashboards are the usual items that can wait.
  - Define "done" as acceptance criteria a user could check, not as a feature list.
  - Lock the scope before day one. A fixed deadline only works with a fixed scope.
---

Most MVPs don't run late because the engineering is hard. They run late because the scope keeps moving: one more role, one more screen, one more integration "while we're at it". By week three the product is half of three things instead of all of one.

I build MVPs on a fixed 14-day timeline, so scoping isn't optional for me. It's the first two days of every build, and it decides whether day 14 is a launch or an apology. Here's the method.

## What "scope" actually means for an MVP

An MVP scope is not a feature list. It's three things written down:

1. **The workflow:** the exact path a user takes to get the core value.
2. **The cut list:** everything you're deliberately not building yet.
3. **Acceptance criteria:** how you'll know each step works.

If any of the three is missing, the scope isn't finished, and the estimate built on it is fiction.

## Step 1: write the job in one sentence

Start with what the user is trying to get done, not with features. Use this shape:

> **Job story** When [situation], I want to [action], so I can [outcome].

For example: "When a client books a session, I want to pick a slot and pay upfront, so I can stop chasing no-shows." That sentence already rules out a lot: no team accounts, no analytics, no loyalty programme.

If you can't write the sentence, you're not ready to scope. You're still choosing which product to build.

## Step 2: map the critical path

Now list the steps between "a stranger lands on the site" and "they got the outcome". Only the steps without which the job fails. For the booking example:

1. Client opens the practitioner's booking link
2. Picks a service and a time slot
3. Enters their details and pays
4. Both sides get a confirmation email
5. The practitioner sees the booking in a simple list

That's the MVP. Five steps, two user types (and the second one only needs a list). Each step becomes a screen or an API, and each one gets an estimate.

> **The one-workflow rule** If a step isn't on the critical path, it isn't in version one. You can add it in week three, once real users tell you whether it matters.

## Step 3: write the cut list

The cut list is the most valuable document in an MVP. It's where you put every good idea that would otherwise sneak into the build. These are the items I see on almost every list:

| Usually cut from v1 | What to do instead |
|---|---|
| Admin panel | Use the database console or one protected page |
| User settings and profiles | Collect only the fields the workflow needs |
| Multiple roles and permissions | One role, or a hard-coded admin email |
| Notifications centre | Transactional email for the 2–3 events that matter |
| Analytics dashboards | A product analytics tool and a few saved queries |
| Native mobile apps | A responsive web app |
| Social login, SSO | Email magic links or email + password |
| Search and filters | A sorted list until there's enough data to search |
| Team accounts and invites | Single-user accounts |

Cutting isn't saying no forever. Every item on the list gets reconsidered after launch, with data instead of guesses.

## Step 4: define done with acceptance criteria

For each step on the critical path, write one to three sentences a non-engineer could test. Avoid "the booking page works". Write:

- A client can see available slots for the next 14 days, in their own time zone.
- A slot that's been paid for disappears for other clients within a few seconds.
- If payment fails, no booking is created and the client sees why.

Acceptance criteria do two jobs. They tell the engineer exactly what to build, and they stop the "that's not what I meant" conversation on day 13.

## Step 5: choose boring technology

Two weeks is not the time to learn a new framework. Pick a stack the engineer has shipped before, and lean on managed services for everything that isn't your core workflow.

For most of my MVP builds that means Next.js for the frontend, TypeScript APIs on Cloudflare Workers (or AWS where the workload needs it), a managed database, Stripe for payments and a transactional email provider. I've written about [which database to pick for a Workers app](/blog/cloudflare-workers-database-d1-hyperdrive-planetscale) and [deploying Next.js on Cloudflare](/blog/nextjs-cloudflare-workers-opennext) if you want the details.

Boring tech also makes the handover easier. The next engineer should recognise everything they find.

## Step 6: plan the launch before you build

Decide now what "launched" means. Real domain? Real payments? Ten invited users or a public link? Launch work (domains, email deliverability, payment provider verification, error tracking) takes longer than people expect, and some of it involves waiting on third parties. Start it on day one, not day thirteen.

## A one-page MVP scope template

This is the template I fill in with founders before a build. If you fill it in yourself, you'll get far more accurate quotes from anyone you talk to.

```markdown title="mvp-scope.md"
# [Product name] — MVP scope

## Job story
When [situation], I want to [action], so I can [outcome].

## Users
- Primary: [who completes the workflow]
- Secondary: [who else touches it, if anyone]

## Critical path
1. [Step]
2. [Step]
3. [Step]

## Acceptance criteria
- Step 1: [testable sentence]
- Step 2: [testable sentence]

## Integrations (day one only)
- [Payments / email / calendar / API]

## Cut list (not in v1)
- [Item] — revisit after [signal]

## Launch definition
- Domain: [ ]  Payments live: [ ]  Users: [invited / public]
- Launch date: [date]
```

## Red flags that a scope isn't ready

- The job story needs "and" twice.
- There are three or more user roles on the critical path.
- "We'll figure out payments later" but payment is the core value.
- Nobody can say what happens when a step fails.
- The cut list is empty. (It never really is; it just hasn't been written.)

If you see these, spend another day on scope. It's the cheapest day in the whole project.

## What happens after scoping

Once the scope is locked, the build is mostly execution. In my [14-day MVP build](/pricing) the schedule is days 1–2 for scope, 3–5 for the foundation (auth, database, API contracts, deploys), 6–11 for the core workflow and 12–14 for testing, launch and handover. The scope document becomes the acceptance test for day 14.

If you'd like a second pair of eyes on yours, [send me the template](/contact) filled in. I'll tell you whether it fits two weeks, and what I'd cut if it doesn't. If you're still working out the budget, start with [what an MVP really costs](/blog/mvp-development-cost).

## Frequently asked questions

### How many features should an MVP have?

Think in workflows, not features. An MVP should have one complete workflow, the shortest path from a new user to the core value, built end to end. That is usually five to eight steps, not a list of twenty features.

### What's the difference between an MVP and a prototype?

A prototype shows what the product could look like; it often can't take real users or real data. An MVP is a working product that real users can sign up to and use for the core job, with real data, deployed to production.

### How do I decide what to cut from my MVP?

Ask of each item: if this was missing, would a user fail to get the core outcome? If not, it goes on the cut list. Admin tools, settings, extra roles, notifications and dashboards almost always wait.

### Can an MVP really be built in two weeks?

Yes, if the scope is one workflow, the engineer is experienced with the stack, commodity parts (auth, payments, email) are bought rather than built, and the scope is locked before day one.
