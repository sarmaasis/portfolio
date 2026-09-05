import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { CAL_URL, EMAIL, SITE_URL } from '../data/site';

const whenToMove = [
  'The function mostly waits on a database, webhook, or third-party API, and Lambda bills wall-clock time for that wait',
  'API Gateway, NAT, logs, and S3 egress are larger than the compute line',
  'The path is TypeScript, globally cached or lightly CPU-bound, and does not need a VPC',
];

const whenToStay = [
  'Python, Step Functions, Glue, or jobs longer than Workers will allow',
  'RDS or other data that must stay in a VPC',
  'Memory above the Workers ceiling, or GPU and SageMaker-shaped work',
];

const faqs = [
  {
    question: 'Will you move my whole AWS account to Cloudflare?',
    answer:
      'No. This is a slice migration: I/O-heavy TypeScript APIs, webhooks, and object egress. The rest stays on AWS until there is a reason to move it.',
  },
  {
    question: 'What is the first paid step?',
    answer:
      'A $5,000 architecture audit in five business days. Implementation is quoted after that and starts at $4,500.',
  },
  {
    question: 'How do you avoid a risky cutover?',
    answer:
      'One endpoint, metrics before and after, shadow traffic when it is useful, and the old Lambda path kept until error rate and p95 are clear.',
  },
];

const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AWS Lambda to Cloudflare Workers migration',
  description:
    'Assessment-first migration of I/O-heavy TypeScript paths from AWS Lambda to Cloudflare Workers, with an explicit stay-on-AWS path.',
  url: `${SITE_URL}/services/aws-lambda-to-cloudflare-workers`,
  provider: { '@type': 'Person', name: 'Ashish Sharma', url: SITE_URL },
  areaServed: ['United States', 'European Union', 'United Kingdom', 'Worldwide'],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default function LambdaMigrationPage() {
  return (
    <>
      <SEO
        title="Cut Lambda Cost: Move the Right Paths to Workers"
        description="I/O-heavy TypeScript off Lambda. $5,000 audit first, then build from $4,500. Stay on AWS when Workers is wrong."
        path="/services/aws-lambda-to-cloudflare-workers"
        structuredData={[offerSchema, faqSchema]}
      />

      <section className="page-hero">
        <p className="eyebrow">Migration</p>
        <h1>AWS Lambda to Cloudflare Workers migration for I/O-heavy APIs.</h1>
        <p>
          Workers bills CPU time. Lambda bills wall-clock, including the wait on your database or model API.
          I move the paths where that gap is real, and I leave the rest on AWS.
        </p>
      </section>

      <section className="content-grid">
        <article>
          <h2>Move this</h2>
          <ul className="compact-list">
            {whenToMove.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>Leave this on AWS</h2>
          <ul className="compact-list">
            {whenToStay.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <aside className="panel">
          <h2>How it is sold</h2>
          <p><strong>$5,000</strong> audit, 5 business days.</p>
          <p>Implementation quoted after the audit. Minimum $4,500.</p>
          <Link className="btn-primary" to="/services/architecture-audit">Start with the audit</Link>
        </aside>
      </section>

      <section className="prose">
        <h2>Proof</h2>
        <p>
          Whydonate runs Cloudflare-first APIs at 4M+ requests/day (Workers, Pages, R2, Queues, PlanetScale, Typesense).
          Hudpro still uses Python and AWS Lambda where that stack is the right regional fit.
        </p>
        <p>
          <Link to="/work/whydonate-api-scale">Whydonate case study</Link>
          {' · '}
          <Link to="/blog/cloudflare-workers-vs-aws-lambda-cost">Workers vs Lambda cost notes</Link>
        </p>
        <h2>Questions</h2>
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
        <p>
          Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or <a href={CAL_URL} target="_blank" rel="noopener noreferrer">book a call</a>.
        </p>
      </section>
    </>
  );
}
