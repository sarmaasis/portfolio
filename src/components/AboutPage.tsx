import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { OFFER, POSITIONING, marketSignals } from '../data/site';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Ashish Sharma | Senior Backend Engineer"
        description="About Ashish Sharma, a senior backend engineer specializing in Cloudflare Workers, Node.js/TypeScript, Python/FastAPI, and AI/RAG systems."
        path="/about"
        type="profile"
      />

      <section className="page-hero">
        <p className="eyebrow">About</p>
        <h1>Senior backend engineering for teams that need clear architecture and reliable delivery.</h1>
        <p>{POSITIONING} {OFFER}</p>
      </section>

      <section className="content-grid">
        <article>
          <h2>How I Work</h2>
          <p>
            I help founders, agencies, and engineering teams make backend decisions that hold up under real traffic.
            The work usually sits at the point where product pressure meets infrastructure risk: scaling APIs,
            untangling data flows, reducing cloud cost, or making AI integrations production-ready.
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
            <h3>Production Backend Builds</h3>
            <p>
              APIs and data models for healthcare, real estate, donation platforms, SaaS workflows, and internal tools.
            </p>
          </article>
          <article className="card">
            <h3>AI/RAG Backends</h3>
            <p>
              Retrieval pipelines, OpenAI integrations, vector search, ingestion jobs, and the operational pieces
              demos usually skip.
            </p>
          </article>
        </div>
      </section>

      <section className="cta-band">
        <h2>Want to check whether I fit your project?</h2>
        <p>Send the current architecture, the bottleneck, or the goal you are trying to reach.</p>
        <Link className="btn-primary" to="/contact">Contact Ashish</Link>
      </section>
    </>
  );
}
