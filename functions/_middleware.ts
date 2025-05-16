import { render } from '../dist/server/server.js'; // SSR render function

export const onRequest = async (context) => {
  
  const url = new URL(context.request.url);
  // If the request is for an asset, let Cloudflare serve it
  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/favicon') || url.pathname.endsWith('.css')) {
    return context.next();
  }

  const html = await render();
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
};
