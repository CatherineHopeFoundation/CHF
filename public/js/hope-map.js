// Living Hope Map — front-end component.
// Calls /api/hope-map, renders a local issue -> CHF response -> proof -> CTA.
// Fails silently to a warm default; never shows an error to a visitor.
(function () {
  var root = document.getElementById("hope-map");
  if (!root) return;

  var DEFAULT = {
    city: "India",
    issue: "Across India, children still learn on empty stomachs and families face hardship alone.",
    programme: "Raising Catherines",
    programme_url: "/work/centre",
    proof_story:
      "At the Catherine Hope Center in Ennore, children who once went to bed hungry now arrive to tuition, music, a warm snack and a library — and they are thriving.",
    cta_label: "Sponsor a Catherine",
    cta_url: "/partner/sponsor-a-catherine",
    source_url: null,
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function render(d) {
    var src = d.source_url
      ? '<p class="hope-source">Prompted by local reporting. ' +
        '<a href="' + esc(d.source_url) + '" rel="nofollow noopener" target="_blank">Read the story ↗</a></p>'
      : "";
    root.innerHTML =
      '<p class="hope-loc">📍 Near you — ' + esc(d.city) + "</p>" +
      '<p class="hope-issue">' + esc(d.issue) + "</p>" +
      '<p class="hope-response">Here\'s how we respond: <a href="' + esc(d.programme_url) + '"><strong>' + esc(d.programme) + "</strong></a></p>" +
      '<p class="hope-proof">' + esc(d.proof_story) + "</p>" +
      '<div class="hope-actions">' +
        '<a class="btn btn--gold" href="' + esc(d.cta_url || d.programme_url) + '">' + esc(d.cta_label || "Stand with us") + "</a>" +
        '<a class="btn btn--ghost" href="' + esc(d.programme_url) + '">See the programme</a>' +
      "</div>" + src;
  }

  function load(city) {
    var url = "/api/hope-map" + (city ? "?city=" + encodeURIComponent(city) : "");
    fetch(url, { headers: { accept: "application/json" } })
      .then(function (r) { return r.ok ? r.json() : DEFAULT; })
      .then(function (d) { render(d && d.issue ? d : DEFAULT); })
      .catch(function () { render(DEFAULT); });
  }

  // Skeleton while loading.
  root.innerHTML =
    '<div class="hope-skeleton"><div class="bar w1"></div><div class="bar w2"></div>' +
    '<div class="bar w3"></div><div class="bar w2"></div></div>';

  load();

  // Optional: precise city with explicit consent.
  var precise = document.getElementById("hope-use-area");
  if (precise && "geolocation" in navigator) {
    precise.hidden = false;
    precise.addEventListener("click", function () {
      // We only ever pass a coarse city string to the API; no coords are stored.
      root.innerHTML = '<div class="hope-skeleton"><div class="bar w1"></div><div class="bar w2"></div><div class="bar w3"></div></div>';
      load(); // request.cf already gives coarse city; explicit tap simply re-queries
    });
  }
})();
