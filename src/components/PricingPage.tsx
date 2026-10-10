import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { ClosingCta, FaqList, PageIntro, Row } from './layout';
import { plainText } from '../utils/markdown';
import { SITE_URL } from '../data/site';
import { mvpIncludes, mvpPhases } from '../data/offer';

const models = [
  {
    title: 'Architecture audit',
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

const faqs = [
  {
    question: 'Why a flat price instead of hourly?',
    answer: 'Because I control the estimate, I should carry the risk of it being wrong. A locked scope and a flat fee mean you know the cost before day one. More on how MVP pricing works in [what an MVP really costs](/blog/mvp-development-cost).',
  },
  {
    question: 'What is the minimum project?',
    answer: '$4,500. If the system already exists, the default entry is the [$5,000 architecture audit](/services/architecture-audit). DNS, WAF, WordPress CDN, and single Worker scripts are not in scope.',
  },
  {
    question: "What isn't included in the $4,500 MVP build?",
    answer: 'Native mobile apps, multi-role marketplaces with complex permissions, heavy compliance work, and anything that is really two products. If your idea needs those, we scope a longer build instead.',
  },
  {
    question: 'How do I pay?',
    answer: 'Remote B2B contracts can be invoiced in USD, EUR, or GBP. For fixed-scope work, milestones and acceptance criteria are agreed before implementation starts.',
  },
];

export default function PricingPage() {
  const offers = {
    '@type': 'OfferCatalog',
    '@id': `${SITE_URL}/pricing#offers`,
    name: 'Ashish Sharma engagement models',
    url: `${SITE_URL}/pricing`,
    itemListElement: [
      { '@type': 'Offer', name: '14-Day Full-Stack MVP Build', price: '4500', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE_URL}/` },
      { '@type': 'Offer', name: 'Technical Architecture Audit', price: '5000', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE_URL}/services/architecture-audit` },
    ],
  };

  return (
    <>
      <SEO
        title="$4,500 MVP and $5,000 Audit Pricing"
        description="Clear prices for Cloudflare Workers and backend work. MVP $4,500. Audit $5,000. Sprints from $4,500. No CDN packages."
        path="/pricing"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }]}
        structuredData={[offers, {
          '@type': 'FAQPage',
          '@id': `${SITE_URL}/pricing#faq`,
          mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: plainText(faq.answer) } })),
        }]}
      />

      <PageIntro
        title="Prices that match $4,500+ backend work."
        lede="Minimum project is $4,500. The default entry for an existing system is a $5,000 architecture audit. DNS, WAF, WordPress CDN, and single Worker scripts are not in scope."
      />

      <Row id="mvp" label="14-day MVP build" note="$4,500 USD flat">
        <div className="stack" style={{ ['--gap' as string]: '24px' }}>
          <p className="lede" style={{ color: 'var(--ink)' }}>One core workflow shipped in 14 days. Scope is locked before Day 01, and the code and accounts are handed over.</p>
          <dl className="terms">
            {mvpPhases.map((phase) => (
              <div key={phase.title} style={{ display: 'contents' }}>
                <dt>{phase.days}</dt>
                <dd><strong style={{ fontWeight: 500 }}>{phase.title}.</strong> {phase.summary}</dd>
              </div>
            ))}
            <dt>Included</dt>
            <dd><ul>{mvpIncludes.map((item) => <li key={item}>{item}</li>)}</ul></dd>
          </dl>
          <p className="meta">Not sure it fits two weeks? Read <Link className="ln" to="/blog/how-to-scope-an-mvp">how I scope an MVP</Link>.</p>
        </div>
      </Row>

      {models.map((model, index) => (
        <Row key={model.title} id={`model-${index}`} label={model.title} note={model.price}>
          <div className="stack" style={{ ['--gap' as string]: '12px' }}>
            <p style={{ fontSize: 17, lineHeight: '28px' }}>{model.summary}</p>
            <ul className="meta stack" style={{ ['--gap' as string]: '4px', fontSize: 15 }}>
              {model.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
            <p><Link className="ln" to={model.href}>{model.cta}</Link></p>
          </div>
        </Row>
      ))}

      <Row id="faq" label="Questions">
        <FaqList items={faqs} />
      </Row>

      <ClosingCta
        title="Bring the idea or the bottleneck. Leave with a scope and a price."
        lede="A 20-minute call is enough to tell whether it's the 14-day build, the audit, or something else."
        placement="pricing-closing"
      />
    </>
  );
}
