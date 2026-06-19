// ============================================================
// LUXE FASHION — eCommerce UI Kit
// Part 0: Variables + Foundation + Text Styles
// Style: Minimal luxury, black/white, elegant serif headings
// ============================================================

(async () => {
  const hex = (h) => ({
    r: parseInt(h.slice(1, 3), 16) / 255,
    g: parseInt(h.slice(3, 5), 16) / 255,
    b: parseInt(h.slice(5, 7), 16) / 255,
  });

  // ══════════════════════════════════════════
  // FONTS
  // ══════════════════════════════════════════
  const fonts = [
    { family: "Inter", style: "Regular" },
    { family: "Inter", style: "Medium" },
    { family: "Inter", style: "Semi Bold" },
    { family: "Inter", style: "Bold" },
    { family: "Inter", style: "Light" },
  ];
  for (const f of fonts) await figma.loadFontAsync(f);

  // ══════════════════════════════════════════
  // COLOR VARIABLES (Light + Dark)
  // ══════════════════════════════════════════
  const cc = figma.variables.createVariableCollection("Luxe Tokens");
  const lightId = cc.modes[0].modeId;
  cc.renameMode(lightId, "Light");
  const darkId = cc.addMode("Dark");

  function cv(name, light, dark) {
    const v = figma.variables.createVariable(name, cc, "COLOR");
    v.setValueForMode(lightId, { ...hex(light), a: 1 });
    v.setValueForMode(darkId, { ...hex(dark), a: 1 });
    return v;
  }

  // Brand
  cv("Brand/Black",       "#000000", "#FFFFFF");
  cv("Brand/White",       "#FFFFFF", "#000000");
  cv("Brand/Ivory",       "#F8F4F0", "#1A1714");
  cv("Brand/Cream",       "#F0EBE3", "#1F1B16");
  cv("Brand/Gold",        "#C8A96E", "#D4B87A");
  cv("Brand/Gold Light",  "#E8DCCC", "#2A2418");

  // Neutral
  cv("Neutral/50",  "#FAFAFA", "#0A0A0A");
  cv("Neutral/100", "#F5F5F5", "#141414");
  cv("Neutral/200", "#E5E5E5", "#1F1F1F");
  cv("Neutral/300", "#D4D4D4", "#333333");
  cv("Neutral/400", "#A3A3A3", "#666666");
  cv("Neutral/500", "#737373", "#8A8A8A");
  cv("Neutral/600", "#525252", "#A3A3A3");
  cv("Neutral/700", "#404040", "#D4D4D4");
  cv("Neutral/800", "#262626", "#E5E5E5");
  cv("Neutral/900", "#171717", "#F5F5F5");

  // Semantic
  cv("Semantic/BG",           "#FFFFFF", "#000000");
  cv("Semantic/Surface",      "#FFFFFF", "#0A0A0A");
  cv("Semantic/Surface 2",    "#FAFAFA", "#141414");
  cv("Semantic/Border",       "#E5E5E5", "#262626");
  cv("Semantic/Border Light", "#F0F0F0", "#1A1A1A");
  cv("Semantic/Text",         "#000000", "#FFFFFF");
  cv("Semantic/Text 2",       "#333333", "#CCCCCC");
  cv("Semantic/Text 3",       "#666666", "#999999");
  cv("Semantic/Text Muted",   "#999999", "#666666");
  cv("Semantic/Error",        "#E53935", "#EF5350");
  cv("Semantic/Success",      "#2E7D32", "#66BB6A");
  cv("Semantic/Sale",         "#D32F2F", "#EF5350");
  cv("Semantic/Overlay",      "#00000066", "#00000099");

  // ══════════════════════════════════════════
  // COLOR PAINT STYLES
  // ══════════════════════════════════════════
  const paintStyles = {
    "Brand/Black": "#000000",
    "Brand/White": "#FFFFFF",
    "Brand/Ivory": "#F8F4F0",
    "Brand/Cream": "#F0EBE3",
    "Brand/Gold": "#C8A96E",
    "Neutral/50": "#FAFAFA", "Neutral/100": "#F5F5F5", "Neutral/200": "#E5E5E5",
    "Neutral/300": "#D4D4D4", "Neutral/400": "#A3A3A3", "Neutral/500": "#737373",
    "Neutral/600": "#525252", "Neutral/700": "#404040", "Neutral/800": "#262626",
    "Neutral/900": "#171717",
    "Status/Error": "#E53935", "Status/Success": "#2E7D32", "Status/Sale": "#D32F2F",
  };
  for (const [n, h] of Object.entries(paintStyles)) {
    const s = figma.createPaintStyle();
    s.name = n;
    s.paints = [{ type: "SOLID", color: hex(h) }];
  }

  // ══════════════════════════════════════════
  // TEXT STYLES
  // ══════════════════════════════════════════
  const textDefs = [
    // Display — elegant, wide tracking for luxury feel
    { name: "Display/Hero",    style: "Light",     size: 34, lh: 40, ls: 4 },
    { name: "Display/Title",   style: "Regular",   size: 28, lh: 36, ls: 2 },
    { name: "Display/Subtitle",style: "Light",     size: 22, lh: 30, ls: 1.5 },
    // Heading
    { name: "Heading/H1",      style: "Semi Bold", size: 20, lh: 28, ls: 0 },
    { name: "Heading/H2",      style: "Semi Bold", size: 18, lh: 26, ls: 0 },
    { name: "Heading/H3",      style: "Medium",    size: 16, lh: 24, ls: 0 },
    { name: "Heading/H4",      style: "Medium",    size: 14, lh: 20, ls: 0 },
    // Body
    { name: "Body/LG",         style: "Regular",   size: 16, lh: 24, ls: 0 },
    { name: "Body/MD",         style: "Regular",   size: 14, lh: 22, ls: 0 },
    { name: "Body/SM",         style: "Regular",   size: 13, lh: 20, ls: 0 },
    { name: "Body/XS",         style: "Regular",   size: 12, lh: 18, ls: 0 },
    // Label — uppercase tracking for fashion
    { name: "Label/LG",        style: "Medium",    size: 14, lh: 20, ls: 2 },
    { name: "Label/MD",        style: "Medium",    size: 12, lh: 16, ls: 2 },
    { name: "Label/SM",        style: "Medium",    size: 11, lh: 14, ls: 1.5 },
    { name: "Label/XS",        style: "Medium",    size: 10, lh: 14, ls: 1.5 },
    // Price
    { name: "Price/LG",        style: "Semi Bold", size: 18, lh: 24, ls: 0.5 },
    { name: "Price/MD",        style: "Semi Bold", size: 16, lh: 22, ls: 0.5 },
    { name: "Price/SM",        style: "Medium",    size: 14, lh: 20, ls: 0.3 },
    { name: "Price/Sale",      style: "Regular",   size: 14, lh: 20, ls: 0 },
    // Caption
    { name: "Caption",         style: "Regular",   size: 11, lh: 16, ls: 0.2 },
    // Button
    { name: "Button/LG",       style: "Medium",    size: 16, lh: 20, ls: 2 },
    { name: "Button/MD",       style: "Medium",    size: 14, lh: 18, ls: 1.5 },
    { name: "Button/SM",       style: "Medium",    size: 12, lh: 16, ls: 1.5 },
  ];

  for (const t of textDefs) {
    const s = figma.createTextStyle();
    s.name = t.name;
    s.fontName = { family: "Inter", style: t.style };
    s.fontSize = t.size;
    s.lineHeight = { value: t.lh, unit: "PIXELS" };
    if (t.ls !== 0) s.letterSpacing = { value: t.ls, unit: "PIXELS" };
  }

  // ══════════════════════════════════════════
  // EFFECT STYLES
  // ══════════════════════════════════════════
  function eShadow(name, defs) {
    const s = figma.createEffectStyle();
    s.name = name;
    s.effects = defs.map(d => ({
      type: "DROP_SHADOW", blendMode: "NORMAL", visible: true,
      color: { r: 0, g: 0, b: 0, a: d.a },
      offset: { x: d.x || 0, y: d.y },
      radius: d.blur, spread: d.spread || 0,
    }));
  }

  eShadow("Shadow/Card",    [{ y: 2, blur: 8, a: 0.04 }, { y: 1, blur: 3, a: 0.06 }]);
  eShadow("Shadow/Dropdown",[{ y: 8, blur: 24, a: 0.08 }, { y: 2, blur: 6, a: 0.04 }]);
  eShadow("Shadow/Modal",   [{ y: 20, blur: 40, a: 0.12 }, { y: 4, blur: 12, a: 0.06 }]);
  eShadow("Shadow/Bottom Bar",[{ y: -1, blur: 8, a: 0.06 }]);

  // Spacing collection
  const spC = figma.variables.createVariableCollection("Spacing");
  const spM = spC.modes[0].modeId;
  spC.renameMode(spM, "Default");
  for (const [n, v] of Object.entries({
    "2xs": 2, "xs": 4, "sm": 6, "md": 8, "lg": 12, "xl": 16,
    "2xl": 20, "3xl": 24, "4xl": 32, "5xl": 40, "6xl": 48, "7xl": 64,
  })) {
    const sv = figma.variables.createVariable(`Space/${n}`, spC, "FLOAT");
    sv.setValueForMode(spM, v);
  }

  figma.notify("✅ Luxe Fashion: Variables (Light/Dark), 22 Text Styles, 4 Shadow Styles, Spacing tokens created");
})();
