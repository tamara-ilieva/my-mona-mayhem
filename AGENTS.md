# Project Instructions

## Overview

This repository contains an Astro application. Pages and API routes use Astro's file-based routing under `src/pages/`. The app uses server output with the Node adapter; API routes can handle requests at runtime.

## Commands

- `npm install` installs dependencies.
- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm run preview` serves the production build locally.
- `npm run astro -- <args>` runs the Astro CLI.

There are currently no test or lint scripts in `package.json`.

## Astro Guidance

- Keep route structure aligned with the file-based routing under `src/pages/`.
- Use `.astro` frontmatter for server-side data loading and rendering; add browser-side JavaScript only for interactions that need it.
- Type API handlers with Astro's `APIRoute` and return explicit `Response` objects.
- Set `export const prerender = false` for routes that require request-time behavior; keep prerendering enabled where runtime handling is unnecessary.
- Run `npm run build` after changes to catch Astro, TypeScript, and adapter integration issues.