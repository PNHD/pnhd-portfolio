// ============================================================
// HELIX CRYPTO UI KIT — Part 2b: Extra Components
// Run AFTER 02-components.js
// Cards · Feedback · Progress · Charts · Table rows
// ============================================================

(async () => {
  const hex = (h) => ({
    r: parseInt(h.slice(1, 3), 16) / 255,
    g: parseInt(h.slice(3, 5), 16) / 255,
    b: parseInt(h.slice(5, 7), 16) / 255,
  });
  const solid = (h, o) => ({ type: "SOLID", color: hex(h), opacity: o === undefined ? 1 : o });
  const grad135 = (c1, c2) => ({
    type: "GRADIENT_LINEAR",
    gradientTransform: [[0.7071, 0.7071, 0], [-0.7071, 0.7071, 0.2929]],
    gradientStops: [
      { position: 0, color: { ...hex(c1), a: 1 } },
      { position: 1, color: { ...hex(c2), a: 1 } },
    ],
  });
  const ACCENT_GRAD = grad135("#6366F1", "#8B5CF6");

  async function pickFont(family, styles) {
    for (const style of styles) {
      try { await figma.loadFontAsync({ family, style }); return { family, style }; } catch (e) {}
    }
    throw new Error(`Font missing: ${family}`);
  }
  const F = {
    disp:     await pickFont("Space Grotesk", ["SemiBold", "Semi Bold", "Medium"]),
    body:     await pickFont("Plus Jakarta Sans", ["Regular"]),
    bodyMed:  await pickFont("Plus Jakarta Sans", ["Medium", "Regular"]),
    bodySemi: await pickFont("Plus Jakarta Sans", ["SemiBold", "Semi Bold", "Bold"]),
    bodyBold: await pickFont("Plus Jakarta Sans", ["Bold"]),
    mono:     await pickFont("JetBrains Mono", ["Regular"]),
    monoMed:  await pickFont("JetBrains Mono", ["Medium", "Regular"]),
    monoSemi: await pickFont("JetBrains Mono", ["SemiBold", "Semi Bold", "Bold"]),
  };

  const txt = (chars, font, size, colorHex, opacity) => {
    const t = figma.createText();
    t.fontName = font;
    t.fontSize = size;
    t.characters = chars;
    t.fills = [solid(colorHex, opacity)];
    return t;
  };
  const vec = (w, h, data, strokeHex, weight) => {
    const v = figma.createVector();
    v.resize(w, h);
    v.vectorPaths = [{ windingRule: "NONE", data }];
    v.strokes = [solid(strokeHex)];
    v.strokeWeight = weight || 2;
    v.strokeCap = "ROUND";
    v.strokeJoin = "ROUND";
    v.fills = [];
    return v;
  };
  const autol = (n, dir, opts) => {
    const o = opts || {};
    n.layoutMode = dir;
    n.primaryAxisSizingMode = o.pw || "AUTO";
    n.counterAxisSizingMode = o.ch || "AUTO";
    n.primaryAxisAlignItems = o.main || "CENTER";
    n.counterAxisAlignItems = o.cross || "CENTER";
    n.itemSpacing = o.gap || 0;
    n.paddingLeft = o.px !== undefined ? o.px : (o.p || 0);
    n.paddingRight = o.px !== undefined ? o.px : (o.p || 0);
    n.paddingTop = o.py !== undefined ? o.py : (o.p || 0);
    n.paddingBottom = o.py !== undefined ? o.py : (o.p || 0);
    return n;
  };
  const cardBase = (n, w) => {
    n.cornerRadius = 20;
    n.fills = [solid("#12151C")];
    n.strokes = [solid("#FFFFFF", 0.07)];
    n.strokeWeight = 1;
    if (w) {
      // vertical layout: width = counter axis (fixed), height hugs content
      n.counterAxisSizingMode = "FIXED";
      n.resize(w, n.height);
    }
    return n;
  };
  const sparkPath = (pts, w, h) => {
    // pts: array of 0..10 values → smooth-ish polyline path scaled to w×h
    const mn = Math.min(...pts), mx = Math.max(...pts), rg = (mx - mn) || 1;
    const step = w / (pts.length - 1);
    let d = "";
    pts.forEach((v, i) => {
      const x = (i * step).toFixed(1);
      const y = (h - ((v - mn) / rg) * (h - 4) - 2).toFixed(1);
      d += (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    });
    return d;
  };

  function ensurePage(name, matcher) {
    const found = figma.root.children.find((p) => p.name === name || (matcher && matcher.test(p.name)));
    if (found) return found;
    const spare = figma.root.children.find((p) => /^Page \d+$/.test(p.name) && p.children.length === 0);
    if (spare) { spare.name = name; return spare; }
    try { const p = figma.createPage(); p.name = name; return p; }
    catch (e) { return figma.currentPage; }
  }
  // Real Phosphor icon from HELIX_ICONS (icons-svg.js). Falls back to a dot
  // if the icon pack was not pasted/bundled first.
  const icon = (key, size, colorHex, opacity) => {
    const svg = (typeof HELIX_ICONS !== "undefined" && HELIX_ICONS[key]) ? HELIX_ICONS[key] : null;
    if (!svg) {
      const e = figma.createEllipse();
      e.resize(size, size);
      e.fills = [solid(colorHex, opacity)];
      return e;
    }
    const node = figma.createNodeFromSvg(svg.replace("<svg ", `<svg width="${size}" height="${size}" `));
    node.name = "icon/" + key;
    const paint = [solid(colorHex, opacity)];
    for (const child of node.findAll(() => true)) {
      if ("fills" in child && Array.isArray(child.fills) && child.fills.length) child.fills = paint;
      if ("strokes" in child && Array.isArray(child.strokes) && child.strokes.length) child.strokes = paint;
    }
    node.fills = [];
    return node;
  };

  const page = ensurePage("🧩 Components", /Components/);
  figma.currentPage = page;
  let yOffset = 0; // continue below whatever 02-components.js created
  for (const ch of page.children) yOffset = Math.max(yOffset, ch.y + ch.height + 120);
  const placeSet = (set, name) => {
    set.name = name;
    const tag = txt(name.toUpperCase(), F.monoSemi, 14, "#6366F1");
    tag.name = "label/" + name;
    page.appendChild(tag);
    tag.x = 0; tag.y = yOffset;
    yOffset += 34;
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 96;
  };
  // combineAsVariants does NOT auto-arrange — lay variants out in a grid first
  const gridify = (comps, cols, gx, gy) => {
    let x = 0, y = 0, rowH = 0;
    comps.forEach((n, i) => {
      if (i && i % cols === 0) { x = 0; y += rowH + (gy || 32); rowH = 0; }
      n.x = x; n.y = y;
      x += n.width + (gx || 32);
      rowH = Math.max(rowH, n.height);
    });
    return comps;
  };

  // ═════════════════════════════════════════════
  // STAT CARD — icon tile + delta badge + value
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Stat Card";
    autol(c, "VERTICAL", { p: 24, gap: 5, cross: "MIN" });
    cardBase(c, 300);

    const top = autol(figma.createFrame(), "HORIZONTAL", { main: "SPACE_BETWEEN", cross: "MIN" });
    top.fills = [];
    const tile = autol(figma.createFrame(), "HORIZONTAL", {});
    tile.name = "Icon Tile";
    tile.resize(42, 42);
    tile.primaryAxisSizingMode = "FIXED";
    tile.counterAxisSizingMode = "FIXED";
    tile.cornerRadius = 12;
    tile.fills = [solid("#6366F1", 0.14)];
    tile.appendChild(icon("chart-bar-fill", 22, "#6366F1"));
    top.appendChild(tile);
    const delta = autol(figma.createFrame(), "HORIZONTAL", { px: 8, py: 3, gap: 4 });
    delta.name = "Delta";
    delta.cornerRadius = 7;
    delta.fills = [solid("#34D399", 0.12)];
    delta.appendChild(vec(10, 10, "M 0 10 L 10 0 M 4 0 L 10 0 L 10 6", "#34D399", 1.8));
    delta.appendChild(txt("8.2%", F.monoSemi, 11.5, "#34D399"));
    top.appendChild(delta);
    c.appendChild(top);
    top.layoutSizingHorizontal = "FILL";

    const spacer = figma.createFrame();
    spacer.resize(10, 8);
    spacer.fills = [];
    c.appendChild(spacer);
    c.appendChild(txt("24h Volume", F.body, 12.5, "#9AA4B2"));
    c.appendChild(txt("$2.41B", F.disp, 30, "#F2F4F8"));
    placeSet(c, "Stat Card");
  }

  // ═════════════════════════════════════════════
  // COIN CARD — coin id + price + sparkline (Up/Down)
  // ═════════════════════════════════════════════
  {
    const comps = [];
    for (const dir of ["Up", "Down"]) {
      const up = dir === "Up";
      const col = up ? "#34D399" : "#FB7185";
      const c = figma.createComponent();
      c.name = `Trend=${dir}`;
      autol(c, "VERTICAL", { p: 24, gap: 12, cross: "MIN" });
      cardBase(c, 300);

      const head = autol(figma.createFrame(), "HORIZONTAL", { gap: 11, main: "MIN" });
      head.fills = [];
      const coin = figma.createEllipse();
      coin.name = "Coin";
      coin.resize(38, 38);
      coin.fills = [solid(up ? "#F7931A" : "#14F195")];
      head.appendChild(coin);
      const id = autol(figma.createFrame(), "VERTICAL", { gap: 1, cross: "MIN" });
      id.fills = [];
      id.appendChild(txt(up ? "Bitcoin" : "Solana", F.bodySemi, 14.5, "#F2F4F8"));
      id.appendChild(txt(up ? "BTC" : "SOL", F.mono, 12, "#5E6776"));
      head.appendChild(id);
      id.layoutSizingHorizontal = "FILL";
      head.appendChild(txt(up ? "+2.41%" : "-3.22%", F.monoSemi, 12, col));
      c.appendChild(head);
      head.layoutSizingHorizontal = "FILL";

      c.appendChild(txt(up ? "$94,210.50" : "$236.40", F.monoSemi, 22, "#F2F4F8"));

      const spark = vec(252, 40, sparkPath(up ? [3, 4, 5, 4, 6, 7, 6, 8, 9] : [9, 8, 8, 6, 7, 5, 4, 4, 3], 252, 40), col, 2);
      spark.name = "Sparkline";
      c.appendChild(spark);
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 2), page), "Coin Card");
  }

  // ═════════════════════════════════════════════
  // WALLET CARD — gradient balance card
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Wallet Card";
    autol(c, "VERTICAL", { p: 24, gap: 6, cross: "MIN" });
    c.primaryAxisSizingMode = "AUTO";
    c.counterAxisSizingMode = "FIXED";
    c.resize(340, 10);
    c.cornerRadius = 20;
    c.fills = [ACCENT_GRAD];
    c.clipsContent = true;

    const deco = figma.createEllipse();
    deco.name = "Deco";
    deco.resize(140, 140);
    deco.fills = [solid("#FFFFFF", 0.12)];
    c.appendChild(deco);
    deco.layoutPositioning = "ABSOLUTE";
    deco.x = 340 - 110; deco.y = -30;

    const head = autol(figma.createFrame(), "HORIZONTAL", { main: "SPACE_BETWEEN" });
    head.fills = [];
    head.appendChild(txt("Main Wallet", F.bodySemi, 12.5, "#FFFFFF", 0.85));
    head.appendChild(icon("cube-fill", 20, "#FFFFFF", 0.85));
    c.appendChild(head);
    head.layoutSizingHorizontal = "FILL";

    const gap = figma.createFrame();
    gap.resize(10, 14);
    gap.fills = [];
    c.appendChild(gap);
    c.appendChild(txt("$128,540.20", F.disp, 28, "#FFFFFF"));
    const gap2 = figma.createFrame();
    gap2.resize(10, 12);
    gap2.fills = [];
    c.appendChild(gap2);

    const foot = autol(figma.createFrame(), "HORIZONTAL", { main: "SPACE_BETWEEN" });
    foot.fills = [];
    foot.appendChild(txt("0x7f3a…b29c", F.mono, 12.5, "#FFFFFF", 0.78));
    foot.appendChild(icon("copy", 15, "#FFFFFF", 0.78));
    c.appendChild(foot);
    foot.layoutSizingHorizontal = "FILL";
    placeSet(c, "Wallet Card");
  }

  // ═════════════════════════════════════════════
  // ALERT — Success / Warning / Danger / Info
  // ═════════════════════════════════════════════
  {
    const tones = {
      Success: { bg: solid("#10B981", 0.09), bd: solid("#10B981", 0.22), icon: "#34D399", ik: "check-circle-fill", tc: "#D1FAE5", title: "Transaction confirmed", body: "0.5 ETH sent successfully." },
      Warning: { bg: solid("#F59E0B", 0.09), bd: solid("#F59E0B", 0.22), icon: "#FBBF24", ik: "warning-fill",      tc: "#FEF3C7", title: "Network congestion",     body: "Gas fees are elevated." },
      Danger:  { bg: solid("#F43F5E", 0.09), bd: solid("#F43F5E", 0.22), icon: "#FB7185", ik: "x-circle-fill",     tc: "#FECDD3", title: "Swap failed",            body: "Slippage tolerance exceeded." },
      Info:    { bg: solid("#6366F1", 0.09), bd: solid("#6366F1", 0.22), icon: "#A5ABFC", ik: "info-fill",         tc: "#E0E3FF", title: "New staking pool",       body: "Earn up to 6.4% APY." },
    };
    const comps = [];
    for (const [tn, tc] of Object.entries(tones)) {
      const c = figma.createComponent();
      c.name = `Tone=${tn}`;
      autol(c, "HORIZONTAL", { p: 14, gap: 11, cross: "MIN", main: "MIN" });
      c.counterAxisSizingMode = "AUTO";
      c.primaryAxisSizingMode = "FIXED";
      c.resize(340, 10);
      c.cornerRadius = 13;
      c.fills = [tc.bg];
      c.strokes = [tc.bd];
      c.strokeWeight = 1;
      c.appendChild(icon(tc.ik, 20, tc.icon));
      const col = autol(figma.createFrame(), "VERTICAL", { gap: 2, cross: "MIN" });
      col.fills = [];
      col.appendChild(txt(tc.title, F.bodySemi, 13, tc.tc));
      col.appendChild(txt(tc.body, F.body, 12, "#9AA4B2"));
      c.appendChild(col);
      col.layoutSizingHorizontal = "FILL";
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 2), page), "Alert");
  }

  // ═════════════════════════════════════════════
  // TOAST — elevated notification
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Toast";
    autol(c, "HORIZONTAL", { px: 16, py: 14, gap: 12, main: "MIN" });
    c.counterAxisSizingMode = "AUTO";
    c.primaryAxisSizingMode = "FIXED";
    c.resize(340, 10);
    c.cornerRadius = 14;
    c.fills = [solid("#1E232E")];
    c.strokes = [solid("#FFFFFF", 0.1)];
    c.strokeWeight = 1;
    c.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.6 }, offset: { x: 0, y: 16 }, radius: 36, spread: -12, visible: true, blendMode: "NORMAL" }];
    const tile = autol(figma.createFrame(), "HORIZONTAL", {});
    tile.name = "Icon Tile";
    tile.resize(36, 36);
    tile.primaryAxisSizingMode = "FIXED";
    tile.counterAxisSizingMode = "FIXED";
    tile.cornerRadius = 10;
    tile.fills = [solid("#34D399", 0.14)];
    tile.appendChild(icon("arrow-down-left-fill", 18, "#34D399"));
    c.appendChild(tile);
    const col = autol(figma.createFrame(), "VERTICAL", { gap: 2, cross: "MIN" });
    col.fills = [];
    col.appendChild(txt("Received 1,200 USDC", F.bodySemi, 13, "#F2F4F8"));
    col.appendChild(txt("Just now · from 0x9f…21", F.body, 11.5, "#5E6776"));
    c.appendChild(col);
    col.layoutSizingHorizontal = "FILL";
    const close = icon("x-bold", 12, "#5E6776");
    close.name = "Close";
    c.appendChild(close);
    placeSet(c, "Toast");
  }

  // ═════════════════════════════════════════════
  // TOOLTIP
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Tooltip";
    autol(c, "VERTICAL", { cross: "CENTER" });
    c.fills = [];
    const bubble = autol(figma.createFrame(), "HORIZONTAL", { px: 12, py: 8 });
    bubble.name = "Bubble";
    bubble.cornerRadius = 10;
    bubble.fills = [solid("#1E232E")];
    bubble.strokes = [solid("#FFFFFF", 0.1)];
    bubble.strokeWeight = 1;
    bubble.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.6 }, offset: { x: 0, y: 10 }, radius: 24, spread: -8, visible: true, blendMode: "NORMAL" }];
    bubble.appendChild(txt("Copy address", F.body, 12, "#C8CFDA"));
    c.appendChild(bubble);
    // downward arrow as a filled vector (API rotation pivots on origin, not center)
    const tip = figma.createVector();
    tip.name = "Arrow";
    tip.resize(12, 6);
    tip.vectorPaths = [{ windingRule: "NONZERO", data: "M 0 0 L 12 0 L 6 6 Z" }];
    tip.strokes = [];
    tip.fills = [solid("#1E232E")];
    c.appendChild(tip);
    placeSet(c, "Tooltip");
  }

  // ═════════════════════════════════════════════
  // PROGRESS BAR
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Progress Bar";
    autol(c, "VERTICAL", { gap: 9, cross: "MIN" });
    c.counterAxisSizingMode = "FIXED";
    c.resize(280, 10);
    c.fills = [];
    const head = autol(figma.createFrame(), "HORIZONTAL", { main: "SPACE_BETWEEN" });
    head.fills = [];
    head.appendChild(txt("Staking progress", F.body, 12.5, "#9AA4B2"));
    head.appendChild(txt("68%", F.monoSemi, 12, "#C8CFDA"));
    c.appendChild(head);
    head.layoutSizingHorizontal = "FILL";
    const track = figma.createFrame();
    track.name = "Track";
    track.resize(280, 8);
    track.cornerRadius = 999;
    track.fills = [solid("#FFFFFF", 0.08)];
    track.clipsContent = true;
    const fill = figma.createRectangle();
    fill.name = "Fill";
    fill.resize(280 * 0.68, 8);
    fill.cornerRadius = 999;
    fill.fills = [ACCENT_GRAD];
    track.appendChild(fill);
    c.appendChild(track);
    track.layoutSizingHorizontal = "FILL";
    placeSet(c, "Progress Bar");
  }

  // ═════════════════════════════════════════════
  // PROGRESS CIRCLE — 72%
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Progress Circle";
    autol(c, "HORIZONTAL", {});
    c.resize(88, 88);
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.fills = [];
    const track = figma.createEllipse();
    track.name = "Track";
    track.resize(88, 88);
    track.arcData = { startingAngle: 0, endingAngle: Math.PI * 2, innerRadius: 0.82 };
    track.fills = [solid("#FFFFFF", 0.08)];
    c.appendChild(track);
    track.layoutPositioning = "ABSOLUTE";
    track.x = 0; track.y = 0;
    const arc = figma.createEllipse();
    arc.name = "Fill";
    arc.resize(88, 88);
    arc.arcData = { startingAngle: -Math.PI / 2, endingAngle: -Math.PI / 2 + Math.PI * 2 * 0.72, innerRadius: 0.82 };
    arc.fills = [ACCENT_GRAD];
    c.appendChild(arc);
    arc.layoutPositioning = "ABSOLUTE";
    arc.x = 0; arc.y = 0;
    const centerCol = autol(figma.createFrame(), "VERTICAL", {});
    centerCol.fills = [];
    centerCol.appendChild(txt("72%", F.disp, 19, "#F2F4F8"));
    centerCol.appendChild(txt("filled", F.body, 9.5, "#5E6776"));
    c.appendChild(centerCol);
    placeSet(c, "Progress Circle");
  }

  // ═════════════════════════════════════════════
  // SLIDER
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Slider";
    autol(c, "HORIZONTAL", { py: 6 });
    c.counterAxisSizingMode = "AUTO";
    c.primaryAxisSizingMode = "FIXED";
    c.resize(280, 18);
    c.fills = [];
    const track = figma.createFrame();
    track.name = "Track";
    track.resize(280, 6);
    track.cornerRadius = 999;
    track.fills = [solid("#FFFFFF", 0.08)];
    track.clipsContent = true;
    const fill = figma.createRectangle();
    fill.name = "Fill";
    fill.resize(280 * 0.42, 6);
    fill.cornerRadius = 999;
    fill.fills = [solid("#6366F1")];
    track.appendChild(fill);
    c.appendChild(track);
    track.layoutSizingHorizontal = "FILL";
    const knob = figma.createEllipse();
    knob.name = "Knob";
    knob.resize(18, 18);
    knob.fills = [solid("#FFFFFF")];
    knob.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.4 }, offset: { x: 0, y: 2 }, radius: 6, visible: true, blendMode: "NORMAL" }];
    c.appendChild(knob);
    knob.layoutPositioning = "ABSOLUTE";
    knob.x = 280 * 0.42 - 9; knob.y = 0;
    placeSet(c, "Slider");
  }

  // ═════════════════════════════════════════════
  // STEPPER — done / current / upcoming
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Stepper";
    autol(c, "HORIZONTAL", { gap: 0 });
    c.counterAxisSizingMode = "AUTO";
    c.primaryAxisSizingMode = "FIXED";
    c.resize(280, 26);
    c.fills = [];
    const step = (kind, label) => {
      const s = autol(figma.createFrame(), "HORIZONTAL", {});
      s.resize(26, 26);
      s.primaryAxisSizingMode = "FIXED";
      s.counterAxisSizingMode = "FIXED";
      s.cornerRadius = 999;
      if (kind === "done") {
        s.fills = [ACCENT_GRAD];
        s.appendChild(vec(11, 9, "M 1 5 L 4 8 L 10 1", "#FFFFFF", 2));
      } else if (kind === "current") {
        s.fills = [solid("#6366F1")];
        s.effects = [{ type: "DROP_SHADOW", color: { ...hex("#6366F1"), a: 0.22 }, offset: { x: 0, y: 0 }, radius: 0, spread: 4, visible: true, blendMode: "NORMAL" }];
        s.appendChild(txt(label, F.bodyBold, 12, "#FFFFFF"));
      } else {
        s.fills = [solid("#FFFFFF", 0.06)];
        s.strokes = [solid("#FFFFFF", 0.14)];
        s.strokeWeight = 1;
        s.appendChild(txt(label, F.bodyBold, 12, "#5E6776"));
      }
      return s;
    };
    const line = (active) => {
      const l = figma.createRectangle();
      l.resize(88, 2);
      l.fills = [active ? solid("#6366F1") : solid("#FFFFFF", 0.1)];
      return l;
    };
    c.appendChild(step("done", "1"));
    c.appendChild(line(true));
    c.appendChild(step("current", "2"));
    c.appendChild(line(false));
    c.appendChild(step("next", "3"));
    placeSet(c, "Stepper");
  }

  // ═════════════════════════════════════════════
  // SKELETON
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Skeleton";
    autol(c, "VERTICAL", { gap: 9, cross: "MIN" });
    c.counterAxisSizingMode = "FIXED";
    c.resize(280, 10);
    c.fills = [];
    for (const wPct of [0.7, 1, 0.45]) {
      const bar = figma.createRectangle();
      bar.resize(280 * wPct, 11);
      bar.cornerRadius = 6;
      bar.fills = [solid("#FFFFFF", 0.09)];
      c.appendChild(bar);
    }
    placeSet(c, "Skeleton");
  }

  // ═════════════════════════════════════════════
  // DONUT CHART — allocation (BTC/ETH/SOL/Other)
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Donut Chart";
    autol(c, "HORIZONTAL", { gap: 26 });
    c.fills = [];
    const chart = autol(figma.createFrame(), "HORIZONTAL", {});
    chart.name = "Chart";
    chart.resize(128, 128);
    chart.primaryAxisSizingMode = "FIXED";
    chart.counterAxisSizingMode = "FIXED";
    chart.fills = [];
    const segs = [
      ["#F7931A", 0.45], ["#6366F1", 0.30], ["#14B8A6", 0.15], ["#3F4656", 0.10],
    ];
    let angle = -Math.PI / 2;
    for (const [col, frac] of segs) {
      const arc = figma.createEllipse();
      arc.name = `Segment ${col}`;
      arc.resize(128, 128);
      const sweep = Math.PI * 2 * frac;
      arc.arcData = { startingAngle: angle, endingAngle: angle + sweep - 0.03, innerRadius: 0.72 };
      arc.fills = [solid(col)];
      chart.appendChild(arc);
      arc.layoutPositioning = "ABSOLUTE";
      arc.x = 0; arc.y = 0;
      angle += sweep;
    }
    const centerCol = autol(figma.createFrame(), "VERTICAL", {});
    centerCol.fills = [];
    centerCol.appendChild(txt("Total", F.body, 10.5, "#5E6776"));
    centerCol.appendChild(txt("$128K", F.disp, 17, "#F2F4F8"));
    chart.appendChild(centerCol);
    c.appendChild(chart);

    const legend = autol(figma.createFrame(), "VERTICAL", { gap: 13, cross: "MIN" });
    legend.name = "Legend";
    legend.fills = [];
    const rows = [["#F7931A", "Bitcoin", "45%"], ["#6366F1", "Ethereum", "30%"], ["#14B8A6", "Solana", "15%"], ["#3F4656", "Other", "10%"]];
    for (const [col, label, pct] of rows) {
      const r = autol(figma.createFrame(), "HORIZONTAL", { gap: 9 });
      r.fills = [];
      const sw = figma.createRectangle();
      sw.resize(10, 10);
      sw.cornerRadius = 3;
      sw.fills = [solid(col)];
      r.appendChild(sw);
      const lb = txt(label, F.body, 13, "#C8CFDA");
      r.appendChild(lb);
      r.appendChild(txt(pct, F.monoSemi, 12.5, "#F2F4F8"));
      legend.appendChild(r);
    }
    c.appendChild(legend);
    placeSet(c, "Donut Chart");
  }

  // ═════════════════════════════════════════════
  // BAR CHART
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Bar Chart";
    autol(c, "HORIZONTAL", { gap: 8, cross: "MAX" });
    c.counterAxisSizingMode = "FIXED";
    c.primaryAxisSizingMode = "FIXED";
    c.resize(280, 64);
    c.fills = [];
    const bars = [[0.4, 0.3], [0.62, 0.4], [0.48, 0.35], [0.8, 1], [0.7, 0.45], [0.9, 0.5], [1, 1]];
    for (const [hPct, hot] of bars) {
      const b = figma.createRectangle();
      b.resize(32, 64 * hPct);
      b.topLeftRadius = 5; b.topRightRadius = 5;
      b.fills = hot === 1 ? [grad135("#6366F1", "#8B5CF6")] : [solid("#6366F1", 0.25 + hot * 0.3)];
      c.appendChild(b);
      b.layoutSizingHorizontal = "FILL";
    }
    placeSet(c, "Bar Chart");
  }

  // ═════════════════════════════════════════════
  // MARKETS TABLE ROW — Trend Up / Down
  // ═════════════════════════════════════════════
  {
    const comps = [];
    const rows = {
      Up:   { rank: "1", name: "Bitcoin",  sym: "BTC", price: "$94,210.50", chg: "+2.41%", col: "#34D399", coin: "#F7931A", pts: [3, 5, 4, 6, 7, 6, 8, 9] },
      Down: { rank: "3", name: "Solana",   sym: "SOL", price: "$236.40",    chg: "-3.22%", col: "#FB7185", coin: "#14F195", pts: [9, 8, 8, 6, 7, 5, 4, 4] },
    };
    for (const [dir, d] of Object.entries(rows)) {
      const c = figma.createComponent();
      c.name = `Trend=${dir}`;
      autol(c, "HORIZONTAL", { px: 8, py: 14, gap: 12, main: "MIN" });
      c.counterAxisSizingMode = "AUTO";
      c.primaryAxisSizingMode = "FIXED";
      c.resize(1080, 10);
      c.fills = [];
      c.strokes = [solid("#FFFFFF", 0.04)];
      c.strokeWeight = 1;
      c.strokeAlign = "INSIDE";
      c.strokeTopWeight = 0; c.strokeLeftWeight = 0; c.strokeRightWeight = 0; c.strokeBottomWeight = 1;

      const rank = txt(d.rank, F.mono, 12.5, "#5E6776");
      rank.textAutoResize = "NONE";
      rank.resize(32, 18);
      c.appendChild(rank);

      const id = autol(figma.createFrame(), "HORIZONTAL", { gap: 11, main: "MIN" });
      id.name = "Asset";
      id.fills = [];
      const coin = figma.createEllipse();
      coin.resize(30, 30);
      coin.fills = [solid(d.coin)];
      id.appendChild(coin);
      const nameCol = autol(figma.createFrame(), "VERTICAL", { gap: 1, cross: "MIN" });
      nameCol.fills = [];
      nameCol.appendChild(txt(d.name, F.bodySemi, 13.5, "#F2F4F8"));
      nameCol.appendChild(txt(d.sym, F.mono, 11, "#5E6776"));
      id.appendChild(nameCol);
      c.appendChild(id);
      id.layoutSizingHorizontal = "FILL";

      const price = txt(d.price, F.monoSemi, 13.5, "#F2F4F8");
      price.textAlignHorizontal = "RIGHT";
      price.textAutoResize = "NONE";
      price.resize(140, price.height);
      c.appendChild(price);

      const chg = txt(d.chg, F.monoSemi, 12.5, d.col);
      chg.textAlignHorizontal = "RIGHT";
      chg.textAutoResize = "NONE";
      chg.resize(90, chg.height);
      c.appendChild(chg);

      const spark = vec(84, 26, sparkPath(d.pts, 84, 26), d.col, 1.6);
      spark.name = "Sparkline";
      c.appendChild(spark);

      const trade = autol(figma.createFrame(), "HORIZONTAL", { px: 14, py: 7 });
      trade.name = "Trade";
      trade.cornerRadius = 9;
      trade.fills = [solid("#6366F1", 0.12)];
      trade.strokes = [solid("#6366F1", 0.25)];
      trade.strokeWeight = 1;
      trade.appendChild(txt("Trade", F.bodySemi, 12.5, "#A5ABFC"));
      c.appendChild(trade);
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 1), page), "Markets Table Row");
  }

  // ═════════════════════════════════════════════
  // ORDER BOOK ROW — Ask / Bid with depth bar
  // ═════════════════════════════════════════════
  {
    const comps = [];
    for (const side of ["Ask", "Bid"]) {
      const ask = side === "Ask";
      const col = ask ? "#FB7185" : "#34D399";
      const c = figma.createComponent();
      c.name = `Side=${side}`;
      autol(c, "HORIZONTAL", { px: 0, py: 3.5, gap: 6, main: "MIN" });
      c.counterAxisSizingMode = "AUTO";
      c.primaryAxisSizingMode = "FIXED";
      c.resize(260, 10);
      c.fills = [];
      c.clipsContent = false;

      const depth = figma.createRectangle();
      depth.name = "Depth";
      depth.resize(260 * 0.54, 20);
      depth.fills = [solid(col, 0.08)];
      c.appendChild(depth);
      depth.layoutPositioning = "ABSOLUTE";
      depth.x = 260 - 260 * 0.54; depth.y = 0;

      const price = txt(ask ? "94,265.10" : "94,210.50", F.mono, 11.5, col);
      c.appendChild(price);
      price.layoutSizingHorizontal = "FILL";
      const amt = txt(ask ? "0.842" : "2.640", F.mono, 11.5, "#9AA4B2");
      amt.textAlignHorizontal = "RIGHT";
      amt.textAutoResize = "NONE";
      amt.resize(70, amt.height);
      c.appendChild(amt);
      const tot = txt(ask ? "79,3" : "248", F.mono, 11.5, "#5E6776");
      tot.textAlignHorizontal = "RIGHT";
      tot.textAutoResize = "NONE";
      tot.resize(60, tot.height);
      c.appendChild(tot);
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 1), page), "Order Book Row");
  }

  figma.viewport.scrollAndZoomIntoView(page.children);
  figma.closePlugin("✅ Helix extra components: Stat Card, Coin Card, Wallet Card, Alert, Toast, Tooltip, Progress ×2, Slider, Stepper, Skeleton, Donut, Bar Chart, Table Row, Order Book Row");
})();
