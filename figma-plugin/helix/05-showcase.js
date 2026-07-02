// ============================================================
// HELIX CRYPTO UI KIT — Part 5: Showcase boards
// Run AFTER 04. Adds PrimeOne-style presentation boards to the
// Cover page: What's inside · Component wall · Screens index ·
// Icon & coin library · Changelog + License.
// All component previews are LIVE INSTANCES of the library.
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
    mono:     await pickFont("JetBrains Mono", ["Regular"]),
    monoMed:  await pickFont("JetBrains Mono", ["Medium", "Regular"]),
    monoSemi: await pickFont("JetBrains Mono", ["SemiBold", "Semi Bold", "Bold"]),
  };

  const txt = (chars, font, size, colorHex, o) => {
    const t = figma.createText();
    t.fontName = font;
    t.fontSize = size;
    if (o && o.ls) t.letterSpacing = { value: o.ls, unit: "PERCENT" };
    t.characters = chars;
    t.fills = [solid(colorHex, o && o.op)];
    return t;
  };
  const frame = (dir, o) => {
    o = o || {};
    const n = figma.createFrame();
    n.layoutMode = dir;
    n.primaryAxisSizingMode = "AUTO";
    n.counterAxisSizingMode = "AUTO";
    n.primaryAxisAlignItems = o.main || "MIN";
    n.counterAxisAlignItems = o.cross || (dir === "HORIZONTAL" ? "CENTER" : "MIN");
    n.itemSpacing = o.gap || 0;
    n.paddingLeft = n.paddingRight = o.px !== undefined ? o.px : (o.p || 0);
    n.paddingTop = n.paddingBottom = o.py !== undefined ? o.py : (o.p || 0);
    n.fills = o.bg ? [o.bg] : [];
    if (o.r) n.cornerRadius = o.r;
    if (o.bd) { n.strokes = [o.bd]; n.strokeWeight = o.bw || 1; }
    if (o.name) n.name = o.name;
    return n;
  };
  const H = (o) => frame("HORIZONTAL", o);
  const V = (o) => frame("VERTICAL", o);
  const fillW = (n) => { n.layoutSizingHorizontal = "FILL"; return n; };
  const icon = (key, size, colorHex, opacity) => {
    const svg = (typeof HELIX_ICONS !== "undefined" && HELIX_ICONS[key]) ? HELIX_ICONS[key] : null;
    if (!svg) { const e = figma.createEllipse(); e.resize(size, size); e.fills = [solid(colorHex, opacity)]; return e; }
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
  const coinLogo = (slug, size) => {
    const svg = (typeof HELIX_COINS !== "undefined" && HELIX_COINS[slug]) ? HELIX_COINS[slug] : null;
    if (!svg) { const e = figma.createEllipse(); e.resize(size, size); e.fills = [solid("#3F4656")]; return e; }
    const node = figma.createNodeFromSvg(svg.replace("<svg ", `<svg width="${size}" height="${size}" `));
    node.name = "coin/" + slug;
    node.fills = [];
    return node;
  };
  const compPages = figma.root.children.filter((p) => /Components/.test(p.name));
  const setCache = {};
  const findSet = (setName) => {
    for (const pg of compPages) {
      const direct = pg.children.find((n) => n.name === setName);
      if (direct) return direct;
      for (const sec of pg.children) {
        if (sec.children) {
          const hit = sec.children.find((n) => n.name === setName);
          if (hit) return hit;
        }
      }
    }
    return null;
  };
  const inst = (setName, variantName, textOverride) => {
    if (!(setName in setCache)) setCache[setName] = findSet(setName);
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
  async function gotoPage(p) {
    if (figma.setCurrentPageAsync) { try { await figma.setCurrentPageAsync(p); return; } catch (e) {} }
    try { figma.currentPage = p; } catch (e) {}
  }

  const coverPage = figma.root.children.find((p) => /Cover/.test(p.name)) || figma.currentPage;
  await gotoPage(coverPage);
  let yCursor = 0;
  for (const ch of coverPage.children) yCursor = Math.max(yCursor, ch.y + ch.height + 160);

  const BOARD_W = 1600;
  const placeBoard = (node, title) => {
    coverPage.appendChild(node);
    if (figma.createSection) {
      const s = figma.createSection();
      s.name = title;
      coverPage.appendChild(s);
      s.x = 0; s.y = yCursor;
      s.resizeWithoutConstraints(node.width + 120, node.height + 120);
      s.appendChild(node);
      node.x = 60; node.y = 60;
      yCursor += node.height + 120 + 100;
    } else {
      node.x = 0; node.y = yCursor;
      yCursor += node.height + 160;
    }
  };
  const board = (name, opts) => {
    const b = V({ name, p: 80, gap: 44, bg: solid((opts && opts.bg) || "#0A0C10"), r: 28, ...(opts || {}) });
    b.counterAxisSizingMode = "FIXED";
    b.resize(BOARD_W, 100);
    b.primaryAxisSizingMode = "AUTO";
    b.clipsContent = true;
    return b;
  };
  const boardHeader = (b, kicker, title, sub) => {
    const head = V({ gap: 14 });
    head.appendChild(txt(kicker, F.monoMed, 12, "#6366F1", { ls: 16 }));
    head.appendChild(txt(title, F.disp, 44, "#F2F4F8", { ls: -3 }));
    if (sub) {
      const s = txt(sub, F.body, 16, "#9AA4B2");
      head.appendChild(s);
    }
    b.appendChild(head);
    fillW(head);
  };
  const glow = (parent, h, x, y, s, a) => {
    const g = figma.createEllipse();
    g.resize(s, s);
    g.fills = [solid(h, a)];
    g.effects = [{ type: "LAYER_BLUR", radius: 200, visible: true }];
    parent.appendChild(g);
    g.layoutPositioning = "ABSOLUTE";
    g.x = x; g.y = y;
  };

  // ════════════════════════════════════════════════════════
  // BOARD 1 — WHAT'S INSIDE
  // ════════════════════════════════════════════════════════
  {
    const b = board("What's inside");
    glow(b, "#6366F1", -120, -160, 620, 0.35);
    glow(b, "#8B5CF6", 1100, 400, 680, 0.3);
    boardHeader(b, "01 / OVERVIEW", "Everything you need to ship a crypto product.",
      "A complete, token-driven design system for exchanges, wallets, DeFi dashboards and NFT marketplaces.");

    const stats = H({ gap: 16 });
    [["34", "Component sets"], ["20", "Screens"], ["70+", "Icons"], ["12", "Coin logos"], ["60+", "Variables"], ["2", "Light & Dark"]].forEach(([v, l]) => {
      const tile = V({ p: 24, gap: 4, bg: solid("#FFFFFF", 0.04), bd: solid("#FFFFFF", 0.08), r: 18 });
      const num = txt(v, F.disp, 40, "#F2F4F8", { ls: -2 });
      tile.appendChild(num);
      tile.appendChild(txt(l, F.body, 13, "#9AA4B2"));
      stats.appendChild(tile);
      fillW(tile);
    });
    b.appendChild(stats);
    fillW(stats);

    const feats = H({ gap: 14 });
    [["stack-like", "coins", "100% Auto Layout", "Resize and nest without breakage"],
     ["vars", "moon-stars", "Variables & Modes", "Recolor the whole kit from tokens"],
     ["type", "eye", "Text styles linked", "Every layer inspects clean"],
     ["icons", "lightning-fill", "Real assets", "Phosphor icons + MIT coin logos"]].forEach(([k, ic, tTitle, tSub]) => {
      const f = H({ p: 20, gap: 14, bg: solid("#FFFFFF", 0.03), bd: solid("#FFFFFF", 0.07), r: 16 });
      const tile = H({ main: "CENTER", bg: solid("#6366F1", 0.14), r: 12 });
      tile.resize(44, 44);
      tile.primaryAxisSizingMode = "FIXED";
      tile.counterAxisSizingMode = "FIXED";
      tile.appendChild(icon(ic, 22, "#A5ABFC"));
      f.appendChild(tile);
      const col = V({ gap: 2 });
      col.appendChild(txt(tTitle, F.bodySemi, 14.5, "#F2F4F8"));
      col.appendChild(txt(tSub, F.body, 12, "#9AA4B2"));
      f.appendChild(col);
      fillW(col);
      feats.appendChild(f);
      fillW(f);
    });
    b.appendChild(feats);
    fillW(feats);
    placeBoard(b, "✨ Showcase · What's inside");
  }

  // ════════════════════════════════════════════════════════
  // BOARD 2 — COMPONENT WALL (live instances)
  // ════════════════════════════════════════════════════════
  {
    const b = board("Component wall");
    glow(b, "#6366F1", 500, -200, 700, 0.3);
    glow(b, "#22D3EE", 1200, 700, 500, 0.18);
    boardHeader(b, "02 / COMPONENTS", "One library. Every state.",
      "A live collage — everything below is an instance of the component library.");

    const wall = H({ gap: 24, cross: "MIN" });
    const col1 = V({ gap: 20 });
    const col2 = V({ gap: 20 });
    const col3 = V({ gap: 20 });
    const add = (col, node) => { if (node) col.appendChild(node); };

    const btnRow = H({ gap: 12 });
    add(btnRow, inst("Button", "Type=Primary, Size=MD, State=Default", "Connect Wallet"));
    add(btnRow, inst("Button", "Type=Secondary, Size=MD, State=Default", "Secondary"));
    col1.appendChild(btnRow);
    const btnRow2 = H({ gap: 12 });
    add(btnRow2, inst("Button", "Type=Outline, Size=SM, State=Default", "Outline"));
    add(btnRow2, inst("Button", "Type=Danger, Size=SM, State=Default", "Danger"));
    add(btnRow2, inst("Button", "Type=Primary, Size=SM, State=Loading", "Loading"));
    col1.appendChild(btnRow2);
    add(col1, inst("Input", "State=Focus"));
    add(col1, inst("Amount Input"));
    const selRow = H({ gap: 12 });
    add(selRow, inst("Toggle", "State=On"));
    add(selRow, inst("Checkbox", "State=Checked"));
    add(selRow, inst("Radio", "State=Selected"));
    col1.appendChild(selRow);
    add(col1, inst("Segmented Control"));
    add(col1, inst("Alert", "Tone=Success"));
    add(col1, inst("Alert", "Tone=Danger"));

    add(col2, inst("Wallet Card"));
    add(col2, inst("Coin Card", "Trend=Up"));
    add(col2, inst("Stat Card"));
    add(col2, inst("Toast"));

    const badgeRow = H({ gap: 10 });
    add(badgeRow, inst("Badge / Status", "Status=Confirmed"));
    add(badgeRow, inst("Badge / Status", "Status=Pending"));
    add(badgeRow, inst("Badge / Change", "Direction=Up"));
    col3.appendChild(badgeRow);
    const badgeRow2 = H({ gap: 10 });
    add(badgeRow2, inst("Badge / Special", "Type=New"));
    add(badgeRow2, inst("Badge / Special", "Type=Verified"));
    add(badgeRow2, inst("Chip / Chain", "Chain=Ethereum"));
    col3.appendChild(badgeRow2);
    add(col3, inst("Avatar Group"));
    add(col3, inst("Donut Chart"));
    add(col3, inst("Progress Bar"));
    const progRow = H({ gap: 16 });
    add(progRow, inst("Progress Circle"));
    add(progRow, inst("Stepper"));
    col3.appendChild(progRow);
    const pagRow = H({ gap: 6 });
    ["Arrow", "Active", "Default", "Default"].forEach((type, i) => add(pagRow, inst("Pagination Item", `Type=${type}`, type === "Arrow" ? null : String(i))));
    col3.appendChild(pagRow);

    wall.appendChild(col1);
    wall.appendChild(col2);
    wall.appendChild(col3);
    b.appendChild(wall);
    fillW(wall);
    fillW(col1); fillW(col2); fillW(col3);
    placeBoard(b, "✨ Showcase · Component wall");
  }

  // ════════════════════════════════════════════════════════
  // BOARD 3 — 20 SCREENS INDEX
  // ════════════════════════════════════════════════════════
  {
    const b = board("Screens index");
    boardHeader(b, "03 / SCREENS", "20 production-ready screens.",
      "Trading terminals, portfolios, wallets, NFT marketplaces and onboarding — desktop and mobile.");
    const screens = [
      ["chart-bar", "Trading Terminal", "Web"], ["squares-four", "Portfolio Dashboard", "Web"],
      ["chart-line-up", "Markets Overview", "Web"], ["wallet", "Asset Detail", "Web"],
      ["image-square", "NFT Marketplace", "Web"], ["heart-fill", "NFT Detail", "Web"],
      ["wallet-fill", "Wallet & Balances", "Web"], ["paper-plane-tilt", "Send & Receive", "Web"],
      ["hand-coins", "Staking & Earn", "Web"], ["clock-counter-clockwise", "Transactions", "Web"],
      ["shield-check", "Settings & Security", "Web"], ["fingerprint", "Sign in & 2FA", "Web"],
      ["rocket-launch", "Onboarding", "iOS"], ["house-fill", "Mobile Portfolio", "iOS"],
      ["coins", "Coin Detail", "iOS"], ["arrows-down-up-bold", "Swap", "iOS"],
      ["wallet", "Mobile Wallet", "iOS"], ["qr-code", "Receive (QR)", "iOS"],
      ["image-square", "NFT Gallery", "iOS"], ["user-circle", "Profile & Settings", "iOS"],
    ];
    for (let row = 0; row < 5; row++) {
      const grid = H({ gap: 14 });
      for (let i = 0; i < 4; i++) {
        const [ic, nm, pf] = screens[row * 4 + i];
        const cell = H({ p: 16, gap: 12, bg: solid("#FFFFFF", 0.025), bd: solid("#FFFFFF", 0.06), r: 14 });
        const tile = H({ main: "CENTER", bg: solid("#6366F1", 0.12), r: 11 });
        tile.resize(40, 40);
        tile.primaryAxisSizingMode = "FIXED";
        tile.counterAxisSizingMode = "FIXED";
        tile.appendChild(icon(ic, 20, "#A5ABFC"));
        cell.appendChild(tile);
        const col = V({ gap: 2 });
        col.appendChild(txt(nm, F.bodySemi, 13.5, "#F2F4F8"));
        col.appendChild(txt(pf, F.mono, 10.5, "#5E6776"));
        cell.appendChild(col);
        fillW(col);
        grid.appendChild(cell);
        fillW(cell);
      }
      b.appendChild(grid);
      fillW(grid);
    }
    placeBoard(b, "✨ Showcase · Screens index");
  }

  // ════════════════════════════════════════════════════════
  // BOARD 4 — ICON & COIN LIBRARY
  // ════════════════════════════════════════════════════════
  {
    const b = board("Icon library");
    boardHeader(b, "04 / ASSETS", "70+ icons · 12 coin logos.",
      "Phosphor icons (MIT) and cryptocurrency-icons coin logos (MIT) — resale-safe, already embedded.");
    if (typeof HELIX_ICONS !== "undefined") {
      const keys = Object.keys(HELIX_ICONS);
      for (let row = 0; row * 14 < keys.length; row++) {
        const grid = H({ gap: 10 });
        for (const key of keys.slice(row * 14, row * 14 + 14)) {
          const cell = H({ main: "CENTER", bg: solid("#FFFFFF", 0.03), bd: solid("#FFFFFF", 0.06), r: 12 });
          cell.resize(92, 64);
          cell.primaryAxisSizingMode = "FIXED";
          cell.counterAxisSizingMode = "FIXED";
          cell.appendChild(icon(key, 24, "#C8CFDA"));
          grid.appendChild(cell);
        }
        b.appendChild(grid);
      }
    }
    if (typeof HELIX_COINS !== "undefined") {
      const coinsRow = H({ gap: 10 });
      for (const slug of Object.keys(HELIX_COINS)) {
        const cell = V({ p: 14, gap: 8, cross: "CENTER", bg: solid("#FFFFFF", 0.03), bd: solid("#FFFFFF", 0.06), r: 12 });
        cell.appendChild(coinLogo(slug, 34));
        cell.appendChild(txt(slug.toUpperCase(), F.mono, 10.5, "#9AA4B2"));
        coinsRow.appendChild(cell);
        fillW(cell);
      }
      b.appendChild(coinsRow);
      fillW(coinsRow);
    }
    placeBoard(b, "✨ Showcase · Icon & coin library");
  }

  // ════════════════════════════════════════════════════════
  // BOARD 5 — CHANGELOG & LICENSE
  // ════════════════════════════════════════════════════════
  {
    const b = board("Changelog & license");
    boardHeader(b, "05 / RELEASE", "Changelog, license & support.");
    const split = H({ gap: 22, cross: "MIN" });

    const change = V({ p: 28, gap: 16, bg: solid("#FFFFFF", 0.03), bd: solid("#FFFFFF", 0.07), r: 18 });
    change.appendChild(txt("Changelog", F.bodySemi, 16, "#F2F4F8"));
    const rel = H({ gap: 10 });
    const vTag = H({ px: 10, py: 4, bg: solid("#6366F1", 0.16), r: 8 });
    vTag.appendChild(txt("v1.0", F.monoSemi, 12, "#A5ABFC"));
    rel.appendChild(vTag);
    rel.appendChild(txt("Initial release", F.bodySemi, 13.5, "#C8CFDA"));
    change.appendChild(rel);
    [["34 component sets with variants, Auto Layout and descriptions"],
     ["20 screens (12 web · 8 mobile) built from instances"],
     ["Design tokens: Variables + paint / text / effect styles"],
     ["70+ Phosphor icons and 12 coin logos embedded"]].forEach(([line]) => {
      const li = H({ gap: 9, cross: "MIN" });
      li.appendChild(icon("check-bold", 13, "#34D399"));
      const t = txt(line, F.body, 13, "#9AA4B2");
      li.appendChild(t);
      fillW(t);
      change.appendChild(li);
      fillW(li);
    });
    split.appendChild(change);
    fillW(change);

    const lic = V({ p: 28, gap: 14, bg: solid("#FFFFFF", 0.03), bd: solid("#FFFFFF", 0.07), r: 18 });
    lic.appendChild(txt("License", F.bodySemi, 16, "#F2F4F8"));
    [["Standard", "Unlimited personal & client projects"],
     ["Extended", "Use in end products for sale"]].forEach(([nm, desc]) => {
      const row = H({ gap: 10 });
      const tag = H({ px: 10, py: 4, bg: solid("#FFFFFF", 0.06), r: 8 });
      tag.appendChild(txt(nm, F.monoSemi, 11.5, "#C8CFDA"));
      row.appendChild(tag);
      const d = txt(desc, F.body, 13, "#9AA4B2");
      row.appendChild(d);
      fillW(d);
      lic.appendChild(row);
      fillW(row);
    });
    const sup = H({ gap: 9, py: 6 });
    sup.appendChild(icon("envelope-simple", 16, "#A5ABFC"));
    sup.appendChild(txt("Support · hello@wonton.design · Fonts: Space Grotesk, Plus Jakarta Sans, JetBrains Mono (Google Fonts)", F.body, 12.5, "#5E6776"));
    lic.appendChild(sup);
    split.appendChild(lic);
    fillW(lic);

    b.appendChild(split);
    fillW(split);
    placeBoard(b, "✨ Showcase · Changelog & license");
  }

  figma.viewport.scrollAndZoomIntoView(coverPage.children);
  figma.closePlugin("✅ Helix showcase: What's inside, Component wall (live instances), Screens index, Icon library, Changelog & license");
})();
