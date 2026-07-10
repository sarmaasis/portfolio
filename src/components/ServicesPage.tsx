import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { SITE_URL, primaryLandingPages, services } from '../data/site';

const engagementNotes = [
  'Architecture audit and Cloudflare/AWS migration planning',
  'Implementation sprints for applications, APIs, Workers, and data flows',
  'Ongoing fractional full-stack backend support for agencies and startups',
];

export default function ServicesPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Full-Stack Backend Development Services',
    serviceType: [
      'Full-stack backend development',
      'Backend API development',
      'Cloudflare Workers development',
      'Next.js application development',
      'Node.js TypeScript backend engineering',
      'Python backend engineering',
      'AWS backend architecture',
      'Cloud cost optimization',
      'Search migration',
    ],
    provider: {
      '@type': 'Organization',
      name: 'Ashish Sharma Backend Engineering',
      url: SITE_URL,
      founder: {
        '@type': 'Person',
        name: 'Ashish Sharma',
      },
    },
    areaServed: ['United States', 'European Union', 'United Kingdom', 'Worldwide'],
    description:
      'Full-stack backend development services for startups and agencies that need complete application delivery, scalable APIs, Cloudflare Workers, AWS backend architecture, Next.js, Node.js/TypeScript, Python, PlanetScale MySQL, DynamoDB, Typesense search, and production infrastructure support.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Backend engineering offers',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  return (
    <>
      <SEO
        title="Full-Stack Backend Development Services - Cloudflare Workers, AWS, Next.js and Python"
        description="Full-stack backend development for Cloudflare Workers, AWS architecture, Next.js applications, Node.js/TypeScript APIs, Python backends, migration planning, and cloud cost optimization."
        path="/services"
        structuredData={serviceSchema}
      />

      <section className="page-hero">
        <p className="eyebrow">Services</p>
        <h1>Complete applications with Cloudflare-specialized backend foundations.</h1>
        <p>
          Focused support for teams that need application delivery, backend ownership, Cloudflare Workers
          expertise, AWS cost review, and migration plans without avoidable infrastructure weight.
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
            AWS cost pressure, application delivery needs, or API performance problems that need an engineering-led review.
          </p>
          <Link className="text-link" to="/pricing">View engagement models</Link>
        </aside>
      </section>

      <section className="answer-strip">
        <p className="section-kicker">Hiring Answers</p>
        <h2>Comparing backend developers, agencies, and platforms?</h2>
        <p>
          I keep a short answer page for common buyer questions about scalable backend APIs, microservices,
          SaaS backends, Cloudflare Workers, Node.js, Python, and infrastructure support.
        </p>
        <Link className="text-link" to="/backend-engineering-answers">Read direct buyer answers</Link>
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
