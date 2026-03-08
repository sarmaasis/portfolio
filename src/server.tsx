import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import manifest from '../dist/client/.vite/manifest.json';
import App from './App';

export function render(url: string) {
  const clientEntry = manifest['src/client.tsx'].file;
  const cssFiles = manifest['src/client.tsx'].css || [];
  const cssLinks = cssFiles.map(
    (href) => `<link rel="stylesheet" href="/${href}">`
  ).join('\n');

  const helmetContext = {} as any;

  const appHtml = renderToString(
    // @ts-ignore: React 19 type mismatch
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet;
  const title = helmet?.title?.toString() || '<title>Ashish Sharma</title>';
  const meta = helmet?.meta?.toString() || '';
  const documentLink = helmet?.link?.toString() || '';
  const script = helmet?.script?.toString() || '';

  return `<!DOCTYPE html>
<html lang="en">
 <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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