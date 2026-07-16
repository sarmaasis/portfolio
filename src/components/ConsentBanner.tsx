import type { AnalyticsConsent } from '../utils/analytics';

type ConsentBannerProps = {
  consent: AnalyticsConsent | null;
  onConsentChange: (consent: AnalyticsConsent) => void;
};

export default function ConsentBanner({ consent, onConsentChange }: ConsentBannerProps) {
  if (consent !== null) {
    return null;
  }

  return (
    <section className="consent-banner" role="dialog" aria-labelledby="consent-title" aria-describedby="consent-copy">
      <div>
        <h2 id="consent-title">Optional analytics</h2>
        <p id="consent-copy">Analytics cookies stay off unless you allow them. They help me understand which pages are useful.</p>
      </div>
      <div className="consent-actions">
        <button type="button" className="consent-decline" onClick={() => onConsentChange('denied')}>
          Decline
        </button>
        <button type="button" className="consent-accept" onClick={() => onConsentChange('granted')}>
          Allow analytics
        </button>
      </div>
    </section>
  );
}
