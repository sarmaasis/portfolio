import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { primaryLandingPages, services } from '../data/site';

const engagementNotes = [
  'Architecture audit and migration planning',
  'Implementation sprints for APIs, Workers, and data flows',
  'Ongoing fractional backend support for agencies and startups',
];

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Backend Engineering Services - Cloudflare Workers, AWS, Node.js and Python"
        description="Cloudflare Workers, AWS backend architecture, Node.js/TypeScript APIs, Python backends, migration planning, and cloud cost optimization."
        path="/services"
      />

      <section className="page-hero">
        <p className="eyebrow">Services</p>
        <h1>Cloudflare and AWS backend systems built for production.</h1>
        <p>
          Focused support for teams that need senior backend delivery, Cloudflare Workers expertise,
          AWS cost review, and migration plans without avoidable infrastructure weight.
        </p>
      </section>

      <section>
        <div className="card-grid">
          {services.map((service) => (
            <article className="card" key={service.title}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-grid">
        <article>
          <h2>Common Engagements</h2>
          <ul className="compact-list">
            {engagementNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </article>
        <aside className="panel">
          <h2>Good Fit</h2>
          <p>
            Funded startups, product agencies, and SaaS teams with backend bottlenecks, Cloudflare plans,
            AWS cost pressure, or API performance problems that need an engineering-led review.
          </p>
          <Link className="text-link" to="/pricing">View engagement models</Link>
        </aside>
      </section>

      <section>
        <div className="section-heading">
          <h2>Hiring Guides</h2>
          <Link to="/contact">Discuss fit</Link>
        </div>
        <div className="card-grid">
          {primaryLandingPages.map((page) => (
            <article className="card" key={page.slug}>
              <h3>
                <Link to={`/${page.slug}`}>{page.title.replace(' - Ashish Sharma', '')}</Link>
              </h3>
              <p>{page.capsule}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
