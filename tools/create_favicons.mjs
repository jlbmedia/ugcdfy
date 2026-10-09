import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="50%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#a7f3d0"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background Squircle -->
  <rect x="24" y="24" width="464" height="464" rx="116" fill="url(#bgGrad)" stroke="url(#emeraldGrad)" stroke-width="16"/>

  <!-- Subtle Inner Ambient Glow -->
  <circle cx="256" cy="256" r="140" fill="#10b981" opacity="0.12" filter="url(#glow)"/>

  <!-- Bold Modern "U" Track (UGC) -->
  <path d="M 152 144
           L 152 284
           A 104 104 0 0 0 360 284
           L 360 144"
        fill="none"
        stroke="url(#emeraldGrad)"
        stroke-width="52"
        stroke-linecap="round"
        stroke-linejoin="round"/>

  <!-- Centered Play Triangle (Video & Media Engine) -->
  <polygon points="236,212 236,300 300,256"
           fill="url(#emeraldGrad)"
           stroke="url(#emeraldGrad)"
           stroke-width="12"
           stroke-linejoin="round"/>

  <!-- AI Sparkle / Star (Top Right) -->
  <path d="M 390 100
           Q 390 125 415 125
           Q 390 125 390 150
           Q 390 125 365 125
           Q 390 125 390 100 Z"
        fill="url(#sparkleGrad)"/>
</svg>`;

async function main() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Write favicon.svg
  const svgPath = path.join(publicDir, 'favicon.svg');
  fs.writeFileSync(svgPath, svgContent.trim());
  console.log(`Saved: ${svgPath}`);

  // 2. Generate Apple Touch Icon (180x180)
  const appleTouchPath = path.join(publicDir, 'apple-touch-icon.png');
  await sharp(Buffer.from(svgContent))
    .resize(180, 180)
    .png()
    .toFile(appleTouchPath);
  console.log(`Saved: ${appleTouchPath}`);

  // 3. Generate 32x32 PNG favicon
  const favicon32Path = path.join(publicDir, 'favicon-32x32.png');
  await sharp(Buffer.from(svgContent))
    .resize(32, 32)
    .png()
    .toFile(favicon32Path);
  console.log(`Saved: ${favicon32Path}`);

  // 4. Generate 16x16 PNG favicon
  const favicon16Path = path.join(publicDir, 'favicon-16x16.png');
  await sharp(Buffer.from(svgContent))
    .resize(16, 16)
    .png()
    .toFile(favicon16Path);
  console.log(`Saved: ${favicon16Path}`);

  // 5. Generate standard favicon.ico (using 32x32 png as fallback standard)
  const faviconIcoPath = path.join(publicDir, 'favicon.ico');
  await sharp(Buffer.from(svgContent))
    .resize(48, 48)
    .png()
    .toFile(faviconIcoPath);
  console.log(`Saved: ${faviconIcoPath} (48x48 PNG container)`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
