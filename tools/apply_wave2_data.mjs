import fs from 'fs';
import path from 'path';

const pagesTsPath = path.resolve('src/data/pages.ts');
let content = fs.readFileSync(pagesTsPath, 'utf8');

// 1. Update HUBS spokeSlugs
content = content.replace(
  'spokeSlugs: ["for-agencies", "for-beginners", "for-creators", "for-freelancers", "for-startups"]',
  'spokeSlugs: ["for-agencies", "for-beginners", "for-creators", "for-freelancers", "for-startups", "for-realtors", "for-ecommerce", "for-fitness-coaches"]'
);

content = content.replace(
  'spokeSlugs: ["for-beginners", "for-teams", "for-introverts", "for-professionals"]',
  'spokeSlugs: ["for-beginners", "for-teams", "for-introverts", "for-professionals", "for-tiktok-shop", "for-youtube-shorts", "for-instagram-reels", "for-busy-executives", "for-teachers"]'
);

content = content.replace(
  'spokeSlugs: ["for-professionals", "for-parents", "for-accountants", "for-skeptics"]',
  'spokeSlugs: ["for-professionals", "for-parents", "for-accountants", "for-skeptics", "for-retirees"]'
);

content = content.replace(
  'spokeSlugs: ["room30-review", "greg-cooke-ai-portfolio"]',
  'spokeSlugs: ["room30-review", "greg-cooke-ai-portfolio", "room30-vs-dropshipping", "room30-vs-diy-faceless-channels", "room30-cost-and-pricing"]'
);

// 2. Read test_wave2_data.mjs to get the wave2Spokes array
const testDataPath = path.resolve('tools/test_wave2_data.mjs');
const testDataContent = fs.readFileSync(testDataPath, 'utf8');

// Extract the array text between "const wave2Spokes = [" and "];\n\nlet errors = 0;"
const arrayMatch = testDataContent.match(/const wave2Spokes = \[([\s\S]*?)\];\s*let errors/);
if (!arrayMatch) {
  throw new Error("Could not extract wave2Spokes array from test_wave2_data.mjs");
}

const wave2SpokesCode = arrayMatch[1].trim();

// Append to SPOKES in pages.ts right before the closing `];`
// Find the last index of `];`
const lastClosingBracket = content.lastIndexOf('];');
if (lastClosingBracket === -1) {
  throw new Error("Could not find closing bracket in pages.ts");
}

const beforeBracket = content.slice(0, lastClosingBracket).trimEnd();
const afterBracket = content.slice(lastClosingBracket);

// Ensure there is a comma after the previous element
const newContent = `${beforeBracket},

  // ==========================================
  // WAVE 2 COMPACT KEYWORD EXPANSION SPOKES
  // ==========================================
  ${wave2SpokesCode}
${afterBracket}`;

fs.writeFileSync(pagesTsPath, newContent);
console.log("✅ Successfully updated src/data/pages.ts with 12 Wave 2 Spokes and updated HUBS!");
