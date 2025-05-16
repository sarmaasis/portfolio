import { useEffect, useState } from 'react'
import './App.css'
import ThemeToggle from './components/ThemeToggle'

function App() {
  // Always start with "dark" for SSR and initial client render
  const [theme, setTheme] = useState("dark")

  // On mount (client), update theme from localStorage if available
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored && stored !== theme) setTheme(stored)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return (
    <div className="app-container">
      <ThemeToggle onToggle={toggleTheme} theme={theme} />
      <h1>Ashish Sharma</h1>
      <main className="main-content">
        <section className="hero">
          <h2>Software Enginner</h2>
          <p>Welcome to my portfolio. I create modern web applications.</p>
        </section>
        <section className="projects">
          <h3>Projects</h3>
        </section>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Ashish Sharma</p>
      </footer>
    </div>
  )
}

export default App