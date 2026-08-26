import { render } from '../dist/server/server.js'; // SSR render function
import {
  acceptsMarkdown,
  agentModeResponse,
  apiCatalogResponse,
  handleDiscoveryApi,
  handleMcp,
  isAgentUserAgent,
  isKnownPublicRoute,
  markdownFallbackResponse,
  markdownResponse,
} from './agent-contract';

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

  if (url.pathname === '/.well-known/api-catalog') {
    return apiCatalogResponse();
  }

  if (url.pathname === '/' && url.searchParams.get('mode') === 'agent') {
    return agentModeResponse();
  }

  const isHtmlPageRequest = !url.pathname.includes('.') && !url.pathname.startsWith('/api/');
  if (context.request.method === 'GET' && isHtmlPageRequest && !isKnownPublicRoute(url.pathname)) {
    return markdownFallbackResponse(url.pathname, 404);
  }
  if (context.request.method === 'GET' && isHtmlPageRequest && (acceptsMarkdown(context.request) || isAgentUserAgent(context.request))) {
    return markdownResponse();
  }

  if (context.request.method === 'GET' && url.pathname.endsWith('.md') && !['/index.md', '/agents.md', '/pricing.md'].includes(url.pathname)) {
    return markdownFallbackResponse(url.pathname);
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
    status: isKnownPublicRoute(url.pathname) ? 200 : 404,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
      'Link': '</sitemap.xml>; rel="sitemap", </index.md>; rel="alternate"; type="text/markdown", </openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json;version=3.1", </.well-known/api-catalog>; rel="service-desc"; type="application/linkset+json"; profile="https://www.rfc-editor.org/info/rfc9727", </.well-known/agent-skills/index.json>; rel="agent-skills"; type="application/json"',
    },
  });
};
