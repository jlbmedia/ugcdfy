import { HUBS, SPOKES, BRAND_NAME } from '../src/data/pages.ts';

let errors = 0;

console.log("=== Validating SEO Metadata Constraints ===");

// Check Hubs
for (const [key, hub] of Object.entries(HUBS)) {
  const descLen = hub.metaDescription.length;
  if (descLen < 120 || descLen > 158) {
    console.error(`❌ HUB [${key}] Meta Description invalid length: ${descLen} chars (Must be 120-158)`);
    console.error(`   "${hub.metaDescription}"`);
    errors++;
  } else {
    console.log(`✅ HUB [${key}] Meta Description: ${descLen} chars`);
  }

  if (!hub.title.endsWith(`| ${BRAND_NAME}`)) {
    console.error(`❌ HUB [${key}] Title Tag does not end with '| ${BRAND_NAME}': "${hub.title}"`);
    errors++;
  } else {
    console.log(`✅ HUB [${key}] Title format valid`);
  }
}

// Check Spokes
for (const spoke of SPOKES) {
  const descLen = spoke.metaDescription.length;
  if (descLen < 120 || descLen > 158) {
    console.error(`❌ SPOKE [${spoke.category}/${spoke.slug}] Meta Description invalid length: ${descLen} chars (Must be 120-158)`);
    console.error(`   "${spoke.metaDescription}"`);
    errors++;
  } else {
    console.log(`✅ SPOKE [${spoke.category}/${spoke.slug}] Meta Description: ${descLen} chars`);
  }

  if (!spoke.title.endsWith(`| ${BRAND_NAME}`)) {
    console.error(`❌ SPOKE [${spoke.category}/${spoke.slug}] Title does not end with '| ${BRAND_NAME}': "${spoke.title}"`);
    errors++;
  } else {
    console.log(`✅ SPOKE [${spoke.category}/${spoke.slug}] Title format valid`);
  }
}

if (errors > 0) {
  console.error(`\n❌ Failed with ${errors} SEO validation errors.`);
  process.exit(1);
} else {
  console.log(`\n🎉 All ${Object.keys(HUBS).length} Hubs and ${SPOKES.length} Spokes strictly satisfy all SEO rules!`);
}
