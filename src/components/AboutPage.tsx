import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { OFFER, POSITIONING, marketSignals } from '../data/site';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Ashish Sharma - Full-Stack Backend Developer"
        description="About Ashish Sharma, a full-stack backend developer specializing in Cloudflare Workers, AWS, Next.js, Node.js/TypeScript, Python APIs, and production application architecture."
        path="/about"
        type="profile"
      />

      <section className="page-hero">
        <p className="eyebrow">About</p>
        <h1>Full-stack backend development for teams that need clear architecture and reliable delivery.</h1>
        <p>{POSITIONING} {OFFER}</p>
      </section>

      <section className="content-grid">
        <article>
          <h2>How I Work</h2>
          <p>
            I help founders, agencies, and engineering teams ship applications whose backend decisions hold up under
            real traffic. The work usually sits where product delivery meets infrastructure risk: Next.js surfaces,
            APIs, data flows, AWS cost, or moving the right request paths to Cloudflare.
          </p>
          <p>
            My bias is toward boring, inspectable systems: explicit service boundaries, clear data ownership,
            practical observability, and deployments that the next engineer can understand.
          </p>
        </article>
        <aside className="panel">
          <h2>Market Fit</h2>
          <ul className="compact-list">
            {marketSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section>
        <h2>Relevant Background</h2>
        <div className="card-grid">
          <article className="card">
            <h3>Cloudflare & Edge Systems</h3>
            <p>
              Cloudflare Workers, edge routing, reverse proxies, KV/R2/D1 integrations, and cost-sensitive
              serverless architecture.
            </p>
          </article>
          <article className="card">
            <h3>Full-Stack Backend Builds</h3>
            <p>
              Next.js application surfaces, APIs, data models, auth flows, and deployment paths for healthcare, real
              estate, donation platforms, SaaS workflows, and internal tools.
            </p>
          </article>
          <article className="card">
            <h3>AWS Cost & Migration Review</h3>
            <p>
              Lambda, API Gateway, containers, search, logs, databases, and traffic paths reviewed for practical
              cost and performance improvements.
            </p>
          </article>
        </div>
      </section>

      <section className="cta-band">
        <h2>Want to check whether I fit your project?</h2>
        <p>Send the current architecture, the bottleneck, or the goal you are trying to reach.</p>
        <Link className="btn-primary" to="/contact">Start a project</Link>
      </section>
    </>
  );
}
