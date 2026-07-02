// ============================================================
// HELIX CRYPTO UI KIT — Part 3b: Extra Screens (13)
// Run AFTER 03-screens.js — completes the 20-screen set
// Web: Markets · Asset Detail · Wallet · Send & Receive · Staking
//      Transactions · Settings & Security · Sign in · NFT Detail
// Mobile: Wallet · Receive QR · NFT Gallery · Profile & Settings
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
  const spacerV = (parent, h) => { const g = figma.createFrame(); g.resize(10, h); g.fills = []; parent.appendChild(g); };
  const coinDot = (col, s) => {
    const e = figma.createEllipse();
    e.resize(s, s);
    e.fills = [solid(col)];
    return e;
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
  const gradBtn = (label, hgt) => {
    const size = hgt >= 48 ? "LG" : hgt <= 34 ? "SM" : "MD";
    const i = inst("Button", `Type=Primary, Size=${size}, State=Default`, label);
    if (i) { i.name = "Button / " + label; return i; }
    const b = H({ main: "CENTER", px: 20, bg: ACCENT_GRAD, r: 11 });
    b.minHeight = hgt || 42;
    b.appendChild(txt(label, F.bodySemi, 14, "#FFFFFF"));
    return b;
  };
  const outlineBtn = (label, hgt) => {
    const i = inst("Button", `Type=Secondary, Size=${(hgt || 42) >= 48 ? "LG" : "MD"}, State=Default`, label);
    if (i) { i.name = "Button / " + label; return i; }
    const b = H({ main: "CENTER", px: 20, bg: solid("#FFFFFF", 0.06), bd: solid("#FFFFFF", 0.12), r: 11 });
    b.minHeight = hgt || 42;
    b.appendChild(txt(label, F.bodySemi, 14, "#F2F4F8"));
    return b;
  };
  const changeBadge = (label, up) => {
    const i = inst("Badge / Change", up === false ? "Direction=Down" : "Direction=Up", label);
    if (i) return i;
    const b = H({ px: 9, py: 4, gap: 4, bg: solid(up === false ? "#FB7185" : "#34D399", 0.12), r: 7 });
    b.appendChild(txt(label, F.monoSemi, 12, up === false ? "#FB7185" : "#34D399"));
    return b;
  };
  const statusBadge = (state) => inst("Badge / Status", `Status=${state}`) || txt(state, F.bodySemi, 12, "#9AA4B2");
  const avatarInst = (sizeName) => inst("Avatar", `Size=${sizeName || "MD"}, Type=Default`) || coinDot("#3F4656", 36);
  const iconTile = (key, s, tone, toneBg) => {
    const t = H({ main: "CENTER", bg: toneBg || solid("#6366F1", 0.14), r: Math.round(s * 0.28) });
    t.resize(s, s);
    t.primaryAxisSizingMode = "FIXED";
    t.counterAxisSizingMode = "FIXED";
    t.appendChild(icon(key, Math.round(s * 0.5), tone || "#6366F1"));
    return t;
  };
  const COINS = [
    ["Bitcoin", "BTC", "#F7931A", "$94,210.50", "+2.41%", true,  [3, 5, 4, 6, 7, 6, 8, 9]],
    ["Ethereum", "ETH", "#627EEA", "$4,820.18", "+1.18%", true,  [6, 5, 7, 6, 8, 7, 9, 9]],
    ["Solana", "SOL", "#14F195", "$236.40",     "-3.22%", false, [9, 8, 8, 6, 7, 5, 4, 4]],
    ["BNB", "BNB", "#F3BA2F", "$712.90",        "+0.84%", true,  [5, 6, 5, 7, 6, 7, 8, 8]],
    ["XRP", "XRP", "#00AAE4", "$2.84",          "+5.10%", true,  [3, 4, 4, 5, 6, 8, 8, 9]],
    ["Cardano", "ADA", "#0033AD", "$1.12",      "-1.40%", false, [8, 8, 7, 7, 6, 6, 5, 5]],
    ["Avalanche", "AVAX", "#E84142", "$48.20",  "+3.92%", true,  [4, 5, 4, 6, 7, 7, 8, 9]],
    ["Chainlink", "LINK", "#2A5ADA", "$28.66",  "+2.05%", true,  [5, 5, 6, 6, 7, 7, 8, 8]],
  ];

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

  // ── Web shell: dark sidebar + topbar, returns content column ──
  const NAV = [
    ["Dashboard", "squares-four"], ["Markets", "chart-line-up"], ["Wallet", "wallet"],
    ["Earn", "hand-coins"], ["NFTs", "image-square"], ["History", "clock-counter-clockwise"], ["Settings", "gear-six"],
  ];
  const webShell = (name, title, activeNav, actionLabel) => {
    sectionLabel("🖥  " + name);
    const root = H({ name, bg: solid("#0B0E13"), pw: "FIXED", ch: "FIXED", cross: "MIN" });
    root.resize(1440, 900);
    root.clipsContent = true;
    scrPage.appendChild(root);
    placeScreen(root, 900);

    const side = V({ px: 16, py: 20, gap: 4, bg: solid("#0E1117"), bd: solid("#FFFFFF", 0.06) });
    side.name = "Sidebar";
    side.primaryAxisSizingMode = "FIXED";
    side.counterAxisSizingMode = "FIXED";
    side.resize(228, 900);
    const brand = H({ px: 6, gap: 10 });
    const logo = H({ main: "CENTER", bg: ACCENT_GRAD, r: 9 });
    logo.resize(30, 30);
    logo.primaryAxisSizingMode = "FIXED";
    logo.counterAxisSizingMode = "FIXED";
    logo.appendChild(vec(14, 14, "M 4 1 C 9 3.5 9 5.5 4 7 C -1 8.5 -1 10.5 4 13 M 10 1 C 5 3.5 5 5.5 10 7 C 15 8.5 15 10.5 10 13", "#FFFFFF", 1.6));
    brand.appendChild(logo);
    brand.appendChild(txt("Helix", F.disp, 17, "#F2F4F8"));
    side.appendChild(brand);
    spacerV(side, 18);
    for (const [label, key] of NAV) {
      const active = label === activeNav;
      const it = H({ px: 12, py: 10, gap: 11, r: 11, bg: active ? solid("#6366F1", 0.14) : undefined });
      it.appendChild(icon(key, 19, active ? "#A5ABFC" : "#5E6776"));
      it.appendChild(txt(label, active ? F.bodySemi : F.bodyMed, 13.5, active ? "#F2F4F8" : "#9AA4B2"));
      side.appendChild(it);
      fill(it);
    }
    const sideSpace = figma.createFrame(); sideSpace.fills = [];
    side.appendChild(sideSpace);
    sideSpace.layoutSizingVertical = "FILL";
    const prof = H({ p: 10, gap: 10, bg: solid("#FFFFFF", 0.04), r: 12 });
    prof.appendChild(avatarInst("MD"));
    const profCol = V({ gap: 1 });
    profCol.appendChild(txt("Alex Rivera", F.bodySemi, 12.5, "#F2F4F8"));
    profCol.appendChild(txt("Pro account", F.body, 11, "#5E6776"));
    prof.appendChild(profCol);
    side.appendChild(prof);
    fill(prof);
    root.appendChild(side);

    const main = V({ name: "Main" });
    root.appendChild(main);
    main.layoutSizingHorizontal = "FILL";
    main.layoutSizingVertical = "FILL";

    const top = H({ px: 26, py: 18, gap: 16, bd: solid("#FFFFFF", 0.06) });
    top.name = "Topbar";
    top.appendChild(txt(title, F.disp, 20, "#F2F4F8"));
    const topSpace = figma.createFrame(); topSpace.fills = [];
    top.appendChild(topSpace); fill(topSpace);
    const search = H({ px: 14, gap: 8, bg: solid("#FFFFFF", 0.04), bd: solid("#FFFFFF", 0.08), r: 10 });
    search.minHeight = 38;
    search.primaryAxisSizingMode = "FIXED";
    search.resize(240, 38);
    search.appendChild(icon("magnifying-glass", 16, "#5E6776"));
    search.appendChild(txt("Search…", F.body, 13, "#5E6776"));
    top.appendChild(search);
    const bell = H({ main: "CENTER", bg: solid("#FFFFFF", 0.04), r: 10 });
    bell.resize(38, 38);
    bell.primaryAxisSizingMode = "FIXED";
    bell.counterAxisSizingMode = "FIXED";
    bell.appendChild(icon("bell", 18, "#9AA4B2"));
    top.appendChild(bell);
    if (actionLabel) top.appendChild(gradBtn(actionLabel, 38));
    main.appendChild(top);
    fill(top);

    const content = V({ px: 26, py: 24, gap: 20 });
    content.name = "Content";
    main.appendChild(content);
    fill(content);
    return content;
  };
  const darkCard = (o) => V({ p: 20, gap: 14, bg: solid("#12151C"), bd: solid("#FFFFFF", 0.07), r: 16, ...(o || {}) });
  const statTile = (label, val, delta, up) => {
    const c = V({ p: 18, gap: 6, bg: solid("#12151C"), bd: solid("#FFFFFF", 0.07), r: 16 });
    c.appendChild(txt(label, F.body, 12, "#9AA4B2"));
    c.appendChild(txt(val, F.disp, 23, "#F2F4F8"));
    if (delta) c.appendChild(changeBadge(delta, up));
    return c;
  };

  // ════════════════════════════════════════════════════════
  // W1 — MARKETS OVERVIEW
  // ════════════════════════════════════════════════════════
  {
    const content = webShell("Markets Overview · Desktop · Dark", "Markets", "Markets", "+ Watchlist");
    const stats = H({ gap: 16 });
    [["Market cap", "$3.42T", "+1.8%", true], ["24h Volume", "$182.4B", "+8.2%", true], ["BTC Dominance", "54.2%", "-0.4%", false], ["Fear & Greed", "72 · Greed", null, true]]
      .forEach(([l, v, d, u]) => { const t = statTile(l, v, d, u); stats.appendChild(t); fill(t); });
    content.appendChild(stats);
    fill(stats);

    const table = darkCard({ gap: 0, p: 24 });
    table.name = "Markets Table";
    const headRow = H({ py: 12, gap: 12, bd: solid("#FFFFFF", 0.06) });
    [["#", 32], ["NAME", 0], ["PRICE", 130], ["24H", 90], ["LAST 7D", 100], ["", 90]].forEach(([label, w]) => {
      const t = txt(label || " ", F.bodySemi, 10.5, "#5E6776");
      if (w) { t.textAutoResize = "NONE"; t.resize(w, 14); if (label === "PRICE" || label === "24H") t.textAlignHorizontal = "RIGHT"; }
      headRow.appendChild(t);
      if (!w) fill(t);
    });
    table.appendChild(headRow);
    fill(headRow);
    COINS.forEach(([name, sym, col, price, chg, up, pts], idx) => {
      const r = H({ py: 13, gap: 12 });
      const rank = txt(String(idx + 1), F.mono, 12.5, "#5E6776");
      rank.textAutoResize = "NONE"; rank.resize(32, 18);
      r.appendChild(rank);
      const id = H({ gap: 11, main: "MIN" });
      id.appendChild(coinDot(col, 30));
      const nc = V({ gap: 1 });
      nc.appendChild(txt(name, F.bodySemi, 13.5, "#F2F4F8"));
      nc.appendChild(txt(sym, F.mono, 11, "#5E6776"));
      id.appendChild(nc);
      r.appendChild(id);
      fill(id);
      const pr = txt(price, F.monoSemi, 13.5, "#F2F4F8");
      pr.textAutoResize = "NONE"; pr.resize(130, 18); pr.textAlignHorizontal = "RIGHT";
      r.appendChild(pr);
      const cb = changeBadge(chg, up);
      r.appendChild(cb);
      const spark = vec(84, 26, sparkPath(pts, 84, 26), up ? "#34D399" : "#FB7185", 1.6);
      r.appendChild(spark);
      const trade = inst("Button", "Type=Outline, Size=SM, State=Default", "Trade") || txt("Trade", F.bodySemi, 12.5, "#A5ABFC");
      r.appendChild(trade);
      table.appendChild(r);
      fill(r);
    });
    content.appendChild(table);
    fill(table);
  }

  // ════════════════════════════════════════════════════════
  // W2 — ASSET DETAIL
  // ════════════════════════════════════════════════════════
  {
    const content = webShell("Asset Detail · Desktop · Dark", "Bitcoin · BTC", "Markets", "Trade BTC");
    const head = darkCard({ gap: 16 });
    const row1 = H({ gap: 14 });
    row1.appendChild(coinDot("#F7931A", 46));
    const idCol = V({ gap: 2 });
    idCol.appendChild(txt("Bitcoin", F.disp, 22, "#F2F4F8"));
    idCol.appendChild(txt("BTC · Rank #1", F.mono, 12, "#5E6776"));
    row1.appendChild(idCol);
    fill(idCol);
    const priceCol = V({ gap: 4, cross: "MAX" });
    priceCol.appendChild(txt("$94,210.50", F.monoSemi, 30, "#F2F4F8"));
    priceCol.appendChild(changeBadge("+2.41% · 24h", true));
    row1.appendChild(priceCol);
    head.appendChild(row1);
    fill(row1);
    const tfRow = H({ gap: 6 });
    ["1H", "1D", "1W", "1M", "1Y", "ALL"].forEach((l, i) => tfRow.appendChild(inst("Pill / Timeframe", i === 1 ? "State=Active" : "State=Inactive", l) || txt(l, F.monoSemi, 12, "#9AA4B2")));
    head.appendChild(tfRow);
    const chart = vec(1100, 220, sparkPath([2, 3, 2.6, 4, 3.4, 5, 4.2, 6, 5.2, 7, 6.4, 8.4], 1100, 220), "#34D399", 2.5);
    chart.name = "Price Chart";
    head.appendChild(chart);
    fill(chart);
    content.appendChild(head);
    fill(head);

    const stats = H({ gap: 16 });
    [["Market cap", "$1.84T"], ["24h Volume", "$42.1B"], ["Circulating", "19.8M BTC"], ["All-time high", "$108,340"]]
      .forEach(([l, v]) => { const t = statTile(l, v); stats.appendChild(t); fill(t); });
    content.appendChild(stats);
    fill(stats);

    const about = darkCard({ gap: 10 });
    about.appendChild(txt("About Bitcoin", F.bodySemi, 15, "#F2F4F8"));
    const p = txt("Bitcoin is the first decentralized digital currency. It enables peer-to-peer transactions on a trustless network secured by proof-of-work, with a fixed supply of 21 million coins.", F.body, 13.5, "#9AA4B2");
    about.appendChild(p);
    p.layoutSizingHorizontal = "FILL";
    content.appendChild(about);
    fill(about);
  }

  // ════════════════════════════════════════════════════════
  // W3 — WALLET & BALANCES
  // ════════════════════════════════════════════════════════
  {
    const content = webShell("Wallet & Balances · Desktop · Dark", "Wallet", "Wallet", "+ Deposit");
    const split = H({ gap: 18, cross: "MIN" });
    const wc = inst("Wallet Card") || darkCard();
    split.appendChild(wc);
    const acts = darkCard({ gap: 10 });
    acts.name = "Quick Actions";
    const actGrid = H({ gap: 10 });
    [["Buy", "plus-bold"], ["Send", "arrow-up-bold"], ["Swap", "arrows-down-up-bold"], ["Receive", "qr-code"]].forEach(([label, key]) => {
      const a = V({ px: 22, py: 14, gap: 8, cross: "CENTER", bd: solid("#FFFFFF", 0.08), r: 12 });
      a.appendChild(iconTile(key, 40));
      a.appendChild(txt(label, F.bodySemi, 12.5, "#F2F4F8"));
      actGrid.appendChild(a);
    });
    acts.appendChild(txt("Quick actions", F.bodySemi, 14, "#F2F4F8"));
    acts.appendChild(actGrid);
    split.appendChild(acts);
    fill(acts);
    content.appendChild(split);
    fill(split);

    const list = darkCard({ gap: 0, p: 24 });
    list.name = "Balances";
    list.appendChild(txt("Your assets", F.bodySemi, 15, "#F2F4F8"));
    spacerV(list, 8);
    COINS.slice(0, 5).forEach(([name, sym, col, price, chg, up]) => {
      const r = H({ py: 13, gap: 12 });
      r.appendChild(coinDot(col, 34));
      const nc = V({ gap: 1 });
      nc.appendChild(txt(name, F.bodySemi, 13.5, "#F2F4F8"));
      nc.appendChild(txt(sym, F.mono, 11, "#5E6776"));
      r.appendChild(nc);
      fill(nc);
      const vc = V({ gap: 2, cross: "MAX" });
      vc.appendChild(txt(price, F.monoSemi, 13.5, "#F2F4F8"));
      vc.appendChild(txt(chg, F.mono, 11.5, up ? "#34D399" : "#FB7185"));
      r.appendChild(vc);
      list.appendChild(r);
      fill(r);
    });
    content.appendChild(list);
    fill(list);
  }

  // ════════════════════════════════════════════════════════
  // W4 — SEND & RECEIVE (with QR)
  // ════════════════════════════════════════════════════════
  const qrBlock = (size, dark, light) => {
    const q = figma.createFrame();
    q.name = "QR Code";
    q.resize(size, size);
    q.fills = [solid(light || "#FFFFFF")];
    q.cornerRadius = Math.round(size * 0.06);
    const m = Math.round(size / 25); // module size, 25×25 grid
    const cell = (cx, cy, w2, h2) => {
      const r = figma.createRectangle();
      r.resize(w2 * m, h2 * m);
      r.fills = [solid(dark || "#0E121B")];
      q.appendChild(r);
      r.x = cx * m; r.y = cy * m;
    };
    // finder patterns
    for (const [fx, fy] of [[2, 2], [16, 2], [2, 16]]) {
      cell(fx, fy, 7, 1); cell(fx, fy + 6, 7, 1); cell(fx, fy + 1, 1, 5); cell(fx + 6, fy + 1, 1, 5);
      cell(fx + 2, fy + 2, 3, 3);
    }
    // pseudo-random data modules (deterministic)
    let seed = 42;
    const rand = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
    for (let gy = 2; gy < 23; gy++) {
      for (let gx = 2; gx < 23; gx++) {
        const inFinder = (gx < 10 && gy < 10) || (gx > 14 && gy < 10) || (gx < 10 && gy > 14);
        if (!inFinder && rand() > 0.55) cell(gx, gy, 1, 1);
      }
    }
    return q;
  };
  {
    const content = webShell("Send & Receive · Desktop · Dark", "Send & Receive", "Wallet", null);
    const split = H({ gap: 18, cross: "MIN" });

    const send = darkCard({ p: 26, gap: 16 });
    send.name = "Send";
    const sendHead = H({ gap: 10 });
    sendHead.appendChild(iconTile("arrow-up-bold", 36));
    sendHead.appendChild(txt("Send crypto", F.disp, 18, "#F2F4F8"));
    send.appendChild(sendHead);
    const recip = inst("Input", "State=Default", "Recipient address");
    if (recip) send.appendChild(recip);
    const amount = inst("Amount Input");
    if (amount) send.appendChild(amount);
    send.appendChild(txt("Network", F.bodySemi, 12.5, "#9AA4B2"));
    const net = inst("Select");
    if (net) send.appendChild(net);
    const feeRow = H({ main: "SPACE_BETWEEN" });
    feeRow.appendChild(txt("Network fee", F.body, 12, "#9AA4B2"));
    feeRow.appendChild(txt("≈ $2.40", F.mono, 12, "#C8CFDA"));
    send.appendChild(feeRow);
    fill(feeRow);
    const sendBtn = gradBtn("Review transfer", 48);
    send.appendChild(sendBtn);
    fill(sendBtn);
    split.appendChild(send);
    fill(send);

    const recv = darkCard({ p: 26, gap: 16, cross: "CENTER" });
    recv.name = "Receive";
    const recvHead = H({ gap: 10 });
    recvHead.appendChild(iconTile("qr-code", 36, "#34D399", solid("#34D399", 0.14)));
    recvHead.appendChild(txt("Receive", F.disp, 18, "#F2F4F8"));
    recv.appendChild(recvHead);
    recv.appendChild(qrBlock(220));
    recv.appendChild(txt("Your ETH address", F.body, 12, "#5E6776"));
    const addr = H({ px: 14, py: 10, gap: 10, bg: solid("#FFFFFF", 0.04), bd: solid("#FFFFFF", 0.08), r: 10 });
    addr.appendChild(txt("0x7f3a8c92e41b06d1f2a7b29c", F.mono, 12.5, "#C8CFDA"));
    addr.appendChild(icon("copy", 15, "#9AA4B2"));
    recv.appendChild(addr);
    const shareRow = H({ gap: 10 });
    const shareBtn = outlineBtn("Share", 42);
    shareRow.appendChild(shareBtn);
    const dlBtn = outlineBtn("Save image", 42);
    shareRow.appendChild(dlBtn);
    recv.appendChild(shareRow);
    split.appendChild(recv);
    fill(recv);

    content.appendChild(split);
    fill(split);
  }

  // ════════════════════════════════════════════════════════
  // W5 — STAKING & EARN
  // ════════════════════════════════════════════════════════
  {
    const content = webShell("Staking & Earn · Desktop · Dark", "Earn", "Earn", "Stake now");
    const pools = H({ gap: 16, cross: "MIN" });
    [["Ethereum", "ETH", "#627EEA", "4.2%", "$84.2B"], ["Solana", "SOL", "#14F195", "6.4%", "$42.8B"], ["Cardano", "ADA", "#0033AD", "3.1%", "$18.4B"]].forEach(([name, sym, col, apy, tvl]) => {
      const c = darkCard({ p: 22, gap: 12 });
      const head = H({ gap: 10 });
      head.appendChild(coinDot(col, 36));
      const nc = V({ gap: 1 });
      nc.appendChild(txt(name, F.bodySemi, 14.5, "#F2F4F8"));
      nc.appendChild(txt(sym + " staking", F.mono, 11, "#5E6776"));
      head.appendChild(nc);
      fill(nc);
      head.appendChild(icon("fire-fill", 18, "#F59E0B"));
      c.appendChild(head);
      fill(head);
      const apyRow = H({ gap: 8, cross: "MAX" });
      apyRow.appendChild(txt(apy, F.disp, 34, "#34D399"));
      apyRow.appendChild(txt("APY", F.bodySemi, 12, "#5E6776"));
      c.appendChild(apyRow);
      const tvlRow = H({ main: "SPACE_BETWEEN" });
      tvlRow.appendChild(txt("TVL", F.body, 12, "#9AA4B2"));
      tvlRow.appendChild(txt(tvl, F.mono, 12, "#C8CFDA"));
      c.appendChild(tvlRow);
      fill(tvlRow);
      const pb = inst("Progress Bar");
      if (pb) { c.appendChild(pb); pb.layoutSizingHorizontal = "FILL"; }
      const btn = gradBtn("Stake " + sym, 42);
      c.appendChild(btn);
      fill(btn);
      pools.appendChild(c);
      fill(c);
    });
    content.appendChild(pools);
    fill(pools);

    const summary = darkCard({ p: 24, gap: 18 });
    summary.name = "Your staking";
    const sHead = H({ gap: 26 });
    const pc = inst("Progress Circle");
    if (pc) sHead.appendChild(pc);
    const sCol = V({ gap: 6 });
    sCol.appendChild(txt("Your staked balance", F.body, 13, "#9AA4B2"));
    sCol.appendChild(txt("$24,180.40", F.disp, 28, "#F2F4F8"));
    sCol.appendChild(changeBadge("+$412 rewards", true));
    sHead.appendChild(sCol);
    fill(sCol);
    const claim = outlineBtn("Claim rewards", 42);
    sHead.appendChild(claim);
    summary.appendChild(sHead);
    fill(sHead);
    content.appendChild(summary);
    fill(summary);
  }

  // ════════════════════════════════════════════════════════
  // W6 — TRANSACTIONS
  // ════════════════════════════════════════════════════════
  {
    const content = webShell("Transactions · Desktop · Dark", "Transactions", "History", "Export CSV");
    const filters = H({ gap: 6 });
    ["All", "Sent", "Received", "Swaps", "Staking"].forEach((l, i) => filters.appendChild(inst("Pill / Timeframe", i === 0 ? "State=Active" : "State=Inactive", l) || txt(l, F.bodySemi, 12.5, "#9AA4B2")));
    content.appendChild(filters);

    const list = darkCard({ gap: 0, p: 24 });
    list.name = "Transaction List";
    const rows = [
      ["arrow-up-bold", "#FB7185", "Sent ETH", "To 0x9f…21 · 2:41 PM", "Confirmed", "-2.50 ETH", "#F2F4F8"],
      ["arrow-down-left-fill", "#34D399", "Received USDC", "From 0x4a…8c · 11:20 AM", "Confirmed", "+1,200.00 USDC", "#34D399"],
      ["arrows-down-up-bold", "#A5ABFC", "Swapped ETH → USDC", "Uniswap · 9:04 AM", "Confirmed", "8,420.16 USDC", "#F2F4F8"],
      ["hand-coins", "#FBBF24", "Staking reward", "SOL pool · Yesterday", "Confirmed", "+4.82 SOL", "#34D399"],
      ["arrow-up-bold", "#FB7185", "Sent BTC", "To 0x77…f0 · Yesterday", "Pending", "-0.048 BTC", "#F2F4F8"],
      ["arrows-down-up-bold", "#A5ABFC", "Swap BTC → ETH", "Slippage exceeded · Mon", "Failed", "0.10 BTC", "#5E6776"],
    ];
    rows.forEach(([key, tone, title, sub, state, amt, amtCol]) => {
      const r = H({ py: 14, gap: 14 });
      const tile = H({ main: "CENTER", bg: solid(tone, 0.12), r: 11 });
      tile.resize(40, 40);
      tile.primaryAxisSizingMode = "FIXED";
      tile.counterAxisSizingMode = "FIXED";
      tile.appendChild(icon(key, 18, tone));
      r.appendChild(tile);
      const nc = V({ gap: 2 });
      nc.appendChild(txt(title, F.bodySemi, 13.5, "#F2F4F8"));
      nc.appendChild(txt(sub, F.body, 11.5, "#5E6776"));
      r.appendChild(nc);
      fill(nc);
      r.appendChild(statusBadge(state));
      const amount = txt(amt, F.monoSemi, 13.5, amtCol);
      amount.textAutoResize = "NONE";
      amount.resize(170, 18);
      amount.textAlignHorizontal = "RIGHT";
      r.appendChild(amount);
      list.appendChild(r);
      fill(r);
    });
    content.appendChild(list);
    fill(list);
    const pag = H({ gap: 6, main: "CENTER" });
    ["Arrow", "Active", "Default", "Default"].forEach((type, i) => {
      const it = inst("Pagination Item", `Type=${type}`, type === "Arrow" ? null : String(i));
      if (it) pag.appendChild(it);
    });
    content.appendChild(pag);
    fill(pag);
  }

  // ════════════════════════════════════════════════════════
  // W7 — SETTINGS & SECURITY
  // ════════════════════════════════════════════════════════
  {
    const content = webShell("Settings & Security · Desktop · Dark", "Settings", "Settings", null);
    const split = H({ gap: 18, cross: "MIN" });

    const left = V({ gap: 18 });
    left.primaryAxisSizingMode = "AUTO";
    left.counterAxisSizingMode = "FIXED";
    left.resize(360, 100);
    const profile = darkCard({ p: 24, gap: 12, cross: "CENTER" });
    profile.name = "Profile";
    profile.appendChild(avatarInst("XL"));
    profile.appendChild(txt("Alex Rivera", F.disp, 19, "#F2F4F8"));
    profile.appendChild(txt("alex@helix.finance", F.body, 12.5, "#5E6776"));
    const editBtn = outlineBtn("Edit profile", 38);
    profile.appendChild(editBtn);
    fill(editBtn);
    left.appendChild(profile);
    fill(profile);
    const tfa = darkCard({ p: 24, gap: 12, cross: "CENTER" });
    tfa.name = "2FA";
    tfa.appendChild(icon("shield-check-fill", 40, "#34D399"));
    tfa.appendChild(txt("Two-factor authentication", F.bodySemi, 14.5, "#F2F4F8"));
    const tfaTxt = txt("Protect your account with an extra verification step at sign-in.", F.body, 12.5, "#9AA4B2");
    tfaTxt.textAlignHorizontal = "CENTER";
    tfa.appendChild(tfaTxt);
    tfaTxt.layoutSizingHorizontal = "FILL";
    const tfaBtn = gradBtn("Enable 2FA", 42);
    tfa.appendChild(tfaBtn);
    fill(tfaBtn);
    left.appendChild(tfa);
    fill(tfa);
    split.appendChild(left);

    const right = darkCard({ gap: 0, p: 24 });
    right.name = "Security Settings";
    right.appendChild(txt("Security", F.bodySemi, 15, "#F2F4F8"));
    spacerV(right, 6);
    const settingRow = (key, label, sub, control) => {
      const r = H({ py: 14, gap: 14 });
      r.appendChild(iconTile(key, 38, "#9AA4B2", solid("#FFFFFF", 0.05)));
      const nc = V({ gap: 2 });
      nc.appendChild(txt(label, F.bodySemi, 13.5, "#F2F4F8"));
      nc.appendChild(txt(sub, F.body, 11.5, "#5E6776"));
      r.appendChild(nc);
      fill(nc);
      r.appendChild(control);
      right.appendChild(r);
      fill(r);
    };
    settingRow("fingerprint", "Biometric sign-in", "Use Face ID / fingerprint to unlock", inst("Toggle", "State=On") || txt("On", F.bodySemi, 12, "#34D399"));
    settingRow("bell", "Price alerts", "Push notifications for watchlist moves", inst("Toggle", "State=On") || txt("On", F.bodySemi, 12, "#34D399"));
    settingRow("moon-stars", "Dark mode", "Follow system appearance", inst("Toggle", "State=Off") || txt("Off", F.bodySemi, 12, "#9AA4B2"));
    settingRow("key", "Recovery phrase", "View or back up your seed phrase", icon("caret-right-bold", 14, "#5E6776"));
    settingRow("globe", "Currency & language", "USD · English", icon("caret-right-bold", 14, "#5E6776"));
    settingRow("sign-out", "Sign out on all devices", "Ends every active session", icon("caret-right-bold", 14, "#5E6776"));
    split.appendChild(right);
    fill(right);

    content.appendChild(split);
    fill(split);
  }

  // ════════════════════════════════════════════════════════
  // W8 — SIGN IN & 2FA
  // ════════════════════════════════════════════════════════
  {
    sectionLabel("🖥  Sign in & 2FA · Desktop · Dark");
    const root = frame("HORIZONTAL", { name: "Sign in & 2FA · Dark", bg: solid("#0A0C10"), pw: "FIXED", ch: "FIXED", main: "CENTER", cross: "CENTER", gap: 40 });
    root.resize(1440, 900);
    root.clipsContent = true;
    scrPage.appendChild(root);
    placeScreen(root, 900);
    const glow = (h, x, y, s, a) => {
      const g = figma.createEllipse();
      g.resize(s, s);
      g.fills = [solid(h, a)];
      g.effects = [{ type: "LAYER_BLUR", radius: 180, visible: true }];
      root.appendChild(g);
      g.layoutPositioning = "ABSOLUTE";
      g.x = x; g.y = y;
    };
    glow("#6366F1", 120, -160, 560, 0.4);
    glow("#8B5CF6", 900, 520, 620, 0.35);

    const card = V({ p: 36, gap: 16, cross: "CENTER", bg: solid("#12151C"), bd: solid("#FFFFFF", 0.08), r: 22 });
    card.name = "Sign in";
    card.counterAxisSizingMode = "FIXED";
    card.resize(420, 100);
    const logo = H({ main: "CENTER", bg: ACCENT_GRAD, r: 14 });
    logo.resize(52, 52);
    logo.primaryAxisSizingMode = "FIXED";
    logo.counterAxisSizingMode = "FIXED";
    logo.appendChild(vec(24, 26, "M 7 1 C 16 7 16 10 7 14 C -2 18 -2 21 7 25 M 17 1 C 8 7 8 10 17 14 C 26 18 26 21 17 25", "#FFFFFF", 2.6));
    card.appendChild(logo);
    card.appendChild(txt("Welcome back", F.disp, 24, "#F2F4F8"));
    card.appendChild(txt("Sign in to your Helix account", F.body, 13, "#9AA4B2"));
    spacerV(card, 4);
    const email = inst("Input", "State=Default", "Email");
    if (email) { card.appendChild(email); email.layoutSizingHorizontal = "FILL"; }
    const pass = inst("Input", "State=Focus", "Password");
    if (pass) { card.appendChild(pass); pass.layoutSizingHorizontal = "FILL"; }
    const signBtn = gradBtn("Sign in", 48);
    card.appendChild(signBtn);
    fill(signBtn);
    const passkey = outlineBtn("Continue with passkey", 48);
    card.appendChild(passkey);
    fill(passkey);
    card.appendChild(txt("No account?  Create one →", F.bodyMed, 12.5, "#A5ABFC"));
    root.appendChild(card);

    const tfa = V({ p: 36, gap: 16, cross: "CENTER", bg: solid("#12151C"), bd: solid("#FFFFFF", 0.08), r: 22 });
    tfa.name = "2FA Code";
    tfa.counterAxisSizingMode = "FIXED";
    tfa.resize(420, 100);
    tfa.appendChild(iconTile("shield-check", 52, "#34D399", solid("#34D399", 0.14)));
    tfa.appendChild(txt("Enter your code", F.disp, 22, "#F2F4F8"));
    const tfaSub = txt("We sent a 6-digit code to your authenticator app.", F.body, 12.5, "#9AA4B2");
    tfaSub.textAlignHorizontal = "CENTER";
    tfa.appendChild(tfaSub);
    tfaSub.layoutSizingHorizontal = "FILL";
    const codeRow = H({ gap: 10 });
    ["8", "2", "4", "0", "", ""].forEach((d, i) => {
      const box = H({ main: "CENTER", bg: solid("#FFFFFF", 0.04), bd: i === 4 ? solid("#6366F1") : solid("#FFFFFF", 0.1), r: 11, bw: i === 4 ? 1.5 : 1 });
      box.resize(48, 56);
      box.primaryAxisSizingMode = "FIXED";
      box.counterAxisSizingMode = "FIXED";
      if (d) box.appendChild(txt(d, F.monoSemi, 22, "#F2F4F8"));
      codeRow.appendChild(box);
    });
    tfa.appendChild(codeRow);
    const verify = gradBtn("Verify", 48);
    tfa.appendChild(verify);
    fill(verify);
    tfa.appendChild(txt("Resend code · 00:42", F.mono, 12, "#5E6776"));
    root.appendChild(tfa);
  }

  // ════════════════════════════════════════════════════════
  // W9 — NFT DETAIL
  // ════════════════════════════════════════════════════════
  {
    sectionLabel("🖥  NFT Detail · Desktop · Dark");
    const root = V({ name: "NFT Detail · Dark", bg: solid("#0B0E13"), pw: "FIXED", ch: "FIXED", px: 28, py: 24, gap: 22 });
    root.resize(1440, 900);
    root.clipsContent = true;
    scrPage.appendChild(root);
    placeScreen(root, 900);

    const top = H({ gap: 18 });
    const back = H({ px: 13, py: 8, gap: 8, bg: solid("#FFFFFF", 0.04), bd: solid("#FFFFFF", 0.08), r: 10 });
    back.appendChild(icon("caret-left-bold", 13, "#C8CFDA"));
    back.appendChild(txt("Back to marketplace", F.bodyMed, 12.5, "#C8CFDA"));
    top.appendChild(back);
    const topSpace = figma.createFrame(); topSpace.fills = [];
    top.appendChild(topSpace); fill(topSpace);
    top.appendChild(gradBtn("Connect", 38));
    top.appendChild(avatarInst("MD"));
    root.appendChild(top);
    fill(top);

    const split = H({ gap: 26, cross: "MIN" });
    const art = frame("VERTICAL", { name: "Artwork", main: "MAX", cross: "MAX", p: 18, bg: grad135("#4338CA", "#0E1117"), r: 22 });
    art.primaryAxisSizingMode = "FIXED";
    art.counterAxisSizingMode = "FIXED";
    art.resize(560, 560);
    const likes = H({ px: 10, py: 6, gap: 5, bg: solid("#0A0C10", 0.7), r: 999 });
    likes.appendChild(icon("heart-fill", 13, "#FB7185"));
    likes.appendChild(txt("128", F.bodySemi, 11.5, "#FFFFFF"));
    art.appendChild(likes);
    split.appendChild(art);

    const info = V({ gap: 14 });
    const colRow = H({ gap: 6 });
    colRow.appendChild(txt("Nebula Genesis", F.bodyMed, 13.5, "#A5ABFC"));
    colRow.appendChild(icon("seal-check-fill", 15, "#38BDF8"));
    info.appendChild(colRow);
    info.appendChild(txt("Astral #2847", F.disp, 38, "#F2F4F8"));
    const owner = H({ gap: 10 });
    owner.appendChild(avatarInst("SM"));
    const oc = V({ gap: 0 });
    oc.appendChild(txt("Owned by", F.body, 10.5, "#5E6776"));
    oc.appendChild(txt("0x7f3a…b29c", F.mono, 12.5, "#C8CFDA"));
    owner.appendChild(oc);
    info.appendChild(owner);
    const priceCard = darkCard({ p: 22, gap: 12 });
    priceCard.name = "Price";
    priceCard.appendChild(txt("Current bid", F.body, 12, "#9AA4B2"));
    const pr = H({ gap: 10, cross: "MAX" });
    pr.appendChild(coinDot("#627EEA", 26));
    pr.appendChild(txt("2.40 ETH", F.monoSemi, 30, "#F2F4F8"));
    pr.appendChild(txt("≈ $8,090", F.body, 13, "#5E6776"));
    priceCard.appendChild(pr);
    const btnRow = H({ gap: 10 });
    const buyBtn = gradBtn("Buy now", 48);
    btnRow.appendChild(buyBtn);
    fill(buyBtn);
    const bidBtn = outlineBtn("Place bid", 48);
    btnRow.appendChild(bidBtn);
    fill(bidBtn);
    priceCard.appendChild(btnRow);
    fill(btnRow);
    const endsRow = H({ gap: 8 });
    endsRow.appendChild(icon("clock-counter-clockwise", 15, "#5E6776"));
    endsRow.appendChild(txt("Auction ends in 06:42:18", F.mono, 12, "#9AA4B2"));
    priceCard.appendChild(endsRow);
    info.appendChild(priceCard);
    info.children[info.children.length - 1].layoutSizingHorizontal = "FILL";

    info.appendChild(txt("Attributes", F.bodySemi, 14, "#F2F4F8"));
    const attrs = H({ gap: 10 });
    [["BACKGROUND", "Deep space"], ["BODY", "Aurora"], ["EYES", "Nova"], ["RARITY", "Top 2%"]].forEach(([k, v]) => {
      const a = V({ px: 16, py: 12, gap: 3, bg: solid("#6366F1", 0.08), bd: solid("#6366F1", 0.22), r: 12 });
      a.appendChild(txt(k, F.mono, 9.5, "#A5ABFC"));
      a.appendChild(txt(v, F.bodySemi, 13, "#F2F4F8"));
      attrs.appendChild(a);
    });
    info.appendChild(attrs);
    split.appendChild(info);
    fill(info);
    root.appendChild(split);
    fill(split);
  }

  // ════════════════════════════════════════════════════════
  // MOBILE — Wallet · Receive QR · NFT Gallery · Profile
  // ════════════════════════════════════════════════════════
  sectionLabel("📱  Mobile · Wallet / Receive QR / NFT Gallery / Profile");
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
  };
  const phone = (name, x) => {
    const p = V({ name, pw: "FIXED", ch: "FIXED", bg: solid("#0B0E13") });
    p.resize(390, 844);
    p.cornerRadius = 40;
    p.clipsContent = true;
    scrPage.appendChild(p);
    p.x = x; p.y = yMobile;
    statusBar(p);
    return p;
  };
  const bottomNav = (parent, activeIdx) => {
    const navSpace = figma.createFrame(); navSpace.fills = [];
    parent.appendChild(navSpace);
    navSpace.layoutSizingVertical = "FILL";
    const nav = H({ px: 30, py: 16, main: "SPACE_BETWEEN", bg: solid("#12151C"), bd: solid("#FFFFFF", 0.06) });
    nav.name = "Bottom Nav";
    ["house-fill", "chart-line-up", "image-square", "wallet"].forEach((k, i) => nav.appendChild(icon(k, 21, i === activeIdx ? "#6366F1" : "#5E6776")));
    parent.appendChild(nav);
    fill(nav);
  };
  const iconCircleBtn = (key, s) => {
    const w = H({ main: "CENTER", bg: solid("#FFFFFF", 0.05), r: 999 });
    w.resize(s, s);
    w.primaryAxisSizingMode = "FIXED";
    w.counterAxisSizingMode = "FIXED";
    w.appendChild(icon(key, Math.round(s * 0.48), "#C8CFDA"));
    return w;
  };

  // M1 — Mobile Wallet
  {
    const p = phone("Mobile · Wallet", 0);
    const content = V({ px: 20, py: 14, gap: 16 });
    p.appendChild(content);
    fill(content);
    const head = H({ main: "SPACE_BETWEEN" });
    head.appendChild(txt("Wallet", F.disp, 19, "#F2F4F8"));
    head.appendChild(iconCircleBtn("gear-six", 36));
    content.appendChild(head);
    fill(head);
    const addr = H({ px: 12, py: 8, gap: 8, bg: solid("#FFFFFF", 0.04), bd: solid("#FFFFFF", 0.08), r: 999 });
    addr.appendChild(coinDot("#34D399", 7));
    addr.appendChild(txt("0x7f3a…b29c", F.mono, 12, "#C8CFDA"));
    addr.appendChild(icon("copy", 13, "#5E6776"));
    content.appendChild(addr);
    content.appendChild(txt("$128,540.20", F.disp, 34, "#F2F4F8"));
    content.appendChild(changeBadge("+12.4% all time", true));
    const acts = H({ main: "SPACE_BETWEEN" });
    [["Send", "arrow-up-bold"], ["Receive", "arrow-down-bold"], ["Swap", "arrows-down-up-bold"], ["Buy", "plus-bold"]].forEach(([label, key]) => {
      const a = V({ gap: 6, cross: "CENTER" });
      a.appendChild(iconTile(key, 46, "#6366F1", solid("#FFFFFF", 0.05)));
      a.appendChild(txt(label, F.body, 10.5, "#9AA4B2"));
      acts.appendChild(a);
    });
    content.appendChild(acts);
    fill(acts);
    content.appendChild(txt("Tokens", F.bodySemi, 14, "#F2F4F8"));
    COINS.slice(0, 4).forEach(([name, sym, col, price, chg, up]) => {
      const r = H({ gap: 11 });
      r.appendChild(coinDot(col, 34));
      const nc = V({ gap: 1 });
      nc.appendChild(txt(name, F.bodySemi, 13, "#F2F4F8"));
      nc.appendChild(txt(sym, F.mono, 11, "#5E6776"));
      r.appendChild(nc);
      fill(nc);
      const vc = V({ gap: 1, cross: "MAX" });
      vc.appendChild(txt(price, F.monoSemi, 13, "#F2F4F8"));
      vc.appendChild(txt(chg, F.mono, 11, up ? "#34D399" : "#FB7185"));
      r.appendChild(vc);
      content.appendChild(r);
      fill(r);
    });
    bottomNav(content, 3);
  }

  // M2 — Receive (QR)
  {
    const p = phone("Mobile · Receive QR", 470);
    const content = V({ px: 20, py: 14, gap: 18, cross: "CENTER" });
    p.appendChild(content);
    fill(content);
    const head = H({ main: "SPACE_BETWEEN" });
    const backB = iconCircleBtn("caret-left-bold", 36);
    head.appendChild(backB);
    head.appendChild(txt("Receive", F.disp, 17, "#F2F4F8"));
    head.appendChild(iconCircleBtn("share-network", 36));
    content.appendChild(head);
    fill(head);
    spacerV(content, 8);
    const token = H({ px: 12, py: 8, gap: 8, bg: solid("#FFFFFF", 0.05), r: 999 });
    token.appendChild(coinDot("#627EEA", 20));
    token.appendChild(txt("Ethereum · ERC-20", F.bodySemi, 12.5, "#F2F4F8"));
    token.appendChild(icon("caret-down-bold", 11, "#9AA4B2"));
    content.appendChild(token);
    content.appendChild(qrBlock(240));
    content.appendChild(txt("Scan to receive ETH", F.body, 12.5, "#9AA4B2"));
    const addr = H({ px: 14, py: 11, gap: 10, bg: solid("#FFFFFF", 0.04), bd: solid("#FFFFFF", 0.08), r: 12 });
    addr.appendChild(txt("0x7f3a8c92e41b06d1f2a7b29c", F.mono, 11.5, "#C8CFDA"));
    addr.appendChild(icon("copy", 14, "#A5ABFC"));
    content.appendChild(addr);
    const warn = H({ px: 13, py: 10, gap: 8, bg: solid("#F59E0B", 0.09), bd: solid("#F59E0B", 0.22), r: 11 });
    warn.appendChild(icon("warning-fill", 15, "#FBBF24"));
    const wt = txt("Only send Ethereum assets to this address.", F.body, 11, "#FEF3C7");
    warn.appendChild(wt);
    fill(wt);
    content.appendChild(warn);
    fill(warn);
    const navSpace = figma.createFrame(); navSpace.fills = [];
    content.appendChild(navSpace);
    navSpace.layoutSizingVertical = "FILL";
    const share = gradBtn("Share address", 50);
    content.appendChild(share);
    fill(share);
  }

  // M3 — NFT Gallery
  {
    const p = phone("Mobile · NFT Gallery", 940);
    const content = V({ px: 20, py: 14, gap: 14 });
    p.appendChild(content);
    fill(content);
    const head = H({ main: "SPACE_BETWEEN" });
    head.appendChild(txt("My NFTs", F.disp, 19, "#F2F4F8"));
    head.appendChild(iconCircleBtn("funnel", 36));
    content.appendChild(head);
    fill(head);
    const chips = H({ gap: 6 });
    ["All", "Art", "PFP", "Gaming"].forEach((l, i) => chips.appendChild(inst("Pill / Timeframe", i === 0 ? "State=Active" : "State=Inactive", l) || txt(l, F.bodySemi, 12, "#9AA4B2")));
    content.appendChild(chips);
    const nfts = [
      ["Astral #2847", "2.40", "#4338CA"], ["Flow #009", "3.30", "#8B5CF6"],
      ["Ray #66", "1.90", "#F7931A"], ["Pal #7780", "0.85", "#F43F5E"],
    ];
    for (let row = 0; row < 2; row++) {
      const grid = H({ gap: 12, cross: "MIN" });
      for (let i = 0; i < 2; i++) {
        const [name, pr, tone] = nfts[row * 2 + i];
        const card = V({ bg: solid("#12151C"), bd: solid("#FFFFFF", 0.07), r: 14 });
        card.clipsContent = true;
        const img = figma.createRectangle();
        img.resize(160, 140);
        img.fills = [grad135(tone, "#12151C")];
        card.appendChild(img);
        img.layoutSizingHorizontal = "FILL";
        const body = V({ p: 11, gap: 5 });
        body.appendChild(txt(name, F.bodySemi, 12.5, "#F2F4F8"));
        const prRow = H({ gap: 5 });
        prRow.appendChild(coinDot("#627EEA", 13));
        prRow.appendChild(txt(pr + " ETH", F.monoSemi, 11.5, "#C8CFDA"));
        body.appendChild(prRow);
        card.appendChild(body);
        fill(body);
        grid.appendChild(card);
        fill(card);
      }
      content.appendChild(grid);
      fill(grid);
    }
    bottomNav(content, 2);
  }

  // M4 — Profile & Settings
  {
    const p = phone("Mobile · Profile", 1410);
    const content = V({ px: 20, py: 14, gap: 14, cross: "CENTER" });
    p.appendChild(content);
    fill(content);
    content.appendChild(avatarInst("XL"));
    content.appendChild(txt("Alex Rivera", F.disp, 20, "#F2F4F8"));
    content.appendChild(txt("alex@helix.finance · Pro", F.body, 12, "#5E6776"));
    const stats = H({ gap: 10 });
    [["Assets", "12"], ["NFTs", "8"], ["Staking", "3"]].forEach(([l, v]) => {
      const s = V({ px: 20, py: 10, gap: 2, cross: "CENTER", bg: solid("#FFFFFF", 0.04), r: 12 });
      s.appendChild(txt(v, F.disp, 17, "#F2F4F8"));
      s.appendChild(txt(l, F.body, 10.5, "#5E6776"));
      stats.appendChild(s);
      fill(s);
    });
    content.appendChild(stats);
    fill(stats);
    spacerV(content, 4);
    const rowItem = (key, label, control) => {
      const r = H({ py: 11, gap: 12 });
      r.appendChild(iconTile(key, 36, "#9AA4B2", solid("#FFFFFF", 0.05)));
      const t = txt(label, F.bodyMed, 13.5, "#F2F4F8");
      r.appendChild(t);
      fill(t);
      r.appendChild(control);
      content.appendChild(r);
      fill(r);
    };
    rowItem("shield-check", "Security & 2FA", icon("caret-right-bold", 13, "#5E6776"));
    rowItem("bell", "Notifications", inst("Toggle", "State=On") || txt("On", F.bodySemi, 12, "#34D399"));
    rowItem("fingerprint", "Biometric unlock", inst("Toggle", "State=On") || txt("On", F.bodySemi, 12, "#34D399"));
    rowItem("globe", "Currency · USD", icon("caret-right-bold", 13, "#5E6776"));
    rowItem("translate", "Language · English", icon("caret-right-bold", 13, "#5E6776"));
    rowItem("question", "Help & support", icon("caret-right-bold", 13, "#5E6776"));
    const out = H({ py: 11, gap: 12 });
    out.appendChild(iconTile("sign-out", 36, "#FB7185", solid("#FB7185", 0.1)));
    out.appendChild(txt("Sign out", F.bodyMed, 13.5, "#FB7185"));
    content.appendChild(out);
    fill(out);
    bottomNav(content, 0);
  }

  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
  figma.closePlugin("✅ Helix extra screens: Markets, Asset Detail, Wallet, Send & Receive, Staking, Transactions, Settings, Sign in & 2FA, NFT Detail + 4 mobile — 20 screens total");
})();
