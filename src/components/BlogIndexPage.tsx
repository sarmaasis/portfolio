import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { articles } from '../data/site';
import { formatArticleDate } from '../utils/date';

export default function BlogIndexPage() {
  return (
    <>
      <SEO
        title="Backend Engineering Blog - Cloudflare, AWS and API Scaling"
        description="Technical articles on Cloudflare Workers, AWS backend architecture, API scaling, search migration, and cloud cost optimization."
        path="/blog"
      />

      <section className="page-hero blog-index-hero">
        <p className="eyebrow">Blog</p>
        <h1>Technical notes for founders and CTOs making backend decisions.</h1>
        <p>
          Specific answers on Cloudflare Workers, AWS cost, backend architecture, API scaling, search migrations,
          and infrastructure trade-offs.
        </p>
      </section>

      <section>
        <div className="blog-list">
          {articles.filter((article) => !article.slug.includes('rag')).map((article) => (
            <article className="blog-card" key={article.slug}>
              <div>
                <p className="blog-meta">{formatArticleDate(article.date)} · {article.tags.join(' / ')}</p>
                <h2>
                  <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                </h2>
                <p>{article.capsule}</p>
                <ul className="tag-list">
                  {article.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
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
