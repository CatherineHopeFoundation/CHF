/**
 * Catherine Hope Foundation 2.0 — Cloudflare Worker
 *
 * Responsibilities:
 *   1. Handle /api/* routes (contact form, Living Hope Map).
 *   2. Fall through to static assets in ./public via env.ASSETS.
 *
 * Everything degrades gracefully: if a secret or KV binding is missing,
 * the visitor still gets a warm, working page — never an error screen.
 */

import { handleHopeMap } from "./hope-map.js";
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
        // Never leak internals; log for observability.
        console.error("API error", url.pathname, err && err.stack ? err.stack : err);
        return new Response(
          JSON.stringify({ ok: false, error: "internal_error" }),
          { status: 500, headers: JSON_HEADERS }
        );
      }
    }

    // Not an API request — serve a static asset.
    return env.ASSETS.fetch(request);
  },
};

/** Tiny router for the API surface. */
async function routeApi(pathname, request, env, ctx) {
  switch (pathname) {
    case "/api/hope-map":
      return handleHopeMap(request, env, ctx);
    case "/api/contact":
      return handleContact(request, env, ctx);
    default:
      return new Response(
        JSON.stringify({ ok: false, error: "not_implemented" }),
        { status: 501, headers: JSON_HEADERS }
      );
  }
}
