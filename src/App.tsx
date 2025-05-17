import { useEffect, useState } from 'react'
import './App.css'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [theme, setTheme] = useState("dark")
  const [showPopup, setShowPopup] = useState(false)
  const [copied, setCopied] = useState(false)
  const email = "sarmaasis@gmail.com"

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored && stored !== theme) setTheme(stored)
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
          <div className="container">
            {/* <img src="./images/logo.svg" width="36" height="36" alt="Mighty Tools Logo" className="logo" loading="eager"/> */}
            <h1>
              <span className="title">Ashish Sharma</span>
              <span className="byline">@sarmaasis</span>
            </h1>
            <p className="header-desc">
              Building practical solutions that prioritize efficiency and simplicity.
            </p>
          </div>
        </header>
        <main className="container">
          <section className="companies">
            <h2>Companies I Have Worked With</h2>
            <div className="card-grid">
              <article className="card">
                {/* <img src="./images/logo-adobe.svg" width="24" height="24" alt="Adobe logo" className="card-icon"/> */}
                <h3><a href="https://www.whydonate.com">Whydonate.com</a></h3>
                <p>Full Stack Developer</p>
              </article>
              <article className="card">
                {/* <img src="./images/logo-grammarly.svg" width="24" height="24" alt="Grammarly logo" className="card-icon"/> */}
                <h3>Seezil Technology Pvt. Ltd.</h3>
                <p>Software Developer</p>
              </article>
              <article className="card">
                {/* <img src="./images/logo-grammarly.svg" width="24" height="24" alt="Grammarly logo" className="card-icon"/> */}
                <h3>Blue Bell</h3>
                <p>Software Developer</p>
              </article>
              <article className="card">
                {/* <img src="./images/logo-startups.svg" width="24" height="24" alt="Your Company" className="card-icon"> */}
                <h3><a href="#" onClick={handleEmailPopup} data-popup-title="Let's work together">Your Company</a><span className="cursor"></span></h3>
                <p>Looking for a full stack developer who ships? I blend empathy, design craft, and technical understanding to deliver user-centered solutions.</p>
              </article>
            </div>
          </section>
        </main>
        <footer className="footer">
        <div className="container">
          <div className="social-links">
            <a href="https://x.com/sarmaasis" target="_blank" aria-label="Follow me on X" className="social-link">X</a>
            <a href="https://www.linkedin.com/in/sarmaasis" target="_blank" aria-label="Connect with me on LinkedIn" className="social-link">LinkedIn</a>
            <a href="https://github.com/sarmaasis" target="_blank" aria-label="Check out my GitHub" className="social-link">GitHub</a>
            <a href="#" onClick={handleEmailPopup} data-popup-title="Get in touch" aria-label="Send me an email" className="social-link">Email</a>
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