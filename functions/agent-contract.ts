export const SITE_URL = 'https://sarmaasis.com';

const rateLimitHeaders = {
  'RateLimit-Limit': '60',
  'RateLimit-Remaining': '59',
  'RateLimit-Reset': '60',
  'Cache-Control': 'no-store',
};

const profile = {
  name: 'Ashish Sharma',
  website: SITE_URL,
  role: 'Full-stack backend developer',
  specialties: ['Cloudflare Workers', 'AWS', 'Node.js/TypeScript', 'Python APIs', 'Next.js', 'backend architecture'],
  contact: {
    email: 'sarmaasis@gmail.com',
    bookingUrl: 'https://cal.com/sarmaasis',
  },
};

const services = [
  {
    id: 'cloudflare-workers-backends',
    name: 'Cloudflare Workers Backends',
    description: 'Edge APIs, webhooks, proxies, auth checks, cacheable reads, and focused request handling.',
  },
  {
    id: 'aws-cost-architecture-review',
    name: 'AWS Cost & Architecture Review',
    description: 'A practical review of cloud cost, request paths, Lambda, databases, logs, and infrastructure drift.',
  },
  {
    id: 'full-stack-application-backends',
    name: 'Full-Stack Application Backends',
    description: 'Product delivery across frontend, API, authentication, databases, search, queues, and deployment.',
  },
  {
    id: 'cloudflare-aws-migration-planning',
    name: 'Cloudflare + AWS Migration Planning',
    description: 'Incremental migration planning with workload-fit decisions and rollback paths.',
  },
  {
    id: 'architecture-audits',
    name: 'Architecture Audits',
    description: 'A focused assessment of performance, service boundaries, deployment habits, and cloud cost.',
  },
];

const availability = {
  acceptingNewProjects: true,
  engagementTypes: ['14-day MVP build', 'architecture audit', 'fixed-scope implementation sprint', 'fractional backend support'],
  regions: ['Remote', 'United States', 'European Union', 'United Kingdom'],
  currencies: ['USD', 'EUR', 'GBP'],
  nextStep: {
    type: 'email_or_booking',
    email: 'sarmaasis@gmail.com',
    bookingUrl: 'https://cal.com/sarmaasis',
  },
};

export type ApiErrorCode = 'METHOD_NOT_ALLOWED' | 'NOT_FOUND' | 'INVALID_REQUEST' | 'TOOL_NOT_FOUND';

export function jsonResponse(body: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...rateLimitHeaders,
      ...extraHeaders,
    },
  });
}

export function apiError(
  code: ApiErrorCode,
  message: string,
  resolution: string,
  status: number,
  extraHeaders: Record<string, string> = {},
) {
  return jsonResponse({ error: { code, message, resolution } }, status, extraHeaders);
}

export function handleDiscoveryApi(request: Request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        ...rateLimitHeaders,
        Allow: 'GET, OPTIONS',
      },
    });
  }

  if (request.method !== 'GET') {
    return apiError('METHOD_NOT_ALLOWED', 'This endpoint is read-only.', 'Use GET, or see /developers for the API reference.', 405, {
      Allow: 'GET, OPTIONS',
    });
  }

  const url = new URL(request.url);
  const path = url.pathname;
  if (path === '/api/v1/services') {
    const limitValue = url.searchParams.get('limit') ?? '20';
    const cursorValue = url.searchParams.get('cursor') ?? '0';
    const limit = Number(limitValue);
    const cursor = Number(cursorValue);
    if (!Number.isInteger(limit) || limit < 1 || limit > 100 || !Number.isInteger(cursor) || cursor < 0) {
      return apiError(
        'INVALID_REQUEST',
        'The limit must be an integer from 1 to 100 and cursor must be a non-negative integer.',
        'Use /api/v1/services?limit=20&cursor=0, or omit both parameters.',
        400,
      );
    }
    const page = services.slice(cursor, cursor + limit);
    const nextCursor = cursor + page.length < services.length ? String(cursor + page.length) : null;
    return jsonResponse({ data: page, pagination: { limit, cursor: String(cursor), nextCursor } });
  }
  const resources: Record<string, unknown> = {
    '/api/v1/profile': { data: profile },
    '/api/v1/availability': { data: availability },
  };
  const body = resources[path];

  if (!body) {
    return apiError(
      'NOT_FOUND',
      `No discovery resource exists at ${path}.`,
      'Use /api/v1/profile, /api/v1/services, or /api/v1/availability. The full contract is at /openapi.json.',
      404,
    );
  }

  return jsonResponse(body);
}

