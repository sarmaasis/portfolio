import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AboutPage from './components/AboutPage';
import BackendAnswersPage from './components/BackendAnswersPage';
import BlogIndexPage from './components/BlogIndexPage';
import BlogPostPage from './components/BlogPostPage';
import CaseStudyPage from './components/CaseStudyPage';
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

const navItems = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Work' },
  { href: '/#writing', label: 'Writing' },
  { href: '/#contact', label: 'Hire Me' },
];

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    const nextTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'dark';

    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

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
    </>
  );
}

export default App;
