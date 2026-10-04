import https from 'node:https';

const login = process.env.DATAFORSEO_LOGIN || "joseph@carepathcompare.com";
const password = process.env.DATAFORSEO_PASSWORD || "f4291303ee635792";
const auth = Buffer.from(`${login}:${password}`).toString('base64');

const bofuTerms = [
  "ai influencer generator",
  "ai influencer software",
  "faceless ai video generator",
  "faceless youtube automation software",
  "ai influencer creator",
  "faceless channel software",
  "ai income system",
  "ai passive income software",
  "faceless content generator",
  "ai side hustle software"
];

const modifiers = [
  "agencies",
  "freelancers",
  "beginners",
  "creators",
  "startups",
  "teams",
  "introverts",
  "professionals",
  "parents",
  "accountants"
];

// Generate compact keywords
const candidateKeywords = [];
for (const bofu of bofuTerms) {
  for (const mod of modifiers) {
    candidateKeywords.push(`${bofu} for ${mod}`);
  }
}

// Also include base BOFU terms and common buyer variations
const coreTerms = [
  "ai influencer generator",
  "faceless ai influencer",
  "faceless ai channel",
  "faceless youtube automation",
  "ai influencer software",
  "faceless ai video software",
  "ai income generator",
  "done for you ai business"
];

const allKeywords = [...coreTerms, ...candidateKeywords];

console.log(`Total keywords to test: ${allKeywords.length}`);

// Batch in chunks of 50
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
  for (let i = 0; i < allKeywords.length; i += chunkSize) {
    const chunk = allKeywords.slice(i, i + chunkSize);
    console.log(`Querying batch ${i / chunkSize + 1} (${chunk.length} keywords)...`);
    const resp = await fetchVolume(chunk);
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
  }

  console.log(`\n--- Results Analysis ---`);
  // Sort by search volume descending
  results.sort((a, b) => b.search_volume - a.search_volume || b.cpc - a.cpc);
  
  import('node:fs').then(fs => {
    fs.writeFileSync('tools/dataforseo_results.json', JSON.stringify(results, null, 2));
    console.log(`Saved ${results.length} keyword metrics to tools/dataforseo_results.json`);
  });
}

run().catch(console.error);
