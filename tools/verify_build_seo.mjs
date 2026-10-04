import fs from 'node:fs';
import path from 'node:path';

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles('dist');
console.log(`Auditing ${htmlFiles.length} generated HTML pages in dist/...\n`);

let failed = false;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative('dist', file).replace(/\\/g, '/');

  // Check H1 count
  const h1Matches = content.match(/<h1[\s>]/gi) || [];
  if (h1Matches.length !== 1) {
    console.error(`❌ [${relPath}] Invalid H1 count: found ${h1Matches.length} <h1> tags (Must be exactly 1)`);
    failed = true;
  }

  // Check Title
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].includes('|')) {
    console.error(`❌ [${relPath}] Missing or invalid Title tag format: "${titleMatch ? titleMatch[1] : 'NONE'}"`);
    failed = true;
  }

  // Check Meta Description
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  if (!descMatch) {
    console.error(`❌ [${relPath}] Missing meta description`);
    failed = true;
  } else {
    const rawDesc = descMatch[1].replace(/&#38;/g, '&');
    const descLen = rawDesc.length;
    if (descLen < 120 || descLen > 158) {
      console.error(`❌ [${relPath}] Meta description length error: ${descLen} chars ("${rawDesc}")`);
      failed = true;
    }
  }
}

if (!failed) {
  console.log(`🎉 100% of the ${htmlFiles.length} generated HTML files passed strict defensive SEO checks!`);
  console.log(`- Exactly 1 H1 per page: Verified`);
  console.log(`- Meta descriptions strictly 120–158 characters: Verified`);
  console.log(`- Meaningful Phrase | Brand Name title format: Verified`);
} else {
  process.exit(1);
}
