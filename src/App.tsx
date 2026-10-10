import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AboutPage from './components/AboutPage';
import BackendAnswersPage from './components/BackendAnswersPage';
import BlogIndexPage from './components/BlogIndexPage';
import BlogPostPage from './components/BlogPostPage';
import CaseStudyPage from './components/CaseStudyPage';
import ConsentBanner from './components/ConsentBanner';
import ContactPage from './components/ContactPage';
import DevelopersPage from './components/DevelopersPage';
import DynamicServicePage from './components/DynamicServicePage';
import HiringLandingPage from './components/HiringLandingPage';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import PricingPage from './components/PricingPage';
import PrivacyPage from './components/PrivacyPage';
import ReviewsPage from './components/ReviewsPage';
import ServicesPage from './components/ServicesPage';
import WorkPage from './components/WorkPage';
import { SiteFooter, SiteHeader } from './components/layout';
import { primaryLandingPages } from './data/site';
import {
  ANALYTICS_CONSENT_KEY,
  clearAnalyticsCookies,
  getSavedAnalyticsConsent,
  trackEvent,
  trackPageView,
  type AnalyticsConsent,
  updateAnalyticsConsent,
} from './utils/analytics';

function App() {
  const location = useLocation();
  const [analyticsConsent, setAnalyticsConsent] = useState<AnalyticsConsent | null | undefined>(undefined);
  const lastTrackedRoute = useRef(`${location.pathname}${location.search}`);

  useEffect(() => {
    const savedConsent = getSavedAnalyticsConsent();
    setAnalyticsConsent(savedConsent);

    if (savedConsent !== null) {
      updateAnalyticsConsent(savedConsent);
    }
  }, []);

  useEffect(() => {
    const route = `${location.pathname}${location.search}`;
    if (analyticsConsent !== 'granted') {
      lastTrackedRoute.current = route;
      return;
    }

    if (lastTrackedRoute.current === route) {
      return;
    }

    trackPageView(location.pathname, location.search);
    lastTrackedRoute.current = route;
  }, [analyticsConsent, location.pathname, location.search]);

  // Client-side navigation keeps the scroll position by default: go to the
  // linked anchor if there is one, otherwise to the top of the new page.
  useEffect(() => {
    if (location.hash) {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const element = event.target.closest<HTMLElement>('[data-analytics-event], a');
      if (element === null) {
        return;
      }

      const eventName = element.dataset.analyticsEvent;
      if (eventName) {
        trackEvent(eventName, { placement: element.dataset.analyticsPlacement ?? 'unspecified' });
        return;
      }

      if (!(element instanceof HTMLAnchorElement)) {
        return;
      }

      const destination = new URL(element.href, window.location.origin);
      if (destination.origin === window.location.origin && destination.pathname === '/contact') {
        trackEvent('contact_page_open');
      }

      if (destination.protocol === 'mailto:') {
        trackEvent('contact_email_click');
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const handleConsentChange = (consent: AnalyticsConsent) => {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
    updateAnalyticsConsent(consent);

    if (consent === 'denied') {
      clearAnalyticsCookies();
    }

    setAnalyticsConsent(consent);
  };

  const reopenConsentChoice = () => {
    window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
    updateAnalyticsConsent('denied');
    clearAnalyticsCookies();
    setAnalyticsConsent(null);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="wrap">
        <SiteHeader />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/en-us" element={<HomePage />} />
            <Route path="/en-eu" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/backend-engineering-answers" element={<BackendAnswersPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<DynamicServicePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            {primaryLandingPages.map((page) => (
              <Route key={page.slug} path={`/${page.slug}`} element={<HiringLandingPage page={page} />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <SiteFooter onCookieSettings={reopenConsentChoice} />
      </div>
      {analyticsConsent === null ? <ConsentBanner onConsentChange={handleConsentChange} /> : null}
    </>
  );
}

export default App;
