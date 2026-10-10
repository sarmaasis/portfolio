import { Link, useParams } from 'react-router-dom';
import { SEO } from './SEO';
import { Breadcrumbs, ClosingCta, RichText, Row } from './layout';
import NotFoundPage from './NotFoundPage';
import { SITE_URL, articles, visibleArticles } from '../data/site';
import type { Article } from '../data/article-types';
import { formatArticleDate, formatShortDate } from '../utils/date';
import { countWords, extractFaqs, parseMarkdown, plainText, slugify, type MdBlock } from '../utils/markdown';

function toBlocks(article: Article): MdBlock[] {
  if (article.markdown) return parseMarkdown(article.markdown);
  return article.sections.flatMap((section): MdBlock[] => [
    { type: 'h2', text: section.heading, id: slugify(section.heading) },
    { type: 'p', text: section.body },
  ]);
}

function Block({ block }: { block: MdBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2 id={block.id}><RichText text={block.text} /></h2>;
    case 'h3':
      return <h3 id={block.id}><RichText text={block.text} /></h3>;
    case 'p':
      return <p><RichText text={block.text} /></p>;
    case 'ul':
      return <ul>{block.items.map((item) => <li key={item}><RichText text={item} /></li>)}</ul>;
    case 'ol':
      return <ol>{block.items.map((item) => <li key={item}><RichText text={item} /></li>)}</ol>;
    case 'note':
      return (
        <aside className="note">
          {block.title ? <strong>{block.title}</strong> : null}
          <RichText text={block.text} />
        </aside>
      );
    case 'table':
      return (
        <div className="table-scroll">
          <table className="rv-table">
            <thead><tr>{block.head.map((cell) => <th key={cell} scope="col"><RichText text={cell} /></th>)}</tr></thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}><RichText text={cell} /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'code':
      return (
        <figure className="code">
          <figcaption className="code-h">
            <span>{block.title ?? block.lang}</span>
          </figcaption>
          <pre><code className={`language-${block.lang}`}>{block.code}</code></pre>
        </figure>
      );
    default:
      return null;
  }
}

/* Where each post should send a reader who wants help (from master's
   "point high-traffic blogs at hire, audit, and pricing" work). */
