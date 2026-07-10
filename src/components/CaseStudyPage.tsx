import { Link, useParams } from 'react-router-dom';
import { SEO } from './SEO';
import { SITE_URL, caseStudies, caseStudyDetails } from '../data/site';

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!caseStudy) {
    return (
      <section className="page-hero">
        <p className="eyebrow">Not found</p>
        <h1>Case study not found.</h1>
        <Link className="text-link" to="/work">Return to work</Link>
      </section>
    );
  }

  const path = `/work/${caseStudy.slug}`;
  const details = caseStudyDetails[caseStudy.slug];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline: caseStudy.title,
    description: caseStudy.summary,
    url: `${SITE_URL}${path}`,
    about: caseStudy.stack,
    creator: {
      '@type': 'Person',
      name: 'Ashish Sharma',
    },
  };

  return (
    <>
      <SEO
        title={`${caseStudy.title} - Backend Case Study`}
        description={caseStudy.summary}
        path={path}
        structuredData={schema}
      />

      <article>
        <section className="page-hero">
          <p className="eyebrow">{caseStudy.company}</p>
          <h1>{caseStudy.title}</h1>
          <p>{caseStudy.summary}</p>
          <a className="text-link" href={caseStudy.url} target="_blank" rel="noopener noreferrer">
            Visit {caseStudy.company}
          </a>
        </section>

        <section className="content-grid">
          <div className="panel">
            <h2>Outcome</h2>
            <p>{caseStudy.outcome}</p>
          </div>
          <div className="panel">
            <h2>Stack</h2>
            <ul className="compact-list">
              {caseStudy.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="prose">
          <h2>Challenge</h2>
          <p>{caseStudy.challenge}</p>
          <h2>Approach</h2>
          <p>{caseStudy.approach}</p>
          <h2>Result</h2>
          <p>{caseStudy.result}</p>
          <h2>Proof Points</h2>
          <ul>
            {caseStudy.metrics.map((metric) => (
              <li key={metric}>{metric}</li>
            ))}
          </ul>
        </section>

        {details ? (
          <>
            <section className="prose">
              <h2>Architecture Decisions</h2>
              <ul>
                {details.architectureDecisions.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>
            </section>

            <section className="prose">
              <h2>Implementation Notes</h2>
              {details.implementationNotes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </section>

            <section>
              <h2 className="section-title">Before and After</h2>
              <div className="proof-grid">
                {details.beforeAfter.map((item) => (
                  <article className="panel" key={item.before}>
                    <h3>Before</h3>
                    <p>{item.before}</p>
                    <h3>After</h3>
                    <p>{item.after}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="prose">
              <h2>Risks Avoided</h2>
              <ul>
                {details.risksAvoided.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>Cloudflare and AWS Relevance</h2>
              <ul>
                {details.cloudflareAws.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2>Client Questions</h2>
              {details.clientFaqs.map((faq) => (
                <div key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </section>
          </>
        ) : null}
      </article>

      <section className="cta-band">
        <h2>Have a similar backend problem?</h2>
        <p>Share the bottleneck and the target outcome, and I will suggest the cleanest next step.</p>
        <Link className="btn-primary" to="/contact">Start a conversation</Link>
      </section>
    </>
  );
}
