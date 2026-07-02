import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'

const AppHelmetProvider = HelmetProvider as React.ElementType

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppHelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppHelmetProvider>
  </StrictMode>,
)
