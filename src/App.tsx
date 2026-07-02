import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import AboutPage from './components/AboutPage';
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
import { CALENDLY_URL, EMAIL, OFFER, POSITIONING, landingPages } from './data/site';

const navItems = [
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/blog', label: 'Blog' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';

  const storedTheme = window.localStorage.getItem('theme');
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const emailHref = `mailto:${EMAIL}?subject=Backend%20engineering%20project`;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));

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
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <ThemeToggle onToggle={toggleTheme} theme={theme} />
          </div>
        </header>

        <main id="main-content" className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/en-us" element={<HomePage />} />
            <Route path="/en-eu" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<DynamicServicePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            {landingPages.map((page) => (
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
                  <a href={emailHref}>Email Ashish</a>
                </li>
                <li>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Book architecture audit
                  </a>
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
              </ul>
            </div>
          </div>
          <div className="container footer-bottom">
            <p>&copy; {new Date().getFullYear()} Ashish Sharma. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
