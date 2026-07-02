import { SEO } from './SEO';
import { CALENDLY_URL, EMAIL, marketSignals } from '../data/site';

export default function ContactPage() {
  const emailHref = `mailto:${EMAIL}?subject=Backend%20engineering%20project`;

  return (
    <>
      <SEO
        title="Contact Ashish Sharma | Backend Engineering Projects"
        description="Contact Ashish Sharma for Cloudflare Workers, Node.js/TypeScript, Python/FastAPI, AI/RAG, backend architecture, and cloud cost projects."
        path="/contact"
      />

      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Send the backend problem, the business goal, and the timeline.</h1>
        <p>
          I am available for architecture audits, scoped implementation, and fractional backend support for US,
          EU, UK, and remote-first teams.
        </p>
      </section>

      <section className="content-grid">
        <article className="panel">
          <h2>Email</h2>
          <p>
            Best for sending context: architecture notes, API bottlenecks, cloud bills, RAG requirements,
            or a short product brief.
          </p>
          <a className="btn-primary" href={emailHref}>Email {EMAIL}</a>
        </article>
        <article className="panel">
          <h2>Call</h2>
          <p>
            Best when you already know the scope and want to decide whether an audit or implementation sprint fits.
          </p>
          <a className="btn-secondary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            Book a free architecture audit
          </a>
        </article>
      </section>

      <section>
        <h2>Useful context to include</h2>
        <ul className="compact-list">
          <li>Current stack and hosting provider</li>
          <li>Traffic volume, latency target, or cloud cost problem</li>
          <li>Whether this is audit, implementation, or ongoing support</li>
          <li>Timeline, timezone, and preferred contract currency</li>
        </ul>
      </section>

      <section className="panel">
        <h2>Availability</h2>
        <ul className="compact-list">
          {marketSignals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
