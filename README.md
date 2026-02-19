# Neil Merton's Website

A minimal, type-safe personal website, built with [Astro](https://astro.build), plain CSS, and semantic HTML.

<img width="2596" height="1820" alt="Screenshot of home page" src="https://github.com/user-attachments/assets/e065eda2-c812-4a40-8e4b-15777b97d3c9" />


---

## Features

- **5 pages**: About (2 sub-pages), Experience, Blog, Reading, Contact
- **Type-safe content collections** for Blog and Reading (via Zod schemas)
- **Type-safe site data** — all config, roles, and tech stack in `src/data.ts`
- **Light / dark theme** from `prefers-color-scheme` — no JS required
- **Plain CSS** with CSS custom properties (no Tailwind or other utility frameworks)
- **Semantic HTML** throughout for accessibility and SEO
- **Accessible navigation** — skip link, ARIA labels, keyboard-friendly mobile menu
- **`prefers-reduced-motion`** support for animations
- **Open Graph / Twitter Card** meta tags
- **Markdown blog posts** with tag filtering
- **Reading list** with status grouping (reading / completed / want-to-read) and tag filtering

---

## Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   └── SocialLinks.astro
│   ├── content/
│   │   ├── blog/                 ← Markdown blog posts
│   │   ├── reading/              ← Markdown book entries
│   │   └── config.ts             ← Content collection schemas (Zod)
│   ├── layouts/
│   │   └── Layout.astro          ← Root HTML shell (SEO, meta, skip link)
│   ├── pages/
│   │   ├── index.astro           ← Home page
│   │   ├── about/
│   │   │   ├── index.astro
│   │   │   ├── uses.astro
│   │   │   └── colophon.astro
│   │   ├── experience.astro
│   │   ├── contact.astro
│   │   ├── reading.astro
│   │   ├── 404.astro
│   │   └── blog/
│   │       ├── index.astro       ← Blog listing with tag filter
│   │       └── [slug].astro      ← Individual post pages
│   ├── styles/
│   │   └── global.css            ← Design tokens, reset, base styles
│   ├── data.ts                   ← Site config, roles, tech stack, navigation, uses lists
│   └── types.ts                  ← TypeScript interfaces
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the dev server

```bash
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321).

### 3. Build for production

```bash
pnpm build
pnpm preview    # preview the production build locally
```

---

## Personalising

### Site config, bio, and social links

Edit **`src/data.ts`**. This is the single source of truth for:

- Your name, site URL, email, and description (`siteConfig`)
- Navigation items (`navItems`)
- Social links (`siteConfig.socials`) — shown in the footer and contact page
- Tech stack (`techStack`)
- Professional summary (`professionalSummary`)
- Work history (`roles`)
- Uses lists (`usesHardware`, `usesSoftware`)

### Colours and fonts

All design tokens live in **`src/styles/global.css`** under `:root`.  
Dark mode overrides are in the `@media (prefers-color-scheme: dark)` block.

To change the accent colour:
```css
:root {
  --color-accent: #c0512c;    /* your colour here */
  --color-accent-hover: #a8431f;
  --color-accent-tint: #f7ece7;
}
```

To change fonts, update the `--font-display`, `--font-body`, and `--font-mono` variables.  
If using web fonts, add `@font-face` declarations (or a `<link>` tag in `Layout.astro`) first.

### About page

Edit the prose directly in **`src/pages/about.astro`**.

### Favicon

Replace **`public/favicon.svg`** with your own.  
The initial inside the SVG and the `fill` colour are the main things to change.

---

## Adding Content

### Blog post

Create a `.md` file in `src/content/blog/`:

```markdown
---
title: "My post title"
description: "A short description shown in the listing and used for SEO."
pubDate: "2025-03-01"
tags: ["css", "accessibility"]
draft: false
---

Your post content here. Full markdown supported.
```

**Frontmatter fields:**

| Field         | Type       | Required | Description                            |
|---------------|------------|----------|----------------------------------------|
| `title`       | `string`   | ✅       | Post title                             |
| `description` | `string`   | ✅       | Short description (used for SEO / listing) |
| `pubDate`     | `date`     | ✅       | Publish date (`YYYY-MM-DD`)            |
| `updatedDate` | `date`     | —        | Last updated date                      |
| `tags`        | `string[]` | —        | Array of tags for filtering            |
| `draft`       | `boolean`  | —        | If `true`, excluded from listings (default: `false`) |

### Book entry

Create a `.md` file in `src/content/reading/`:

```markdown
---
title: "Book Title"
author: "Author Name"
status: "completed"
finishedDate: "2024-12-01"
rating: 4
tags: ["programming", "design"]
thoughts: "A brief one-line take, shown in the listing."
---

Optional longer notes in the markdown body.
```

**Frontmatter fields:**

| Field          | Type                                    | Required | Description                      |
|----------------|-----------------------------------------|----------|----------------------------------|
| `title`        | `string`                                | ✅       | Book title                       |
| `author`       | `string`                                | ✅       | Author name                      |
| `status`       | `'reading' \| 'completed' \| 'want-to-read'` | ✅ | Reading status (controls grouping) |
| `finishedDate` | `date`                                  | —        | Date finished (`YYYY-MM-DD`)     |
| `startedDate`  | `date`                                  | —        | Date started                     |
| `rating`       | `1–5`                                   | —        | Star rating                      |
| `tags`         | `string[]`                              | —        | Tags for filtering               |
| `thoughts`     | `string`                                | —        | One-liner shown in the listing   |

---

## Accessibility Notes

- All pages have a **skip-to-content link** (`<a class="skip-link" href="#main-content">`)
- Navigation uses `aria-current="page"` on the active link
- The mobile menu toggle uses `aria-expanded` and `aria-controls`
- All icons have `aria-hidden="true"` and accompanying `aria-label` on their parent
- Headings follow a strict hierarchy on each page
- Colour contrast meets WCAG 2.1 AA in both light and dark modes
- Interactive elements are keyboard-accessible; focus styles are clearly visible
- Animations respect `prefers-reduced-motion`

---

## Deployment

This template works out of the box with any static host.

**Vercel** — push to GitHub and import the repository.  
**Netlify** — same; build command is `astro build`, publish dir is `dist`.  
**Cloudflare Pages** — same as above.  
**GitHub Pages** — add the `@astrojs/github-pages` adapter if needed.

---

## Licence

MIT — use this however you like.
