import { SEO } from './SEO';

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy | Ashish Sharma Backend Engineering"
        description="Privacy information for visitors to sarmaasis.com and people who contact Ashish Sharma Backend Engineering."
        path="/privacy"
      />

      <section className="page-hero">
        <p className="eyebrow">Privacy</p>
        <h1>Privacy information for sarmaasis.com visitors.</h1>
        <p>This page explains what information is used when you visit this portfolio or choose to get in touch.</p>
      </section>

      <section className="content-grid">
        <article>
          <h2>Website analytics and cookies</h2>
          <p>
            This site asks before enabling analytics cookies. If you decline, analytics remain disabled and any analytics
            cookies set by the site are cleared. If you allow analytics, aggregated usage information may be used to
            understand which pages are useful and to improve the site. You can reopen the cookie choice from the site
            footer at any time. The site is not designed to collect sensitive personal information through the browser.
          </p>
          <h2>Project enquiries</h2>
          <p>
            When you email or schedule a call, the information you choose to provide—such as your name, company,
            project requirements, technical context, and contact details—is used to reply to your enquiry, assess fit,
            prepare a proposal, and deliver any agreed work. Please do not send passwords, access tokens, health data,
            payment-card details, or other sensitive information by email unless a secure process has been agreed.
          </p>
        </article>
        <aside className="panel">
          <h2>Sharing and contact</h2>
          <p>
            Personal information is not sold. It may be processed by the services needed to run email, scheduling,
            hosting, analytics (when consented to), and contracted project work. Information is retained only as long as
            reasonably needed for the enquiry, relationship, legal obligations, or record keeping.
          </p>
          <p>
            For a privacy question or request about information you have provided, email{' '}
            <a href="mailto:sarmaasis@gmail.com">sarmaasis@gmail.com</a>.
          </p>
        </aside>
      </section>
    </>
  );
}
