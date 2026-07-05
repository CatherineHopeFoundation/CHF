/**
 * build-journal.js — generates the Hope Journal: index, articles, RSS.
 * Reads /public/journal/posts.json for the published list and pairs each
 * with a body defined in BODIES below. Re-run: node scripts/build-journal.js
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, CONTACT, header, footer } from "./chrome.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const JDIR = join(PUBLIC, "journal");
const posts = JSON.parse(readFileSync(join(JDIR, "posts.json"), "utf8")).posts;

const PILLAR_LABEL = {
  "/work/centre": "Raising Catherines",
  "/work/community-care": "Community Care",
  "/work/response": "Emergency Response",
  "/work/catherine-stree": "Catherine Stree",
  "/partner/sponsor-a-pillar": "Sponsor a Pillar",
};

/* Article bodies (HTML). Keep the warm, plain, unflinching, never-pitying voice. */
const BODIES = {
  "beat-the-heat-2026": `
<p>By mid-May the tar on the road outside the Centre was soft enough to leave a footprint. Chennai does not do summer gently. For a family already stretched thin, a heatwave is not a headline — it is a choice between water and the day's wages.</p>
<p>So we did the un-dramatic, necessary thing. Buttermilk by the crate. ORS packets. Shade where there was none. Our volunteers walked the streets our children walk, and handed cool relief to construction workers, elderly neighbours and anyone whose day is spent under the sun.</p>
<p>There is no clever programme name for showing up with cold water when someone is about to faint. There doesn't need to be. Catherine's whole idea was to understand a person's pain and answer it, personally. On the hottest days of the year, that looks like a paper cup and a place to sit down.</p>
<p>When the next heatwave comes — and it will — we would like to be ready sooner, and reach further.</p>`,
  "why-a-centre-of-our-own": `
<p>For four years, the Catherine Hope Center did not have a home. It had addresses — one rented room after another, each one a little cheaper, a little more tired. The last was bad enough that the roof leaked whenever it rained. Then one day a slab of concrete came away from the ceiling and fell. No child was hurt. That we can say "thankfully" at all is luck, not safety.</p>
<p>You cannot raise a child's horizons in a building you are afraid of. So we are building one of our own.</p>
<p>The new Centre rests on <strong>28 foundation pillars</strong>. As we write this, <strong>11 are complete and 2 are in progress</strong>. Each pillar is not a metaphor — it is real concrete and steel, and it is roughly the same cost whether it holds up a bank or a place where a hungry child gets a warm snack and a library card. The whole Centre will cost ₹1.8 crore.</p>
<p>That is a large number. It is also just a stack of ordinary ones: a pillar, then another pillar, then a roof that doesn't fall. You can name one.</p>`,
  "a-morning-at-the-centre": `
<p>Come at nine and you will think it is only a classroom. Children bent over sums, a teacher moving between them, the particular quiet of concentration. Stay a while, though, and you notice what is <em>not</em> happening: no one is hungry, no one is being shouted at, no one is being told they are less.</p>
<p>By ten there is a music class — a keyboard, some voices finding a tune. Spoken English is next door. A boy who arrived unable to meet an adult's eye reads a paragraph aloud and then, unmistakably, grins. In the corner, the library. Its books are not decoration; the borrowing register is full.</p>
<p>Before they leave, there is a snack, made with care, so that no child in our care learns on an empty stomach. It is a small thing that changes everything, because a mind cannot climb while a stomach aches.</p>
<p>This is the ordinary morning we are fighting for — repeated, protected, and multiplied. One Catherine at a time.</p>`,
};

