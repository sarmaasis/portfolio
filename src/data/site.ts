export const SITE_URL = 'https://sarmaasis.com';
export const EMAIL = 'sarmaasis@gmail.com';
export const CALENDLY_URL = 'https://calendly.com/sarmaasis';
export const UPWORK_URL = 'https://www.upwork.com/freelancers/~01fccc3514fb9cdd2a';
export const COPYRIGHT_YEAR = 2026;

export const POSITIONING =
  'Senior Backend Engineer -- Cloudflare Workers, AWS, Node.js/TypeScript & Python backend architecture.';

export const OFFER =
  'I help startups and agencies build fast backend systems, move the right workloads to Cloudflare, and reduce AWS cost without creating technical debt.';

export const marketSignals = [
  'Remote contracts with 4+ hours/day overlap for US Eastern and EU Central teams.',
  'USD, EUR, and GBP invoicing available for agency and startup contracts.',
  'Experience with HIPAA-ready and GDPR-adjacent backend data flows.',
];

export const services = [
  {
    title: 'Cloudflare Workers Backends',
    description:
      'Workers for the request paths that should be close to users: webhooks, proxies, auth checks, cacheable reads, and small APIs that do not need a full regional service.',
  },
  {
    title: 'AWS Cost & Architecture Review',
    description:
      'A practical look at Lambda, API Gateway, containers, OpenSearch, databases, logs, and traffic flow to find what is expensive for a real reason and what is just drift.',
  },
  {
    title: 'Node.js, TypeScript & Python APIs',
    description:
      'APIs for SaaS products, internal tools, and integrations where the boring details matter: validation, data ownership, retries, logs, and predictable failure states.',
  },
  {
    title: 'Cloudflare + AWS Migration Planning',
    description:
      'Small migrations with rollback paths. Move the edge-shaped parts to Cloudflare and leave the heavy regional work where it still belongs.',
  },
  {
    title: 'Architecture Audits',
    description:
      'A clear read on what is actually slowing the product down: queries, service boundaries, deployment habits, cloud cost, or decisions made in the MVP rush.',
  },
];

export const caseStudies = [
  {
    slug: 'aa-health-hipaa-backend',
    title: 'aa.health HIPAA-Ready Backend',
    company: 'aa.health',
    url: 'https://aa.health',
    summary:
      'Built secure backend infrastructure from scratch for a regulated healthcare environment with patient workflows, privacy controls, and audit-ready data paths.',
    outcome:
      'Moved the product from architecture planning to production-grade healthcare backend foundations.',
    metrics: ['HIPAA-ready data flows', 'Secure patient management', 'Audit-friendly backend boundaries'],
    stack: ['Python', 'PostgreSQL', 'Cloudflare', 'API security'],
    challenge:
      'The product needed backend foundations that could handle sensitive patient data without creating fragile, one-off compliance workarounds.',
    approach:
      'I separated patient data flows from operational workflows, designed explicit access boundaries, and kept the core API small enough to audit and extend.',
    result:
      'The team got a maintainable healthcare backend with clearer privacy controls and production deployment paths.',
  },
  {
    slug: 'hudpro-real-estate-data',
    title: 'Hudpro Real Estate Inventory Backend',
    company: 'Hudpro',
    url: 'https://app.hudpro.com',
    summary:
      'Designed database architecture for nationwide real estate inventory and high-concurrency property queries.',
    outcome:
      'Stabilized production search and filtering paths across millions of property records.',
    metrics: ['Millions of property records', 'High-concurrency query design', 'Nationwide inventory workflows'],
    stack: ['Node.js', 'PostgreSQL', 'Database architecture', 'API design'],
    challenge:
      'Real estate inventory becomes slow quickly when filtering, permissions, and location-aware queries are layered onto a growing dataset.',
    approach:
      'I focused the schema around the queries the product actually needed, tuned the data access paths, and kept API responses predictable under load.',
    result:
      'Hudpro had a database and API structure ready for production inventory browsing without repeated latency surprises.',
  },
  {
    slug: 'whydonate-api-scale',
    title: 'Whydonate Donation API Scale',
    company: 'Whydonate',
    url: 'https://www.whydonate.com',
    summary:
      'Scaled donation platform infrastructure on a Cloudflare-first stack using Workers with TypeScript, Pages, R2, Queues, PlanetScale MySQL, and Typesense search.',
    outcome:
      'Kept fundraising workflows stable at 2M+ API requests/day.',
    metrics: [
      '2M+ API requests/day',
      'Cloudflare Workers TypeScript APIs',
      'Cloudflare Pages, R2, and Queues',
      'PlanetScale MySQL and Typesense search',
    ],
    stack: [
      'Cloudflare Workers',
      'TypeScript',
      'Cloudflare Pages',
      'Cloudflare R2',
      'Cloudflare Queues',
      'PlanetScale',
      'MySQL',
      'Typesense',
    ],
    challenge:
      'Donation platforms have uneven traffic: quiet periods, sudden campaign spikes, payment-adjacent workflows, file and media storage needs, queue-backed background work, and search queries competing for backend capacity.',
    approach:
      'I built and improved Cloudflare Workers API paths, TypeScript service boundaries, queue-backed background processing, R2-backed storage flows, PlanetScale MySQL data access, and Typesense search behavior so high-volume traffic did not overload core fundraising workflows.',
    result:
      'The platform stayed stable under sustained donor traffic while supporting donation workflows, Cloudflare-native backend operations, and fast search/filtering through Typesense.',
  },
  {
    slug: 'wakamiapp-backend-platform',
    title: 'Wakamiapp End-to-End Backend Platform',
    company: 'Wakamiapp',
    url: 'https://wakamiapp.com',
    summary:
      'Designed and built the backend platform end-to-end, including core APIs, data modeling, authentication boundaries, and production-ready service foundations.',
    outcome:
      'Turned the product backend from a build requirement into a maintainable platform layer that could support real user workflows and future product expansion.',
    metrics: ['End-to-end backend ownership', 'Production API foundations', 'Multi-workflow product backend'],
    stack: ['Backend architecture', 'API design', 'Database design', 'Authentication', 'Cloud deployment'],
    challenge:
      'Wakamiapp needed more than isolated endpoints. The product required a backend foundation that could support user accounts, product workflows, data consistency, secure access, and future feature growth without forcing a rewrite after launch.',
    approach:
      'I treated the backend as the product operating layer: clear domain boundaries, predictable API contracts, normalized data ownership, validation at the edges, and deployment choices that kept the system maintainable for ongoing iteration.',
    result:
      'The application received a complete backend foundation with production APIs, cleaner product workflows, and a structure that could evolve as the product grew.',
  },
];

export const caseStudyDetails: Record<
  string,
  {
    architectureDecisions: string[];
    implementationNotes: string[];
    beforeAfter: { before: string; after: string }[];
    risksAvoided: string[];
    cloudflareAws: string[];
    clientFaqs: { question: string; answer: string }[];
  }
