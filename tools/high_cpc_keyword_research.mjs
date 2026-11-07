import https from 'node:https';

const login = process.env.DATAFORSEO_LOGIN || "joseph@carepathcompare.com";
const password = process.env.DATAFORSEO_PASSWORD || "f4291303ee635792";
const auth = Buffer.from(`${login}:${password}`).toString('base64');

const candidateKeywords = [
  // 1. Community & Creator Platforms (SaaS / High Recurring Affiliate)
  "skool review",
  "skool pricing",
  "skool vs circle",
  "skool vs kajabi",
  "skool vs mighty networks",
  "skool alternatives",
  "circle vs skool",
  "kajabi vs skool",
  "best community platform for creators",
  "whop vs skool",
  "whop review",
  "whop marketplace review",
  "whop vs gumroad",

  // 2. Creator Storefronts & In-Bio Monetization
  "stan store alternative",
  "stan store alternatives",
  "stan store review",
  "stan store pricing",
  "stan store vs linktree",
  "beacons vs linktree",
  "beacons ai review",
  "best link in bio for digital products",

  // 3. AI Influencer & Virtual UGC Services (Enterprise / High Ticket)
  "ai influencer agency",
  "create ai influencer",
  "ai influencer generator",
  "virtual influencer agency",
  "ai ugc agency",
  "ai ugc generator",
  "ai model generator",
  "hire ai influencer",
  "ai avatar for marketing",
  "virtual model agency",
  "ai video spokesperson",

  // 4. Video Automation & Monetized Channel Services (DFY High Ticket)
  "youtube automation services",
  "youtube automation agency",
  "faceless youtube automation",
  "faceless youtube channel service",
  "youtube cash cow service",
  "buy cash cow channel",
  "youtube automation cost",
  "buy youtube channel with adsense",
  "buy monetized youtube channel",
  "buy established youtube channel",
  "buy aged youtube channel",

  // 5. TikTok Monetization & Account Acquisition
  "buy monetized tiktok account",
  "buy tiktok shop account",
  "buy verified tiktok account",
  "buy aged tiktok account",
  "tiktok automation agency",
  "tiktok shop agency",
  "tiktok shop affiliate management",

  // 6. Fanvue & Adult/Exclusive AI Monetization (High LTV Fan Subscriptions)
  "fanvue review",
  "fanvue vs onlyfans",
  "fanvue ai",
  "is fanvue legit",
  "fanvue agency",
  "fanvue creator",

  // 7. Social Media Account Brokers & Marketplaces
  "buy verified instagram account",
  "buy aged instagram account",
  "buy instagram account with followers",
  "social media account broker",
  "swapd review",
  "playerup review",
  "social tradia review",
  "sites like fameswap"
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
  console.log(`Sending ${candidateKeywords.length} candidate keywords to DataForSEO Google Ads live search volume endpoint...`);
  const resp = await fetchVolume(candidateKeywords);
  const results = [];
  if (resp.tasks && resp.tasks[0] && resp.tasks[0].result) {
    for (const item of resp.tasks[0].result) {
      results.push({
        keyword: item.keyword,
        search_volume: item.search_volume || 0,
        cpc: item.cpc || 0,
        competition: item.competition || "LOW",
        competition_index: item.competition_index || 0,
        low_top_of_page_bid: item.low_top_of_page_bid || 0,
        high_top_of_page_bid: item.high_top_of_page_bid || 0
      });
    }
  }

  // Filter out zero volume if desired, but keep any with CPC > 0 or search volume > 10
  const active = results.filter(r => r.search_volume > 0 || r.cpc > 0);

  // Sort primarily by CPC descending, secondary by search volume
  active.sort((a, b) => b.cpc - a.cpc || b.search_volume - a.search_volume);

  console.log('\n========================================================================================');
  console.log('🏆 HIGH-CPC KEYWORD RESEARCH RESULTS (SORTED BY CPC DESCENDING)');
  console.log('========================================================================================\n');
  console.log(
    'Rank'.padEnd(5) +
    'Keyword'.padEnd(40) +
    'CPC'.padEnd(10) +
    'High Bid'.padEnd(12) +
    'Search Vol'.padEnd(14) +
    'Comp'.padEnd(8)
  );
  console.log('-'.repeat(88));

  active.forEach((r, idx) => {
    console.log(
      (idx + 1).toString().padEnd(5) +
      r.keyword.padEnd(40) +
      (`$` + r.cpc.toFixed(2)).padEnd(10) +
      (`$` + r.high_top_of_page_bid.toFixed(2)).padEnd(12) +
      (r.search_volume.toLocaleString() + `/mo`).padEnd(14) +
      r.competition.padEnd(8)
    );
  });

  // Also print sorted by volume for keywords with CPC >= $3.00
  console.log('\n========================================================================================');
  console.log('💎 SWEET SPOT: HIGH CPC (>= $3.00) & ACTIVE SEARCH VOLUME (SORTED BY VOLUME)');
  console.log('========================================================================================\n');

  const sweetSpot = active.filter(r => r.cpc >= 3.00 && r.search_volume >= 50);
  sweetSpot.sort((a, b) => b.search_volume - a.search_volume || b.cpc - a.cpc);

  sweetSpot.forEach((r, idx) => {
    console.log(
      (idx + 1).toString().padEnd(5) +
      r.keyword.padEnd(40) +
      (`$` + r.cpc.toFixed(2)).padEnd(10) +
      (`$` + r.high_top_of_page_bid.toFixed(2)).padEnd(12) +
      (r.search_volume.toLocaleString() + `/mo`).padEnd(14) +
      r.competition.padEnd(8)
    );
  });
}

run().catch(console.error);
