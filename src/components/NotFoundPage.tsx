import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { PageIntro } from './layout';

export default function NotFoundPage({ title = 'Page not found.' }: { title?: string }) {
  return (
    <>
      <SEO title="Page not found — Ashish Sharma" description="The page you requested does not exist or may have moved." path="/404" noindex />
      <PageIntro title={title} lede="The page you asked for doesn't exist, or it has moved.">
        <p className="meta num">404</p>
      </PageIntro>
      <div className="btns" style={{ paddingBottom: 96 }}>
        <Link className="rv-btn rv-btn--primary" to="/">Go to the home page</Link>
        <Link className="rv-btn rv-btn--ghost" to="/blog">Read the writing</Link>
      </div>
    </>
  );
}
