// ============================================================
// HELIX CRYPTO UI KIT — Part 3: Screens
// Run AFTER 02b-components-extra.js
// Web: Trading Terminal (dark) · Portfolio Dashboard (light) · NFT Market (dark)
// Mobile: Onboarding · Portfolio · Coin Detail · Swap (390×844)
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
    dispBold: await pickFont("Space Grotesk", ["Bold", "SemiBold", "Semi Bold"]),
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
  const frame = (dir, opts) => {
    const o = opts || {};
    const n = figma.createFrame();
    n.layoutMode = dir;
    n.primaryAxisSizingMode = o.pw || "AUTO";
    n.counterAxisSizingMode = o.ch || "AUTO";
    n.primaryAxisAlignItems = o.main || "MIN";
    n.counterAxisAlignItems = o.cross || "CENTER";
    n.itemSpacing = o.gap || 0;
    n.paddingLeft = o.px !== undefined ? o.px : (o.p || 0);
    n.paddingRight = o.px !== undefined ? o.px : (o.p || 0);
    n.paddingTop = o.py !== undefined ? o.py : (o.p || 0);
    n.paddingBottom = o.py !== undefined ? o.py : (o.p || 0);
    n.fills = o.bg ? [o.bg] : [];
    if (o.r) n.cornerRadius = o.r;
    if (o.bd) { n.strokes = [o.bd]; n.strokeWeight = o.bw || 1; }
    if (o.name) n.name = o.name;
    return n;
  };
  const H = (o) => frame("HORIZONTAL", { cross: "CENTER", ...(o || {}) });
  const V = (o) => frame("VERTICAL", { cross: "MIN", ...(o || {}) });
  const fill = (node) => { node.layoutSizingHorizontal = "FILL"; return node; };
  const coinDot = (col, s) => {
    const e = figma.createEllipse();
    e.resize(s, s);
    e.fills = [solid(col)];
    return e;
  };
  const sparkPath = (pts, w, h) => {
    const mn = Math.min(...pts), mx = Math.max(...pts), rg = (mx - mn) || 1;
    const step = w / (pts.length - 1);
    let d = "";
    pts.forEach((v, i) => {
      const x = (i * step).toFixed(1);
      const y = (h - ((v - mn) / rg) * (h - 6) - 3).toFixed(1);
      d += (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    });
    return d;
  };
  // Real Phosphor icon from HELIX_ICONS (icons-svg.js). Falls back to a dot.
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
  // Instance of a component built by 02/02b — screens consume the library
  const compPage = figma.root.children.find((p) => /Components/.test(p.name));
  const setCache = {};
  const inst = (setName, variantName, textOverride) => {
    if (!compPage) return null;
    if (!(setName in setCache)) setCache[setName] = compPage.children.find((n) => n.name === setName) || null;
    const set = setCache[setName];
    if (!set) return null;
    const comp = set.type === "COMPONENT" ? set
      : (set.children || []).find((k) => k.type === "COMPONENT" && k.name === variantName)
        || (set.children || []).find((k) => k.type === "COMPONENT");
    if (!comp || comp.type !== "COMPONENT") return null;
    const node = comp.createInstance();
    if (textOverride) {
      const t = node.findOne((k) => k.type === "TEXT");
      if (t) t.characters = textOverride;
    }
    return node;
  };
  const timeframePill = (label, active) => {
    const i = inst("Pill / Timeframe", active ? "State=Active" : "State=Inactive", label);
    if (i) return i;
    const p = H({ px: 11, py: 5, r: 8, bg: active ? solid("#6366F1", 0.14) : undefined });
    p.appendChild(txt(label, F.monoSemi, 11.5, active ? "#A5ABFC" : "#9AA4B2"));
    return p;
  };
  const changeBadge = (label, up) => {
    const i = inst("Badge / Change", up === false ? "Direction=Down" : "Direction=Up", label);
    if (i) return i;
    const b = H({ px: 9, py: 4, gap: 4, bg: solid(up === false ? "#FB7185" : "#34D399", 0.12), r: 7 });
    b.appendChild(txt(label, F.monoSemi, 12, up === false ? "#FB7185" : "#34D399"));
    return b;
  };
  const avatarInst = (sizeName) => {
    const i = inst("Avatar", `Size=${sizeName || "MD"}, Type=Default`);
    if (i) return i;
    return coinDot("#3F4656", sizeName === "LG" ? 46 : 36);
  };
  const iconCircleBtn = (key, s, colorHex) => {
    const w = H({ main: "CENTER", bg: solid("#FFFFFF", 0.05), r: 999 });
    w.resize(s, s);
    w.primaryAxisSizingMode = "FIXED";
    w.counterAxisSizingMode = "FIXED";
    w.appendChild(icon(key, Math.round(s * 0.48), colorHex || "#C8CFDA"));
    return w;
  };
  const gradBtn = (label, w, hgt, fs) => {
    const size = hgt >= 48 ? "LG" : hgt <= 34 ? "SM" : "MD";
    const i = inst("Button", `Type=Primary, Size=${size}, State=Default`, label);
    if (i) { i.name = "Button / " + label; return i; }
    const b = H({ main: "CENTER", px: 20, bg: ACCENT_GRAD, r: Math.round(hgt * 0.28) });
    b.name = "Button";
    b.minHeight = hgt;
    if (w) { b.primaryAxisSizingMode = "FIXED"; b.resize(w, hgt); }
    b.appendChild(txt(label, F.bodySemi, fs || 14, "#FFFFFF"));
    return b;
  };

  function ensurePage(name, matcher) {
    const found = figma.root.children.find((p) => p.name === name || (matcher && matcher.test(p.name)));
    if (found) return found;
    const spare = figma.root.children.find((p) => /^Page \d+$/.test(p.name) && p.children.length === 0);
    if (spare) { spare.name = name; return spare; }
    try { const p = figma.createPage(); p.name = name; return p; }
    catch (e) { return figma.currentPage; }
  }
  const scrPage = ensurePage("📱 Screens", /Screens/);
  figma.currentPage = scrPage;

  // sequential vertical layout — never overlaps, even on re-runs / shared pages
  let yCursor = 0;
  for (const ch of scrPage.children) yCursor = Math.max(yCursor, ch.y + ch.height + 160);
  const sectionLabel = (label) => {
    const t = txt(label, F.disp, 26, "#F2F4F8");
    scrPage.appendChild(t);
    t.x = 0; t.y = yCursor;
    yCursor += 60;
  };
  const placeScreen = (node, hgt) => {
    node.x = 0; node.y = yCursor;
    yCursor += hgt + 120;
  };

  // ════════════════════════════════════════════════════════
  // SCREEN 1 — TRADING TERMINAL (desktop · dark)
  // ════════════════════════════════════════════════════════
  {
    sectionLabel("🖥  Trading Terminal · Desktop · Dark");
    const root = H({ name: "Trading Terminal · Dark", bg: solid("#0B0E13"), pw: "FIXED", ch: "FIXED", cross: "MIN" });
    root.resize(1440, 720);
    root.clipsContent = true;
    scrPage.appendChild(root);
    placeScreen(root, 720);

    // ── Icon rail ──
    const rail = V({ py: 18, gap: 8, cross: "CENTER", bg: solid("#0B0E13"), bd: solid("#FFFFFF", 0.06) });
    rail.name = "Rail";
    rail.primaryAxisSizingMode = "FIXED";
    rail.counterAxisSizingMode = "FIXED";
    rail.resize(66, 720);
    const logo = H({ main: "CENTER", bg: ACCENT_GRAD, r: 10 });
    logo.resize(34, 34);
    logo.primaryAxisSizingMode = "FIXED";
    logo.counterAxisSizingMode = "FIXED";
    logo.appendChild(vec(16, 16, "M 5 1 C 11 4 11 6 5 8 C -1 10 -1 12 5 15 M 11 1 C 5 4 5 6 11 8 C 17 10 17 12 11 15", "#FFFFFF", 1.8));
    rail.appendChild(logo);
    const railGap = figma.createFrame(); railGap.resize(10, 10); railGap.fills = [];
    rail.appendChild(railGap);
    ["squares-four", "chart-line-up", "chart-bar-fill", "wallet", "image-square", "percent"].forEach((key, i) => {
      const it = H({ main: "CENTER", r: 11, bg: i === 2 ? solid("#6366F1", 0.16) : undefined });
      it.resize(40, 40);
      it.primaryAxisSizingMode = "FIXED";
      it.counterAxisSizingMode = "FIXED";
      it.appendChild(icon(key, 21, i === 2 ? "#6366F1" : "#5E6776"));
      rail.appendChild(it);
    });
    const railSpace = figma.createFrame(); railSpace.fills = [];
    rail.appendChild(railSpace);
    railSpace.layoutSizingVertical = "FILL";
    rail.appendChild(avatarInst("MD"));
    root.appendChild(rail);

    // ── Main column ──
    const main = V({ name: "Main", bd: solid("#FFFFFF", 0.06) });
    root.appendChild(main);
    main.layoutSizingHorizontal = "FILL";
    main.layoutSizingVertical = "FILL";

    const head = H({ px: 22, py: 16, gap: 22, bd: solid("#FFFFFF", 0.06) });
    head.name = "Pair Header";
    main.appendChild(head);
    fill(head);
    const pair = H({ gap: 11 });
    pair.appendChild(coinDot("#F7931A", 34));
    const pairCol = V({ gap: 1 });
    pairCol.appendChild(txt("BTC/USDT", F.dispBold, 16, "#F2F4F8"));
    pairCol.appendChild(txt("Bitcoin", F.body, 11.5, "#5E6776"));
    pair.appendChild(pairCol);
    head.appendChild(pair);
    head.appendChild(txt("94,210.50", F.monoSemi, 21, "#34D399"));
    head.appendChild(changeBadge("+2.41%", true));
    const headSpace = figma.createFrame(); headSpace.fills = [];
    head.appendChild(headSpace);
    fill(headSpace);
    for (const [label, val] of [["24h High", "96,420.00"], ["24h Low", "91,180.00"], ["24h Volume", "2.41B"]]) {
      const st = V({ gap: 3 });
      st.appendChild(txt(label, F.body, 10.5, "#5E6776"));
      st.appendChild(txt(val, F.monoMed, 12.5, "#F2F4F8"));
      head.appendChild(st);
    }

    const tf = H({ px: 22, py: 11, gap: 6, bd: solid("#FFFFFF", 0.06) });
    tf.name = "Timeframes";
    main.appendChild(tf);
    fill(tf);
    ["1H", "4H", "1D", "1W"].forEach((label, i) => tf.appendChild(timeframePill(label, i === 0)));

    // ── Candle chart ──
    const chart = figma.createFrame();
    chart.name = "Chart";
    chart.fills = [];
    main.appendChild(chart);
    chart.layoutSizingHorizontal = "FILL";
    chart.layoutSizingVertical = "FILL";
    const CW = 1440 - 66 - 290, CH = 720 - 67 - 44;
    // grid lines + y labels
    for (let i = 0; i < 5; i++) {
      const gl = figma.createRectangle();
      gl.resize(CW - 86, 1);
      gl.fills = [solid("#FFFFFF", 0.04)];
      chart.appendChild(gl);
      gl.x = 0; gl.y = 30 + i * ((CH - 80) / 4);
      const yl = txt(["96,400", "95,200", "94,210", "93,000", "91,800"][i], F.mono, 10, i === 2 ? "#34D399" : "#5E6776");
      chart.appendChild(yl);
      yl.x = CW - 78; yl.y = 24 + i * ((CH - 80) / 4);
    }
    // candles
    const deltas = [3, -4, 5, 2, -3, 6, -2, 4, -5, 3, 4, -3, 5, -4, 2, 3, -2, 6, -4, 3, 5, -3, 2, 4, -5, 3, 6, -2, 4, 3];
    let prev = 60; const ohlc = [];
    deltas.forEach((d) => { const o = prev, cl = prev + d, hi = Math.max(o, cl) + 2.6, lo = Math.min(o, cl) - 2.6; ohlc.push({ o, cl, hi, lo, up: cl >= o }); prev = cl; });
    const aH = Math.max(...ohlc.map((x) => x.hi)), aL = Math.min(...ohlc.map((x) => x.lo)), aR = (aH - aL) || 1;
    const plotW = CW - 110, plotH = CH - 90, plotX = 22, plotY = 30;
    const cwid = plotW / 30;
    ohlc.forEach((k, i) => {
      const col = k.up ? "#34D399" : "#FB7185";
      const x = plotX + i * cwid;
      const yTop = plotY + ((aH - k.hi) / aR) * plotH;
      const yBot = plotY + ((aH - k.lo) / aR) * plotH;
      const wick = figma.createRectangle();
      wick.resize(1.5, Math.max(yBot - yTop, 2));
      wick.fills = [solid(col)];
      chart.appendChild(wick);
      wick.x = x + cwid / 2 - 0.75; wick.y = yTop;
      const bTop = plotY + ((aH - Math.max(k.o, k.cl)) / aR) * plotH;
      const bH = Math.max((Math.abs(k.cl - k.o) / aR) * plotH, 2.5);
      const body = figma.createRectangle();
      body.resize(Math.max(cwid - 3, 3), bH);
      body.cornerRadius = 1;
      body.fills = [solid(col)];
      chart.appendChild(body);
      body.x = x + 1.5; body.y = bTop;
    });
    // x labels
    ["09:00", "11:00", "13:00", "15:00", "17:00"].forEach((label, i) => {
      const xl = txt(label, F.mono, 9.5, "#5E6776");
      chart.appendChild(xl);
      xl.x = plotX + i * (plotW / 4) - 10; xl.y = CH - 26;
    });

    // ── Right column: order book + trade panel ──
    const right = V({ name: "Order Book + Trade" });
    right.primaryAxisSizingMode = "FIXED";
    right.counterAxisSizingMode = "FIXED";
    right.resize(290, 720);
    root.appendChild(right);

    const book = V({ px: 16, py: 14, gap: 0, bd: solid("#FFFFFF", 0.06) });
    book.name = "Order Book";
    right.appendChild(book);
    fill(book);
    const bookHead = H({ main: "SPACE_BETWEEN", py: 0 });
    ["PRICE (USDT)", "AMOUNT", "TOTAL"].forEach((label) => bookHead.appendChild(txt(label, F.bodyMed, 9, "#5E6776")));
    book.appendChild(bookHead);
    fill(bookHead);
    const bookGap = figma.createFrame(); bookGap.resize(10, 8); bookGap.fills = [];
    book.appendChild(bookGap);
    const bookRow = (p, a, t, col, w) => {
      const r = H({ py: 3.5, gap: 6 });
      r.clipsContent = false;
      const depth = figma.createRectangle();
      depth.resize(258 * w, 19);
      depth.fills = [solid(col, 0.08)];
      r.appendChild(depth);
      depth.layoutPositioning = "ABSOLUTE";
      depth.x = 258 - 258 * w; depth.y = 0;
      const pt = txt(p, F.mono, 11.5, col);
      r.appendChild(pt);
      fill(pt);
      const at = txt(a, F.mono, 11.5, "#9AA4B2");
      at.textAlignHorizontal = "RIGHT"; at.textAutoResize = "NONE"; at.resize(64, at.height);
      r.appendChild(at);
      const tt = txt(t, F.mono, 11.5, "#5E6776");
      tt.textAlignHorizontal = "RIGHT"; tt.textAutoResize = "NONE"; tt.resize(50, tt.height);
      r.appendChild(tt);
      book.appendChild(r);
      fill(r);
    };
    [["94,265.10", "0.842", "79,3", 0.38], ["94,258.40", "1.204", "113", 0.54], ["94,251.90", "0.318", "30,0", 0.18], ["94,246.20", "2.011", "189", 0.82], ["94,240.80", "0.567", "53,5", 0.30], ["94,235.10", "1.880", "177", 0.70]]
      .forEach(([p, a, t, w]) => bookRow(p, a, t, "#FB7185", w));
    const spread = H({ py: 9, gap: 8, bd: solid("#FFFFFF", 0.06) });
    spread.appendChild(txt("94,210.50 ↑", F.monoSemi, 15, "#34D399"));
    const sSpace = figma.createFrame(); sSpace.fills = [];
    spread.appendChild(sSpace); fill(sSpace);
    spread.appendChild(txt("$94,210", F.body, 10.5, "#5E6776"));
    book.appendChild(spread);
    fill(spread);
    [["94,228.60", "0.945", "89,1", 0.42], ["94,222.30", "1.530", "144", 0.66], ["94,216.70", "0.402", "38,0", 0.22], ["94,210.50", "2.640", "248", 0.92], ["94,204.10", "0.781", "73,6", 0.36], ["94,198.40", "1.115", "105", 0.52]]
      .forEach(([p, a, t, w]) => bookRow(p, a, t, "#34D399", w));

    const trade = V({ p: 16, gap: 11 });
    trade.name = "Trade Panel";
    right.appendChild(trade);
    fill(trade);
    const buySell = H({ p: 3, bg: solid("#FFFFFF", 0.04), r: 10 });
    const buyTab = H({ main: "CENTER", py: 7, bg: solid("#34D399", 0.16), r: 8 });
    buyTab.appendChild(txt("Buy", F.bodyBold, 13, "#34D399"));
    buySell.appendChild(buyTab);
    fill(buyTab);
    const sellTab = H({ main: "CENTER", py: 7 });
    sellTab.appendChild(txt("Sell", F.bodyBold, 13, "#9AA4B2"));
    buySell.appendChild(sellTab);
    fill(sellTab);
    trade.appendChild(buySell);
    fill(buySell);
    const fieldRow = (label, val, unit) => {
      trade.appendChild(txt(label, F.body, 11, "#5E6776"));
      const f = H({ px: 12, main: "SPACE_BETWEEN", bg: solid("#FFFFFF", 0.04), bd: solid("#FFFFFF", 0.08), r: 9 });
      f.minHeight = 38;
      f.appendChild(txt(val, F.mono, 13, "#F2F4F8"));
      f.appendChild(txt(unit, F.body, 10.5, "#5E6776"));
      trade.appendChild(f);
      fill(f);
    };
    fieldRow("Price", "94,210.50", "USDT");
    fieldRow("Amount", "0.5000", "BTC");
    const slider = figma.createFrame();
    slider.name = "Slider";
    slider.resize(258, 15);
    slider.fills = [];
    const strack = figma.createRectangle();
    strack.resize(258, 5); strack.cornerRadius = 999;
    strack.fills = [solid("#FFFFFF", 0.08)];
    slider.appendChild(strack); strack.y = 5;
    const sfill = figma.createRectangle();
    sfill.resize(129, 5); sfill.cornerRadius = 999;
    sfill.fills = [solid("#34D399")];
    slider.appendChild(sfill); sfill.y = 5;
    const sknob = figma.createEllipse();
    sknob.resize(15, 15);
    sknob.fills = [solid("#FFFFFF")];
    sknob.strokes = [solid("#34D399")]; sknob.strokeWeight = 3;
    slider.appendChild(sknob); sknob.x = 129 - 7; sknob.y = 0;
    trade.appendChild(slider);
    fill(slider);
    const totalRow = H({ main: "SPACE_BETWEEN" });
    totalRow.appendChild(txt("Total", F.body, 11.5, "#5E6776"));
    totalRow.appendChild(txt("47,105.25 USDT", F.monoSemi, 11.5, "#F2F4F8"));
    trade.appendChild(totalRow);
    fill(totalRow);
    const buyBtn = H({ main: "CENTER", bg: solid("#34D399"), r: 11 });
    buyBtn.minHeight = 44;
    buyBtn.appendChild(txt("Buy BTC", F.bodyBold, 14, "#04130C"));
    trade.appendChild(buyBtn);
    fill(buyBtn);
  }

  // ════════════════════════════════════════════════════════
  // SCREEN 2 — PORTFOLIO DASHBOARD (desktop · light)
  // ════════════════════════════════════════════════════════
  {
    sectionLabel("🖥  Portfolio Dashboard · Desktop · Light");
    const root = H({ name: "Portfolio Dashboard · Light", bg: solid("#F6F7F9"), pw: "FIXED", ch: "FIXED", cross: "MIN" });
    root.resize(1440, 800);
    root.clipsContent = true;
    scrPage.appendChild(root);
    placeScreen(root, 800);

    // ── Sidebar ──
    const side = V({ px: 16, py: 20, gap: 4, bg: solid("#FFFFFF"), bd: solid("#E6E8EC") });
    side.name = "Sidebar";
    side.primaryAxisSizingMode = "FIXED";
    side.counterAxisSizingMode = "FIXED";
    side.resize(228, 800);
    const brand = H({ px: 6, gap: 10 });
    const logo2 = H({ main: "CENTER", bg: ACCENT_GRAD, r: 9 });
    logo2.resize(30, 30);
    logo2.primaryAxisSizingMode = "FIXED";
    logo2.counterAxisSizingMode = "FIXED";
    logo2.appendChild(vec(14, 14, "M 4 1 C 9 3.5 9 5.5 4 7 C -1 8.5 -1 10.5 4 13 M 10 1 C 5 3.5 5 5.5 10 7 C 15 8.5 15 10.5 10 13", "#FFFFFF", 1.6));
    brand.appendChild(logo2);
    brand.appendChild(txt("Helix", F.disp, 17, "#0E121B"));
    side.appendChild(brand);
    const brandGap = figma.createFrame(); brandGap.resize(10, 18); brandGap.fills = [];
    side.appendChild(brandGap);
    const navItems = [["Dashboard", "squares-four-fill", true], ["Markets", "chart-line-up", false], ["Wallet", "wallet", false], ["Earn", "hand-coins", false], ["NFTs", "image-square", false], ["Settings", "gear-six", false]];
    for (const [label, key, active] of navItems) {
      const it = H({ px: 12, py: 10, gap: 11, r: 11, bg: active ? solid("#6366F1", 0.1) : undefined });
      it.appendChild(icon(key, 19, active ? "#6366F1" : "#5A6473"));
      it.appendChild(txt(label, active ? F.bodySemi : F.bodyMed, 13.5, active ? "#6366F1" : "#5A6473"));
      side.appendChild(it);
      fill(it);
    }
    const sideSpace = figma.createFrame(); sideSpace.fills = [];
    side.appendChild(sideSpace);
    sideSpace.layoutSizingVertical = "FILL";
    const prof = H({ p: 10, gap: 10, bg: solid("#F6F7F9"), r: 12 });
    prof.appendChild(avatarInst("MD"));
    const profCol = V({ gap: 1 });
    profCol.appendChild(txt("Alex Rivera", F.bodySemi, 12.5, "#0E121B"));
    profCol.appendChild(txt("Pro account", F.body, 11, "#9099A6"));
    prof.appendChild(profCol);
    side.appendChild(prof);
    fill(prof);
    root.appendChild(side);

    // ── Main ──
    const main = V({ name: "Main" });
    root.appendChild(main);
    main.layoutSizingHorizontal = "FILL";
    main.layoutSizingVertical = "FILL";

    const top = H({ px: 26, py: 18, gap: 16, bg: solid("#FFFFFF"), bd: solid("#E6E8EC") });
    top.name = "Topbar";
    top.appendChild(txt("Portfolio", F.disp, 20, "#0E121B"));
    const topSpace = figma.createFrame(); topSpace.fills = [];
    top.appendChild(topSpace); fill(topSpace);
    const search = H({ px: 14, gap: 8, bg: solid("#F1F3F6"), r: 10 });
    search.minHeight = 38;
    search.primaryAxisSizingMode = "FIXED";
    search.resize(240, 38);
    search.itemSpacing = 8;
    search.appendChild(icon("magnifying-glass", 16, "#9099A6"));
    search.appendChild(txt("Search assets…", F.body, 13, "#9099A6"));
    top.appendChild(search);
    const bell = H({ main: "CENTER", bg: solid("#F1F3F6"), r: 10 });
    bell.resize(38, 38);
    bell.primaryAxisSizingMode = "FIXED";
    bell.counterAxisSizingMode = "FIXED";
    bell.appendChild(icon("bell", 18, "#5A6473"));
    top.appendChild(bell);
    top.appendChild(gradBtn("+ Deposit", null, 38, 13));
    main.appendChild(top);
    fill(top);

    const content = V({ px: 26, py: 24, gap: 20 });
    content.name = "Content";
    main.appendChild(content);
    fill(content);

    const stats = H({ gap: 16 });
    const statCard = (label, val, sub, valCol, subCol) => {
      const cCard = V({ p: 18, gap: 5, bg: solid("#FFFFFF"), bd: solid("#E6E8EC"), r: 16 });
      cCard.appendChild(txt(label, F.body, 12, "#5A6473"));
      cCard.appendChild(txt(val, F.disp, 23, valCol || "#0E121B"));
      cCard.appendChild(txt(sub, F.monoSemi, 11.5, subCol || "#10B981"));
      stats.appendChild(cCard);
      fill(cCard);
      return cCard;
    };
    statCard("Total balance", "$128,540", "+$14,210 (12.4%)");
    statCard("24h change", "+2.41%", "+$3,021.40", "#10B981", "#9099A6");
    statCard("All-time profit", "$42,180", "+48.7%");
    statCard("Best performer", "SOL", "+18.2%");
    content.appendChild(stats);
    fill(stats);

    const split = H({ gap: 18, cross: "MIN" });
    content.appendChild(split);
    fill(split);

    const chartCard = V({ p: 20, gap: 14, bg: solid("#FFFFFF"), bd: solid("#E6E8EC"), r: 16 });
    chartCard.name = "Portfolio Value";
    const chHead = H({ main: "SPACE_BETWEEN", cross: "MIN" });
    const chCol = V({ gap: 4 });
    chCol.appendChild(txt("Portfolio value", F.body, 13, "#5A6473"));
    chCol.appendChild(txt("$128,540.20", F.disp, 26, "#0E121B"));
    chHead.appendChild(chCol);
    const seg = H({ p: 3, bg: solid("#F1F3F6"), r: 9 });
    ["1W", "1M", "1Y"].forEach((label, i) => {
      const s = H({ px: 11, py: 5, r: 7, bg: i === 0 ? solid("#FFFFFF") : undefined });
      if (i === 0) s.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.06 }, offset: { x: 0, y: 1 }, radius: 2, visible: true, blendMode: "NORMAL" }];
      s.appendChild(txt(label, F.monoSemi, 11.5, i === 0 ? "#0E121B" : "#9099A6"));
      seg.appendChild(s);
    });
    chHead.appendChild(seg);
    chartCard.appendChild(chHead);
    fill(chHead);
    const line = vec(600, 170, "M 0 130 C 60 120 90 138 140 124 C 190 110 220 70 280 82 C 340 94 360 46 420 54 C 480 62 510 28 600 18", "#6366F1", 2.5);
    line.name = "Line";
    chartCard.appendChild(line);
    fill(line);
    const days = H({ main: "SPACE_BETWEEN" });
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((d) => days.appendChild(txt(d, F.mono, 10.5, "#9099A6")));
    chartCard.appendChild(days);
    fill(days);
    split.appendChild(chartCard);
    fill(chartCard);

    const rightCol = V({ gap: 18 });
    rightCol.primaryAxisSizingMode = "AUTO";
    rightCol.counterAxisSizingMode = "FIXED";
    rightCol.resize(400, 100);
    split.appendChild(rightCol);

    const alloc = V({ p: 20, gap: 16, bg: solid("#FFFFFF"), bd: solid("#E6E8EC"), r: 16 });
    alloc.name = "Allocation";
    alloc.appendChild(txt("Allocation", F.bodySemi, 13, "#0E121B"));
    const allocRow = H({ gap: 18 });
    const donut = figma.createFrame();
    donut.resize(96, 96);
    donut.fills = [];
    const dsegs = [["#F7931A", 0.45], ["#6366F1", 0.30], ["#14B8A6", 0.15], ["#D7DBE2", 0.10]];
    let ang = -Math.PI / 2;
    for (const [col, frac] of dsegs) {
      const arc = figma.createEllipse();
      arc.resize(96, 96);
      const sweep = Math.PI * 2 * frac;
      arc.arcData = { startingAngle: ang, endingAngle: ang + sweep - 0.03, innerRadius: 0.7 };
      arc.fills = [solid(col)];
      donut.appendChild(arc);
      ang += sweep;
    }
    allocRow.appendChild(donut);
    const legend = V({ gap: 9 });
    [["#F7931A", "BTC", "45%"], ["#6366F1", "ETH", "30%"], ["#14B8A6", "SOL", "15%"], ["#D7DBE2", "Other", "10%"]].forEach(([col, label, pct]) => {
      const r = H({ gap: 8 });
      const sw = figma.createRectangle();
      sw.resize(9, 9); sw.cornerRadius = 3; sw.fills = [solid(col)];
      r.appendChild(sw);
      const lb = txt(label, F.body, 12, "#2A3340");
      r.appendChild(lb);
      fill(lb);
      r.appendChild(txt(pct, F.monoSemi, 12, "#0E121B"));
      legend.appendChild(r);
      fill(r);
    });
    allocRow.appendChild(legend);
    legend.layoutSizingHorizontal = "FILL";
    alloc.appendChild(allocRow);
    fill(allocRow);
    rightCol.appendChild(alloc);
    fill(alloc);

    const actions = H({ p: 16, gap: 10, bg: solid("#FFFFFF"), bd: solid("#E6E8EC"), r: 16 });
    actions.name = "Quick Actions";
    [["Buy", "arrow-down-bold"], ["Send", "arrow-up-bold"], ["Swap", "arrows-down-up-bold"], ["Receive", "qr-code"]].forEach(([label, key]) => {
      const a = V({ py: 12, gap: 6, cross: "CENTER", bd: solid("#E6E8EC"), r: 12 });
      a.appendChild(icon(key, 19, "#6366F1"));
      a.appendChild(txt(label, F.bodySemi, 12, "#0E121B"));
      actions.appendChild(a);
      fill(a);
    });
    rightCol.appendChild(actions);
    fill(actions);
  }

  // ════════════════════════════════════════════════════════
  // SCREEN 3 — NFT MARKETPLACE (desktop · dark)
  // ════════════════════════════════════════════════════════
  {
    sectionLabel("🖥  NFT Marketplace · Desktop · Dark");
    const root = V({ name: "NFT Marketplace · Dark", bg: solid("#0B0E13"), pw: "FIXED", ch: "FIXED", px: 28, py: 24, gap: 22 });
    root.resize(1440, 1040);
    root.clipsContent = true;
    scrPage.appendChild(root);
    placeScreen(root, 1040);

    const top = H({ gap: 18 });
    top.appendChild(txt("Marketplace", F.dispBold, 19, "#FFFFFF"));
    const search = H({ px: 14, gap: 8, bg: solid("#FFFFFF", 0.04), bd: solid("#FFFFFF", 0.08), r: 10 });
    search.minHeight = 38;
    search.primaryAxisSizingMode = "FIXED";
    search.resize(280, 38);
    search.itemSpacing = 8;
    search.appendChild(icon("magnifying-glass", 16, "#5E6776"));
    search.appendChild(txt("Search collections, items…", F.body, 13, "#5E6776"));
    top.appendChild(search);
    const topSpace = figma.createFrame(); topSpace.fills = [];
    top.appendChild(topSpace); fill(topSpace);
    top.appendChild(gradBtn("Connect", null, 38, 13));
    top.appendChild(avatarInst("MD"));
    root.appendChild(top);
    fill(top);

    const feat = frame("VERTICAL", { name: "Featured", main: "CENTER", cross: "MIN", px: 28, bg: grad135("#1E1B4B", "#312E81"), r: 18 });
    feat.primaryAxisSizingMode = "FIXED";
    feat.counterAxisSizingMode = "FIXED";
    root.appendChild(feat);
    fill(feat);
    feat.resize(feat.width, 188);
    const featBadge = H({ px: 10, py: 5, bg: solid("#6366F1", 0.3), r: 7 });
    featBadge.appendChild(txt("FEATURED DROP", F.bodyBold, 11, "#A5ABFC"));
    feat.appendChild(featBadge);
    const featGap = figma.createFrame(); featGap.resize(10, 12); featGap.fills = [];
    feat.appendChild(featGap);
    feat.appendChild(txt("Nebula Genesis ✦", F.dispBold, 26, "#FFFFFF"));
    const featGap2 = figma.createFrame(); featGap2.resize(10, 10); featGap2.fills = [];
    feat.appendChild(featGap2);
    const featStats = H({ gap: 24 });
    [["Floor", "2.4 ETH"], ["Items", "8,888"], ["Volume", "12.4K ETH"]].forEach(([label, val]) => {
      const s = V({ gap: 2 });
      s.appendChild(txt(label, F.body, 11, "#9AA4B2"));
      s.appendChild(txt(val, F.monoSemi, 14, "#FFFFFF"));
      featStats.appendChild(s);
    });
    feat.appendChild(featStats);

    const filters = H({ gap: 8 });
    ["Trending", "Top", "Art", "Gaming", "PFP"].forEach((label, i) => {
      const p = H({ px: 14, py: 7, r: 9, bg: i === 0 ? solid("#6366F1", 0.14) : undefined });
      p.appendChild(txt(label, F.bodySemi, 12.5, i === 0 ? "#A5ABFC" : "#9AA4B2"));
      filters.appendChild(p);
    });
    const fSpace = figma.createFrame(); fSpace.fills = [];
    filters.appendChild(fSpace); fill(fSpace);
    const fbtn = H({ px: 13, py: 7, gap: 7, bg: solid("#FFFFFF", 0.04), bd: solid("#FFFFFF", 0.08), r: 9 });
    fbtn.appendChild(icon("funnel", 15, "#C8CFDA"));
    fbtn.appendChild(txt("Filters", F.bodyMed, 12.5, "#C8CFDA"));
    filters.appendChild(fbtn);
    root.appendChild(filters);
    fill(filters);

    const nfts = [
      ["Nebula", "Astral #2847", "2.40", "#4338CA"], ["Meta Apes", "Ape #112", "5.80", "#14B8A6"],
      ["Liquid Dreams", "Flow #009", "3.30", "#8B5CF6"], ["Voxel City", "Plot #44", "1.15", "#F59E0B"],
      ["Aurora", "Light #321", "4.10", "#0EA5E9"], ["Pixel Pals", "Pal #7780", "0.85", "#F43F5E"],
      ["Genesis", "Block #001", "12.0", "#6366F1"], ["Solar", "Ray #66", "1.90", "#F7931A"],
    ];
    for (let row = 0; row < 2; row++) {
      const grid = H({ gap: 16, cross: "MIN" });
      for (let i = 0; i < 4; i++) {
        const [col, name, pr, tone] = nfts[row * 4 + i];
        const card = V({ bg: solid("#12151C"), bd: solid("#FFFFFF", 0.07), r: 16 });
        card.clipsContent = true;
        const img = figma.createRectangle();
        img.name = "Artwork";
        img.resize(320, 220);
        img.fills = [grad135(tone, "#12151C")];
        card.appendChild(img);
        img.layoutSizingHorizontal = "FILL";
        const body = V({ p: 14, gap: 7 });
        const colRow = H({ gap: 5 });
        colRow.appendChild(txt(col, F.body, 11.5, "#9AA4B2"));
        colRow.appendChild(icon("seal-check-fill", 13, "#38BDF8"));
        body.appendChild(colRow);
        body.appendChild(txt(name, F.bodySemi, 14, "#F2F4F8"));
        const priceRow = H({ main: "SPACE_BETWEEN", cross: "MAX" });
        const priceCol = V({ gap: 2 });
        priceCol.appendChild(txt("Price", F.body, 10.5, "#5E6776"));
        const pv = H({ gap: 5 });
        pv.appendChild(coinDot("#627EEA", 14));
        pv.appendChild(txt(pr, F.monoSemi, 13, "#F2F4F8"));
        priceCol.appendChild(pv);
        priceRow.appendChild(priceCol);
        const bid = H({ px: 14, py: 7, bg: solid("#6366F1", 0.14), r: 9 });
        bid.appendChild(txt("Bid", F.bodySemi, 12, "#A5ABFC"));
        priceRow.appendChild(bid);
        body.appendChild(priceRow);
        fill(priceRow);
        card.appendChild(body);
        fill(body);
        grid.appendChild(card);
        fill(card);
      }
      root.appendChild(grid);
      fill(grid);
    }
  }

  // ════════════════════════════════════════════════════════
  // MOBILE SCREENS — 390×844
  // ════════════════════════════════════════════════════════
  sectionLabel("📱  Mobile · Onboarding / Portfolio / Coin Detail / Swap");
  const yMobile = yCursor;
  yCursor += 844 + 120;
  const statusBar = (parent) => {
    const sb = H({ px: 22, py: 13, main: "SPACE_BETWEEN" });
    sb.name = "Status Bar";
    sb.appendChild(txt("9:41", F.monoSemi, 12, "#FFFFFF"));
    const right = H({ gap: 5 });
    ["cell-signal-full-fill", "wifi-high-fill", "battery-full-fill"].forEach((k) => right.appendChild(icon(k, 14, "#FFFFFF")));
    sb.appendChild(right);
    parent.appendChild(sb);
    fill(sb);
    return sb;
  };
  const phone = (name, x, bgPaint) => {
    const p = V({ name, pw: "FIXED", ch: "FIXED", bg: bgPaint || solid("#0B0E13") });
    p.resize(390, 844);
    p.cornerRadius = 40;
    p.clipsContent = true;
    scrPage.appendChild(p);
    p.x = x; p.y = yMobile;
    statusBar(p);
    return p;
  };

  // ── 4. Onboarding ──
  {
    const p = phone("Mobile · Onboarding", 0, grad135("#312E81", "#0B0E13"));
    const hero = figma.createFrame();
    hero.name = "Hero";
    hero.fills = [];
    p.appendChild(hero);
    fill(hero);
    hero.layoutSizingVertical = "FILL";
    const orb = figma.createEllipse();
    orb.resize(210, 210);
    orb.fills = [ACCENT_GRAD];
    orb.effects = [{ type: "DROP_SHADOW", color: { ...hex("#6366F1"), a: 0.7 }, offset: { x: 0, y: 20 }, radius: 60, spread: -10, visible: true, blendMode: "NORMAL" }];
    hero.appendChild(orb);
    orb.x = 90; orb.y = 100;
    const cube = icon("cube-fill", 76, "#FFFFFF");
    hero.appendChild(cube);
    cube.x = 90 + 105 - 38; cube.y = 100 + 105 - 38;
    [["#F7931A", 56, 46, 96], ["#627EEA", 300, 76, 48], ["#14F195", 306, 268, 42]].forEach(([col, x, y, s]) => {
      const cdot = coinDot(col, s);
      hero.appendChild(cdot);
      cdot.x = x; cdot.y = y;
    });
    const sheet = V({ px: 22, py: 26, gap: 11, cross: "CENTER", bg: solid("#12151C"), bd: solid("#FFFFFF", 0.06) });
    sheet.name = "Sheet";
    sheet.topLeftRadius = 28; sheet.topRightRadius = 28;
    p.appendChild(sheet);
    fill(sheet);
    const dots = H({ gap: 6 });
    const d1 = figma.createRectangle();
    d1.resize(20, 6); d1.cornerRadius = 999; d1.fills = [solid("#6366F1")];
    dots.appendChild(d1);
    for (let i = 0; i < 2; i++) dots.appendChild(coinDot("#3F4656", 6));
    sheet.appendChild(dots);
    const title = txt("Your gateway\nto Web3", F.disp, 23, "#F2F4F8");
    title.textAlignHorizontal = "CENTER";
    sheet.appendChild(title);
    const sub = txt("Buy, store and swap 500+ assets\nwith bank-grade security.", F.body, 13, "#9AA4B2");
    sub.textAlignHorizontal = "CENTER";
    sheet.appendChild(sub);
    const sheetGap = figma.createFrame(); sheetGap.resize(10, 8); sheetGap.fills = [];
    sheet.appendChild(sheetGap);
    const cta = gradBtn("Create wallet", null, 50, 15);
    sheet.appendChild(cta);
    fill(cta);
    const alt = H({ main: "CENTER", bd: solid("#FFFFFF", 0.12), r: 14 });
    alt.minHeight = 50;
    alt.appendChild(txt("I already have one", F.bodySemi, 15, "#F2F4F8"));
    sheet.appendChild(alt);
    fill(alt);
  }

  // ── 5. Mobile Portfolio ──
  {
    const p = phone("Mobile · Portfolio", 470);
    const content = V({ px: 20, py: 14, gap: 18 });
    p.appendChild(content);
    fill(content);
    content.layoutSizingVertical = "FILL";

    const greet = H({ gap: 11 });
    greet.appendChild(avatarInst("MD"));
    const gCol = V({ gap: 1 });
    gCol.appendChild(txt("Good morning", F.body, 12, "#9AA4B2"));
    gCol.appendChild(txt("Alex Rivera", F.bodySemi, 14, "#F2F4F8"));
    greet.appendChild(gCol);
    fill(gCol);
    greet.appendChild(iconCircleBtn("bell", 38));
    content.appendChild(greet);
    fill(greet);

    const bal = V({ p: 20, gap: 6, bg: ACCENT_GRAD, r: 20 });
    bal.name = "Balance Card";
    bal.clipsContent = true;
    const deco = figma.createEllipse();
    deco.resize(110, 110);
    deco.fills = [solid("#FFFFFF", 0.12)];
    bal.appendChild(deco);
    deco.layoutPositioning = "ABSOLUTE";
    deco.x = 350 - 84 - 26; deco.y = -26;
    bal.appendChild(txt("Total balance", F.body, 12, "#FFFFFF", 0.85));
    bal.appendChild(txt("$128,540", F.disp, 30, "#FFFFFF"));
    const chgChip = H({ px: 8, py: 3, gap: 4, bg: solid("#FFFFFF", 0.18), r: 7 });
    chgChip.appendChild(icon("trend-up-bold", 12, "#FFFFFF"));
    chgChip.appendChild(txt("+12.4%", F.monoSemi, 11.5, "#FFFFFF"));
    bal.appendChild(chgChip);
    content.appendChild(bal);
    fill(bal);

    const acts = H({ main: "SPACE_BETWEEN" });
    [["Send", "arrow-up-bold"], ["Receive", "arrow-down-bold"], ["Swap", "arrows-down-up-bold"], ["Buy", "plus-bold"]].forEach(([label, key]) => {
      const a = V({ gap: 6, cross: "CENTER" });
      const tile = H({ main: "CENTER", bg: solid("#FFFFFF", 0.05), r: 14 });
      tile.resize(46, 46);
      tile.primaryAxisSizingMode = "FIXED";
      tile.counterAxisSizingMode = "FIXED";
      tile.appendChild(icon(key, 20, "#6366F1"));
      a.appendChild(tile);
      a.appendChild(txt(label, F.body, 10.5, "#9AA4B2"));
      acts.appendChild(a);
    });
    content.appendChild(acts);
    fill(acts);

    const assetsHead = H({ main: "SPACE_BETWEEN" });
    assetsHead.appendChild(txt("Assets", F.bodySemi, 14, "#F2F4F8"));
    assetsHead.appendChild(txt("See all", F.bodySemi, 12, "#6366F1"));
    content.appendChild(assetsHead);
    fill(assetsHead);
    const assetRow = (col, name, amt, usd, chg) => {
      const r = H({ gap: 11 });
      r.appendChild(coinDot(col, 34));
      const nc = V({ gap: 1 });
      nc.appendChild(txt(name, F.bodySemi, 13, "#F2F4F8"));
      nc.appendChild(txt(amt, F.mono, 11, "#5E6776"));
      r.appendChild(nc);
      fill(nc);
      const vc = V({ gap: 1, cross: "MAX" });
      vc.appendChild(txt(usd, F.monoSemi, 13, "#F2F4F8"));
      vc.appendChild(txt(chg, F.mono, 11, "#34D399"));
      r.appendChild(vc);
      content.appendChild(r);
      fill(r);
    };
    assetRow("#F7931A", "Bitcoin", "1.284 BTC", "$57.8K", "+2.4%");
    assetRow("#627EEA", "Ethereum", "18.42 ETH", "$38.5K", "+1.2%");
    assetRow("#14F195", "Solana", "412.8 SOL", "$18.2K", "+18.2%");

    const navSpace = figma.createFrame(); navSpace.fills = [];
    content.appendChild(navSpace);
    navSpace.layoutSizingVertical = "FILL";

    const nav = H({ px: 30, py: 16, main: "SPACE_BETWEEN", bg: solid("#12151C"), bd: solid("#FFFFFF", 0.06) });
    nav.name = "Bottom Nav";
    [["house-fill", "#6366F1"], ["chart-line-up", "#5E6776"], ["arrows-left-right", "#5E6776"], ["wallet", "#5E6776"]].forEach(([k, col]) => nav.appendChild(icon(k, 21, col)));
    p.appendChild(nav);
    fill(nav);
  }

  // ── 6. Coin Detail ──
  {
    const p = phone("Mobile · Coin Detail", 940);
    const content = V({ px: 20, py: 12, gap: 16, cross: "CENTER" });
    p.appendChild(content);
    fill(content);
    content.layoutSizingVertical = "FILL";

    const navRow = H({ main: "SPACE_BETWEEN" });
    const back = H({ main: "CENTER", bg: solid("#FFFFFF", 0.05), r: 999 });
    back.resize(36, 36);
    back.primaryAxisSizingMode = "FIXED";
    back.counterAxisSizingMode = "FIXED";
    back.appendChild(vec(7, 12, "M 6 0 L 0 6 L 6 12", "#C8CFDA", 1.8));
    navRow.appendChild(back);
    const mid = H({ gap: 8 });
    mid.appendChild(coinDot("#F7931A", 24));
    mid.appendChild(txt("Bitcoin", F.bodySemi, 15, "#F2F4F8"));
    navRow.appendChild(mid);
    navRow.appendChild(iconCircleBtn("star", 36));
    content.appendChild(navRow);
    fill(navRow);

    content.appendChild(txt("$94,210.50", F.disp, 34, "#F2F4F8"));
    content.appendChild(changeBadge("+2.41% · +$2,210", true));

    const line = vec(350, 120, sparkPath([2, 3, 2.5, 4, 3.5, 5, 4.5, 6.5, 6, 8], 350, 120), "#34D399", 2.5);
    line.name = "Chart";
    content.appendChild(line);

    const tfs = H({ gap: 6 });
    ["1H", "1D", "1W", "1Y"].forEach((label, i) => tfs.appendChild(timeframePill(label, i === 0)));
    content.appendChild(tfs);

    const tiles = H({ gap: 10 });
    [["Market cap", "$1.84T"], ["24h Volume", "$42.1B"]].forEach(([label, val]) => {
      const t = V({ px: 13, py: 11, gap: 3, bg: solid("#FFFFFF", 0.03), r: 12 });
      t.appendChild(txt(label, F.body, 10.5, "#5E6776"));
      t.appendChild(txt(val, F.monoSemi, 13, "#F2F4F8"));
      tiles.appendChild(t);
      fill(t);
    });
    content.appendChild(tiles);
    fill(tiles);

    const ctaSpace = figma.createFrame(); ctaSpace.fills = [];
    content.appendChild(ctaSpace);
    ctaSpace.layoutSizingVertical = "FILL";

    const ctas = H({ gap: 11 });
    const sell = H({ main: "CENTER", bg: solid("#FB7185", 0.12), bd: solid("#FB7185", 0.4), r: 13 });
    sell.minHeight = 48;
    sell.appendChild(txt("Sell", F.bodyBold, 14, "#FB7185"));
    ctas.appendChild(sell);
    fill(sell);
    const buy = H({ main: "CENTER", bg: solid("#34D399"), r: 13 });
    buy.minHeight = 48;
    buy.appendChild(txt("Buy", F.bodyBold, 14, "#04130C"));
    ctas.appendChild(buy);
    fill(buy);
    content.appendChild(ctas);
    fill(ctas);
  }

  // ── 7. Swap ──
  {
    const p = phone("Mobile · Swap", 1410);
    const content = V({ px: 20, py: 14, gap: 0 });
    p.appendChild(content);
    fill(content);
    content.layoutSizingVertical = "FILL";

    const head = H({ main: "SPACE_BETWEEN" });
    head.appendChild(txt("Swap", F.disp, 19, "#F2F4F8"));
    head.appendChild(iconCircleBtn("gear-six", 36));
    content.appendChild(head);
    fill(head);
    const headGap = figma.createFrame(); headGap.resize(10, 20); headGap.fills = [];
    content.appendChild(headGap);

    const swapBox = (label, bal, amount, tokenName, tokenCol, usd) => {
      const box = V({ p: 16, gap: 10, bg: solid("#12151C"), bd: solid("#FFFFFF", 0.06), r: 18 });
      const r1 = H({ main: "SPACE_BETWEEN" });
      r1.appendChild(txt(label, F.body, 11.5, "#5E6776"));
      r1.appendChild(txt(bal, F.body, 11.5, "#5E6776"));
      box.appendChild(r1);
      fill(r1);
      const r2 = H({ main: "SPACE_BETWEEN" });
      r2.appendChild(txt(amount, F.monoSemi, 26, "#F2F4F8"));
      const tk = H({ px: 11, py: 7, gap: 7, bg: solid("#FFFFFF", 0.06), r: 12 });
      tk.appendChild(coinDot(tokenCol, 22));
      tk.appendChild(txt(tokenName, F.bodySemi, 14, "#F2F4F8"));
      tk.appendChild(vec(9, 5, "M 0 0 L 4.5 4.5 L 9 0", "#9AA4B2", 1.5));
      r2.appendChild(tk);
      box.appendChild(r2);
      fill(r2);
      box.appendChild(txt(usd, F.body, 11.5, "#5E6776"));
      content.appendChild(box);
      fill(box);
      return box;
    };
    swapBox("You pay", "Balance: 4.82", "2.5", "ETH", "#627EEA", "≈ $12,050.45");

    const swapIconWrap = H({ main: "CENTER", py: 0 });
    const swapIcon = H({ main: "CENTER", bg: ACCENT_GRAD, r: 12, bd: solid("#0B0E13"), bw: 4 });
    swapIcon.resize(38, 38);
    swapIcon.primaryAxisSizingMode = "FIXED";
    swapIcon.counterAxisSizingMode = "FIXED";
    swapIcon.appendChild(vec(10, 14, "M 5 0 L 5 14 M 0 9 L 5 14 L 10 9", "#FFFFFF", 2));
    swapIconWrap.appendChild(swapIcon);
    content.appendChild(swapIconWrap);
    fill(swapIconWrap);
    swapIconWrap.itemSpacing = 0;
    swapIconWrap.paddingTop = 0;
    swapIconWrap.paddingBottom = 0;

    swapBox("You receive", "Balance: 8.4K", "8,420.16", "USDC", "#2775CA", "≈ $8,420.16");
    const boxGap = figma.createFrame(); boxGap.resize(10, 16); boxGap.fills = [];
    content.appendChild(boxGap);

    const info = V({ px: 15, py: 13, gap: 9, bg: solid("#FFFFFF", 0.03), r: 13 });
    [["Rate", "1 ETH = 3,368 USDC", "#C8CFDA"], ["Network fee", "$2.40", "#C8CFDA"], ["Slippage", "0.5%", "#34D399"]].forEach(([label, val, col]) => {
      const r = H({ main: "SPACE_BETWEEN" });
      r.appendChild(txt(label, F.body, 12, "#9AA4B2"));
      r.appendChild(txt(val, F.mono, 12, col));
      info.appendChild(r);
      fill(r);
    });
    content.appendChild(info);
    fill(info);

    const ctaSpace = figma.createFrame(); ctaSpace.fills = [];
    content.appendChild(ctaSpace);
    ctaSpace.layoutSizingVertical = "FILL";
    const cta = gradBtn("Review swap", null, 50, 15);
    content.appendChild(cta);
    fill(cta);
  }

  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
  figma.closePlugin("✅ Helix screens: Trading Terminal, Portfolio Dashboard (light), NFT Marketplace + 4 mobile screens");
})();
