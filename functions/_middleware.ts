import { render } from '../dist/server/server.js'; // SSR render function

export const onRequest = async (context) => {
  const html = await render();
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
};
