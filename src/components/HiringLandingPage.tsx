import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { SITE_URL, landingPageDetails, type landingPages } from '../data/site';

type LandingPage = (typeof landingPages)[number];

interface HiringLandingPageProps {
  page: LandingPage;
}

export default function HiringLandingPage({ page }: HiringLandingPageProps) {
  const path = `/${page.slug}`;
  const details = landingPageDetails[page.slug];
  const faqs = details ? [...page.faqs, ...details.expandedFaqs] : page.faqs;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.h1,
    description: page.description,
    provider: {
      '@type': 'Person',
      name: 'Ashish Sharma',
      url: SITE_URL,
    },
    areaServed: ['United States', 'European Union', 'United Kingdom', 'Worldwide'],
    serviceType: page.title.replace(' - Ashish Sharma', ''),
  };

  return (
    <>
      <SEO
        title={page.title}
        description={page.description}
        path={path}
        structuredData={[serviceSchema, faqSchema]}
      />

      <article>
        <section className="page-hero">
          <p className="eyebrow">Hiring Guide</p>
          <h1>{page.h1}</h1>
          <p className="answer-capsule">{page.capsule}</p>
        </section>

        <section className="prose">
          <h2>Who this is for</h2>
          <p>{page.intent}</p>

          <h2>Best fit projects</h2>
          <ul>
            {page.bestFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>Relevant proof</h2>
          <ul>
            {page.proof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>How I work</h2>
          <ul>
            {page.howIWork.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {details ? (
            <>
              <h2>Problems I Usually Solve</h2>
              <ul>
                {details.problems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>Architecture Signals I Check</h2>
              <ul>
                {details.architectureSignals.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>What You Get</h2>
              <ul>
                {details.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>Typical Engagement Plan</h2>
              <ul>
                {details.engagementPlan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}

          <h2>Related proof pages</h2>
          <ul>
            {page.related.map((url) => (
              <li key={url}>
                <Link to={url}>{url}</Link>
              </li>
            ))}
          </ul>

          <h2>Questions founders usually ask</h2>
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}

          <h2>Next step</h2>
          <p>
            Send the current stack, the bottleneck, and the business outcome you want. I will reply with the
            smallest useful next step: audit, scoped implementation, or a short technical plan.
          </p>
          <Link className="btn-primary" to="/contact">Discuss this project</Link>
        </section>
      </article>
    </>
  );
}