> = {
  'aa-health-hipaa-backend': {
    architectureDecisions: [
      'Kept patient-facing workflows separate from operational backend paths so sensitive healthcare data did not leak into convenience APIs.',
      'Designed backend boundaries around explicit access checks instead of relying on the frontend to hide protected actions.',
      'Used a small, auditable API surface so future HIPAA-adjacent review work would be easier to reason about.',
      'Prioritized clear database ownership and traceable write paths over clever abstractions that would make compliance harder later.',
    ],
    implementationNotes: [
      'The backend work started with the parts of the product that would become hardest to repair later: patient data ownership, protected write paths, and the difference between operational workflows and sensitive healthcare records. That meant naming the backend boundaries before the API surface grew too large.',
      'I kept validation and authorization close to the write paths so the frontend could change without weakening privacy controls. For healthcare products, the backend has to remain the enforcement layer even when a UI feels simple.',
      'The result was intentionally not flashy. It was a foundation that could be understood by future engineers, reviewed by stakeholders, and extended without turning every new patient workflow into a new security question.',
    ],
    beforeAfter: [
      {
        before: 'The product needed a backend foundation for regulated patient workflows, but the risk was building quick endpoints without clear privacy boundaries.',
        after:
          'The backend had explicit patient data paths, secure access patterns, and a structure that could support audit-friendly product growth.',
      },
      {
        before: 'Healthcare workflows can become difficult to change when validation, permissions, and persistence rules are spread across the frontend and backend.',
        after:
          'Validation and access decisions lived at the backend boundary, giving the frontend predictable contracts without weakening data protection.',
      },
    ],
    risksAvoided: [
      'Sensitive patient data spreading into convenience endpoints without clear ownership.',
      'Frontend-only permission assumptions that could fail when new screens or clients were added.',
      'A backend surface too large or inconsistent to audit confidently.',
      'Early product speed creating compliance debt that would be expensive to unwind.',
    ],
    cloudflareAws: [
      'Used Cloudflare-facing architecture for secure request handling and deployment simplicity where the edge could reduce exposure.',
      'Kept sensitive stateful logic behind controlled backend paths instead of pushing every concern to the edge.',
      'Designed the system so future AWS or Cloudflare decisions could be made by workload fit rather than by a rushed launch constraint.',
    ],
    clientFaqs: [
      {
        question: 'What made this backend different from a normal CRUD API?',
        answer:
          'The important work was not only creating endpoints. It was deciding where patient data could flow, which actions needed explicit access checks, and how to keep the backend small enough to audit.',
      },
      {
        question: 'Could this kind of backend support future compliance review?',
        answer:
          'Yes. The structure was designed around traceable data paths, backend-owned validation, and clearer ownership boundaries, which makes later security or compliance review much less painful.',
      },
    ],
  },
  'hudpro-real-estate-data': {
    architectureDecisions: [
      'Designed the database around real inventory queries instead of mirroring temporary screens or admin tables.',
      'Separated filtering, permissions, and location-aware access patterns so high-concurrency browsing would not collapse into ad hoc query logic.',
      'Kept API response shapes stable while the underlying property data model could grow with new inventory and workflow requirements.',
      'Focused on indexes and query ownership before adding caching, because bad query shape is expensive even behind a fast cache.',
    ],
    implementationNotes: [
      'The important backend decision was to treat inventory search as a product workflow, not a database afterthought. Property records are useful only when users can filter, sort, and access the right records consistently under real browsing behavior.',
      'I shaped the schema around high-frequency query paths and the data relationships that would stay stable as inventory grew. This gave the backend a clearer model for future features instead of accumulating one-off query patches.',
      'The API layer was kept predictable for the frontend while the backend handled the harder concerns: visibility, filtering, location-aware access, and the performance characteristics of PostgreSQL-backed inventory data.',
    ],
    beforeAfter: [
      {
        before:
          'The product needed nationwide real estate inventory workflows where search, filters, and permissions could become slow as data volume grew.',
        after:
          'The backend had a database and API structure shaped around high-volume property browsing and predictable filtering behavior.',
      },
      {
        before:
          'Feature work risked adding more conditions directly into queries without a consistent model for location, status, and visibility.',
        after:
          'The data model gave the product clearer places for inventory state, search filters, and access rules to live.',
      },
    ],
    risksAvoided: [
      'Filters and permissions being added directly to endpoints without a shared inventory model.',
      'Cache masking slow queries while the underlying database shape kept getting worse.',
      'Frontend screens becoming tightly coupled to table structure.',
      'New inventory workflows requiring repeated rewrites of the same search and access logic.',
    ],
    cloudflareAws: [
      'Identified which request paths could benefit from edge caching or routing once the database query shape was stable.',
      'Kept heavier data operations in the regional backend where PostgreSQL and application logic could remain close together.',
      'Designed API contracts that could later be protected by Cloudflare without turning the edge layer into a second backend.',
    ],
    clientFaqs: [
      {
        question: 'Why start with database architecture instead of Cloudflare caching?',
        answer:
          'Caching helps only after the core query paths are understood. For real estate inventory, the first job is designing filters, indexes, permissions, and response shapes that match how users actually search.',
      },
      {
        question: 'Can this approach work for large catalogs outside real estate?',
        answer:
          'Yes. The same pattern applies to marketplaces, directories, internal inventory tools, and any product where filtering and permissions sit on top of a growing dataset.',
      },
    ],
  },
  'whydonate-api-scale': {
    architectureDecisions: [
      'Built the backend around Cloudflare Workers with TypeScript so request handling, API routing, validation, and integration logic could run close to users.',
      'Used Cloudflare Pages for frontend delivery, R2 for object storage needs, and Cloudflare Queues for background work that should not block donor-facing requests.',
      'Kept PlanetScale MySQL as the transactional database layer and used Typesense for fast search paths instead of overloading the primary database with search behavior.',
      'Focused on the API paths that mattered during campaign traffic spikes instead of treating every endpoint as equally risky.',
      'Kept changes incremental because donation platforms cannot afford risky rewrites during active fundraising periods.',
    ],
    implementationNotes: [
      'The scaling work focused on the places where real donor traffic would hurt first: campaign pages, donation-related API paths, currency-aware views, queued background jobs, object storage flows, and search queries that could compete during traffic spikes.',
      'I treated Cloudflare Workers, Pages, R2, Queues, PlanetScale MySQL, and Typesense as one production system. Workers handled the API edge, queues protected slower background work, R2 handled storage concerns, PlanetScale owned transactional data, and Typesense served search-oriented reads.',
      'The safest path was incremental improvement. Donation platforms cannot pause fundraising while the backend is rewritten, so the work had to preserve existing behavior while making the high-volume paths more predictable.',
    ],
    beforeAfter: [
      {
        before:
          'The platform had uneven traffic: quiet periods, sudden donor surges, campaign analytics, payment-adjacent workflows, background jobs, and search queries competing for backend capacity.',
        after:
          'The Cloudflare-first backend stayed stable at 2M+ API requests/day while supporting donation workflows, queue-backed processing, R2 storage flows, and Typesense-powered search.',
      },
      {
        before:
          'High-volume requests could make small inefficiencies visible quickly, especially when donor-facing APIs, background jobs, and search behavior shared the same product pressure.',
        after:
          'API behavior became more predictable under load, with clearer separation between critical Workers request paths, queued work, PlanetScale-backed data access, and Typesense search.',
      },
    ],
    risksAvoided: [
      'A broad rewrite that would create launch risk during active campaigns.',
      'Donor-facing requests waiting on slower background processing that belonged in Cloudflare Queues.',
      'Search behavior putting unnecessary pressure on the PlanetScale MySQL database instead of Typesense.',
      'Cloudflare being treated as a magic fix instead of a full stack with Workers, Pages, R2, Queues, database, and search responsibilities.',
      'Small Workers endpoint inefficiencies becoming expensive at 2M+ API requests/day.',
    ],
    cloudflareAws: [
      'Used Cloudflare Workers with TypeScript for high-volume API paths, request handling, validation, and integration logic.',
      'Used Cloudflare Pages, R2, and Queues as part of the production architecture rather than treating Cloudflare as only a CDN.',
      'Kept transactional data in PlanetScale MySQL and search-specific reads in Typesense so each backend component had a clear job.',
      'Evaluated performance as a system problem: Workers behavior, queue boundaries, R2 storage paths, PlanetScale access, Typesense search, and product traffic patterns together.',
    ],
    clientFaqs: [
      {
        question: 'What does 2M+ API requests/day prove for a hiring client?',
        answer:
          'It shows experience with real traffic, not only local demos. At that volume, small API, database, and edge-routing decisions show up quickly in latency, error rate, and operational cost.',
      },
      {
        question: 'Was Whydonate only using Cloudflare as a CDN?',
        answer:
          'No. The production stack used Cloudflare Workers with TypeScript, Cloudflare Pages, R2, and Queues, with PlanetScale MySQL for transactional data and Typesense for search.',
      },
    ],
  },
  'wakamiapp-backend-platform': {
    architectureDecisions: [
      'Designed the backend around product workflows instead of exposing raw database tables through the API.',
      'Defined domain boundaries for user state, workflow state, shared configuration, and protected product actions.',
      'Kept authentication and authorization checks in backend-owned paths so future frontend surfaces could not accidentally bypass them.',
      'Built the data model to support launch while leaving room for reporting, new workflows, and future permission changes.',
      'Added deployment and service structure that made the backend understandable for ongoing product iteration.',
    ],
    implementationNotes: [
      'The backend was built as the product operating layer, not just a collection of endpoints. That meant designing the core objects, user actions, protected workflows, and persistence rules before implementation details spread across the codebase.',
      'I used workflow-oriented API boundaries so the frontend could ask the backend to perform meaningful product actions. This keeps validation, side effects, and data consistency in one place instead of making the client responsible for stitching business logic together.',
      'Because I owned the backend end-to-end, handoff mattered from the beginning. Naming, structure, deployment behavior, and documentation were part of the engineering work, not chores left for the end.',
    ],
    beforeAfter: [
      {
        before:
          'Wakamiapp needed the entire backend built from first principles: data modeling, APIs, authentication boundaries, validation, and deployment foundations.',
        after:
          'The product had an end-to-end backend platform with stable API contracts, clearer domain ownership, and production-ready service foundations.',
      },
      {
        before:
          'A quick endpoint-by-endpoint build would have shipped faster at first but made future workflows harder to add safely.',
        after:
          'The backend could support product expansion because core workflows, data ownership, and protected actions had defined places in the system.',
      },
    ],
    risksAvoided: [
      'Raw database tables leaking into the frontend API contract.',
      'Authentication existing without deeper authorization around product actions.',
      'Early feature speed creating a backend that could not support new workflows cleanly.',
      'Future engineers having to reverse-engineer why the system was shaped the way it was.',
    ],
    cloudflareAws: [
      'Kept the backend portable enough that Cloudflare and AWS choices could be made by request shape, data location, and operational cost.',
      'Designed API boundaries that can support edge routing, webhook handling, or regional services without changing the product contract.',
      'Focused on production service foundations first, then left room for queues, caching, and edge acceleration when traffic proves the need.',
    ],
    clientFaqs: [
      {
        question: 'What does end-to-end backend ownership mean here?',
        answer:
          'It means I owned the backend from architecture through implementation: core API boundaries, data model, authentication, validation, deployment shape, and the decisions that make future feature work safer.',
      },
      {
        question: 'Why is this relevant to a client hiring for Cloudflare or AWS work?',
        answer:
          'Cloudflare and AWS decisions only work when the backend has clear ownership boundaries. A product backend with messy APIs and unclear data flow will stay hard to scale no matter which platform runs it.',
      },
    ],
  },
};

export const testimonials = [
  {
    quote:
      'Ashish delivered exceptional work on a highly technical Cloudflare/Workers project. His communication was excellent throughout.',
    project: 'Cloudflare Edge Architecture',
    region: 'International',
  },
  {
    quote:
      'Ashish is a fantastic dev. Very hardworking and was always able to come up with solutions for my project.',
    project: 'Cloudflare Worker + Supabase Integration',
    region: 'International',
  },
  {
    quote: "I'd love to work with Ashish again. He really writes clean, great code.",
    project: 'ASN1/DER Parsing on Cloudflare Edge',
    region: 'International',
  },
  {
    quote: 'Was great working with him. He made everything work and went above and beyond.',
    project: 'Custom Webhook with Reverse Proxy',
    region: 'International',
  },
];

