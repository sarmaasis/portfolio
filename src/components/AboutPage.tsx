import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { ClosingCta, PageIntro, Row } from './layout';
import { EMAIL, marketSignals } from '../data/site';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Ashish Sharma — Full-Stack, Backend-First Engineer"
        description="Ashish Sharma is a full-stack, backend-first engineer building MVPs and production backends on Cloudflare Workers, AWS, Next.js, TypeScript and Python."
        path="/about"
        type="profile"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]}
      />

      <PageIntro
        title="I'm Ashish, a full-stack engineer who starts from the backend."
        lede="I help founders, agencies and small teams ship applications whose backend decisions hold up once real users arrive."
      />

      <Row id="how" label="How I work">
        <div className="prose" style={{ fontSize: 17, lineHeight: '28px' }}>
          <p>
            Most of my work sits where product delivery meets infrastructure risk: a Next.js product surface, the APIs and
            data model behind it, the cloud bill, or the request paths that belong on Cloudflare instead of a regional server.
          </p>
          <p>
            My bias is towards boring, inspectable systems: explicit service boundaries, clear data ownership, practical
            observability, and deployments the next engineer can understand without me. That's also why every project ends
            with the code, the accounts and written handover notes in your hands.
          </p>
          <p>
            Lately that mostly means <Link to="/pricing">14-day MVP builds</Link> for founders, plus architecture audits and
            scoped backend work for teams that already have a product.
          </p>
        </div>
      </Row>

      <Row id="background" label="Background">
        <dl className="terms" style={{ ['--term' as string]: '220px' }}>
          <dt>Cloudflare and edge</dt>
          <dd>Workers, Queues, R2, D1, KV, reverse proxies and cost-sensitive serverless architecture. Production APIs at 4M+ requests a day.</dd>
          <dt>Full-stack builds</dt>
          <dd>Next.js product surfaces, APIs, data models, auth flows and deployment for healthcare, real estate, fundraising, SaaS and internal tools.</dd>
          <dt>AWS</dt>
          <dd>Lambda, API Gateway, DynamoDB, containers, search and logs, reviewed for cost and performance.</dd>
          <dt>Languages</dt>
          <dd>TypeScript and Node.js, Python (FastAPI), SQL.</dd>
        </dl>
      </Row>

      <Row id="practical" label="Practical details">
        <ul className="stack" style={{ ['--gap' as string]: '10px' }}>
          {marketSignals.map((signal) => <li key={signal}>{signal}</li>)}
          <li>Email: <a className="ln" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
        </ul>
      </Row>

      <ClosingCta
        compact
        title="Want to check whether I fit your project?"
        lede="Send the current architecture, the bottleneck, or the goal you're trying to reach."
        placement="about-closing"
      />
    </>
  );
}
