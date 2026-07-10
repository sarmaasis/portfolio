import { SITE_URL, sitemapPaths } from '../src/data/site';

const INDEXNOW_KEY = '2c644741f2ce47a5a232ed32fcf36664';
const endpoint = 'https://api.indexnow.org/indexnow';

const urlList = sitemapPaths.map((pagePath) => `${SITE_URL}${pagePath === '/' ? '' : pagePath}`);

const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  }),
});

const body = await response.text();

if (!response.ok) {
  throw new Error(`IndexNow submission failed: ${response.status} ${response.statusText}\n${body}`);
}

console.log(`Submitted ${urlList.length} URLs to IndexNow.`);
