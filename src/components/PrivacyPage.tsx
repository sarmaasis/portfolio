import { SEO } from './SEO';
import { PageIntro, Row } from './layout';
import { EMAIL } from '../data/site';

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy — Ashish Sharma"
        description="Privacy information for visitors to sarmaasis.com and people who contact Ashish Sharma Backend Engineering."
        path="/privacy"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Privacy', path: '/privacy' }]}
      />

      <PageIntro
        title="Privacy"
        lede="What information is used when you visit this site or choose to get in touch."
      />

      <Row id="analytics" label="Analytics and cookies">
        <p style={{ maxWidth: '66ch' }}>
          This site asks before enabling analytics cookies. If you decline, analytics remain disabled and any analytics cookies
          set by the site are cleared. If you allow analytics, aggregated usage information may be used to understand which
          pages are useful and to improve the site. You can reopen the cookie choice from the site footer at any time. Your
          light or dark theme choice is stored in your browser only. The site is not designed to collect sensitive personal
          information through the browser.
        </p>
      </Row>

      <Row id="enquiries" label="Project enquiries">
        <p style={{ maxWidth: '66ch' }}>
          When you email or schedule a call, the information you choose to provide, such as your name, company, project
          requirements, technical context and contact details, is used to reply, assess fit, prepare a proposal and deliver
          any agreed work. The contact form doesn't send anything itself: it opens your own email app with your brief filled in.
          Please don't send passwords, access tokens, health data, payment-card details or other sensitive information by
          email unless a secure process has been agreed.
        </p>
      </Row>

      <Row id="sharing" label="Sharing and contact">
        <div className="stack" style={{ maxWidth: '66ch', paddingBottom: 32 }}>
          <p>
            Personal information is not sold. It may be processed by the services needed to run email, scheduling, hosting,
            analytics (when consented to) and contracted project work. Information is kept only as long as reasonably needed
            for the enquiry, the relationship, legal obligations or record keeping.
          </p>
          <p>For a privacy question or request, email <a className="ln" href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        </div>
      </Row>
    </>
  );
}
