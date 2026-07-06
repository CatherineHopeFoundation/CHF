# Catherine Hope Foundation — Project Memory

Read this first every session. Keep it updated when the site map, brand or
content changes. **This reflects the approved warm/grassroots-NGO brief (which
supersedes the earlier "2.0" editorial build).**

## Project
The website for **Catherine Hope Foundation (CHF)**, a govt-registered Indian
charitable trust in Tamil Nadu. Warm, human, image-heavy, alive — a social cause,
**never** minimal/beige/corporate. Deploys on **Cloudflare Workers static assets**
via `npx wrangler deploy` (no build step; static HTML/CSS/JS in `/public`).

## Non-negotiable rules
1. **Never fabricate** numbers, names, dates or quotes. Unknown value → a visible
   `{{placeholder}}`, listed for a human. Never invent impact figures.
2. **Real images**, front and centre (in `/public/images`, from the foundation's
   own live site which CHF owns).
3. **Dignity** for every child/beneficiary — respectful, specific, never pitying.
   Flag any photo↔name pairing that isn't confirmed (only Santhakumar is confirmed).
4. **Warm NGO feel** — rounded cards, coral Donate CTAs, big photos, movement.

## Voice
- Motto: **"Serve with Love to Empower."**
- Guiding words (Catherine's last message): **"Live every moment."**
- Warm, sincere, hopeful, plain-spoken; first person plural. Catherine's words as
  handwritten (Caveat) accents.

## Design system (locked)
CSS variables in `/public/css/site.css`:
`--green #0E7C5A · --green-d #0A5C43 · --green-t #E6F4EF · --coral #F26522 ·
--coral-d #D64F12 · --coral-t #FFF2EA · --gold #F6B41A · --ink #182A24 ·
--gray #586A63 · --paper #FFFFFF · --soft #F5F9F7 · --line #E7ECEA`
Fonts (Google): **Poppins** (headings 500–800), **Inter** (body), **Caveat**
(handwritten accent for Catherine's words only). Rounded 14–22px, soft shadows.
Components: sticky nav + trust bar · sliding hero (dots/arrows) · animated count-up
counters with pulsing live dot · focus/programme/changed-lives cards · construction
progress bar + pipeline · vertical timeline · testimonial quotes · auto-scroll
gallery marquee · coral→gold CTA band · dark-green footer with 80G/reg badges.

## Verified facts (source of truth)
- Founded **2020**, in memory of **Catherine Selvinson** (b. 19 Oct 2002, Mumbai;
  d. 26 Feb 2020 at 17 — battled cancer without depression).
- **Reg. under Indian Trust Act (91/2020); 80G & 12A (Form 10AC).**
- Office: **290, 4th Street, Baba Nagar, Villivakkam, Chennai – 600049.**
  Centre: **Catherine Hope Center — Ennore & Ernavur, Tamil Nadu.**
- Email **info@catherinehopefoundation.org** · Phone **+91 8939251910**.
- Socials: facebook.com/catherinehopefoundation · Instagram · YouTube
  @catherinehopefoundation2407.
- **Center opened 1 Aug 2021** during COVID (tuition for children left behind).
- **New Center: 28 pillars planned · 11 complete · 2 in progress.**
- 6 focus areas: Differently-Abled Empowerment (DAEP) · Cancer Warriors' Care ·
  Mental Health / depression · Children's Education · Widows & Vulnerable Women ·
  Poorest of the Poor.
- Changed lives (verified; use exact facts): **Santhakumar** (DAEP since 2020, photo
  confirmed), **Anjali** (class 2, lost a leg), **Mahalakshmi** (first computer batch),
  **Kunta** (Maharashtra), **Karuthapandi** (Dindigul, brick cutter, sons Dhanakabilan
  & Karthikraja), a bedridden father of two. More names to confirm: Divya, Lordson,
  Lingadurai, Praiselyn Maribah, Gauri Shankar, Mottayandi, Vijaylakshmi.
- Catherine's poem **"The Little Fox"** — full text used on /story.

## Site map (all built)
```
/               Home (sliding hero, counters, focus areas, story, construction, changed lives, marquee, CTA)
/story          Catherine's life + poem "The Little Fox" + documentary slot
/about          Mission, Center history, milestones timeline, team, governance
/focus-areas    The 6 focus areas in depth
/programmes     All programmes grouped: Education · Empowerment & Care · Response
/changed-lives  Beneficiary stories (Santhakumar confirmed; others flagged)
/construction   28-pillar campaign, progress bar, build gallery, sponsor-a-pillar
/gallery        Filterable gallery from /public/images/manifest.json
/get-involved   Donate · Volunteer · Intern · Corporate/CSR · contact form
/contact        Contact form -> POST /api/contact
/404.html       On-brand not-found
```

## Tech / deploy
- Static assets in `/public`. `src/index.js` Worker handles `/api/contact`
  (validates + logs; no secrets needed) then defers to `env.ASSETS`.
- Pages are authored via `node scripts/build-pages.js` (+ `build-sitemap.js`),
  which emit static HTML into `/public` using shared chrome in `scripts/chrome.js`
  and content in `scripts/content.js`. The **committed HTML is what ships** — deploy
  is still `npx wrangler deploy` alone. `npm run pages` rebuilds both.
- Deploy: **`npx wrangler deploy`** (or a git push if Cloudflare Workers Builds is
  connected to the production branch).

## Open {{placeholders}} for a human
Counter numbers (lives touched, volunteers & staff), donation link/UPI/gateway,
team & trustee names+photos, remaining changed-lives names/stories & photo
confirmations, exact testimonial quotes. Replace every `{{ }}` before partner use.
