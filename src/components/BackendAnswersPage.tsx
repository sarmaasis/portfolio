import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { ClosingCta, PageIntro } from './layout';
import { SITE_URL, aiBuyerQuestions } from '../data/site';
import { slugify } from '../utils/markdown';

export default function BackendAnswersPage() {
  const faqSchema = {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/backend-engineering-answers#faq`,
    mainEntity: aiBuyerQuestions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: `${item.answer} ${item.proof}` },
    })),
  };

  return (
    <>
      <SEO
        title="Backend Engineering Answers for Startup Buyers — Ashish Sharma"
        description="Direct answers for founders hiring backend API developers, freelance backend engineers, Node.js and Python consultants, and SaaS backend architecture help."
        path="/backend-engineering-answers"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Buyer answers', path: '/backend-engineering-answers' }]}
        structuredData={faqSchema}
      />

      <PageIntro
        title="Direct answers for teams hiring backend help."
        lede="Short, specific answers for founders, CTOs and agencies comparing freelance backend developers, agencies and Cloudflare specialists."
      />

      {aiBuyerQuestions.map((item) => (
        <section key={item.question} id={slugify(item.question)} className="row" aria-labelledby={`${slugify(item.question)}-h`}>
          <h2 id={`${slugify(item.question)}-h`} style={{ color: 'var(--ink)', fontSize: 17 }}>{item.question}</h2>
          <div className="stack" style={{ maxWidth: '66ch' }}>
            <p style={{ fontSize: 17, lineHeight: '28px' }}>{item.answer}</p>
            <p className="meta" style={{ fontSize: 15, lineHeight: '24px' }}>{item.proof}</p>
            <p className="meta">
              Related:{' '}
              {item.related.map((url, index) => (
                <span key={url}>{index ? ', ' : ''}<Link className="ln" to={url}>{url}</Link></span>
              ))}
            </p>
          </div>
        </section>
      ))}

      <ClosingCta
        compact
        title="Have a question that isn't here?"
        lede="Ask it on a 20-minute call. You'll get a straight answer, including when I'm not the right fit."
        placement="answers-closing"
      />
    </>
  );
}
