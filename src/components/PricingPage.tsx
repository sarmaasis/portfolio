import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { CAL_URL, SITE_URL } from '../data/site';

const models = [
  {
    title: '14-Day MVP Build',
    price: '$4,500 USD flat',
    summary: 'One core workflow shipped in 14 days. Scope is locked before Day 01.',
    details: ['Next.js, API, auth, database, and deployment', 'Cloudflare-first when it fits', 'Source code and account handover'],
    href: '/',
    cta: 'See the MVP offer',
  },
  {
    title: 'Architecture Audit',
    price: '$5,000 USD, 5 business days',
    summary: 'Ranked fix list, Workers vs AWS decision, and a 90-minute walkthrough. No production edits during the audit.',
    details: ['API, data, auth, deploy, and cloud bill', 'First change to make, with rollback', 'Opens a $4,500+ implementation if you want it'],
    href: '/services/architecture-audit',
    cta: 'Open the audit page',
  },
  {
    title: 'Lambda to Workers migration',
    price: 'Quoted after the $5,000 audit. Implementation from $4,500',
    summary: 'Move I/O-heavy TypeScript paths off Lambda. Leave VPC, long jobs, and Python where they belong.',
    details: ['One production-safe endpoint first', 'Shadow traffic, then cutover', 'Stay-on-AWS path if Workers is the wrong fit'],
    href: '/services/aws-lambda-to-cloudflare-workers',
    cta: 'Open the migration page',
  },
  {
    title: 'Implementation sprint',
    price: 'Quoted. Minimum $4,500',
    summary: 'A scoped Workers, API, or full-stack build after the work is defined.',
    details: ['Workers APIs, gateways, webhooks, R2, Queues', 'Milestone acceptance before the next slice', 'Not a $500 Worker script'],
    href: '/hire-cloudflare-workers-developer',
    cta: 'Hire for Cloudflare Workers',
  },
  {
    title: 'Fractional backend partner',
    price: 'Quoted. Minimum $4,500 per month',
    summary: 'Ongoing architecture and implementation for teams that need a senior backend without a full-time hire.',
    details: ['Planning and implementation', 'Code review and architecture decisions', 'Weekly reporting and invoices in USD, EUR, or GBP'],
    href: '/contact',
    cta: 'Discuss a retainer',
  },
];

const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Ashish Sharma engagement models',
  url: `${SITE_URL}/pricing`,
  itemListElement: [
    {
      '@type': 'Offer',
      name: '14-Day Full-Stack MVP Build',
      price: '4500',
      priceCurrency: 'USD',
      url: `${SITE_URL}/`,
    },
    {
      '@type': 'Offer',
      name: 'Technical Architecture Audit',
      price: '5000',
      priceCurrency: 'USD',
      url: `${SITE_URL}/services/architecture-audit`,
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <SEO
        title="$4,500 MVP and $5,000 Audit Pricing"
        description="Clear prices for Cloudflare Workers and backend work. MVP $4,500. Audit $5,000. Sprints from $4,500. No CDN packages."
        path="/pricing"
        structuredData={offerSchema}
      />

      <section className="page-hero">
        <p className="eyebrow">Pricing</p>
        <h1>Prices that match $4,500+ backend work.</h1>
        <p>
          Minimum project is $4,500. The default entry for an existing system is a $5,000 architecture audit.
          DNS, WAF, WordPress CDN, and single Worker scripts are not in scope.
        </p>
      </section>

      <section>
        <div className="card-grid">
          {models.map((model) => (
            <article className="card" key={model.title}>
              <h2>{model.title}</h2>
              <p><strong>{model.price}</strong></p>
              <p>{model.summary}</p>
              <ul className="compact-list">
                {model.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <Link className="text-link" to={model.href}>{model.cta}</Link>
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
        <a className="btn-primary" href={CAL_URL} target="_blank" rel="noopener noreferrer">Book a call</a>
      </section>
    </>
  );
}
