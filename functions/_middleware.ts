import { render } from '../dist/server/server.js'; // SSR render function

export const onRequest = async (context) => {

  const url = new URL(context.request.url);
  // Let static assets pass through
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/favicon') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico') ||
    url.pathname === '/robots.txt' ||  // Added: Allow robots.txt to be served as static
    url.pathname === '/sitemap.xml'    // Added: Allow sitemap.xml to be served as static
  ) {
    return context.next();
  }

  const html = await render();
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
};