import { CAL_URL, EMAIL, OFFER, POSITIONING, SITE_URL, UPWORK_URL } from '../data/site';

export interface Breadcrumb {
  name: string;
  path: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article' | 'profile';
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: Breadcrumb[];
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
}

export interface SEOState {
  canonicalUrl: string;
  description: string;
  graph: Record<string, unknown>;
  title: string;
  type: 'website' | 'article' | 'profile';
  robots: string;
  image: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SERVICE_ID = `${SITE_URL}/#service`;
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const defaultTitle = 'Ashish Sharma — 14-Day MVP Builds on Cloudflare and AWS';
const defaultDescription =
  'Full-stack, backend-first engineer. Focused web MVPs built in 14 days for a flat $4,500, on Cloudflare Workers, AWS, Next.js, TypeScript and Python.';

const sameAs = [
  'https://www.linkedin.com/in/sarmaasis',
  'https://github.com/sarmaasis',
  'https://x.com/sarmaasis',
  UPWORK_URL,
];

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Ashish Sharma',
  url: SITE_URL,
  email: `mailto:${EMAIL}`,
  image: `${SITE_URL}/favicon-192.png`,
  jobTitle: 'Full-Stack Backend Engineer',
  description: `${POSITIONING} ${OFFER}`,
  sameAs,
  knowsAbout: [
    'Cloudflare Workers', 'Cloudflare Queues', 'Cloudflare R2', 'Cloudflare D1', 'Next.js', 'TypeScript', 'Node.js',
    'Python', 'FastAPI', 'AWS Lambda', 'DynamoDB', 'PostgreSQL', 'MySQL', 'Typesense', 'Backend architecture',
    'MVP development', 'API design', 'Cloud cost optimization',
  ],
};

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: 'Ashish Sharma',
  description: defaultDescription,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
};

const service = {
  '@type': 'ProfessionalService',
  '@id': SERVICE_ID,
  name: 'Ashish Sharma — Full-Stack Backend Engineering',
  url: SITE_URL,
  description: `${POSITIONING} ${OFFER}`,
  founder: { '@id': PERSON_ID },
  email: EMAIL,
  image: `${SITE_URL}/og-image.png`,
  priceRange: '$$',
  areaServed: ['United States', 'European Union', 'United Kingdom', 'Worldwide'],
  sameAs,
  potentialAction: { '@type': 'ReserveAction', target: CAL_URL, name: 'Book a 20-minute call' },
  serviceType: [
    '14-day MVP development',
    'Full-stack backend development',
    'Cloudflare Workers development',
    'AWS backend architecture',
    'Architecture audits',
  ],
};

let currentSEOState: SEOState | undefined;

function escapeAttribute(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path === '/' ? '' : path}`;
}

export function buildSEOState({
  title = defaultTitle,
  description = defaultDescription,
  path = '/',
  type = 'website',
  structuredData = [],
  breadcrumbs,
  noindex = false,
  publishedTime,
  modifiedTime,
  image = DEFAULT_IMAGE,
}: SEOProps): SEOState {
  const canonicalUrl = absoluteUrl(path);
  const pageSchemas = (Array.isArray(structuredData) ? structuredData : [structuredData]).map((schema) => {
    const rest: Record<string, unknown> = { ...schema };
    delete rest['@context'];
    return rest;
  });

  const webPage = {
    '@type': type === 'profile' ? 'ProfilePage' : 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en',
    ...(type === 'profile' ? { mainEntity: { '@id': PERSON_ID } } : { about: { '@id': SERVICE_ID } }),
    ...(breadcrumbs ? { breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` } } : {}),
  };

  const breadcrumbList = breadcrumbs
    ? [{
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    }]
    : [];

  return {
    canonicalUrl,
    description,
    title,
    type,
    image,
    publishedTime,
    modifiedTime,
    robots: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1',
    graph: {
      '@context': 'https://schema.org',
      '@graph': noindex ? [person, website] : [person, website, service, webPage, ...breadcrumbList, ...pageSchemas],
    },
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
  const jsonLd = JSON.stringify(state.graph).replace(/</g, '\\u003c');
  const articleTags = state.type === 'article'
    ? [
      state.publishedTime ? `<meta property="article:published_time" content="${escapeAttribute(state.publishedTime)}" />` : '',
      state.modifiedTime ? `<meta property="article:modified_time" content="${escapeAttribute(state.modifiedTime)}" />` : '',
      '<meta property="article:author" content="Ashish Sharma" />',
    ].join('\n    ')
    : '';

  return `
    <title>${escapeAttribute(state.title)}</title>
    <meta name="description" content="${escapeAttribute(state.description)}" />
    <meta name="robots" content="${state.robots}" />
    <link rel="canonical" href="${escapeAttribute(state.canonicalUrl)}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Ashish Sharma" />
    <meta property="og:type" content="${state.type}" />
    <meta property="og:title" content="${escapeAttribute(state.title)}" />
    <meta property="og:description" content="${escapeAttribute(state.description)}" />
    <meta property="og:url" content="${escapeAttribute(state.canonicalUrl)}" />
    <meta property="og:image" content="${escapeAttribute(state.image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Ashish Sharma — full-stack engineer" />
    ${articleTags}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@sarmaasis" />
    <meta name="twitter:creator" content="@sarmaasis" />
    <meta name="twitter:title" content="${escapeAttribute(state.title)}" />
    <meta name="twitter:description" content="${escapeAttribute(state.description)}" />
    <meta name="twitter:image" content="${escapeAttribute(state.image)}" />
    <script type="application/ld+json">${jsonLd}</script>`;
}

/** 404 pages render <SEO path="/404" noindex />; the server uses this for the HTTP status. */
export function getRenderStatus() {
  return currentSEOState?.canonicalUrl === absoluteUrl('/404') ? 404 : 200;
}
