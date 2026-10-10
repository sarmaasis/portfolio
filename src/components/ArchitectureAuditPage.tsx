import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { Breadcrumbs, FaqList, PageIntro, Row } from './layout';
import { CAL_URL, EMAIL, SITE_URL } from '../data/site';

const reviewAreas = [
  'Request paths, latency, and error-prone endpoints',
  'Auth boundaries and write-path validation',
  'Data stores, queues, and search ownership',
  'Deploy, rollback, and observability',
  'Which work belongs on Cloudflare Workers vs AWS',
  'Cloud bill items that are drift vs real load',
];

const deliverables = [
  'Written report with severity tags: fix now, this quarter, or leave it',
  'One diagram of the current request path and the first change to make',
  'Decision record: Workers, AWS, or hybrid',
  '90-minute walkthrough',
  'Follow-on build quote at $4,500 or more if implementation is the next step',
];

const whenToBook = [
  'The product works, but p95, error rate, or the invoice is the problem',
  'You are choosing Cloudflare Workers vs AWS Lambda and need a decision record',
  'A rewrite has been proposed and nobody has proven the current system cannot be saved',
  'You want a senior engineer to own the first 90 days of fixes after the report',
];

const faqs = [
  {
    question: 'Do you only recommend Cloudflare?',
    answer:
      'No. Hybrid is common: Workers in front for request shaping, validation, caching, or webhooks, with regional data and heavy jobs on AWS.',
  },
  {
    question: 'Will you change production during the audit?',
    answer:
      'No. I do not rewrite the codebase during the audit. A read-only repo, architecture notes, and a traffic or cost snapshot are enough.',
  },
  {
    question: 'Is this a $750 checklist audit?',
    answer:
      'No. The audit is $5,000 because it is meant to open a $4,500+ implementation, not to race independents on a cheap PDF.',
  },
  {
    question: 'How fast can this start?',
    answer: 'Five business days after access. Remote, with US, EU, and UK hours.',
  },
];

const path = '/services/architecture-audit';
const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Architecture audit', path }];

function List({ items }: { items: string[] }) {
  return (
    <ul className="prose" style={{ fontSize: 16, lineHeight: '26px' }}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function ArchitectureAuditPage() {
  return (
    <>
      <SEO
        title="$5,000 Architecture Audit in 5 Days"
        description="Ranked fix list, Workers vs AWS decision, walkthrough. No production edits. Opens a $4,500+ build if you want implementation next."
        path={path}
        breadcrumbs={crumbs}
        structuredData={[
          {
            '@type': 'Offer',
            '@id': `${SITE_URL}${path}#offer`,
            name: 'Technical Architecture Audit',
            description:
              'Fixed-scope five-day architecture audit of API, data, auth, deploy path, and cloud cost, delivered as a ranked fix list and walkthrough.',
            url: `${SITE_URL}${path}`,
            price: '5000',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            seller: { '@id': `${SITE_URL}/#person` },
            itemOffered: {
              '@type': 'Service',
              name: 'Technical Architecture Audit',
              serviceType: 'Software architecture audit',
              provider: { '@id': `${SITE_URL}/#person` },
              areaServed: ['United States', 'European Union', 'United Kingdom', 'Worldwide'],
            },
          },
          {
            '@type': 'FAQPage',
            '@id': `${SITE_URL}${path}#faq`,
            mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
          },
        ]}
      />

      <PageIntro
        title="Technical architecture audit for teams about to scale, migrate, or rewrite."
        lede="A five-day review of your API, data, auth, deploy path, and cloud bill. You get a ranked fix list and a walkthrough. I do not change production during the audit."
      >
        <Breadcrumbs items={crumbs.slice(0, 2)} />
      </PageIntro>

      <div className="btns" style={{ paddingBottom: 56 }}>
        <a
          className="rv-btn rv-btn--primary"
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-event="audit_call_click"
          data-analytics-placement="audit_intro"
        >
          Book the audit
        </a>
        <span className="meta"><strong style={{ color: 'var(--ink)', fontWeight: 500 }}>$5,000 USD</strong> · 5 business days · remote US, EU, and UK hours</span>
      </div>

      <Row id="when" label="When to book"><List items={whenToBook} /></Row>
      <Row id="review" label="What I review"><List items={reviewAreas} /></Row>
      <Row id="deliverables" label="What you get"><List items={deliverables} /></Row>
      <Row id="scope" label="Not in scope">
        <p style={{ maxWidth: '66ch' }}>
          I do not rewrite the codebase during the audit. I do not need admin on production. I will say if the right move
          is to stay on AWS. DNS, WAF, WordPress CDN setup, and single Worker scripts are not this engagement.
        </p>
      </Row>
      <Row id="faq" label="Questions"><FaqList items={faqs} /></Row>

      <section className="closing closing--compact" aria-labelledby="audit-close">
        <div className="stack" style={{ ['--gap' as string]: '24px' }}>
          <h2 id="audit-close" className="h-chapter">Next step</h2>
          <p className="lede">
            Email <a className="ln" href={`mailto:${EMAIL}`}>{EMAIL}</a> or book a call with the stack, the failure mode, and the deadline.
          </p>
          <div className="btns">
            <a className="rv-btn rv-btn--primary" href={CAL_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="audit_call_click" data-analytics-placement="audit_closing">
              Book the audit
            </a>
            <Link className="rv-btn rv-btn--ghost" to="/hire-cloudflare-workers-developer">Hire a Cloudflare Workers developer</Link>
            <Link className="rv-btn rv-btn--ghost" to="/pricing">Pricing</Link>
          </div>
        </div>
      </section>
    </>
  );
}
