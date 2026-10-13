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

async function getAccessToken(scope) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: key.client_email,
    scope: scope,
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
  if (!res.ok) {
    throw new Error(JSON.stringify(tokenData));
  }
  return tokenData.access_token;
}

async function run() {
  const token = await getAccessToken('https://www.googleapis.com/auth/cloud-platform');
  console.log('Enabling analyticsadmin.googleapis.com...');
  const res = await fetch('https://serviceusage.googleapis.com/v1/projects/gsc-tools-511422/services/analyticsadmin.googleapis.com:enable', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Status:', res.status);
  console.log('Response:', await res.text());
}

run().catch(console.error);
