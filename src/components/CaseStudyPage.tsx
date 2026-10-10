import { Link, useParams } from 'react-router-dom';
import { SEO } from './SEO';
import { Breadcrumbs, ClosingCta, FaqList, Row } from './layout';
import NotFoundPage from './NotFoundPage';
import { SITE_URL, caseStudies, caseStudyDetails } from '../data/site';
import { slugify } from '../utils/markdown';

const sectionTitles = ['The problem', 'Approach', 'Architecture decisions', 'Before and after', 'Risks avoided', 'Cloudflare and AWS'];

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const index = caseStudies.findIndex((item) => item.slug === slug);
  const caseStudy = caseStudies[index];

  if (!caseStudy) {
    return <NotFoundPage title="Case study not found." />;
  }

  const path = `/work/${caseStudy.slug}`;
  const details = caseStudyDetails[caseStudy.slug];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }, { name: caseStudy.company, path }];
  const toc = details ? sectionTitles : sectionTitles.slice(0, 2);

  const schema = {
    '@type': 'Article',
    '@id': `${SITE_URL}${path}#article`,
    headline: caseStudy.title,
    description: caseStudy.summary,
    url: `${SITE_URL}${path}`,
    image: `${SITE_URL}/og-image.png`,
    keywords: caseStudy.stack.join(', '),
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    mainEntityOfPage: { '@id': `${SITE_URL}${path}#webpage` },
    about: { '@type': 'Organization', name: caseStudy.company, url: caseStudy.url },
  };

  return (
    <>
      <SEO
        title={`${caseStudy.title} — Case Study`}
        description={caseStudy.summary}
        path={path}
        type="article"
        breadcrumbs={crumbs}
        structuredData={details ? [schema, {
          '@type': 'FAQPage',
          '@id': `${SITE_URL}${path}#faq`,
          mainEntity: details.clientFaqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
        }] : schema}
      />

      <section className="intro" style={{ paddingTop: 72 }}>
        <Breadcrumbs items={crumbs} />
        <h1 className="h-page">{caseStudy.title}</h1>
        <p className="lede">{caseStudy.summary}</p>
        <dl className="facts">
          <div><dt>Client</dt><dd><a className="ln" href={caseStudy.url} target="_blank" rel="noopener noreferrer">{caseStudy.url.replace(/^https?:\/\/(www\.)?/, '')}</a></dd></div>
          <div><dt>Outcome</dt><dd>{caseStudy.metrics[0]}</dd></div>
          <div style={{ gridColumn: 'span 2' }}><dt>Stack</dt><dd>{caseStudy.stack.join(', ')}</dd></div>
        </dl>
      </section>

      <div className="row">
        <nav className="toc" aria-label="On this page">
          <p>On this page</p>
          {toc.map((title) => <a key={title} href={`#${slugify(title)}`}>{title}</a>)}
        </nav>

        <article className="prose">
          <h2 id={slugify('The problem')}>The problem</h2>
          <p>{caseStudy.challenge}</p>

          <h2 id={slugify('Approach')}>Approach</h2>
          <p>{caseStudy.approach}</p>
          {details?.implementationNotes.map((note) => <p key={note}>{note}</p>)}
          <p><strong>Result:</strong> {caseStudy.result}</p>

          {details ? (
            <>
              <h2 id={slugify('Architecture decisions')}>Architecture decisions</h2>
              <ul>{details.architectureDecisions.map((item) => <li key={item}>{item}</li>)}</ul>

              <h2 id={slugify('Before and after')}>Before and after</h2>
              <div className="versus">
                {details.beforeAfter.map((item) => (
                  <div key={item.before} style={{ display: 'contents' }}>
                    <div><span className="k">Before</span>{item.before}</div>
                    <div><span className="k">After</span>{item.after}</div>
                  </div>
                ))}
              </div>

              <h2 id={slugify('Risks avoided')}>Risks avoided</h2>
              <ul>{details.risksAvoided.map((item) => <li key={item}>{item}</li>)}</ul>

              <h2 id={slugify('Cloudflare and AWS')}>Cloudflare and AWS</h2>
              <ul>{details.cloudflareAws.map((item) => <li key={item}>{item}</li>)}</ul>
            </>
          ) : null}
        </article>
      </div>

      {details ? (
        <Row id="questions" label="Questions">
          <FaqList items={details.clientFaqs} />
        </Row>
      ) : null}

      <Row id="next" label="Next project">
        <Link to={`/work/${next.slug}`} className="stack" style={{ ['--gap' as string]: '8px' }}>
          <span className="meta">{next.company}</span>
          <span className="h-chapter ln">{next.title}</span>
        </Link>
      </Row>

      <ClosingCta
        compact
        title="Have a similar backend problem?"
        lede="Tell me where it hurts and what the target is. I'll suggest the smallest change that gets you there."
        placement="case-study-closing"
      />
    </>
  );
}
