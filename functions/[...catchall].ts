import { PagesFunction, Response as WorkerResponse } from '@cloudflare/workers-types';
import { render } from '../dist/server/server.js'; // SSR render function

export const onRequest: PagesFunction = async (context) => {
  const html = await render();
  return new WorkerResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
};
