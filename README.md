# Portfolio

Personal portfolio site for Vivian Okonkwo — Frontend Engineer, AI & Cloud.

Built with [Astro](https://astro.build) and Tailwind CSS v4. Static output,
deployed to Vercel.

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server at http://localhost:4321
npm run build        # build to ./dist
npm run preview      # serve the production build locally
```

## Project structure

```
src/
  data/site.ts            # ALL content: name, links, bio, projects
  layouts/BaseLayout.astro # document shell, meta tags, the two small scripts
  components/
    Nav.astro             # fixed navbar
    Footer.astro          # contact section
    ProjectCard.astro     # home-page project card
  pages/
    index.astro           # single-page home
    work/[slug].astro     # case studies, generated from PROJECTS
    404.astro
    sitemap.xml.ts
  styles/global.css       # design tokens + Tailwind
```

## Editing content

Everything you'll want to change is in **`src/data/site.ts`**:

| What | Where |
| --- | --- |
| Name, headline, meta description, site URL | `SITE` |
| Email, GitHub, LinkedIn | `CONTACT` |
| About paragraphs and hero facts | `ABOUT` |
| Skill groups | `TOOLBOX` |
| Projects and case studies | `PROJECTS` |

Case-study pages are generated from `PROJECTS`, so adding an entry there
creates `/work/<slug>` automatically — no new file needed.

### Placeholders to replace

- `CONTACT.email`, `CONTACT.github`, `CONTACT.linkedin` — currently placeholders.
- `SITE.url` and the URL in `src/pages/sitemap.xml.ts` — update once the real
  domain is known. `public/robots.txt` references it too.
- Each project's `links.live` and `links.code`.

### Adding screenshots

Drop images into `public/images/` and reference them from the case-study
template at `src/pages/work/[slug].astro`.

## Design notes

- **Dark only.** Tokens live in `src/styles/global.css` under `@theme`.
- **One accent colour** (emerald) used for links, focus rings, and status
  markers only.
- **JavaScript budget: two small inline scripts** — scroll reveal and nav
  behaviour. There are no external JS bundles. Adding a client-side framework
  should be a deliberate decision, not an accident.
- **Motion** is limited to a 300ms fade-and-rise on scroll, plus colour and
  border transitions on hover. All of it is disabled under
  `prefers-reduced-motion`.
- **Accessibility:** skip link, semantic landmarks, visible focus states,
  `aria-current` on the active nav link, and a keyboard-operable mobile menu.

## Deploying to Vercel

1. Push this folder to a Git repository (GitHub or Bitbucket).
2. In Vercel, choose **Add New → Project** and import the repository.
3. Vercel detects Astro automatically. Confirm the defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy. Every later push to the main branch redeploys.
5. Once a custom domain is attached, update `site` in `astro.config.mjs`,
   `SITE.url` in `src/data/site.ts`, and the sitemap URL in
   `public/robots.txt`.