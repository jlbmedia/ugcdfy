import https from 'node:https';
import fs from 'node:fs';

const login = process.env.DATAFORSEO_LOGIN || "joseph@carepathcompare.com";
const password = process.env.DATAFORSEO_PASSWORD || "f4291303ee635792";
const auth = Buffer.from(`${login}:${password}`).toString('base64');

const deepKeywords = [
  // TikTok Shop & Ecommerce
  "buy tiktok shop account",
  "buy tiktok shop affiliate account",
  "buy tiktok account for shop",
  "tiktok shop accounts for sale",
  "buy 5k follower tiktok account",
  "buy tiktok account with 5000 followers",
  "buy tiktok account for dropshipping",
  "buy tiktok account for affiliate marketing",
  "buy us tiktok account",
  "buy uk tiktok account",
  "buy tiktok account with creator rewards",

  // Instagram Theme Pages & Niches
  "buy instagram theme page",
  "instagram theme pages for sale",
  "buy meme page",
  "buy meme account",
  "buy luxury instagram page",
  "buy fitness instagram account",
  "buy aesthetic instagram account",
  "buy instagram account for dropshipping",
  "buy niche instagram accounts",
  "theme pages for sale",
  "how to buy instagram theme page",

  // YouTube Channel Niches & Types
  "buy monetized youtube channel",
  "monetized youtube channels for sale",
  "buy youtube channel with monetization enabled",
  "buy faceless youtube channel",
  "buy cash cow youtube channel",
  "buy gaming youtube channel",
  "buy established youtube channel",
  "buy youtube channel with active subscribers",
  "buy automated youtube channel",
  "youtube channels for sale with revenue",

  // Competitor & Platform Comparisons
  "fameswap vs swapd",
  "fameswap vs midman",
  "fameswap vs accs market",
  "fameswap vs sebuda",
  "fameswap vs viralhq",
  "fameswap vs playerup",
  "fameswap reddit",
  "fameswap reviews reddit",
  "is fameswap safe reddit",

  // Seller & Flipping Intent
  "how to sell on fameswap",
  "how to sell instagram account on fameswap",
  "how to sell tiktok account on fameswap",
  "how to sell youtube channel on fameswap",
  "fameswap seller fees",
  "how long does fameswap take to payout",
  "fameswap escrow process",
  "social media account flipping"
];

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
  const resp = await fetchVolume(deepKeywords);
  const results = [];
  if (resp.tasks && resp.tasks[0] && resp.tasks[0].result) {
    for (const item of resp.tasks[0].result) {
      results.push({
        keyword: item.keyword,
        search_volume: item.search_volume || 0,
        cpc: item.cpc || 0,
        competition: item.competition || "LOW",
        competition_index: item.competition_index || 0
      });
    }
  }

  results.sort((a, b) => b.search_volume - a.search_volume || b.cpc - a.cpc);
  console.log('\n=============================================================');
  console.log('💎 DEEP NICHE & COMPARISON KEYWORDS FOR FAMESWAP');
  console.log('=============================================================');
  results.forEach((r, idx) => {
    console.log(`${(idx + 1).toString().padStart(2, ' ')}. "${r.keyword}" | Vol: ${r.search_volume.toLocaleString()}/mo | CPC: $${r.cpc.toFixed(2)} | Comp: ${r.competition}`);
  });
}

run().catch(console.error);
