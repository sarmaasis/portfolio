import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import {
  CALENDLY_URL,
  EMAIL,
  OFFER,
  POSITIONING,
  articles,
  caseStudies,
  landingPages,
  marketSignals,
  services,
  testimonials,
} from '../data/site';

export default function HomePage() {
  const emailHref = `mailto:${EMAIL}?subject=Backend%20engineering%20project`;

  return (
    <>
      <SEO
        title="Ashish Sharma | Cloudflare Workers, Node.js & AI/RAG Backend Engineer"
        description="Senior Backend Engineer helping funded startups and agencies scale APIs, cut cloud costs, and ship AI/RAG production backends."
        path="/"
      />

      <section className="hero">
        <p className="eyebrow">{POSITIONING}</p>
        <h1>Scale APIs, cut cloud costs, and ship AI backends without technical debt.</h1>
        <p className="hero-subtitle">{OFFER}</p>
        <div className="hero-actions">
          <Link className="btn-primary" to="/contact">
            Start a project
          </Link>
          <a className="btn-secondary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            Book architecture audit
          </a>
        </div>
        <ul className="signal-list" aria-label="Availability and market fit">
          {marketSignals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </section>

      <section>
        <div className="section-heading">
          <h2>Services</h2>
          <Link to="/services">View all services</Link>
        </div>
        <div className="card-grid">
          {services.slice(0, 3).map((service) => (
            <article className="card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <h2>Selected Work</h2>
          <Link to="/work">Read case studies</Link>
        </div>
        <div className="card-grid">
          {caseStudies.map((caseStudy) => (
            <article className="card" key={caseStudy.slug}>
              <p className="meta">{caseStudy.company}</p>
              <h3>
                <Link to={`/work/${caseStudy.slug}`}>{caseStudy.title}</Link>
              </h3>
              <p>{caseStudy.summary}</p>
              <ul className="compact-list">
                {caseStudy.metrics.slice(0, 2).map((metric) => (
                  <li key={metric}>{metric}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <h2>Technical Writing</h2>
          <Link to="/blog">Read the blog</Link>
        </div>
        <div className="stacked-list">
          {articles.map((article) => (
            <article className="row-card" key={article.slug}>
              <div>
                <p className="meta">{article.tags.join(' / ')}</p>
                <h3>
                  <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>
                <p>{article.capsule}</p>
              </div>
              <Link className="text-link" to={`/blog/${article.slug}`}>
                Read
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <h2>Hiring Search Pages</h2>
          <Link to="/services">View service details</Link>
        </div>
        <div className="card-grid">
          {landingPages.slice(0, 3).map((page) => (
            <article className="card" key={page.slug}>
              <h3>
                <Link to={`/${page.slug}`}>{page.title.replace(' | Ashish Sharma', '')}</Link>
              </h3>
              <p>{page.capsule}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <h2>Client Feedback</h2>
          <Link to="/reviews">More reviews</Link>
        </div>
        <div className="card-grid">
          {testimonials.slice(0, 3).map((testimonial) => (
            <figure className="testimonial-card" key={testimonial.project}>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                {testimonial.project} · {testimonial.region}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <h2>Need a backend that can survive the next growth phase?</h2>
        <p>
          Send the context, the constraints, and the business goal. I will reply with the next practical step.
        </p>
        <div className="hero-actions">
          <Link className="btn-primary" to="/contact">
            Contact Ashish
          </Link>
          <a className="btn-secondary" href={emailHref}>
            Email directly
          </a>
        </div>
      </section>
    </>
  );
}
