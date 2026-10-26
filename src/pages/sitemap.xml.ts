import type { APIRoute } from "astro";
import { PROJECTS, SITE } from "../data/site";

/**
 * Hand-rolled sitemap.
 *
 * A sitemap integration would be another dependency for six static URLs;
 * generating the XML here keeps the build lean and the output predictable.
 */
export const GET: APIRoute = () => {
  const base = SITE.url.replace(/\/$/, "");

  const paths = ["/", ...PROJECTS.map((project) => `/work/${project.slug}`)];

  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${base}${path === "/" ? "/" : path}</loc>
    <changefreq>monthly</changefreq>
    <priority>${path === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};