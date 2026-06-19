// ============================================================
// NOVA UI KIT â€” Part 1: Foundation (Styles + Style Guide Page)
// Run AFTER 00-variables.js
// ============================================================

(async () => {
  const hex = (h) => ({
    r: parseInt(h.slice(1, 3), 16) / 255,
    g: parseInt(h.slice(3, 5), 16) / 255,
    b: parseInt(h.slice(5, 7), 16) / 255,
  });

  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Extra Bold" });

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // COLOR PAINT STYLES (backup for non-variable workflows)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  function createColorStyle(name, h) {
    const s = figma.createPaintStyle();
    s.name = name;
    s.paints = [{ type: "SOLID", color: hex(h) }];
    return s;
  }

  const palettes = {
    "Primary": {
      "50": "#EEF2FF", "100": "#E0E7FF", "200": "#C7D2FE", "300": "#A5B4FC",
      "400": "#818CF8", "500": "#6366F1", "600": "#4F46E5", "700": "#4338CA",
      "800": "#3730A3", "900": "#312E81",
    },
    "Neutral": {
      "25": "#FCFCFD", "50": "#F9FAFB", "100": "#F3F4F6", "200": "#E5E7EB",
      "300": "#D1D5DB", "400": "#9CA3AF", "500": "#6B7280", "600": "#4B5563",
      "700": "#374151", "800": "#1F2937", "900": "#111827", "950": "#030712",
    },
    "Success": { "50": "#ECFDF5", "100": "#D1FAE5", "200": "#A7F3D0", "500": "#10B981", "600": "#059669", "700": "#047857" },
    "Warning": { "50": "#FFFBEB", "100": "#FEF3C7", "200": "#FDE68A", "500": "#F59E0B", "600": "#D97706", "700": "#B45309" },
    "Error":   { "50": "#FEF2F2", "100": "#FEE2E2", "200": "#FECACA", "500": "#EF4444", "600": "#DC2626", "700": "#B91C1C" },
    "Info":    { "50": "#EFF6FF", "100": "#DBEAFE", "200": "#BFDBFE", "500": "#3B82F6", "600": "#2563EB", "700": "#1D4ED8" },
  };

  for (const [group, shades] of Object.entries(palettes)) {
    for (const [k, v] of Object.entries(shades)) createColorStyle(`${group}/${k}`, v);
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // TEXT STYLES
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  const textStyles = [
    { name: "Display/XL",     family: "Inter", style: "Extra Bold", size: 72, lh: 80, ls: -2.5 },
    { name: "Display/LG",     family: "Inter", style: "Extra Bold", size: 60, lh: 68, ls: -2 },
    { name: "Display/MD",     family: "Inter", style: "Bold",       size: 48, lh: 56, ls: -1.5 },
    { name: "Display/SM",     family: "Inter", style: "Bold",       size: 36, lh: 44, ls: -1 },
    { name: "Heading/H1",     family: "Inter", style: "Bold",       size: 30, lh: 38, ls: -0.5 },
    { name: "Heading/H2",     family: "Inter", style: "Semi Bold",  size: 24, lh: 32, ls: -0.3 },
    { name: "Heading/H3",     family: "Inter", style: "Semi Bold",  size: 20, lh: 28, ls: -0.2 },
    { name: "Heading/H4",     family: "Inter", style: "Semi Bold",  size: 18, lh: 26, ls: 0 },
    { name: "Body/LG",        family: "Inter", style: "Regular",    size: 18, lh: 28, ls: 0 },
    { name: "Body/MD",        family: "Inter", style: "Regular",    size: 16, lh: 24, ls: 0 },
    { name: "Body/SM",        family: "Inter", style: "Regular",    size: 14, lh: 20, ls: 0 },
    { name: "Body/XS",        family: "Inter", style: "Regular",    size: 12, lh: 16, ls: 0 },
    { name: "Body/LG Medium", family: "Inter", style: "Medium",     size: 18, lh: 28, ls: 0 },
    { name: "Body/MD Medium", family: "Inter", style: "Medium",     size: 16, lh: 24, ls: 0 },
    { name: "Body/SM Medium", family: "Inter", style: "Medium",     size: 14, lh: 20, ls: 0 },
    { name: "Label/LG",       family: "Inter", style: "Medium",     size: 14, lh: 20, ls: 0.1 },
    { name: "Label/MD",       family: "Inter", style: "Medium",     size: 12, lh: 16, ls: 0.1 },
    { name: "Label/SM",       family: "Inter", style: "Medium",     size: 11, lh: 14, ls: 0.2 },
    { name: "Caption",        family: "Inter", style: "Regular",    size: 12, lh: 16, ls: 0 },
    { name: "Overline",       family: "Inter", style: "Semi Bold",  size: 11, lh: 14, ls: 1 },
  ];

  for (const t of textStyles) {
    const s = figma.createTextStyle();
    s.name = t.name;
    s.fontName = { family: t.family, style: t.style };
    s.fontSize = t.size;
    s.lineHeight = { value: t.lh, unit: "PIXELS" };
    if (t.ls !== 0) s.letterSpacing = { value: t.ls, unit: "PIXELS" };
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // EFFECT STYLES (Shadows & Blurs)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  function createShadowStyle(name, shadows) {
    const s = figma.createEffectStyle();
    s.name = name;
    s.effects = shadows.map(sh => ({
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: sh.a },
      offset: { x: sh.x, y: sh.y },
      radius: sh.blur,
      spread: sh.spread || 0,
      visible: true,
      blendMode: "NORMAL",
    }));
    return s;
  }

  createShadowStyle("Elevation/XS", [
    { x: 0, y: 1, blur: 2, a: 0.05 },
  ]);
  createShadowStyle("Elevation/SM", [
    { x: 0, y: 1, blur: 3, a: 0.1 },
    { x: 0, y: 1, blur: 2, a: 0.06 },
  ]);
  createShadowStyle("Elevation/MD", [
    { x: 0, y: 4, blur: 6, spread: -1, a: 0.1 },
    { x: 0, y: 2, blur: 4, spread: -2, a: 0.1 },
  ]);
  createShadowStyle("Elevation/LG", [
    { x: 0, y: 10, blur: 15, spread: -3, a: 0.1 },
    { x: 0, y: 4, blur: 6, spread: -4, a: 0.1 },
  ]);
  createShadowStyle("Elevation/XL", [
    { x: 0, y: 20, blur: 25, spread: -5, a: 0.1 },
    { x: 0, y: 8, blur: 10, spread: -6, a: 0.1 },
  ]);
  createShadowStyle("Elevation/2XL", [
    { x: 0, y: 25, blur: 50, spread: -12, a: 0.25 },
  ]);

  // Inner shadows
  const innerStyle = figma.createEffectStyle();
  innerStyle.name = "Elevation/Inner";
  innerStyle.effects = [{
    type: "INNER_SHADOW",
    color: { r: 0, g: 0, b: 0, a: 0.06 },
    offset: { x: 0, y: 2 },
    radius: 4,
    spread: 0,
    visible: true,
    blendMode: "NORMAL",
  }];

  // Focus ring
  const focusStyle = figma.createEffectStyle();
  focusStyle.name = "Focus/Primary";
  focusStyle.effects = [{
    type: "DROP_SHADOW",
    color: { r: 0.39, g: 0.27, b: 0.9, a: 0.25 },
    offset: { x: 0, y: 0 },
    radius: 0,
    spread: 4,
    visible: true,
    blendMode: "NORMAL",
  }];

  const focusErrorStyle = figma.createEffectStyle();
  focusErrorStyle.name = "Focus/Error";
  focusErrorStyle.effects = [{
    type: "DROP_SHADOW",
    color: { r: 0.86, g: 0.15, b: 0.15, a: 0.25 },
    offset: { x: 0, y: 0 },
    radius: 0,
    spread: 4,
    visible: true,
    blendMode: "NORMAL",
  }];

  // Blur styles
  const blurBg = figma.createEffectStyle();
  blurBg.name = "Blur/Background";
  blurBg.effects = [{
    type: "BACKGROUND_BLUR",
    radius: 24,
    visible: true,
  }];

  const blurLayer = figma.createEffectStyle();
  blurLayer.name = "Blur/Layer";
  blurLayer.effects = [{
    type: "LAYER_BLUR",
    radius: 16,
    visible: true,
  }];

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // STYLE GUIDE PAGE (visual presentation)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  let stylePage = figma.root.children.find(p => p.name === "ðŸ“ Style Guide");
  if (!stylePage) {
    stylePage = figma.createPage();
    stylePage.name = "ðŸ“ Style Guide";
  }
  figma.currentPage = stylePage;

  const PAGE_W = 1440;
  let yPos = 0;

  function sectionTitle(text, y) {
    const t = figma.createText();
    t.characters = text;
    t.fontName = { family: "Inter", style: "Bold" };
    t.fontSize = 32;
    t.fills = [{ type: "SOLID", color: hex("#111827") }];
    t.x = 80;
    t.y = y;
    return t;
  }

  function sectionSubtitle(text, y) {
    const t = figma.createText();
    t.characters = text;
    t.fontName = { family: "Inter", style: "Regular" };
    t.fontSize = 16;
    t.fills = [{ type: "SOLID", color: hex("#6B7280") }];
    t.x = 80;
    t.y = y;
    return t;
  }

  // â”€â”€ TITLE â”€â”€
  sectionTitle("Nova UI Kit â€” Style Guide", yPos);
  yPos += 50;
  sectionSubtitle("Foundation tokens, typography, colors, shadows, and spacing.", yPos);
  yPos += 80;

  // â”€â”€ COLOR PALETTE DISPLAY â”€â”€
  sectionTitle("Color Palette", yPos);
  yPos += 60;

  for (const [group, shades] of Object.entries(palettes)) {
    const groupLabel = figma.createText();
    groupLabel.characters = group;
    groupLabel.fontName = { family: "Inter", style: "Semi Bold" };
    groupLabel.fontSize = 16;
    groupLabel.fills = [{ type: "SOLID", color: hex("#374151") }];
    groupLabel.x = 80;
    groupLabel.y = yPos;
    yPos += 32;

    let xPos = 80;
    const entries = Object.entries(shades);
    for (const [shade, color] of entries) {
      const swatch = figma.createFrame();
      swatch.name = `${group}/${shade}`;
      swatch.resize(80, 80);
      swatch.cornerRadius = 12;
      swatch.fills = [{ type: "SOLID", color: hex(color) }];
      swatch.x = xPos;
      swatch.y = yPos;

      const label = figma.createText();
      label.characters = shade;
      label.fontName = { family: "Inter", style: "Medium" };
      label.fontSize = 10;
      label.fills = [{ type: "SOLID", color: hex("#6B7280") }];
      label.x = xPos;
      label.y = yPos + 86;

      const hexLabel = figma.createText();
      hexLabel.characters = color;
      hexLabel.fontName = { family: "Inter", style: "Regular" };
      hexLabel.fontSize = 9;
      hexLabel.fills = [{ type: "SOLID", color: hex("#9CA3AF") }];
      hexLabel.x = xPos;
      hexLabel.y = yPos + 100;

      xPos += 96;
    }
    yPos += 130;
  }

  yPos += 40;

  // â”€â”€ TYPOGRAPHY DISPLAY â”€â”€
  sectionTitle("Typography Scale", yPos);
  yPos += 60;

  const typeSamples = [
    { label: "Display XL", style: "Extra Bold", size: 72, sample: "Aa" },
    { label: "Display LG", style: "Extra Bold", size: 60, sample: "Aa" },
    { label: "Display MD", style: "Bold", size: 48, sample: "The quick brown fox" },
    { label: "Display SM", style: "Bold", size: 36, sample: "The quick brown fox" },
    { label: "Heading H1", style: "Bold", size: 30, sample: "The quick brown fox jumps" },
    { label: "Heading H2", style: "Semi Bold", size: 24, sample: "The quick brown fox jumps over" },
    { label: "Heading H3", style: "Semi Bold", size: 20, sample: "The quick brown fox jumps over the lazy dog" },
    { label: "Body LG",    style: "Regular", size: 18, sample: "The quick brown fox jumps over the lazy dog" },
    { label: "Body MD",    style: "Regular", size: 16, sample: "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs." },
    { label: "Body SM",    style: "Regular", size: 14, sample: "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs." },
    { label: "Body XS",    style: "Regular", size: 12, sample: "The quick brown fox jumps over the lazy dog." },
    { label: "Label LG",   style: "Medium",  size: 14, sample: "LABEL TEXT EXAMPLE" },
    { label: "Caption",    style: "Regular", size: 12, sample: "Caption text for supplementary information" },
    { label: "Overline",   style: "Semi Bold", size: 11, sample: "OVERLINE TEXT" },
  ];

  for (const t of typeSamples) {
    const lbl = figma.createText();
    lbl.characters = `${t.label}  â€¢  ${t.size}px  â€¢  Inter ${t.style}`;
    lbl.fontName = { family: "Inter", style: "Medium" };
    lbl.fontSize = 11;
    lbl.fills = [{ type: "SOLID", color: hex("#9CA3AF") }];
    lbl.x = 80;
    lbl.y = yPos;
    yPos += 20;

    const sample = figma.createText();
    sample.characters = t.sample;
    sample.fontName = { family: "Inter", style: t.style };
    sample.fontSize = t.size;
    sample.fills = [{ type: "SOLID", color: hex("#111827") }];
    sample.x = 80;
    sample.y = yPos;
    yPos += t.size + 30;
  }

  yPos += 40;

  // â”€â”€ SPACING DISPLAY â”€â”€
  sectionTitle("Spacing Scale (8pt Grid)", yPos);
  yPos += 60;

  const spacingDisplay = [
    ["2xs", 2], ["xs", 4], ["sm", 6], ["md", 8], ["lg", 12],
    ["xl", 16], ["2xl", 20], ["3xl", 24], ["4xl", 32], ["5xl", 40],
    ["6xl", 48], ["7xl", 64],
  ];

  let spX = 80;
  for (const [name, val] of spacingDisplay) {
    const bar = figma.createRectangle();
    bar.resize(val, 32);
    bar.cornerRadius = 4;
    bar.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
    bar.opacity = 0.7;
    bar.x = spX;
    bar.y = yPos;

    const lbl = figma.createText();
    lbl.characters = `${name}\n${val}px`;
    lbl.fontName = { family: "Inter", style: "Medium" };
    lbl.fontSize = 10;
    lbl.fills = [{ type: "SOLID", color: hex("#6B7280") }];
    lbl.x = spX;
    lbl.y = yPos + 40;

    spX += Math.max(val, 24) + 20;
  }

  yPos += 100;

  // â”€â”€ SHADOW DISPLAY â”€â”€
  sectionTitle("Elevation / Shadows", yPos);
  yPos += 60;

  const shadowNames = ["XS", "SM", "MD", "LG", "XL", "2XL"];
  const shadowDefs = [
    [{ x: 0, y: 1, blur: 2, a: 0.05 }],
    [{ x: 0, y: 1, blur: 3, a: 0.1 }, { x: 0, y: 1, blur: 2, a: 0.06 }],
    [{ x: 0, y: 4, blur: 6, a: 0.1 }, { x: 0, y: 2, blur: 4, a: 0.1 }],
    [{ x: 0, y: 10, blur: 15, a: 0.1 }, { x: 0, y: 4, blur: 6, a: 0.1 }],
    [{ x: 0, y: 20, blur: 25, a: 0.1 }, { x: 0, y: 8, blur: 10, a: 0.1 }],
    [{ x: 0, y: 25, blur: 50, a: 0.25 }],
  ];

  let shX = 80;
  for (let i = 0; i < shadowNames.length; i++) {
    const card = figma.createRectangle();
    card.resize(140, 100);
    card.cornerRadius = 16;
    card.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    card.effects = shadowDefs[i].map(sh => ({
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: sh.a },
      offset: { x: sh.x, y: sh.y },
      radius: sh.blur,
      spread: sh.spread || 0,
      visible: true,
      blendMode: "NORMAL",
    }));
    card.x = shX;
    card.y = yPos;

    const lbl = figma.createText();
    lbl.characters = shadowNames[i];
    lbl.fontName = { family: "Inter", style: "Medium" };
    lbl.fontSize = 12;
    lbl.fills = [{ type: "SOLID", color: hex("#374151") }];
    lbl.x = shX + 16;
    lbl.y = yPos + 40;

    shX += 180;
  }

  yPos += 180;

  // â”€â”€ RADIUS DISPLAY â”€â”€
  sectionTitle("Border Radius", yPos);
  yPos += 60;

  const radii = [
    ["none", 0], ["xs", 2], ["sm", 4], ["md", 6], ["lg", 8],
    ["xl", 12], ["2xl", 16], ["3xl", 20], ["full", 9999],
  ];

  let rX = 80;
  for (const [name, val] of radii) {
    const rect = figma.createRectangle();
    rect.resize(64, 64);
    rect.cornerRadius = Math.min(val, 32);
    rect.fills = [{ type: "SOLID", color: hex("#EEF2FF") }];
    rect.strokes = [{ type: "SOLID", color: hex("#C7D2FE") }];
    rect.strokeWeight = 2;
    rect.x = rX;
    rect.y = yPos;

    const lbl = figma.createText();
    lbl.characters = `${name}\n${val === 9999 ? "full" : val + "px"}`;
    lbl.fontName = { family: "Inter", style: "Medium" };
    lbl.fontSize = 10;
    lbl.fills = [{ type: "SOLID", color: hex("#6B7280") }];
    lbl.x = rX;
    lbl.y = yPos + 72;

    rX += 90;
  }

  figma.closePlugin("âœ… Foundation complete: Color styles, Text styles, Effect styles, Style Guide page");
})();

