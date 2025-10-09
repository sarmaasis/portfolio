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
    url.pathname === '/sitemap.xml'    // Keep: Allow sitemap.xml to be served as static (working)
  ) {
    return context.next();
  }

  // Directly serve robots.txt content
  if (url.pathname === '/robots.txt') {
    return new Response(`User-agent: *\nAllow: /\nSitemap: https://ashishsharma.xyz/sitemap.xml`, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  const html = await render();
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
};