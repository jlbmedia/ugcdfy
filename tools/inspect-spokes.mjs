import fs from 'fs';
import crypto from 'crypto';

const key = JSON.parse(fs.readFileSync('gsc-key.json', 'utf8'));

function base64url(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAccessToken() {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedClaim = base64url(JSON.stringify(claim));
  const signInput = `${encodedHeader}.${encodedClaim}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signInput);
  const signature = signer.sign(key.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${signInput}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  const tokenData = await res.json();
  return tokenData.access_token;
}

const sampleUrls = [
  'https://ugcdfy.com/ai-influencers/for-beginners/',
  'https://ugcdfy.com/reviews/dfy-dave-monetized-youtube-channel/',
  'https://ugcdfy.com/reviews/room30-review/',
  'https://ugcdfy.com/faceless-automation/monetized-channels-for-busy-executives/',
  'https://ugcdfy.com/reviews/'
];

async function inspectSpokes() {
  const token = await getAccessToken();
  const siteUrl = 'sc-domain:ugcdfy.com';

  console.log(`🔍 Inspecting ${sampleUrls.length} key URLs in Google index...`);

  for (const url of sampleUrls) {
    const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inspectionUrl: url,
        siteUrl: siteUrl
      })
    });

    if (res.ok) {
      const data = await res.json();
      const status = data.inspectionResult?.indexStatusResult;
      console.log(`\nURL: ${url}`);
      console.log(`  Verdict: ${status?.verdict || 'UNSPECIFIED'}`);
      console.log(`  Coverage: ${status?.coverageState || 'Not yet indexed / in crawl queue'}`);
      console.log(`  Last Crawl: ${status?.lastCrawlTime || 'Not yet crawled'}`);
      console.log(`  Robots.txt: ${status?.robotsTxtState || 'ALLOWED'}`);
      console.log(`  Canonical (Google): ${status?.googleCanonical || 'Pending'}`);
    } else {
      console.error(`Error inspecting ${url}: ${res.status} ${await res.text()}`);
    }
  }
}

inspectSpokes().catch(console.error);