export function acceptsMarkdown(request: Request) {
  return request.headers.get('Accept')?.toLowerCase().split(',').some((value) => value.trim().startsWith('text/markdown')) ?? false;
}

export const agentMarkdown = `---
title: Ashish Sharma - 14-day full-stack MVP for $4,500
description: Hire Ashish Sharma for Cloudflare Workers and backend work. 14-day MVP $4,500. Architecture audit $5,000. Minimum project $4,500.
canonical: https://sarmaasis.com/
last-updated: 2026-09-05
---

# Ashish Sharma - Cloudflare Workers and backend architecture

Ashish Sharma is a full-stack backend developer for startups and agencies. Public offers:
- 14-day full-stack MVP: $4,500 flat. https://sarmaasis.com/
- Technical architecture audit: $5,000, five business days. https://sarmaasis.com/services/architecture-audit
- AWS Lambda to Cloudflare Workers migration: audit first, implementation from $4,500. https://sarmaasis.com/services/aws-lambda-to-cloudflare-workers
- Hire Cloudflare Workers developer: https://sarmaasis.com/hire-cloudflare-workers-developer

Minimum project size is $4,500. Not a fit for CDN, WAF, WordPress, staffing, or single Worker scripts.

Proof: Whydonate at 4M+ API requests/day on Cloudflare Workers, TypeScript, Pages, R2, Queues, PlanetScale, and Typesense. Also aa.health, Hudpro, and Wakamiapp.

## When to use this site

Use Ashish Sharma for a focused MVP, architecture audit, Cloudflare Workers implementation, Lambda to Workers migration, API work, cloud cost review, or fractional ownership.

## Public discovery API

No API key required. Start with https://sarmaasis.com/openapi.json or https://sarmaasis.com/developers. MCP: https://sarmaasis.com/.well-known/mcp. llms.txt: https://sarmaasis.com/llms.txt.

## Contact

Email: sarmaasis@gmail.com
Book a call: https://cal.com/sarmaasis
Pricing: https://sarmaasis.com/pricing
`;

export const apiCatalog = {
  linkset: [
    {
      anchor: `${SITE_URL}/.well-known/api-catalog`,
      item: [
        {
          href: `${SITE_URL}/developers`,
          type: 'text/html',
          title: 'Ashish Sharma Developer Portal',
        },
      ],
    },
    {
      anchor: `${SITE_URL}/developers`,
      'service-desc': [
        {
          href: `${SITE_URL}/openapi.json`,
          type: 'application/vnd.oai.openapi+json;version=3.1',
          title: 'Ashish Sharma Discovery API OpenAPI specification',
        },
      ],
      'service-doc': [
        {
          href: `${SITE_URL}/developers`,
          type: 'text/html',
          title: 'Ashish Sharma Developer Portal',
        },
      ],
      'service-meta': [
        {
          href: `${SITE_URL}/.well-known/agent-skills/index.json`,
          type: 'application/json',
          title: 'Ashish Sharma Agent Skills index',
        },
      ],
    },
  ],
};

const agentUserAgents = [
  'gptbot', 'chatgpt-user', 'oai-searchbot', 'claudebot', 'claude-searchbot',
  'claude-user', 'perplexitybot', 'google-extended', 'applebot-extended',
  'deepseekbot', 'ora-agent',
];

