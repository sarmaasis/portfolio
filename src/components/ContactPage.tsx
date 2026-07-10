import { SEO } from './SEO';
import { EMAIL, marketSignals } from '../data/site';

export default function ContactPage() {
  const emailHref = `mailto:${EMAIL}?subject=Full-stack%20backend%20project`;

  return (
    <>
      <SEO
        title="Contact Ashish Sharma - Full-Stack Backend and Cloudflare Projects"
        description="Contact Ashish Sharma for full-stack backend development, Cloudflare Workers, AWS backend architecture, Next.js, Node.js/TypeScript, Python APIs, cloud cost, and migration projects."
        path="/contact"
      />

      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Send the product goal, backend problem, and timeline.</h1>
        <p>
          I am available for architecture audits, scoped implementation, and fractional full-stack backend support
          for US, EU, UK, and remote-first teams.
        </p>
      </section>

      <section className="content-grid">
        <article className="panel">
          <h2>Start a project</h2>
          <p>
            Best for sending context: architecture notes, API bottlenecks, Cloudflare plans, AWS bills,
            application requirements, or a short product brief.
          </p>
          <a className="btn-primary" href={emailHref}>Send project context</a>
        </article>
        <aside className="panel">
          <h2>What I need</h2>
          <ul className="compact-list">
            <li>Current stack and hosting provider</li>
            <li>Traffic volume, latency target, or cloud cost problem</li>
            <li>Whether this is audit, implementation, or ongoing support</li>
            <li>Timeline, timezone, and preferred contract currency</li>
          </ul>
        </aside>
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
