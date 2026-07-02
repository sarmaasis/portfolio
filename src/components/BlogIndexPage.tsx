import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { articles } from '../data/site';

export default function BlogIndexPage() {
  return (
    <>
      <SEO
        title="Backend Engineering Blog | Cloudflare, AI/RAG & API Scaling"
        description="Technical articles on Cloudflare Workers, backend architecture, AI/RAG production systems, API scaling, and cloud cost optimization."
        path="/blog"
      />

      <section className="page-hero">
        <p className="eyebrow">Blog</p>
        <h1>Technical notes for founders and CTOs making backend decisions.</h1>
        <p>
          Specific answers on edge infrastructure, AI backends, search migrations, and architecture trade-offs.
        </p>
      </section>

      <section>
        <div className="stacked-list">
          {articles.map((article) => (
            <article className="row-card" key={article.slug}>
              <div>
                <p className="meta">{article.date} · {article.tags.join(' / ')}</p>
                <h2>
                  <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                </h2>
                <p>{article.capsule}</p>
              </div>
              <Link className="text-link" to={`/blog/${article.slug}`}>
                Read article
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
