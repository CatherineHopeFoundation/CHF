/**
 * /api/contact — receives the contact form.
 *
 * For now this validates input and returns a friendly acknowledgement.
 * Wire it to email/CRM later (e.g. MailChannels, Resend, or a KV/queue sink).
 * It never throws to the visitor.
 */

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

export async function handleContact(request, env) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "method_not_allowed" }, 405);
  }

  let data = {};
  try {
    const ct = request.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      data = await request.json();
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form.entries());
    }
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const name = (data.name || "").toString().trim();
  const email = (data.email || "").toString().trim();
  const message = (data.message || "").toString().trim();

  if (!name || !email || !message) {
    return json({ ok: false, error: "missing_fields" }, 422);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: "invalid_email" }, 422);
  }

  // TODO: deliver the message (email/CRM/queue). For now, log for observability.
  console.log("contact", JSON.stringify({ name, email, len: message.length }));

  return json({
    ok: true,
    message: "Thank you — your message has reached the Catherine Hope Foundation. We'll write back soon.",
  });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}
