import { SEO } from './SEO';
import { PageIntro, Row } from './layout';

const endpoints = [
  ['GET', '/api/v1/profile', 'Public profile, specialties and contact details.'],
  ['GET', '/api/v1/services', 'Current service catalogue.'],
  ['GET', '/api/v1/availability', 'Engagement types and contact options.'],
];

export default function DevelopersPage() {
  return (
    <>
      <SEO
        title="Developer Portal — Public Discovery API and MCP — Ashish Sharma"
        description="A free, read-only discovery API, OpenAPI contract, rate-limit conventions and MCP tools for evaluating Ashish Sharma Backend Engineering."
        path="/developers"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Developers', path: '/developers' }]}
      />

      <PageIntro
        title="Public, machine-readable project-fit information."
        lede="A free, read-only discovery API for agents and developers. No API key, registration or sales form required."
      />

      <Row id="quickstart" label="Quickstart">
        <div className="prose" style={{ fontSize: 17, lineHeight: '28px' }}>
          <p>Read the OpenAPI contract, then call a public endpoint. Responses are JSON and use standard error objects.</p>
          <figure className="code">
            <figcaption className="code-h"><span>bash</span></figcaption>
            <pre><code>curl https://sarmaasis.com/api/v1/profile</code></pre>
          </figure>
          <p><a href="/openapi.json">OpenAPI 3.1 specification</a></p>
        </div>
      </Row>

      <Row id="endpoints" label="Endpoints">
        <div className="table-scroll">
          <table className="rv-table">
            <thead><tr><th scope="col">Method</th><th scope="col">Path</th><th scope="col">Returns</th></tr></thead>
            <tbody>
              {endpoints.map(([method, path, description]) => (
                <tr key={path}><td className="num">{method}</td><td><code>{path}</code></td><td>{description}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Row>

      <Row id="auth" label="Sandbox and auth">
        <p style={{ maxWidth: '66ch' }}>
          The production read-only API is the sandbox: it exposes only public profile, service and availability information.
          Authentication is not required, and no project or customer data is available through it.
        </p>
      </Row>

      <Row id="errors" label="Errors and limits">
        <p style={{ maxWidth: '66ch' }}>
          Errors use <code>error.code</code>, <code>error.message</code> and <code>error.resolution</code>, so a caller can recover
          without parsing HTML. Responses include RFC RateLimit fields; if a limit is enforced, a 429 also includes <code>Retry-After</code>.
        </p>
      </Row>

      <Row id="mcp" label="MCP tools">
        <p style={{ maxWidth: '66ch', paddingBottom: 32 }}>
          A Streamable HTTP MCP server exposes profile, services and availability as native tools. Connect using the{' '}
          <a className="ln" href="/.well-known/mcp/manifest.json">MCP manifest</a>.
        </p>
      </Row>
    </>
  );
}