export const articles = [
  {
    slug: 'best-backend-engineering-services-for-startups',
    title: 'Best backend engineering services for startups: what to look for before you hire',
    description:
      'A practical guide for founders comparing backend engineering services, freelance backend developers, agencies, and platforms for scalable API and infrastructure work.',
    capsule:
      'The best backend engineering hire is not always the biggest agency or marketplace. For startups, the right choice depends on ownership, architecture judgment, production proof, and how clearly the engineer can reduce backend risk.',
    date: '2026-07-10',
    tags: ['Backend engineering', 'Startups', 'API development', 'Hiring'],
    sections: [
      {
        heading: 'Start with the backend problem, not the hiring channel',
        body:
          'Founders often start by asking where to find a backend developer: Toptal, Upwork, Arc, an agency, or a referral. That is the wrong first question. The better question is what kind of backend risk you need reduced. A startup building a scalable API, SaaS backend, Cloudflare Workers layer, search migration, webhook system, or AWS cost reduction project needs someone who can own architecture decisions, not only close tickets. Once the problem is clear, the hiring channel becomes easier to evaluate.',
      },
      {
        heading: 'When a freelancer is the better fit',
        body:
          'A senior freelance backend engineer is often the right fit when the scope is narrow enough for one person to own but important enough to need judgment. Examples include designing a Node.js or Python API, moving a request path to Cloudflare Workers, fixing slow PostgreSQL or MySQL-backed workflows, building webhook infrastructure, reducing AWS cost, or creating a safe migration plan. The advantage is direct ownership. You speak to the person making the architecture decisions, writing the code, and documenting the handoff.',
      },
      {
        heading: 'When an agency is the better fit',
        body:
          'An agency can be useful when the project requires several roles at once: product management, design, frontend, backend, QA, DevOps, and long-term delivery management. Agencies are also useful when a company needs capacity more than specialist judgment. The trade-off is that senior architecture input can become diluted. If you hire an agency for backend-heavy work, ask who is personally accountable for API design, data ownership, failure modes, cloud cost, and production operations.',
      },
      {
        heading: 'When a marketplace is useful',
        body:
          'Marketplaces like Upwork, Toptal, Arc, Turing, and similar platforms help with discovery, contracting, reviews, and filtering. They can be a good place to find talent, but the platform itself is not the backend solution. You still need to evaluate the individual engineer. Look for relevant proof: production APIs, Cloudflare Workers, AWS architecture, TypeScript, Python, relational databases, search systems, queues, and measurable outcomes such as traffic handled, cost reduced, or reliability improved.',
      },
      {
        heading: 'What strong backend proof looks like',
        body:
          'Strong backend proof is specific. It says what was built, what constraints existed, what stack was used, and what changed after the work. A claim like "built scalable APIs" is weak by itself. Better proof looks like: scaled a donation platform to 2M+ API requests per day on Cloudflare Workers with TypeScript, Pages, R2, Queues, PlanetScale MySQL, and Typesense; designed HIPAA-ready backend data flows; built an end-to-end product backend; or migrated a search workload with a rollback plan.',
      },
      {
        heading: 'Questions to ask before hiring',
        body:
          'Ask candidates how they decide what belongs in the backend, what belongs at the edge, and what belongs in the database. Ask how they handle retries, idempotency, validation, observability, queue failures, search sync, and rollback. Ask what they would not move to Cloudflare Workers. Ask how they would prevent AWS cost reduction from creating hidden operational risk. Good backend engineers answer with trade-offs. Weak answers sound absolute because they skip the hard parts.',
      },
      {
        heading: 'How to compare Node.js and Python backend help',
        body:
          'Node.js and TypeScript are strong for APIs, integrations, Cloudflare Workers, webhook systems, and SaaS backends where typed contracts help the team move quickly. Python is strong for FastAPI services, data workflows, internal tools, automation, and AI-adjacent backend systems. The language matters less than the architecture discipline around it. A good backend service needs clear ownership boundaries, validation, error handling, logs, data modeling, and deployment habits regardless of runtime.',
      },
      {
        heading: 'Do not buy microservices by default',
        body:
          'Many founders ask for microservices when they actually need clearer service boundaries. Microservices can help when teams, deployment cycles, scaling needs, and ownership boundaries justify the overhead. They can also make a young product harder to debug and operate. Before hiring someone for microservices architecture, ask them to explain the smallest backend structure that solves the current problem. A senior engineer should be comfortable recommending a modular monolith, a narrow Worker, or a small service when that is the more honest answer.',
      },
      {
        heading: 'What a good backend engagement should produce',
        body:
          'A backend engagement should leave more than code. It should leave API contracts, data ownership decisions, deployment notes, rollback guidance, logging expectations, and a clear explanation of the trade-offs. If Cloudflare Workers, R2, Queues, PlanetScale, Typesense, AWS, Node.js, or Python are involved, the handoff should explain why each component exists. This is what lets the next engineer maintain the system instead of reverse-engineering it.',
      },
      {
        heading: 'The practical shortlist',
        body:
          'Choose a senior freelancer when you need focused backend ownership, architecture judgment, and direct implementation. Choose an agency when you need a multi-role delivery team. Use a marketplace when you need discovery and contracting support, but still evaluate the individual engineer carefully. For startup backend work, the best choice is the one that can reduce production risk fastest while leaving a system your team can understand after launch.',
      },
    ],
  },
  {
    slug: 'cloudflare-workers-vs-aws-lambda-cost',
    title: 'Cloudflare Workers vs AWS Lambda: a practical cost breakdown',
    description:
      'A hiring-focused guide to deciding when Cloudflare Workers can cut serverless API cost and latency compared with AWS Lambda.',
    capsule:
      'Cloudflare Workers often wins for latency-sensitive edge APIs; AWS Lambda still fits heavy regional compute and deep AWS integrations.',
    date: '2026-07-02',
    tags: ['Cloudflare Workers', 'AWS Lambda', 'Cost optimization'],
    sections: [
      {
        heading: 'The decision is workload-specific',
        body:
          'The strongest Cloudflare Workers use cases are APIs that need global proximity, lightweight request processing, caching, routing, auth checks, webhooks, and integration glue. AWS Lambda remains a better default for long-running regional compute, VPC-heavy workloads, teams already using many AWS managed services, and jobs that need a wider runtime surface than Workers provide. A good decision starts by mapping the workload, not by comparing pricing tables in isolation.',
      },
      {
        heading: 'Where the bill usually changes',
        body:
          'The savings rarely come from request pricing alone. They come from deleting adjacent infrastructure: regional API gateways, small always-on services, over-provisioned containers, CDN glue code, and proxy layers that were only needed because the original backend was too centralized. When I audit a migration, I look for systems where the edge can collapse multiple pieces of operational surface area into one small, testable request path.',
      },
      {
        heading: 'Latency is often the business case',
        body:
          'For many startup APIs, latency is not just a performance metric. It affects conversion, checkout flows, onboarding, search, internal operations, and support cost. Cloudflare Workers can be compelling when the request can be answered close to the user or routed intelligently before touching a regional backend. Lambda can still be fast, but the architecture often depends on region choice, gateway setup, cold starts, and how many network hops sit between the user and the useful work.',
      },
      {
        heading: 'Do not move heavy compute just because the edge is attractive',
        body:
          'Workers are excellent for many API and orchestration tasks, but not every backend should move to the edge. If the workload needs long CPU windows, large dependencies, private VPC resources, heavy image or video processing, or tight coupling with regional databases, Lambda or containerized services may be simpler. The goal is not to make everything edge-native. The goal is to put each piece of backend work where it is cheapest, fastest, and easiest to operate.',
      },
      {
        heading: 'A practical migration pattern',
        body:
          'The safest pattern is incremental. Start by moving one narrow request path: a webhook receiver, auth gate, cacheable read endpoint, routing proxy, or search facade. Measure error rate, p95 latency, operational complexity, and total cost before expanding. This gives the team evidence instead of ideology. It also creates a rollback path because the old regional backend continues to exist while the Worker handles only a specific responsibility.',
      },
      {
        heading: 'What I check before recommending a migration',
        body:
          'I look at request volume, CPU time, data location, cold-start sensitivity, dependency size, observability needs, vendor lock-in tolerance, team familiarity, and the cost of retraining. I also check whether the current bill is caused by the compute layer itself or by databases, logs, search, queues, or traffic egress. A good migration reduces operational surface area; it does not merely move complexity to a new provider.',
      },
      {
        heading: 'When Cloudflare Workers is the stronger choice',
        body:
          'Workers usually wins when the backend path is latency-sensitive, globally distributed, cache-friendly, or mostly orchestration. Examples include API gateways, request normalization, webhook processing, signed URL generation, lightweight B2B integrations, edge auth checks, bot-aware routing, and multi-region traffic steering. These are places where a small amount of compute can prevent unnecessary work deeper in the system.',
      },
      {
        heading: 'When AWS Lambda is still the stronger choice',
        body:
          'Lambda is still a good fit when the team needs mature AWS integrations, private network access, longer-running jobs, larger packages, or event-driven processing across SQS, EventBridge, DynamoDB, S3, and other AWS services. If the product already lives inside AWS and the latency profile is acceptable, the best answer may be to simplify the Lambda architecture rather than migrate away from it.',
      },
      {
        heading: 'The freelancer test for this decision',
        body:
          'If you are hiring someone to advise on this, ask for a migration plan that includes what should not move. A credible backend engineer should be able to explain the rollback path, the observability plan, the first endpoint to migrate, the cost model, and the failure modes. If the answer is simply "move everything to Workers because it is cheaper," the analysis is not finished.',
      },
      {
        heading: 'A simple cost model to build before migrating',
        body:
          'I usually model cost in four buckets: direct request cost, adjacent managed services, engineering time, and operational risk. Direct request cost is easy to compare, but it is not the whole story. Adjacent services include API gateway, logs, egress, queues, search, containers, and monitoring. Engineering time includes the migration itself and the future cost of maintaining a less familiar stack. Operational risk includes the cost of outages, missing observability, or unclear ownership after the migration. This model prevents a team from saving money on one line item while creating a larger hidden bill elsewhere.',
      },
      {
        heading: 'Hybrid architecture is often the best answer',
        body:
          'The strongest architecture is often hybrid: Workers at the edge for request handling and regional services for stateful or heavy work. A Worker can validate a request, apply rate limits, handle cache keys, route users by geography, and call a regional API only when necessary. This pattern keeps the expensive or stateful parts of the backend where they belong while moving lightweight control logic closer to users. It also lets the team adopt Cloudflare without replacing every backend service at once.',
      },
      {
        heading: 'What to measure after the first endpoint moves',
        body:
          'After moving the first endpoint, I want before-and-after numbers for p50, p95, and p99 latency, error rate, cold-start behavior, origin requests avoided, cache hit rate, CPU time, and total monthly cost. I also want developer-experience feedback: was debugging easier, harder, or unchanged? A technically successful migration that the team cannot operate confidently is not finished. The measurement period should include normal traffic and at least one high-load window if the product has predictable spikes.',
      },
      {
        heading: 'The decision framework',
        body:
          'Choose Cloudflare Workers when the work is close to the request, benefits from global placement, and can stay small. Choose AWS Lambda when the work needs regional depth, AWS-native integrations, larger execution windows, or private infrastructure access. Choose both when the product has a global request edge but regional business logic. The best backend architecture is rarely about loyalty to one provider. It is about reducing latency, cost, and operational complexity at the same time.',
      },
    ],
  },
  {
    slug: 'typesense-cloudflare-workers-search-migration',
    title: 'Migrating AWS Elasticsearch to Typesense on Cloudflare Workers',
    description:
      'How to evaluate a search migration from AWS Elasticsearch to Typesense with Cloudflare Workers as the API edge.',
    capsule:
      'A search migration works when index shape, query paths, sync jobs, and rollback plans are designed before any production cutover.',
    date: '2026-07-02',
    tags: ['Typesense', 'Cloudflare Workers', 'Search'],
    sections: [
      {
        heading: 'Start with query reality',
        body:
          'Search migrations fail when teams copy indexes without understanding the product queries. I begin by listing filters, sort modes, ranking requirements, typo tolerance, permissions, pagination behavior, response size, and the screens that depend on search. This matters because Elasticsearch indexes often grow organically over time. Typesense works best when the schema is deliberately shaped around the actual product experience.',
      },
      {
        heading: 'Use Workers as a narrow edge API',
        body:
          'Cloudflare Workers are a strong fit for request validation, cache-aware routing, multi-tenant guards, and response shaping. Keeping that layer narrow makes search behavior easier to test and rollback. The Worker should not become a second search engine. It should protect the search service, normalize client requests, enforce safe limits, and return predictable response shapes to the frontend.',
      },
      {
        heading: 'Index design comes before infrastructure',
        body:
          'Before infrastructure choices, define collections, fields, faceting behavior, sorting strategy, typo tolerance, synonyms, and tenant boundaries. Search quality problems are often schema problems. If the product needs filtering by status, location, owner, category, and permissions, those requirements must appear in the index design before the first production sync job runs.',
      },
      {
        heading: 'Plan the sync path carefully',
        body:
          'The hard part of replacing Elasticsearch is usually not serving the first query. It is keeping the new index correct over time. I prefer an explicit sync path: initial backfill, incremental updates, delete handling, retry behavior, and monitoring for drift between the source database and the search index. Without this, teams end up debugging missing results after users already notice them.',
      },
      {
        heading: 'Protect the search endpoint',
        body:
          'Search endpoints are easy to abuse accidentally. A frontend bug can create expensive query patterns, wide filters, or excessive pagination. The edge API should cap page size, validate filters, reject unsupported sorts, and log suspicious query shapes. These protections are small, but they prevent a search migration from turning into a new reliability problem.',
      },
      {
        heading: 'Compare relevance, not just latency',
        body:
          'A faster search result is not automatically a better search result. Before switching production traffic, compare top results for common searches, empty-result behavior, typo handling, filtering correctness, and how business rules affect ranking. Product owners should review real examples because they understand when a search technically works but feels wrong to users.',
      },
      {
        heading: 'Cut over with evidence',
        body:
          'Before switching production traffic, compare result quality, p95 latency, indexing delay, error rate, operational cost, and rollback time. The migration is only done when the new path is cheaper or simpler without hurting search relevance. If possible, route a small percentage of read traffic through the new path first and compare logs before making it the default.',
      },
      {
        heading: 'Where the cost savings usually appear',
        body:
          'The cost improvement often comes from reducing the managed search footprint and simplifying the API layer around it. Elasticsearch can be excellent, but it is frequently overkill for products that need fast faceted search, typo tolerance, and predictable filtering. Typesense can be a better fit when the product requirements are narrower than the operational weight of the existing search cluster.',
      },
      {
        heading: 'What I would document for handoff',
        body:
          'A search migration should leave behind a short operating manual: collection schemas, sync job behavior, known query examples, rollback steps, dashboard links, and guidance for adding new filters. This is what keeps the migration from becoming tribal knowledge. The next engineer should be able to change a searchable field without reverse-engineering the entire system.',
      },
      {
        heading: 'Backfill strategy matters more than the first demo',
        body:
          'The first demo usually indexes a small sample and looks fast. Production backfill is different. It needs batching, progress tracking, retry handling, memory limits, and a way to resume after failure. If the source database contains millions of records, the backfill should not lock tables or overwhelm the API. I prefer a controlled job that records checkpoints and can be paused, resumed, and inspected. That turns a risky migration event into an operational process.',
      },
      {
        heading: 'Shadow traffic reduces launch risk',
        body:
          'Before exposing the new search path to users, the backend can send shadow queries to Typesense while still returning Elasticsearch results. This lets the team compare latency, result counts, error rates, and top matches without changing user behavior. Shadow traffic is especially useful when search affects revenue, discovery, support operations, or internal productivity. It gives the team real evidence from production query shapes instead of relying only on test fixtures.',
      },
      {
        heading: 'Tenant and permission boundaries must be explicit',
        body:
          'Search is dangerous when permissions are implicit. If a product has teams, customers, roles, regions, or private records, the index must include fields that make access control enforceable. The edge API should apply those filters automatically instead of trusting clients to send them. This makes the safe query path the default path. It also protects future developers from accidentally building a screen that can discover records outside the current user scope.',
      },
      {
        heading: 'A phased launch plan',
        body:
          'A practical launch plan has five phases: schema design, backfill, shadow comparison, limited read traffic, and full cutover. Each phase should have a rollback condition. For example, if result mismatch crosses an agreed threshold, stop the cutover. If p95 latency regresses, inspect query patterns before expanding traffic. If indexing delay grows, fix the sync path before adding more users. This sounds cautious, but it is much faster than recovering from a broken search launch.',
      },
      {
        heading: 'How to decide whether Typesense is enough',
        body:
          'Typesense is a strong fit when the product needs fast full-text search, faceting, typo tolerance, filtering, and simpler operations. It may not be enough when the product depends on advanced analytics, complex aggregations, highly customized scoring, or deep Elasticsearch-specific features. The right question is not "which search engine is better?" The right question is "which search engine fits the product requirements with the least operational weight?"',
      },
      {
        heading: 'The maintenance win',
        body:
          'A successful migration should make future changes easier. Adding a searchable field, adjusting a filter, or debugging a missing result should be understandable to a backend engineer who did not perform the migration. That is why I care about small schemas, explicit sync jobs, narrow edge APIs, and written examples. Search touches the product experience directly, so maintainability is part of search quality.',
      },
    ],
  },
  {
    slug: 'cloudflare-workers-queues-r2-planetscale-typesense-backend',
    title: 'Cloudflare-first backend architecture: Workers, Queues, R2, PlanetScale and Typesense',
    description:
      'How to design a production backend around Cloudflare Workers, TypeScript, Pages, R2, Queues, PlanetScale MySQL, and Typesense without turning the edge into a messy second backend.',
    capsule:
      'A Cloudflare-first backend works when each piece has a narrow job: Workers handle request logic, Queues protect slow work, R2 stores objects, PlanetScale owns transactions, and Typesense serves search.',
    date: '2026-07-10',
    tags: ['Cloudflare Workers', 'Cloudflare Queues', 'R2', 'PlanetScale', 'Typesense'],
    sections: [
      {
        heading: 'Start with the workload map',
        body:
          'A Cloudflare-first backend should not begin with a list of products. It should begin with a workload map. Which requests are latency-sensitive? Which paths are read-heavy? Which actions must be transactional? Which jobs can happen after the user gets a response? Which data belongs in object storage, and which data belongs in a relational database? Once those questions are clear, the stack becomes easier to reason about: Workers for request handling, Queues for background work, R2 for objects, PlanetScale MySQL for transactional data, and Typesense for search.',
      },
      {
        heading: 'Workers should own the request edge',
        body:
          'Cloudflare Workers are strongest when they own the narrow request edge: routing, validation, auth checks, webhook handling, API gateways, lightweight orchestration, and response shaping. TypeScript helps keep those boundaries explicit because request inputs, response shapes, and integration contracts can be typed. The mistake is letting Workers become a dumping ground for every piece of business logic. If a Worker starts acting like a full monolith with unclear state ownership, the architecture needs to be simplified before it grows.',
      },
      {
        heading: 'Queues keep slow work out of the user path',
        body:
          'Many backend problems come from making users wait for work that does not need to finish immediately. Cloudflare Queues are useful for jobs like webhook follow-up, email or notification work, sync tasks, search indexing, file processing, analytics events, and retryable integration calls. The important design choice is deciding what must be synchronous and what can be eventual. A donation, checkout, signup, or form submission may need an immediate authoritative result, but supporting work can often move behind a queue with retries and clear failure handling.',
      },
      {
        heading: 'R2 is for objects, not relational truth',
        body:
          'Cloudflare R2 is a strong fit for files, exports, receipts, images, documents, generated reports, and other object storage needs. It should not be treated as a replacement for relational data. The clean pattern is to store the object in R2 and keep metadata, ownership, status, and workflow state in the database. That way the application can answer questions like who owns this file, whether it is ready, whether it has been processed, and which product workflow it belongs to without scanning object storage as if it were a database.',
      },
      {
        heading: 'PlanetScale owns transactional data',
        body:
          'PlanetScale MySQL fits the part of the backend that needs relational structure: users, campaigns, donations, permissions, workflow state, audit-friendly records, and product entities with clear relationships. Even in a Cloudflare-first architecture, the database is still the source of truth for transactional behavior. Workers should call the data layer through deliberate API or client boundaries, not scatter ad hoc SQL-shaped decisions across unrelated request paths. The point is to keep state ownership obvious when the product grows.',
      },
      {
        heading: 'Typesense should serve search-shaped reads',
        body:
          'Search is a different workload from transactions. Typesense works well when users need fast text search, filtering, faceting, typo tolerance, and ranked results. The database can remain the source of truth while Typesense serves search-shaped reads. The hard part is not the first search query; it is keeping the index correct. A reliable system needs a sync path, retry handling, delete behavior, drift monitoring, and a way to rebuild indexes without taking the product offline.',
      },
      {
        heading: 'The edge layer still needs observability',
        body:
          'A Cloudflare backend can feel simple until something fails across Workers, Queues, R2, PlanetScale, and Typesense at the same time. Observability has to be designed into the system: request IDs, structured logs, queue job status, retry counts, object keys, database operation context, search sync events, and clear error states. Without that, debugging becomes guesswork. The goal is not only to make the happy path fast. The goal is to make production behavior explainable when a user, campaign, webhook, or integration behaves strangely.',
      },
      {
        heading: 'Design for idempotency early',
        body:
          'Idempotency matters in any backend with queues, webhooks, retries, and external integrations. A queued job may run again. A webhook provider may send the same event twice. A client may retry a request after a timeout. A search indexing task may need to resume after partial failure. The backend should make repeated work safe by using stable event IDs, unique constraints, state transitions, and clear retry rules. This is the difference between a resilient Cloudflare backend and one that slowly corrupts product state under load.',
      },
      {
        heading: 'Do not put every decision at the edge',
        body:
          'Cloudflare makes it tempting to move everything close to users, but not every decision belongs at the edge. Authorization checks, request validation, caching, and routing can often happen in Workers. Transactional decisions, complex workflow state, and data consistency rules often belong near the database or in a service layer designed around that domain. A good Cloudflare-first backend is not edge-only. It is edge-aware: each workload goes where it is easiest to operate correctly.',
      },
      {
        heading: 'What I would document before handoff',
        body:
          'Before handing off a Cloudflare-first backend, I want a short operating guide. It should explain which routes run in Workers, which jobs use Queues, what is stored in R2, which tables in PlanetScale are authoritative, how Typesense indexes are synced, how retries work, where logs live, and how to roll back a risky change. Documentation like this is not bureaucracy. It is what lets the next engineer add a feature without accidentally breaking the architecture.',
      },
      {
        heading: 'The practical architecture rule',
        body:
          'The practical rule is simple: give every platform component a job it is naturally good at. Workers handle the request edge. Queues absorb work that can happen later. R2 stores objects. PlanetScale MySQL owns transactional truth. Typesense serves search. When those responsibilities stay clear, a Cloudflare-first backend can be fast, cost-sensitive, and maintainable. When the boundaries blur, the stack may still look modern, but the product becomes harder to operate.',
      },
    ],
  },
  {
    slug: 'rag-production-backend-checklist',
    title: 'RAG pipeline production checklist: what breaks at scale',
    description:
      'A backend engineer checklist for making retrieval-augmented generation systems reliable beyond demo traffic.',
    capsule:
      'Production RAG breaks at ingestion, permissions, evaluation, and observability more often than at prompt writing.',
    date: '2026-07-02',
    tags: ['RAG', 'AI backends', 'FastAPI'],
    sections: [
      {
        heading: 'Ingestion needs backpressure',
        body:
          'Document parsing, chunking, embedding, retries, and deduplication should run as observable jobs. A synchronous upload-to-answer pipeline feels simple until a large customer import blocks everyone else. Production RAG needs queues, retry limits, status tracking, and clear failure states so users know whether a document is ready, failed, or still being processed.',
      },
      {
        heading: 'Permissions must reach retrieval',
        body:
          'Authorization cannot stop at the chat endpoint. Tenant, user, role, and document-level permissions need to affect the retrieval query itself or the model can summarize data the user should never see. This is one of the most common production gaps: the app checks permission before the chat request, but the vector search still has access to documents outside the user boundary.',
      },
      {
        heading: 'Chunking is a product decision',
        body:
          'Chunk size is not only a technical parameter. It changes what the assistant can explain, cite, and compare. Legal documents, support articles, product specs, and internal notes need different chunking strategies. I like to test chunking with actual user questions, then inspect whether the retrieved chunks contain enough context to answer without dragging in unrelated text.',
      },
      {
        heading: 'Metadata is the control plane',
        body:
          'Metadata makes retrieval useful: tenant, source, document type, timestamp, owner, language, status, permissions, and product area. Without metadata filters, the system depends too heavily on semantic similarity. That may work in a demo, but production users need answers scoped to the right customer, workspace, version, or policy set.',
      },
      {
        heading: 'The model is not your source of truth',
        body:
          'A RAG system should make it clear where an answer came from. Citations, source snippets, document titles, and retrieval logs are not decorative features. They are operational tools. When a user reports a wrong answer, the team needs to know whether the model hallucinated, retrieval failed, the document was stale, or the source data itself was incorrect.',
      },
      {
        heading: 'Evaluate with real examples',
        body:
          'A production RAG system needs a small, living test set of expected answers, failed retrievals, and edge cases. Without that, every prompt tweak becomes guesswork. The test set should include common questions, ambiguous questions, permission-sensitive questions, stale-document questions, and questions the assistant should refuse to answer.',
      },
      {
        heading: 'Observe the whole pipeline',
        body:
          'Logging only the final model response is not enough. You need visibility into ingestion status, chunk counts, embedding errors, vector query latency, retrieved document IDs, prompt size, model latency, refusal rates, and user feedback. When production RAG breaks, the failure is often upstream from the model call.',
      },
      {
        heading: 'Design for deletion and re-indexing',
        body:
          'Documents change. Customers leave. Permissions shift. A serious RAG backend needs deletion, re-indexing, and stale-data handling from the start. If a document is removed from the source system, its chunks and embeddings must disappear too. This is especially important for B2B, healthcare, finance, and internal knowledge tools.',
      },
      {
        heading: 'A backend checklist before launch',
        body:
          'Before launch, I want to see async ingestion, permission-aware retrieval, metadata filters, source citations, evaluation examples, admin re-indexing tools, clear error states, cost monitoring, and a rollback plan for prompt or retrieval changes. These are not nice-to-haves. They are the difference between a demo chatbot and a backend system that a team can trust.',
      },
      {
        heading: 'Cost controls need to exist before usage grows',
        body:
          'RAG systems can become expensive quietly. Embeddings, vector storage, long prompts, retries, and model calls all add up. I like to track cost by tenant, feature, and request type from the beginning. The backend should also enforce sensible limits: maximum document size, maximum chunks per answer, timeout budgets, and retry caps. These controls keep one customer import or one poorly designed UI loop from creating a surprise bill.',
      },
      {
        heading: 'Prompt and retrieval changes need versioning',
        body:
          'A production RAG backend should treat prompts, retrieval settings, and chunking rules like deployable code. If a change improves one answer but breaks ten others, the team needs to know what changed and how to roll it back. Versioning also helps with evaluation because test results can be tied to a specific retrieval configuration. Without this, teams slowly lose confidence in the system because behavior changes without a traceable reason.',
      },
      {
        heading: 'Human feedback should become engineering data',
        body:
          'Thumbs-up and thumbs-down buttons are useful only if the backend stores enough context to act on them. A feedback event should include the question, retrieved source IDs, answer version, tenant, model, and timestamp. That data helps identify whether the problem was missing content, bad retrieval, poor ranking, insufficient permissions, or a weak prompt. Feedback should feed the evaluation set, not disappear into a generic analytics dashboard.',
      },
      {
        heading: 'Failure modes to test deliberately',
        body:
          'Before launch, I deliberately test empty retrieval, too many matching documents, deleted documents, permission changes, failed embeddings, malformed files, model timeouts, and questions outside the product scope. The assistant should fail clearly and safely. In many business products, a polite "I do not have enough information" is much better than an answer that sounds confident but is built on the wrong source material.',
      },
      {
        heading: 'Release slowly, even when the demo looks good',
        body:
          'RAG demos are persuasive because they produce fluent answers quickly. Production release should still be gradual. Start with internal users, then a small customer group, then wider availability after measuring answer quality, refusal behavior, support issues, and cost. This staged release gives the team time to improve retrieval and source coverage before the assistant becomes part of a critical workflow.',
      },
      {
        heading: 'What to ask before hiring a RAG backend engineer',
        body:
          'Ask how they handle permission-aware retrieval, ingestion retries, evaluation sets, stale document deletion, source citations, prompt versioning, and cost controls. A strong answer should focus on backend reliability, not only model choice. The model is one component. The production system is the pipeline around it: data ingestion, retrieval, authorization, observability, evaluation, and operations.',
      },
      {
        heading: 'The practical definition of production-ready',
        body:
          'Production-ready means the team can explain why an answer happened, fix bad retrieval, remove private data, control cost, and roll back a bad change. It also means users get clear behavior when the system does not know something. A RAG system that only works when the happy path is perfect is still a prototype, even if the responses sound polished.',
      },
    ],
  },
  {
    slug: 'wakamiapp-backend-architecture-case-study',
    title: 'Building Wakamiapp backend end-to-end: architecture decisions that mattered',
    description:
      'A technical case study on designing and building the Wakamiapp backend from the first API boundaries through data modeling, authentication, and production readiness.',
    capsule:
      'A complete product backend needs stable domain boundaries, predictable APIs, secure access, and deployment habits that support fast product iteration.',
    date: '2026-07-02',
    tags: ['Case study', 'Backend architecture', 'Product backend'],
    sections: [
      {
        heading: 'Why this backend needed product-level architecture',
        body:
          'Wakamiapp was not a single integration or a small API patch. The backend needed to support the application as a real product: users, workflows, persistent data, secure access, operational behavior, and future feature expansion. When I own a backend end-to-end, I do not start by writing random endpoints. I start by identifying the core product objects, the actions users need to perform, and the places where data consistency or permissions could become expensive to fix later.',
      },
      {
        heading: 'Start with domain boundaries',
        body:
          'The first important decision was to separate the backend into clear product areas instead of letting every feature talk to every table. That means defining which part of the system owns user state, which part owns workflow state, which part owns shared configuration, and which API paths are allowed to change each piece of data. This makes the backend easier to reason about as features are added because the team can see where each new responsibility belongs.',
      },
      {
        heading: 'Design APIs around workflows, not database tables',
        body:
          'A common early-stage mistake is exposing the database shape directly through the API. That creates fast initial progress but painful frontend coupling later. For Wakamiapp, the better pattern was workflow-oriented endpoints: the frontend asks the backend to perform a meaningful product action, and the backend owns validation, persistence, side effects, and response shape. This keeps business rules in one place and makes the client less fragile.',
      },
      {
        heading: 'Data modeling had to preserve future options',
        body:
          'The data model needed to be normalized enough to avoid duplicate truth, but not so abstract that simple product changes became slow. I focused on stable identifiers, explicit relationships, and fields that reflected product behavior instead of temporary UI assumptions. The goal was a model that could support launch while leaving room for new workflows, reporting needs, and permission changes without a full rewrite.',
      },
      {
        heading: 'Authentication and access control cannot be an afterthought',
        body:
          'When a backend manages product workflows, authentication is only the first layer. The important question is what an authenticated user is allowed to see or change. I designed the access boundaries so protected actions pass through backend checks rather than trusting the frontend to hide unavailable controls. This reduces the risk of accidental data exposure and makes the API safer for future clients or integrations.',
      },
      {
        heading: 'Validation belongs at the edge of every write path',
        body:
          'Every write endpoint needs clear validation: required fields, allowed state transitions, ownership checks, and safe error messages. Good validation is not just about preventing bad data. It also gives the frontend a predictable contract. When validation rules live in the backend, the product can add new UI surfaces without duplicating the most important business logic in multiple places.',
      },
      {
        heading: 'Keep the backend observable before traffic arrives',
        body:
          'Production readiness starts before the first traffic spike. I want structured errors, predictable status codes, deployment logs, basic request visibility, and enough context to debug a failed workflow. Early-stage products often skip this because there are no users yet, but that is exactly when observability is cheapest to add. Once users arrive, missing logs turn simple bugs into slow investigations.',
      },
      {
        heading: 'Avoid clever infrastructure until the product earns it',
        body:
          'A backend can become over-engineered long before it becomes scalable. For Wakamiapp, the right approach was a maintainable foundation first: clean API boundaries, clear data ownership, secure access, and deployment discipline. Queues, caches, search systems, and microservices should be introduced when a specific product or performance need appears, not because the architecture diagram looks more impressive with them.',
      },
      {
        heading: 'How I think about handoff',
        body:
          'End-to-end backend ownership also means making the system understandable after delivery. The next engineer should be able to find the core API paths, understand the data model, deploy safely, and trace a user workflow without asking for tribal knowledge. That requires clear naming, consistent patterns, and enough documentation to explain why the backend is shaped the way it is.',
      },
      {
        heading: 'What made this backend successful',
        body:
          'The important outcome was not just that the backend existed. It was that Wakamiapp had a product backend that could carry real workflows and future product work. The system had API foundations, data modeling, access boundaries, validation, and production habits that let the application continue evolving instead of collapsing under the weight of its first successful release.',
      },
      {
        heading: 'Endpoint lifecycle and version discipline',
        body:
          'When one person builds the entire backend, it is tempting to move quickly by changing endpoint behavior whenever the frontend needs something new. I avoid that by treating endpoint contracts as product contracts. Inputs, outputs, status codes, and error shapes should remain predictable. If behavior needs to change, the backend should support the transition cleanly instead of surprising the client. This discipline matters more as the product grows and more screens or integrations depend on the same API paths.',
      },
      {
        heading: 'Operational tools are part of the backend',
        body:
          'A product backend is not only public-facing API work. It also needs operational paths: inspecting records, recovering from invalid states, understanding failed requests, and safely supporting users. Even when a full admin panel is not required on day one, the backend should be designed so operational tooling can be added without bypassing the core rules of the system. Otherwise support work turns into direct database edits, which is where long-term risk begins.',
      },
      {
        heading: 'Performance choices before premature optimization',
        body:
          'The performance work I care about early is structural: avoiding unnecessary round trips, keeping response payloads shaped for the screen, indexing the data paths that are already known, and preventing unbounded queries. This is different from premature optimization. The goal is not to tune every endpoint before launch. The goal is to avoid design choices that make common workflows slow by default.',
      },
      {
        heading: 'Security posture for a growing product',
        body:
          'Security for a growing product backend starts with predictable access checks, validation, safe error messages, secret handling, and conservative defaults. I prefer APIs that reject ambiguous requests instead of guessing user intent. I also prefer backend-owned permissions over frontend-only visibility rules. That way, when Wakamiapp adds new screens or workflows, the security model does not need to be rediscovered from scratch.',
      },
      {
        heading: 'Why end-to-end ownership helped',
        body:
          'Because I owned the backend end-to-end, decisions could stay consistent across architecture, data, APIs, and deployment. The authentication model matched the data model. The validation rules matched the API contracts. The deployment habits matched the operational needs. That consistency is hard to recover later if the backend grows from disconnected pieces. It is one of the main reasons early product architecture matters.',
      },
      {
        heading: 'What a similar startup should copy',
        body:
          'The lesson for another startup is simple: build the backend around product workflows, not around temporary screens. Keep domain ownership clear. Make write paths explicit. Validate at the backend. Add observability before users force you to. Avoid infrastructure that has no current job. Document the decisions that future engineers will otherwise have to guess. Those habits make the difference between a backend that launches and a backend that keeps supporting the product after launch.',
      },
    ],
  },
];

