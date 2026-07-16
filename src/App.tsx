import { useEffect, useRef, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import AboutPage from './components/AboutPage';
import BackendAnswersPage from './components/BackendAnswersPage';
import BlogIndexPage from './components/BlogIndexPage';
import BlogPostPage from './components/BlogPostPage';
import CaseStudyPage from './components/CaseStudyPage';
import ConsentBanner from './components/ConsentBanner';
import ContactPage from './components/ContactPage';
import DynamicServicePage from './components/DynamicServicePage';
import HiringLandingPage from './components/HiringLandingPage';
import HomePage from './components/HomePage';
import PricingPage from './components/PricingPage';
import ReviewsPage from './components/ReviewsPage';
import ServicesPage from './components/ServicesPage';
import ThemeToggle from './components/ThemeToggle';
import WorkPage from './components/WorkPage';
import { COPYRIGHT_YEAR, OFFER, POSITIONING, UPWORK_URL, primaryLandingPages } from './data/site';
import {
  ANALYTICS_CONSENT_KEY,
  clearAnalyticsCookies,
  getSavedAnalyticsConsent,
  trackEvent,
  trackPageView,
  type AnalyticsConsent,
  updateAnalyticsConsent,
} from './utils/analytics';

const navItems = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Work' },
  { href: '/#writing', label: 'Writing' },
  { href: '/#contact', label: 'Hire Me' },
];

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [analyticsConsent, setAnalyticsConsent] = useState<AnalyticsConsent | null>(null);
  const lastTrackedRoute = useRef(`${location.pathname}${location.search}`);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    const nextTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'dark';

    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

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
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="page-wrapper">
        <header className="site-header">
          <div className="container header-container">
            <div className="header-brand">
              <Link to="/" className="brand-name">
                Ashish Sharma
              </Link>
              <p>{POSITIONING}</p>
            </div>
            <nav className="header-nav" aria-label="Primary navigation">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
            </nav>
            <ThemeToggle
              theme={theme}
              onToggle={() => setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))}
            />
          </div>
        </header>

        <main id="main-content" className="container">
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
            <Route path="/reviews" element={<ReviewsPage />} />
            {primaryLandingPages.map((page) => (
              <Route key={page.slug} path={`/${page.slug}`} element={<HiringLandingPage page={page} />} />
            ))}
          </Routes>
        </main>

        <footer className="site-footer">
          <div className="container footer-grid">
            <div>
              <h2>Ashish Sharma</h2>
              <p>{OFFER}</p>
              <p className="small-text">Available for remote US, EU, and UK contracts.</p>
              <button type="button" className="privacy-settings" onClick={reopenConsentChoice}>
                Cookie settings
              </button>
            </div>
            <div>
              <h2>Contact</h2>
              <ul className="link-list">
                <li>
                  <Link to="/contact">Start a project</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2>Profiles</h2>
              <ul className="link-list">
                <li>
                  <a href="https://www.linkedin.com/in/sarmaasis" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/sarmaasis" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://x.com/sarmaasis" target="_blank" rel="noopener noreferrer">
                    X
                  </a>
                </li>
                <li>
                  <a href={UPWORK_URL} target="_blank" rel="noopener noreferrer">
                    Upwork
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="container footer-bottom">
            <p>&copy; {COPYRIGHT_YEAR} Ashish Sharma. All rights reserved.</p>
          </div>
        </footer>
      </div>
      <ConsentBanner consent={analyticsConsent} onConsentChange={handleConsentChange} />
    </>
  );
}

export default App;
