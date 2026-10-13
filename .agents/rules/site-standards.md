# Master Specification: Compact Keyword Authority Site Architecture

This specification codifies the standards, architectural patterns, defensive SEO rules, monetization protocols, and compliance requirements developed for our affiliate authority sites (e.g. `ugcdfy.com`, `fasttrackcreator.com`, and all future portfolio sites).

Every future site launched under this system MUST strictly adhere to these specifications.

---

## 1. Directory & Git Separation
* **Strict Directory Isolation:** Each site lives in its own dedicated directory with its own `.git` repository, `package.json`, `astro.config.mjs`, and `.env`.
* **Zero Cross-Contamination:** Never commit child site code into the workspace root repository or vice versa. The root `.gitignore` must ignore child site folders.

---

## 2. Site Hierarchy & Navigation (Compact Keyword Engine)
* **Keyword Strategy:** Programmatic, high-intent, low-competition commercial keywords structured around buyer intent and problem-solving personas.
* **Click Depth $\le 2$:** Every spoke page in the network must be reachable within 2 clicks from the homepage:
  * Click 0: Homepage (`/`)
  * Click 1: Hub Category Page (`/{category}/`) or Global Navigation
  * Click 2: Spoke Page (`/{category}/{slug}/`) or Commercial Review (`/reviews/{slug}/`)
* **Category Pillars:** 3 to 5 core topical pillars per site covering high-ticket, MRR, and automation tools.

---

## 3. Defensive On-Page SEO Rules
* **Strictly 1 `<h1>` per page:** Every layout, component, and page template must guarantee exactly one `<h1>`. Subsections must use `<h2>`, `<h3>`, etc.
* **Meta Description Length:** Strictly between **120 and 158 characters** (ideal Google SERP snippet display without truncation). Automated builds must validate this.
* **Absolute Canonical Tags:** Every page `<head>` must include `<link rel="canonical" href="https://{domain}{pathname}" />`.
* **Structured Data (Schema.org JSON-LD):**
  * Homepage: `WebSite` and `Organization` schemas.
  * Hub & Spoke Pages: `BreadcrumbList` and `WebPage` / `Review` / `Article` schemas.
  * Legal Pages: `AboutPage` on `/about/`, `ContactPage` on `/contact/`.
* **Zero Broken Links:** Automated `check-links.mjs` script must scan all static HTML files in `dist/` and fail the build if any internal link returns 404.
* **Custom 404 Recovery:** Return a true HTTP `404 Not Found` response with a custom recovery page (`/404.html`) guiding users back to hubs, never an SPA fallback with 200 OK.
* **Robots & Sitemaps:**
  * Clean `robots.txt` pointing to `https://{domain}/sitemap-index.xml`.
  * Postbuild script copying `sitemap-0.xml` to `sitemap.xml` for legacy crawler support.

---

## 4. Affiliate Monetization & Link Protocol
* **First-Party Cloaking:** NEVER hardcode raw external affiliate links in markdown, articles, or UI components. All outbound affiliate links must use first-party vanity redirects: `/go/{slug}`.
* **Crawler Shielding:**
  * `public/robots.txt` must include `Disallow: /go/`.
  * `public/_headers` must set `X-Robots-Tag: noindex, nofollow` on `/go/*`.
  * Outbound affiliate links must strictly carry `rel="nofollow noopener noreferrer"`.
* **High-Ticket & Recurring MRR Priority:**
  * Prioritize 30%–40% Lifetime Recurring MRR (Skool, Beacons) and high-ticket escrow/bounties ($80–$1,000+; Fameswap, Soldi/DFY Dave, Room30).
* **The Comparison Switch Strategy:** Target keywords for high-friction competitors (e.g., Stan Store's $29/mo mandatory fee) and convert users to superior, lower-friction partner tools with lifetime recurring commissions.

---

## 5. Mandatory Institutional Compliance Suite (5 Core Pages)
Every site must launch with the complete 5-page trust suite linked in the global footer:
1. **About Us (`/about/`):** Mission, core pillars, testing methodology, and zero paid placement guarantee.
2. **Contact Us (`/contact/`):** Central `contact@{domain}` email, 24–48h response SLA, and vendor audit request route.
3. **Privacy Policy (`/privacy-policy/`):** Full GDPR & CCPA compliance, disclosing Google Analytics 4 cookie usage and event telemetry.
4. **Terms of Service (`/terms-of-service/`):** User agreement, intellectual property protection, non-advisory disclaimer, and limitation of liability.
5. **Affiliate & Earnings Disclosure (`/affiliate-disclosure/`):** Full FTC 16 CFR Part 255 compliance detailing partner material connections and zero extra cost to the reader.
6. **Visible Footer FTC Notice:** Every page footer must display a clear, concise FTC disclosure snippet linking to the full disclosure and disclaimer.

---

## 6. Google Analytics 4 (GA4) & Outbound Event Tracking
* Dedicated GA4 Property and Web Data Stream per domain.
* Standard `gtag.js` asynchronous loader.
* Automated client-side event listener capturing all clicks on `/go/*` links and partner domains, emitting:
  ```javascript
  gtag('event', 'affiliate_click', {
    event_category: 'outbound_conversion',
    event_label: anchorText,
    destination_url: href,
    source_path: window.location.pathname
  });
  ```

---

## 7. Multi-Resolution Favicon & Branding Suite
Every site must generate and link the full Google-compliant icon suite in `<head>`:
* `/favicon.ico` (16px, 32px, 48px multi-size binary ICO)
* `/favicon.svg` (Scalable modern vector)
* `/favicon-48x48.png` (Required by Google Search SERP snippet crawler)
* `/favicon-32x32.png` & `/favicon-16x16.png` (Browser tabs)
* `/apple-touch-icon.png` (180x180 iOS Safari home screen)
* `/icon-192x192.png` & `/icon-512x512.png` (Android & PWA)
* `/site.webmanifest` (PWA metadata with brand theme color)

---

## 8. Cloudflare Edge Routing & Apex Canonicalization
* External DNS hosted on registrar (e.g. Namecheap) pointing `@` and `www` CNAME to `{project}.pages.dev`.
* Deploy an edge Worker (`public/_worker.js`) via Cloudflare Pages:
  ```javascript
  export default {
    async fetch(request, env) {
      const url = new URL(request.url);
      if (url.hostname.startsWith('www.')) {
        url.hostname = url.hostname.replace('www.', '');
        return Response.redirect(url.toString(), 301);
      }
      return env.ASSETS.fetch(request);
    }
  };
  ```
* Always deploy production builds to Cloudflare Pages with `--branch=main`:
  `npx wrangler pages deploy dist --project-name={project} --branch=main`

---

## 9. Search Engine Submission Protocols
* **Google Search Console (GSC):**
  * Service account `gsc-assistant@gsc-tools-511422.iam.gserviceaccount.com` added as `siteFullUser`.
  * Programmatic submission of `https://{domain}/sitemap-index.xml` via GSC API.
  * Programmatic URL inspection via GSC API to verify coverage and canonical matching.
* **IndexNow Protocol (Bing, Yahoo, Yandex):**
  * Generate 32-hex character key and host at `public/{key}.txt`.
  * Submit all XML sitemap URLs to `https://api.indexnow.org/indexnow` and `https://www.bing.com/indexnow` for immediate crawling.