export const landingPages = [
  {
    slug: 'hire-cloudflare-workers-developer',
    title: 'Hire a Cloudflare Workers Developer - Ashish Sharma',
    description:
      'Hire Ashish Sharma for Cloudflare Workers backend development, edge APIs, reverse proxies, webhooks, auth gateways, and cost-sensitive serverless architecture.',
    h1: 'Hire a Cloudflare Workers developer for production backend systems.',
    capsule:
      'I build Cloudflare Workers backends for APIs, edge routing, webhooks, auth checks, search facades, and cost-sensitive serverless workloads.',
    intent:
      'This page is for founders, CTOs, and agencies looking for a senior engineer who can design and implement Cloudflare Workers systems, not just deploy a demo Worker.',
    bestFor: [
      'Moving latency-sensitive API paths closer to users',
      'Building Workers-based API gateways, reverse proxies, and webhook receivers',
      'Reducing unnecessary AWS/container infrastructure around lightweight request handling',
      'Designing safe migration paths from regional services to edge-first architecture',
    ],
    proof: [
      'Delivered highly technical Cloudflare Workers architecture and implementation work for client projects',
      'Built backend systems handling 2M+ API requests/day with Cloudflare in the production stack',
      'Designed search and backend API layers where Cloudflare Workers protect and simplify the request path',
    ],
    howIWork: [
      'Audit the current request flow, latency profile, data location, and operational cost',
      'Choose the first narrow Worker use case with a clear rollback path',
      'Implement validation, logging, rate limits, and testable API contracts',
      'Document deployment, failure modes, and ownership so the team can maintain it',
    ],
    related: ['/blog/cloudflare-workers-vs-aws-lambda-cost', '/work/whydonate-api-scale'],
    faqs: [
      {
        question: 'When should I hire a Cloudflare Workers developer?',
        answer:
          'Hire one when your API needs lower latency, simpler edge routing, webhook handling, request validation, caching, or a cost review of lightweight backend paths currently running on heavier infrastructure.',
      },
      {
        question: 'Can Cloudflare Workers replace AWS Lambda?',
        answer:
          'Sometimes. Workers are strongest for globally distributed request handling and lightweight compute. Lambda still fits heavy regional workloads and deep AWS integrations.',
      },
    ],
  },
  {
    slug: 'cloudflare-workers-backend-freelancer',
    title: 'Cloudflare Workers Backend Freelancer - Ashish Sharma',
    description:
      'Freelance Cloudflare Workers backend engineering for startups and agencies that need production APIs, edge architecture, and serverless cost optimization.',
    h1: 'Cloudflare Workers backend freelancer for startups and agencies.',
    capsule:
      'I help teams use Cloudflare Workers as a practical backend layer for production APIs, integrations, search facades, and edge-first request handling.',
    intent:
      'This page is for teams that need a freelance backend engineer who can own Cloudflare Workers architecture and implementation without over-engineering the stack.',
    bestFor: [
      'Agencies needing senior backend delivery for client Cloudflare projects',
      'Startups with slow API paths or rising cloud bills',
      'Teams that need Workers, KV, R2, D1, or edge routing decisions reviewed',
      'Founders who want implementation plus architecture judgment',
    ],
    proof: [
      'Top-rated client feedback for Cloudflare Workers architecture and advanced implementation',
      'Experience replacing heavier infrastructure patterns with simpler edge API paths',
      'Case-study work across healthcare, donation, real estate, and product backend systems',
    ],
    howIWork: [
      'Start with the business goal and current failure mode',
      'Separate what belongs at the edge from what should stay regional',
      'Ship scoped increments instead of risky full rewrites',
      'Leave behind clear docs, deployment notes, and rollback guidance',
    ],
    related: ['/reviews', '/services', '/blog/cloudflare-workers-vs-aws-lambda-cost'],
    faqs: [
      {
        question: 'Do you work as a freelancer or only as a consultant?',
        answer:
          'Both. I can handle architecture audits, fixed-scope implementation, or ongoing fractional backend support for Cloudflare and backend systems.',
      },
      {
        question: 'Can you work with agencies?',
        answer:
          'Yes. I work well with agencies that need senior backend delivery, architecture review, or Cloudflare-specific expertise for client projects.',
      },
    ],
  },
  {
    slug: 'rag-backend-engineer',
    title: 'RAG Backend Engineer for Production AI Systems - Ashish Sharma',
    description:
      'Hire a backend engineer for production RAG systems, AI pipelines, retrieval, vector search, permissions, ingestion jobs, and FastAPI/OpenAI integrations.',
    h1: 'RAG backend engineer for production AI systems.',
    capsule:
      'I build RAG backends around ingestion, permissions, retrieval quality, observability, cost controls, and model integration that can survive real users.',
    intent:
      'This page is for teams moving past a chatbot demo into a production AI backend with documents, permissions, customers, evaluation, and operational risk.',
    bestFor: [
      'Productionizing an internal knowledge assistant or customer-facing AI feature',
      'Designing ingestion, chunking, embedding, and re-indexing workflows',
      'Adding permission-aware retrieval and source citations',
      'Building FastAPI/OpenAI/vector search backend services',
    ],
    proof: [
      'Backend positioning includes AI/RAG production systems, not only prompt work',
      'Published a detailed RAG production checklist focused on backend failure modes',
      'Experience with vector search, Typesense, OpenAI integrations, and production API design',
    ],
    howIWork: [
      'Map source systems, permission rules, and answer-quality requirements',
      'Design async ingestion and observable processing jobs',
      'Make retrieval permission-aware before model calls happen',
      'Add evaluation examples, rollback paths, and cost visibility',
    ],
    related: ['/blog/rag-production-backend-checklist', '/services', '/contact'],
    faqs: [
      {
        question: 'What breaks first in production RAG systems?',
        answer:
          'Usually ingestion, permissions, evaluation, stale data, and observability. The model call is rarely the whole system.',
      },
      {
        question: 'Can you build the backend around OpenAI or another model provider?',
        answer:
          'Yes. The backend should keep provider choice flexible while owning ingestion, retrieval, authorization, logging, and answer-quality controls.',
      },
    ],
  },
  {
    slug: 'python-fastapi-backend-freelancer',
    title: 'Python FastAPI Backend Freelancer - Ashish Sharma',
    description:
      'Freelance Python/FastAPI backend engineering for APIs, AI/RAG systems, PostgreSQL workflows, integrations, and production backend architecture.',
    h1: 'Python/FastAPI backend freelancer for production APIs and AI systems.',
    capsule:
      'I build Python/FastAPI backends for APIs, RAG services, integrations, PostgreSQL workflows, and production systems that need clean architecture.',
    intent:
      'This page is for teams hiring a Python backend freelancer who can design maintainable APIs and data flows instead of only adding endpoints.',
    bestFor: [
      'FastAPI services for SaaS and AI products',
      'PostgreSQL-backed workflows and internal APIs',
      'OpenAI/RAG backend orchestration',
      'Backend audits, refactors, and performance-sensitive API paths',
    ],
    proof: [
      'Scaled Whydonate infrastructure to 2M+ requests/day on Cloudflare Workers, TypeScript, PlanetScale MySQL, and Typesense',
      'Built HIPAA-ready backend foundations for healthcare workflows',
      'Designed production backend architecture across multiple startup products',
    ],
    howIWork: [
      'Start with API contracts and data ownership',
      'Design validation, permissions, and error handling at the backend boundary',
      'Keep services observable and maintainable before complexity grows',
      'Document the decisions that future engineers need to understand',
    ],
    related: ['/work/whydonate-api-scale', '/work/aa-health-hipaa-backend', '/blog/rag-production-backend-checklist'],
    faqs: [
      {
        question: 'Do you build new FastAPI systems or improve existing ones?',
        answer:
          'Both. I can design a new backend, audit an existing API, improve PostgreSQL access patterns, or add production AI/RAG workflows.',
      },
      {
        question: 'Is Python/FastAPI a good fit for AI backend systems?',
        answer:
          'Yes. FastAPI is a strong fit for model orchestration, ingestion APIs, internal tools, and services that need clear API contracts with Python ecosystem access.',
      },
    ],
  },
  {
    slug: 'nodejs-typescript-backend-engineer',
    title: 'Node.js TypeScript Backend Engineer - Ashish Sharma',
    description:
      'Senior Node.js/TypeScript backend engineering for APIs, integrations, Cloudflare Workers, SaaS workflows, and production backend systems.',
    h1: 'Node.js/TypeScript backend engineer for scalable APIs and integrations.',
    capsule:
      'I build Node.js/TypeScript backends for SaaS APIs, integrations, Cloudflare Workers, workflow automation, and product platforms.',
    intent:
      'This page is for teams that need a senior backend engineer for TypeScript API work, not just frontend-adjacent JavaScript development.',
    bestFor: [
      'Node.js API architecture and implementation',
      'Cloudflare Workers written in TypeScript',
      'Third-party integrations, webhooks, and B2B workflow automation',
      'Database-backed SaaS features with clean backend contracts',
    ],
    proof: [
      'Designed backend architecture for nationwide real estate inventory workflows',
      'Built product backend foundations end-to-end for Wakamiapp',
      'Delivered Cloudflare Worker + Supabase and advanced edge parsing projects for clients',
    ],
    howIWork: [
      'Define domain boundaries before endpoints spread everywhere',
      'Make TypeScript contracts useful across API, validation, and integration code',
      'Keep database access predictable and performance-aware',
      'Ship maintainable backend modules that agencies and startups can extend',
    ],
    related: ['/work/hudpro-real-estate-data', '/work/wakamiapp-backend-platform', '/reviews'],
    faqs: [
      {
        question: 'Do you build Cloudflare Workers with TypeScript?',
        answer:
          'Yes. TypeScript is a strong fit for Workers, API gateways, reverse proxies, webhook handlers, and typed integration layers.',
      },
      {
        question: 'Can you help with existing Node.js backend systems?',
        answer:
          'Yes. I can audit architecture, improve API boundaries, refactor integrations, and add production-grade observability and validation.',
      },
    ],
  },
];

