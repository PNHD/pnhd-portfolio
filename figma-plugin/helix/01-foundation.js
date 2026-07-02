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
  // COVER + GETTING STARTED + STYLE GUIDE PAGE
  // ═════════════════════════════════════════════
  function ensurePage(name, matcher) {
    const found = figma.root.children.find((p) => p.name === name || (matcher && matcher.test(p.name)));
    if (found) return found;
    const spare = figma.root.children.find((p) => /^Page \d+$/.test(p.name) && p.children.length === 0);
    if (spare) { spare.name = name; return spare; }
    try { const p = figma.createPage(); p.name = name; return p; }
    catch (e) { return figma.currentPage; }
  }
  // figma.currentPage assignment is unreliable on newer Figma builds —
  // use setCurrentPageAsync and always parent nodes explicitly.
  async function gotoPage(p) {
    if (figma.setCurrentPageAsync) { try { await figma.setCurrentPageAsync(p); return; } catch (e) {} }
    try { figma.currentPage = p; } catch (e) {}
  }
  // Named canvas Section (falls back to nothing on very old Figma)
  const wrapSection = (pageNode, title, nodes) => {
    if (!figma.createSection || !nodes.length) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of nodes) {
      minX = Math.min(minX, n.x); minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + n.width); maxY = Math.max(maxY, n.y + n.height);
    }
    const s = figma.createSection();
    s.name = title;
    pageNode.appendChild(s);
    s.x = minX - 64; s.y = minY - 64;
    s.resizeWithoutConstraints(maxX - minX + 128, maxY - minY + 128);
    for (const n of nodes) {
      const ax = n.x, ay = n.y;
      s.appendChild(n);
      n.x = ax - s.x; n.y = ay - s.y;
    }
    return s;
  };
  // Prefer the dedicated multi-page layout, fall back to shared pages (Free)
  function resolvePage(candidates, createName, createMatcher) {
    for (const t of candidates) {
      const p = figma.root.children.find((pg) => (typeof t === "string" ? pg.name === t : t.test(pg.name)));
      if (p) return p;
    }
    return ensurePage(createName, createMatcher);
  }
  const coverPage = resolvePage(["📕 Cover", /Cover/], "🏠 Cover · Foundations", /Cover|Foundations/);
  const gsPage = figma.root.children.find((p) => /Getting Started/.test(p.name)) || coverPage;
  const guide = figma.root.children.find((p) => /Foundations/.test(p.name) && !/Cover/.test(p.name)) || coverPage;
  await gotoPage(coverPage);

  // ── COVER (1600×1200 — UI8 thumbnail ratio) ──
  {
    const cover = figma.createFrame();
    cover.name = "Cover / UI8 Thumbnail";
    cover.resize(1600, 1200);
    cover.fills = [solid("#0A0C10")];
    cover.clipsContent = true;
    cover.layoutMode = "VERTICAL";
    cover.primaryAxisSizingMode = "FIXED";
    cover.counterAxisSizingMode = "FIXED";
    cover.primaryAxisAlignItems = "CENTER";
    cover.counterAxisAlignItems = "CENTER";
    cover.itemSpacing = 30;
    coverPage.appendChild(cover);
    cover.x = 0; cover.y = 0;

    const glow = (h, x, y, s, a) => {
      const g = figma.createEllipse();
      g.resize(s, s);
      g.fills = [solid(h, a)];
      g.effects = [{ type: "LAYER_BLUR", radius: 220, visible: true }];
      cover.appendChild(g);
      g.layoutPositioning = "ABSOLUTE";
      g.x = x; g.y = y;
      return g;
    };
    glow("#6366F1", 60, -180, 720, 0.5);
    glow("#8B5CF6", 980, 560, 780, 0.45);
    glow("#22D3EE", 620, 900, 520, 0.25);

    const mark = figma.createFrame();
    mark.name = "Logo";
    mark.resize(112, 112);
    mark.cornerRadius = 30;
    mark.fills = [grad135("#6366F1", "#8B5CF6")];
    mark.effects = [{ type: "DROP_SHADOW", color: { ...hex("#6366F1"), a: 0.6 }, offset: { x: 0, y: 20 }, radius: 60, spread: -10, visible: true, blendMode: "NORMAL" }];
    mark.layoutMode = "HORIZONTAL";
    mark.primaryAxisSizingMode = "FIXED";
    mark.counterAxisSizingMode = "FIXED";
    mark.primaryAxisAlignItems = "CENTER";
    mark.counterAxisAlignItems = "CENTER";
    const helixVec = figma.createVector();
    helixVec.resize(52, 56);
    helixVec.vectorPaths = [{ windingRule: "NONE", data: "M 16 2 C 36 15 36 22 16 30 C -4 38 -4 45 16 54 M 36 2 C 16 15 16 22 36 30 C 56 38 56 45 36 54" }];
    helixVec.strokes = [solid("#FFFFFF")];
    helixVec.strokeWeight = 6;
    helixVec.strokeCap = "ROUND";
    helixVec.fills = [];
    mark.appendChild(helixVec);
    cover.appendChild(mark);

    const title = figma.createText();
    title.fontName = F.disp;
    title.fontSize = 148;
    title.letterSpacing = { value: -4, unit: "PERCENT" };
    title.characters = "Helix";
    title.fills = [solid("#F2F4F8")];
    cover.appendChild(title);

    const sub = figma.createText();
    sub.fontName = F.bodyMed;
    sub.fontSize = 30;
    sub.characters = "The complete crypto UI kit";
    sub.fills = [solid("#9AA4B2")];
    cover.appendChild(sub);

    const chips = figma.createFrame();
    chips.layoutMode = "HORIZONTAL";
    chips.primaryAxisSizingMode = "AUTO";
    chips.counterAxisSizingMode = "AUTO";
    chips.itemSpacing = 14;
    chips.fills = [];
    for (const label of ["320+ COMPONENTS", "20 SCREENS", "LIGHT & DARK", "AUTO LAYOUT", "VARIABLES"]) {
      const chip = figma.createFrame();
      chip.layoutMode = "HORIZONTAL";
      chip.primaryAxisSizingMode = "AUTO";
      chip.counterAxisSizingMode = "AUTO";
      chip.paddingLeft = 18; chip.paddingRight = 18;
      chip.paddingTop = 10; chip.paddingBottom = 10;
      chip.cornerRadius = 999;
      chip.fills = [solid("#FFFFFF", 0.05)];
      chip.strokes = [solid("#FFFFFF", 0.12)];
      chip.strokeWeight = 1;
      const ct = figma.createText();
      ct.fontName = F.mono;
      ct.fontSize = 14;
      ct.letterSpacing = { value: 10, unit: "PERCENT" };
      ct.characters = label;
      ct.fills = [solid("#C8CFDA")];
      chip.appendChild(ct);
      chips.appendChild(chip);
    }
    cover.appendChild(chips);

    const foot = figma.createText();
    foot.fontName = F.mono;
    foot.fontSize = 15;
    foot.characters = "v2.0 · Designed by Dang Pham · Available on UI8";
    foot.fills = [solid("#5E6776")];
    cover.appendChild(foot);
    foot.layoutPositioning = "ABSOLUTE";
    foot.x = 560; foot.y = 1130;
  }

  // ── GETTING STARTED ──
  {
    const gs = figma.createFrame();
    gs.name = "Getting Started";
    gs.layoutMode = "VERTICAL";
    gs.primaryAxisSizingMode = "AUTO";
    gs.counterAxisSizingMode = "FIXED";
    gs.resize(900, 100);
    gs.primaryAxisSizingMode = "AUTO"; // resize() can freeze the hug axis
    gs.paddingLeft = 56; gs.paddingRight = 56;
    gs.paddingTop = 56; gs.paddingBottom = 56;
    gs.itemSpacing = 22;
    gs.cornerRadius = 24;
    gs.fills = [solid("#12151C")];
    gs.strokes = [solid("#FFFFFF", 0.07)];
    gs.strokeWeight = 1;
    gsPage.appendChild(gs);
    if (gsPage === coverPage) { gs.x = 1680; gs.y = 0; } else { gs.x = 0; gs.y = 0; }

    const block = (font, size, chars, color) => {
      const t = figma.createText();
      t.fontName = font;
      t.fontSize = size;
      t.characters = chars;
      t.fills = [solid(color)];
      gs.appendChild(t);
      t.layoutSizingHorizontal = "FILL";
      return t;
    };
    block(F.disp, 34, "Getting started", "#F2F4F8");
    block(F.body, 16, "Thanks for picking up Helix — a crypto / Web3 design system for exchanges, wallets, DeFi dashboards and NFT marketplaces.", "#9AA4B2");
    block(F.bodySemi, 18, "1 · Fonts", "#A5ABFC");
    block(F.body, 15, "Space Grotesk (display), Plus Jakarta Sans (body) and JetBrains Mono (numeric) — all free on Google Fonts and available in Figma by default.", "#C8CFDA");
    block(F.bodySemi, 18, "2 · Tokens & modes", "#A5ABFC");
    block(F.body, 15, "Colors, spacing and radii live in Variables (Helix Colors / Spacing / Radius). On Figma Pro, Light & Dark are modes of one collection; on Free, Light ships as a second collection.", "#C8CFDA");
    block(F.bodySemi, 18, "3 · Components", "#A5ABFC");
    block(F.body, 15, "All components are variant-driven and built with Auto Layout. Swap the placeholder circles for real coin logos (cryptocurrency-icons) and avatars, and drop in Phosphor icons from the free community library.", "#C8CFDA");
    block(F.bodySemi, 18, "4 · Screens", "#A5ABFC");
    block(F.body, 15, "The Screens pages contain 20 production screens — 12 desktop (Trading Terminal, Portfolio, Markets, Asset & NFT Detail, Wallet, Send & Receive, Staking, Transactions, Settings, Sign in…) and 8 mobile — assembled from component instances, each inside a named section.", "#C8CFDA");
    block(F.bodySemi, 18, "License", "#A5ABFC");
    block(F.body, 15, "Standard license: unlimited personal & client projects. Extended license: use in end products for sale. © Dang Pham (Wonton Design).", "#C8CFDA");
  }

  const frame = figma.createFrame();
  frame.name = "Style Guide";
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisSizingMode = "AUTO";
  frame.counterAxisSizingMode = "FIXED";
  frame.resize(1240, 100);
  frame.primaryAxisSizingMode = "AUTO"; // resize() can freeze the hug axis
  frame.paddingLeft = 64; frame.paddingRight = 64;
  frame.paddingTop = 64; frame.paddingBottom = 64;
  frame.itemSpacing = 48;
  frame.cornerRadius = 24;
  frame.fills = [solid("#0A0C10")];
  guide.appendChild(frame);
  if (guide === coverPage) { frame.x = 0; frame.y = 1320; } else { frame.x = 0; frame.y = 0; }

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

  const coverFrame = coverPage.children.find((n) => n.name === "Cover / UI8 Thumbnail");
  const gsFrame = gsPage.children.find((n) => n.name === "Getting Started");
  if (coverFrame) wrapSection(coverPage, "🖼 Cover", [coverFrame]);
  if (gsFrame) wrapSection(gsPage, "📘 Getting Started", [gsFrame]);
  wrapSection(guide, "🎨 Style Guide", [frame]);

  // Prototype starter note (own page on the full layout)
  const protoPage = figma.root.children.find((p) => /Prototype/.test(p.name));
  if (protoPage && !protoPage.children.length) {
    const note = figma.createFrame();
    note.name = "How to prototype";
    note.layoutMode = "VERTICAL";
    note.primaryAxisSizingMode = "AUTO";
    note.counterAxisSizingMode = "FIXED";
    note.resize(720, 100);
    note.primaryAxisSizingMode = "AUTO";
    note.paddingLeft = 40; note.paddingRight = 40;
    note.paddingTop = 40; note.paddingBottom = 40;
    note.itemSpacing = 14;
    note.cornerRadius = 20;
    note.fills = [solid("#12151C")];
    note.strokes = [solid("#FFFFFF", 0.07)];
    note.strokeWeight = 1;
    protoPage.appendChild(note);
    const nTitle = figma.createText();
    nTitle.fontName = F.disp; nTitle.fontSize = 24;
    nTitle.characters = "🎯 Prototype playground";
    nTitle.fills = [solid("#F2F4F8")];
    note.appendChild(nTitle);
    const nBody = figma.createText();
    nBody.fontName = F.body; nBody.fontSize = 14;
    nBody.characters = "Duplicate any screens from 🖥 Screens · Web or 📱 Screens · Mobile onto this page and wire them with Figma's Prototype tab (e.g. Onboarding → Portfolio → Coin Detail → Swap). Keeping flows here leaves the master screens untouched.";
    nBody.fills = [solid("#9AA4B2")];
    note.appendChild(nBody);
    nBody.layoutSizingHorizontal = "FILL";
  }

  figma.viewport.scrollAndZoomIntoView([frame]);
  figma.closePlugin("✅ Helix foundation: Cover, Getting Started, styles, style guide, prototype note");
})();
