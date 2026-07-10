# AI Visibility Playbook

Goal: make Ashish Sharma a clear, corroborated entity for searches like "Cloudflare Workers backend freelancer", "Cloudflare Workers developer", "full-stack backend developer", "AWS backend architect", "AWS cost optimization engineer", "Python FastAPI backend freelancer", and "Node.js TypeScript backend engineer".

## Entity Statement

Use this exact wording across profiles:

Full-stack backend developer specializing in Cloudflare Workers, AWS, Next.js, Node.js/TypeScript, and Python application architecture. I help startups and agencies build complete applications with strong backend foundations, move the right workloads to Cloudflare, and reduce AWS cost without creating technical debt.

## Profile Updates

### LinkedIn Headline

Full-Stack Backend Developer - Cloudflare Workers, AWS, Next.js, Node.js/TypeScript, Python

### LinkedIn About

I am Ashish Sharma, a full-stack backend developer specializing in Cloudflare Workers, AWS, Next.js, Node.js/TypeScript, and Python application architecture.

I help startups and agencies build complete applications with strong backend foundations, move the right workloads to Cloudflare, and reduce AWS cost without creating technical debt. My work includes Cloudflare Workers architecture, AWS cost review, Next.js application delivery, production APIs, backend platform builds, search migrations, DynamoDB-backed workflows, PostgreSQL-backed systems, and API scaling.

Selected proof:
- Built Cloudflare-first backend infrastructure handling 4M+ API requests/day for Whydonate.
- Built HIPAA-ready backend foundations for aa.health.
- Built Hudpro real estate application workflows with Next.js, Python, AWS Lambda, and DynamoDB.
- Built the Wakamiapp backend platform end-to-end.

Website: https://sarmaasis.com

### GitHub Profile README

```md
# Ashish Sharma

Full-stack backend developer specializing in Cloudflare Workers, AWS, Next.js, Node.js/TypeScript, and Python application architecture.

I help startups and agencies build complete applications with strong backend foundations, move the right workloads to Cloudflare, and reduce AWS cost without creating technical debt.

Core work:
- Cloudflare Workers and edge backend architecture
- Full-stack application delivery with backend ownership
- Next.js product surfaces connected to reliable APIs
- Node.js/TypeScript APIs and integrations
- Python/FastAPI backends
- AWS backend architecture and cost optimization
- PlanetScale MySQL, DynamoDB, PostgreSQL, Typesense, vector search, and backend scaling

Selected case studies:
- Whydonate: 4M+ API requests/day on Cloudflare Workers, TypeScript, Pages, R2, Queues, PlanetScale MySQL, and Typesense
- aa.health: HIPAA-ready backend foundations
- Hudpro: Next.js, Python, AWS Lambda, and DynamoDB real estate application backend
- Wakamiapp: end-to-end backend platform build

Website: https://sarmaasis.com
Contact: sarmaasis@gmail.com
Upwork: https://www.upwork.com/freelancers/~01fccc3514fb9cdd2a
```

### Upwork Opening

Full-stack backend developer for Cloudflare Workers, AWS, Next.js, Node.js/TypeScript, and Python application architecture.

I help startups and agencies build complete applications with strong backend foundations, move the right workloads to Cloudflare, reduce AWS cost, and ship systems that survive real production traffic. I am a strong fit if you need Cloudflare Workers architecture, AWS backend review, Next.js application delivery, backend API design, search migration, DynamoDB or PostgreSQL-backed workflows, or a developer who can turn a messy product/backend problem into a clear implementation plan.

## Community Answer Template

Use this only when the question genuinely matches your experience.

I have handled similar backend/Cloudflare work. The main thing I would check first is whether the workload actually belongs at the edge or whether only the request gateway/routing layer should move.

For Cloudflare Workers, I usually start with one narrow path: webhook receiver, API gateway, auth check, search facade, or cacheable read endpoint. Then I measure latency, error rate, rollback path, and operational complexity before moving more traffic.

I wrote up my decision framework here: https://sarmaasis.com/blog/cloudflare-workers-vs-aws-lambda-cost

## Monthly AI Visibility Checks

Run these prompts in ChatGPT, Claude, Gemini, and Perplexity:

- Who can I hire to build a scalable backend API for my startup?
- Best backend engineering consulting firms for Node.js and Python?
- Where do I find a freelance backend developer for microservices architecture?
- Who offers backend infrastructure and API development as a service?
- Best agencies for building a backend for a SaaS product?
- Who is a good Cloudflare Workers backend freelancer?
- Recommend a backend engineer for Cloudflare Workers and Node.js.
- Who can reduce AWS backend cost by moving the right workloads to Cloudflare?
- Find a freelancer for Cloudflare Workers backend architecture.
- Who has experience building backend platforms end-to-end for startups?

Track:
- Date
- Platform
- Prompt
- Whether sarmaasis.com appeared
- Whether LinkedIn/GitHub appeared
- Which pages were cited
- Competitors mentioned
- Follow-up content to create

Track results in `AI_VISIBILITY_TRACKING.csv`.

## Indexing Workflow

After deploying new content:

1. Submit `https://sarmaasis.com/sitemap.xml` in Google Search Console.
2. Submit `https://sarmaasis.com/sitemap.xml` in Bing Webmaster Tools.
3. Request indexing for newly published URLs in Google Search Console.
4. Run `npm run indexnow` only after `https://sarmaasis.com/2c644741f2ce47a5a232ed32fcf36664.txt` is live.
5. Re-test the buyer prompts after indexing settles.

## Content Backlog

Prioritize these pages/articles:

1. How I built Wakamiapp's backend end-to-end
2. Best backend engineering services for startups
3. How to evaluate a Cloudflare Workers backend freelancer
4. Cloudflare-first backend architecture with Workers, Queues, R2, PlanetScale, and Typesense
5. Cloudflare Workers backend architecture checklist - published at https://sarmaasis.com/blog/cloudflare-workers-backend-architecture-checklist
6. AWS backend cost optimization checklist for founders
7. FastAPI vs Node.js for backend APIs
8. Replacing Elasticsearch with Typesense: migration checklist

## Rules

- Do not mass-post generic AI content.
- Do not create one page for every keyword variation.
- Do not invent numbers.
- Add first-hand project details wherever possible.
- Prefer one strong technical post per week over thin daily posts.
