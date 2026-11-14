# Permanent Business & Monetization Policy: Merchant Firewall

**Target Domain:** `petmedoutlet.com`  
**Effective Date:** Permanent / Mandatory Enforcement across all builds and AI agents

---

## 1. Absolute Blacklist: `1800petmeds.com` and `allivet.com`
Due to past WIPO court history regarding domain trade dress with 1-800-PetMeds, and Allivet's affiliate program denial, `petmedoutlet.com` must **NEVER** link to, redirect to, or refer visitors/bots to:
1. `1800petmeds.com` (including any subdomains, paths, or query parameters)
2. `allivet.com` (including any subdomains, paths, or query parameters)

### Invariants:
- **Zero Raw Outbound Links:** No HTML, Astro template, markdown content, or data file may contain `href` attributes pointing to `1800petmeds.com` or `allivet.com`.
- **Zero Redirect Endpoints:** Neither `CLEAN_REDIRECTS` nor `MONETIZED_REDIRECTS` in `tools/generate_redirects.mjs`, `src/data/redirects.json`, `public/_redirects`, or `public/_worker.js` may route to `1800petmeds.com` or `allivet.com`.
- **Automated Routing to Paying Partners:** Any legacy or benchmark slug referencing 1800petmeds or allivet (e.g. `/go/1800petmeds`, `/go/allivet`, or product comparison table rows) must route human traffic directly to authorized paying affiliate partners:
  * Flea/Tick/Heartworm/Rx medications -> **CanadaPetCare** (`https://www.dpbolvw.net/links/101905214/type/dlg/https://www.canadapetcare.com/`), **BudgetPetCare**, or **BestVetCare**.
  * Allergy/Joint/Supplements -> **Pet Optimum** (`awinmid=129683`) or CanadaPetCare.
  * Plant-based OTC -> **ALZOO** (`awinmid=124906`) or **Wondercide** (`awinmid=102533`).
- **Bot Defense:** Search crawlers and bot user-agents requesting `/go/1800petmeds` or `/go/allivet` must be redirected safely to internal high-value educational guides (such as `/pharmacies/cheapest-online-pet-pharmacy/` or `/pharmacies/allivet-reviews-complaints-alternatives/`) or an authorized neutral domain, NEVER to `1800petmeds.com` or `allivet.com`.

---

## 2. Table & Product Card Rendering Invariant
When displaying competitor comparison tables or product benchmark rows referencing 1-800-PetMeds, Allivet, Chewy, Walmart Pet Rx, Petco, or Local Vet Clinic:
- Treat visually as a **"High-Cost US Rx Benchmark"** or display a **"Requires US Clinic Rx"** badge.
- The action button must NOT link to the unmonetized/blacklisted competitor.
- The action button must say **"Beat This Price (No Vet Visit) →"** or **"Beat This Price (No Rx) →"** linking directly to `/go/canadapetcare` or an authorized partner (`/go/alzoo`, `/go/pet-optimum`).
