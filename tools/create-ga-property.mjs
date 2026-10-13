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
    scope: 'https://www.googleapis.com/auth/analytics.edit',
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
  const token = await getAccessToken();

  // 1. Inspect UGCDFY property settings
  const ugcdfyRes = await fetch('https://analyticsadmin.googleapis.com/v1beta/properties/558278797', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const ugcdfyData = await ugcdfyRes.json();
  console.log('UGCDFY template settings:', JSON.stringify(ugcdfyData, null, 2));

  const timeZone = ugcdfyData.timeZone || 'America/New_York';
  const currencyCode = ugcdfyData.currencyCode || 'USD';
  const industryCategory = ugcdfyData.industryCategory || 'BUSINESS_AND_INDUSTRIAL_MARKETS';

  // 2. Check if Fast Track Creator property already exists
  const listPropsRes = await fetch('https://analyticsadmin.googleapis.com/v1beta/properties?filter=parent:accounts/400769332', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const listPropsData = await listPropsRes.json();
  let existingProp = listPropsData.properties?.find(p => p.displayName.toLowerCase().includes('fast track'));

  let propertyName;
  if (existingProp) {
    console.log(`Found existing Fast Track Creator property: ${existingProp.name}`);
    propertyName = existingProp.name;
  } else {
    console.log('Creating new GA4 property: Fast Track Creator...');
    const createPropRes = await fetch('https://analyticsadmin.googleapis.com/v1beta/properties', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        parent: 'accounts/400769332',
        displayName: 'Fast Track Creator',
        timeZone,
        currencyCode,
        industryCategory
      })
    });

    if (!createPropRes.ok) {
      throw new Error(`Failed to create property: ${createPropRes.status} ${await createPropRes.text()}`);
    }

    const createdProp = await createPropRes.json();
    console.log('Created property:', JSON.stringify(createdProp, null, 2));
    propertyName = createdProp.name;
  }

  // 3. List data streams or create one
  console.log(`Checking data streams for ${propertyName}...`);
  const streamsRes = await fetch(`https://analyticsadmin.googleapis.com/v1beta/${propertyName}/dataStreams`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const streamsData = await streamsRes.json();
  console.log('Existing streams:', JSON.stringify(streamsData, null, 2));

  let webStream = streamsData.dataStreams?.find(s => s.type === 'WEB_DATA_STREAM');
  if (!webStream) {
    console.log('Creating Web Data Stream for fasttrackcreator.com...');
    const createStreamRes = await fetch(`https://analyticsadmin.googleapis.com/v1beta/${propertyName}/dataStreams`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'WEB_DATA_STREAM',
        displayName: 'Fast Track Creator Web',
        webStreamData: {
          defaultUri: 'https://fasttrackcreator.com'
        }
      })
    });

    if (!createStreamRes.ok) {
      throw new Error(`Failed to create data stream: ${createStreamRes.status} ${await createStreamRes.text()}`);
    }

    webStream = await createStreamRes.json();
    console.log('Created web stream:', JSON.stringify(webStream, null, 2));
  }

  const measurementId = webStream.webStreamData?.measurementId;
  console.log(`\n🎉 SUCCESS! Measurement ID: ${measurementId}`);
  return { propertyName, measurementId };
}

run().catch(console.error);