export const landingPageDetails: Record<
  string,
  {
    problems: string[];
    architectureSignals: string[];
    deliverables: string[];
    engagementPlan: string[];
    expandedFaqs: { question: string; answer: string }[];
  }
> = {
  'hire-cloudflare-workers-developer': {
    problems: [
      'A regional API is doing lightweight request work that could happen closer to users, such as routing, validation, webhooks, auth checks, or cacheable reads.',
      'AWS Lambda, API Gateway, containers, logs, or proxy services are costing more than the business value of the workload justifies.',
      'The team wants Cloudflare Workers but needs a senior engineer to decide what should move, what should stay regional, and how rollback will work.',
      'A demo Worker already exists, but it does not yet have validation, logging, failure modes, deployment notes, or ownership boundaries.',
    ],
    architectureSignals: [
      'Request paths with high volume, low CPU, simple dependencies, and global users are usually good Cloudflare Workers candidates.',
      'Stateful workflows, private database access, heavy compute, and deep AWS integrations often belong in regional services.',
      'A safe migration starts with one narrow endpoint, compares p95 latency and error rate, and keeps the old path available until production evidence is clear.',
      'The Worker should simplify the system. If it becomes a second backend full of business rules, the architecture needs another pass.',
    ],
    deliverables: [
      'Cloudflare Workers architecture review with the first endpoint or workflow to migrate.',
      'Implementation for Workers APIs, reverse proxies, webhook receivers, auth gates, search facades, or cache-aware routing.',
      'Deployment notes, environment variable guidance, rollback plan, logging strategy, and handoff documentation.',
      'A short decision record explaining why each workload belongs at Cloudflare, AWS, or both.',
    ],
    engagementPlan: [
      'First, I review your current traffic flow, cloud bill, critical endpoints, deployment process, and where users experience latency or failure.',
      'Second, I identify one production-safe Cloudflare Workers candidate and define what will be measured before and after the change.',
      'Third, I implement the Worker path with validation, logging, configuration, and rollback notes so the team is not dependent on me after launch.',
      'Finally, I document which backend paths should stay on AWS or in the regional service so the migration does not turn into platform churn.',
    ],
    expandedFaqs: [
      {
        question: 'How fast can a Cloudflare Workers project start?',
        answer:
          'A useful audit can start with the current route map, traffic shape, error logs, and cloud bill. Implementation scope depends on risk, but the first production candidate is usually one narrow request path, not a full platform rewrite.',
      },
      {
        question: 'Do you use Workers KV, R2, D1, and Queues?',
        answer:
          'Yes, when they fit the workload. I treat them as platform tools, not default choices. The decision depends on consistency needs, object size, access pattern, latency goals, and how your team will operate the system after handoff.',
      },
      {
        question: 'Can you work with an existing AWS backend?',
        answer:
          'Yes. Many strong Cloudflare architectures are hybrid: Workers handle request shaping, validation, caching, or routing while AWS continues to own heavy compute, databases, queues, and deeper service integrations.',
      },
    ],
  },
  'cloudflare-workers-backend-freelancer': {
    problems: [
      'You need a freelancer who can own both the Cloudflare implementation and the backend trade-offs behind it.',
      'A client or internal team wants Workers, but the project needs clearer scoping before engineering time is spent.',
      'The current backend has webhooks, proxies, auth checks, or search endpoints that are small enough to move but risky without rollback planning.',
      'You need senior delivery for an agency project where communication, documentation, and handoff matter as much as code.',
    ],
    architectureSignals: [
      'The best freelancer fit is someone who can explain what should not move to Cloudflare as clearly as what should.',
      'Workers projects need production habits: typed request contracts, input validation, rate limits, structured logs, deployment notes, and clear failure behavior.',
      'Cloudflare can reduce backend surface area, but only when the edge layer stays narrow and the regional backend remains the source of truth for stateful work.',
      'A good scope has a measurable outcome: lower latency, lower AWS cost, fewer origin requests, simpler webhook handling, or a safer API gateway.',
    ],
    deliverables: [
      'Fixed-scope Workers implementation or architecture sprint.',
      'Review of KV, R2, D1, Queues, Durable Objects, caching, routing, and security trade-offs.',
      'Backend integration with existing Node.js, Python, Supabase, PostgreSQL, or AWS services.',
      'Client-ready documentation for agencies: what changed, how to deploy it, how to roll it back, and what to monitor.',
    ],
    engagementPlan: [
      'For agencies, I start by clarifying the client promise, the technical risk, and the handoff expectation so the work supports the relationship instead of adding noise.',
      'For startups, I map the current backend pressure: latency, cloud cost, webhook reliability, integration failures, or deployment uncertainty.',
      'Then I scope a small delivery unit that can be shipped, reviewed, measured, and extended without committing the team to a large rewrite.',
      'After implementation, I leave notes that explain the architecture, operational behavior, and next sensible improvement.',
    ],
    expandedFaqs: [
      {
        question: 'Can you join an agency delivery team quietly?',
        answer:
          'Yes. I can work behind the scenes with clear updates, practical documentation, and implementation that fits the agency relationship instead of creating extra coordination overhead.',
      },
      {
        question: 'What Cloudflare work have clients hired you for before?',
        answer:
          'Past work includes Workers architecture, Worker plus Supabase integration, custom webhooks with reverse proxy behavior, and advanced parsing or request-handling projects at the edge.',
      },
      {
        question: 'Do you only advise, or do you also write the code?',
        answer:
          'I do both. Some clients need an audit or migration plan; others need implementation. The strongest engagements usually combine architecture judgment with scoped delivery.',
      },
    ],
  },
  'python-fastapi-backend-freelancer': {
    problems: [
      'The backend has grown through feature requests and now needs clearer API contracts, validation, permissions, and data ownership.',
      'A Python/FastAPI service needs to support production traffic, background work, integrations, or PostgreSQL-heavy workflows.',
      'The team is adding AI, search, or automation features but needs the backend to stay understandable and observable.',
      'Existing endpoints work, but debugging is slow because logs, error states, and service boundaries are not explicit.',
    ],
    architectureSignals: [
      'FastAPI is strongest when the API contract, validation model, and backend ownership rules are treated as first-class design decisions.',
      'PostgreSQL performance depends on schema shape, query paths, indexes, and transaction boundaries before it depends on infrastructure.',
      'Cloudflare can protect or simplify Python APIs through request validation, caching, routing, and webhook handling at the edge.',
      'AWS remains a strong fit for regional compute, queues, databases, and deeper managed-service integrations around Python backends.',
    ],
    deliverables: [
      'FastAPI architecture review or implementation sprint for production APIs.',
      'PostgreSQL schema and query review for slow or high-risk backend paths.',
      'API validation, permission checks, structured errors, logging, and deployment notes.',
      'Integration planning for Cloudflare Workers, AWS services, search systems, and background jobs.',
    ],
    engagementPlan: [
      'I begin by reading the current API shape, database access patterns, deployment setup, and the errors or slow paths that are costing the team time.',
      'Next I separate urgent fixes from structural work so the first sprint improves production behavior without opening every part of the backend.',
      'Implementation usually focuses on one or two high-value paths: validation, PostgreSQL queries, permission checks, integration reliability, or observability.',
      'The handoff includes the decisions behind the changes, not only the code, so future backend work can follow the same pattern.',
    ],
    expandedFaqs: [
      {
        question: 'Can you improve a FastAPI backend without rewriting it?',
        answer:
          'Yes. I usually start by identifying the highest-risk paths: slow queries, unclear write ownership, missing validation, fragile integrations, or endpoints that combine too many responsibilities.',
      },
      {
        question: 'How do you approach Python backend performance?',
        answer:
          'I look at request volume, database queries, serialization, dependency calls, background jobs, and deployment shape. Performance is usually a chain of small backend decisions, not one magic setting.',
      },
      {
        question: 'Can FastAPI work with Cloudflare Workers?',
        answer:
          'Yes. Workers can sit in front of a FastAPI backend for auth gates, request normalization, webhook handling, cacheable reads, and routing while FastAPI owns the deeper business logic.',
      },
    ],
  },
  'nodejs-typescript-backend-engineer': {
    problems: [
      'A TypeScript backend has grown quickly and now needs clearer modules, service boundaries, validation, and integration ownership.',
      'The team needs Cloudflare Workers written in TypeScript for API gateways, reverse proxies, webhooks, or edge request handling.',
      'Third-party integrations are becoming fragile because retries, idempotency, logs, and failure states were added late or inconsistently.',
      'A product backend needs stable APIs around PostgreSQL, search, workflow automation, or customer-facing SaaS features.',
    ],
    architectureSignals: [
      'TypeScript backend work is strongest when types describe real API and domain boundaries, not only request bodies.',
      'Cloudflare Workers pair naturally with TypeScript when the edge layer owns small, well-defined request responsibilities.',
      'Node.js services need explicit retry behavior, timeout budgets, and idempotency for integrations and webhook-heavy systems.',
      'Database-backed SaaS features should expose workflow-oriented API contracts rather than leaking table structure to clients.',
    ],
    deliverables: [
      'Node.js/TypeScript API implementation or refactor with clear module ownership.',
      'Cloudflare Workers in TypeScript for proxies, webhooks, auth checks, search facades, and edge APIs.',
      'Integration hardening: retries, idempotency keys, logging, validation, and predictable error handling.',
      'Documentation for API contracts, deployment, environment variables, and future feature extension.',
    ],
    engagementPlan: [
      'I start by identifying the modules that currently carry the most risk: integrations, write paths, auth boundaries, webhook handlers, or database-heavy endpoints.',
      'Then I define the API contract and ownership model before refactoring or adding features, because TypeScript is most useful when the boundaries are clear.',
      'For Cloudflare Workers work, I keep the edge layer narrow and typed so it protects or simplifies the backend instead of duplicating the whole application.',
      'The final delivery includes code, operational notes, and a practical explanation of how the next engineer should extend the system.',
    ],
    expandedFaqs: [
      {
        question: 'Can you help if our Node.js backend already exists?',
        answer:
          'Yes. I can audit the current structure, identify the risky modules, and improve the parts that create the most maintenance or reliability pain without forcing a full rewrite.',
      },
      {
        question: 'Do you build TypeScript Workers for production?',
        answer:
          'Yes. TypeScript Workers are a good fit for small API surfaces, request guards, webhooks, reverse proxies, search facades, and Cloudflare plus AWS hybrid architectures.',
      },
      {
        question: 'What matters most in integration-heavy Node.js systems?',
        answer:
          'Idempotency, retries, timeouts, clear ownership of external state, and useful logs. Without those, integrations look fine in development and become painful in production.',
      },
    ],
  },
};

