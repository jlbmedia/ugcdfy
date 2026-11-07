import https from 'node:https';

const login = process.env.DATAFORSEO_LOGIN || "joseph@carepathcompare.com";
const password = process.env.DATAFORSEO_PASSWORD || "f4291303ee635792";
const auth = Buffer.from(`${login}:${password}`).toString('base64');

const deepKeywords = [
  // Skool clusters
  "skool community review",
  "skool games review",
  "skool platform",
  "skool app review",
  "skool affiliate program",
  "skool recurring commission",
  "circle so review",
  "circle vs mighty networks",
  "skool vs discord",
  "best paid community platform",

  // AI Influencer & Generator clusters
  "how to create an ai influencer",
  "best ai influencer generator",
  "ai model generator free",
  "ai influencer tools",
  "virtual influencer generator",
  "ai model agency contract",
  "ai influencer course",
  "ai ugc video generator",
  "ai ugc creator tools",

  // TikTok Shop Agency & Monetization
  "tiktok shop agency account",
  "buy tiktok agency account",
  "tiktok shop automation",
  "tiktok shop affiliate for beginners",
  "tiktok creator rewards rpm",
  "how to buy a tiktok shop account",
  "tiktok shop affiliate requirements"
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
        competition_index: item.competition_index || 0,
        high_top_of_page_bid: item.high_top_of_page_bid || 0
      });
    }
  }

  results.sort((a, b) => b.cpc - a.cpc || b.search_volume - a.search_volume);

  console.log('\n========================================================================================');
  console.log('🔥 DEEP HIGH-CPC DRILLDOWN RESULTS');
  console.log('========================================================================================\n');
  results.forEach((r, idx) => {
    console.log(
      (idx + 1).toString().padEnd(4) +
      r.keyword.padEnd(40) +
      (`$` + r.cpc.toFixed(2)).padEnd(10) +
      (`$` + r.high_top_of_page_bid.toFixed(2)).padEnd(12) +
      (r.search_volume.toLocaleString() + `/mo`).padEnd(14) +
      r.competition.padEnd(8)
    );
  });
}

run().catch(console.error);
