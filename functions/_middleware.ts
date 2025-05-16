import { render } from '../dist/server/server.js'; // SSR render function

export const onRequest = async (context, next) => {

  const url = new URL(context.request.url);
  // Let static assets pass through
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/favicon') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico')
  ) {
    return next();
  }

  const html = await render();
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
};
