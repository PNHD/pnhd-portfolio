# Helix Crypto UI Kit — Live Preview

Static preview site for the Helix Crypto UI Kit (linked from the UI8 product page).
Fully self-contained runtime: React, ReactDOM and Babel are vendored in `vendor/` —
only fonts (Google Fonts), Phosphor icon CSS and demo images load from CDNs.

## Live URLs (already deployed via wrangler Direct Upload)

- **https://helixkit.pages.dev** ← recommended for the UI8 listing (short)
- https://helix-crypto-ui-kit.pages.dev (same content, descriptive name)

These are standalone Pages projects (Direct Upload) — completely separate from
the `dangpham.pages.dev` portfolio project; nothing in that pipeline changes.

To redeploy after editing this folder:

```bash
export CLOUDFLARE_ACCOUNT_ID=… CLOUDFLARE_API_TOKEN=…
npx wrangler pages deploy helix-preview --project-name helixkit --branch main
```

## Alternative: Git-connected deploy (optional)

1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**
2. Pick the `pnhd-portfolio` repository
3. Settings:
   - **Project name**: `helix-crypto-ui-kit` (→ https://helix-crypto-ui-kit.pages.dev)
   - **Production branch**: `main` (or `claude/figma-ui8-plugin-7zvey6` until merged)
   - **Framework preset**: None
   - **Build command**: *(empty)*
   - **Build output directory**: `helix-preview`
4. Deploy → put the URL in the UI8 listing ("Live preview")

Shorter names to try if you prefer (first come, first served on pages.dev):
`helix-ui-kit`, `helixkit`, `helix-crypto`.
