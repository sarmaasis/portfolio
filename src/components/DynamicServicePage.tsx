import { Link, useParams } from 'react-router-dom';
import { SEO } from './SEO';

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function DynamicServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const serviceName = slug ? titleFromSlug(slug) : 'Backend Engineering';
  const path = slug ? `/services/${slug}` : '/services';

  return (
    <>
      <SEO
        title={`${serviceName} - Ashish Sharma Backend Engineering`}
        description={`Hire Ashish Sharma for ${serviceName.toLowerCase()} projects involving Cloudflare Workers, Node.js, Python/FastAPI, and production backend architecture.`}
        path={path}
      />

      <section className="page-hero">
        <p className="eyebrow">Service</p>
        <h1>{serviceName}</h1>
        <p>
          Senior backend consulting and implementation for teams that need production APIs, edge infrastructure,
          Cloudflare Workers, AWS review, or cloud cost reduction.
        </p>
      </section>

      <section className="content-grid">
        <article>
          <h2>What this usually includes</h2>
          <ul className="compact-list">
            <li>Architecture review and implementation plan</li>
            <li>API, data, and infrastructure work scoped to business outcomes</li>
            <li>Clear documentation, deployment notes, and handoff</li>
          </ul>
        </article>
        <aside className="panel">
          <h2>Next Step</h2>
          <p>Send a short description of the project and the current constraints.</p>
          <Link className="btn-primary" to="/contact">Start a project</Link>
        </aside>
      </section>
    </>
  );
}
