/** Shared site chrome (header/footer/contact) used by page + journal builders. */

export const SITE = "https://catherinehopefoundation.org";

export const CONTACT = {
  phone: "+91 8939251910",
  phoneRaw: "+918939251910",
  email: "info@catherinehopefoundation.org",
  address: "290, 4th Street, Baba Nagar, Villivakkam, Chennai – 600049",
  centre: "Catherine Hope Center for Community Welfare, Ennore, Chennai",
  trust: "Registered under the Indian Trust Act (91/2020)",
  g80: "80G: Form 80G/10AC – AACTC7794BF20212",
  youtube: "https://www.youtube.com/@catherinehopefoundation2407",
};

const NAV = [
  { label: "Catherine's Story", href: "/story" },
  { label: "Our Work", href: "/work" },
  { label: "Changed Lives", href: "/changed-lives" },
  { label: "Gallery", href: "/gallery" },
  { label: "Impact", href: "/impact" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

export function header(current) {
  const links = NAV.map(
    (n) =>
      `<li><a href="${n.href}"${current === n.href ? ' aria-current="page"' : ""}>${n.label}</a></li>`
  ).join("");
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <nav class="nav wrap" aria-label="Primary">
    <a class="brand" href="/">
      <img src="/images/brand/logo-icon.png" alt="" width="40" height="40" aria-hidden="true">
      <span>Catherine Hope Foundation<small>Serve with love to empower</small></span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Menu">☰</button>
    <ul class="nav-links" id="nav-links">
      ${links}
      <li><a class="nav-cta" href="/partner/donate">Donate</a></li>
    </ul>
  </nav>
</header>`;
}

export function footer() {
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <p class="footer-motto">"One girl's story. Hundreds of second chances."</p>
      <p>The Catherine Hope Foundation carries forward Catherine Selvinson's dream — to serve with love and empower those in need, one life at a time.</p>
      <p><a href="${CONTACT.youtube}" rel="noopener">YouTube ↗</a></p>
    </div>
    <div>
      <h4>Our Work</h4>
      <ul>
        <li><a href="/work/centre">Raising Catherines</a></li>
        <li><a href="/work/community-care">Community Care</a></li>
        <li><a href="/work/response">Emergency Response</a></li>
        <li><a href="/work/catherine-stree">Catherine Stree</a></li>
      </ul>
    </div>
    <div>
      <h4>Partner</h4>
      <ul>
        <li><a href="/partner/donate">Donate</a></li>
        <li><a href="/partner/sponsor-a-catherine">Sponsor a Catherine</a></li>
        <li><a href="/partner/sponsor-a-pillar">Sponsor a Pillar</a></li>
        <li><a href="/partner/corporate-csr">Corporate / CSR</a></li>
      </ul>
    </div>
    <div>
      <h4>Reach us</h4>
      <ul>
        <li><a href="tel:${CONTACT.phoneRaw}">${CONTACT.phone}</a></li>
        <li><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li>${CONTACT.address}</li>
        <li><a href="/contact">Contact form</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span>© ${new Date().getFullYear()} Catherine Hope Foundation. ${CONTACT.trust}.</span>
    <span>${CONTACT.g80}</span>
  </div>
</footer>`;
}
