import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { ClosingCta, FaqList, PageIntro, Row } from './layout';
import { plainText } from '../utils/markdown';
import { SITE_URL } from '../data/site';
import { mvpIncludes, mvpPhases } from '../data/offer';

const models = [
  {
    title: 'Architecture audit',
    price: 'Fixed fee, quoted after a call',
    summary: 'A focused review before a migration, rebuild or scaling push.',
    details: ['API and data-model review', 'Cloudflare and AWS cost and architecture notes', 'A prioritised action plan'],
  },
  {
    title: 'Implementation sprint',
    price: 'Milestone-based',
    summary: 'A scoped build or migration with clear deliverables.',
    details: ['Application, API and Workers delivery', 'Cloudflare, AWS, search or integration work', 'Acceptance criteria agreed up front'],
  },
  {
    title: 'Fractional backend partner',
    price: 'Monthly',
    summary: 'Ongoing application and backend support for teams without a full-time hire.',
    details: ['Planning and implementation', 'Code review and architecture decisions', 'Weekly reporting and invoices'],
  },
];

const faqs = [
  {
    question: 'Why a flat price instead of hourly?',
    answer: "Because I control the estimate, I should carry the risk of it being wrong. A locked scope and a flat fee mean you know the cost before day one. More on how MVP pricing works in [what an MVP really costs](/blog/mvp-development-cost).",
  },
  {
    question: "What isn't included in the $4,500 build?",
    answer: 'Native mobile apps, multi-role marketplaces with complex permissions, heavy compliance work, and anything that is really two products. If your idea needs those, we scope a longer build instead.',
  },
  {
    question: 'What happens after the 14 days?',
    answer: "You have a live product, the code, the accounts and handover notes. If you want help afterwards, we can agree a follow-on sprint or ongoing support; there's no lock-in.",
  },
  {
    question: 'How do I pay?',
    answer: 'Remote B2B contracts can be invoiced in USD, EUR or GBP. For fixed-scope work, milestones and acceptance criteria are agreed before implementation starts.',
  },
];

export default function PricingPage() {
  const offers = {
    '@type': 'OfferCatalog',
    '@id': `${SITE_URL}/pricing#offers`,
    name: 'Engagements',
    itemListElement: [
      {
        '@type': 'Offer',
        name: '14-day full-stack MVP build',
        price: '4500',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/pricing`,
        description: mvpIncludes.join('. '),
      },
      ...models.map((model) => ({ '@type': 'Offer', name: model.title, description: model.summary, url: `${SITE_URL}/pricing` })),
    ],
  };

  return (
    <>
      <SEO
        title="Pricing: 14-Day MVP for $4,500, Audits and Sprints — Ashish Sharma"
        description="A focused 14-day full-stack MVP build for a flat $4,500, plus Cloudflare and AWS architecture audits, implementation sprints and fractional backend support."
        path="/pricing"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }]}
        structuredData={[offers, {
          '@type': 'FAQPage',
          '@id': `${SITE_URL}/pricing#faq`,
          mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: plainText(faq.answer) } })),
        }]}
      />

      <PageIntro
        title="One fixed-price build, and three ways to work together after it."
        lede="The MVP has a fixed scope and a fixed price. Larger or riskier work gets an explicit model: an audit, a scoped sprint, or ongoing support."
      />

      <Row id="mvp" label="14-day MVP build" note="$4,500 USD, flat">
        <div className="stack" style={{ ['--gap' as string]: '24px' }}>
          <p className="lede" style={{ color: 'var(--ink)' }}>One core workflow, built end to end and deployed to production in 14 days, with the code and accounts handed over.</p>
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
          </div>
        </Row>
      ))}

      <Row id="faq" label="Questions">
        <FaqList items={faqs} />
      </Row>

      <ClosingCta
        title="Bring the idea. Leave with a scope and a price."
        lede="A 20-minute call is enough to tell whether it fits the 14-day build, or what model fits better."
        placement="pricing-closing"
      />
    </>
  );
}
