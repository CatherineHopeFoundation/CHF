# Catherine Hope Foundation 2.0 — Project Memory

This file is the project's memory. Read it first every session. Keep it updated
whenever the site map or brand changes.

## What CHF is (3 sentences)
Catherine Selvinson (19 Oct 2002 – 26 Feb 2020) was an intelligent, multi-talented
girl from Mumbai who faced bone cancer, an amputation, and relapse with an
unbroken smile, spending her short life lifting others out of hopelessness and
depression. Her last words — "Live every moment" — became a calling: her parents
Selvinson and Graciana founded the Catherine Hope Foundation to make her dream of
personalised care for those in need a reality. CHF is an Indian charitable trust
based in Chennai that raises vulnerable children, cares for the differently-abled,
cancer patients, widows and elders, empowers women, and responds to emergencies.

## Voice
- Tagline: **"One girl's story. Hundreds of second chances."**
- Motto: **"Serve with love to empower."**
- Guiding words: **"Live every moment."** (Catherine's last WhatsApp status)
- Tone: warm but honest. Dignified, specific, never pitying. These are real,
  often vulnerable people.

## Locked palette (CSS variables in /public/css/site.css)
| Token        | Hex       |
|--------------|-----------|
| Paper        | `#FBF7EF` |
| Paper-2      | `#F3ECDD` |
| Ink          | `#221E18` |
| Ink-soft     | `#5A5348` |
| Green        | `#1F5F4E` |
| Green-deep   | `#153F34` |
| Gold         | `#D99A3C` |
| Rose         | `#C05B4D` |
| Line         | `#E4DAC7` |

## Fonts
- Display: **Newsreader**
- Body: **Inter**
- Data/mono: **JetBrains Mono**
(Self-hosted from /public/fonts if added; otherwise system fallbacks in CSS.)

## The four pillars
1. **Raising Catherines** (`/work/centre`) — the Catherine Hope Center, Ennore:
   daily tuition, Change Ambassadors Programme, music, computers, spoken English,
   healthy snacks, library.
2. **Community Care** (`/work/community-care`) — differently-abled (DAEP),
   Cancer Warriors' Care, Widows Welfare, Senior Citizens' Support, Healthy Grains,
   wheelchair donations, Housing Initiative.
3. **Emergency Response** (`/work/response`) — floods, Beat the Heat, COVID relief,
   rapid-response emergency assistance.
4. **Catherine Stree** (`/work/catherine-stree`) — women's livelihood social
   enterprise: baking + jewellery-making training, product lines, "invest in a maker".

## Site map (every route)
```
/                         Home (Living Hope Map slot #hope-map, pillars, proof, campaign, ways to help, trust strip)
/story                    Catherine's narrative + poem "The Little Fox" + documentary embed
/work                     Four-pillar overview
/work/centre              Raising Catherines
/work/community-care      Community Care
/work/response            Emergency Response
/work/catherine-stree     Catherine Stree (women's livelihood)
/changed-lives            Named beneficiary stories
/gallery                  Filterable gallery from /public/images/manifest.json
/partner                  Partner hub
/partner/donate
/partner/sponsor-a-catherine
/partner/sponsor-a-pillar  (28 pillars, 11 built)
/partner/corporate-csr
/impact                   Dashboard (placeholders clearly marked), governance, 80G
/about                    Founders, team, trustees, contact
/contact                  Form -> POST /api/contact
/journal                  Hope Journal index (/public/journal/*.html, posts.json)
/journal/rss.xml
/404.html
```

## Real facts (from live site — source of truth)
- Registered office: **290, 4th Street, Baba Nagar, Villivakkam, Chennai – 600049**
- Centre: **Catherine Hope Center for Community Welfare, Ennore, Chennai**
- Phone: **+91 8939251910** · Email: **info@catherinehopefoundation.org**
- Registered under **Indian Trust Act (91/2020)**
- 80G: **Form 80G/10AC – AACTC7794BF20212**
- YouTube: **@catherinehopefoundation2407**
- Building campaign: new Centre, **total cost ₹1.8 crore**, **28 foundation pillars**,
  **11 completed, 2 in progress** at time of writing.
- Catherine's poem: **"The Little Fox"** (full text in /story).

## Never fabricate impact numbers
Where a real figure isn't confirmed, use a clearly-marked placeholder like
`{{children_taught}}`. A human must replace every `{{ }}` before this goes to
partners. Do NOT invent counts of children, families, wheelchairs, etc.

## Where the brief lives
Source-of-truth brief files go in `/brief/` (excluded from publish via
`.assetsignore`). If they are absent, real content was reconstructed from the
existing live site at catherinehopefoundation.org (the foundation owns it).

## Tech / deploy
- Cloudflare Workers **static assets**. Deploy: **`npx wrangler deploy`**.
- Worker (`src/index.js`) handles `/api/*` (contact, hope-map) then defers to
  `env.ASSETS`. Static site is plain HTML/CSS/JS in `/public` — **no build step**.
- Living Hope Map (`/api/hope-map`) needs secrets `ANTHROPIC_API_KEY`,
  `NEWS_API_KEY` and KV `HOPE_CACHE`; it degrades to a warm national default
  without them. Set secrets with `wrangler secret put`, never in files.
- Journal draft helper: `node scripts/draft-article.js` (human-in-the-loop;
  writes to `/public/journal/_drafts/`, which is NOT published).
```
