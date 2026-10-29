import https from 'node:https';
import fs from 'node:fs';

const login = process.env.DATAFORSEO_LOGIN || "joseph@carepathcompare.com";
const password = process.env.DATAFORSEO_PASSWORD || "f4291303ee635792";
const auth = Buffer.from(`${login}:${password}`).toString('base64');

const keywordsToResearch = [
  // 1. Brand, Legitimacy & Reviews
  "fameswap",
  "fameswap review",
  "fameswap reviews",
  "is fameswap legit",
  "is fameswap safe",
  "fameswap legit",
  "fameswap fees",
  "fameswap escrow",
  "how does fameswap work",
  "fameswap coupon",
  "fameswap discount",
  "fameswap alternatives",
  "fameswap vs swapd",
  "fameswap vs playerup",
  "fameswap trustpilot",

  // 2. YouTube Channel Buying (High-Ticket & Turnkey)
  "buy youtube channel",
  "buy monetized youtube channel",
  "buy youtube channel with subscribers",
  "buy youtube channel with 100k subscribers",
  "buy youtube channel with 10k subscribers",
  "buy youtube channel with 1000 subscribers",
  "buy cheap youtube channel",
  "where to buy youtube channels",
  "best place to buy youtube channel",
  "buy youtube account with monetization",
  "buy aged youtube channel",
  "how to buy a youtube channel",
  "how to buy a monetized youtube channel",
  "buy youtube channel safe",
  "buy faceless youtube channel",
  "buy youtube automation channel",
  "youtube channel marketplace",
  "sell youtube channel",
  "how much to sell youtube channel",

  // 3. Instagram Account Buying & Theme Pages
  "buy instagram account",
  "buy instagram account with followers",
  "buy aged instagram accounts",
  "buy instagram theme page",
  "buy theme page",
  "buy instagram account with 100k followers",
  "buy instagram account with 10k followers",
  "buy instagram account with 50k followers",
  "where to buy instagram accounts",
  "best place to buy instagram accounts",
  "buy verified instagram account",
  "buy real instagram account",
  "buy instagram account cheap",
  "how to buy an instagram account safely",
  "buy active instagram account",
  "buy instagram accounts for business",
  "instagram account marketplace",
  "sell instagram account",
  "best site to sell instagram account",

  // 4. TikTok Account Buying (Creator Rewards, Shop, Live)
  "buy tiktok account",
  "buy monetized tiktok account",
  "buy tiktok account with 10k followers",
  "buy tiktok account with 1000 followers",
  "buy tiktok account with 50k followers",
  "buy tiktok creator rewards account",
  "buy tiktok creator fund account",
  "buy tiktok account with live stream",
  "buy tiktok shop account",
  "where to buy tiktok accounts",
  "best site to buy tiktok accounts",
  "best place to buy tiktok accounts",
  "buy aged tiktok account",
  "buy cheap tiktok account",
  "how to buy a tiktok account",
  "how to buy a monetized tiktok account",
  "tiktok account marketplace",
  "sell tiktok account",

  // 5. General Social Account Marketplaces & Escrow
  "social media account marketplace",
  "buy and sell social media accounts",
  "buy social media accounts",
  "buy social media accounts with followers",
  "escrow for social media accounts",
  "safest way to buy social media accounts",
  "playerup vs fameswap",
  "swapd alternatives",
  "playerup alternatives"
];

console.log(`Total keywords to query with DataForSEO: ${keywordsToResearch.length}`);

async function fetchVolume(keywordsChunk) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify([{
      keywords: keywordsChunk,
      location_name: "United States",
      language_name: "English"
    }]);

    const req = https.request({
      hostname: 'api.dataforseo.com',
      path: '/v3/keywords_data/google_ads/search_volume/live',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function run() {
  const results = [];
  const chunkSize = 50;

  for (let i = 0; i < keywordsToResearch.length; i += chunkSize) {
    const chunk = keywordsToResearch.slice(i, i + chunkSize);
    console.log(`Querying batch ${Math.floor(i / chunkSize) + 1} (${chunk.length} keywords)...`);
    const resp = await fetchVolume(chunk);

    if (resp.tasks && resp.tasks[0] && resp.tasks[0].result) {
      for (const item of resp.tasks[0].result) {
        results.push({
          keyword: item.keyword,
          search_volume: item.search_volume || 0,
          cpc: item.cpc || 0,
          competition: item.competition || "LOW",
          competition_index: item.competition_index || 0,
          monthly_searches: item.monthly_searches || []
        });
      }
    } else {
      console.error('Unexpected response:', JSON.stringify(resp).slice(0, 300));
    }
  }

  // Sort by search_volume DESC, then CPC DESC
  results.sort((a, b) => b.search_volume - a.search_volume || b.cpc - a.cpc);

  fs.writeFileSync('tools/fameswap_dataforseo_results.json', JSON.stringify(results, null, 2));
  console.log(`\nSuccessfully saved ${results.length} keywords to tools/fameswap_dataforseo_results.json`);

  console.log('\n=============================================================');
  console.log('🔥 TOP 35 FAMESWAP & ACCOUNT MARKETPLACE KEYWORDS BY VOLUME');
  console.log('=============================================================');
  results.slice(0, 35).forEach((r, idx) => {
    console.log(`${(idx + 1).toString().padStart(2, ' ')}. "${r.keyword}" | Vol: ${r.search_volume.toLocaleString()}/mo | CPC: $${r.cpc.toFixed(2)} | Comp: ${r.competition} (${r.competition_index})`);
  });

  // Filter by High-Value CPC ($2.00+)
  const highCpc = results.filter(r => r.cpc >= 2.0 && r.search_volume >= 50);
  console.log('\n=============================================================');
  console.log('💰 HIGH-INTENT / HIGH CPC OPPORTUNITIES ($2.00+ CPC, Vol >= 50)');
  console.log('=============================================================');
  highCpc.forEach((r, idx) => {
    console.log(`${(idx + 1).toString().padStart(2, ' ')}. "${r.keyword}" | Vol: ${r.search_volume.toLocaleString()}/mo | CPC: $${r.cpc.toFixed(2)} | Comp: ${r.competition}`);
  });

  // Filter by Brand / Legitimacy
  const brandTerms = results.filter(r => r.keyword.includes('fameswap') || r.keyword.includes('safe') || r.keyword.includes('legit') || r.keyword.includes('review'));
  console.log('\n=============================================================');
  console.log('🛡️ BRAND & DEFENSIVE ESCROW INTENT KEYWORDS');
  console.log('=============================================================');
  brandTerms.forEach((r, idx) => {
    console.log(`${(idx + 1).toString().padStart(2, ' ')}. "${r.keyword}" | Vol: ${r.search_volume.toLocaleString()}/mo | CPC: $${r.cpc.toFixed(2)}`);
  });
}

run().catch(console.error);
