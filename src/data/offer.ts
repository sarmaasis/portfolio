export const mvpPhases = [
  { days: 'Days 1–2', title: 'Scope', summary: 'The smallest version worth launching: core flow, data model, integrations.' },
  { days: 'Days 3–5', title: 'Foundation', summary: 'App structure, auth, database, API contracts and a deployable baseline.' },
  { days: 'Days 6–11', title: 'The core workflow', summary: 'The path users came for, built end to end across frontend, backend, integrations and data.' },
  { days: 'Days 12–14', title: 'Launch', summary: 'Production checks, fixes, deploy, and handover notes.' },
];

export const mvpIncludes = [
  'A focused web app or SaaS MVP',
  'Next.js frontend and product flows',
  'APIs, auth, database and the core integrations',
  'Production deployment, Cloudflare-first where it fits',
];

export const mvpFaqs = [
  {
    question: 'What fits in 14 days?',
    answer: 'One clear product workflow: a customer-facing SaaS v1, an internal tool, a marketplace flow, or a focused feature on an existing product. Scope is locked before day one. [How I scope an MVP](/blog/how-to-scope-an-mvp).',
  },
  {
    question: 'What if my idea needs longer?',
    answer: "I'll say so on the first call. We can cut it to a launch slice that's still worth shipping, or plan a scoped follow-on build after the MVP.",
  },
  {
    question: 'Do I own the code and the accounts?',
    answer: 'Yes. The code, the deployment accounts and the handover notes are yours. The point is a product you can run and extend without me.',
  },
  {
    question: 'Why Cloudflare?',
    answer: 'Workers, Pages, R2 and Queues keep delivery fast without giving up a production path. Where a workload needs AWS, I use AWS or a mix of both.',
  },
  {
    question: 'I already have a product. Where do I start?',
    answer: 'With the [$5,000 architecture audit](/services/architecture-audit): five business days, a ranked fix list and a Workers-vs-AWS decision. Implementation is quoted after that, from $4,500.',
  },
  {
    question: 'How does $4,500 compare to other ways of building an MVP?',
    answer: 'It depends on scope more than anything. I broke down the hours and the trade-offs in [what an MVP really costs](/blog/mvp-development-cost).',
  },
];
