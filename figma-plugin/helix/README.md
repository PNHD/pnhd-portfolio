# Helix Crypto UI Kit — Figma Plugin Scripts

Web3 / Crypto / DeFi design system. Run these scripts inside Figma to generate the entire kit programmatically — variables, styles, variant components with Auto Layout, and production screens — then export and sell on UI8.

Works on **Figma Free**: scripts detect plan limits (1 variable mode, 3 pages) and fall back automatically.

## How to Use

### Method 1: One-click plugin (Recommended)
`code.js` is a pre-built bundle of all 5 scripts with a menu — no pasting needed.
1. Open **Figma Desktop**, create a new design file
2. **Plugins → Development → Import plugin from manifest…** → pick `manifest.json` in this folder
3. **Plugins → Development → Helix Crypto UI Kit Generator → 🚀 Run ALL (00 → 03)**
4. Or run each part separately from the same submenu (00 → 03, in order)

If you edit the `00-…03-…` source scripts, regenerate the bundle with `node build.js`.

### Method 2: Figma Console (no import)
1. **Menu → Plugins → Development → Show/Hide Console** (`Ctrl+Alt+I` / `Cmd+Option+I`)
2. Paste each script (`00 → 03`) into the Console in order and press Enter
3. Wait for the ✅ message before running the next one

## Script Order (IMPORTANT — run sequentially)

| # | File | What it creates |
|---|------|-----------------|
| 0 | `00-variables.js` | Pages (Cover → Prototype) + **Variables**: Accent ramp 50–950, Bg/Border/Text tokens (Dark + Light), semantic Success/Danger/Warning/Info, Spacing (4pt), Radius |
| 1 | `01-foundation.js` | **Styles**: 40+ paint styles (incl. accent gradients), 28 text styles (Space Grotesk / Plus Jakarta Sans / JetBrains Mono), elevation + glow + focus-ring effects, Style Guide frame |
| 2 | `02-components.js` | **Core components**: Button (5 types × 3 sizes × 3 states), Icon Button, Input, Amount Input, Select, Checkbox, Radio, Toggle, Segmented, Badge/Status, Badge/Change, Badge/Special, Chip/Chain, Avatar (4×3), Avatar Group, Tab, Pill/Timeframe, Breadcrumb, Pagination |
| 3 | `02b-components-extra.js` | **Extra components**: Stat Card, Coin Card (sparkline), Wallet Card (gradient), Alert ×4, Toast, Tooltip, Progress Bar/Circle, Slider, Stepper, Skeleton, Donut Chart, Bar Chart, Markets Table Row, Order Book Row |
| 4 | `03-screens.js` | **Screens** — Web: Trading Terminal (dark, candles + order book), Portfolio Dashboard (light), NFT Marketplace (dark). Mobile 390×844: Onboarding, Portfolio, Coin Detail, Swap |

## Design Tokens

- **Accent**: Indigo `#6366F1` → Violet `#8B5CF6` gradient (+ Cyan `#22D3EE`)
- **Dark neutrals**: Canvas `#0A0C10` · Surface `#12151C` · Card `#171B24` · Elevated `#1E232E`
- **Light neutrals**: Canvas `#F6F7F9` · Surface `#FFFFFF` · Line `#E6E8EC`
- **Semantic**: Success `#10B981` · Danger `#F43F5E` · Warning `#F59E0B` · Info `#0EA5E9`
- **Type**: Space Grotesk (display) · Plus Jakarta Sans (body) · JetBrains Mono (numeric) — all free Google Fonts
- **Spacing**: 4pt grid · **Radius**: 4 → full

## Figma Free notes

- **Variable modes**: Free allows 1 mode per collection. On Free you get `Helix Colors` (Dark) + `Helix Colors (Light)` as a second collection instead of a mode switch. On Pro you get one collection with Dark/Light modes.
- **Pages**: Free allows 3 pages per file. If page creation is blocked, scripts build onto the current page — organize into pages after upgrading, or keep everything on fewer pages before exporting.

## After generating — polish checklist (before UI8)

1. Swap the placeholder ellipses for real coin logos (cryptocurrency-icons set) and avatar photos
2. Add Phosphor icons (free Figma community library) into icon slots
3. Write component descriptions + link variables to component fills
4. Add a cover (1600×1200) + Getting Started page
5. Export `.fig`, package with preview shots for UI8

## License
Created by Dang Pham (Wonton Design). For commercial sale on UI8.