export function isAgentUserAgent(request: Request) {
  const userAgent = request.headers.get('User-Agent')?.toLowerCase() ?? '';
  return agentUserAgents.some((agent) => userAgent.includes(agent));
}

const knownPublicRoutes = new Set([
  '/', '/en-us', '/en-eu', '/about', '/backend-engineering-answers', '/services', '/pricing',
  '/work', '/blog', '/contact', '/developers', '/privacy', '/reviews',
  '/hire-cloudflare-workers-developer', '/cloudflare-workers-backend-freelancer',
  '/python-fastapi-backend-freelancer', '/nodejs-typescript-backend-engineer',
  '/rag-backend-engineer',
]);

export function isKnownPublicRoute(pathname: string) {
  return knownPublicRoutes.has(pathname)
    || pathname.startsWith('/services/')
    || pathname.startsWith('/work/')
    || pathname.startsWith('/blog/');
}

export function markdownResponse() {
  return new Response(agentMarkdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
    },
  });
}

export function markdownFallbackResponse(pathname: string, status = 200) {
  const canonicalPath = pathname.replace(/\.md$/, '') || '/';
  const canonical = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;
  const content = status === 404
    ? agentMarkdown
      .replace('title: Ashish Sharma - 14-day full-stack MVP for $4,500', 'title: Page not found')
      .replace('description: Hire Ashish Sharma for Cloudflare Workers and backend work. 14-day MVP $4,500. Architecture audit $5,000. Minimum project $4,500.', 'description: This Sarmaasis URL does not exist.')
      .replace('canonical: https://sarmaasis.com/', `canonical: ${canonical}`)
      .replace('# Ashish Sharma - Cloudflare Workers and backend architecture', '# Page not found')
    : agentMarkdown.replace('canonical: https://sarmaasis.com/', `canonical: ${canonical}`);
  return new Response(content, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
      'Link': `<${canonicalPath}>; rel="canonical"`,
    },
  });
}

export function agentModeResponse() {
  return new Response(agentMarkdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
      'Link': '</sitemap.xml>; rel="sitemap", </index.md>; rel="alternate"; type="text/markdown", </openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json;version=3.1", </.well-known/api-catalog>; rel="service-desc"; type="application/linkset+json"; profile="https://www.rfc-editor.org/info/rfc9727"',
    },
  });
}

