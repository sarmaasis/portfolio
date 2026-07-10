import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import manifest from '../dist/client/.vite/manifest.json';
import './index.css';
import App from './App';

function extractHeadTags(html: string) {
  const titleMatch = html.match(/<title[^>]*>[\s\S]*?<\/title>/);
  const metaMatches = html.match(/<meta[^>]*>/g) || [];
  const linkMatches = html.match(/<link[^>]+rel="canonical"[^>]*>/g) || [];
  const scriptMatches = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g) || [];
  const headTags = [titleMatch?.[0], ...metaMatches, ...linkMatches, ...scriptMatches].filter(Boolean);

  return {
    title: titleMatch?.[0] || '',
    meta: metaMatches.join('\n'),
    links: linkMatches.join('\n'),
    scripts: scriptMatches.join('\n'),
    bodyHtml: headTags.reduce((body, tag) => body.replace(tag, ''), html),
  };
}

export function render(url: string) {
  const clientEntry = manifest['src/client.tsx'].file;
  const cssFiles = manifest['src/client.tsx'].css || [];
  const cssLinks = cssFiles.map(
    (href) => `<link rel="stylesheet" href="/${href}">`
  ).join('\n');

  const helmetContext: { helmet?: HelmetServerState } = {};

  const renderedAppHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  const extractedHead = extractHeadTags(renderedAppHtml);
  const appHtml = extractedHead.bodyHtml;

  const helmet = helmetContext.helmet;
  const title =
    helmet?.title?.toString() ||
    extractedHead.title ||
    '<title>Ashish Sharma - Cloudflare Workers and AWS Backend Engineer</title>';
  const helmetMeta = helmet?.meta?.toString() || extractedHead.meta;
  const meta = helmetMeta.includes('name="description"')
    ? helmetMeta
    : `${helmetMeta}
    <meta name="description" content="Ashish Sharma is a senior backend engineer for Cloudflare Workers, AWS, Node.js/TypeScript, Python APIs, backend architecture, search migration, and cloud cost optimization." />`;
  const documentLink = helmet?.link?.toString() || extractedHead.links;
  const script = helmet?.script?.toString() || extractedHead.scripts;

  return `<!DOCTYPE html>
<html lang="en">
 <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="llms-txt" href="/llms.txt" />
    <link rel="alternate" type="text/plain" href="/llm.txt" />
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
