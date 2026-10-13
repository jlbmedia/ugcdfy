import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const match = envContent.match(/CLOUDFLARE_API_TOKEN=([^\r\n]+)/);
const token = match[1].trim();

async function cfFetch(endpoint) {
  const url = `https://api.cloudflare.com/client/v4${endpoint}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return await res.json();
}

async function main() {
  console.log('📡 Verifying token permissions...');
  const verifyRes = await cfFetch('/user/tokens/verify');
  console.log('Verify:', JSON.stringify(verifyRes, null, 2));

  console.log('\n📡 Listing all accounts...');
  const accountsRes = await cfFetch('/accounts');
  console.log('Accounts:', JSON.stringify(accountsRes, null, 2));

  console.log('\n📡 Listing all zones...');
  const zonesRes = await cfFetch('/zones');
  console.log('Zones:', JSON.stringify(zonesRes, null, 2));

  const accountId = '799589fb4e4f92d2afe04e898e8f617c';
  console.log('\n📡 Listing Pages projects for account...');
  const pagesRes = await cfFetch(`/accounts/${accountId}/pages/projects`);
  console.log('Pages projects:', JSON.stringify(pagesRes.result?.map(p => ({ name: p.name, domains: p.domains })), null, 2));
}

main().catch(console.error);
