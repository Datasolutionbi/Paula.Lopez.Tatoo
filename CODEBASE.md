# CODEBASE.md - File Dependencies & Module Map

## Core Components

- `src/layouts/BaseLayout.astro`: Main layout for all pages.
  - Depends on: `src/components/Header.astro`, `src/components/Footer.astro`
- `src/pages/index.astro`: Homepage.
  - Depends on: `src/components/Hero.astro`, `src/components/ProjectCard.astro`, `src/components/BlogPostCard.astro`

## Data Layer

- `src/data/site.ts`: Global configuration used in `BaseLayout.astro` and SEO components.
- `src/data/experience.ts`: Used in `src/pages/index.astro` (or experience section).
- `src/data/skills.ts`: Used in skills section.
- `src/data/education.ts`: Used in education section.

## Content Management

- `src/content/blog/`: Markdown posts.
- `src/content/projects/`: Markdown project details.
- `src/content/docs/`: Documentation files.

## Styling

- `src/styles/global.css`: Base styles and Tailwind imports.
- `tailwind.config.mjs`: Design tokens and theme configuration.
