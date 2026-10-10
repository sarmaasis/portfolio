import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { Breadcrumbs, FaqList, PageIntro, Row } from './layout';
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
    answer: 'A $5,000 architecture audit in five business days. Implementation is quoted after that and starts at $4,500.',
  },
  {
    question: 'How do you avoid a risky cutover?',
    answer:
      'One endpoint, metrics before and after, shadow traffic when it is useful, and the old Lambda path kept until error rate and p95 are clear.',
  },
];

const path = '/services/aws-lambda-to-cloudflare-workers';
const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Lambda to Workers', path }];

function List({ items }: { items: string[] }) {
  return (
    <ul className="prose" style={{ fontSize: 16, lineHeight: '26px' }}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function LambdaMigrationPage() {
  return (
    <>
      <SEO
        title="Cut Lambda Cost: Move the Right Paths to Workers"
        description="I/O-heavy TypeScript off Lambda. $5,000 audit first, then build from $4,500. Stay on AWS when Workers is wrong."
        path={path}
        breadcrumbs={crumbs}
        structuredData={[
          {
            '@type': 'Service',
            '@id': `${SITE_URL}${path}#service`,
            name: 'AWS Lambda to Cloudflare Workers migration',
            description:
              'Assessment-first migration of I/O-heavy TypeScript paths from AWS Lambda to Cloudflare Workers, with an explicit stay-on-AWS path.',
            url: `${SITE_URL}${path}`,
            provider: { '@id': `${SITE_URL}/#person` },
            areaServed: ['United States', 'European Union', 'United Kingdom', 'Worldwide'],
          },
          {
            '@type': 'FAQPage',
            '@id': `${SITE_URL}${path}#faq`,
            mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
          },
        ]}
      />

      <PageIntro
        title="AWS Lambda to Cloudflare Workers migration for I/O-heavy APIs."
        lede="Workers bills CPU time. Lambda bills wall-clock, including the wait on your database or model API. I move the paths where that gap is real, and I leave the rest on AWS."
      >
        <Breadcrumbs items={crumbs.slice(0, 2)} />
      </PageIntro>

      <Row id="move" label="Move this"><List items={whenToMove} /></Row>
      <Row id="stay" label="Leave this on AWS"><List items={whenToStay} /></Row>
      <Row id="pricing" label="How it is sold">
        <div className="stack" style={{ ['--gap' as string]: '16px' }}>
          <dl className="terms">
            <dt>Audit</dt><dd><strong style={{ fontWeight: 500 }}>$5,000</strong>, 5 business days.</dd>
            <dt>Build</dt><dd>Implementation quoted after the audit. Minimum $4,500.</dd>
          </dl>
          <div className="btns"><Link className="rv-btn rv-btn--primary" to="/services/architecture-audit">Start with the audit</Link></div>
        </div>
      </Row>
      <Row id="proof" label="Proof">
        <div className="stack" style={{ maxWidth: '66ch' }}>
          <p>
            Whydonate runs Cloudflare-first APIs at 4M+ requests/day (Workers, Pages, R2, Queues, PlanetScale, Typesense).
            Hudpro still uses Python and AWS Lambda where that stack is the right regional fit.
          </p>
          <p className="meta">
            <Link className="ln" to="/work/whydonate-api-scale">Whydonate case study</Link>
            {' · '}
            <Link className="ln" to="/blog/cloudflare-workers-vs-aws-lambda-cost">Workers vs Lambda cost notes</Link>
          </p>
        </div>
      </Row>
      <Row id="faq" label="Questions"><FaqList items={faqs} /></Row>

      <section className="closing closing--compact" aria-labelledby="lambda-close">
        <div className="stack" style={{ ['--gap' as string]: '24px' }}>
          <h2 id="lambda-close" className="h-chapter">Is Lambda the line item you keep explaining?</h2>
          <p className="lede">
            Email <a className="ln" href={`mailto:${EMAIL}`}>{EMAIL}</a> or book a call with the function list and last month's bill.
          </p>
          <div className="btns">
            <a className="rv-btn rv-btn--primary" href={CAL_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="audit_call_click" data-analytics-placement="lambda_closing">
              Book a call
            </a>
            <Link className="rv-btn rv-btn--ghost" to="/services/architecture-audit">About the audit</Link>
          </div>
        </div>
      </section>
    </>
  );
}
