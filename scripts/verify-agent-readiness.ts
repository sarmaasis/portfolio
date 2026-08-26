import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { acceptsMarkdown, agentMarkdown, apiCatalogResponse, agentModeResponse, handleDiscoveryApi, handleMcp, markdownResponse } from '../functions/agent-contract';

const root = process.cwd();
const readPublicFile = (relativePath: string) => fs.readFileSync(path.join(root, 'public', relativePath), 'utf8');

async function readJson(response: Response) {
  return response.json() as Promise<Record<string, unknown>>;
}

async function verifyDiscoveryApi() {
  for (const endpoint of ['profile', 'services', 'availability']) {
    const response = handleDiscoveryApi(new Request(`https://sarmaasis.com/api/v1/${endpoint}`));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
    assert.ok(response.headers.get('ratelimit-limit'));
    const payload = await readJson(response);
    assert.ok(payload.data);
  }

  const missingResponse = handleDiscoveryApi(new Request('https://sarmaasis.com/api/v1/missing'));
  assert.equal(missingResponse.status, 404);
  const missing = await readJson(missingResponse);
  assert.deepEqual(Object.keys(missing.error as object).sort(), ['code', 'message', 'resolution']);

  const methodResponse = handleDiscoveryApi(new Request('https://sarmaasis.com/api/v1/profile', { method: 'POST' }));
  assert.equal(methodResponse.status, 405);
  assert.equal(methodResponse.headers.get('allow'), 'GET, OPTIONS');
}

async function verifyMcp() {
  const initialize = await handleMcp(new Request('https://sarmaasis.com/.well-known/mcp', {
    method: 'POST',
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize' }),
  }));
  assert.equal(initialize.status, 200);
  const initialized = await readJson(initialize);
  assert.equal(((initialized.result as { serverInfo: { name: string } }).serverInfo.name), 'sarmaasis-discovery');

  const toolsList = await handleMcp(new Request('https://sarmaasis.com/.well-known/mcp', {
    method: 'POST',
    body: JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list' }),
  }));
  const listed = await readJson(toolsList);
  assert.equal(((listed.result as { tools: unknown[] }).tools).length, 3);

  for (const name of ['get_profile', 'list_services', 'get_availability']) {
    const call = await handleMcp(new Request('https://sarmaasis.com/.well-known/mcp', {
      method: 'POST',
      body: JSON.stringify({ jsonrpc: '2.0', id: name, method: 'tools/call', params: { name } }),
    }));
    const result = await readJson(call);
    assert.ok((result.result as { structuredContent: unknown }).structuredContent);
  }
}

async function main() {
  const openApi = JSON.parse(readPublicFile('openapi.json')) as { openapi: string; paths: Record<string, unknown> };
  assert.equal(openApi.openapi, '3.1.1');
  assert.deepEqual(Object.keys(openApi.paths).sort(), ['/api/v1/availability', '/api/v1/profile', '/api/v1/services']);

  const mcpManifest = JSON.parse(readPublicFile('.well-known/mcp/manifest.json')) as { transport: { type: string; url: string } };
  assert.equal(mcpManifest.transport.type, 'streamable-http');
  assert.equal(mcpManifest.transport.url, 'https://sarmaasis.com/.well-known/mcp');

  const serverCard = JSON.parse(readPublicFile('.well-known/mcp/server-card.json')) as { url: string; transport: string; tools: unknown[] };
  assert.equal(serverCard.url, 'https://sarmaasis.com/.well-known/mcp');
  assert.equal(serverCard.transport, 'streamable-http');
  assert.equal(serverCard.tools.length, 3);

  const skillIndex = JSON.parse(readPublicFile('.well-known/agent-skills/index.json')) as { $schema: string; skills: Array<{ url: string; digest: string }> };
  assert.equal(skillIndex.$schema, 'https://schemas.agentskills.io/discovery/0.2.0/schema.json');
  const skill = skillIndex.skills[0];
  assert.ok(skill);
  const skillPath = path.join(root, 'public', skill.url);
  const skillDigest = `sha256:${crypto.createHash('sha256').update(fs.readFileSync(skillPath)).digest('hex')}`;
  assert.equal(skill.digest, skillDigest);

  const robots = readPublicFile('robots.txt');
  for (const agent of ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Google-Extended', 'DeepSeekBot', 'Applebot-Extended']) {
    assert.match(robots, new RegExp(`User-agent: ${agent}\\nAllow: /`));
  }

  const agentSkill = readPublicFile('.well-known/agent-skills/sarmaasis.md');
  assert.match(agentSkill, /## When to use this/i);
  assert.ok(agentMarkdown.length > 500);
  assert.equal(acceptsMarkdown(new Request('https://sarmaasis.com/', { headers: { Accept: 'text/markdown' } })), true);
  const markdown = markdownResponse();
  assert.equal(markdown.headers.get('content-type'), 'text/markdown; charset=utf-8');
  assert.equal(markdown.headers.get('vary'), 'Accept, Accept-Encoding');
  assert.match(await markdown.text(), /^---\n[\s\S]*\n# Ashish Sharma/m);

  const agentMode = agentModeResponse();
  assert.equal(agentMode.headers.get('content-type'), 'text/markdown; charset=utf-8');
  assert.match(agentMode.headers.get('link') ?? '', /rel="service-desc"/);

  const catalog = apiCatalogResponse();
  assert.equal(catalog.headers.get('content-type'), 'application/linkset+json;profile="https://www.rfc-editor.org/info/rfc9727"');
  const catalogBody = await readJson(catalog);
  assert.equal((catalogBody.linkset as unknown[]).length, 3);

  for (const document of ['index.md', 'agents.md', 'pricing.md']) {
    assert.match(readPublicFile(document), /^---\n[\s\S]*\n# /m);
  }

  await verifyDiscoveryApi();
  await verifyMcp();
  console.log('Agent-readiness contracts are valid.');
}

void main();
