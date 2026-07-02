export const SITE_URL = 'https://sarmaasis.com';
export const EMAIL = 'sarmaasis@gmail.com';
export const CALENDLY_URL = 'https://calendly.com/sarmaasis';

export const POSITIONING =
  'Senior Backend Engineer -- Cloudflare Workers, Node.js/TypeScript & Python/FastAPI, AI/RAG production backends.';

export const OFFER =
  'I help funded startups and agencies scale APIs, cut cloud costs, and ship AI-integrated backend systems without technical debt.';

export const marketSignals = [
  'Remote contracts with 4+ hours/day overlap for US Eastern and EU Central teams.',
  'USD, EUR, and GBP invoicing available for agency and startup contracts.',
  'Experience with HIPAA-ready and GDPR-adjacent backend data flows.',
];

export const services = [
  {
    title: 'Cloudflare Workers & Edge Backends',
    description:
      'Production APIs, reverse proxies, background jobs, KV/R2/D1 integrations, and edge-first architecture designed for low latency and simple operations.',
  },
  {
    title: 'Node.js, TypeScript & Python/FastAPI',
    description:
      'Backend systems for SaaS, marketplaces, healthcare, real estate, and AI products with clean API contracts, observability, and maintainable service boundaries.',
  },
  {
    title: 'AI/RAG Production Systems',
    description:
      'RAG pipelines, OpenAI integrations, vector search, retrieval quality checks, and backend orchestration that survives real customer traffic.',
  },
  {
    title: 'Cloud Cost & Search Migration',
    description:
      'Audit high-cost AWS services, move suitable workloads to Cloudflare, and replace expensive search stacks with focused alternatives such as Typesense.',
  },
  {
    title: 'Architecture Audits',
    description:
      'A practical review of API performance, data modeling, scaling risks, security posture, and the decisions most likely to slow your next release.',
  },
  {
    title: 'Fractional Backend Leadership',
    description:
      'Technical planning, code review, implementation guidance, and delivery support for founders and agencies that need senior backend judgment without a full-time hire.',
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
      'Scaled API infrastructure for sustained donor campaign traffic across Python, PostgreSQL, and Cloudflare.',
    outcome:
      'Kept fundraising workflows stable at 2M+ API requests/day.',
    metrics: ['2M+ API requests/day', 'Campaign traffic spike handling', 'Currency and donation analytics support'],
    stack: ['Python', 'PostgreSQL', 'Cloudflare', 'API scaling'],
    challenge:
      'Donation platforms have uneven traffic: quiet periods, sudden campaign spikes, payment-adjacent workflows, and analytics queries competing for backend capacity.',
    approach:
      'I improved API paths, data access patterns, and Cloudflare-facing behavior so high-volume traffic did not overload core fundraising workflows.',
    result:
      'The platform stayed stable under sustained donor traffic while supporting additional donation and currency filtering work.',
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
    title: 'Hire a Cloudflare Workers Developer | Ashish Sharma',
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
    title: 'Cloudflare Workers Backend Freelancer | Ashish Sharma',
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
    title: 'RAG Backend Engineer for Production AI Systems | Ashish Sharma',
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
    title: 'Python FastAPI Backend Freelancer | Ashish Sharma',
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
      'Scaled Python/PostgreSQL API infrastructure for Whydonate to 2M+ requests/day',
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
    title: 'Node.js TypeScript Backend Engineer | Ashish Sharma',
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

export const sitemapPaths = [
  '/',
  '/about',
  '/services',
  '/pricing',
  '/work',
  '/blog',
  '/contact',
  '/reviews',
  ...landingPages.map((page) => `/${page.slug}`),
  ...caseStudies.map((caseStudy) => `/work/${caseStudy.slug}`),
  ...articles.map((article) => `/blog/${article.slug}`),
];
