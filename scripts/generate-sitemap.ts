import fs from 'fs';
import path from 'path';

// Define the root URL
const BASE_URL = 'https://ashishsharma.xyz';
const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

// 1. Define our Programmatic SEO Matrix
const technologies = ['python', 'node-js', 'golang', 'cloudflare-workers', 'postgresql', 'redis'];
const roles = ['backend-developer', 'full-stack-engineer', 'infrastructure-architect', 'systems-engineer', 'microservices-expert'];
const locations = ['new-york', 'san-francisco', 'london', 'berlin', 'remote', 'austin', 'seattle', 'toronto'];

// We can mix Tech + Role + Location
// e.g., /services/python-backend-developer-london
const generatedSlugs: string[] = [];

// Generate Top Mixes (Don't do every single permutation or we will hit 500+ pages, keep it to high value ~50-80)
for (const tech of technologies) {
    for (const role of roles) {
        // High value locations subset to keep it reasonable
        const primaryLocations = ['new-york', 'london', 'san-francisco', 'remote', 'dubai', 'riyadh', 'abu-dhabi', 'doha'];
        for (const loc of primaryLocations) {
            generatedSlugs.push(`/services/${tech}-${role}-${loc}`);
        }
    }
}

// Additional specific combinations for edge computing
const edgeCombinations = [
    '/services/cloudflare-edge-consultant',
    '/services/cloudflare-workers-expert',
    '/services/aws-infrastructure-architect',
    '/services/high-concurrency-backend-scaling',
    '/services/ai-integration-engineer'
];
generatedSlugs.push(...edgeCombinations);

console.log(`Generated ${generatedSlugs.length} dynamic service route slugs.`);

// 2. Read the existing sitemap (If running repeatedly, we want to reconstruct to avoid infinite appending)
// In a real app we would use xml2js, but standard string templating is robust enough here.

const staticUrls = [
    `
  <url>
    <loc>${BASE_URL}/en-eu</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="en-us" href="${BASE_URL}/en-us" />
    <xhtml:link rel="alternate" hreflang="en-eu" href="${BASE_URL}/en-eu" />
  </url>`,
    `
  <url>
    <loc>${BASE_URL}/services</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    `
  <url>
    <loc>${BASE_URL}/pricing</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    `
  <url>
    <loc>${BASE_URL}/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    `
  <url>
    <loc>${BASE_URL}/reviews</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
];

const dynamicUrls = generatedSlugs.map(slug => `
  <url>
    <loc>${BASE_URL}${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
);

// 3. Construct and write the final document
const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="en-us" href="${BASE_URL}/en-us" />
    <xhtml:link rel="alternate" hreflang="en-eu" href="${BASE_URL}/en-eu" />
  </url>${staticUrls.join('')}${dynamicUrls.join('')}
</urlset>
`;

fs.writeFileSync(SITEMAP_PATH, xmlContent, 'utf-8');
console.log(`Successfully injected static and programmatic routes into ${SITEMAP_PATH}.`);
