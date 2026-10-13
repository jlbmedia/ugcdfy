import fs from 'fs';

// Parse .env
const envContent = fs.readFileSync('.env', 'utf8');
const match = envContent.match(/CLOUDFLARE_API_TOKEN=([^\r\n]+)/);
if (!match) {
  console.error('❌ CLOUDFLARE_API_TOKEN not found in .env');
  process.exit(1);
}
const token = match[1].trim();

async function cfFetch(endpoint, options = {}) {
  const url = `https://api.cloudflare.com/client/v4${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
}

async function main() {
  console.log('📡 Querying Cloudflare for zone ugcdfy.com...');
  const zoneRes = await cfFetch('/zones?name=ugcdfy.com');
  
  if (!zoneRes.ok || !zoneRes.data.result?.length) {
    console.error('❌ Failed to find zone ugcdfy.com:', JSON.stringify(zoneRes.data, null, 2));
    return;
  }

  const zone = zoneRes.data.result[0];
  const zoneId = zone.id;
  console.log(`✅ Found Zone: ${zone.name} (ID: ${zoneId})`);

  // Check existing rulesets for http_request_dynamic_redirect
  console.log('\n🔍 Fetching zone rulesets...');
  const rulesetsRes = await cfFetch(`/zones/${zoneId}/rulesets`);
  console.log('Rulesets:', JSON.stringify(rulesetsRes.data.result?.map(r => ({ id: r.id, phase: r.phase, name: r.name })), null, 2));

  // Check existing page rules
  console.log('\n🔍 Fetching page rules...');
  const pageRulesRes = await cfFetch(`/zones/${zoneId}/pagerules`);
  console.log('Page Rules:', JSON.stringify(pageRulesRes.data.result, null, 2));
}

main().catch(console.error);
