import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const sitemap0 = path.join(distDir, 'sitemap-0.xml');
const sitemapXml = path.join(distDir, 'sitemap.xml');

if (fs.existsSync(sitemap0)) {
  fs.copyFileSync(sitemap0, sitemapXml);
  console.log('✅ Successfully copied sitemap-0.xml -> dist/sitemap.xml for legacy crawlers');
} else {
  console.warn('⚠️ sitemap-0.xml not found in dist/');
}
