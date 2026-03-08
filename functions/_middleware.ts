import { render } from '../dist/server/server.js'; // SSR render function

// @ts-ignore
export const onRequest = async (context: any) => {

  const url = new URL(context.request.url);
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

  // @ts-ignore
  const html = await render(url.pathname);
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
};