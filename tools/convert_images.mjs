import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const artifactsDir = 'C:/Users/brint/.gemini/antigravity/brain/85bcbfe9-6265-4057-b3b8-dbf955821294';
const outputDir = 'public/images';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const images = [
  {
    src: path.join(artifactsDir, 'hero_portfolio_mockup_1791554520617.jpg'),
    dest: path.join(outputDir, 'ai-influencer-portfolio-overview.webp'),
    maxWidth: 1400
  },
  {
    src: path.join(artifactsDir, 'dfy_workflow_pipeline_1791554543326.jpg'),
    dest: path.join(outputDir, 'dfy-ai-system-workflow.webp'),
    maxWidth: 1400
  },
  {
    src: path.join(artifactsDir, 'unit_economics_model_1791554564167.jpg'),
    dest: path.join(outputDir, 'ai-income-system-unit-economics.webp'),
    maxWidth: 1400
  }
];

async function convert() {
  console.log("=== Converting Approved Images to Optimized WebP ===");
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
