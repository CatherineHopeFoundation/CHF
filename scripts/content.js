/**
 * content.js — all page content for the Catherine Hope Foundation 2.0 site.
 * Copy is drawn from the foundation's own material (source of truth).
 * Impact figures that aren't verified are marked with {{placeholders}}.
 */

export function PAGES({ layout, ph, CONTACT, ORG_JSONLD, SITE }) {
  const pages = [];
  const add = (meta, content) => pages.push({ slug: meta.slug, html: layout(meta, content) });

  /* ------- shared fragments ------------------------------------------- */
  const PILLARS = [
    {
      href: "/work/centre",
      tag: "Pillar 01",
      title: "Raising Catherines",
      img: "/images/programmes/daily_tuitions.jpg",
      blurb:
        "The Catherine Hope Center in Ennore gives vulnerable children the childhood Catherine would have wanted for them — tuition, music, computers, spoken English, warm snacks, a library and mentors who believe in them.",
    },
    {
      href: "/work/community-care",
      tag: "Pillar 02",
      title: "Community Care",
      img: "/images/programmes/cancer.jpg",
      blurb:
        "Personalised, dignified support for the differently-abled, cancer warriors, widows and abandoned elders — groceries, medical aid, wheelchairs, housing and, above all, someone who shows up.",
    },
    {
      href: "/work/response",
      tag: "Pillar 03",
      title: "Emergency Response",
      img: "/images/programmes/need_3.jpg",
      blurb:
        "When floods rise, heat peaks or crisis strikes, CHF moves fast — groceries, supplies and heartfelt relief delivered where they are needed most.",
    },
    {
      href: "/work/catherine-stree",
      tag: "Pillar 04",
      title: "Catherine Stree",
      img: "/images/galleries/women_1.jpg",
      blurb:
        "A women's livelihood movement. Mothers learn baking and jewellery-making, earn an income, and lift their whole family out of hunger and dependence.",
    },
  ];

  const pillarCards = PILLARS.map(
    (p) => `<article class="card">
      <img loading="lazy" decoding="async" src="${p.img}" alt="${p.title} — the Catherine Hope Foundation at work" width="600" height="400">
      <div class="card-body">
        <span class="card-tag">${p.tag}</span>
        <h3>${p.title}</h3>
        <p>${p.blurb}</p>
        <a class="card-link" href="${p.href}">Explore this work</a>
      </div>
    </article>`
  ).join("\n");

  const WAYS = [
    ["/partner/donate", "Give once or monthly", "Every rupee is stewarded with care and eligible for 80G tax relief."],
    ["/partner/sponsor-a-catherine", "Sponsor a Catherine", "Walk with one child through a full year of learning and care."],
    ["/partner/sponsor-a-pillar", "Sponsor a Pillar", "Name one of the 28 pillars of the new Centre and help it rise."],
    ["/partner/corporate-csr", "Corporate & CSR", "§135-ready partnerships, 80G receipts, volunteering and gifting."],
  ];
  const waysCards = WAYS.map(
    ([href, t, d]) => `<article class="card"><div class="card-body">
      <h3>${t}</h3><p>${d}</p><a class="card-link" href="${href}">Open this door</a></div></article>`
  ).join("\n");

  const trustStrip = `<div class="trust wrap">
      <span><b>${CONTACT.trust.replace("Registered under the ", "")}</b></span>
      <span><b>80G</b> tax-exempt · AACTC7794BF20212</span>
      <span><b>Chennai, India</b></span>
      <span><b>Founded 2020</b> in Catherine's memory</span>
    </div>`;

  function pillarTracker() {
    let cells = "";
    for (let i = 1; i <= 28; i++) {
      const cls = i <= 11 ? "built" : i <= 13 ? "progress" : "";
      cells += `<span class="${cls}" title="Pillar ${i}"></span>`;
    }
    return `<div class="tracker">
      <div class="pillars-bar" role="img" aria-label="11 of 28 foundation pillars completed, 2 in progress">${cells}</div>
      <p class="meta">11 of 28 pillars complete · 2 in progress · goal ₹1.8 crore</p>
    </div>`;
  }

  /* =================================================================== */
  /* HOME                                                                */
  /* =================================================================== */
  add(
    {
      slug: "/",
      title: "Catherine Hope Foundation — One girl's story. Hundreds of second chances.",
      desc: "Catherine's last words were \"Live every moment.\" Today the Catherine Hope Foundation raises vulnerable children, cares for the forgotten, and empowers women across Chennai, India.",
      jsonld: ORG_JSONLD,
      bodyScripts: '\n<script src="/js/hope-map.js" defer></script>',
    },
    `<section class="hero">
  <div class="wrap hero-inner">
    <div>
      <p class="kicker">Live every moment</p>
      <h1>One girl's story.<br>Hundreds of second chances.</h1>
      <p>Catherine Selvinson met cancer with an unbroken smile and spent her short life lifting others out of hopelessness. Her dream became a foundation — serving with love, empowering the forgotten, one life at a time.</p>
      <div class="hope-actions">
        <a class="btn btn--gold btn--lg" href="/partner/donate">Stand with us</a>
        <a class="btn btn--ghost btn--lg" href="/story">Read Catherine's story</a>
      </div>
    </div>
    <div class="hero-media">
      <img src="/images/story/catherine_hero.jpg" alt="Catherine Selvinson, whose life and courage inspired the foundation" width="640" height="800" fetchpriority="high">
    </div>
  </div>
</section>

<section class="section">
  <div class="narrow">
    <p class="eyebrow">The Living Hope Map</p>
    <h2>Wherever you are, hope is already at work near you.</h2>
    <p class="lede">We look at a real need close to you — then show you exactly how the Catherine Hope Foundation answers it.</p>
    <div id="hope-map" aria-live="polite"></div>
    <p style="margin-top:1rem"><button id="hope-use-area" class="btn btn--ghost" hidden>Use my area</button></p>
  </div>
</section>

<section class="section section--paper2">
  <div class="wrap">
    <p class="eyebrow center">What we do</p>
    <h2 class="center">Four pillars, one promise</h2>
    <p class="center lede" style="max-width:60ch;margin-inline:auto">To understand each person's pain, and answer it personally — the way Catherine dreamed of.</p>
    <div class="grid grid-4" style="margin-top:2.5rem">${pillarCards}</div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <p class="eyebrow center">The proof is in the children</p>
    <h2 class="center">Lives that turned a corner</h2>
    <div class="grid grid-4" style="margin-top:2rem">
      <div class="stat"><span class="num">${ph("children_at_centre")}</span><span class="label">children being raised at the Centre</span></div>
      <div class="stat"><span class="num">${ph("families_supported")}</span><span class="label">families supported each month</span></div>
      <div class="stat"><span class="num">${ph("wheelchairs_given")}</span><span class="label">wheelchairs gifted</span></div>
      <div class="stat"><span class="num">${ph("women_trained")}</span><span class="label">women trained to earn</span></div>
    </div>
    <p class="center note" style="max-width:52ch;margin:2rem auto 0">These counters are placeholders. We publish only verified numbers — a team member will replace each one before this reaches you.</p>
    <p class="center" style="margin-top:1.5rem"><a class="btn btn--green" href="/changed-lives">Meet the changed lives</a></p>
  </div>
</section>

<section class="section section--green">
  <div class="wrap split">
    <div>
      <p class="eyebrow">The building campaign</p>
      <h2>A permanent home for hope</h2>
      <p>For four years the Centre moved from one rented room to another — one so unsafe a slab of concrete fell from the ceiling. The new Catherine Hope Center will be a place where children are simply safe, loved and inspired. It costs ₹1.8 crore and rises on 28 foundation pillars.</p>
      ${pillarTracker()}
      <p style="margin-top:1.5rem"><a class="btn btn--gold" href="/partner/sponsor-a-pillar">Sponsor a pillar</a></p>
    </div>
    <img src="/images/construction/construction_1.jpg" alt="The new Catherine Hope Center taking shape, pillar by pillar" width="640" height="480" loading="lazy">
  </div>
</section>

<section class="section">
  <div class="wrap">
    <p class="eyebrow center">Ways to help</p>
    <h2 class="center">Four doors, all leading to a second chance</h2>
    <div class="grid grid-4" style="margin-top:2.5rem">${waysCards}</div>
  </div>
</section>

<section class="section section--paper2" style="padding-block:3rem">${trustStrip}</section>`
  );

  /* =================================================================== */
  /* STORY                                                               */
  /* =================================================================== */
  const STORY_JSONLD = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Catherine Selvinson",
    birthDate: "2002-10-19",
    deathDate: "2020-02-26",
    description:
      "Catherine Selvinson inspired the Catherine Hope Foundation. She faced bone cancer with courage and spent her life lifting others out of hopelessness.",
    parent: [{ "@type": "Person", name: "Selvinson" }, { "@type": "Person", name: "Graciana" }],
  };
  add(
    {
      slug: "/story",
      title: "Catherine's Story — From Loss to Legacy | Catherine Hope Foundation",
      desc: "Catherine Selvinson (2002–2020) met cancer, amputation and relapse with an unbroken smile. Her dream became a foundation. Read her story and her poem, \"The Little Fox\".",
      jsonld: STORY_JSONLD,
    },
    `<section class="section">
  <div class="narrow">
    <p class="crumb"><a href="/">Home</a> / Catherine's Story</p>
    <p class="eyebrow">From loss to legacy</p>
    <h1>Catherine Selvinson</h1>
    <p class="lede">19 October 2002 — 26 February 2020. She wore her smile like her best attire.</p>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="narrow stack">
    <div class="story-block"><img src="/images/story/catherine_1.png" alt="Catherine as a child, radiant and full of life" width="760" height="500" loading="lazy"></div>
    <p>Catherine was born in Mumbai to Selvinson and Graciana. They named her Catherine — meaning "pure" — and that is what described her best. She radiated a positive aura and made everyone around her comfortable with her gentle presence. Intelligent and multi-talented, she earned the High Achiever award for five straight years and was also an excellent musician, sportsperson, writer and baker.</p>

    <p>Then one day a slight leg pain would not go away. Tests confirmed a rare, high-grade cancer of the bone. Catherine spent eight months in a wheelchair through chemotherapy and surgeries. As she was still coping with the trauma, doctors said her left leg had to be amputated to save her life. To everyone's surprise, she took the news daringly and kept fighting. After the amputation and further treatment, she was finally declared cancer-free.</p>

    <div class="story-block"><img src="/images/story/catherine_3.png" alt="Catherine walking again with her prosthetic leg, smiling" width="760" height="500" loading="lazy"></div>
    <p>It was time to celebrate. The family took a short trip to make memories to cherish. Catherine rejoined school, walked again with a new prosthetic leg, took public transport on her own, and returned to music and baking. She even stood first in her school in the 10th public examinations. Life could not be better.</p>

    <p>On the last day of her tenth board exams, an excruciating pain gripped her left shoulder. The cancer was back. The family sought the finest doctors in Mumbai, and Catherine was caught again in the relentless cycle of surgery and chemotherapy. The treatments gradually weakened her body, but her faith never wavered. Her ability to smile through the pain left even her doctors in awe. On 26 February 2020, her body could endure no more, and Catherine rested in eternal peace.</p>

    <blockquote class="lede" style="border-left:3px solid var(--gold);padding-left:1.2rem;font-family:var(--font-display);font-style:italic">
      She never lost her hope or her smile, nor did she succumb to depression. In her brief time on Earth she comforted friends struggling with hopelessness and even suicidal thoughts. Her passion was to inspire young people to reach their full potential.
    </blockquote>

    <p>She left her last WhatsApp status as three words — <strong>"Live every moment"</strong> — asking us to treasure our time with the people we love and to do what we love most.</p>

    <p>While she was alive, Catherine dreamed of founding an organisation to help those in need — understanding each person's pain and helping them individually, with tailor-made care. After she went to her eternal abode, her parents Selvinson and Graciana took up that dream. The Catherine Hope Foundation exists to make it real.</p>
  </div>
</section>

<section class="section">
  <div class="narrow">
    <div class="poem">
      <p class="eyebrow" style="color:var(--gold)">In her own words</p>
      <h2>The Little Fox</h2>
      <p class="byline">— by Catherine Selvinson</p>
<pre>"Mother please let me die."
Said the little fox in his mind
For if he said it aloud,
His mother would cry.

Everyday his parents were sad,
Because they loved their little one.
But that made the fox sad.
He dreamt everything would be well,
Just like the old days
But all his dreams fell.

He wondered if there is a God above
So that one day when he goes there
With reverence and love to Him he would bow.

Now this was his new dream
That when he will fight the good fight and finish the race,
He would go there and say,
"To my Father be all the praise!"</pre>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="narrow">
    <p class="eyebrow">Her story, in her family's voice</p>
    <h2>The documentary</h2>
    <div class="embed">
      <div class="embed-placeholder">
        <p><strong>Catherine's story film</strong></p>
        <p>Watch on the foundation's channel while the embed is finalised.</p>
        <a class="btn btn--green" href="${CONTACT.youtube}" rel="noopener">Watch on YouTube ↗</a>
      </div>
    </div>
    <p class="note" style="margin-top:1rem">To embed the film directly, replace this block's inner markup with the YouTube iframe for the chosen video from <a href="${CONTACT.youtube}" rel="noopener">@catherinehopefoundation2407</a>.</p>
    <p style="margin-top:2rem"><a class="btn btn--gold btn--lg" href="/partner/donate">Carry her dream forward</a></p>
  </div>
</section>`
  );

  /* =================================================================== */
  /* WORK (overview)                                                     */
  /* =================================================================== */
  add(
    {
      slug: "/work",
      title: "Our Work — Four Pillars | Catherine Hope Foundation",
      desc: "Raising Catherines, Community Care, Emergency Response and Catherine Stree — four pillars, one promise: to understand each person's pain and answer it personally.",
    },
    `<section class="section">
  <div class="narrow">
    <p class="crumb"><a href="/">Home</a> / Our Work</p>
    <p class="eyebrow">What we do</p>
    <h1>Four pillars, one promise</h1>
    <p class="lede">Catherine dreamed of a foundation that would understand each person's pain and help them individually, with tailor-made care. These four pillars are how we keep that promise.</p>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="wrap"><div class="grid grid-2">${pillarCards}</div></div>
</section>
<section class="section section--green"><div class="wrap center">
  <h2>Every pillar needs people</h2>
  <p class="lede" style="color:#E7DFCF;max-width:52ch;margin-inline:auto">Choose the work that moves you — and become part of it.</p>
  <p style="margin-top:1.5rem"><a class="btn btn--gold btn--lg" href="/partner">See how to partner</a></p>
</div></section>`
  );

  /* --- helper for a work sub-page ------------------------------------ */
  function workPage({ slug, title, desc, eyebrow, h1, lede, hero, heroAlt, sections, cta }) {
    const secHtml = sections
      .map(
        (s) => `<div class="story-block">
        <h3>${s.h}</h3>
        ${s.p.map((x) => `<p>${x}</p>`).join("")}
        ${s.list ? `<ul class="stack" style="max-width:var(--measure)">${s.list.map((li) => `<li>${li}</li>`).join("")}</ul>` : ""}
      </div>`
      )
      .join("\n");
    add(
      { slug, title, desc },
      `<section class="section">
  <div class="wrap split">
    <div>
      <p class="crumb"><a href="/">Home</a> / <a href="/work">Our Work</a></p>
      <p class="eyebrow">${eyebrow}</p>
      <h1>${h1}</h1>
      <p class="lede">${lede}</p>
      <p><a class="btn btn--gold" href="${cta[0]}">${cta[1]}</a></p>
    </div>
    <img src="${hero}" alt="${heroAlt}" width="640" height="480" loading="lazy" fetchpriority="high">
  </div>
</section>
<section class="section" style="padding-top:0"><div class="narrow stack">${secHtml}</div></section>
<section class="section section--paper2"><div class="wrap center">
  <h2>Be part of this work</h2>
  <p style="margin-top:1rem"><a class="btn btn--green btn--lg" href="${cta[0]}">${cta[1]}</a></p>
</div></section>`
    );
  }

  workPage({
    slug: "/work/centre",
    title: "Raising Catherines — The Catherine Hope Center | CHF",
    desc: "At the Catherine Hope Center in Ennore, vulnerable children receive tuition, music, computers, spoken English, healthy snacks, a library and the Change Ambassadors Programme.",
    eyebrow: "Pillar 01 · The Centre, Ennore",
    h1: "Raising Catherines",
    lede: "We are determined to raise many more Catherines — giving every child the facilities and privileges Catherine herself would have received.",
    hero: "/images/programmes/daily_tuitions.jpg",
    heroAlt: "Children at the Catherine Hope Center concentrating during daily tuition",
    cta: ["/partner/sponsor-a-catherine", "Sponsor a Catherine"],
    sections: [
      {
        h: "A childhood worth protecting",
        p: [
          "At Catherine Hope Center, Ennore, we believe every child deserves the same love, care and opportunity Catherine would have received. We go beyond academics — we celebrate creativity and expression, and we nurture the unique talent of each child in a warm, supportive community.",
          "Since joining the Centre, children have shown remarkable progress not only in studies and behaviour but in their enthusiasm for learning and taking part.",
        ],
      },
      {
        h: "What a day at the Centre holds",
        p: ["We nurture both minds and hearts through:"],
        list: [
          "<strong>Daily tuition</strong> that supports each child's academic growth.",
          "<strong>The Change Ambassadors Programme</strong> — building leadership, emotional resilience and life skills through compassionate counselling and mentorship.",
          "<strong>Nourishing snacks</strong>, prepared with love, so no child learns on an empty stomach.",
          "<strong>Spoken English and music classes</strong> that grow creativity, expression and confidence.",
          "<strong>Computer training</strong> that opens a door to opportunity.",
          "<strong>A library</strong> of engaging books that opens doors to worlds once only dreamed of.",
        ],
      },
    ],
  });

  workPage({
    slug: "/work/community-care",
    title: "Community Care — DAEP, Cancer Warriors, Widows & Elders | CHF",
    desc: "Personalised, dignified care for the differently-abled, cancer warriors, widows and abandoned elders — groceries, medical aid, wheelchairs, housing and healthy grains.",
    eyebrow: "Pillar 02 · Community",
    h1: "Community Care",
    lede: "We serve entire communities through a range of life-changing initiatives — with dignity at the centre of every one.",
    hero: "/images/programmes/cancer.jpg",
    heroAlt: "A cancer warrior supported by the Catherine Hope Foundation's community care",
    cta: ["/partner/donate", "Fund community care"],
    sections: [
      {
        h: "Who we walk alongside",
        p: ["Catherine's own dream was to understand each person's pain in a personalised way. These programmes carry that forward:"],
        list: [
          "<strong>Differently-Abled Empowerment (DAEP)</strong> — a holistic development plan for the differently-abled.",
          "<strong>Cancer Warriors' Care</strong> — food, shelter, essentials and financial aid for those battling cancer.",
          "<strong>Widows Welfare</strong> — monthly groceries and emotional care for widows affected by addiction, illness or lack of medical aid.",
          "<strong>Senior Citizens' Support</strong> — monthly groceries and essential care for abandoned and vulnerable elders, with dignity and comfort in their golden years.",
          "<strong>Healthy Grains Programme</strong> — nutritious food essentials for families and children in need.",
          "<strong>Wheelchair donations & Housing Initiative</strong> — mobility, shelter, and the strength that comes with stability.",
        ],
      },
      {
        h: "Home is life",
        p: [
          "Through the Housing Initiative we build strength, stability and self-reliance through shelter — because a safe home is where every second chance begins.",
        ],
      },
    ],
  });

  workPage({
    slug: "/work/response",
    title: "Emergency Response — Floods, Beat the Heat & Relief | CHF",
    desc: "Rapid-response relief during floods, heatwaves, COVID and emergencies — groceries, supplies and heartfelt support delivered where they're needed most.",
    eyebrow: "Pillar 03 · Emergencies",
    h1: "Emergency Response",
    lede: "When crisis strikes, hope cannot wait. We move fast — with supplies and with presence.",
    hero: "/images/programmes/need_3.jpg",
    heroAlt: "Relief supplies being prepared by the Catherine Hope Foundation",
    cta: ["/partner/donate", "Fuel rapid relief"],
    sections: [
      {
        h: "Ready when it matters",
        p: ["Our Emergency Assistance provides rapid-response relief during natural disasters and crises:"],
        list: [
          "<strong>Flood relief</strong> — groceries, supplies and support for families cut off by rising waters.",
          "<strong>Beat the Heat</strong> — hydration and care through India's fiercest summers.",
          "<strong>COVID &amp; health emergencies</strong> — essentials for households in lockdown or crisis.",
          "<strong>Everyday emergencies</strong> — showing up for families at their hardest moment.",
        ],
      },
    ],
  });

  workPage({
    slug: "/work/catherine-stree",
    title: "Catherine Stree — Women's Livelihood Social Enterprise | CHF",
    desc: "Catherine Stree trains mothers in baking and jewellery-making so they can earn, feed their children and stand with pride. Invest in a maker.",
    eyebrow: "Pillar 04 · Livelihoods",
    h1: "Catherine Stree",
    lede: "A women's livelihood movement — because when a mother earns, a whole family rises.",
    hero: "/images/galleries/women_1.jpg",
    heroAlt: "Women in the Catherine Hope Foundation livelihood programme with their handmade products",
    cta: ["/partner/donate", "Invest in a maker"],
    sections: [
      {
        h: "Why we started",
        p: [
          "We began the Women Empowerment Programme after the children at the Centre told us they went to bed hungry — many living with alcoholic or abusive fathers and daily hardship. To support these children, we chose to strengthen their mothers.",
          "We learned each woman's interests and skills, then focused training on what they could learn most readily: baking and simple jewellery-making.",
        ],
      },
      {
        h: "The model",
        p: [
          "Through these skills, mothers have gained the ability to support their families financially. It has opened doors to new opportunity and grown a real sense of independence and pride.",
        ],
        list: [
          "<strong>Product lines</strong> — home baking and handcrafted jewellery, made with care.",
          "<strong>Invest in a maker</strong> — fund a woman's tools and training so she can earn for good.",
          "<strong>The QR story</strong> — each product can carry a code linking to the maker's story, so every purchase becomes a relationship, not a transaction.",
        ],
      },
      {
        h: "Where we're heading",
        p: [
          "\"With every step they take, the women in our programme inspire us to believe in the brighter future we're creating together.\" We remain committed to empowering women and nurturing their potential — building a healthier, more resilient community.",
        ],
      },
    ],
  });

  /* =================================================================== */
  /* CHANGED LIVES                                                       */
  /* =================================================================== */
  const lives = [];
  for (let i = 2; i <= 12; i++) lives.push(i);
  const livesCards = lives
    .map(
      (n) => `<figure class="card">
      <img loading="lazy" decoding="async" src="/images/changed-lives/life_${n}.jpg" alt="A person whose life changed through the Catherine Hope Foundation, pictured with dignity" width="600" height="400">
      <figcaption class="card-body">
        <span class="card-tag">Changed life</span>
        <h3>A second chance</h3>
        <p>${ph(`life_${n}_name`)} — ${ph(`life_${n}_story`)}</p>
      </figcaption>
    </figure>`
    )
    .join("\n");
  add(
    {
      slug: "/changed-lives",
      title: "Changed Lives — Real Stories | Catherine Hope Foundation",
      desc: "Twelve real people whose lives turned a corner through the Catherine Hope Foundation. Told with dignity, never pity.",
    },
    `<section class="section">
  <div class="narrow">
    <p class="crumb"><a href="/">Home</a> / Changed Lives</p>
    <p class="eyebrow">The proof is in the people</p>
    <h1>Changed lives</h1>
    <p class="lede">Behind every programme is a person. These are some of the lives that turned a corner — shared with their dignity intact.</p>
    <p class="note">Each card holds a placeholder name and story. A team member will fill these with the real, consented details before publishing — we never invent a person's story.</p>
  </div>
</section>
<section class="section" style="padding-top:0"><div class="wrap"><div class="grid grid-3">${livesCards}</div></div></section>
<section class="section section--green"><div class="wrap center">
  <h2>Write the next story with us</h2>
  <p style="margin-top:1rem"><a class="btn btn--gold btn--lg" href="/partner/sponsor-a-catherine">Sponsor a Catherine</a></p>
</div></section>`
  );

  /* =================================================================== */
  /* GALLERY                                                             */
  /* =================================================================== */
  add(
    {
      slug: "/gallery",
      title: "Gallery | Catherine Hope Foundation",
      desc: "Moments from the everyday life and work of the Catherine Hope Foundation — the Centre, the building, the community and the women's programme.",
      bodyScripts: '\n<script src="/js/gallery.js" defer></script>',
    },
    `<section class="section">
  <div class="wrap">
    <p class="crumb"><a href="/">Home</a> / Gallery</p>
    <p class="eyebrow">In pictures</p>
    <h1>Moments of hope</h1>
    <p class="lede">Everyday life at the Catherine Hope Foundation — the Centre, the rising building, the community, and the women changing their families' futures.</p>
    <div class="gallery-filters" id="gallery-filters" role="group" aria-label="Filter gallery"></div>
    <div class="masonry" id="gallery-grid"></div>
    <noscript><p class="note">Enable JavaScript to browse the full gallery, or view our photos on <a href="${CONTACT.youtube}">YouTube</a>.</p></noscript>
  </div>
</section>`
  );

  /* =================================================================== */
  /* PARTNER hub + doors                                                 */
  /* =================================================================== */
  add(
    {
      slug: "/partner",
      title: "Partner With Us | Catherine Hope Foundation",
      desc: "Four ways to stand with the Catherine Hope Foundation: donate, sponsor a Catherine, sponsor a pillar of the new Centre, or partner through corporate CSR.",
    },
    `<section class="section">
  <div class="narrow">
    <p class="crumb"><a href="/">Home</a> / Partner</p>
    <p class="eyebrow">Stand with us</p>
    <h1>Four doors, all leading to a second chance</h1>
    <p class="lede">However you choose to help, it is stewarded with care and eligible for 80G tax relief.</p>
  </div>
</section>
<section class="section" style="padding-top:0"><div class="wrap"><div class="grid grid-2">${waysCards}</div></div></section>
<section class="section section--paper2" style="padding-block:3rem">${trustStrip}</section>`
  );

  function partnerPage(slug, title, desc, eyebrow, h1, body) {
    add(
      { slug, title, desc },
      `<section class="section">
  <div class="narrow">
    <p class="crumb"><a href="/">Home</a> / <a href="/partner">Partner</a> / ${h1}</p>
    <p class="eyebrow">${eyebrow}</p>
    <h1>${h1}</h1>
    ${body}
  </div>
</section>`
    );
  }

  partnerPage(
    "/partner/donate",
    "Donate | Catherine Hope Foundation",
    "Give once or monthly to the Catherine Hope Foundation. Every rupee is stewarded with care and eligible for 80G tax relief in India.",
    "Give",
    "Donate",
    `<p class="lede">Your gift becomes tuition, a warm snack, a wheelchair, a mother's first income, a pillar of a new home.</p>
    <div class="grid grid-3" style="margin:2rem 0">
      <div class="stat"><span class="num">₹${ph("cost_child_month")}</span><span class="label">supports one child for a month</span></div>
      <div class="stat"><span class="num">₹${ph("cost_grocery")}</span><span class="label">a month's groceries for a family</span></div>
      <div class="stat"><span class="num">₹${ph("cost_wheelchair")}</span><span class="label">one wheelchair, one new horizon</span></div>
    </div>
    <div class="note">
      <p style="margin:0"><strong>To complete the donation setup:</strong> connect the foundation's payment link or gateway (UPI / Razorpay / bank transfer) here. Bank and UPI details, and the 80G receipt flow, are held by the CHF team.</p>
    </div>
    <p style="margin-top:1.5rem"><a class="btn btn--gold btn--lg" href="mailto:${CONTACT.email}?subject=I'd like to donate">Email us to give today</a></p>
    <p style="margin-top:1rem">Prefer to talk first? Call <a href="tel:${CONTACT.phoneRaw}">${CONTACT.phone}</a>. ${CONTACT.trust}. ${CONTACT.g80}.</p>`
  );

  partnerPage(
    "/partner/sponsor-a-catherine",
    "Sponsor a Catherine | Catherine Hope Foundation",
    "Walk with one child through a full year of learning, mentoring, music, meals and care at the Catherine Hope Center.",
    "Sponsor",
    "Sponsor a Catherine",
    `<p class="lede">Choose one child and carry them through a whole year — tuition, mentoring, music, spoken English, computer training, healthy snacks and the Change Ambassadors Programme.</p>
    <p>A sponsor receives updates on their child's progress, so you see the second chance unfold. Annual sponsorship is approximately ₹${ph("sponsorship_year")} — the CHF team will confirm the current figure and match you with a child.</p>
    <p style="margin-top:1.5rem"><a class="btn btn--gold btn--lg" href="mailto:${CONTACT.email}?subject=Sponsor a Catherine">Begin a sponsorship</a></p>`
  );

  partnerPage(
    "/partner/sponsor-a-pillar",
    "Sponsor a Pillar | Catherine Hope Foundation",
    "Name one of the 28 foundation pillars of the new Catherine Hope Center. 11 are built, 2 in progress — help the next one rise.",
    "Build",
    "Sponsor a Pillar",
    `<p class="lede">The new Catherine Hope Center rises on 28 foundation pillars. Eleven stand complete, two are in progress. Name a pillar and help the next one rise.</p>
    ${pillarTracker()}
    <p style="margin-top:1.5rem">The full Centre costs ₹1.8 crore. A named pillar is roughly ₹${ph("cost_pillar")} — the team will confirm today's figure and dedicate your pillar in the name you choose.</p>
    <p style="margin-top:1rem"><a class="btn btn--gold btn--lg" href="mailto:${CONTACT.email}?subject=Sponsor a Pillar">Name a pillar</a></p>`
  );

  partnerPage(
    "/partner/corporate-csr",
    "Corporate & CSR | Catherine Hope Foundation",
    "Section 135-ready CSR partnerships with the Catherine Hope Foundation: 80G receipts, employee volunteering, festive gifting and measurable impact.",
    "Business",
    "Corporate & CSR",
    `<p class="lede">A meaningful, compliant home for your CSR — with real children, real mothers, and reporting you can stand behind.</p>
    <ul class="stack" style="max-width:var(--measure)">
      <li><strong>Section 135 CSR</strong> — fund a programme or the new Centre with clear, documented outcomes.</li>
      <li><strong>80G tax benefit</strong> — receipts issued for eligible contributions (AACTC7794BF20212).</li>
      <li><strong>Employee volunteering</strong> — mentoring, teaching and events at the Centre.</li>
      <li><strong>Festive &amp; gifting</strong> — source Catherine Stree products for corporate gifting and empower a maker with every purchase.</li>
    </ul>
    <p style="margin-top:1.5rem"><a class="btn btn--gold btn--lg" href="mailto:${CONTACT.email}?subject=Corporate / CSR partnership">Start a conversation</a></p>`
  );

  /* =================================================================== */
  /* IMPACT                                                              */
  /* =================================================================== */
  add(
    {
      slug: "/impact",
      title: "Impact & Governance | Catherine Hope Foundation",
      desc: "The Catherine Hope Foundation's impact dashboard, governance and registration details. We publish only verified numbers.",
    },
    `<section class="section">
  <div class="narrow">
    <p class="crumb"><a href="/">Home</a> / Impact</p>
    <p class="eyebrow">Accountable by design</p>
    <h1>Impact &amp; governance</h1>
    <p class="lede">We would rather show you a blank than a number we can't stand behind. Every figure below marked in gold is a placeholder awaiting verification.</p>
  </div>
</section>
<section class="section" style="padding-top:0"><div class="wrap">
  <div class="grid grid-4">
    <div class="stat"><span class="num">${ph("children_at_centre")}</span><span class="label">children at the Centre</span></div>
    <div class="stat"><span class="num">${ph("families_supported")}</span><span class="label">families supported monthly</span></div>
    <div class="stat"><span class="num">${ph("women_trained")}</span><span class="label">women trained to earn</span></div>
    <div class="stat"><span class="num">${ph("wheelchairs_given")}</span><span class="label">wheelchairs gifted</span></div>
    <div class="stat"><span class="num">${ph("meals_served")}</span><span class="label">healthy snacks served</span></div>
    <div class="stat"><span class="num">${ph("elders_supported")}</span><span class="label">elders cared for</span></div>
    <div class="stat"><span class="num">11 / 28</span><span class="label">pillars of the new Centre built</span></div>
    <div class="stat"><span class="num">₹1.8cr</span><span class="label">building goal</span></div>
  </div>
</div></section>
<section class="section section--paper2"><div class="narrow">
  <h2>Governance &amp; registration</h2>
  <ul class="stack" style="max-width:var(--measure)">
    <li>${CONTACT.trust}.</li>
    <li>${CONTACT.g80} — donations eligible for tax relief in India.</li>
    <li>Founders &amp; trustees: Selvinson and Graciana (Catherine's parents). Full trustee list on the <a href="/about">About</a> page.</li>
    <li>Registered office: ${CONTACT.address}.</li>
  </ul>
  <h3 style="margin-top:2rem">Annual report</h3>
  <div class="note">Our latest annual report will be published here. Ask the team for the current PDF at <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>.</div>
</div></section>`
  );

  /* =================================================================== */
  /* ABOUT                                                               */
  /* =================================================================== */
  add(
    {
      slug: "/about",
      title: "About Us — Founders & Team | Catherine Hope Foundation",
      desc: "Meet the founders Selvinson and Graciana, and the team carrying forward Catherine's dream at the Catherine Hope Foundation in Chennai.",
    },
    `<section class="section">
  <div class="narrow">
    <p class="crumb"><a href="/">Home</a> / About</p>
    <p class="eyebrow">Who we are</p>
    <h1>Carrying one girl's dream</h1>
    <p class="lede">The Catherine Hope Foundation exists to make Catherine's vision real — to assist and transform the lives of the underprivileged, support the differently-abled, give medical aid to cancer patients, and walk with anyone struggling with depression or dire need.</p>
  </div>
</section>
<section class="section" style="padding-top:0"><div class="narrow">
  <h2>Our mission</h2>
  <p>To serve with a gentle and compassionate heart — to lift the downtrodden and bring true transformation to individuals, leading to empowered, depression-free and healthy communities. We build multifaceted platforms that enable people from all walks of life to live life to its fullest.</p>
  <h2 style="margin-top:2.5rem">The founders</h2>
  <div class="split" style="margin-top:1.5rem">
    <img src="/images/story/catherine_6.png" alt="Catherine with her parents, Selvinson and Graciana" width="600" height="450" loading="lazy">
    <div>
      <p><strong>Selvinson &amp; Graciana</strong> are Catherine's parents. When Catherine passed, they chose to take up the dream she never got to build — a foundation that understands each person's pain and helps them individually, with tailor-made care. They lead CHF with that same personal touch today.</p>
    </div>
  </div>
  <h2 style="margin-top:2.5rem">Team &amp; trustees</h2>
  <p>Our teachers, counsellors, volunteers and trustees make the daily work possible. ${ph("team_details")} — the full team and trustee list will be added here.</p>
  <h2 style="margin-top:2.5rem">Reach us</h2>
  <ul class="stack" style="max-width:var(--measure)">
    <li><strong>Phone:</strong> <a href="tel:${CONTACT.phoneRaw}">${CONTACT.phone}</a></li>
    <li><strong>Email:</strong> <a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
    <li><strong>Registered office:</strong> ${CONTACT.address}</li>
    <li><strong>Centre:</strong> ${CONTACT.centre}</li>
  </ul>
  <p style="margin-top:1.5rem"><a class="btn btn--green" href="/contact">Send us a message</a></p>
</div></section>`
  );

  /* =================================================================== */
  /* CONTACT                                                             */
  /* =================================================================== */
  add(
    {
      slug: "/contact",
      title: "Contact | Catherine Hope Foundation",
      desc: "Get in touch with the Catherine Hope Foundation in Chennai — to give, volunteer, partner, or simply say hello.",
      bodyScripts: '\n<script src="/js/contact.js" defer></script>',
    },
    `<section class="section">
  <div class="split wrap">
    <div>
      <p class="crumb"><a href="/">Home</a> / Contact</p>
      <p class="eyebrow">Say hello</p>
      <h1>Let's talk</h1>
      <p class="lede">To give, volunteer, intern or partner — or just to learn more — we would love to hear from you.</p>
      <ul class="stack" style="max-width:var(--measure)">
        <li><strong>Phone:</strong> <a href="tel:${CONTACT.phoneRaw}">${CONTACT.phone}</a></li>
        <li><strong>Email:</strong> <a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li><strong>Office:</strong> ${CONTACT.address}</li>
        <li><strong>Centre:</strong> ${CONTACT.centre}</li>
      </ul>
    </div>
    <form id="contact-form" novalidate>
      <div class="field"><label for="name">Your name</label><input id="name" name="name" type="text" required autocomplete="name"></div>
      <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required autocomplete="email"></div>
      <div class="field"><label for="message">Message</label><textarea id="message" name="message" required></textarea></div>
      <button class="btn btn--gold btn--lg" type="submit">Send message</button>
      <p class="form-status" id="contact-status" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>`
  );

  return pages;
}
