import { Helmet } from 'react-helmet-async';

interface SEOProps {
    region?: 'us' | 'eu' | 'global';
}

export const SEO: React.FC<SEOProps> = ({ region = 'global' }) => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ashishsharma.xyz';

    const title = region === 'us'
        ? 'Ashish Sharma - Senior Backend & Full Stack Engineer | US'
        : region === 'eu'
            ? 'Ashish Sharma - Senior Backend Developer & Cloud Expert | EU'
            : 'Ashish Sharma - Senior Full Stack Engineer, Cloudflare & AWS Expert';

    const description = region === 'us'
        ? 'Senior Backend Engineer specializing in Python, Node.js, Go, AWS, and high-concurrency scalable infrastructure for the US market.'
        : region === 'eu'
            ? 'Expert Full Stack Developer available for scaling systems and optimizing infrastructure for European clients. Fully GDPR compliant.'
            : 'I build scalable backend infrastructure that doesn\'t break when your user base grows. Specializing in Python, Node.js, Cloudflare, and AWS.';

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Ashish Sharma Freelance Engineering',
        'url': 'https://ashishsharma.xyz',
        'logo': 'https://ashishsharma.xyz/favicon.ico',
        'sameAs': [
            'https://www.linkedin.com/in/sarmaasis',
            'https://github.com/sarmaasis',
            'https://x.com/sarmaasis'
        ],
        "address": region === 'us' ? {
            "@type": "PostalAddress",
            "addressLocality": "Delaware",
            "addressCountry": "US"
        } : region === 'eu' ? {
            "@type": "PostalAddress",
            "addressLocality": "London",
            "addressCountry": "UK"
        } : {
            "@type": "PostalAddress",
            "addressLocality": "Bengaluru",
            "addressCountry": "IN"
        }
    };

    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Ashish Sharma',
        'url': 'https://ashishsharma.xyz',
        'jobTitle': 'Senior Full Stack Engineer',
        'sameAs': [
            'https://www.linkedin.com/in/sarmaasis',
            'https://github.com/sarmaasis',
            'https://x.com/sarmaasis'
        ],
    };

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content="Ashish Sharma, sarmaasis, Backend Engineer, Full Stack Developer, Python, Node.js, Cloudflare, AWS, Go, React, TypeScript, High-Concurrency Scaling, Edge Computing, AI Integration, System Architecture" />

            {/* Hreflang tags for International SEO */}
            <link rel="canonical" href={currentUrl} />
            <link rel="alternate" href="https://ashishsharma.xyz/en-us" hrefLang="en-us" />
            <link rel="alternate" href="https://ashishsharma.xyz/en-eu" hrefLang="en-eu" />
            <link rel="alternate" href="https://ashishsharma.xyz/" hrefLang="x-default" />

            {/* Open Graph Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://ashishsharma.xyz/images/og-image.jpg" />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content="https://ashishsharma.xyz/images/og-image.jpg" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(personSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>
        </Helmet>
    );
};
