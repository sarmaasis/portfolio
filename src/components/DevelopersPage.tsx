import { SEO } from './SEO';

const endpoints = [
  ['GET', '/api/v1/profile', 'Public profile, specialties, and contact details.'],
  ['GET', '/api/v1/services', 'Current service catalogue.'],
  ['GET', '/api/v1/availability', 'Engagement types and contact options.'],
];

export default function DevelopersPage() {
  return (
    <>
      <SEO
        title="Developer Portal | Ashish Sharma Backend Engineering"
        description="Public discovery API, OpenAPI contract, rate-limit conventions, and MCP tools for Ashish Sharma Backend Engineering."
        path="/developers"
      />

      <section className="page-hero">
        <p className="eyebrow">Developer portal</p>
        <h1>Public, machine-readable project-fit information.</h1>
        <p>
          This is a free, read-only discovery API for agents and developers evaluating Ashish Sharma Backend
          Engineering. No API key, registration, or sales form is required.
        </p>
      </section>

      <section className="content-grid">
        <article className="panel">
          <h2>Quickstart</h2>
          <p>Read the OpenAPI contract, then call a public endpoint. Responses are JSON and use standard error objects.</p>
          <pre><code>{`curl https://sarmaasis.com/api/v1/profile`}</code></pre>
          <p><a className="text-link" href="/openapi.json">OpenAPI 3.1 specification</a></p>
        </article>
        <aside className="panel">
          <h2>Sandbox and authentication</h2>
          <p>
            The production read-only API is the sandbox: it exposes only public profile, service, and availability
            information. Authentication is not required, and no project or customer data is available through it.
          </p>
        </aside>
      </section>

      <section>
        <h2>Endpoints</h2>
        <div className="card-grid">
          {endpoints.map(([method, path, description]) => (
            <article className="card" key={path}>
              <p className="eyebrow">{method}</p>
              <h3><code>{path}</code></h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-grid">
        <article>
          <h2>Errors and rate limits</h2>
          <p>
            Errors use <code>error.code</code>, <code>error.message</code>, and <code>error.resolution</code> so a
            caller can recover without parsing HTML. API responses include RFC RateLimit fields. If a limit is enforced,
            a 429 response will also include <code>Retry-After</code>.
          </p>
        </article>
        <aside className="panel">
          <h2>MCP tools</h2>
          <p>
            A Streamable HTTP MCP server exposes profile, services, and availability as native tools. Connect using the
            <a className="text-link" href="/.well-known/mcp/manifest.json"> MCP manifest</a>.
          </p>
        </aside>
      </section>
    </>
  );
}
