# Dang Pham Portfolio

Next.js + TypeScript portfolio for a Visual / Digital Designer, deployed to Cloudflare Pages from `PNHD/pnhd-portfolio`.

## Local development

```bash
npm ci
npm run dev
```

## Verification

```bash
npm audit --audit-level=high
npm run audit:portfolio
npm run lint
npm run build
```

`audit:portfolio` checks the curated Dribbble archive, independent-project routes/assets, stale portfolio tokens and other source-of-truth constraints before release.

## Structure

- `src/app` — App Router pages and case studies
- `src/components` — shared portfolio UI
- `src/data` — verified portfolio content and work metadata
- `public/projects` — local independent-project thumbnails
- `scripts` — portfolio truth / consistency checks

## Portfolio truth rules

Public visual work is source-linked to the original Dribbble archive where available. Independent projects link to their live products, repositories or published output. The site intentionally avoids invented client names, campaign outcomes, KPIs and unverified performance claims.
