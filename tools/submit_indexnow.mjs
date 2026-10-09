import fs from 'fs';
import path from 'path';

const KEY = 'c7489ea5b834460f99f8ad37e96b86d1';
const HOST = 'ugcdfy.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function main() {
  const sitemapPath = path.resolve('dist/sitemap-0.xml');
  if (!fs.existsSync(sitemapPath)) {
    throw new Error('dist/sitemap-0.xml not found! Run npm run build first.');
  }

  const xmlContent = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...xmlContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

  console.log(`Found ${urls.length} URLs to submit to IndexNow:`);
  urls.forEach(u => console.log(` - ${u}`));

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow'
  ];

  for (const endpoint of endpoints) {
    console.log(`\nSubmitting to ${endpoint}...`);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      console.log(`Response Status: ${res.status} (${res.statusText})`);
      if (res.status === 200 || res.status === 202) {
        console.log(`✅ Success! ${urls.length} URLs submitted to ${endpoint}`);
      } else {
        const text = await res.text();
        console.warn(`⚠️ Warning: Status ${res.status}. Body: ${text}`);
      }
    } catch (err) {
      console.error(`❌ Failed to submit to ${endpoint}:`, err.message);
    }
  }
}

main().catch(console.error);
