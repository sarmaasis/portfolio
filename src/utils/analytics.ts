export const GA_MEASUREMENT_ID = 'G-E2R2ZM1SDT';
export const ANALYTICS_CONSENT_KEY = 'analytics-consent';

export type AnalyticsConsent = 'granted' | 'denied';

type AnalyticsEventParameters = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function canTrack() {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

export function getSavedAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const savedConsent = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return savedConsent === 'granted' || savedConsent === 'denied' ? savedConsent : null;
}

export function updateAnalyticsConsent(consent: AnalyticsConsent) {
  if (!canTrack()) {
    return;
  }

  window.gtag?.('consent', 'update', {
    analytics_storage: consent,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

export function clearAnalyticsCookies() {
  if (typeof document === 'undefined') {
    return;
  }

  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));

  for (const name of cookieNames) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  }
}

export function trackPageView(pathname: string, search: string) {
  if (!canTrack() || getSavedAnalyticsConsent() !== 'granted') {
    return;
  }

  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_path: `${pathname}${search}`,
    page_title: document.title,
  });
}

export function trackEvent(eventName: string, parameters: AnalyticsEventParameters = {}) {
  if (!canTrack() || getSavedAnalyticsConsent() !== 'granted') {
    return;
  }

  window.gtag?.('event', eventName, {
    page_path: window.location.pathname,
    ...parameters,
  });
}
