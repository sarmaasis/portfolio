import { Helmet } from 'react-helmet-async';

interface SEOProps {
    region?: 'us' | 'eu' | 'global';
}

export const SEO: React.FC<SEOProps> = ({ region = 'global' }) => {
    const BASE_URL = 'https://sarmaasis.com';
    const canonicalUrl = region === 'us'
        ? `${BASE_URL}/en-us`
        : region === 'eu'
            ? `${BASE_URL}/en-eu`
            : BASE_URL;

    const title = region === 'us'
        ? 'Ashish Sharma | Senior Backend Engineer | Go, Node.js & Cloudflare Architecture | US'
        : region === 'eu'
            ? 'Ashish Sharma | Senior Backend Engineer | Go, Node.js & Cloudflare Architecture | EU'
            : 'Ashish Sharma | Senior Backend Engineer | Go, Node.js & Cloudflare Architecture';

    const description = region === 'us'
        ? 'Senior Backend Engineer for US HealthTech & PropTech startups. Sub-100ms APIs, edge infrastructure, and B2B systems on Go, Node.js & Cloudflare.'
        : region === 'eu'
            ? 'Senior Backend Engineer for EU HealthTech & PropTech startups. GDPR-compliant, sub-100ms APIs, edge infrastructure on Go, Node.js & Cloudflare.'
            : 'Senior Backend Engineer for HealthTech & PropTech startups. Sub-100ms APIs, edge infrastructure, and B2B systems on Go, Node.js & Cloudflare.';

    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Ashish Sharma',
        'url': BASE_URL,
        'jobTitle': 'Senior Backend Engineer',
        'description': 'Builds sub-100ms APIs, optimizes database architecture, and cuts cloud costs for HealthTech and PropTech startups using Go, Node.js, and Cloudflare.',
        'sameAs': [
            'https://www.linkedin.com/in/sarmaasis',
            'https://github.com/sarmaasis',
            'https://x.com/sarmaasis'
        ],
    };

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        'name': 'Ashish Sharma — Backend Engineering',
        'url': BASE_URL,
        'description': 'Backend architecture, cloud cost optimization, and B2B workflow automation for HealthTech and PropTech startups.',
        'provider': { '@type': 'Person', 'name': 'Ashish Sharma' },
        'areaServed': 'Worldwide',
        'serviceType': ['Backend Architecture', 'Cloud Cost Optimization', 'B2B Workflow Automation'],
    };

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content="Ashish Sharma, sarmaasis, Senior Backend Engineer, Go, Node.js, Cloudflare Workers, HealthTech, PropTech, sub-100ms API, edge infrastructure, cloud cost optimization, HIPAA backend, microservices" />
            <meta name="robots" content="index, follow" />

            <link rel="canonical" href={canonicalUrl} />
            <link rel="alternate" href={`${BASE_URL}/en-us`} hrefLang="en-us" />
            <link rel="alternate" href={`${BASE_URL}/en-eu`} hrefLang="en-eu" />
            <link rel="alternate" href={`${BASE_URL}/`} hrefLang="x-default" />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={`${BASE_URL}/images/og-image.jpg`} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${BASE_URL}/images/og-image.jpg`} />

            {/* Structured Data */}
            <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        </Helmet>
    );
};
