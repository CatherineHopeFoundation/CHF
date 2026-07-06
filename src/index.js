/**
 * Catherine Hope Foundation — Cloudflare Worker
 *
 *   1. Handle /api/* (currently the contact form).
 *   2. Fall through to static assets in ./public via env.ASSETS.
 *
 * Everything degrades gracefully — a visitor never sees an error screen.
 */

import { handleContact } from "./contact.js";

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      try {
        return await routeApi(url.pathname, request, env, ctx);
      } catch (err) {
        console.error("API error", url.pathname, err && err.stack ? err.stack : err);
        return new Response(JSON.stringify({ ok: false, error: "internal_error" }), {
          status: 500,
          headers: JSON_HEADERS,
        });
      }
    }

    return env.ASSETS.fetch(request);
  },
};

async function routeApi(pathname, request, env, ctx) {
  switch (pathname) {
    case "/api/contact":
      return handleContact(request, env, ctx);
    default:
      return new Response(JSON.stringify({ ok: false, error: "not_implemented" }), {
        status: 501,
        headers: JSON_HEADERS,
      });
  }
}
