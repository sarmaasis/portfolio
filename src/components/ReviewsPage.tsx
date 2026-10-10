import { SEO } from './SEO';
import { ClosingCta, PageIntro, QuoteGrid } from './layout';
import { UPWORK_URL, testimonials } from '../data/site';

export default function ReviewsPage() {
  return (
    <>
      <SEO
        title="Client Reviews — Cloudflare and Backend Projects — Ashish Sharma"
        description="What clients wrote after Cloudflare Workers, backend architecture, integration and webhook projects with Ashish Sharma, via Upwork."
        path="/reviews"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Reviews', path: '/reviews' }]}
      />

      <PageIntro
        title="What clients said."
        lede={<>Notes from project owners after Cloudflare, backend and integration work. All reviews are from <a className="ln" href={UPWORK_URL} target="_blank" rel="noopener noreferrer">my Upwork profile</a>.</>}
      />

      <section className="row" aria-label="Reviews" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
        <QuoteGrid quotes={testimonials} />
      </section>

      <ClosingCta
        compact
        title="Want to be the next one?"
        lede="Tell me what you're building, and I'll tell you how I'd approach it."
        placement="reviews-closing"
      />
    </>
  );
}
