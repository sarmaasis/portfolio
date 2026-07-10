import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { articles, caseStudies, services, testimonials } from '../data/site';

const proofStats = [
  '4M+ API requests/day scaled',
  'Cloudflare Workers + TypeScript',
  'Pages, R2, Queues, PlanetScale, Typesense',
  'Full-stack product foundations',
];

const stack = [
  'Cloudflare Workers',
  'Cloudflare Pages',
  'Cloudflare R2',
  'Cloudflare Queues',
  'TypeScript',
  'Node.js',
  'Python',
  'FastAPI',
  'Next.js',
  'PlanetScale',
  'MySQL',
  'PostgreSQL',
  'DynamoDB',
  'Typesense',
  'AWS Lambda',
  'API Gateway',
];

const workingStyle = [
  {
    title: 'Production first',
    description:
      'I care about deployment, logs, retries, rollback paths, and the boring details that keep a backend calm after launch.',
  },
  {
    title: 'Cloudflare when it fits',
    description:
      'Workers, Pages, R2, Queues, KV, and D1 are excellent when the workload belongs at the edge. If AWS is still the right place, I will say that.',
  },
  {
    title: 'Direct communication',
    description:
      'You get the trade-offs, the implementation plan, and the handoff notes. No vague architecture theater.',
  },
  {
    title: 'Small safe moves',
    description:
      'I prefer one narrow migration with useful evidence over a rewrite nobody can operate or roll back.',
  },
];

export default function HomePage() {
  const featuredArticles = articles.filter((article) => !article.slug.includes('rag')).slice(0, 5);

  return (
    <>
      <SEO
        title="Ashish Sharma - Full-Stack Backend Developer for Cloudflare and AWS"
        description="Full-stack backend developer specializing in Cloudflare Workers, AWS, Node.js/TypeScript, Python, Next.js, APIs, databases, queues, search, and production application architecture."
        path="/"
      />

      <section className="home-hero">
        <p className="availability">Available for freelance backend projects</p>
        <h1>Ashish Sharma</h1>
        <p className="hero-statement">
          I build complete applications with strong backend foundations - Cloudflare Workers, AWS, Next.js,
          APIs, queues, webhooks, search, storage, databases, and infrastructure that stays reliable when the
          product gets busy.
        </p>
        <blockquote>
          "Most backend problems are not solved by adding more infrastructure. They are solved by putting each
          workload in the right place, making failure visible, and leaving the next engineer a system they can
          understand."
        </blockquote>
        <div className="hero-actions">
          <Link className="primary-link" to="/contact">Start a project</Link>
          <a className="secondary-link" href="#work">See my work</a>
        </div>

        <div className="proof-strip" aria-label="Full-stack backend development proof">
          {proofStats.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section id="services" className="home-section">
        <div className="section-heading-row">
          <h2>Services</h2>
          <Link to="/services">all services</Link>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
        <p className="section-note">
          Not sure which fits? Send the current stack and bottleneck. I will tell you honestly if I can help and
          what the smallest useful next step should be.
        </p>
      </section>

      <section id="work" className="home-section">
        <div className="section-heading-row">
          <h2>Featured Work</h2>
          <Link to="/work">all work</Link>
        </div>
        <div className="work-feed">
          {caseStudies.map((caseStudy) => (
            <article className="featured-work" key={caseStudy.slug}>
              <p className="item-label">{caseStudy.company}</p>
              <h3>
                <Link to={`/work/${caseStudy.slug}`}>{caseStudy.title}</Link>
              </h3>
              <p>{caseStudy.summary}</p>
              <ul className="inline-list">
                {caseStudy.metrics.slice(0, 3).map((metric) => (
                  <li key={metric}>{metric}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section tool-section">
        <p className="item-label">Cloudflare stack</p>
        <h2>Cloudflare-specialized, application-aware backend work.</h2>
        <p>
          Whydonate is the clearest Cloudflare proof point: a donation platform running 4M+ API requests/day on
          TypeScript Workers, Pages, R2, Queues, PlanetScale MySQL, and Typesense search. Hudpro shows the AWS
          side: Next.js, Python, Lambda, and DynamoDB for product workflows.
        </p>
        <ul className="tag-cloud">
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="why" className="home-section">
        <h2>Why work with me</h2>
        <div className="why-grid">
          {workingStyle.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-block">
        <blockquote>
          "{testimonials[0].quote}"
        </blockquote>
        <p>{testimonials[0].project}</p>
      </section>

      <section id="writing" className="home-section">
        <div className="section-heading-row">
          <h2>Writing</h2>
          <Link to="/blog">all posts</Link>
        </div>
        <div className="writing-list">
          {featuredArticles.map((article) => (
            <article key={article.slug}>
              <h3>
                <Link to={`/blog/${article.slug}`}>{article.title}</Link>
              </h3>
              <p>{article.capsule}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="home-section contact-section">
        <h2>Need a full-stack backend developer with Cloudflare depth?</h2>
        <p>
          Email me with the current stack, bottleneck, and business goal. I will reply with what is feasible,
          what I would fix first, and what it would take.
        </p>
        <Link className="primary-link" to="/contact">Start a project</Link>
      </section>
    </>
  );
}
