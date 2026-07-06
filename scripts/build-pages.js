/**
 * build-pages.js — one-time authoring generator (emits pure static HTML into
 * /public). Not a deploy-time build: committed HTML is what ships, so the site
 * still deploys with `npx wrangler deploy` alone. Re-run after content changes:
 *   node scripts/build-pages.js
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, CONTACT, FONTS, header, footer } from "./chrome.js";
import { PAGES } from "./content.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const OG_IMAGE = SITE + "/images/hero/slider_1.jpg";

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Catherine Hope Foundation",
  alternateName: "CHF",
  url: SITE,
  logo: SITE + "/images/brand/logo.png",
  slogan: "Serve with Love to Empower.",
  foundingDate: "2020",
  email: CONTACT.email,
  telephone: CONTACT.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "290, 4th Street, Baba Nagar, Villivakkam",
    addressLocality: "Chennai",
    postalCode: "600049",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sameAs: [CONTACT.facebook, CONTACT.instagram, CONTACT.youtube],
};

function navRoot(slug) {
  if (slug.startsWith("/get-involved") || slug === "/contact") return "/get-involved";
  return slug;
}

export function layout({ slug, title, desc, ogImage = OG_IMAGE, jsonld = null, bodyScripts = "" }, content) {
  const canonical = SITE + (slug === "/" ? "/" : slug);
  const ld = jsonld ? `\n<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Catherine Hope Foundation">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${ogImage}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${ogImage}">
<meta name="theme-color" content="#0A5C43">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/images/brand/logo-icon.png" sizes="any">
<link rel="apple-touch-icon" href="/images/brand/logo-icon.png">
${FONTS}
<link rel="stylesheet" href="/css/site.css">${ld}
</head>
<body>
${header(navRoot(slug))}
<main id="main">
${content}
</main>
${footer()}
<script src="/js/site.js" defer></script>${bodyScripts}
</body>
</html>`;
}

function ph(name) {
  return `<span class="placeholder" title="Replace with a verified value">{{${name}}}</span>`;
}

function write(slug, html) {
  let out;
  if (slug === "/") out = join(PUBLIC, "index.html");
  else out = join(PUBLIC, slug.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  return out;
}

let count = 0;
for (const p of PAGES({ layout, ph, CONTACT, ORG_JSONLD, SITE })) {
  const out = write(p.slug, p.html);
  count++;
  console.log("  wrote", out.replace(ROOT + "/", ""));
}
console.log(`\n${count} pages generated.`);
