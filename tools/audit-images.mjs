import fs from 'node:fs';
import path from 'node:path';

function getHtmlFiles(dir, list = []) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      getHtmlFiles(full, list);
    } else if (file.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

const files = getHtmlFiles('dist');
console.log(`Checking ${files.length} pages in dist/ for image usage...\n`);

for (const file of files) {
  const rel = path.relative('dist', file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  const imgMatches = html.match(/<img[^>]*>/gi);
  if (imgMatches) {
    console.log(`📄 ${rel}:`);
    for (const tag of imgMatches) {
      const srcMatch = tag.match(/src="([^"]+)"/i);
      console.log(`   └─ ${srcMatch ? srcMatch[1] : 'unknown'}`);
    }
  }
}
