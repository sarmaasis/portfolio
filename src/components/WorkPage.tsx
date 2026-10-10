import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { ClosingCta, PageIntro, QuoteGrid, Row } from './layout';
import { SITE_URL, caseStudies, services, testimonials } from '../data/site';

type Filter = 'all' | 'cloudflare' | 'aws' | 'health';

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'cloudflare', label: 'Cloudflare' },
  { id: 'aws', label: 'AWS' },
  { id: 'health', label: 'Healthcare' },
];

const kinds: Record<string, string> = {
  'whydonate-api-scale': 'Fundraising platform',
  'hudpro-real-estate-data': 'Real estate',
  'aa-health-hipaa-backend': 'Healthcare',
  'wakamiapp-backend-platform': 'Consumer app',
};

function matches(caseStudy: (typeof caseStudies)[number], filter: Filter) {
  const stack = caseStudy.stack.join(' ').toLowerCase();
  if (filter === 'cloudflare') return stack.includes('cloudflare');
  if (filter === 'aws') return stack.includes('aws');
  if (filter === 'health') return caseStudy.company === 'aa.health';
  return true;
}

export default function WorkPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const shown = caseStudies.filter((item) => matches(item, filter));

  const listSchema = {
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/work#collection`,
    name: 'Backend case studies',
    url: `${SITE_URL}/work`,
    hasPart: caseStudies.map((item) => ({ '@type': 'CreativeWork', name: item.title, url: `${SITE_URL}/work/${item.slug}` })),
  };

  return (
    <>
      <SEO
        title="Backend Case Studies: Cloudflare, AWS, Healthcare — Ashish Sharma"
        description="Case studies in backend architecture: a donation API at 4M+ requests a day on Cloudflare, HIPAA-ready healthcare data flows, and serverless real estate apps."
        path="/work"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }]}
        structuredData={listSchema}
      />

      <PageIntro
        title="Backends that held up once real users arrived."
        lede="Healthcare, real estate, fundraising and consumer apps. Most of it is backend and infrastructure work, some of it end to end."
      />

      <div className="rv-tabs" role="tablist" aria-label="Filter projects">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            className="rv-tab"
            aria-selected={filter === item.id}
            aria-controls="project-list"
            onClick={() => setFilter(item.id)}
          >
            {item.label}
            <span className="count">{caseStudies.filter((caseStudy) => matches(caseStudy, item.id)).length}</span>
          </button>
        ))}
      </div>

      <div id="project-list" role="tabpanel" style={{ paddingBottom: 32 }}>
        {shown.map((item) => (
          <article className="project" key={item.slug}>
            <div className="who"><b>{item.company}</b><span className="meta">{kinds[item.slug]}</span></div>
            <div className="body">
              <h2 className="h-chapter"><Link className="ln" to={`/work/${item.slug}`}>{item.title}</Link></h2>
              <p className="meta" style={{ fontSize: 16, lineHeight: '26px' }}>{item.challenge}</p>
              <p>{item.outcome}</p>
              <p className="meta">{item.stack.join(' · ')}</p>
            </div>
          </article>
        ))}
      </div>

      <Row id="also" label="Also available" note="Outside the 14-day build">
        <dl className="terms" style={{ ['--term' as string]: '280px' }}>
          {services.map((service) => (
            <div key={service.title} style={{ display: 'contents' }}>
              <dt>{service.title}</dt>
              <dd>{service.description}</dd>
            </div>
          ))}
        </dl>
      </Row>

      <Row id="reviews" label="What clients said" note={<Link className="ln" to="/reviews">All reviews</Link>}>
        <QuoteGrid quotes={testimonials} />
      </Row>

      <ClosingCta
        compact
        title="Have a similar backend problem?"
        lede="Share the bottleneck and the outcome you need. I'll suggest the cleanest next step, even if it isn't hiring me."
        placement="work-closing"
      />
    </>
  );
}
