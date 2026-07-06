/** Shared site chrome (header + trust bar + footer + contact) — warm NGO design. */

export const SITE = "https://catherinehopefoundation.org";

export const CONTACT = {
  phone: "+91 8939251910",
  phoneRaw: "+918939251910",
  email: "info@catherinehopefoundation.org",
  office: "290, 4th Street, Baba Nagar, Villivakkam, Chennai – 600049",
  centre: "Catherine Hope Center — Ennore & Ernavur, Tamil Nadu",
  reg: "Reg. under Indian Trust Act (91/2020)",
  tax: "80G & 12A tax exemption (Form 10AC)",
  facebook: "https://facebook.com/catherinehopefoundation",
  instagram: "https://instagram.com/catherinehopefoundation",
  youtube: "https://www.youtube.com/@catherinehopefoundation2407",
};

const NAV = [
  { label: "Our Story", href: "/story" },
  { label: "About", href: "/about" },
  { label: "Focus Areas", href: "/focus-areas" },
  { label: "Programmes", href: "/programmes" },
  { label: "Changed Lives", href: "/changed-lives" },
  { label: "Construction", href: "/construction" },
  { label: "Gallery", href: "/gallery" },
  { label: "Get Involved", href: "/get-involved" },
];

// Google Fonts for every page: Poppins (head), Inter (body), Caveat (accent).
export const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=Caveat:wght@600;700&display=swap" rel="stylesheet">`;

export function header(current) {
  const links = NAV.map(
    (n) => `<li><a href="${n.href}"${current === n.href ? ' aria-current="page"' : ""}>${n.label}</a></li>`
  ).join("");
  return `<a class="skip" href="#main">Skip to content</a>
<div class="trustbar">
  <div class="wrap">
    <div class="badges">
      <span>🇮🇳 <b>Reg. 91/2020</b> · Indian Trust Act</span>
      <span><b>80G &amp; 12A</b> tax-exempt (Form 10AC)</span>
      <span>Tamil Nadu, India</span>
    </div>
    <div><a href="mailto:${CONTACT.email}">${CONTACT.email}</a> · <a href="tel:${CONTACT.phoneRaw}">${CONTACT.phone}</a></div>
  </div>
</div>
<header class="site-header">
  <nav class="nav wrap" aria-label="Primary">
    <a class="brand" href="/">
      <img src="/images/brand/logo-icon.png" alt="" width="46" height="46" aria-hidden="true">
      <span><b>Catherine Hope<br>Foundation</b><small>Serve with Love to Empower</small></span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Menu">☰</button>
    <ul class="nav-links" id="nav-links">
      ${links}
      <li><a class="nav-donate" href="/get-involved#donate">❤ Donate</a></li>
    </ul>
  </nav>
</header>`;
}

export function footer() {
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <small>"Live every moment."</small>
      <p>Catherine Hope Foundation continues the legacy of Catherine Selvinson — serving with love to empower the differently-abled, cancer warriors, and those who have lost hope.</p>
      <div class="footer-badges">
        <span>Reg. 91/2020</span><span>80G &amp; 12A</span><span>Form 10AC</span>
      </div>
    </div>
    <div>
      <h4>Explore</h4>
      <ul>
        <li><a href="/story">Our Story</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/focus-areas">Focus Areas</a></li>
        <li><a href="/programmes">Programmes</a></li>
        <li><a href="/changed-lives">Changed Lives</a></li>
      </ul>
    </div>
    <div>
      <h4>Get Involved</h4>
      <ul>
        <li><a href="/get-involved#donate">Donate</a></li>
        <li><a href="/get-involved#volunteer">Volunteer</a></li>
        <li><a href="/get-involved#intern">Intern</a></li>
        <li><a href="/get-involved#csr">Corporate / CSR</a></li>
        <li><a href="/construction">Sponsor a Pillar</a></li>
      </ul>
    </div>
    <div>
      <h4>Reach Us</h4>
      <ul>
        <li><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li><a href="tel:${CONTACT.phoneRaw}">${CONTACT.phone}</a></li>
        <li>${CONTACT.office}</li>
        <li><a href="${CONTACT.facebook}" rel="noopener">Facebook</a> · <a href="${CONTACT.instagram}" rel="noopener">Instagram</a> · <a href="${CONTACT.youtube}" rel="noopener">YouTube</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span>© ${new Date().getFullYear()} Catherine Hope Foundation. ${CONTACT.reg}.</span>
    <span>Made with love, in Catherine's memory.</span>
  </div>
</footer>`;
}
