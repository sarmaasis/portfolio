import { Link } from 'react-router-dom';
import type { AnalyticsConsent } from '../utils/analytics';

type ConsentBannerProps = {
  onConsentChange: (consent: AnalyticsConsent) => void;
};

export default function ConsentBanner({ onConsentChange }: ConsentBannerProps) {
  return (
    <section className="consent" role="dialog" aria-labelledby="consent-title" aria-describedby="consent-copy">
      <h2 id="consent-title">Optional analytics</h2>
      <p id="consent-copy">
        Analytics cookies stay off unless you allow them. They help me see which pages are useful. <Link className="ln" to="/privacy">Privacy</Link>
      </p>
      <div className="btns">
        <button type="button" className="rv-btn rv-btn--sm" onClick={() => onConsentChange('denied')}>Decline</button>
        <button type="button" className="rv-btn rv-btn--primary rv-btn--sm" onClick={() => onConsentChange('granted')}>Allow analytics</button>
      </div>
    </section>
  );
}
