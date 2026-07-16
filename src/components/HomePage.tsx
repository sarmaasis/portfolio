import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { articles, CAL_URL, caseStudies, SITE_URL } from '../data/site';

const mvpSteps = [
  {
    days: 'Days 01-02',
    title: 'Scope the product',
    description: 'We define the smallest version worth launching: core user flow, data model, integrations, and the production target.',
  },
  {
    days: 'Days 03-05',
    title: 'Build the foundation',
    description: 'Application structure, Cloudflare and AWS choices, database, auth, API contracts, and a deployable baseline.',
  },
  {
    days: 'Days 06-11',
    title: 'Ship the core workflow',
    description: 'The product path users came for, built end to end across frontend, backend, integrations, and data.',
  },
  {
    days: 'Days 12-14',
    title: 'Test, deploy, hand over',
    description: 'Production checks, fixes, deployment, and the notes you need to keep building after launch.',
  },
];

const included = [
  'A focused web application or SaaS MVP',
  'Next.js frontend and product flows',
  'APIs, auth, database, and core integrations',
  'Cloudflare-first deployment where it fits',
  'Production deployment and source-code handover',
];

const faqs = [
  {
    question: 'What fits in a 14-day MVP?',
    answer: 'One clear product workflow. Think a customer-facing SaaS v1, internal tool, marketplace flow, or a focused existing-product feature. The scope is locked before Day 01 so the deadline is real.',
  },
  {
    question: 'What happens if the idea needs more than two weeks?',
    answer: 'I will say so in the first call. We can reduce it to a valuable launch slice or continue after the MVP as a clearly scoped follow-on build.',
  },
  {
    question: 'Will I own the code and accounts?',
    answer: 'Yes. The application code, deployment accounts, and technical handoff belong to you. The goal is a product you can operate and extend.',
  },
  {
    question: 'Why Cloudflare?',
    answer: 'Cloudflare Workers, Pages, R2, and Queues are a strong fit for many MVPs because they keep delivery fast without losing a production path. I use AWS or a hybrid setup where the workload needs it.',
  },
];

const mvpOfferSchema = {
  '@context': 'https://schema.org',
  '@type': 'Offer',
  name: '14-Day Full-Stack MVP Build',
  description:
    'A focused full-stack web MVP built in 14 days, including Next.js product flows, APIs, authentication, a database, core integrations, Cloudflare-first deployment where appropriate, production release, and source-code handover.',
  url: `${SITE_URL}/`,
  price: '4500',
  priceCurrency: 'USD',
  availability: 'https://schema.org/InStock',
  itemOffered: {
    '@type': 'Service',
    name: '14-Day Full-Stack MVP Build',
    serviceType: 'Full-stack MVP development',
    provider: {
      '@type': 'Person',
      name: 'Ashish Sharma',
      url: SITE_URL,
    },
    areaServed: ['United States', 'European Union', 'United Kingdom', 'Worldwide'],
  },
};

