import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { ClosingCta, PageIntro, Row } from './layout';
import { SITE_URL, primaryLandingPages, services } from '../data/site';

export default function ServicesPage() {
  const catalog = {
    '@type': 'OfferCatalog',
    '@id': `${SITE_URL}/services#catalog`,
    name: 'Backend engineering services',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.title, description: service.description, provider: { '@id': `${SITE_URL}/#person` } },
    })),
  };

  return (
    <>
      <SEO
        title="Backend Services: Cloudflare Workers, AWS, Next.js — Ashish Sharma"
        description="Full-stack backend services: 14-day MVP builds, Cloudflare Workers backends, AWS cost and architecture reviews, Cloudflare/AWS migrations and audits."
        path="/services"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]}
        structuredData={catalog}
      />

      <PageIntro
        title="Complete applications on strong backend foundations."
        lede="Application delivery, backend ownership and Cloudflare expertise for teams that need it done properly, without avoidable infrastructure weight."
      />

      <Row id="mvp" label="Most popular">
        <div className="stack" style={{ ['--gap' as string]: '12px' }}>
          <h2 className="h-chapter"><Link className="ln" to="/pricing">14-day MVP build, $4,500 flat</Link></h2>
          <p className="meta" style={{ fontSize: 16, lineHeight: '26px' }}>One core workflow, built end to end, deployed, and handed over with the code and accounts.</p>
        </div>
      </Row>

      <Row id="services" label="Services">
        <dl className="terms" style={{ ['--term' as string]: '280px' }}>
          {services.map((service) => (
            <div key={service.title} style={{ display: 'contents' }}>
              <dt>{service.title}</dt>
              <dd>{service.description}</dd>
            </div>
          ))}
        </dl>
      </Row>

      <Row id="guides" label="Hiring guides" note={<Link className="ln" to="/backend-engineering-answers">Buyer answers</Link>}>
        <ul className="posts posts--rich">
          {primaryLandingPages.map((page) => (
            <li key={page.slug}>
              <Link to={`/${page.slug}`} style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
                <span className="t">{page.h1}</span>
                <span className="x" style={{ gridColumn: 1 }}>{page.capsule}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Row>

      <ClosingCta
        compact
        title="Not sure which of these you need?"
        lede="Describe the problem. I'll tell you whether it's an MVP, an audit, a sprint, or none of the above."
        placement="services-closing"
      />
    </>
  );
}
