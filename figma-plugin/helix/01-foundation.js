// ============================================================
// HELIX CRYPTO UI KIT — Part 1: Foundation (Styles + Style Guide)
// Run AFTER 00-variables.js
// Fonts: Space Grotesk · Plus Jakarta Sans · JetBrains Mono
// (all free Google Fonts, available in Figma by default)
// ============================================================

(async () => {
  const hex = (h) => ({
    r: parseInt(h.slice(1, 3), 16) / 255,
    g: parseInt(h.slice(3, 5), 16) / 255,
    b: parseInt(h.slice(5, 7), 16) / 255,
  });
  const solid = (h, o) => ({ type: "SOLID", color: hex(h), opacity: o === undefined ? 1 : o });

  // ── Font loader with style-name fallbacks (Google fonts vary) ──
  async function pickFont(family, styles) {
    for (const style of styles) {
      try { await figma.loadFontAsync({ family, style }); return { family, style }; } catch (e) {}
    }
    throw new Error(`Font missing in Figma: ${family} (${styles.join("/")})`);
  }
  const F = {
    disp:     await pickFont("Space Grotesk", ["SemiBold", "Semi Bold", "Medium"]),
    dispMed:  await pickFont("Space Grotesk", ["Medium", "Regular"]),
    body:     await pickFont("Plus Jakarta Sans", ["Regular"]),
    bodyMed:  await pickFont("Plus Jakarta Sans", ["Medium", "Regular"]),
    bodySemi: await pickFont("Plus Jakarta Sans", ["SemiBold", "Semi Bold", "Bold"]),
    bodyBold: await pickFont("Plus Jakarta Sans", ["Bold"]),
    mono:     await pickFont("JetBrains Mono", ["Regular"]),
    monoMed:  await pickFont("JetBrains Mono", ["Medium", "Regular"]),
    monoSemi: await pickFont("JetBrains Mono", ["SemiBold", "Semi Bold", "Bold"]),
  };

  // ═════════════════════════════════════════════
  // PAINT STYLES
  // ═════════════════════════════════════════════
  function paint(name, paints) {
    const s = figma.createPaintStyle();
    s.name = name;
    s.paints = paints;
    return s;
  }
  const grad135 = (c1, c2) => ({
    type: "GRADIENT_LINEAR",
    gradientTransform: [[0.7071, 0.7071, 0], [-0.7071, 0.7071, 0.2929]],
    gradientStops: [
      { position: 0, color: { ...hex(c1), a: 1 } },
      { position: 1, color: { ...hex(c2), a: 1 } },
    ],
  });

  const ramp = {
    50: "#EEF0FF", 100: "#E0E3FF", 200: "#C7CCFE", 300: "#A5ABFC",
    400: "#828CF8", 500: "#6366F1", 600: "#4F46E5", 700: "#4338CA",
    800: "#3730A3", 900: "#312E81", 950: "#1E1B4B",
  };
  for (const [step, h] of Object.entries(ramp)) paint(`Accent/${step}`, [solid(h)]);
  paint("Accent/Gradient", [grad135("#6366F1", "#8B5CF6")]);
  paint("Accent/Gradient Hero", [grad135("#6366F1", "#22D3EE")]);

  const dark = {
    Canvas: "#0A0C10", Surface: "#12151C", Card: "#171B24", Elevated: "#1E232E",
    Line: "#252B37", Muted: "#5E6776", Subtle: "#9AA4B2", Body: "#C8CFDA", Strong: "#F2F4F8",
  };
  for (const [n, h] of Object.entries(dark)) paint(`Dark/${n}`, [solid(h)]);
  paint("Dark/Ghost Fill", [solid("#FFFFFF", 0.05)]);
  paint("Dark/Ghost Border", [solid("#FFFFFF", 0.08)]);

  const light = {
    Canvas: "#F6F7F9", Surface: "#FFFFFF", Sunken: "#F1F3F6", Line: "#E6E8EC",
    Border: "#D7DBE2", Muted: "#9099A6", Subtle: "#5A6473", Body: "#2A3340", Strong: "#0E121B",
  };
  for (const [n, h] of Object.entries(light)) paint(`Light/${n}`, [solid(h)]);

  paint("Semantic/Success", [solid("#10B981")]);
  paint("Semantic/Success Text", [solid("#34D399")]);
  paint("Semantic/Success Subtle", [solid("#34D399", 0.12)]);
  paint("Semantic/Danger", [solid("#F43F5E")]);
  paint("Semantic/Danger Text", [solid("#FB7185")]);
  paint("Semantic/Danger Subtle", [solid("#FB7185", 0.12)]);
  paint("Semantic/Warning", [solid("#F59E0B")]);
  paint("Semantic/Warning Text", [solid("#FBBF24")]);
  paint("Semantic/Warning Subtle", [solid("#F59E0B", 0.14)]);
  paint("Semantic/Info", [solid("#0EA5E9")]);
  paint("Semantic/Info Text", [solid("#38BDF8")]);
  paint("Semantic/Info Subtle", [solid("#0EA5E9", 0.14)]);
  paint("Semantic/Bitcoin", [solid("#F7931A")]);
  paint("Semantic/Teal", [solid("#14B8A6")]);

  // ═════════════════════════════════════════════
  // TEXT STYLES
  // ═════════════════════════════════════════════
  function text(name, font, size, opts) {
    const s = figma.createTextStyle();
    s.name = name;
    s.fontName = font;
    s.fontSize = size;
    const o = opts || {};
    s.lineHeight = o.lh ? { value: o.lh, unit: "PERCENT" } : { unit: "AUTO" };
    if (o.ls !== undefined) s.letterSpacing = { value: o.ls, unit: "PERCENT" };
    if (o.caps) s.textCase = "UPPER";
    return s;
  }

  // Display & headings — Space Grotesk 600
  text("Display/XL", F.disp, 66, { lh: 102, ls: -3.5 });
  text("Display/LG", F.disp, 56, { lh: 104, ls: -3.5 });
  text("Display/MD", F.disp, 42, { lh: 110, ls: -3 });
  text("Heading/H1", F.disp, 32, { lh: 120, ls: -2 });
  text("Heading/H2", F.disp, 26, { lh: 125, ls: -2 });
  text("Heading/H3", F.disp, 20, { lh: 130, ls: -1 });
  text("Heading/H4", F.disp, 16, { lh: 135, ls: -1 });

  // Body — Plus Jakarta Sans
  text("Body/LG", F.body, 18, { lh: 160 });
  text("Body/LG Medium", F.bodyMed, 18, { lh: 160 });
  text("Body/MD", F.body, 16, { lh: 160 });
  text("Body/MD Medium", F.bodyMed, 16, { lh: 160 });
  text("Body/SM", F.body, 14, { lh: 150 });
  text("Body/SM Medium", F.bodyMed, 14, { lh: 150 });
  text("Body/SM SemiBold", F.bodySemi, 14, { lh: 150 });
  text("Body/XS", F.body, 12, { lh: 145 });
  text("Body/XS Medium", F.bodyMed, 12, { lh: 145 });

  // Labels
  text("Label/Button LG", F.bodySemi, 15, { lh: 100 });
  text("Label/Button MD", F.bodySemi, 14, { lh: 100 });
  text("Label/Button SM", F.bodySemi, 13, { lh: 100 });
  text("Label/Caption", F.bodyMed, 11, { lh: 130 });
  text("Label/Overline", F.bodySemi, 11, { lh: 130, ls: 14, caps: true });

  // Numeric — JetBrains Mono
  text("Mono/XL", F.monoSemi, 34, { lh: 110, ls: -2 });
  text("Mono/LG", F.monoSemi, 26, { lh: 115, ls: -2 });
  text("Mono/MD", F.monoSemi, 22, { lh: 120 });
  text("Mono/SM", F.monoMed, 17, { lh: 130 });
  text("Mono/XS", F.mono, 13, { lh: 135 });
  text("Mono/2XS", F.mono, 11, { lh: 135 });
  text("Mono/Tag", F.monoMed, 11, { lh: 120, ls: 12, caps: true });

  // ═════════════════════════════════════════════
  // EFFECT STYLES
  // ═════════════════════════════════════════════
  function effect(name, effects) {
    const s = figma.createEffectStyle();
    s.name = name;
    s.effects = effects;
    return s;
  }
  const shadow = (a, x, y, blur, spread) => ({
    type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a },
    offset: { x, y }, radius: blur, spread: spread || 0,
    visible: true, blendMode: "NORMAL",
  });
  effect("Elevation/SM", [shadow(0.4, 0, 1, 2)]);
  effect("Elevation/MD", [shadow(0.6, 0, 8, 20, -6)]);
  effect("Elevation/LG", [shadow(0.75, 0, 20, 40, -10)]);
  effect("Elevation/Modal", [shadow(0.8, 0, 50, 110, -40)]);
  effect("Glow/Accent", [{
    type: "DROP_SHADOW", color: { ...hex("#6366F1"), a: 0.55 },
    offset: { x: 0, y: 6 }, radius: 18, spread: -6, visible: true, blendMode: "NORMAL",
  }]);
  effect("Glow/Accent LG", [{
    type: "DROP_SHADOW", color: { ...hex("#6366F1"), a: 0.6 },
    offset: { x: 0, y: 14 }, radius: 34, spread: -10, visible: true, blendMode: "NORMAL",
  }]);
  effect("Focus/Ring", [{
    type: "DROP_SHADOW", color: { ...hex("#6366F1"), a: 0.18 },
    offset: { x: 0, y: 0 }, radius: 0, spread: 4, visible: true, blendMode: "NORMAL",
  }]);
  effect("Blur/Backdrop", [{ type: "BACKGROUND_BLUR", radius: 18, visible: true }]);

  // ═════════════════════════════════════════════
  // STYLE GUIDE PAGE
  // ═════════════════════════════════════════════
  const guide = figma.root.children.find((p) => p.name === "🎨 Foundations") || figma.currentPage;
  figma.currentPage = guide;

  const frame = figma.createFrame();
  frame.name = "Style Guide";
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "FIXED";
  frame.resize(1240, 100);
  frame.paddingLeft = 64; frame.paddingRight = 64;
  frame.paddingTop = 64; frame.paddingBottom = 64;
  frame.itemSpacing = 48;
  frame.cornerRadius = 24;
  frame.fills = [solid("#0A0C10")];
  guide.appendChild(frame);

  function sectionTitle(label) {
    const t = figma.createText();
    t.fontName = F.disp;
    t.fontSize = 26;
    t.characters = label;
    t.fills = [solid("#F2F4F8")];
    frame.appendChild(t);
    return t;
  }
  function swatchRow(entries, sw, sh) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL";
    row.primaryAxisSizingMode = "AUTO";
    row.counterAxisSizingMode = "AUTO";
    row.itemSpacing = 12;
    row.fills = [];
    for (const [label, h] of entries) {
      const cell = figma.createFrame();
      cell.layoutMode = "VERTICAL";
      cell.primaryAxisSizingMode = "AUTO";
      cell.counterAxisSizingMode = "AUTO";
      cell.itemSpacing = 8;
      cell.fills = [];
      const chip = figma.createRectangle();
      chip.resize(sw || 88, sh || 64);
      chip.cornerRadius = 10;
      chip.fills = [solid(h)];
      chip.strokes = [solid("#FFFFFF", 0.1)];
      chip.strokeWeight = 1;
      cell.appendChild(chip);
      const t = figma.createText();
      t.fontName = F.mono;
      t.fontSize = 11;
      t.characters = `${label}\n${h}`;
      t.fills = [solid("#9AA4B2")];
      cell.appendChild(t);
      row.appendChild(cell);
    }
    frame.appendChild(row);
    return row;
  }

  sectionTitle("Color · Accent ramp");
  swatchRow(Object.entries(ramp).map(([s, h]) => [s, h]));
  sectionTitle("Neutrals · Dark");
  swatchRow(Object.entries(dark).map(([n, h]) => [n, h]));
  sectionTitle("Neutrals · Light");
  swatchRow(Object.entries(light).map(([n, h]) => [n, h]));
  sectionTitle("Semantic");
  swatchRow([["Success", "#10B981"], ["Danger", "#F43F5E"], ["Warning", "#F59E0B"], ["Info", "#0EA5E9"], ["Violet", "#8B5CF6"], ["Bitcoin", "#F7931A"]]);

  sectionTitle("Typography");
  const specs = [
    [F.disp, 56, "Trade smarter.", "#F2F4F8"],
    [F.disp, 32, "Portfolio overview", "#F2F4F8"],
    [F.body, 16, "Track assets across every chain in real time, with portfolio analytics that update the moment the market moves.", "#C8CFDA"],
    [F.bodySemi, 11, "MARKET CAPITALIZATION", "#9AA4B2"],
    [F.monoMed, 22, "$94,210.50  +2.41%  0x7f3a…b29c", "#F2F4F8"],
  ];
  for (const [font, size, chars, color] of specs) {
    const t = figma.createText();
    t.fontName = font;
    t.fontSize = size;
    t.characters = chars;
    t.fills = [solid(color)];
    frame.appendChild(t);
    t.layoutSizingHorizontal = "FILL";
  }

  figma.viewport.scrollAndZoomIntoView([frame]);
  figma.closePlugin("✅ Helix foundation: paint styles, 28 text styles, effect styles, style guide");
})();
