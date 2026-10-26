// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Static output: every page is prerendered to HTML at build time.
  output: "static",
  // Deployed to Vercel; canonical URLs resolve against this origin.
  site: "https://vivian-okonkwo.vercel.app",
  build: {
    // Keep CSS in external files so repeat visits are cached.
    inlineStylesheets: "auto",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});