# Helix Crypto UI Kit — Figma Plugin Scripts

Web3 / Crypto / DeFi design system. Run these scripts inside Figma to generate the entire kit programmatically — variables, styles, variant components with Auto Layout, and production screens — then export and sell on UI8.

Works on **Figma Free**: scripts detect plan limits (1 variable mode, 3 pages) and fall back automatically.

## How to Use

### Method 1: One-click plugin (Recommended)
`code.js` is a pre-built bundle of the icon pack + all 7 scripts with a menu — no pasting needed.
1. Open **Figma Desktop**, create a new design file
2. **Plugins → Development → Import plugin from manifest…** → pick `manifest.json` in this folder
3. **Plugins → Development → Helix Crypto UI Kit Generator → 🚀 Run ALL (00 → 04)**
4. Or run each part separately from the same submenu (00 → 04, in order)
5. The success toast says **“Helix Crypto UI Kit v6”** — if you don't see “v6”, the plugin is running an old `code.js`; replace the folder and re-run

If you edit the `00-…04-…` source scripts, regenerate the bundle with `node build.js`.

### Method 2: Figma Console (no import)
1. **Menu → Plugins → Development → Show/Hide Console** (`Ctrl+Alt+I` / `Cmd+Option+I`)
2. Paste `icons-svg.js` first, then each script (`00 → 04`) in order and press Enter
3. Wait for the ✅ message before running the next one

## Script Order (IMPORTANT — run sequentially)

| # | File | What it creates |
|---|------|-----------------|
| — | `icons-svg.js` | **Icon pack** — 70 real Phosphor icons (MIT) embedded as SVG, used by every later script. Console method: paste this FIRST |
| 0 | `00-variables.js` | **Pages** — probes your plan: full 8-page layout (📕 Cover / 🚀 Getting Started / 🎨 Foundations / 🧩 Components / 🗂 Components · Data / 🖥 Screens · Web / 📱 Screens · Mobile / 🎯 Prototype) or 3-page lite on Figma Free + **Variables**: Accent ramp 50–950, Bg/Border/Text tokens (Dark + Light), semantic colors, Spacing (4pt), Radius |
| 1 | `01-foundation.js` | **Cover 1600×1200** (UI8 thumbnail-ready) + **Getting Started** doc frame + **Styles**: 40+ paint styles (incl. accent gradients), 28 text styles (Space Grotesk / Plus Jakarta Sans / JetBrains Mono), elevation + glow + focus-ring effects, Style Guide frame |
| 2 | `02-components.js` | **Core components** (sectioned, with buyer-facing descriptions): Button (5 types × 3 sizes × 3 states), Icon Button, Input, Amount Input, Select, Checkbox, Radio, Toggle, Segmented, Badge/Status, Badge/Change, Badge/Special, Chip/Chain, Avatar (4×3), Avatar Group, Tab, Pill/Timeframe, Breadcrumb, Pagination |
| 3 | `02b-components-extra.js` | **Extra components**: Stat Card, Coin Card (sparkline), Wallet Card (gradient), Alert ×4, Toast, Tooltip, Progress Bar/Circle, Slider, Stepper, Skeleton, Donut Chart, Bar Chart, Markets Table Row, Order Book Row |
| 4 | `03-screens.js` | **Screens 1–7** — Trading Terminal (candles + order book), Portfolio Dashboard (light), NFT Marketplace + mobile Onboarding, Portfolio, Coin Detail, Swap. Screens are assembled from **component instances** (Buttons, Pills, Badges, Avatars…) |
| 5 | `03b-screens-extra.js` | **Screens 8–20** — Markets Overview, Asset Detail, Wallet & Balances, Send & Receive (QR), Staking & Earn, Transactions, Settings & Security, Sign in & 2FA, NFT Detail + mobile Wallet, Receive QR, NFT Gallery, Profile & Settings — **20 screens total** |
| 6 | `04-bind-variables.js` | **Variable binding pass** — rebinds ~1,400 solid fills/strokes on Components + Screens pages to the Helix Variables; on Pro also flips light screens to the Light mode |

## Design Tokens

- **Accent**: Indigo `#6366F1` → Violet `#8B5CF6` gradient (+ Cyan `#22D3EE`)
- **Dark neutrals**: Canvas `#0A0C10` · Surface `#12151C` · Card `#171B24` · Elevated `#1E232E`
- **Light neutrals**: Canvas `#F6F7F9` · Surface `#FFFFFF` · Line `#E6E8EC`
- **Semantic**: Success `#10B981` · Danger `#F43F5E` · Warning `#F59E0B` · Info `#0EA5E9`
- **Type**: Space Grotesk (display) · Plus Jakarta Sans (body) · JetBrains Mono (numeric) — all free Google Fonts
- **Spacing**: 4pt grid · **Radius**: 4 → full

## Page plans

- **Run in a FRESH file** (one empty "Page 1"). Re-running in a file that already has content will stack duplicates.
- **Full (paid/education plans)**: 8 pages — Cover, Getting Started, Foundations, Components, Components · Data, Screens · Web, Screens · Mobile, Prototype.
- **Lite (Figma Free, 3-page limit)**: 🏠 Cover · Foundations / 🧩 Components / 📱 Screens — same content, shared pages.
- **Variable modes**: Free allows 1 mode per collection → `Helix Colors` (Dark) + `Helix Colors (Light)` as a second collection. Paid plans get one collection with Dark/Light modes.

## After generating — polish checklist (before UI8)

1. Swap the coin-colored circles for real coin logos (cryptocurrency-icons set, free) and drop real photos into avatars
2. Export `.fig`, package with the Cover frame (1600×1200) as thumbnail + screen previews for UI8

Icons are already real (Phosphor, MIT license — attribution not required but appreciated). Fills are already bound to Variables by `04-bind-variables.js`.

## License
Created by Dang Pham (Wonton Design). For commercial sale on UI8.
