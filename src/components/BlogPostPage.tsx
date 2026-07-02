import { Link, useParams } from 'react-router-dom';
import { SEO } from './SEO';
import { SITE_URL, articles } from '../data/site';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <section className="page-hero">
        <p className="eyebrow">Not found</p>
        <h1>Article not found.</h1>
        <Link className="text-link" to="/blog">Return to blog</Link>
      </section>
    );
  }

  const path = `/blog/${article.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    url: `${SITE_URL}${path}`,
    author: {
      '@type': 'Person',
      name: 'Ashish Sharma',
      url: SITE_URL,
    },
  };

  return (
    <>
      <SEO
        title={`${article.title} | Ashish Sharma`}
        description={article.description}
        path={path}
        type="article"
        structuredData={schema}
      />

      <article>
        <section className="article-hero">
          <p className="eyebrow">{article.date} · {article.tags.join(' / ')}</p>
          <h1>{article.title}</h1>
          <p className="answer-capsule">{article.capsule}</p>
        </section>

        <section className="prose">
          {article.sections.map((section) => (
            <div key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </div>
          ))}

          <h2>Next step</h2>
          <p>
            If you are evaluating this decision for a production backend, send the current architecture,
            traffic shape, and cost pressure. I can turn that into a short migration or audit plan.
          </p>
          <Link className="btn-primary" to="/contact">Request an architecture review</Link>
        </section>
      </article>
    </>
  );
}
