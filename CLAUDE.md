@AGENTS.md
# Đăng Pham Portfolio — CLAUDE.md

## Project
Next.js + TypeScript portfolio site for a Visual / Digital Designer.
Deploy: Cloudflare Pages via GitHub (PNHD/pnhd-portfolio)
Goal: support Visual, Marketing, Digital and Graphic Designer applications while preserving UI, motion and 3D as evidence-backed strengths.

## Portfolio truth rules
- Dribbble is the source library for public visual work.
- Use source-linked real work; do not invent client names, campaign outcomes, KPIs, timelines or case-study claims.
- Label studies, concepts, challenges and practice work accurately when the source indicates that context.
- Keep the on-site archive curated for hiring relevance while linking to the full Dribbble archive.

## Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Deploy: Cloudflare Pages

## Rules
- Surgical patches only — never rewrite entire files without a concrete reason.
- Mobile-first always.
- Dark minimal style — do not change visual direction.
- No new dependencies without asking first.
- Follow existing component naming convention.

## Agent Skills to use
- /frontend-design → when designing new pages
- /design-critique → after completing any screen
- /code-review → before committing
- /github → for all git operations
- /context7 → when checking Next.js/Tailwind docs

## Structure
src/
  app/          → pages (App Router)
  components/   → reusable components
  data/         → portfolio source data
