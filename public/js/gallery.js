// Gallery — builds a filterable masonry from /public/images/manifest.json.
(function () {
  var grid = document.getElementById("gallery-grid");
  var filters = document.getElementById("gallery-filters");
  if (!grid || !filters) return;

  var LABELS = {
    all: "All",
    story: "Catherine",
    construction: "Building the Centre",
    "changed-lives": "Changed lives",
    programmes: "Programmes",
    galleries: "Life at CHF",
    home: "Moments",
  };

  fetch("/images/manifest.json")
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var imgs = (data.images || []).filter(function (i) { return i.section !== "brand"; });
      var sections = ["all"].concat(
        Object.keys(imgs.reduce(function (a, i) { a[i.section] = 1; return a; }, {}))
      );

      filters.innerHTML = sections
        .map(function (s, idx) {
          return '<button type="button" data-sec="' + s + '" aria-pressed="' + (idx === 0) + '">' +
            (LABELS[s] || s) + "</button>";
        })
        .join("");

      function draw(sec) {
        grid.innerHTML = imgs
          .filter(function (i) { return sec === "all" || i.section === sec; })
          .map(function (i) {
            return '<figure><img loading="lazy" decoding="async" src="' + i.path +
              '" width="' + (i.width || "") + '" height="' + (i.height || "") +
              '" alt="' + (i.alt || "").replace(/"/g, "&quot;") + '"></figure>';
          })
          .join("");
      }

      filters.addEventListener("click", function (e) {
        var btn = e.target.closest("button");
        if (!btn) return;
        filters.querySelectorAll("button").forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        draw(btn.getAttribute("data-sec"));
      });

      draw("all");
    })
    .catch(function () {
      grid.innerHTML = '<p>The gallery is loading elsewhere — please check back soon.</p>';
    });
})();
