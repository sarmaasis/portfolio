import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { articles, caseStudies, services, testimonials } from '../data/site';

const focusAreas = [
  {
    title: 'Cloudflare Workers',
    description:
      'Edge APIs, webhook receivers, request routing, auth checks, cacheable reads, and Workers that remove unnecessary origin work.',
  },
  {
    title: 'AWS architecture',
    description:
      'Lambda, API Gateway, OpenSearch, containers, logs, traffic flow, and cost review for systems that have grown heavier than they need to be.',
  },
  {
    title: 'Backend APIs',
    description:
      'Node.js, TypeScript, Python, FastAPI, PostgreSQL, Typesense, validation, retries, observability, and clear service boundaries.',
  },
];

const workingStyle = [
  'I do not move everything to the edge. I move the parts that become simpler, faster, or cheaper there.',
  'I prefer one narrow migration with good logs over a heroic rewrite nobody can roll back.',
  'I write down the trade-offs so your team understands the system after I leave.',
  'If AWS is still the right place for a workload, I will say that instead of forcing a Cloudflare story.',
];

export default function HomePage() {
  const featuredArticles = articles.filter((article) => !article.slug.includes('rag')).slice(0, 3);

  return (
    <>
      <SEO
        title="Ashish Sharma - Cloudflare Workers and AWS Backend Engineer"
        description="Senior Backend Engineer for Cloudflare Workers, AWS, Node.js/TypeScript, Python APIs, backend architecture, cloud cost optimization, and migrations."
        path="/"
      />

      <section className="reference-hero">
        <div className="hero-copy">
          <p className="intro-line">Hi, my name is Ashish Sharma</p>
          <h1>
            I build backend systems on Cloudflare and AWS.
          </h1>
          <p className="hero-note">
            APIs, Workers, webhooks, search, queues, PostgreSQL, and the infrastructure work that has to stay
            calm when the product gets busy.
          </p>
          <div className="hero-links">
            <Link className="plain-button" to="/contact">Start a project</Link>
            <a className="quiet-link" href="#about">Find out more</a>
          </div>
        </div>
      </section>

      <section id="about" className="reference-section">
        <p className="section-kicker">About</p>
        <div className="reference-copy">
          <p>
            Most of my work is not flashy. It is the backend layer that has to keep behaving when traffic spikes,
            invoices climb, integrations fail, or a product team needs to ship without dragging old architecture
            behind it.
          </p>
          <p>
            I work mostly around Cloudflare Workers, AWS, Node.js/TypeScript, Python APIs, PostgreSQL, Typesense,
            and API systems where performance, reliability, and cost all matter at the same time.
          </p>
          <p>
            I am useful when you need someone who can look at a messy backend, name the real bottleneck, and then
            ship the smallest fix that does not make the next problem worse.
          </p>
          <Link className="email-link" to="/contact">Start a project</Link>
        </div>
      </section>

      <section className="reference-section">
        <p className="section-kicker">Focus</p>
        <div className="service-list">
          {focusAreas.map((area) => (
            <article className="line-item" key={area.title}>
              <h2>{area.title}</h2>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reference-section">
        <p className="section-kicker">How I work</p>
        <div className="principle-list">
          {workingStyle.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="reference-section">
        <p className="section-kicker">What I can help with</p>
        <div className="service-list">
          {services.slice(0, 4).map((service) => (
            <article className="line-item" key={service.title}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
        <Link className="section-link" to="/services">See all services</Link>
      </section>

      <section className="reference-section">
        <p className="section-kicker">Work</p>
        <div className="work-list">
          {caseStudies.slice(0, 4).map((caseStudy) => (
            <article className="work-row" key={caseStudy.slug}>
              <div>
                <p className="meta">{caseStudy.company}</p>
                <h2>
                  <Link to={`/work/${caseStudy.slug}`}>{caseStudy.title}</Link>
                </h2>
                <p>{caseStudy.summary}</p>
              </div>
              <ul>
                {caseStudy.metrics.slice(0, 2).map((metric) => (
                  <li key={metric}>{metric}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <Link className="section-link" to="/work">See more work</Link>
      </section>

      <section className="reference-section quote-section">
        <p className="section-kicker">Client note</p>
        <blockquote>
          "{testimonials[0].quote}"
        </blockquote>
        <p>{testimonials[0].project}</p>
      </section>

      <section className="reference-section">
        <p className="section-kicker">Writing</p>
        <div className="article-links">
          {featuredArticles.map((article) => (
            <article className="article-link-row" key={article.slug}>
              <h2>
                <Link to={`/blog/${article.slug}`}>{article.title}</Link>
              </h2>
              <p>{article.capsule}</p>
            </article>
          ))}
        </div>
        <Link className="section-link" to="/blog">Read the blog</Link>
      </section>

      <section className="reference-section contact-strip">
        <p className="section-kicker">Contact</p>
        <h2>Need Cloudflare or AWS backend help?</h2>
        <p>Send the current stack, bottleneck, and business goal. I will reply with the smallest useful next step.</p>
        <Link className="plain-button" to="/contact">Start a project</Link>
      </section>
    </>
  );
}
