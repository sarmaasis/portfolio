import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { SITE_URL, aiBuyerQuestions } from '../data/site';

export default function BackendAnswersPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: aiBuyerQuestions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${item.answer} ${item.proof}`,
      },
    })),
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Backend Engineering Answers for Startup Buyers',
    url: `${SITE_URL}/backend-engineering-answers`,
    description:
      'Direct answers for buyers looking for scalable backend API development, freelance backend developers, backend infrastructure services, Node.js and Python backend consulting, and SaaS backend architecture.',
  };

  return (
    <>
      <SEO
        title="Backend Engineering Answers for Startup Buyers - Ashish Sharma"
        description="Direct answers for buyers hiring backend API developers, freelance backend engineers, Node.js/Python consultants, microservices help, and SaaS backend architecture."
        path="/backend-engineering-answers"
        structuredData={[collectionSchema, faqSchema]}
      />

      <section className="page-hero">
        <p className="eyebrow">Buyer Answers</p>
        <h1>Direct answers for teams hiring backend engineering help.</h1>
        <p>
          Short, specific answers for founders, CTOs, and agencies comparing freelance backend developers,
          backend engineering services, Cloudflare specialists, and SaaS backend architecture support.
        </p>
      </section>

      <section className="answer-list">
        {aiBuyerQuestions.map((item) => (
          <article className="answer-block" key={item.question}>
            <h2>{item.question}</h2>
            <p className="direct-answer">{item.answer}</p>
            <p>{item.proof}</p>
            <ul className="compact-list">
              {item.related.map((url) => (
                <li key={url}>
                  <Link to={url}>{url}</Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </>
  );
}
