import { Link } from 'react-router-dom';
import { SEO } from './SEO';

const models = [
  {
    title: 'Architecture Audit',
    summary: 'A focused review before a migration, rebuild, or scaling push.',
    details: ['API and data-model review', 'Cloudflare/AWS cost and architecture notes', 'Prioritized action plan'],
  },
  {
    title: 'Implementation Sprint',
    summary: 'A scoped build or migration with clear deliverables.',
    details: ['Backend APIs and Workers', 'Cloudflare, AWS, search, or integration work', 'Milestone-based delivery'],
  },
  {
    title: 'Fractional Backend Partner',
    summary: 'Ongoing senior backend support for teams without a full-time hire.',
    details: ['Planning and implementation', 'Code review and architecture decisions', 'Weekly reporting and invoices'],
  },
];

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Pricing & Engagement Models - Ashish Sharma"
        description="Engagement models for backend architecture audits, implementation sprints, and fractional backend engineering support."
        path="/pricing"
      />

      <section className="page-hero">
        <p className="eyebrow">Pricing</p>
        <h1>Transparent engagement models before money changes hands.</h1>
        <p>
          Pricing depends on scope, urgency, and risk. I keep the model explicit: audit, scoped implementation,
          or ongoing fractional backend support.
        </p>
      </section>

      <section>
        <div className="card-grid">
          {models.map((model) => (
            <article className="card" key={model.title}>
              <h2>{model.title}</h2>
              <p>{model.summary}</p>
              <ul className="compact-list">
                {model.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Invoicing</h2>
        <p>
          Remote B2B contracts can be invoiced in USD, EUR, or GBP. For fixed-scope work, milestones and acceptance
          criteria are agreed before implementation starts.
        </p>
        <Link className="btn-primary" to="/contact">Discuss scope</Link>
      </section>
    </>
  );
}
