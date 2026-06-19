# Nova UI Kit — Figma Plugin Scripts

Premium Dashboard & SaaS UI Kit. Run these scripts inside Figma to generate the entire design system programmatically.

## How to Use

### Method 1: Figma Console (Recommended)
1. Open Figma Desktop
2. Go to **Menu → Plugins → Development → Open Console** (or press `Ctrl+Alt+I`)
3. Paste each script in order into the Console tab and press Enter

### Method 2: Figma Plugin
1. Create a new plugin: **Plugins → Development → New Plugin → Figma Design → choose "Empty"**
2. Replace `code.js` content with the script
3. Run the plugin

## Script Order (IMPORTANT — run sequentially)

| # | File | What it creates |
|---|------|-----------------|
| 0 | `00-variables.js` | **Figma Variables** — Color tokens (Light/Dark modes), Spacing, Radius |
| 1 | `01-foundation.js` | **Styles** — Color paint styles, 20 Text styles, 8 Effect styles (shadows, blur, focus ring), Style Guide page |
| 2 | `02-components.js` | **Core Components** — Button (5 types × 4 sizes × 3 states), Input, Badge, Avatar, Toggle, Checkbox, Stat Card, Table Row, Nav Item, Select, Toast, Modal, Tab, Progress |
| 3 | `02b-components-extra.js` | **Extra Components** — Radio, Alert/Banner, Tooltip, Breadcrumb, Pagination, Skeleton Loader, Divider, Avatar Group, Blog Card, Profile Card, Empty State |
| 4 | `03-screens.js` | **Dashboard Screens** — Overview, Analytics, Settings, User Management |

## What's Included

### Design Tokens (Variables)
- **Color Tokens**: Primary (Indigo), Neutral, Success, Warning, Error, Info — full 50-900 scales
- **Semantic Tokens**: Background, Surface, Border, Text levels, Link, Primary, Destructive
- **Light/Dark Mode**: Switch between modes via Figma's Variable Modes
- **Spacing**: 2xs (2px) → 10xl (128px), 8pt grid system
- **Radius**: none → full (9999px)

### Typography (20 Text Styles)
- Display: XL (72px) → SM (36px)
- Heading: H1 (30px) → H4 (18px)
- Body: LG (18px) → XS (12px), Regular + Medium variants
- Label: LG → SM, Caption, Overline

### Effect Styles
- Elevation: XS → 2XL (multi-layer shadows)
- Inner Shadow, Focus Ring (Primary + Error), Background Blur, Layer Blur

### Components (25+ component sets)
All built with **Auto Layout**, **variant sets**, proper naming conventions.

Core: Button, Input, Badge, Avatar, Toggle, Checkbox, Stat Card, Table Row, Nav Item, Select, Toast, Modal, Tab, Progress

Extra: Radio, Alert, Tooltip, Breadcrumb, Pagination, Skeleton, Divider, Avatar Group, Blog Card, Profile Card, Empty State

### Font
- **Inter** — free Google Font

## For UI8 Packaging

After running all scripts:
1. Organize pages: `📐 Style Guide` | `🧩 Components` | `📱 Screens` | `📖 README`
2. Add a cover page with mockup screenshots
3. Export as `.fig` file
4. Package with thumbnail (1600×1200px) for UI8

## License
Created by Dang Pham (Wonton Design). For commercial sale on UI8.
