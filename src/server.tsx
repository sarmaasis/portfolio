import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import manifest from '../dist/client/.vite/manifest.json';
import './index.css';
import App from './App';

export function render(url: string) {
  const clientEntry = manifest['src/client.tsx'].file;
  const cssFiles = manifest['src/client.tsx'].css || [];
  const cssLinks = cssFiles.map(
    (href) => `<link rel="stylesheet" href="/${href}">`
  ).join('\n');

  const helmetContext: { helmet?: HelmetServerState } = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet;
  const title = helmet?.title?.toString() || '<title>Ashish Sharma | Senior Backend Engineer | Go, Node.js & Cloudflare Architecture</title>';
  const meta = helmet?.meta?.toString() || '';
  const documentLink = helmet?.link?.toString() || '';
  const script = helmet?.script?.toString() || '';

  return `<!DOCTYPE html>
<html lang="en">
 <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="llms-txt" href="/llm.txt" />
    <script>
      (function () {
        try {
          var storedTheme = localStorage.getItem('theme');
          var theme = storedTheme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
          document.documentElement.setAttribute('data-theme', theme);
        } catch (_) {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      })();
    </script>
    ${title}
    ${meta}
    ${documentLink}
    ${script}
    ${cssLinks}
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/${clientEntry}"></script>
  </body>
</html>`;
}