export default function HomePage() {
  const featuredArticles = articles.filter((article) => !article.slug.includes('rag')).slice(0, 3);
  const featuredWork = caseStudies.filter((caseStudy) => caseStudy.company !== 'aa.health').slice(0, 3);

  return (
    <>
      <SEO
        title="14-Day Full-Stack MVP Build for $4,500 | Ashish Sharma"
        description="Launch a focused full-stack MVP in 14 days for a flat $4,500. Cloudflare-specialized application development with Next.js, APIs, auth, databases, queues, and production deployment."
        path="/"
        structuredData={mvpOfferSchema}
      />

      <section className="home-hero mvp-hero">
        <p className="availability">[ Full-stack MVP delivery / Cloudflare specialized ]</p>
        <div className="mvp-hero-grid">
          <div>
            <h1>A real product, ready to test in 14 days.</h1>
            <p className="hero-statement">
              I build focused web MVPs for founders who need a working product, not another prototype. One senior
              engineer across the product flow, frontend, backend, cloud, and launch.
            </p>
            <div className="hero-actions">
              <a
                className="primary-link"
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="mvp_call_click"
                data-analytics-placement="hero"
              >
                Book an MVP call
              </a>
              <a className="mvp-text-link" href="#work">See the proof</a>
            </div>
          </div>
          <aside className="mvp-offer" aria-label="14-day MVP offer">
            <p>Focused MVP build</p>
            <strong>14 days</strong>
            <span>Flat $4,500 USD</span>
            <small>Scope, build, deploy, and handover included.</small>
          </aside>
        </div>
        <p className="mvp-hero-note">Best for a clear product idea, a launch deadline, and one core workflow worth putting in front of real users.</p>
      </section>

      <section className="home-section mvp-proof-section" aria-label="Delivery proof">
        <div className="mvp-proof-grid">
          <article>
            <strong>4M+</strong>
            <p>API requests/day scaled on Whydonate</p>
          </article>
          <article>
            <strong>Cloudflare</strong>
            <p>Workers, Pages, R2, Queues, TypeScript</p>
          </article>
          <article>
            <strong>Full stack</strong>
            <p>Next.js, APIs, auth, databases, search</p>
          </article>
          <article>
            <strong>Yours</strong>
            <p>Source code, accounts, and technical handover</p>
          </article>
        </div>
      </section>

      <section id="services" className="home-section mvp-process-section">
        <p className="item-label">How the 14 days work</p>
        <h2>A short build needs a sharp scope.</h2>
        <p className="mvp-intro">The goal is not to squeeze a large product into two weeks. It is to get the right version live quickly, with enough engineering underneath it to learn from real users.</p>
        <div className="mvp-process-list">
          {mvpSteps.map((step, index) => (
            <article key={step.title}>
              <p>{String(index + 1).padStart(2, '0')} / {step.days}</p>
              <h3>{step.title}</h3>
              <span>{step.description}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section mvp-includes-section">
        <div className="mvp-includes-heading">
          <p className="item-label">What the $4,500 includes</p>
          <h2>Everything needed for a credible first release.</h2>
        </div>
        <ul className="mvp-includes-list">
          {included.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="work" className="home-section mvp-work-section">
        <div className="section-heading-row">
          <div>
            <p className="item-label">Selected work</p>
            <h2>Built for the moment the product gets real.</h2>
          </div>
          <Link to="/work">all work</Link>
        </div>
        <div className="work-feed">
          {featuredWork.map((caseStudy) => (
            <article className="featured-work" key={caseStudy.slug}>
              <p className="item-label">{caseStudy.company}</p>
              <h3><Link to={`/work/${caseStudy.slug}`}>{caseStudy.title}</Link></h3>
              <p>{caseStudy.summary}</p>
              <ul className="inline-list">
                {caseStudy.metrics.slice(0, 3).map((metric) => <li key={metric}>{metric}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section mvp-faq-section">
        <p className="item-label">Questions, answered</p>
        <h2>Clear scope. No surprise handoff.</h2>
        <div className="mvp-faq-list">
          {faqs.map((faq, index) => (
            <article key={faq.question}>
              <h3><span>{String(index + 1).padStart(2, '0')}</span>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="writing" className="home-section mvp-writing-section">
        <div className="section-heading-row">
          <h2>Notes on building it well</h2>
          <Link to="/blog">all posts</Link>
        </div>
        <div className="writing-list">
          {featuredArticles.map((article) => (
            <article key={article.slug}>
              <h3><Link to={`/blog/${article.slug}`}>{article.title}</Link></h3>
              <p>{article.capsule}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="home-section contact-section mvp-contact-section">
        <p className="item-label">Day 01 starts with a clear brief</p>
        <h2>Bring the idea. Leave with something people can use.</h2>
        <p>Book a short call with the product goal, key user, and launch date. I will tell you whether it fits a 14-day build before we start.</p>
        <a
          className="primary-link"
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-event="mvp_call_click"
          data-analytics-placement="closing"
        >
          Book an MVP call
        </a>
      </section>
    </>
  );
}
