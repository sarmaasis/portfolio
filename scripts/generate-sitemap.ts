import fs from 'fs';
import path from 'path';
import process from 'process';

const BASE_URL = 'https://sarmaasis.com';
const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

// Only list pages that are live and render real content.
// Add a new entry here ONLY after the corresponding route and page component exist.
const pages: { path: string; priority: string; changefreq: string }[] = [
  { path: '/',         priority: '1.0', changefreq: 'weekly'  },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/pricing',  priority: '0.7', changefreq: 'monthly' },
  { path: '/about',    priority: '0.7', changefreq: 'monthly' },
  { path: '/reviews',  priority: '0.7', changefreq: 'monthly' },
];

const today = new Date().toISOString().split('T')[0];

const urlEntries = pages.map(({ path: p, priority, changefreq }) => `
  <url>
    <loc>${BASE_URL}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}
</urlset>
`;

fs.writeFileSync(SITEMAP_PATH, xmlContent, 'utf-8');
console.log(`Sitemap written to ${SITEMAP_PATH} with ${pages.length} URLs.`);
