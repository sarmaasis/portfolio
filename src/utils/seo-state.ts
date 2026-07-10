import { OFFER, POSITIONING, SITE_URL, UPWORK_URL } from '../data/site';

export interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article' | 'profile';
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export interface SEOState {
  canonicalUrl: string;
  description: string;
  schemas: Record<string, unknown>[];
  title: string;
  type: 'website' | 'article' | 'profile';
}

const defaultTitle = 'Ashish Sharma - Cloudflare Workers Backend Engineer';
const defaultDescription =
  'Senior Backend Engineer for Cloudflare Workers, AWS, Node.js/TypeScript, Python APIs, backend architecture, cloud cost optimization, and migrations.';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ashish Sharma',
  url: SITE_URL,
  email: 'mailto:sarmaasis@gmail.com',
  jobTitle: 'Senior Backend Engineer',
  description: `${POSITIONING} ${OFFER}`,
  sameAs: [
    'https://www.linkedin.com/in/sarmaasis',
    'https://github.com/sarmaasis',
    'https://x.com/sarmaasis',
    UPWORK_URL,
  ],
  knowsAbout: [
    'Cloudflare Workers',
    'Node.js',
    'TypeScript',
    'Python',
    'FastAPI',
    'AWS Lambda',
    'AWS cost optimization',
    'Backend architecture',
    'Cloud cost optimization',
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ashish Sharma Backend Engineering',
  url: SITE_URL,
  email: 'mailto:sarmaasis@gmail.com',
  founder: {
    '@type': 'Person',
    name: 'Ashish Sharma',
    url: SITE_URL,
  },
  description:
    'Backend engineering services for Cloudflare Workers, AWS backend architecture, Node.js/TypeScript APIs, Python APIs, API scaling, search migration, and cloud cost optimization.',
  sameAs: [
    'https://www.linkedin.com/in/sarmaasis',
    'https://github.com/sarmaasis',
    'https://x.com/sarmaasis',
    UPWORK_URL,
  ],
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Ashish Sharma Backend Engineering',
  url: SITE_URL,
  description: `${POSITIONING} ${OFFER}`,
  provider: {
    '@type': 'Person',
    name: 'Ashish Sharma',
  },
  areaServed: ['United States', 'European Union', 'United Kingdom', 'Worldwide'],
  serviceType: [
    'Cloudflare Workers backend development',
    'AWS backend architecture',
    'AWS cost optimization',
    'Node.js backend engineering',
    'Python FastAPI backend engineering',
    'Cloud cost optimization',
  ],
};

let currentSEOState: SEOState | undefined;

function escapeAttribute(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

export function buildSEOState({
  title = defaultTitle,
  description = defaultDescription,
  path = '/',
  type = 'website',
  structuredData = [],
}: SEOProps): SEOState {
  const canonicalPath = path === '/' ? '' : path;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const pageSchemas = Array.isArray(structuredData) ? structuredData : [structuredData];

  return {
    canonicalUrl,
    description,
    schemas: [personSchema, organizationSchema, professionalServiceSchema, ...pageSchemas],
    title,
    type,
  };
}

export function setCurrentSEOState(state: SEOState) {
  currentSEOState = state;
}

export function resetSEOState() {
  currentSEOState = undefined;
}

export function getSEOHeadTags() {
  const state = currentSEOState ?? buildSEOState({});
  const jsonLd = state.schemas
    .map((schema) => JSON.stringify(schema).replace(/</g, '\\u003c'))
    .map((schema) => `<script type="application/ld+json">${schema}</script>`)
    .join('\n');

  return `
    <title>${escapeAttribute(state.title)}</title>
    <meta name="description" content="${escapeAttribute(state.description)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${escapeAttribute(state.canonicalUrl)}" />
    <meta property="og:title" content="${escapeAttribute(state.title)}" />
    <meta property="og:description" content="${escapeAttribute(state.description)}" />
    <meta property="og:url" content="${escapeAttribute(state.canonicalUrl)}" />
    <meta property="og:type" content="${escapeAttribute(state.type)}" />
    <meta property="og:site_name" content="Ashish Sharma" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeAttribute(state.title)}" />
    <meta name="twitter:description" content="${escapeAttribute(state.description)}" />
    ${jsonLd}`;
}
