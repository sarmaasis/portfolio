import { useEffect, useState } from 'react'
import './App.css'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [theme, setTheme] = useState("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored) setTheme(stored)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  if (!mounted) {
    // Prevent hydration mismatch by not rendering until client-side
    return null
  }

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