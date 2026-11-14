# Permanent Business & Monetization Policy: Merchant Firewall

**Target Domain:** `petmedoutlet.com`  
**Effective Date:** Permanent / Mandatory Enforcement across all builds and AI agents

---

## 1. Absolute Blacklist: Non-Partner Pet Dispensaries
Due to past WIPO court history regarding domain trade dress with 1-800-PetMeds, affiliate denials, and non-paying retail practices, `petmedoutlet.com` must **NEVER** link to, redirect to, or refer visitors/bots to:
1. `1800petmeds.com` / `petmeds.com` (including any subdomains, paths, or query parameters)
2. `allivet.com` (including any subdomains, paths, or query parameters)
3. `petcarerx.com` (including any subdomains, paths, or query parameters)
4. `tractorsupplyrx.com` (including any subdomains, paths, or query parameters)

We permit non-partner pet retailers to bid against each other inside our Google AdSense display auction units (so they pay us 68% publisher revenue share), but we NEVER send free outbound HTML `<a href>` links or direct referrals to them.

### Invariants:
- **Zero Raw Outbound Links:** No HTML, Astro template, markdown content, or data file may contain `href` attributes pointing to `1800petmeds.com`, `petmeds.com`, `allivet.com`, `petcarerx.com`, or `tractorsupplyrx.com`.
- **Zero Redirect Endpoints:** Neither `CLEAN_REDIRECTS` nor `MONETIZED_REDIRECTS` in `tools/generate_redirects.mjs`, `src/data/redirects.json`, `public/_redirects`, or `public/_worker.js` may route to any blacklisted domain.
- **Automated Routing to Paying Partners:** Any legacy or benchmark slug referencing these non-partners (e.g. `/go/1800petmeds`, `/go/allivet`, `/go/petcarerx`, or product comparison table rows) must route human traffic directly to authorized paying affiliate partners:
  * Flea/Tick/Heartworm/Rx medications -> **CanadaPetCare** (`https://www.dpbolvw.net/links/101905214/type/dlg/https://www.canadapetcare.com/`), **BudgetPetCare**, or **BestVetCare**.
  * Allergy/Joint/Supplements -> **Pet Optimum** (`awinmid=129683`) or CanadaPetCare.
  * Plant-based OTC -> **ALZOO** (`awinmid=124906`) or **Wondercide** (`awinmid=102533`).
- **Bot Defense:** Search crawlers and bot user-agents requesting `/go/1800petmeds`, `/go/allivet`, or `/go/petcarerx` must resolve to `https://www.canadapetcare.com/` or internal guides, NEVER to blacklisted external sites.

---

## 2. Table & Product Card Rendering Invariant
When displaying competitor comparison tables or product benchmark rows referencing 1-800-PetMeds, Allivet, Chewy, Walmart Pet Rx, Petco, or Local Vet Clinic:
- Treat visually as a **"High-Cost US Rx Benchmark"** or display a **"Requires US Clinic Rx"** badge.
- The action button must NOT link to the unmonetized/blacklisted competitor.
- The action button must say **"Beat This Price (No Vet Visit) →"** or **"Beat This Price (No Rx) →"** linking directly to `/go/canadapetcare` or an authorized partner (`/go/alzoo`, `/go/pet-optimum`).
