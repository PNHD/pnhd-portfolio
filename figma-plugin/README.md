# Nova UI Kit — Figma Plugin Scripts

## Cách chạy

### Cách 1: Figma Console (Nhanh nhất)
1. Mở file Figma: https://www.figma.com/design/8xN5KzxsqJDFUEF7ZFvcXJ
2. Bật Dev Mode (phím tắt: Shift+D)  
3. Mở Console: Menu > Plugins > Development > Open console
4. Paste từng file theo thứ tự, nhấn Run:
   - `01-foundation.js` — Tạo color styles, text styles, effect styles, cover page
   - `02-components.js` — Tạo component sets: Button, Input, Badge, Avatar, Toggle, Checkbox, Stat Card, Table Row, Nav Item, Select, Toast, Modal, Tab, Progress
   - `03-screens.js` — Tạo 6 dashboard screens (Light + Dark)

### Cách 2: Tạo Plugin
1. Figma > Menu > Plugins > Development > New Plugin
2. Chọn "Empty" template  
3. Thay code trong `code.ts` bằng nội dung từng file
4. Run plugin

## Nội dung tạo ra

### Foundation (01)
- 70+ Color styles (Primary, Neutral, Success, Warning, Error, Info, Surface, Border, Text + Dark variants)
- 22 Text styles (Display, Heading, Body, Label, Code)
- 7 Effect styles (Shadow XS→XL, Focus Primary/Error)
- Cover page với branding

### Components (02)  
- **Button** — 5 types × 4 sizes × 3 states = 60 variants
- **Input** — 3 sizes × 5 states = 15 variants  
- **Badge** — 6 colors × 3 sizes × 2 dot options = 36 variants
- **Avatar** — 6 sizes × 2 types = 12 variants
- **Toggle** — 2 sizes × 4 states = 8 variants
- **Checkbox** — 2 sizes × 4 states = 8 variants
- **Stat Card** — 3 trend variants
- **Table Row** — 3 types (Header, Body, Body Hover)
- **Nav Item** — 3 states
- **Select/Dropdown** — 3 states
- **Toast** — 4 types (Success, Error, Warning, Info)
- **Modal** — Delete confirmation dialog
- **Tab** — 2 styles × 2 states = 4 variants
- **Progress Bar** — 4 percentages × 4 colors = 16 variants

**Total: 200+ component variants**

### Screens (03)
1. **Dashboard Overview (Light)** — Stats, bar chart, traffic sources pie
2. **Dashboard Overview (Dark)** — Same layout, dark theme
3. **Analytics** — Visitor chart with period tabs
4. **Users Table** — Search, filters, table with avatars & status badges
5. **Settings Profile** — Form with avatar upload, text fields
6. **Auth Login** — Split screen: branding + login form with Google SSO

## Ghi chú
- Font: Inter (có sẵn trong Figma)
- Tất cả frames đều dùng Auto Layout
- Color styles tổ chức theo nhóm: Primary/, Neutral/, Success/, etc.
- Starter plan giới hạn 3 pages — tất cả nằm trên 1 page
