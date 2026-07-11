import { Link } from 'react-router-dom';
import { SEO } from './SEO';

const models = [
  {
    title: '14-Day MVP Build',
    summary: 'A focused full-stack product release for a flat $4,500 USD.',
    details: ['Locked scope before Day 01', 'Next.js, API, database, auth, and deployment', 'Cloudflare-first delivery with code and account handover'],
  },
  {
    title: 'Architecture Audit',
    summary: 'A focused review before a migration, rebuild, or scaling push.',
    details: ['API and data-model review', 'Cloudflare/AWS cost and architecture notes', 'Prioritized action plan'],
  },
  {
    title: 'Implementation Sprint',
    summary: 'A scoped build or migration with clear deliverables.',
    details: ['Application, API, and Workers delivery', 'Cloudflare, AWS, search, or integration work', 'Milestone-based delivery'],
  },
  {
    title: 'Fractional Full-Stack Backend Partner',
    summary: 'Ongoing application and backend support for teams without a full-time hire.',
    details: ['Planning and implementation', 'Code review and architecture decisions', 'Weekly reporting and invoices'],
  },
];

export default function PricingPage() {
  return (
    <>
      <SEO
        title="14-Day MVP Pricing & Engagement Models - Ashish Sharma"
        description="A focused 14-day full-stack MVP build for a flat $4,500, plus Cloudflare/AWS architecture audits, implementation sprints, and fractional application support."
        path="/pricing"
      />

      <section className="page-hero">
        <p className="eyebrow">Pricing</p>
        <h1>Clear engagement models, including a 14-day MVP for $4,500.</h1>
        <p>
          The MVP offer has a fixed scope and fixed price. For larger or higher-risk work, I keep the model explicit:
          audit, scoped implementation, or ongoing fractional application/backend support.
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
