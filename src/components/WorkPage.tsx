import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { caseStudies } from '../data/site';

export default function WorkPage() {
  return (
    <>
      <SEO
        title="Cloudflare and Backend Case Studies"
        description="Whydonate at 4M+ req/day, healthcare, real estate, product backends. Real constraints, decisions, and outcomes."
        path="/work"
      />

      <section className="page-hero">
        <p className="eyebrow">Work</p>
        <h1>Case studies with backend constraints, decisions, and outcomes.</h1>
        <p>
          Each project had a different pressure point: compliance, query scale, donor traffic, or infrastructure cost.
        </p>
      </section>

      <section>
        <div className="stacked-list">
          {caseStudies.map((caseStudy) => (
            <article className="row-card" key={caseStudy.slug}>
              <div>
                <p className="meta">{caseStudy.company}</p>
                <h2>
                  <Link to={`/work/${caseStudy.slug}`}>{caseStudy.title}</Link>
                </h2>
                <p>{caseStudy.summary}</p>
                <ul className="compact-list">
                  {caseStudy.metrics.map((metric) => (
                    <li key={metric}>{metric}</li>
                  ))}
                </ul>
              </div>
              <Link className="text-link" to={`/work/${caseStudy.slug}`}>
                Read case study
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
