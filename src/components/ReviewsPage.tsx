import { SEO } from './SEO';
import { testimonials } from '../data/site';

export default function ReviewsPage() {
  return (
    <>
      <SEO
        title="Client Reviews | Ashish Sharma Backend Engineering"
        description="Client feedback for Cloudflare Workers, backend architecture, integrations, and production engineering projects with Ashish Sharma."
        path="/reviews"
      />

      <section className="page-hero">
        <p className="eyebrow">Reviews</p>
        <h1>Client feedback from backend, Cloudflare, and integration projects.</h1>
        <p>Short notes from project owners who needed careful backend execution and clear communication.</p>
      </section>

      <section>
        <div className="card-grid">
          {testimonials.map((testimonial) => (
            <figure className="testimonial-card" key={testimonial.project}>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                {testimonial.project} · {testimonial.region}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