function serviceLinks(article: Article) {
  const slug = article.slug;
  if (article.tags.some((tag) => /mvp|scoping/i.test(tag))) {
    return [
      { to: '/pricing', label: '14-day MVP for $4,500' },
      { to: '/blog/how-to-scope-an-mvp', label: 'How I scope an MVP' },
      { to: '/services/architecture-audit', label: '$5,000 architecture audit' },
    ];
  }
  if (slug.includes('lambda') || slug.includes('cost')) {
    return [
      { to: '/services/aws-lambda-to-cloudflare-workers', label: 'Lambda to Workers migration' },
      { to: '/services/architecture-audit', label: '$5,000 architecture audit' },
      { to: '/pricing', label: 'Pricing' },
    ];
  }
  if (slug.includes('backend-engineering-services') || slug.includes('checklist')) {
    return [
      { to: '/hire-cloudflare-workers-developer', label: 'Hire a Cloudflare Workers developer' },
      { to: '/services/architecture-audit', label: '$5,000 architecture audit' },
      { to: '/pricing', label: '$4,500 MVP and audit pricing' },
    ];
  }
  return [
    { to: '/hire-cloudflare-workers-developer', label: 'Hire a Cloudflare Workers developer' },
    { to: '/services/architecture-audit', label: '$5,000 architecture audit' },
    { to: '/services/aws-lambda-to-cloudflare-workers', label: 'Lambda to Workers migration' },
  ];
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return <NotFoundPage title="Article not found." />;
  }

  const path = `/blog/${article.slug}`;
  const blocks = toBlocks(article);
  const headings = blocks.filter((block): block is Extract<MdBlock, { type: 'h2' }> => block.type === 'h2');
  const faqs = article.faqs ?? extractFaqs(blocks);
  const source = article.markdown ?? article.sections.map((section) => `${section.heading} ${section.body}`).join(' ');
  const wordCount = countWords(`${article.capsule} ${source}`);
  const readingMinutes = Math.max(1, Math.round(wordCount / 230));
  const modified = article.updated ?? article.date;
  const related = visibleArticles
    .filter((item) => item.slug !== article.slug)
    .map((item) => ({ item, shared: item.tags.filter((tag) => article.tags.includes(tag)).length }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 3)
    .map(({ item }) => item);
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Writing', path: '/blog' }, { name: article.title, path }];
  const isMvpPost = article.tags.some((tag) => /mvp|scoping/i.test(tag));

  const postingSchema = {
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}${path}#article`,
    headline: article.title,
    description: article.description,
    image: `${SITE_URL}/og-image.png`,
    datePublished: article.date,
    dateModified: modified,
    wordCount,
    timeRequired: `PT${readingMinutes}M`,
    keywords: article.tags.join(', '),
    articleSection: article.tags[0],
    inLanguage: 'en',
    url: `${SITE_URL}${path}`,
    mainEntityOfPage: { '@id': `${SITE_URL}${path}#webpage` },
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    isPartOf: { '@id': `${SITE_URL}/blog#blog` },
  };
  const faqSchema = faqs.length
    ? [{
      '@type': 'FAQPage',
      '@id': `${SITE_URL}${path}#faq`,
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: plainText(faq.question), acceptedAnswer: { '@type': 'Answer', text: plainText(faq.answer) } })),
    }]
    : [];

  return (
    <>
      <SEO
        title={article.seoTitle ?? article.title}
        description={article.description}
        path={path}
        type="article"
        breadcrumbs={crumbs}
        publishedTime={article.date}
        modifiedTime={modified}
        noindex={article.hidden}
        structuredData={[postingSchema, ...faqSchema]}
      />

      <section className="intro" style={{ paddingTop: 72 }}>
        <Breadcrumbs items={crumbs.slice(0, 2)} />
        <h1 className="h-page" style={{ maxWidth: '28ch' }}>{article.title}</h1>
        <p className="lede">{article.capsule}</p>
        <p className="meta">
          By <Link className="ln" to="/about">Ashish Sharma</Link> · <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          {article.updated ? <> · Updated <time dateTime={article.updated}>{formatArticleDate(article.updated)}</time></> : null}
          {' '}· {readingMinutes} min read
        </p>
      </section>

      <div className="row">
        <nav className="toc" aria-label="On this page">
          <p>On this page</p>
          {headings.map((heading) => <a key={heading.id} href={`#${heading.id}`}>{plainText(heading.text)}</a>)}
        </nav>

        <article className="prose">
          {article.takeaways?.length ? (
            <section className="takeaways" aria-label="Key takeaways">
              <h2>Key takeaways</h2>
              <ul>{article.takeaways.map((item) => <li key={item}><RichText text={item} /></li>)}</ul>
            </section>
          ) : null}
          {blocks.map((block, index) => <Block key={index} block={block} />)}
        </article>
      </div>

      <Row id="author" label="Written by">
        <div className="stack" style={{ maxWidth: '64ch' }}>
          <p style={{ fontSize: 17, lineHeight: '28px' }}>
            Ashish Sharma, a full-stack, backend-first engineer. I've run Cloudflare-first backends in production at 4M+ requests a day, and I build focused MVPs in 14 days.
          </p>
          <div className="btns">
            <Link className="rv-btn rv-btn--sm" to="/pricing">About the 14-day build</Link>
            <Link className="rv-btn rv-btn--ghost rv-btn--sm" to="/work">See the work</Link>
          </div>
        </div>
      </Row>

      {related.length ? (
        <Row id="more" label="Keep reading">
          <ul className="posts">
            {related.map((item) => (
              <li key={item.slug}>
                <Link to={`/blog/${item.slug}`}>
                  <time className="d num" dateTime={item.updated ?? item.date}>{formatShortDate(item.updated ?? item.date)}</time>
                  <span className="t">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Row>
      ) : null}

      <Row id="help" label="Want help with this?">
        <ul className="stack" style={{ ['--gap' as string]: '6px' }}>
          {serviceLinks(article).map((item) => <li key={item.to}><Link className="ln" to={item.to}>{item.label}</Link></li>)}
        </ul>
      </Row>

      {isMvpPost ? (
        <ClosingCta
          compact
          title="Need this built, not just explained?"
          lede="I build focused MVPs in 14 days for a flat $4,500, with the code and accounts handed over."
          placement="article-closing"
        />
      ) : (
        <ClosingCta
          compact
          title="Need this decision made for your backend?"
          lede="Send the current architecture, traffic shape, and cost pressure. A fixed $5,000 architecture audit turns that into a ranked plan. Implementation starts from $4,500."
          placement="article-closing"
        />
      )}
    </>
  );
}
