/**
 * /api/hope-map — the Living Hope Map.
 *
 * Flow:
 *   1. Read coarse location from request.cf (no prompt). Optional ?city= override
 *      when the visitor explicitly taps "use my area".
 *   2. Pull recent, THEMED local news (NEWS_API_KEY) on CHF's issue areas.
 *   3. Ask a small, cheap Anthropic model to pick ONE item and shape a hopeful,
 *      costed response mapped to a real CHF programme. STRICT JSON out.
 *   4. Cache per-city in Workers KV (HOPE_CACHE) ~6h to control cost.
 *   5. On ANY failure or sensitive content, return a warm national default.
 *      The component must never show an error.
 *
 * No keys are hardcoded. Everything reads from env secrets/bindings.
 */

const CACHE_TTL_SECONDS = 6 * 60 * 60; // 6 hours
const CACHE_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "public, max-age=1800", // 30m at the edge/browser
};

// CHF's real programme pillars — the AI may only map to one of these.
const PROGRAMMES = {
  "raising-catherines": {
    programme: "Raising Catherines",
    programme_url: "/work/centre",
  },
  "community-care": {
    programme: "Community Care",
    programme_url: "/work/community-care",
  },
  response: {
    programme: "Emergency Response",
    programme_url: "/work/response",
  },
  "catherine-stree": {
    programme: "Catherine Stree — Women's Livelihood",
    programme_url: "/work/catherine-stree",
  },
};

// Themed query so we never surface raw, unrelated, or exploitative news.
const NEWS_THEMES =
  '(childhood cancer OR disability OR education OR "women livelihood" OR "elderly care" OR floods OR heatwave) AND India';

// Warm national fallback — always valid, never alarming.
const NATIONAL_DEFAULT = {
  issue: "Across India, children still learn on empty stomachs and families face hardship alone.",
  city: "India",
  programme: "Raising Catherines",
  programme_url: "/work/centre",
  proof_story:
    "At the Catherine Hope Center in Ennore, children who once went to bed hungry now arrive to tuition, music, a warm snack, and a library — and they are thriving.",
  cta_label: "Sponsor a Catherine",
  cta_amount: null,
  cta_url: "/partner/sponsor-a-catherine",
  source_url: null,
  fallback: true,
};

export async function handleHopeMap(request, env, ctx) {
  const url = new URL(request.url);
  const cf = request.cf || {};
  const requestedCity = (url.searchParams.get("city") || "").trim();
  const city =
    requestedCity ||
    cf.city ||
    cf.region ||
    "India";
  const cacheKey = `hope:${city.toLowerCase()}`;

  // 1) Serve from cache if we can.
  if (env.HOPE_CACHE) {
    try {
      const cached = await env.HOPE_CACHE.get(cacheKey);
      if (cached) {
        return new Response(cached, { headers: CACHE_HEADERS });
      }
    } catch (e) {
      console.error("KV read failed", e);
    }
  }

  // 2) If we don't have the keys to do the smart path, return the default.
  if (!env.ANTHROPIC_API_KEY || !env.NEWS_API_KEY) {
    return withCity(NATIONAL_DEFAULT, city, true);
  }

  try {
    const articles = await fetchLocalNews(city, env.NEWS_API_KEY);
    if (!articles.length) {
      return withCity(NATIONAL_DEFAULT, city, true);
    }

    const result = await matchWithAnthropic(city, articles, env.ANTHROPIC_API_KEY);
    if (!result || isSensitive(result)) {
      return withCity(NATIONAL_DEFAULT, city, true);
    }

    const payload = JSON.stringify(result);

    // 4) Cache it (fire-and-forget).
    if (env.HOPE_CACHE && ctx && ctx.waitUntil) {
      ctx.waitUntil(
        env.HOPE_CACHE.put(cacheKey, payload, {
          expirationTtl: CACHE_TTL_SECONDS,
        }).catch((e) => console.error("KV write failed", e))
      );
    }

    // 5) Log the match so a human can review what's shown.
    console.log("hope-map match", JSON.stringify({ city, issue: result.issue, programme: result.programme }));

    return new Response(payload, { headers: CACHE_HEADERS });
  } catch (e) {
    console.error("hope-map failed", e);
    return withCity(NATIONAL_DEFAULT, city, true);
  }
}

