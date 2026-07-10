import { Link, useParams } from 'react-router-dom';
import { SEO } from './SEO';
import { SITE_URL, articles } from '../data/site';
import { formatArticleDate } from '../utils/date';

function getReadingMinutes(article: (typeof articles)[number]) {
  const words = [
    article.title,
    article.description,
    article.capsule,
    ...article.sections.flatMap((section) => [section.heading, section.body]),
  ].join(' ').split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

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
  const visibleArticles = articles.filter((item) => !item.slug.includes('rag'));
  const relatedArticles = visibleArticles.filter((item) => item.slug !== article.slug).slice(0, 2);
  const readingMinutes = getReadingMinutes(article);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${path}`,
    },
    headline: article.title,
    description: article.description,
    articleSection: article.tags[0],
    keywords: article.tags,
    inLanguage: 'en',
    datePublished: article.date,
    dateModified: article.date,
    url: `${SITE_URL}${path}`,
    author: {
      '@type': 'Person',
      name: 'Ashish Sharma',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ashish Sharma Full-Stack Backend Development',
      url: SITE_URL,
    },
  };

  return (
    <>
      <SEO
        title={`${article.title} - Ashish Sharma`}
        description={article.description}
        path={path}
        type="article"
        structuredData={schema}
      />

      <article className="blog-article">
        <section className="blog-hero">
          <p className="blog-meta">{formatArticleDate(article.date)} · {readingMinutes} min read</p>
          <h1>{article.title}</h1>
          <p className="blog-deck">{article.description}</p>
          <p className="blog-byline">By Ashish Sharma</p>
        </section>

        <section className="article-layout">
          <aside className="article-aside" aria-label="Article contents">
            <p className="aside-label">In this article</p>
            <ol>
              {article.sections.slice(0, 7).map((section) => (
                <li key={section.heading}>
                  <a href={`#${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="blog-prose">
            <p className="article-lead">{article.capsule}</p>

            {article.sections.map((section) => {
              const id = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

              return (
                <div className="blog-section" id={id} key={section.heading}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </div>
              );
            })}

            <div className="article-cta">
              <p className="aside-label">Next step</p>
              <h2>Need this decision made for your backend?</h2>
              <p>
                Send the current architecture, traffic shape, and cost pressure. I can turn that into a short
                migration or audit plan.
              </p>
              <Link className="plain-button" to="/contact">Request an architecture review</Link>
            </div>

            {relatedArticles.length ? (
              <div className="related-articles">
                <h2>More writing</h2>
                {relatedArticles.map((related) => (
                  <p key={related.slug}>
                    <Link to={`/blog/${related.slug}`}>{related.title}</Link>
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </article>
    </>
  );
}
