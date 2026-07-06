// Shared: mobile nav toggle + correct dropdown offset. Nav works without JS.
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  var header = document.querySelector(".site-header");

  function setOffset() {
    if (!header) return;
    var r = header.getBoundingClientRect();
    document.documentElement.style.setProperty("--nav-h", r.bottom + "px");
  }
  setOffset();
  window.addEventListener("resize", setOffset);
  window.addEventListener("scroll", setOffset, { passive: true });

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      setOffset();
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
