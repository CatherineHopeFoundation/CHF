// Contact form -> POST /api/contact, with graceful inline status.
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = document.getElementById("contact-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "Sending…";
    status.className = "form-status";
    var payload = Object.fromEntries(new FormData(form).entries());

    fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (res.ok && res.d.ok) {
          status.textContent = res.d.message || "Thank you — your message has reached us.";
          status.className = "form-status ok";
          form.reset();
        } else {
          status.textContent = "Sorry, something went wrong. Please email info@catherinehopefoundation.org.";
          status.className = "form-status err";
        }
      })
      .catch(function () {
        status.textContent = "Sorry, something went wrong. Please email info@catherinehopefoundation.org.";
        status.className = "form-status err";
      });
  });
})();
