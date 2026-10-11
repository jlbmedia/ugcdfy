import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// High-contrast, radiant emerald-to-cyan favicon design.
// Engineered to be immediately recognizable and vibrant on both dark and light browser tabs,
// in mobile bookmarks, and in Google Search SERP snippets.
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Radiant Emerald to Cyan Gradient -->
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="50%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>

    <!-- Deep Slate Core for Razor-Sharp Contrast -->
    <linearGradient id="glyphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>

    <!-- Star Accent -->
    <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#d1fae5"/>
    </linearGradient>

    <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Vibrant Emerald/Cyan Squircle (Max Visibility on Dark & Light Tabs) -->
  <rect x="20" y="20" width="472" height="472" rx="132" fill="url(#brandGrad)"/>

  <!-- Crisp Inner Polished Bevel -->
  <rect x="32" y="32" width="448" height="448" rx="120" fill="none" stroke="#ffffff" stroke-width="12" stroke-opacity="0.35"/>

  <!-- Bold Modern "U" Track (UGC) -->
  <path d="M 148 136
           L 148 276
           A 108 108 0 0 0 364 276
           L 364 136"
        fill="none"
        stroke="url(#glyphGrad)"
        stroke-width="56"
        stroke-linecap="round"
        stroke-linejoin="round"
        filter="url(#softGlow)"/>

  <!-- Centered Video / Media Play Triangle -->
  <polygon points="232,204 232,304 308,254"
           fill="url(#glyphGrad)"
           stroke="url(#glyphGrad)"
           stroke-width="16"
           stroke-linejoin="round"
           filter="url(#softGlow)"/>

  <!-- 4-Point AI Sparkle Star (Top Right) -->
  <path d="M 382 82
           Q 382 118 418 118
           Q 382 118 382 154
           Q 382 118 346 118
           Q 382 118 382 82 Z"
        fill="url(#starGrad)"/>
</svg>`;

function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  const dirSize = headerSize + entrySize * count;

  let currentOffset = dirSize;
  const entries = [];

  for (const item of pngBuffers) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(item.width === 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height === 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // image byte size
    entry.writeUInt32LE(currentOffset, 12); // image offset

    entries.push(entry);
    currentOffset += item.buffer.length;
  }

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(count, 4); // number of images

  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

async function main() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const svgBuf = Buffer.from(svgContent.trim());

  // 1. Save crisp scalable SVG
  const svgPath = path.join(publicDir, 'favicon.svg');
  fs.writeFileSync(svgPath, svgContent.trim());
  console.log(`✅ Saved: ${svgPath}`);

  // 2. Generate standard resolutions
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 }, // Explicitly recommended by Google Search
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'apple-touch-icon.png', size: 180 }, // iOS home screen
    { name: 'icon-192x192.png', size: 192 }, // Android PWA standard
    { name: 'icon-512x512.png', size: 512 }  // High-res PWA splash
  ];

  const generatedPngs = {};
  for (const s of sizes) {
    const outPath = path.join(publicDir, s.name);
    const buf = await sharp(svgBuf).resize(s.size, s.size).png().toBuffer();
    fs.writeFileSync(outPath, buf);
    generatedPngs[s.size] = buf;
    console.log(`✅ Generated: ${s.name} (${s.size}x${s.size}px)`);
  }

  // 3. Generate multi-size binary ICO file (16x16, 32x32, 48x48)
  const icoPath = path.join(publicDir, 'favicon.ico');
  const icoBuffer = buildIco([
    { width: 16, height: 16, buffer: generatedPngs[16] },
    { width: 32, height: 32, buffer: generatedPngs[32] },
    { width: 48, height: 48, buffer: generatedPngs[48] }
  ]);
  fs.writeFileSync(icoPath, icoBuffer);
  console.log(`✅ Generated multi-resolution binary favicon.ico (16px, 32px, 48px, ${icoBuffer.length} bytes)`);

  // 4. Generate webmanifest
  const manifest = {
    name: "UGC DFY - Turnkey Virtual UGC & AI Influencer Systems",
    short_name: "UGC DFY",
    description: "Enterprise and creator blueprints for AI influencer portfolios and faceless automation systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    icons: [
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  };
  const manifestPath = path.join(publicDir, 'site.webmanifest');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`✅ Saved: site.webmanifest`);
}

main().catch(err => {
  console.error('❌ Failed to generate favicons:', err);
  process.exit(1);
});
