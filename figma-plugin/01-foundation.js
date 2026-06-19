// ============================================================
// NOVA UI KIT — Part 1: Foundation (Design Tokens)
// Run in Figma: Plugins > Development > New Plugin > paste code
// Or use "Run a script" in Figma Dev Mode console
// ============================================================

(async () => {
  // ── Helpers ──
  const hex = (h) => ({
    r: parseInt(h.slice(1, 3), 16) / 255,
    g: parseInt(h.slice(3, 5), 16) / 255,
    b: parseInt(h.slice(5, 7), 16) / 255,
  });

  function createColorStyle(name, h) {
    const s = figma.createPaintStyle();
    s.name = name;
    s.paints = [{ type: "SOLID", color: hex(h) }];
    return s;
  }

  // ── COLOR STYLES ──
  // Primary (Indigo)
  const primaryColors = {
    "50": "#EEF2FF", "100": "#E0E7FF", "200": "#C7D2FE", "300": "#A5B4FC",
    "400": "#818CF8", "500": "#6366F1", "600": "#4F46E5", "700": "#4338CA", "800": "#3730A3", "900": "#312E81",
  };
  for (const [k, v] of Object.entries(primaryColors)) createColorStyle(`Primary/${k}`, v);

  // Neutral
  const neutralColors = {
    "25": "#FCFCFD", "50": "#F9FAFB", "100": "#F3F4F6", "200": "#E5E7EB", "300": "#D1D5DB",
    "400": "#9CA3AF", "500": "#6B7280", "600": "#4B5563", "700": "#374151", "800": "#1F2937",
    "900": "#111827", "950": "#030712",
  };
  for (const [k, v] of Object.entries(neutralColors)) createColorStyle(`Neutral/${k}`, v);

  // Success
  for (const [k, v] of Object.entries({ "50": "#ECFDF5", "100": "#D1FAE5", "200": "#A7F3D0", "500": "#10B981", "600": "#059669", "700": "#047857" }))
    createColorStyle(`Success/${k}`, v);

  // Warning
  for (const [k, v] of Object.entries({ "50": "#FFFBEB", "100": "#FEF3C7", "200": "#FDE68A", "500": "#F59E0B", "600": "#D97706", "700": "#B45309" }))
    createColorStyle(`Warning/${k}`, v);

  // Error
  for (const [k, v] of Object.entries({ "50": "#FEF2F2", "100": "#FEE2E2", "200": "#FECACA", "500": "#EF4444", "600": "#DC2626", "700": "#B91C1C" }))
    createColorStyle(`Error/${k}`, v);

  // Info
  for (const [k, v] of Object.entries({ "50": "#EFF6FF", "100": "#DBEAFE", "500": "#3B82F6", "600": "#2563EB" }))
    createColorStyle(`Info/${k}`, v);

  // Surface (Light)
  createColorStyle("Surface/Background", "#FFFFFF");
  createColorStyle("Surface/Card", "#FFFFFF");
  createColorStyle("Surface/Elevated", "#F8FAFC");
  createColorStyle("Surface/Sidebar", "#F9FAFB");
  createColorStyle("Surface/Overlay", "#000000");

  // Surface (Dark)
  createColorStyle("Dark/Background", "#0F172A");
  createColorStyle("Dark/Card", "#1E293B");
  createColorStyle("Dark/Elevated", "#334155");
  createColorStyle("Dark/Sidebar", "#111827");

  // Border
  createColorStyle("Border/Default", "#E5E7EB");
  createColorStyle("Border/Strong", "#D1D5DB");
  createColorStyle("Border/Focus", "#6366F1");
  createColorStyle("Border/Error", "#EF4444");

  // Text (Light)
  createColorStyle("Text/Primary", "#111827");
  createColorStyle("Text/Secondary", "#6B7280");
  createColorStyle("Text/Tertiary", "#9CA3AF");
  createColorStyle("Text/Inverse", "#FFFFFF");
  createColorStyle("Text/Link", "#4F46E5");
  createColorStyle("Text/Success", "#059669");
  createColorStyle("Text/Error", "#DC2626");
  createColorStyle("Text/Warning", "#D97706");

  // Text (Dark)
  createColorStyle("Dark Text/Primary", "#F9FAFB");
  createColorStyle("Dark Text/Secondary", "#9CA3AF");
  createColorStyle("Dark Text/Tertiary", "#6B7280");
  createColorStyle("Dark Text/Link", "#818CF8");

  // ── TYPOGRAPHY STYLES ──
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  const textStyles = [
    ["Display/2XL", "Bold", 72, 90, -1.44],
    ["Display/XL", "Bold", 60, 72, -1.2],
    ["Display/LG", "Bold", 48, 56, -0.96],
    ["Display/MD", "Semi Bold", 36, 44, -0.72],
    ["Display/SM", "Semi Bold", 30, 38, -0.6],
    ["Heading/H1", "Semi Bold", 24, 32, -0.48],
    ["Heading/H2", "Semi Bold", 20, 28, -0.4],
    ["Heading/H3", "Semi Bold", 18, 26, 0],
    ["Heading/H4", "Medium", 16, 24, 0],
    ["Heading/H5", "Medium", 14, 20, 0],
    ["Body/XL", "Regular", 20, 30, 0],
    ["Body/LG", "Regular", 18, 28, 0],
    ["Body/MD", "Regular", 16, 24, 0],
    ["Body/SM", "Regular", 14, 20, 0],
    ["Body/XS", "Regular", 12, 18, 0],
    ["Label/LG", "Medium", 16, 24, 0],
    ["Label/MD", "Medium", 14, 20, 0],
    ["Label/SM", "Medium", 12, 18, 0],
    ["Label/XS", "Medium", 11, 16, 0],
    ["Code/LG", "Regular", 16, 24, 0],
    ["Code/MD", "Regular", 14, 20, 0],
    ["Code/SM", "Regular", 12, 18, 0],
  ];

  for (const [name, weight, size, lineH, letterSp] of textStyles) {
    const ts = figma.createTextStyle();
    ts.name = name;
    ts.fontName = { family: "Inter", style: weight };
    ts.fontSize = size;
    ts.lineHeight = { value: lineH, unit: "PIXELS" };
    if (letterSp !== 0) ts.letterSpacing = { value: letterSp, unit: "PIXELS" };
  }

  // ── EFFECT STYLES ──
  // Shadows
  const shadows = [
    ["Shadow/XS", [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.05 }, offset: { x: 0, y: 1 }, radius: 2, spread: 0, visible: true }]],
    ["Shadow/SM", [
      { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 1 }, radius: 3, spread: 0, visible: true },
      { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.06 }, offset: { x: 0, y: 1 }, radius: 2, spread: -1, visible: true },
    ]],
    ["Shadow/MD", [
      { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 4 }, radius: 6, spread: -1, visible: true },
      { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.06 }, offset: { x: 0, y: 2 }, radius: 4, spread: -2, visible: true },
    ]],
    ["Shadow/LG", [
      { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 10 }, radius: 15, spread: -3, visible: true },
      { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.05 }, offset: { x: 0, y: 4 }, radius: 6, spread: -4, visible: true },
    ]],
    ["Shadow/XL", [
      { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 20 }, radius: 25, spread: -5, visible: true },
      { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.04 }, offset: { x: 0, y: 8 }, radius: 10, spread: -6, visible: true },
    ]],
    ["Focus/Primary", [{ type: "DROP_SHADOW", color: { r: 0.39, g: 0.4, b: 0.95, a: 0.24 }, offset: { x: 0, y: 0 }, radius: 0, spread: 4, visible: true }]],
    ["Focus/Error", [{ type: "DROP_SHADOW", color: { r: 0.93, g: 0.27, b: 0.27, a: 0.24 }, offset: { x: 0, y: 0 }, radius: 0, spread: 4, visible: true }]],
  ];

  for (const [name, effects] of shadows) {
    const es = figma.createEffectStyle();
    es.name = name;
    es.effects = effects;
  }

  // ── TOKEN REFERENCE FRAME (visual) ──
  const page = figma.currentPage;
  page.name = "📕 Cover & Tokens";

  // Cover frame
  const cover = figma.createFrame();
  cover.name = "Cover";
  cover.resize(1440, 900);
  cover.fills = [{ type: "SOLID", color: hex("#0F172A") }];
  cover.x = 0; cover.y = 0;

  // Title text
  const title = figma.createText();
  title.characters = "Nova UI Kit";
  title.fontName = { family: "Inter", style: "Bold" };
  title.fontSize = 80;
  title.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
  title.x = 120; title.y = 300;
  cover.appendChild(title);

  const subtitle = figma.createText();
  subtitle.characters = "Dashboard & SaaS Design System";
  subtitle.fontName = { family: "Inter", style: "Regular" };
  subtitle.fontSize = 32;
  subtitle.fills = [{ type: "SOLID", color: hex("#9CA3AF") }];
  subtitle.x = 120; subtitle.y = 400;
  cover.appendChild(subtitle);

  const meta = figma.createText();
  meta.characters = "80+ Screens  •  200+ Components  •  Light & Dark Mode  •  Auto Layout  •  Free Updates";
  meta.fontName = { family: "Inter", style: "Medium" };
  meta.fontSize = 18;
  meta.fills = [{ type: "SOLID", color: hex("#6366F1") }];
  meta.x = 120; meta.y = 480;
  cover.appendChild(meta);

  const author = figma.createText();
  author.characters = "by Dang Pham  •  dangpham.pages.dev";
  author.fontName = { family: "Inter", style: "Regular" };
  author.fontSize = 16;
  author.fills = [{ type: "SOLID", color: hex("#6B7280") }];
  author.x = 120; author.y = 530;
  cover.appendChild(author);

  // Accent shape
  const accent = figma.createRectangle();
  accent.resize(600, 600);
  accent.x = 900; accent.y = 150;
  accent.cornerRadius = 40;
  accent.rotation = 15;
  accent.fills = [{
    type: "GRADIENT_LINEAR",
    gradientTransform: [[1, 0, 0], [0, 1, 0]],
    gradientStops: [
      { position: 0, color: { r: 0.39, g: 0.4, b: 0.95, a: 0.6 } },
      { position: 1, color: { r: 0.58, g: 0.27, b: 0.95, a: 0.3 } },
    ],
  }];
  cover.appendChild(accent);

  figma.notify("✅ Foundation created: 70+ color styles, 22 text styles, 7 effect styles, cover page");
})();
