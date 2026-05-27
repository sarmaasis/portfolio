import { render } from '../dist/server/server.js'; // SSR render function

interface CloudflareContext {
  request: Request;
  next: () => Promise<Response>;
}

export const onRequest = async (context: CloudflareContext) => {

  const url = new URL(context.request.url);
  // Serve llm.txt directly with explicit content-type
  if (url.pathname === '/llm.txt') {
    return context.next();
  }

  // Let static assets pass through
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/favicon') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.txt') ||
    url.pathname.endsWith('.xml')
  ) {
    return context.next();
  }

  const html = await render(url.pathname);
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
};