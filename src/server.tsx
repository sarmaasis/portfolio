import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import manifest from '../dist/client/.vite/manifest.json';
import './index.css';
import App from './App';
import { getRenderStatus, getSEOHeadTags, resetSEOState } from './utils/seo-state';

/* Sets the theme class before first paint: the saved choice, else the OS
   preference. Keep in sync with index.html and ThemeToggle.applyTheme. */
export const THEME_SCRIPT = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.classList.add('t-'+t);d.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==='dark'?'#000000':'#fcfaf7'})();`;

export function renderPage(url: string) {
  const clientEntry = manifest['src/client.tsx'].file;
  const cssFiles = manifest['src/client.tsx'].css || [];
  const cssLinks = cssFiles.map(
    (href) => `<link rel="stylesheet" href="/${href}">`
  ).join('\n');

  resetSEOState();
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  const seoHeadTags = getSEOHeadTags();
  const status = getRenderStatus();

  const html = `<!DOCTYPE html>
<html lang="en">
 <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
    <meta name="theme-color" content="#fcfaf7" />
    <script>${THEME_SCRIPT}</script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-E2R2ZM1SDT"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        wait_for_update: 500
      });
      gtag('js', new Date());
      gtag('config', 'G-E2R2ZM1SDT');
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" />
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/favicon-192.png" />
    <link rel="llms-txt" href="/llms.txt" />
    <link rel="alternate" type="text/markdown" href="/index.md" />
    <link rel="service-desc" type="application/vnd.oai.openapi+json;version=3.1" href="/openapi.json" />
    <link rel="agent-skills" type="application/json" href="/.well-known/agent-skills/index.json" />
    <link rel="ard" type="application/json" href="/.well-known/ard.json" />
    ${seoHeadTags}
    ${cssLinks}
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/${clientEntry}"></script>
  </body>
</html>`;

  return { html, status };
}

export function render(url: string) {
  return renderPage(url).html;
}
