import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Load Service Account Key
const keyPath = fs.existsSync('gsc-key.json') ? 'gsc-key.json' : 'gsc-key.json.json';
if (!fs.existsSync(keyPath)) {
  console.error('❌ Service account key file not found');
  process.exit(1);
}

const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

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

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to obtain access token: ${res.status} ${errText}`);
  }

  const tokenData = await res.json();
  return tokenData.access_token;
}

async function run() {
  console.log(`🔐 Authenticating as: ${key.client_email}`);
  const token = await getAccessToken();
  console.log('✅ Access token obtained successfully!');

  // 1. List accessible sites
  console.log('\n📡 Fetching accessible sites in Google Search Console...');
  const sitesRes = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  if (!sitesRes.ok) {
    console.error(`❌ Error fetching sites: ${sitesRes.status} ${await sitesRes.text()}`);
    return;
  }

  const sitesData = await sitesRes.json();
  console.log('📋 Verified sites:', JSON.stringify(sitesData, null, 2));

  // Determine siteUrl format
  const sites = sitesData.siteEntry || [];
  let targetSite = sites.find(s => s.siteUrl.includes('ugcdfy.com'))?.siteUrl;

  if (!targetSite) {
    console.warn('⚠️ No site containing "ugcdfy.com" found in permissions list. Available:', sites.map(s => s.siteUrl));
    return;
  }

  console.log(`\n🎯 Target property: ${targetSite}`);

  // 2. Fetch sitemaps
  console.log('\n🗺️ Fetching submitted sitemaps...');
  const sitemapsRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(targetSite)}/sitemaps`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const sitemapsData = await sitemapsRes.json();
  console.log('Sitemaps list:', JSON.stringify(sitemapsData, null, 2));

  // 3. Inspect target URLs (e.g. root and www)
  const testUrls = [
    'https://ugcdfy.com/',
    'https://www.ugcdfy.com/',
    'http://ugcdfy.com/'
  ];

  for (const testUrl of testUrls) {
    console.log(`\n🔍 Inspecting URL: ${testUrl}`);
    const inspectRes = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inspectionUrl: testUrl,
        siteUrl: targetSite
      })
    });

    if (inspectRes.ok) {
      const inspectData = await inspectRes.json();
      const result = inspectData.inspectionResult;
      console.log(`Verdict: ${result?.indexStatusResult?.verdict}`);
      console.log(`Coverage: ${result?.indexStatusResult?.coverageState}`);
      console.log(`User Canonical: ${result?.indexStatusResult?.userCanonical}`);
      console.log(`Google Canonical: ${result?.indexStatusResult?.googleCanonical}`);
      console.log(`Crawled As: ${result?.indexStatusResult?.crawledAs}`);
      console.log(`Last Crawl Time: ${result?.indexStatusResult?.lastCrawlTime}`);
    } else {
      console.error(`Inspection error: ${inspectRes.status} ${await inspectRes.text()}`);
    }
  }
}

run().catch(err => console.error('Fatal:', err));
