// Home: hero slider, count-up counters, construction progress bar.
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- hero slider ---- */
  var slidesWrap = document.getElementById("slides");
  if (slidesWrap) {
    var slides = [].slice.call(slidesWrap.querySelectorAll(".slide"));
    var dotsWrap = document.getElementById("slideDots");
    var i = 0, timer = null;

    slides.forEach(function (_, idx) {
      var b = document.createElement("button");
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Slide " + (idx + 1));
      b.addEventListener("click", function () { go(idx); rearm(); });
      dotsWrap.appendChild(b);
    });
    var dots = [].slice.call(dotsWrap.children);

    function go(n) {
      slides[i].classList.remove("active");
      slides[i].setAttribute("aria-hidden", "true");
      dots[i].setAttribute("aria-current", "false");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("active");
      slides[i].removeAttribute("aria-hidden");
      dots[i].setAttribute("aria-current", "true");
    }
    function rearm() {
      if (reduce) return;
      clearInterval(timer);
      timer = setInterval(function () { go(i + 1); }, 6000);
    }
    dots[0].setAttribute("aria-current", "true");
    var prev = document.getElementById("slidePrev");
    var next = document.getElementById("slideNext");
    if (prev) prev.addEventListener("click", function () { go(i - 1); rearm(); });
    if (next) next.addEventListener("click", function () { go(i + 1); rearm(); });
    rearm();
  }

  /* ---- helpers to run when visible ---- */
  function onVisible(el, cb) {
    if (!("IntersectionObserver" in window)) { cb(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { cb(); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    io.observe(el);
  }

  /* ---- count-up counters ---- */
  [].slice.call(document.querySelectorAll("[data-count]")).forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (!target) return;
    onVisible(el, function () {
      if (reduce) { el.textContent = target; return; }
      var start = null, dur = 1400;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.round(p * target);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  });

  /* ---- progress bar ---- */
  [].slice.call(document.querySelectorAll("[data-progress]")).forEach(function (el) {
    var pct = parseFloat(el.getAttribute("data-progress")) || 0;
    onVisible(el, function () { el.style.width = pct + "%"; });
  });
})();
