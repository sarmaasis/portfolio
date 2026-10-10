import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { FaqList, QuoteGrid, Row, ClosingCta } from './layout';
import { plainText } from '../utils/markdown';
import { CAL_URL, EMAIL, SITE_URL, caseStudies, testimonials, visibleArticles } from '../data/site';
import { formatShortDate } from '../utils/date';
import { mvpFaqs, mvpIncludes, mvpPhases } from '../data/offer';

const workRows: Record<string, string> = {
  'whydonate-api-scale': "Scaled the donation platform's API to 4M+ requests a day, through campaign traffic spikes, without a rewrite.",
  'hudpro-real-estate-data': 'The application and backend for real estate inventory workflows, modelled around the queries the product actually runs.',
  'aa-health-hipaa-backend': 'A HIPAA-ready backend for patient workflows, built from scratch with explicit access boundaries.',
  'wakamiapp-backend-platform': 'The whole backend platform: core APIs, data model, authentication and production foundations.',
};

const workOrder = ['whydonate-api-scale', 'hudpro-real-estate-data', 'aa-health-hipaa-backend', 'wakamiapp-backend-platform'];

const offerSchema = {
  '@type': 'Offer',
  '@id': `${SITE_URL}/#mvp-offer`,
  name: '14-day full-stack MVP build',
  description:
    'A focused web MVP built in 14 days: one core workflow, Next.js frontend, APIs, auth, database and core integrations, deployed to production with the source code and accounts handed over.',
  url: `${SITE_URL}/pricing`,
  price: '4500',
  priceCurrency: 'USD',
  availability: 'https://schema.org/InStock',
  seller: { '@id': `${SITE_URL}/#person` },
  itemOffered: { '@id': `${SITE_URL}/#service` },
};

export default function HomePage() {
  const work = workOrder
    .map((slug) => caseStudies.find((item) => item.slug === slug))
    .filter((item): item is (typeof caseStudies)[number] => Boolean(item));
  const posts = visibleArticles.slice(0, 6);

  return (
    <>
      <SEO
        title="14-Day MVP Development for $4,500 — Ashish Sharma"
        description="I build focused web MVPs in 14 days for a flat $4,500: Next.js, APIs, auth and a database on Cloudflare or AWS, with the code and accounts handed over."
        path="/"
        structuredData={[
          offerSchema,
          {
            '@type': 'FAQPage',
            '@id': `${SITE_URL}/#faq`,
            mainEntity: mvpFaqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: plainText(faq.answer) } })),
          },
        ]}
      />

      <section className="intro intro--home">
        <h1 className="statement">
          I build focused web products in 14 days, for a flat $4,500.{' '}
          <span className="dim">Mostly on Cloudflare, sometimes AWS, always handed over with the code and the accounts.</span>
        </h1>
        <div className="stack" style={{ ['--gap' as string]: '20px' }}>
          <div className="btns">
            <a className="rv-btn rv-btn--primary" href={CAL_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="mvp_call_click" data-analytics-placement="hero">
              Book a 20-minute call
            </a>
            <a className="rv-btn" href={`mailto:${EMAIL}?subject=MVP%20build`}>{EMAIL}</a>
          </div>
          <p className="meta">Full-stack, backend-first engineer. Remote, working with teams in the US, EU and UK.</p>
        </div>
      </section>

      <Row id="offer" label="The 14-day build" note="One workflow, live">
        <div className="stack" style={{ ['--gap' as string]: '48px' }}>
          <p className="lede" style={{ color: 'var(--ink)' }}>
            The goal isn't to squeeze a big product into two weeks. It's to get the right first version in front of real users, with enough engineering underneath to keep building on.
          </p>
          <div className="fortnight" role="list" aria-label="The fourteen days">
            {Array.from({ length: 14 }, (_, index) => (
              <span key={index} className={index === 13 ? 'day num launch' : 'day num'} aria-hidden="true">{index + 1}</span>
            ))}
            {mvpPhases.map((phase, index) => (
              <div key={phase.title} className={`phase p${index + 1}`} role="listitem">
                <span className="when">{phase.days}</span>
                <h3 className="h-item">{phase.title}</h3>
                <p className="meta">{phase.summary}</p>
              </div>
            ))}
          </div>
          <dl className="terms">
            <dt>Price</dt><dd>$4,500 USD, flat. Scope is agreed before day one, so the deadline is real.</dd>
            <dt>You get</dt><dd><ul>{mvpIncludes.map((item) => <li key={item}>{item}</li>)}</ul></dd>
            <dt>You own</dt><dd>The source code, the deployment accounts and the technical handover.</dd>
            <dt>Good fit</dt><dd>A clear idea, a launch date, and one workflow worth putting in front of real users. <Link className="ln" to="/pricing">Pricing and other engagements</Link></dd>
          </dl>
        </div>
      </Row>

      <Row id="work" label="Selected work" note={<Link className="ln" to="/work">All projects</Link>}>
        <div className="table-scroll">
          <table className="rv-table stack-table">
            <thead><tr><th scope="col">Client</th><th scope="col">What I built</th><th scope="col">Stack</th></tr></thead>
            <tbody>
              {work.map((item) => (
                <tr key={item.slug}>
                  <td><Link className="ln" to={`/work/${item.slug}`}>{item.company}</Link></td>
                  <td>{workRows[item.slug] ?? item.summary}</td>
                  <td className="quiet">{item.stack.slice(0, 5).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Row>

      <Row id="reviews" label="What clients said" note="Via Upwork">
        <QuoteGrid quotes={testimonials} />
      </Row>

      <Row id="writing" label="Writing" note={<Link className="ln" to="/blog">All posts</Link>}>
        <ul className="posts">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`}>
                <time className="d num" dateTime={post.updated ?? post.date}>{formatShortDate(post.updated ?? post.date)}</time>
                <span className="t">{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Row>

      <Row id="faq" label="Questions">
        <FaqList items={mvpFaqs} />
      </Row>

      <ClosingCta
        title="Got a product that needs to exist in two weeks?"
        lede="Send the product goal, the key user and the launch date. I'll tell you on the call whether it fits a 14-day build, before anything starts."
        placement="home-closing"
      />
    </>
  );
}
