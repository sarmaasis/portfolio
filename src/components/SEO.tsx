import { Helmet } from 'react-helmet-async';
import { OFFER, POSITIONING, SITE_URL, UPWORK_URL } from '../data/site';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article' | 'profile';
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
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

export function SEO({
  title = defaultTitle,
  description = defaultDescription,
  path = '/',
  type = 'website',
  structuredData = [],
}: SEOProps) {
  const canonicalPath = path === '/' ? '' : path;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const schemas = Array.isArray(structuredData) ? structuredData : [structuredData];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Ashish Sharma" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {[personSchema, professionalServiceSchema, ...schemas].map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
