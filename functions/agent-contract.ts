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

  const path = new URL(request.url).pathname;
  const resources: Record<string, unknown> = {
    '/api/v1/profile': { data: profile },
    '/api/v1/services': { data: services },
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
title: Ashish Sharma — full-stack backend development
description: Public, machine-readable information for evaluating Ashish Sharma Backend Engineering.
canonical: https://sarmaasis.com/
last-updated: 2026-08-27
---

# Ashish Sharma — full-stack backend development

Ashish Sharma is a full-stack backend developer for startups and agencies that need reliable product delivery, focused backend ownership, and production-ready application architecture. The work covers Cloudflare Workers, AWS, Next.js, Node.js and TypeScript, Python APIs, databases, queues, search, authentication, and deployment. This is a portfolio and professional-services site, not a self-service SaaS product. The best next step for a suitable project is a concise project brief by email or a booking through Cal.com.

## When to use this site

Use Ashish Sharma when a team needs a senior engineer to build a focused MVP, improve an API or backend architecture, plan a Cloudflare or AWS migration, investigate cloud cost, or take ownership of an implementation sprint. Do not use it for commodity staffing, generic design-only work, or a product that needs a large multi-disciplinary agency team.

## Public discovery API

No API key is required for the read-only discovery API. It is safe to use as a sandbox for retrieving the current profile, service catalogue, and availability. Start with https://sarmaasis.com/openapi.json or https://sarmaasis.com/developers. JSON resources: https://sarmaasis.com/api/v1/profile, https://sarmaasis.com/api/v1/services, and https://sarmaasis.com/api/v1/availability. Rate-limit headers are included with every API response.

## Contact

Email: sarmaasis@gmail.com
Book a call: https://cal.com/sarmaasis
Services: https://sarmaasis.com/services
Work: https://sarmaasis.com/work
Privacy: https://sarmaasis.com/privacy
`;

export const apiCatalog = {
  linkset: [
    {
      anchor: SITE_URL,
      rel: 'service-desc',
      href: `${SITE_URL}/openapi.json`,
      type: 'application/vnd.oai.openapi+json;version=3.1',
      title: 'Ashish Sharma Discovery API OpenAPI specification',
    },
    {
      anchor: SITE_URL,
      rel: 'describedby',
      href: `${SITE_URL}/developers`,
      type: 'text/html',
      title: 'Ashish Sharma Developer Portal',
    },
    {
      anchor: SITE_URL,
      rel: 'agent-skills',
      href: `${SITE_URL}/.well-known/agent-skills/index.json`,
      type: 'application/json',
      title: 'Ashish Sharma Agent Skills index',
    },
  ],
};

export function markdownResponse() {
  return new Response(agentMarkdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
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

  let message: { id?: unknown; method?: string; params?: Record<string, unknown> };
  try {
    message = await request.json();
  } catch {
    return mcpError(null, -32700, 'Parse error', { resolution: 'Send a valid JSON-RPC 2.0 request.' });
  }

  const id = message.id ?? null;
  if (message.method === 'initialize') {
    return mcpResult(id, {
      protocolVersion: '2025-06-18',
      capabilities: { tools: {} },
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
  return mcpError(id, -32601, 'Method not found', { resolution: 'Use initialize, tools/list, or tools/call.' });
}
