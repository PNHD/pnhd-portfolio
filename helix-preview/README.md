# Helix Crypto UI Kit — Live Preview

Static preview site for the Helix Crypto UI Kit (linked from the UI8 product page).
Fully self-contained runtime: React, ReactDOM and Babel are vendored in `vendor/` —
only fonts (Google Fonts), Phosphor icon CSS and demo images load from CDNs.

## Deploy on Cloudflare Pages (once, ~2 minutes)

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