export function apiCatalogResponse() {
  return new Response(JSON.stringify(apiCatalog), {
    headers: {
      'Content-Type': 'application/linkset+json;profile="https://www.rfc-editor.org/info/rfc9727"',
      'Cache-Control': 'public, max-age=300',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

const tools = [
  {
    name: 'get_profile',
    description: 'Get Ashish Sharma’s public profile, specialties, and contact details.',
    inputSchema: { type: 'object', additionalProperties: false, properties: {} },
  },
  {
    name: 'list_services',
    description: 'List public backend engineering services and concise descriptions.',
    inputSchema: { type: 'object', additionalProperties: false, properties: {} },
  },
  {
    name: 'get_availability',
    description: 'Get current engagement types, regions, currencies, and next contact step.',
    inputSchema: { type: 'object', additionalProperties: false, properties: {} },
  },
];

const resources = [
  {
    uri: `${SITE_URL}/openapi.json`,
    name: 'Discovery API OpenAPI specification',
    description: 'The OpenAPI 3.1 contract for Sarmaasis public discovery endpoints.',
    mimeType: 'application/vnd.oai.openapi+json;version=3.1',
  },
  {
    uri: `${SITE_URL}/agents.md`,
    name: 'Agent instructions',
    description: 'When to use Sarmaasis and how to use its public discovery resources.',
    mimeType: 'text/markdown',
  },
];

function mcpResult(id: unknown, result: unknown) {
  return jsonResponse({ jsonrpc: '2.0', id, result });
}

function mcpError(id: unknown, code: number, message: string, data?: unknown) {
  return jsonResponse({ jsonrpc: '2.0', id, error: { code, message, data } }, 200);
}

export async function handleMcp(request: Request) {
  if (request.method === 'GET') {
    return apiError('METHOD_NOT_ALLOWED', 'The MCP endpoint accepts JSON-RPC POST requests.', 'Connect with the Streamable HTTP endpoint described in /.well-known/mcp/manifest.json.', 405, { Allow: 'POST' });
  }
  if (request.method !== 'POST') {
    return apiError('METHOD_NOT_ALLOWED', 'The MCP endpoint accepts JSON-RPC POST requests.', 'Use POST with an MCP JSON-RPC 2.0 request.', 405, { Allow: 'POST' });
  }

  let message: { jsonrpc?: string; id?: unknown; method?: string; params?: Record<string, unknown> };
  try {
    message = await request.json();
  } catch {
    return mcpError(null, -32700, 'Parse error', { resolution: 'Send a valid JSON-RPC 2.0 request.' });
  }

  const id = message.id ?? null;
  if (message.jsonrpc !== '2.0' || typeof message.method !== 'string') {
    return mcpError(id, -32600, 'Invalid Request', { resolution: 'Send a JSON-RPC 2.0 object with a method.' });
  }
  if (message.method === 'initialize') {
    const requestedVersion = message.params?.protocolVersion;
    const supportedVersions = ['2025-03-26', '2025-06-18', '2025-11-25'];
    if (typeof requestedVersion === 'string' && !supportedVersions.includes(requestedVersion)) {
      return mcpError(id, -32602, 'Unsupported protocol version', {
        resolution: `Use one of: ${supportedVersions.join(', ')}.`,
      });
    }
    return mcpResult(id, {
      protocolVersion: typeof requestedVersion === 'string' ? requestedVersion : '2025-06-18',
      capabilities: { tools: {}, resources: {} },
      serverInfo: { name: 'sarmaasis-discovery', version: '1.0.0' },
      instructions: 'Use the public profile, services, and availability tools to evaluate fit. No API key is required.',
    });
  }
  if (message.method === 'notifications/initialized') {
    return new Response(null, { status: 202, headers: rateLimitHeaders });
  }
  if (message.method === 'tools/list') {
    return mcpResult(id, { tools });
  }
  if (message.method === 'resources/list') {
    return mcpResult(id, { resources });
  }
  if (message.method === 'resources/read') {
    const uri = message.params?.uri;
    const resource = typeof uri === 'string' ? resources.find((candidate) => candidate.uri === uri) : undefined;
    if (!resource) {
      return mcpError(id, -32602, 'Unknown resource', {
        resolution: 'Call resources/list and use one of the advertised resource URIs.',
      });
    }
    const text = resource.uri.endsWith('/openapi.json')
      ? 'OpenAPI specification: https://sarmaasis.com/openapi.json'
      : agentMarkdown;
    return mcpResult(id, { contents: [{ uri: resource.uri, mimeType: resource.mimeType, text }] });
  }
  if (message.method === 'tools/call') {
    const name = message.params?.name;
    const resourceByTool: Record<string, unknown> = {
      get_profile: profile,
      list_services: services,
      get_availability: availability,
    };
    const resource = typeof name === 'string' ? resourceByTool[name] : undefined;
    if (!resource) {
      return mcpError(id, -32602, 'Unknown tool', {
        code: 'TOOL_NOT_FOUND',
        resolution: 'Call tools/list and choose one of the advertised tools.',
      });
    }
    return mcpResult(id, {
      content: [{ type: 'text', text: JSON.stringify(resource) }],
      structuredContent: resource,
    });
  }
  return mcpError(id, -32601, 'Method not found', { resolution: 'Use initialize, tools/list, tools/call, resources/list, or resources/read.' });
}
