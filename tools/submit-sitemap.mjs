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

async function submitSitemap(siteUrl, feedUrl) {
  const token = await getAccessToken();

  console.log(`📡 Submitting sitemap: ${feedUrl} to property ${siteUrl}...`);
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(feedUrl)}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  if (res.status === 204 || res.status === 200) {
    console.log(`✅ Sitemap successfully submitted: ${feedUrl}`);
  } else {
    console.error(`❌ Failed to submit sitemap (${res.status}): ${await res.text()}`);
  }

  // Fetch all sitemaps
  const listRes = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  const listData = await listRes.json();
  console.log(`📋 Updated Sitemaps list in GSC for ${siteUrl}:`);
  console.log(JSON.stringify(listData, null, 2));
}

const targetSite = process.argv[2] || 'sc-domain:fasttrackcreator.com';
const targetFeed = process.argv[3] || 'https://fasttrackcreator.com/sitemap-index.xml';

submitSitemap(targetSite, targetFeed).catch(console.error);
