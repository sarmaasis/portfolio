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
<html lang="en">
 <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
