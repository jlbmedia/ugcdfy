import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const artifactsDir = 'C:/Users/brint/.gemini/antigravity/brain/85bcbfe9-6265-4057-b3b8-dbf955821294';
const outputDir = 'public/images';

const images = [
  {
    src: path.join(artifactsDir, 'room30_audit_v3_1791557945810.jpg'),
    dest: path.join(outputDir, 'room30-system-audit-scorecard.webp'),
    maxWidth: 1376
  },
  {
    src: path.join(artifactsDir, 'ugc_realistic_og_1791557981348.jpg'),
    dest: path.join(outputDir, 'og-ugcdfy.webp'),
    maxWidth: 1200
  }
];

async function convert() {
  console.log("=== Converting Batch 2 Approved Images to WebP ===");
  for (const img of images) {
    if (!fs.existsSync(img.src)) {
      console.error(`❌ Source not found: ${img.src}`);
      continue;
    }
    await sharp(img.src)
      .resize({ width: img.maxWidth, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toFile(img.dest);

    const stats = fs.statSync(img.dest);
    const meta = await sharp(img.dest).metadata();
    console.log(`✅ Converted -> ${img.dest} (${meta.width}x${meta.height}, ${(stats.size / 1024).toFixed(1)} KB)`);
  }
}

convert().catch(console.error);
