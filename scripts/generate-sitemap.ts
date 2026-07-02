import fs from 'fs';
import path from 'path';
import process from 'process';
import { sitemapPaths } from '../src/data/site';

const BASE_URL = 'https://sarmaasis.com';
const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

const today = new Date().toISOString().split('T')[0];

const urlEntries = sitemapPaths.map((pagePath) => {
  const priority = pagePath === '/' ? '1.0' : pagePath.startsWith('/blog/') || pagePath.startsWith('/work/') ? '0.8' : '0.7';
  const changefreq = pagePath === '/blog' || pagePath.startsWith('/blog/') ? 'monthly' : 'weekly';

  return `
  <url>
    <loc>${BASE_URL}${pagePath === '/' ? '' : pagePath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('');

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}
</urlset>
`;

fs.writeFileSync(SITEMAP_PATH, xmlContent, 'utf-8');
console.log(`Sitemap written to ${SITEMAP_PATH} with ${sitemapPaths.length} URLs.`);
