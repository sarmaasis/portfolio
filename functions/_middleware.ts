import { render } from '../dist/server/server.js'; // SSR render function
import { acceptsMarkdown, handleDiscoveryApi, handleMcp, markdownResponse } from './agent-contract';

interface CloudflareContext {
  request: Request;
  next: () => Promise<Response>;
}

export const onRequest = async (context: CloudflareContext) => {

  const url = new URL(context.request.url);
  if (url.pathname.startsWith('/api/')) {
    return handleDiscoveryApi(context.request);
  }

  if (url.pathname === '/.well-known/mcp') {
    return handleMcp(context.request);
  }

  if (context.request.method === 'GET' && acceptsMarkdown(context.request)) {
    return markdownResponse();
  }

  // Serve machine-readable files directly with their static content types.
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
    url.pathname.endsWith('.xml') ||
    url.pathname.endsWith('.json') ||
    url.pathname.endsWith('.md')
  ) {
    return context.next();
  }

  const html = await render(url.pathname);
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
    },
  });
};
