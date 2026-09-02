import { Link } from 'react-router-dom';
import { SEO } from './SEO';
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
    answer:
      'Five business days after access. Remote, with US, EU, and UK hours.',
  },
];

const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'Offer',
  name: 'Technical Architecture Audit',
  description:
    'Fixed-scope five-day architecture audit of API, data, auth, deploy path, and cloud cost, delivered as a ranked fix list and walkthrough.',
  url: `${SITE_URL}/services/architecture-audit`,
  price: '5000',
  priceCurrency: 'USD',
  availability: 'https://schema.org/InStock',
  itemOffered: {
    '@type': 'Service',
    name: 'Technical Architecture Audit',
    serviceType: 'Software architecture audit',
    provider: {
      '@type': 'Person',
      name: 'Ashish Sharma',
      url: SITE_URL,
    },
    areaServed: ['United States', 'European Union', 'United Kingdom', 'Worldwide'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function ArchitectureAuditPage() {
  return (
    <>
      <SEO
        title="Technical Architecture Audit | $5,000 in 5 Days | Ashish Sharma"
        description="Fixed-scope architecture audit for startup APIs and cloud cost. Ranked fix list, diagrams, and a walkthrough. Cloudflare and AWS, no vendor lock-in to either. $5,000."
        path="/services/architecture-audit"
        structuredData={[offerSchema, faqSchema]}
      />

      <section className="page-hero">
        <p className="eyebrow">Architecture audit</p>
        <h1>Technical architecture audit for teams about to scale, migrate, or rewrite.</h1>
        <p>
          A five-day review of your API, data, auth, deploy path, and cloud bill. You get a ranked fix list
          and a walkthrough. I do not change production during the audit.
        </p>
        <p>
          <strong>$5,000 USD</strong> · 5 business days · remote US, EU, and UK hours
        </p>
      </section>

      <section className="content-grid">
        <article>
          <h2>When to book</h2>
          <ul className="compact-list">
            {whenToBook.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>What I review</h2>
          <ul className="compact-list">
            {reviewAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <aside className="panel">
          <h2>What you get</h2>
          <ul className="compact-list">
            {deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a
            className="btn-primary"
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="audit_call_click"
            data-analytics-placement="audit_sidebar"
          >
            Book the audit
          </a>
        </aside>
      </section>

      <section className="prose">
        <h2>Not in scope</h2>
        <p>
          I do not rewrite the codebase during the audit. I do not need admin on production. I will say if
          the right move is to stay on AWS. DNS, WAF, WordPress CDN setup, and single Worker scripts are
          not this engagement.
        </p>
        <h2>Questions</h2>
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
        <h2>Next step</h2>
        <p>
          Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or book a call with the stack, the failure mode,
          and the deadline.
        </p>
        <p>
          <Link className="text-link" to="/hire-cloudflare-workers-developer">
            Hire a Cloudflare Workers developer
          </Link>
          {' · '}
          <Link className="text-link" to="/pricing">
            Pricing
          </Link>
        </p>
      </section>
    </>
  );
}
