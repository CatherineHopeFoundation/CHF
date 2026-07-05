#!/usr/bin/env node
/**
 * draft-article.js — human-in-the-loop article drafting for the Hope Journal.
 *
 *   node scripts/draft-article.js "topic or headline"
 *   node scripts/draft-article.js --url https://example.com/news-story
 *
 * Drafts an article in Catherine's voice via the Anthropic API and writes a
 * DRAFT .html into /public/journal/_drafts/ (NOT published — see .assetsignore),
 * then appends to a review checklist. A human reviews, edits, moves the file
 * out of _drafts and adds it to posts.json to publish. Nothing auto-publishes.
 *
 * Requires ANTHROPIC_API_KEY in the environment (never commit it).
 */

import { writeFileSync, mkdirSync, appendFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DRAFTS = join(ROOT, "public", "journal", "_drafts");

// The style guide is always sent to the model — this IS the voice.
const STYLE_GUIDE = `You write for the Catherine Hope Foundation (CHF), an Indian charitable trust
founded in memory of Catherine Selvinson, a girl who met bone cancer with an
unbroken smile and whose last words were "Live every moment."
VOICE: warm, plain, unflinching, and NEVER pitying. Dignity first — the people
we serve are protagonists, not objects of charity. Short, concrete sentences.
No jargon, no fundraising cliché, no fear-mongering. Hope, not alarm.
Never invent statistics or name a private individual as a "case." When a real
number isn't known, write it as a {{placeholder}} for a human to fill.
END every article by connecting to one of CHF's pillars: Raising Catherines,
Community Care, Emergency Response, or Catherine Stree.`;

async function main() {
  const args = process.argv.slice(2);
  let url = null;
  let topic = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--url") url = args[++i];
    else topic = (topic ? topic + " " : "") + args[i];
  }
  if (!url && !topic) {
    console.error('Usage: node scripts/draft-article.js "topic"  |  --url <news-url>');
    process.exit(1);
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not set. Export it (do not commit it) and retry.");
    process.exit(1);
  }

  let sourceText = "";
  if (url) {
    try {
      const res = await fetch(url);
      sourceText = (await res.text()).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 6000);
    } catch (e) {
      console.error("Could not fetch the URL; drafting from the URL as a topic instead.", e.message);
    }
  }

  const userMsg = url
    ? `Draft a Hope Journal article responding to this news, from CHF's perspective and voice.\nSOURCE URL: ${url}\nSOURCE TEXT (may be partial):\n${sourceText}`
    : `Draft a Hope Journal article on this topic, in CHF's voice:\n${topic}`;

  const body = {
    model: "claude-sonnet-5",
    max_tokens: 1500,
    system: STYLE_GUIDE,
    messages: [
      {
        role: "user",
        content:
          userMsg +
          `\n\nReturn STRICT JSON only: {"title":"","type":"Response|Explainer|From the Centre","excerpt":"","pillar":"/work/centre|/work/community-care|/work/response|/work/catherine-stree","body_html":"<p>…</p>"}`,
      },
    ],
  };

  console.log("Drafting via Anthropic…");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error("Anthropic error:", res.status, await res.text());
    process.exit(1);
  }
  const data = await res.json();
  const text = data.content?.[0]?.text || "";
  const draft = parseJson(text);
  if (!draft) {
    console.error("Could not parse model output. Raw:\n", text);
    process.exit(1);
  }

  const slug = slugify(draft.title);
  const date = new Date().toISOString().slice(0, 10);
  mkdirSync(DRAFTS, { recursive: true });
  const file = join(DRAFTS, `${date}-${slug}.html`);

  const html = `<!-- DRAFT — not published. Review, edit, then move out of _drafts and add to posts.json. -->
<!-- Suggested posts.json entry:
{
  "slug": "${slug}",
  "title": ${JSON.stringify(draft.title)},
  "type": ${JSON.stringify(draft.type || "From the Centre")},
  "date": "${date}",
  "author": "The CHF team",
  "excerpt": ${JSON.stringify(draft.excerpt || "")},
  "hero": "/images/programmes/daily_tuitions.jpg",
  "pillar": ${JSON.stringify(draft.pillar || "/work/centre")}
}
-->
<article>
  <h1>${escapeHtml(draft.title)}</h1>
  <p><em>${escapeHtml(draft.excerpt || "")}</em></p>
  ${draft.body_html || ""}
</article>`;
  writeFileSync(file, html);

  const checklist = join(DRAFTS, "REVIEW-CHECKLIST.md");
  appendFileSync(
    checklist,
    `\n- [ ] **${draft.title}** (\`${date}-${slug}.html\`) — check facts, fill {{placeholders}}, confirm dignity/consent, add to posts.json.\n`
  );

  console.log("\nDraft written:", file.replace(ROOT + "/", ""));
  console.log("Review checklist:", checklist.replace(ROOT + "/", ""));
  console.log("Nothing was published. A human must review and publish it.");
}

function parseJson(t) {
  const s = t.indexOf("{");
  const e = t.lastIndexOf("}");
  if (s === -1 || e === -1) return null;
  try { return JSON.parse(t.slice(s, e + 1)); } catch { return null; }
}
function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}
function escapeHtml(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

main().catch((e) => { console.error(e); process.exit(1); });
