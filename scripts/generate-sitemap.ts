import fs from 'fs';
import path from 'path';
import process from 'process';
import { sitemapEntries } from '../src/data/site';

const BASE_URL = 'https://sarmaasis.com';
const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

// lastmod is the page's real last change (post date, or SITE_UPDATED for static
// pages). Stamping every URL with today's date teaches crawlers to ignore it.
const urlEntries = sitemapEntries.map(({ path: pagePath, lastmod }) => `
  <url>
    <loc>${BASE_URL}${pagePath === '/' ? '' : pagePath}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`).join('');

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}
</urlset>
`;

fs.writeFileSync(SITEMAP_PATH, xmlContent, 'utf-8');
console.log(`Sitemap written to ${SITEMAP_PATH} with ${sitemapEntries.length} URLs.`);
