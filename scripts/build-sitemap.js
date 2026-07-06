/** Generates /public/sitemap.xml from the built HTML pages. */
import { writeFileSync, readdirSync, statSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const SITE = "https://catherinehopefoundation.org";

const urls = new Set();
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (name.startsWith("_") || name === "images" || name === "css" || name === "js" || name === "fonts") continue;
      walk(full);
    } else if (name === "index.html" || (name.endsWith(".html") && name !== "404.html")) {
      let rel = full.replace(PUBLIC, "").replace(/index\.html$/, "").replace(/\\/g, "/");
      if (rel !== "/" && rel.endsWith("/")) rel = rel.slice(0, -1);
      if (rel === "") rel = "/";
      urls.add(rel);
    }
  }
}
walk(PUBLIC);

const priority = (u) => (u === "/" ? "1.0" : u.startsWith("/partner") || u === "/story" ? "0.9" : "0.7");
const today = new Date().toISOString().slice(0, 10);
const body = [...urls]
  .sort()
  .map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod><priority>${priority(u)}</priority></url>`)
  .join("\n");

writeFileSync(
  join(PUBLIC, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
);
console.log(`sitemap.xml: ${urls.size} URLs`);
