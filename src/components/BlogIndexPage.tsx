import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { PageIntro } from './layout';
import { SITE_URL, visibleArticles } from '../data/site';
import { formatShortDate } from '../utils/date';

type Topic = 'all' | 'mvp' | 'cloudflare' | 'architecture';

const topics: { id: Topic; label: string; match: (tags: string[]) => boolean }[] = [
  { id: 'all', label: 'All', match: () => true },
  { id: 'mvp', label: 'Building an MVP', match: (tags) => tags.some((tag) => /mvp|startup|hiring|scoping/i.test(tag)) },
  { id: 'cloudflare', label: 'Cloudflare', match: (tags) => tags.some((tag) => /cloudflare|workers|queues|d1|hyperdrive|r2/i.test(tag)) },
  { id: 'architecture', label: 'Architecture', match: (tags) => tags.some((tag) => /architecture|search|typesense|aws|database|case study|next/i.test(tag)) },
];

export default function BlogIndexPage() {
  const [topic, setTopic] = useState<Topic>('all');
  const active = topics.find((item) => item.id === topic) ?? topics[0];
  const shown = visibleArticles.filter((article) => active.match(article.tags));

  const blogSchema = {
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    name: 'Ashish Sharma — Writing',
    url: `${SITE_URL}/blog`,
    author: { '@id': `${SITE_URL}/#person` },
    blogPost: visibleArticles.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      url: `${SITE_URL}/blog/${article.slug}`,
      datePublished: article.date,
      dateModified: article.updated ?? article.date,
    })),
  };

  return (
    <>
      <SEO
        title="Writing on MVPs, Cloudflare Workers and Backends — Ashish Sharma"
        description="Practical guides on building MVPs, Cloudflare Workers, Queues, D1, Stripe webhooks, Next.js on Cloudflare, and backend architecture that holds up in production."
        path="/blog"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Writing', path: '/blog' }]}
        structuredData={blogSchema}
      />

      <PageIntro
        title="Writing"
        lede="Notes from production work: scoping and pricing MVPs, Cloudflare Workers, queues, databases, and the backend decisions that are expensive to undo."
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', paddingBottom: 24 }}>
        <div
          className="rv-seg"
          role="radiogroup"
          aria-label="Filter by topic"
          style={{ '--n': topics.length, '--i': topics.indexOf(active), width: 'min(100%, 560px)' } as CSSProperties}
        >
          <span className="rv-seg-plate" aria-hidden="true"><i /></span>
          {topics.map((item) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              className="rv-seg-item"
              aria-checked={topic === item.id}
              onClick={() => setTopic(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="meta" aria-live="polite">{shown.length === 1 ? '1 post' : `${shown.length} posts`}</p>
      </div>

      <ul className="posts posts--rich" style={{ paddingBottom: 88 }}>
        {shown.map((article) => (
          <li key={article.slug}>
            <Link to={`/blog/${article.slug}`}>
              <time className="d num" dateTime={article.updated ?? article.date}>{formatShortDate(article.updated ?? article.date)}</time>
              <span className="t">{article.title}</span>
              <span className="x">{article.capsule}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