/** Fetch a few recent, themed local news items. */
async function fetchLocalNews(city, apiKey) {
  const q = encodeURIComponent(`${NEWS_THEMES} ${city}`);
  const endpoint = `https://newsapi.org/v2/everything?q=${q}&language=en&sortBy=publishedAt&pageSize=8&apiKey=${apiKey}`;
  const res = await fetch(endpoint, { cf: { cacheTtl: 1800 } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.articles || []).slice(0, 8).map((a) => ({
    title: a.title,
    description: a.description,
    url: a.url,
    source: a.source && a.source.name,
  }));
}

/** Ask a small Anthropic model to pick one item and shape a hopeful response. */
async function matchWithAnthropic(city, articles, apiKey) {
  const system = [
    "You write for the Catherine Hope Foundation, an Indian charitable trust.",
    "From a list of local news items, choose the SINGLE most relevant to our work and",
    "turn it into a hopeful, respectful response — never alarm, never exploit tragedy.",
    "Rules:",
    "- Never name a private individual from the news as a 'case'.",
    "- If the only relevant item involves death or abuse, respond with programme 'raising-catherines' and a general framing.",
    "- Plain, warm language. No jargon. No fear-mongering.",
    "- Map to exactly one programme key: raising-catherines, community-care, response, catherine-stree.",
    "- Output STRICT JSON only, no markdown, matching this shape:",
    '{"issue":"","programme_key":"","proof_story":"","cta_label":"","cta_amount":null,"cta_url":"","source_url":""}',
    "- issue: one warm sentence naming the local need (no private names).",
    "- proof_story: one sentence on how CHF already responds to this kind of need.",
    "- cta_label: a short action like 'Sponsor a Catherine' or 'Fund a wheelchair'.",
    "- cta_amount: a number in INR if natural, else null.",
  ].join("\n");

  const user = `City: ${city}\nNews items:\n${articles
    .map((a, i) => `${i + 1}. ${a.title} — ${a.description || ""} (${a.source || ""})`)
    .join("\n")}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001", // small + cheap; caching keeps cost low
      max_tokens: 400,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  if (!res.ok) {
    console.error("anthropic error", res.status, await safeText(res));
    return null;
  }

  const data = await res.json();
  const text =
    data && data.content && data.content[0] && data.content[0].text
      ? data.content[0].text
      : "";
  const parsed = parseJson(text);
  if (!parsed) return null;

  const mapped = PROGRAMMES[parsed.programme_key] || PROGRAMMES["raising-catherines"];
  return {
    issue: String(parsed.issue || NATIONAL_DEFAULT.issue),
    city,
    programme: mapped.programme,
    programme_url: mapped.programme_url,
    proof_story: String(parsed.proof_story || NATIONAL_DEFAULT.proof_story),
    cta_label: String(parsed.cta_label || "Stand with us"),
    cta_amount: typeof parsed.cta_amount === "number" ? parsed.cta_amount : null,
    cta_url: mapped.programme_url.startsWith("/partner")
      ? mapped.programme_url
      : "/partner/donate",
    source_url: typeof parsed.source_url === "string" ? parsed.source_url : null,
    fallback: false,
  };
}

/** Guardrail: reject anything that slipped through with sensitive framing. */
function isSensitive(r) {
  const blob = `${r.issue} ${r.proof_story}`.toLowerCase();
  return /\b(rape|abuse|suicide|murder|killed|dead|death)\b/.test(blob);
}

function parseJson(text) {
  if (!text) return null;
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

async function safeText(res) {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

function withCity(base, city, fallback) {
  const body = { ...base, city, fallback };
  return new Response(JSON.stringify(body), { headers: CACHE_HEADERS });
}
