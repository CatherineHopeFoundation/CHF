/**
 * content.js — all pages for the Catherine Hope Foundation site.
 * Copy is the verified content from the brief (source of truth). Any value not
 * verified is a clearly-marked {{placeholder}}. Never fabricate numbers/quotes.
 */

export function PAGES({ layout, ph, CONTACT, ORG_JSONLD, SITE }) {
  const pages = [];
  const add = (meta, content) => pages.push({ slug: meta.slug, html: layout(meta, content) });

  /* ---------- shared fragments --------------------------------------- */
  const FOCUS = [
    ["Differently-Abled Empowerment", "differently_abled.jpg", "Crutches, prosthetics, wheelchairs and rehabilitation — restoring mobility and dignity through our DAEP programme."],
    ["Cancer Warriors' Care", "cancer_care.jpg", "Financial support and a place to stay during treatment for poor cancer patients, walking with them through the fight."],
    ["Mental Health & Hope", "mental_health.jpg", "Counselling and a safe space for teens and young adults struggling with depression — the cause closest to Catherine's heart."],
    ["Children's Education", "education.jpg", "Daily tuition, spoken English, computers, music and a library at the Catherine Hope Center, Ennore."],
    ["Widows & Vulnerable Women", "cancer_care.jpg", "Welfare support and livelihood training that helps women stand on their own and provide for their families.", "/images/galleries/widowschf_1.jpg"],
    ["The Poorest of the Poor", "education.jpg", "Healthy grains, housing support and emergency assistance for families with nowhere else to turn.", "/images/galleries/health_g_1.jpg"],
  ];
  const focusCards = FOCUS.map((f) => {
    const img = f[3] || `/images/focus/${f[1]}`;
    return `<a class="focus" href="/focus-areas">
      <img loading="lazy" src="${img}" alt="${f[0]} — Catherine Hope Foundation" width="400" height="300">
      <div class="f-body"><h3>${f[0]}</h3><p>${f[2]}</p></div>
    </a>`;
  }).join("\n");

  const PROGRAMMES = {
    Education: [
      ["Daily Tuitions", "/images/programmes/daily_tuitions.jpg", "All subjects, every day, so no child falls behind."],
      ["Spoken English", "/images/galleries/spoken_english_1.jpg", "Confidence to speak, read and dream bigger."],
      ["Computer Class", "/images/galleries/computer_t_1.jpg", "Job-ready digital skills for young people."],
      ["Music Class", "/images/programmes/music_class.jpg", "Since 2022 — joy, discipline and self-expression."],
      ["Change Ambassadors", "/images/programmes/change_ambassadors.jpg", "Leadership, resilience and life skills."],
      ["Library & Reading", "/images/galleries/daily_t_2.jpg", "Mandatory reading sessions and a world of books."],
      ["Industrial Visits", "/images/programmes/industrial_visit.jpg", "Corporate & factory visits that widen horizons."],
      ["Parent–Teacher Meets", "/images/programmes/parent_teacher.jpg", "Families and teachers, growing children together."],
    ],
    "Empowerment & Care": [
      ["Differently-Abled (DAEP)", "/images/galleries/diff_abled_1.jpg", "Crutches, prosthetics and rehabilitation."],
      ["Wheelchair Donation", "/images/galleries/twd_1.jpg", "Mobility and independence, gifted with care."],
      ["Cancer Warriors' Care", "/images/galleries/cwcp_1.jpg", "Funds, essentials and shelter during treatment."],
      ["Widows Welfare", "/images/galleries/widowschf_1.jpg", "Monthly support and dignity for widows."],
      ["Women Empowerment", "/images/galleries/wepm_pgm_1.jpg", "Livelihood skills so mothers can earn."],
      ["Healthy Grains", "/images/galleries/health_g_1.jpg", "Nutritious essentials for families in need."],
    ],
    Response: [
      ["Flood Relief", "/images/galleries/floodp_1.jpg", "Groceries and supplies when the waters rise."],
      ["COVID Relief", "/images/galleries/covidp_15.jpg", "Essentials for households through the pandemic."],
      ["Beat the Heat", "/images/galleries/beatheatp_1.jpg", "Water and care through fierce summers."],
      ["Emergency Assistance", "/images/programmes/industrial_visit.jpg", "Showing up fast when crisis strikes."],
    ],
  };

  function progGroup(title, items) {
    const cards = items
      .map(
        (i) => `<article class="card">
        <img loading="lazy" decoding="async" src="${i[1]}" alt="${i[0]} — Catherine Hope Foundation" width="400" height="267">
        <div class="card-body"><h3>${i[0]}</h3><p>${i[2]}</p></div>
      </article>`
      )
      .join("\n");
    return `<h3 style="margin-top:2rem">${title}</h3><div class="grid g4" style="margin-top:1rem">${cards}</div>`;
  }

  const CHANGED = [
    ["Santhakumar", "/images/changed-lives/santhakumar.jpg", "A DAEP beneficiary since 2020 — supported with care, mobility and dignity.", true],
    ["Anjali", "/images/changed-lives/life_2.jpg", "A girl in class 2 who lost her leg in an accident, now walking her own path.", false],
    ["Mahalakshmi", "/images/changed-lives/life_3.jpg", "A student in the very first batch of our computer class.", false],
    ["Kunta", "/images/changed-lives/life_4.jpg", "From Maharashtra — his confidence restored, his spirit undefeated.", false],
    ["Karuthapandi", "/images/changed-lives/life_5.jpg", "From Dindigul — differently-abled, a brick cutter and sole breadwinner for his family of four, including sons Dhanakabilan and Karthikraja.", false],
    ["A father of two", "/images/changed-lives/life_6.jpg", "Paralysed and bedridden, a father of two young daughters — met with care and dignity.", false],
  ];
  const changedCards = CHANGED.map(
    (c) => `<article class="card">
    <img loading="lazy" decoding="async" src="${c[1]}" alt="${c[0]}, a life changed through the Catherine Hope Foundation" width="400" height="267">
    <div class="card-body">
      <span class="tag">Changed life</span>
      <h3>${c[0]}</h3>
      <p>${c[2]}</p>
      ${c[3] ? "" : '<p style="font-size:0.78rem;color:var(--gray)"><em>Photo pairing to be confirmed by the team.</em></p>'}
    </div>
  </article>`
  ).join("\n");

  const TIMELINE = [
    ["19 Oct 2002", "Catherine is born in Mumbai. Her name means “pure.”"],
    ["26 Feb 2020", "Catherine enters her heavenly abode at 17. CHF is founded to continue her legacy."],
    ["1 Aug 2021", "The Catherine Hope Center opens during COVID-19 to support children left behind in education."],
    ["13 Aug 2022", "The Center's first anniversary excursion."],
    ["24 Sep 2022", "Infosys CSR team visits the Center."],
    ["2022", "Music class begins."],
    ["2024", "NETZSCH industrial visit."],
    ["26 Feb 2025", "Parents share stories of their children's transformation."],
    ["Now", "11 of 28 pillars of the new Center are complete."],
  ];
  const timelineHtml = `<div class="timeline">${TIMELINE.map(
    (t) => `<div class="tl-item"><span class="tl-date">${t[0]}</span><p>${t[1]}</p></div>`
  ).join("")}</div>`;

  // Gallery marquee (duplicated set for seamless scroll)
  const MARQUEE = [
    "/images/galleries/raising_1.jpg","/images/galleries/music_class_1.jpg","/images/galleries/cwcp_1.jpg",
    "/images/galleries/diff_abled_2.jpg","/images/galleries/wepm_pgm_2.jpg","/images/galleries/health_g_2.jpg",
    "/images/galleries/computer_t_2.jpg","/images/galleries/beatheatp_2.jpg","/images/galleries/spoken_english_2.jpg",
    "/images/galleries/cambossador_1.jpg","/images/galleries/snakschf_1.jpg","/images/galleries/widowschf_2.jpg",
  ];
  const marqueeHtml = `<div class="marquee"><div class="marquee-track">${[...MARQUEE, ...MARQUEE]
    .map((s) => `<img loading="lazy" src="${s}" alt="A moment from the Catherine Hope Foundation's work" height="220">`)
    .join("")}</div></div>`;

  function ctaBand() {
    return `<div class="cta-band">
      <p class="hand" style="color:#fff;font-size:1.6rem;margin:0">Live every moment.</p>
      <h2>Your kindness raises the next Catherine</h2>
      <p class="mw center" style="margin-inline:auto">Every gift becomes tuition, a wheelchair, a warm meal, a pillar of a new home. Give with love.</p>
      <div class="btn-row" style="justify-content:center;margin-top:1.5rem">
        <a class="btn btn-white btn-lg" href="/get-involved#donate">❤ Donate now</a>
        <a class="btn btn-outline btn-lg" href="/get-involved" style="color:#fff">Other ways to help</a>
      </div>
    </div>`;
  }

  /* =================================================================== */
  /* HOME                                                                */
  /* =================================================================== */
  const SLIDES = [
    ["Serve with Love to Empower", "One girl's courage became a movement of hope for the differently-abled, cancer warriors, and those who had lost their way.", "In loving memory of Catherine", "slider_1.jpg"],
    ["Raising many more Catherines", "Every child at the Catherine Hope Center deserves the education, care and joy Catherine would have wanted for them.", "One Catherine at a time", "slider_2.jpg"],
    ["Building a permanent home for hope", "11 of 28 foundation pillars are complete. Help us lay the next pillar of change.", "The new Catherine Hope Center", "slider_3.jpg"],
  ];
  const slidesHtml = SLIDES.map(
    (s, i) => `<div class="slide${i === 0 ? " active" : ""}" data-slide="${i}" ${i === 0 ? "" : 'aria-hidden="true"'}>
      <img src="/images/hero/${s[3]}" alt="" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} width="1600" height="900">
      <div class="wrap"><div class="slide-body">
        <span class="slide-kicker">${s[2]}</span>
        <h1>${s[0]}</h1>
        <p>${s[1]}</p>
        <div class="btn-row"><a class="btn btn-coral btn-lg" href="/get-involved#donate">❤ Donate</a><a class="btn btn-outline btn-lg" href="/story" style="color:#fff">Catherine's story</a></div>
      </div></div>
    </div>`
  ).join("\n");

  add(
    {
      slug: "/",
      title: "Catherine Hope Foundation — Serve with Love to Empower",
      desc: "Catherine Hope Foundation is a registered Indian charitable trust founded in memory of Catherine Selvinson. We serve the differently-abled, cancer warriors, and those struggling with depression — with love.",
      jsonld: ORG_JSONLD,
      bodyScripts: '\n<script src="/js/home.js" defer></script>',
    },
    `<section class="hero" aria-roledescription="carousel" aria-label="Our work">
  <div class="slides" id="slides">${slidesHtml}</div>
  <button class="hero-arrow prev" id="slidePrev" aria-label="Previous slide">‹</button>
  <button class="hero-arrow next" id="slideNext" aria-label="Next slide">›</button>
  <div class="hero-dots" id="slideDots" role="tablist"></div>
</section>

<section class="section soft">
  <div class="wrap">
    <p class="center"><span class="live-dot">Our impact so far</span></p>
    <div class="counters" style="margin-top:1rem">
      <div class="counter"><span class="num" data-count="11">0</span><span class="label">of 28 pillars of the new Center built</span></div>
      <div class="counter"><span class="num placeholder" data-count="0">${ph("lives_touched")}</span><span class="label">lives touched since 2020</span></div>
      <div class="counter"><span class="num" data-count="6">0</span><span class="label">focus areas of care</span></div>
      <div class="counter"><span class="num placeholder">${ph("volunteers_staff")}</span><span class="label">volunteers &amp; staff</span></div>
    </div>
    <p class="center note mw" style="margin:1.5rem auto 0">Numbers shown in gold are placeholders — the team will replace each with a verified figure. We never publish an impact number we can't stand behind.</p>
  </div>
</section>

<section class="section">
  <div class="wrap center">
    <p class="eyebrow">Who we walk with</p>
    <h2>Six ways we serve with love</h2>
    <p class="lede mw center" style="margin-inline:auto">Anchored by Catherine's own compassion for the differently-abled, cancer warriors and the depressed.</p>
    <div class="grid g3" style="margin-top:2.5rem;text-align:left">${focusCards}</div>
  </div>
</section>

<section class="section soft">
  <div class="wrap split">
    <img src="/images/story/catherine_hero.jpg" alt="Catherine Selvinson, whose courage inspired the foundation" width="640" height="720" loading="lazy">
    <div>
      <p class="eyebrow">Our story</p>
      <h2>Built in loving memory of Catherine</h2>
      <p>Catherine Selvinson battled cancer fiercely — without falling into depression — and entered her heavenly abode at 17 on 26 February 2020. She spent her short life lifting others out of hopelessness.</p>
      <p>Her parents founded the Catherine Hope Foundation to continue the legacy she left in this world: to serve, with love, everyone the world had forgotten.</p>
      <p class="hand" style="font-size:1.5rem">"Live every moment."</p>
      <a class="btn btn-green" href="/story">Read Catherine's story</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="split">
      <div>
        <p class="eyebrow">The building campaign</p>
        <h2>Help us lay the next pillar</h2>
        <p>For four years the Center moved from one rented space to another; our last building's roof leaked constantly. The new Catherine Hope Center rises on 28 foundation pillars.</p>
        <div class="progress-wrap" style="margin-top:1.2rem">
          <div class="progress-bar"><span data-progress="39" style="width:0%"></span></div>
          <div class="pipeline">
            <div><span class="num">28</span><span class="lb">pillars planned</span></div>
            <div><span class="num">11</span><span class="lb">complete</span></div>
            <div><span class="num">2</span><span class="lb">in progress</span></div>
          </div>
        </div>
        <a class="btn btn-coral" style="margin-top:1.4rem" href="/construction">Sponsor a pillar</a>
      </div>
      <img src="/images/construction/construction_1.jpg" alt="The new Catherine Hope Center taking shape, pillar by pillar" width="640" height="480" loading="lazy">
    </div>
  </div>
</section>

<section class="section soft">
  <div class="wrap center">
    <p class="eyebrow">Changed lives</p>
    <h2>The proof is in the people</h2>
    <div class="grid g3" style="margin-top:2rem;text-align:left">${changedCards.split("</article>").slice(0, 3).join("</article>") + "</article>"}</div>
    <a class="btn btn-green" style="margin-top:2rem" href="/changed-lives">Meet more changed lives</a>
  </div>
</section>

<section class="section">
  <div class="wrap center">
    <p class="eyebrow">In pictures</p>
    <h2>Life at Catherine Hope</h2>
  </div>
  <div style="margin-top:2rem">${marqueeHtml}</div>
  <div class="wrap center" style="margin-top:1.5rem"><a class="btn btn-outline btn-green" href="/gallery" style="color:var(--green)">Open the full gallery</a></div>
</section>

<section class="section"><div class="wrap">${ctaBand()}</div></section>`
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
    description: "Catherine Selvinson inspired the Catherine Hope Foundation.",
  };
  add(
    {
      slug: "/story",
      title: "Catherine's Story | Catherine Hope Foundation",
      desc: "The life of Catherine Selvinson (2002–2020) — gifted, joyful, and unbroken through cancer — and the poem she left behind, 'The Little Fox'.",
      jsonld: STORY_JSONLD,
    },
    `<section class="section">
  <div class="narrow">
    <p class="crumb"><a href="/">Home</a> / Our Story</p>
    <p class="eyebrow">From loss to legacy</p>
    <h1>Catherine Selvinson</h1>
    <p class="lede">19 October 2002 — 26 February 2020. She battled cancer fiercely, and never lost her smile.</p>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="narrow stack" style="font-size:1.08rem">
    <img src="/images/story/catherine_1.png" alt="Catherine Selvinson as a child" width="760" height="500" loading="lazy" style="border-radius:var(--radius-lg);box-shadow:var(--shadow)">
    <p>Catherine was born in Mumbai on 19 October 2002. Her parents named her Catherine — meaning “pure” — and that is what described her best. Intelligent and multi-talented, she was a musician, a sportsperson, a writer and a baker, radiating a gentle warmth that made everyone around her feel at home.</p>
    <p>When cancer came, Catherine met it with a courage that astonished even her doctors. Through surgery, chemotherapy and the loss of her leg, she refused to fall into depression. Instead she turned outward — comforting friends who struggled with hopelessness and even suicidal thoughts, determined that no one around her should feel alone.</p>
    <p>On 26 February 2020, at just 17, Catherine entered her heavenly abode. She left her last message to the world as three words: <strong>“Live every moment.”</strong></p>
    <img src="/images/story/catherine_3.png" alt="Catherine smiling" width="760" height="500" loading="lazy" style="border-radius:var(--radius-lg);box-shadow:var(--shadow)">
    <p>While she was alive, Catherine dreamed of a place that would help those in need — understanding each person's pain and answering it, personally. After she was gone, her parents took up that dream and founded the Catherine Hope Foundation to make it real. Everything CHF does today is her legacy, continued.</p>
  </div>
</section>
<section class="section" style="padding-top:0"><div class="narrow">
  <div class="poem-band">
    <p class="eyebrow" style="color:var(--gold)">In her own words</p>
    <h2>The Little Fox</h2>
    <p style="color:#C9E3D9">by Catherine Selvinson</p>
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
</div></section>
<section class="section" style="padding-top:0"><div class="narrow">
  <p class="eyebrow">Her story on film</p>
  <h2>Watch Catherine's story</h2>
  <div class="embed"><div class="embed-ph">
    <p><strong>Catherine's story film</strong></p>
    <a class="btn btn-coral" href="${CONTACT.youtube}" rel="noopener">Watch on YouTube ↗</a>
  </div></div>
  <p class="note" style="margin-top:1rem">Replace this block with the YouTube iframe for the chosen film from <a href="${CONTACT.youtube}" rel="noopener">@catherinehopefoundation2407</a>.</p>
</div></section>
<section class="section"><div class="wrap">${ctaBand()}</div></section>`
  );

  /* =================================================================== */
  /* ABOUT                                                               */
  /* =================================================================== */
  add(
    {
      slug: "/about",
      title: "About Us | Catherine Hope Foundation",
      desc: "Who we are: a govt-registered Indian charitable trust serving the differently-abled, cancer warriors and the depressed — 'Serve with Love to Empower'.",
    },
    `<section class="section">
  <div class="narrow">
    <p class="crumb"><a href="/">Home</a> / About</p>
    <p class="eyebrow">Who we are</p>
    <h1>Serve with Love to Empower</h1>
  </div>
</section>
<section class="section" style="padding-top:0"><div class="narrow stack" style="font-size:1.06rem">
  <p>Catherine Hope Foundation is anchored by the motto “Serve with Love to Empower” the differently-abled, cancer warriors and depressed. It was built in the loving memory of Catherine Selvinson, who battled cancer fiercely — without going into depression — and entered her heavenly abode at the early age of 17, on 26 February 2020.</p>
  <p>CHF helps differently-abled people in need with basic necessities and rehabilitation; financially supports poor cancer patients and arranges their stay during treatment; and counsels teens and young adults struggling with depression, giving them a safe space to express themselves and grow into responsible citizens. CHF provides both physical and emotional support, continuing the legacy Catherine left in this world.</p>
</div></section>
<section class="section soft"><div class="wrap">
  <div class="counters">
    <div class="counter"><span class="num">Since 2020</span><span class="label">serving in Catherine's memory</span></div>
    <div class="counter"><span class="num">11 / 28</span><span class="label">pillars of the new Center built</span></div>
    <div class="counter"><span class="num">6</span><span class="label">focus areas of care</span></div>
    <div class="counter"><span class="num placeholder">${ph("lives_touched")}</span><span class="label">lives touched</span></div>
  </div>
</div></section>
<section class="section"><div class="wrap split">
  <div>
    <p class="eyebrow">The Catherine Hope Center</p>
    <h2>How the Center began</h2>
    <p>On 1 August 2021, during the height of COVID-19, CHF inaugurated the Catherine Hope Center to support children who had fallen significantly behind in their education — lacking smartphones for online learning, books, or the means to pay school fees. Many had lost basic reading and writing skills.</p>
    <p>We began a comprehensive tuition programme covering all subjects. Today the Center is backed by dedicated volunteers and full-time staff, and has expanded to support differently-abled individuals, widows, vulnerable women, and the poorest of the poor.</p>
  </div>
  <img src="/images/programmes/daily_tuitions.jpg" alt="Children learning at the Catherine Hope Center" width="640" height="480" loading="lazy">
</div></section>
<section class="section soft"><div class="narrow">
  <p class="eyebrow">Our journey</p>
  <h2>Milestones</h2>
  ${timelineHtml}
</div></section>
<section class="section"><div class="narrow">
  <p class="eyebrow">Our people</p>
  <h2>Team &amp; trustees</h2>
  <p>Our founders, teachers, counsellors, volunteers and trustees make the daily work possible. ${ph("team_names_photos")} — the full team and trustee list will be added here.</p>
  <h2 style="margin-top:2rem">Governance &amp; registration</h2>
  <ul class="stack" style="max-width:62ch">
    <li>${CONTACT.reg}.</li>
    <li>${CONTACT.tax}.</li>
    <li>Office: ${CONTACT.office}.</li>
    <li>${CONTACT.centre}.</li>
  </ul>
</div></section>
<section class="section"><div class="wrap">${ctaBand()}</div></section>`
  );

  /* =================================================================== */
  /* FOCUS AREAS                                                         */
  /* =================================================================== */
  const focusDetail = FOCUS.map((f, idx) => {
    const img = f[3] || `/images/focus/${f[1]}`;
    const rev = idx % 2 === 1;
    return `<div class="split" style="margin-bottom:2.5rem">
      ${rev ? "" : `<img src="${img}" alt="${f[0]}" width="600" height="450" loading="lazy">`}
      <div><h2>${f[0]}</h2><p>${f[2]}</p></div>
      ${rev ? `<img src="${img}" alt="${f[0]}" width="600" height="450" loading="lazy">` : ""}
    </div>`;
  }).join("\n");
  add(
    {
      slug: "/focus-areas",
      title: "Focus Areas | Catherine Hope Foundation",
      desc: "Six focus areas: differently-abled empowerment, cancer warriors' care, mental health, children's education, widows & vulnerable women, and the poorest of the poor.",
    },
    `<section class="section">
  <div class="narrow">
    <p class="crumb"><a href="/">Home</a> / Focus Areas</p>
    <p class="eyebrow">Who we walk with</p>
    <h1>Six ways we serve with love</h1>
    <p class="lede">Anchored by Catherine's own compassion — for the differently-abled, cancer warriors and the depressed — and grown to reach whole communities.</p>
  </div>
</section>
<section class="section" style="padding-top:0"><div class="wrap">${focusDetail}</div></section>
<section class="section"><div class="wrap">${ctaBand()}</div></section>`
  );

  /* =================================================================== */
  /* PROGRAMMES                                                          */
  /* =================================================================== */
  add(
    {
      slug: "/programmes",
      title: "Programmes | Catherine Hope Foundation",
      desc: "Every CHF programme, grouped: Education, Empowerment & Care, and Emergency Response — from daily tuitions to wheelchairs, cancer care and flood relief.",
    },
    `<section class="section">
  <div class="narrow">
    <p class="crumb"><a href="/">Home</a> / Programmes</p>
    <p class="eyebrow">What we do, every day</p>
    <h1>Our programmes</h1>
    <p class="lede">From a child's first reading lesson to a family's flood relief — real, practical care, delivered with love.</p>
  </div>
</section>
<section class="section" style="padding-top:0"><div class="wrap">
  ${progGroup("Education", PROGRAMMES.Education)}
  ${progGroup("Empowerment &amp; Care", PROGRAMMES["Empowerment & Care"])}
  ${progGroup("Emergency Response", PROGRAMMES.Response)}
</div></section>
<section class="section"><div class="wrap">${ctaBand()}</div></section>`
  );

  /* =================================================================== */
  /* CHANGED LIVES                                                       */
  /* =================================================================== */
  const moreLives = [7, 8, 9, 10, 11, 12]
    .map(
      (n) => `<article class="card">
      <img loading="lazy" src="/images/changed-lives/life_${n}.jpg" alt="A life changed through the Catherine Hope Foundation, pictured with dignity" width="400" height="267">
      <div class="card-body"><span class="tag">Changed life</span><h3>${ph(`life_${n}_name`)}</h3><p>${ph(`life_${n}_story`)}</p></div>
    </article>`
    )
    .join("\n");
  add(
    {
      slug: "/changed-lives",
      title: "Changed Lives | Catherine Hope Foundation",
      desc: "Real people whose lives turned a corner through the Catherine Hope Foundation — Santhakumar, Anjali, Mahalakshmi, Kunta, Karuthapandi and more. Told with dignity.",
    },
    `<section class="section">
  <div class="narrow">
    <p class="crumb"><a href="/">Home</a> / Changed Lives</p>
    <p class="eyebrow">The proof is in the people</p>
    <h1>Changed lives</h1>
    <p class="lede">Behind every programme is a person. These are some of the lives that turned a corner — shared with their dignity intact.</p>
    <p class="note">Santhakumar's photo is confirmed. Other photo↔name pairings and the remaining stories are placeholders for the team to verify — we never mislabel a real person.</p>
  </div>
</section>
<section class="section" style="padding-top:0"><div class="wrap"><div class="grid g3">
  ${changedCards}
  ${moreLives}
</div></div></section>
<section class="section"><div class="wrap">${ctaBand()}</div></section>`
  );

  /* =================================================================== */
  /* CONSTRUCTION                                                        */
  /* =================================================================== */
  const buildGallery = [1, 2, 3, 4, 5, 6, 9, 10, 11, 12]
    .map((n) => `<figure><img loading="lazy" src="/images/construction/construction_${n}.jpg" alt="Construction progress on the new Catherine Hope Center" width="400" height="300"></figure>`)
    .join("");
  add(
    {
      slug: "/construction",
      title: "Building the New Center | Catherine Hope Foundation",
      desc: "The new Catherine Hope Center rises on 28 foundation pillars — 11 complete, 2 in progress. Help us lay the next pillar of change.",
      bodyScripts: '\n<script src="/js/home.js" defer></script>',
    },
    `<section class="section">
  <div class="narrow">
    <p class="crumb"><a href="/">Home</a> / Construction</p>
    <p class="eyebrow">A permanent home for hope</p>
    <h1>Building the new Center</h1>
    <p class="lede">For four years the Center moved from one rented space to another; our last building's roof leaked constantly. Now, pillar by pillar, we are building a home of our own.</p>
  </div>
</section>
<section class="section" style="padding-top:0"><div class="wrap">
  <div class="progress-wrap">
    <p style="font-family:var(--font-head);font-weight:600;margin:0 0 0.6rem">28 planned pillars · 11 complete · 2 in progress</p>
    <div class="progress-bar"><span data-progress="39" style="width:0%"></span></div>
    <div class="pipeline">
      <div><span class="num">28</span><span class="lb">planned</span></div>
      <div><span class="num">11</span><span class="lb">complete</span></div>
      <div><span class="num">2</span><span class="lb">in progress</span></div>
    </div>
  </div>
  <h2 style="margin-top:2.5rem">The build so far</h2>
  <div class="masonry" style="margin-top:1rem;columns:3 220px">${buildGallery}</div>
</div></section>
<section class="section"><div class="wrap"><div class="cta-band">
  <p class="hand" style="color:#fff;font-size:1.6rem;margin:0">Be part of this journey</p>
  <h2>Sponsor a pillar of change</h2>
  <p class="mw center" style="margin-inline:auto">Name a pillar of the new Catherine Hope Center and help the next one rise. The team will confirm today's sponsorship figure and dedicate your pillar.</p>
  <a class="btn btn-white btn-lg" style="margin-top:1.4rem" href="mailto:${CONTACT.email}?subject=Sponsor%20a%20Pillar">Sponsor a pillar</a>
</div></div></section>`
  );

  /* =================================================================== */
  /* GALLERY                                                             */
  /* =================================================================== */
  add(
    {
      slug: "/gallery",
      title: "Gallery | Catherine Hope Foundation",
      desc: "Photos from the everyday life and work of the Catherine Hope Foundation — the Center, the programmes, the community and the building campaign.",
      bodyScripts: '\n<script src="/js/gallery.js" defer></script>',
    },
    `<section class="section">
  <div class="wrap">
    <p class="crumb"><a href="/">Home</a> / Gallery</p>
    <p class="eyebrow">In pictures</p>
    <h1>Life at Catherine Hope</h1>
    <p class="lede">Filter by the part of our work you'd like to see.</p>
    <div class="filters" id="gallery-filters" role="group" aria-label="Filter gallery"></div>
    <div class="masonry" id="gallery-grid"></div>
    <noscript><p class="note">Enable JavaScript for the full filterable gallery, or see our photos on <a href="${CONTACT.youtube}">YouTube</a>.</p></noscript>
  </div>
</section>`
  );

  /* =================================================================== */
  /* GET INVOLVED                                                        */
  /* =================================================================== */
  add(
    {
      slug: "/get-involved",
      title: "Get Involved | Catherine Hope Foundation",
      desc: "Donate, volunteer, intern or partner through corporate CSR — four ways to stand with the Catherine Hope Foundation.",
      bodyScripts: '\n<script src="/js/contact.js" defer></script>',
    },
    `<section class="section">
  <div class="narrow center">
    <p class="crumb"><a href="/">Home</a> / Get Involved</p>
    <p class="eyebrow">Stand with us</p>
    <h1>Four ways to help</h1>
    <p class="lede mw center" style="margin-inline:auto">However you choose to give, it is stewarded with love and eligible for 80G &amp; 12A tax benefit.</p>
  </div>
</section>
<section class="section" style="padding-top:0"><div class="wrap"><div class="grid g4">
  <article class="card icon-card"><div class="ic">❤</div><h3>Donate</h3><p>Give once or monthly. 80G &amp; 12A tax-exempt.</p></article>
  <article class="card icon-card"><div class="ic">🤝</div><h3>Volunteer</h3><p>Teach, mentor and give your time at the Center.</p></article>
  <article class="card icon-card"><div class="ic">🎓</div><h3>Intern</h3><p>Learn and contribute through a hands-on internship.</p></article>
  <article class="card icon-card"><div class="ic">🏢</div><h3>Corporate / CSR</h3><p>Section 135 partnerships, gifting and volunteering.</p></article>
</div></div></section>

<section class="section soft" id="donate"><div class="wrap split">
  <div>
    <p class="eyebrow">Donate</p>
    <h2>Your gift changes a life</h2>
    <p>Every rupee becomes tuition, a wheelchair, a warm meal, or a pillar of a new home — and is eligible for 80G &amp; 12A tax relief.</p>
    <div class="note">Connect the foundation's payment link / UPI / gateway here (${ph("donation_link")}). Bank and 80G receipt details are held by the CHF team.</div>
    <a class="btn btn-coral btn-lg" style="margin-top:1.2rem" href="mailto:${CONTACT.email}?subject=I'd%20like%20to%20donate">❤ Email us to give</a>
  </div>
  <img src="/images/programmes/healthy_snacks.jpg" alt="A child receiving a warm, healthy snack at the Center" width="600" height="450" loading="lazy">
</div></section>

<section class="section" id="volunteer"><div class="wrap split">
  <img src="/images/galleries/cambossador_1.jpg" alt="Volunteers with children at the Catherine Hope Center" width="600" height="450" loading="lazy">
  <div>
    <p class="eyebrow">Volunteer &amp; <span id="intern">Intern</span></p>
    <h2>Give your time and skill</h2>
    <p>Teach a subject, run a music or computer session, mentor a Change Ambassador, or help at an event. Internships give students hands-on experience with real community work.</p>
    <a class="btn btn-green" href="mailto:${CONTACT.email}?subject=Volunteer%20/%20Intern">Write to us to join</a>
  </div>
</div></section>

<section class="section soft" id="csr"><div class="wrap split">
  <div>
    <p class="eyebrow">Corporate &amp; CSR</p>
    <h2>Partner your business with hope</h2>
    <p>A meaningful, compliant home for your CSR — Section 135 funding, 80G receipts, employee volunteering and festive gifting, with reporting you can stand behind. We've been glad to host teams from Infosys and NETZSCH.</p>
    <a class="btn btn-coral" href="mailto:${CONTACT.email}?subject=Corporate%20/%20CSR">Start a conversation</a>
  </div>
  <img src="/images/programmes/netzsch_visit.jpg" alt="A corporate team visiting the Catherine Hope Center" width="600" height="450" loading="lazy">
</div></section>

<section class="section" id="contact"><div class="wrap split">
  <div>
    <p class="eyebrow">Contact</p>
    <h2>Say hello</h2>
    <ul class="stack" style="max-width:62ch">
      <li><strong>Email:</strong> <a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
      <li><strong>Phone:</strong> <a href="tel:${CONTACT.phoneRaw}">${CONTACT.phone}</a></li>
      <li><strong>Office:</strong> ${CONTACT.office}</li>
      <li><strong>Center:</strong> ${CONTACT.centre}</li>
    </ul>
  </div>
  <form id="contact-form" novalidate>
    <div class="field"><label for="name">Your name</label><input id="name" name="name" type="text" required autocomplete="name"></div>
    <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required autocomplete="email"></div>
    <div class="field"><label for="message">Message</label><textarea id="message" name="message" required></textarea></div>
    <button class="btn btn-coral btn-lg" type="submit">Send message</button>
    <p class="form-status" id="contact-status" role="status" aria-live="polite"></p>
  </form>
</div></section>`
  );

  /* =================================================================== */
  /* CONTACT (short page that points to get-involved#contact)           */
  /* =================================================================== */
  add(
    {
      slug: "/contact",
      title: "Contact | Catherine Hope Foundation",
      desc: "Get in touch with the Catherine Hope Foundation — email, phone, and our offices in Chennai and Ennore.",
      bodyScripts: '\n<script src="/js/contact.js" defer></script>',
    },
    `<section class="section"><div class="wrap split">
  <div>
    <p class="crumb"><a href="/">Home</a> / Contact</p>
    <p class="eyebrow">Say hello</p>
    <h1>Let's talk</h1>
    <p class="lede">To give, volunteer, intern or partner — or just to learn more — we'd love to hear from you.</p>
    <ul class="stack" style="max-width:62ch">
      <li><strong>Email:</strong> <a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
      <li><strong>Phone:</strong> <a href="tel:${CONTACT.phoneRaw}">${CONTACT.phone}</a></li>
      <li><strong>Office:</strong> ${CONTACT.office}</li>
      <li><strong>Center:</strong> ${CONTACT.centre}</li>
      <li><a href="${CONTACT.facebook}" rel="noopener">Facebook</a> · <a href="${CONTACT.instagram}" rel="noopener">Instagram</a> · <a href="${CONTACT.youtube}" rel="noopener">YouTube</a></li>
    </ul>
  </div>
  <form id="contact-form" novalidate>
    <div class="field"><label for="name">Your name</label><input id="name" name="name" type="text" required autocomplete="name"></div>
    <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required autocomplete="email"></div>
    <div class="field"><label for="message">Message</label><textarea id="message" name="message" required></textarea></div>
    <button class="btn btn-coral btn-lg" type="submit">Send message</button>
    <p class="form-status" id="contact-status" role="status" aria-live="polite"></p>
  </form>
</div></section>`
  );

  return pages;
}
