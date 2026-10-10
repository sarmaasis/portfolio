import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { Breadcrumbs, ClosingCta, FaqList, PageIntro, Row } from './layout';
import { SITE_URL, landingPageDetails, type landingPages } from '../data/site';

type LandingPage = (typeof landingPages)[number];

function List({ items }: { items: string[] }) {
  return (
    <ul className="prose" style={{ fontSize: 16, lineHeight: '26px' }}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function HiringLandingPage({ page }: { page: LandingPage }) {
  const path = `/${page.slug}`;
  const details = landingPageDetails[page.slug];
  const faqs = details ? [...page.faqs, ...details.expandedFaqs] : page.faqs;
  const name = page.title.replace(' - Ashish Sharma', '');
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name, path }];

  return (
    <>
      <SEO
        title={page.title.replace(' - ', ' — ')}
        description={page.description}
        path={path}
        breadcrumbs={crumbs}
        structuredData={[
          {
            '@type': 'Service',
            '@id': `${SITE_URL}${path}#service`,
            name,
            description: page.description,
            provider: { '@id': `${SITE_URL}/#person` },
            areaServed: ['United States', 'European Union', 'United Kingdom', 'Worldwide'],
          },
          {
            '@type': 'FAQPage',
            '@id': `${SITE_URL}${path}#faq`,
            mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
          },
        ]}
      />

      <PageIntro title={page.h1} lede={page.capsule}>
        <Breadcrumbs items={crumbs.slice(0, 2)} />
      </PageIntro>

      <Row id="for" label="Who this is for">
        <p style={{ fontSize: 17, lineHeight: '28px', maxWidth: '66ch' }}>{page.intent}</p>
      </Row>
      {details?.packages ? (
        <Row id="engagements" label="Engagements">
          <ul className="prose" style={{ fontSize: 16, lineHeight: '26px' }}>
            {details.packages.map((item) => <li key={item.name}><strong>{item.name}.</strong> {item.detail}</li>)}
          </ul>
        </Row>
      ) : null}
      {details?.notFit ? <Row id="not-fit" label="Not a fit"><List items={details.notFit} /></Row> : null}
      <Row id="fit" label="Best-fit projects"><List items={page.bestFor} /></Row>
      <Row id="proof" label="Relevant proof">
        <div className="stack">
          <List items={page.proof} />
          <p className="meta">
            Read more:{' '}
            {page.related.map((url, index) => (
              <span key={url}>{index ? ', ' : ''}<Link className="ln" to={url}>{url}</Link></span>
            ))}
          </p>
        </div>
      </Row>
      <Row id="how" label="How I work"><List items={page.howIWork} /></Row>
      {details ? (
        <>
          <Row id="problems" label="Problems I usually solve"><List items={details.problems} /></Row>
          <Row id="signals" label="What I check"><List items={details.architectureSignals} /></Row>
          <Row id="deliverables" label="What you get"><List items={details.deliverables} /></Row>
          <Row id="plan" label="Typical engagement"><List items={details.engagementPlan} /></Row>
        </>
      ) : null}
      <Row id="faq" label="Questions"><FaqList items={faqs} /></Row>

      <ClosingCta
        compact
        title="Discuss this project"
        lede="Send the current stack, the bottleneck and the outcome you want. I'll reply with the smallest useful next step."
        placement={`landing-${page.slug}`}
      />
    </>
  );
}