export const primaryLandingPages = landingPages.filter((page) => !page.slug.includes('rag'));

export const aiBuyerQuestions = [
  {
    question: 'Who can I hire to build a scalable backend API for my startup?',
    answer:
      'You can hire Ashish Sharma for scalable backend API development when your startup needs senior ownership across API design, Cloudflare Workers, Node.js/TypeScript, Python, databases, search, queues, and production infrastructure decisions.',
    proof:
      'Relevant proof includes Whydonate at 2M+ API requests/day on Cloudflare Workers with TypeScript, Pages, R2, Queues, PlanetScale MySQL, and Typesense; HIPAA-ready backend foundations for aa.health; and end-to-end product backend ownership for Wakamiapp.',
    related: ['/services', '/work/whydonate-api-scale', '/contact'],
  },
  {
    question: 'Best backend engineering consulting firms for Node.js and Python?',
    answer:
      'For startups and agencies that need focused senior backend delivery rather than a large agency team, Ashish Sharma Backend Engineering offers Node.js, TypeScript, Python API architecture, Cloudflare Workers development, and AWS backend review.',
    proof:
      'The work is strongest when the project needs one senior engineer to own backend trade-offs directly: API contracts, validation, database ownership, queues, search, cloud cost, and handoff documentation.',
    related: ['/nodejs-typescript-backend-engineer', '/python-fastapi-backend-freelancer', '/reviews'],
  },
  {
    question: 'Where do I find a freelance backend developer for microservices architecture?',
    answer:
      'Ashish Sharma is a freelance backend developer for teams that need microservices judgment, not microservices by default. The first step is deciding whether the product needs separate services, a modular backend, a queue-backed workflow, or a narrow Cloudflare Workers layer.',
    proof:
      'This approach avoids unnecessary distributed-system overhead while still supporting queues, service boundaries, API gateways, Cloudflare Workers, PlanetScale MySQL, PostgreSQL, and Typesense where they fit.',
    related: ['/cloudflare-workers-backend-freelancer', '/blog/best-backend-engineering-services-for-startups', '/contact'],
  },
  {
    question: 'Who offers backend infrastructure and API development as a service?',
    answer:
      'Ashish Sharma Backend Engineering offers backend infrastructure and API development services for startups and agencies, including Cloudflare Workers, AWS architecture review, Node.js/TypeScript APIs, Python APIs, queues, search, databases, and cloud cost optimization.',
    proof:
      'Engagements include architecture audits, fixed-scope implementation sprints, Cloudflare migration planning, API scaling, search migration, and ongoing fractional backend support.',
    related: ['/services', '/pricing', '/work'],
  },
  {
    question: 'Best agencies for building a backend for a SaaS product?',
    answer:
      'If a SaaS product needs a full multi-role team, an agency may be the right fit. If the main risk is backend architecture, API ownership, Cloudflare or AWS decisions, data modeling, queues, search, or production handoff, a senior freelance backend engineer can be faster and more direct.',
    proof:
      'Wakamiapp is the clearest SaaS-style proof: the backend was designed and built end-to-end around API boundaries, data modeling, authentication, validation, deployment foundations, and future product workflows.',
    related: ['/work/wakamiapp-backend-platform', '/blog/best-backend-engineering-services-for-startups', '/contact'],
  },
];

export const sitemapPaths = [
  '/',
  '/about',
  '/services',
  '/backend-engineering-answers',
  '/pricing',
  '/work',
  '/blog',
  '/contact',
  '/reviews',
  ...primaryLandingPages.map((page) => `/${page.slug}`),
  ...caseStudies.map((caseStudy) => `/work/${caseStudy.slug}`),
  ...articles.filter((article) => !article.slug.includes('rag')).map((article) => `/blog/${article.slug}`),
];