function articleHead(p, url) {
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    datePublished: p.date,
    author: { "@type": "Organization", name: "Catherine Hope Foundation" },
    publisher: {
      "@type": "Organization",
      name: "Catherine Hope Foundation",
      logo: { "@type": "ImageObject", url: SITE + "/images/brand/logo.png" },
    },
    image: SITE + p.hero,
    mainEntityOfPage: url,
    description: p.excerpt,
  };
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.title} — Hope Journal | Catherine Hope Foundation</title>
<meta name="description" content="${p.excerpt}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${p.title}">
<meta property="og:description" content="${p.excerpt}">
<meta property="og:image" content="${SITE + p.hero}">
<meta property="og:url" content="${url}">
<meta property="article:published_time" content="${p.date}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${p.title}">
<meta name="twitter:description" content="${p.excerpt}">
<meta name="twitter:image" content="${SITE + p.hero}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/site.css">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`;
}

function fmtDate(d) {
  return new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
}

function write(rel, html) {
  const out = join(PUBLIC, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log("  wrote", rel);
}

/* ---- articles ------------------------------------------------------ */
for (const p of posts) {
  const url = `${SITE}/journal/${p.slug}`;
  const body = BODIES[p.slug] || `<p>${p.excerpt}</p>`;
  const pillarLabel = PILLAR_LABEL[p.pillar] || "our work";
  const share = encodeURIComponent(url);
  const shareText = encodeURIComponent(p.title);
  const others = posts.filter((o) => o.slug !== p.slug).slice(0, 2);
  const related = others
    .map(
      (o) => `<a class="card" href="/journal/${o.slug}" style="text-decoration:none">
        <img loading="lazy" src="${o.hero}" alt="" width="400" height="260">
        <span class="card-body"><span class="card-tag">${o.type}</span><span style="font-family:var(--font-display);font-size:1.1rem">${o.title}</span></span>
      </a>`
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
<head>
${articleHead(p, url)}
</head>
<body>
${header("/journal")}
<main id="main">
  <article class="section">
    <div class="narrow">
      <p class="crumb"><a href="/">Home</a> / <a href="/journal">Hope Journal</a> / ${p.type}</p>
      <p class="eyebrow">${p.type}</p>
      <h1>${p.title}</h1>
      <p class="meta" style="font-family:var(--font-mono);font-size:0.85rem;color:var(--ink-soft)">${p.author} · ${fmtDate(p.date)}</p>
    </div>
    <div class="narrow story-block">
      <img src="${p.hero}" alt="${p.title}" width="760" height="500">
    </div>
    <div class="narrow stack" style="font-size:1.08rem">${body}</div>
    <div class="narrow" style="margin-top:2rem">
      <p style="font-family:var(--font-mono);font-size:0.8rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink-soft)">Share</p>
      <p class="hope-actions">
        <a class="btn btn--ghost" href="https://api.whatsapp.com/send?text=${shareText}%20${share}" rel="noopener">WhatsApp</a>
        <a class="btn btn--ghost" href="https://www.facebook.com/sharer/sharer.php?u=${share}" rel="noopener">Facebook</a>
        <a class="btn btn--ghost" href="https://twitter.com/intent/tweet?text=${shareText}&url=${share}" rel="noopener">X</a>
        <a class="btn btn--ghost" href="mailto:?subject=${shareText}&body=${share}">Email</a>
      </p>
    </div>
  </article>
  <section class="section section--paper2">
    <div class="narrow center">
      <p class="eyebrow">You might also help with…</p>
      <h2>${pillarLabel}</h2>
      <p style="margin-top:1rem"><a class="btn btn--gold btn--lg" href="${p.pillar}">Support this work</a></p>
    </div>
  </section>
  <section class="section"><div class="wrap">
    <h2 class="center">More from the Journal</h2>
    <div class="grid grid-2" style="margin-top:1.5rem">${related}</div>
  </div></section>
</main>
${footer()}
<script src="/js/site.js" defer></script>
</body>
</html>`;
  write(`journal/${p.slug}/index.html`, html);
}

/* ---- index --------------------------------------------------------- */
const cards = posts
  .map(
    (p) => `<article class="card">
    <a href="/journal/${p.slug}" style="text-decoration:none;color:inherit;display:contents">
      <img loading="lazy" decoding="async" src="${p.hero}" alt="${p.title}" width="600" height="400">
      <div class="card-body">
        <span class="card-tag">${p.type} · ${fmtDate(p.date)}</span>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <span class="card-link">Read the story</span>
      </div>
    </a>
  </article>`
  )
  .join("\n");

const indexHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hope Journal | Catherine Hope Foundation</title>
<meta name="description" content="Stories, explainers and dispatches from the Catherine Hope Foundation — written warm, plain and unflinching.">
<link rel="canonical" href="${SITE}/journal">
<meta property="og:title" content="Hope Journal | Catherine Hope Foundation">
<meta property="og:description" content="Stories, explainers and dispatches from the Catherine Hope Foundation.">
<meta property="og:image" content="${SITE}/images/programmes/daily_tuitions.jpg">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<link rel="alternate" type="application/rss+xml" title="Hope Journal" href="/journal/rss.xml">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/site.css">
</head>
<body>
${header("/journal")}
<main id="main">
  <section class="section">
    <div class="narrow">
      <p class="crumb"><a href="/">Home</a> / Hope Journal</p>
      <p class="eyebrow">The Hope Journal</p>
      <h1>Stories from the work</h1>
      <p class="lede">Warm, plain and unflinching — dispatches from the Centre, explainers about what we do, and reflections on the people we walk alongside. <a href="/journal/rss.xml">RSS</a>.</p>
    </div>
  </section>
  <section class="section" style="padding-top:0"><div class="wrap"><div class="grid grid-3">${cards}</div></div></section>
</main>
${footer()}
<script src="/js/site.js" defer></script>
</body>
</html>`;
write("journal/index.html", indexHtml);

/* ---- RSS ----------------------------------------------------------- */
const items = posts
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE}/journal/${p.slug}</link>
      <guid>${SITE}/journal/${p.slug}</guid>
      <pubDate>${new Date(p.date + "T00:00:00Z").toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`
  )
  .join("\n");
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Hope Journal — Catherine Hope Foundation</title>
    <link>${SITE}/journal</link>
    <description>Stories, explainers and dispatches from the Catherine Hope Foundation.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;
write("journal/rss.xml", rss);

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));
}

console.log(`\nJournal: ${posts.length} articles + index + rss.`);
