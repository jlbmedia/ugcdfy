import fs from 'fs';
import path from 'path';

function getAllFiles(dir, all = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      getAllFiles(full, all);
    } else if (f.endsWith('.html')) {
      all.push(full);
    }
  }
  return all;
}

const htmlFiles = getAllFiles('dist');
console.log('Total HTML files in dist:', htmlFiles.length);

const broken = [];
const linkRegex = /href=["']([^"'#]+)["']/g;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('data:') || href.startsWith('/go/')) {
      continue;
    }
    let clean = href.split('?')[0];
    if (clean === '/') clean = '/index.html';
    else if (clean.endsWith('/')) clean = clean + 'index.html';
    else clean = clean + '/index.html';

    const target = path.join('dist', clean.replace(/^\//, ''));
    if (!fs.existsSync(target) && !fs.existsSync(path.join('dist', href.replace(/^\//, '')))) {
      broken.push({ from: file, to: href, expected: target });
    }
  }
}

if (broken.length === 0) {
  console.log('✅ ALL internal links resolve successfully to existing HTML files! Zero 404s.');
} else {
  console.log('❌ Broken links found:', broken.length);
  console.log(JSON.stringify(broken.slice(0, 10), null, 2));
}
