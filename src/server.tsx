import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import manifest from '../dist/client/.vite/manifest.json';
import './index.css';
import App from './App';
import { getSEOHeadTags, resetSEOState } from './utils/seo-state';

export function render(url: string) {
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

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
 <head>
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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="llms-txt" href="/llms.txt" />
    <link rel="alternate" type="text/plain" href="/llm.txt" />
    ${seoHeadTags}
    ${cssLinks}
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/${clientEntry}"></script>
  </body>
</html>`;
}
