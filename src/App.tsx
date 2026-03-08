import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import ThemeToggle from './components/ThemeToggle'
import HomePage from './components/HomePage'
import ReviewsPage from './components/ReviewsPage'
import ServicesPage from './components/ServicesPage'
import PricingPage from './components/PricingPage'
import AboutPage from './components/AboutPage'
import DynamicServicePage from './components/DynamicServicePage'

function App() {
  const [theme, setTheme] = useState("dark")
  const [showPopup, setShowPopup] = useState(false)
  const [copied, setCopied] = useState(false)
  const email = "sarmaasis@gmail.com"

  // Force dark theme based on the request to make it kopakov.com inspired premium feeling
  useEffect(() => {
    setTheme("dark")
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const handleEmailPopup = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowPopup(true)
    setCopied(false)
  }

  const closePopup = () => setShowPopup(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <>
      <ThemeToggle onToggle={toggleTheme} theme={theme} />
      <div className="page-wrapper">
        <header className="header">
          <div className="container header-container">
            <div className="header-brand">
              <h1 style={{ margin: 0 }}>
                <Link to="/" className="title">Ashish Sharma</Link>
              </h1>
              <p className="header-desc" style={{ margin: 0, fontSize: '0.85rem' }}>
                Senior Full-Stack &amp; Infrastructure Engineer.
              </p>
            </div>
            <nav className="header-nav">
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/services" className="nav-link">Services</Link>
              <Link to="/pricing" className="nav-link">Pricing</Link>
              <Link to="/reviews" className="nav-link">Recommendations</Link>
            </nav>
          </div>
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage region="global" handleEmailPopup={handleEmailPopup} />} />
            <Route path="/en-us" element={<HomePage region="us" handleEmailPopup={handleEmailPopup} />} />
            <Route path="/en-eu" element={<HomePage region="eu" handleEmailPopup={handleEmailPopup} />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<DynamicServicePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-col">
                <h3>Ashish Sharma</h3>
                <p>Senior Full Stack Engineer. Specializing in Python, Node.js, and high-volume edge systems.</p>
                <div className="status-indicator">
                  <span className="dot pulse"></span>
                  <span>Available for freelance opportunities.</span>
                </div>
              </div>
              <div className="footer-col">
                <h3>Connect</h3>
                <ul className="footer-links">
                  <li><a href="https://x.com/sarmaasis" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
                  <li><a href="https://www.linkedin.com/in/sarmaasis" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                  <li><a href="https://github.com/sarmaasis" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                  <li><a href="https://www.upwork.com/freelancers/sarmaasis" target="_blank" rel="noopener noreferrer">Upwork</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h3>Contact</h3>
                <ul className="footer-links">
                  <li><a href="#" onClick={handleEmailPopup} data-popup-title="Get in touch" aria-label="Send me an email">Email Me</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} Ashish Sharma. All rights reserved.</p>
            </div>
          </div>
        </footer>
        {showPopup && (
          <div className="popup-wraper">
            <div className="popup-overlay" onClick={closePopup}>
              <div className="popup" onClick={e => e.stopPropagation()}>
                <h3>Let's work together</h3>
                <p>
                  {email}
                </p>
                <button onClick={handleCopy}>{copied ? "Copied" : "Copy"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App