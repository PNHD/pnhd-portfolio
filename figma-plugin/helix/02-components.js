// ============================================================
// HELIX CRYPTO UI KIT — Part 2: Core Components
// Run AFTER 01-foundation.js
// Buttons · Inputs · Selectors · Badges · Avatars · Navigation
// All variant-driven, 100% Auto Layout, dark-first
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
  const vec = (w, h, data, strokeHex, weight, opacity) => {
    const v = figma.createVector();
    v.resize(w, h);
    v.vectorPaths = [{ windingRule: "NONE", data }];
    v.strokes = [solid(strokeHex, opacity)];
    v.strokeWeight = weight || 2;
    v.strokeCap = "ROUND";
    v.strokeJoin = "ROUND";
    v.fills = [];
    return v;
  };
  const checkVec = (colorHex, s) => vec(s || 12, s || 12, `M ${1.5} ${(s || 12) * 0.55} L ${(s || 12) * 0.4} ${(s || 12) - 2} L ${(s || 12) - 1.5} ${2}`, colorHex, 2);
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

  const page = figma.root.children.find((p) => p.name === "🧩 Components") || figma.currentPage;
  figma.currentPage = page;
  let yOffset = 0;
  for (const ch of page.children) yOffset = Math.max(yOffset, ch.y + ch.height + 120);
  const placeSet = (set, name) => {
    set.name = name;
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 120;
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
  // BUTTON — Type × Size × State
  // ═════════════════════════════════════════════
  {
    const types = {
      Primary:   { grad: true, text: "#FFFFFF" },
      Secondary: { bg: solid("#FFFFFF", 0.06), text: "#F2F4F8", bd: solid("#FFFFFF", 0.12) },
      Outline:   { text: "#A5ABFC", bd: solid("#6366F1") },
      Ghost:     { text: "#C8CFDA" },
      Danger:    { bg: solid("#F43F5E", 0.14), text: "#FB7185", bd: solid("#F43F5E", 0.32) },
    };
    const sizes = {
      SM: { h: 32, px: 14, fs: 13, r: 9,  gap: 7 },
      MD: { h: 42, px: 20, fs: 14, r: 11, gap: 8 },
      LG: { h: 48, px: 24, fs: 15, r: 12, gap: 9 },
    };
    const comps = [];
    for (const [tn, tc] of Object.entries(types)) {
      for (const [sn, sc] of Object.entries(sizes)) {
        for (const st of ["Default", "Loading", "Disabled"]) {
          const c = figma.createComponent();
          c.name = `Type=${tn}, Size=${sn}, State=${st}`;
          autol(c, "HORIZONTAL", { px: sc.px, gap: sc.gap });
          c.minHeight = sc.h;
          c.cornerRadius = sc.r;
          if (st === "Disabled") {
            c.fills = [solid("#FFFFFF", 0.04)];
            c.strokes = [solid("#FFFFFF", 0.08)];
            c.strokeWeight = 1;
          } else {
            if (tc.grad) {
              c.fills = [ACCENT_GRAD];
              c.effects = [{ type: "DROP_SHADOW", color: { ...hex("#6366F1"), a: 0.5 }, offset: { x: 0, y: 6 }, radius: 16, spread: -6, visible: true, blendMode: "NORMAL" }];
            } else {
              c.fills = tc.bg ? [tc.bg] : [];
            }
            if (tc.bd) { c.strokes = [tc.bd]; c.strokeWeight = 1; }
          }
          if (st === "Loading") {
            const spin = figma.createEllipse();
            spin.name = "Spinner";
            spin.resize(15, 15);
            spin.arcData = { startingAngle: -Math.PI / 2, endingAngle: Math.PI * 0.9, innerRadius: 0.74 };
            spin.fills = [solid(st === "Loading" && tc.grad ? "#FFFFFF" : (tc.text || "#C8CFDA"), 0.9)];
            c.appendChild(spin);
          }
          const label = txt("Button", F.bodySemi, sc.fs, st === "Disabled" ? "#5E6776" : tc.text);
          label.name = "Label";
          c.appendChild(label);
          comps.push(c);
        }
      }
    }
    placeSet(figma.combineAsVariants(gridify(comps, 9), page), "Button");
  }

  // ═════════════════════════════════════════════
  // ICON BUTTON
  // ═════════════════════════════════════════════
  {
    const styles = {
      Subtle:  { bg: solid("#FFFFFF", 0.06), bd: solid("#FFFFFF", 0.12), icon: "#F2F4F8" },
      Primary: { grad: true, icon: "#FFFFFF" },
    };
    const sizes = { SM: { s: 32, r: 9 }, MD: { s: 42, r: 11 } };
    const comps = [];
    for (const [stn, stc] of Object.entries(styles)) {
      for (const [sn, sc] of Object.entries(sizes)) {
        const c = figma.createComponent();
        c.name = `Style=${stn}, Size=${sn}`;
        autol(c, "HORIZONTAL", {});
        c.resize(sc.s, sc.s);
        c.primaryAxisSizingMode = "FIXED";
        c.counterAxisSizingMode = "FIXED";
        c.cornerRadius = sc.r;
        c.fills = stc.grad ? [ACCENT_GRAD] : [stc.bg];
        if (stc.bd) { c.strokes = [stc.bd]; c.strokeWeight = 1; }
        const half = sc.s * 0.4;
        const plus = vec(half * 2 - sc.s * 0.4, half * 2 - sc.s * 0.4, `M ${half - sc.s * 0.2} 0 L ${half - sc.s * 0.2} ${half * 2 - sc.s * 0.4} M 0 ${half - sc.s * 0.2} L ${half * 2 - sc.s * 0.4} ${half - sc.s * 0.2}`, stc.icon, 2);
        plus.name = "Icon";
        c.appendChild(plus);
        comps.push(c);
      }
    }
    placeSet(figma.combineAsVariants(gridify(comps, 2), page), "Icon Button");
  }

  // ═════════════════════════════════════════════
  // INPUT — Default / Focus / Error
  // ═════════════════════════════════════════════
  {
    const states = {
      Default: { bg: solid("#FFFFFF", 0.04), bd: solid("#FFFFFF", 0.1),  bw: 1,   value: "name@wallet.io",  vc: "#C8CFDA", helper: "We never share your data.", hc: "#5E6776" },
      Focus:   { bg: solid("#6366F1", 0.06), bd: solid("#6366F1"),       bw: 1.5, value: "••••••••",         vc: "#F2F4F8", helper: "Strong password.",          hc: "#5E6776", ring: true },
      Error:   { bg: solid("#F43F5E", 0.06), bd: solid("#F43F5E"),       bw: 1.5, value: "0xinvalid…",       vc: "#F2F4F8", helper: "Invalid wallet address.",   hc: "#FB7185" },
    };
    const comps = [];
    for (const [st, sc] of Object.entries(states)) {
      const c = figma.createComponent();
      c.name = `State=${st}`;
      autol(c, "VERTICAL", { gap: 8, cross: "MIN" });
      c.counterAxisSizingMode = "FIXED";
      c.resize(320, 10);
      c.fills = [];

      const label = txt("Label", F.bodySemi, 12.5, "#9AA4B2");
      c.appendChild(label);

      const field = figma.createFrame();
      field.name = "Field";
      autol(field, "HORIZONTAL", { px: 13, gap: 9, main: "MIN" });
      field.minHeight = 44;
      field.cornerRadius = 11;
      field.fills = [sc.bg];
      field.strokes = [sc.bd];
      field.strokeWeight = sc.bw;
      if (sc.ring) field.effects = [{ type: "DROP_SHADOW", color: { ...hex("#6366F1"), a: 0.18 }, offset: { x: 0, y: 0 }, radius: 0, spread: 4, visible: true, blendMode: "NORMAL" }];
      const dot = figma.createEllipse();
      dot.name = "Icon";
      dot.resize(16, 16);
      dot.fills = [solid(st === "Error" ? "#FB7185" : st === "Focus" ? "#6366F1" : "#5E6776")];
      field.appendChild(dot);
      const value = txt(sc.value, F.body, 14, sc.vc);
      value.name = "Value";
      field.appendChild(value);
      c.appendChild(field);
      field.layoutSizingHorizontal = "FILL";

      const helper = txt(sc.helper, F.body, 11.5, sc.hc);
      helper.name = "Helper";
      c.appendChild(helper);
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 3), page), "Input");
  }

  // ═════════════════════════════════════════════
  // AMOUNT INPUT (crypto amount + MAX + token select)
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Amount Input";
    autol(c, "HORIZONTAL", { px: 14, py: 14, main: "SPACE_BETWEEN" });
    c.counterAxisSizingMode = "AUTO";
    c.primaryAxisSizingMode = "FIXED";
    c.resize(420, 10);
    c.cornerRadius = 13;
    c.fills = [solid("#FFFFFF", 0.04)];
    c.strokes = [solid("#FFFFFF", 0.1)];
    c.strokeWeight = 1;

    const left = autol(figma.createFrame(), "VERTICAL", { gap: 2, cross: "MIN" });
    left.fills = [];
    left.appendChild(txt("1,250.00", F.monoSemi, 22, "#F2F4F8"));
    left.appendChild(txt("≈ $1,250.00", F.body, 11.5, "#5E6776"));
    c.appendChild(left);

    const right = autol(figma.createFrame(), "HORIZONTAL", { gap: 8 });
    right.fills = [];
    const max = autol(figma.createFrame(), "HORIZONTAL", { px: 9, py: 6 });
    max.cornerRadius = 7;
    max.fills = [solid("#6366F1", 0.16)];
    max.appendChild(txt("MAX", F.bodyBold, 11, "#A5ABFC"));
    right.appendChild(max);
    const token = autol(figma.createFrame(), "HORIZONTAL", { px: 11, py: 7, gap: 7 });
    token.cornerRadius = 10;
    token.fills = [solid("#FFFFFF", 0.06)];
    const coin = figma.createEllipse();
    coin.resize(20, 20);
    coin.fills = [solid("#2775CA")];
    token.appendChild(coin);
    token.appendChild(txt("USDC", F.bodySemi, 13.5, "#F2F4F8"));
    token.appendChild(vec(10, 6, "M 0 0 L 5 5 L 10 0", "#9AA4B2", 1.5));
    right.appendChild(token);
    c.appendChild(right);

    placeSet(c, "Amount Input");
  }

  // ═════════════════════════════════════════════
  // SELECT (network / token dropdown)
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Select";
    autol(c, "HORIZONTAL", { px: 13, gap: 10, main: "MIN" });
    c.minHeight = 44;
    c.primaryAxisSizingMode = "FIXED";
    c.resize(240, 44);
    c.cornerRadius = 11;
    c.fills = [solid("#FFFFFF", 0.04)];
    c.strokes = [solid("#FFFFFF", 0.1)];
    c.strokeWeight = 1;
    const coin = figma.createEllipse();
    coin.name = "Icon";
    coin.resize(20, 20);
    coin.fills = [solid("#627EEA")];
    c.appendChild(coin);
    const label = txt("Ethereum", F.bodyMed, 14, "#F2F4F8");
    c.appendChild(label);
    label.layoutSizingHorizontal = "FILL";
    c.appendChild(vec(10, 6, "M 0 0 L 5 5 L 10 0", "#9AA4B2", 1.5));
    placeSet(c, "Select");
  }

  // ═════════════════════════════════════════════
  // CHECKBOX / RADIO / TOGGLE
  // ═════════════════════════════════════════════
  {
    const comps = [];
    for (const st of ["Checked", "Unchecked"]) {
      const c = figma.createComponent();
      c.name = `State=${st}`;
      autol(c, "HORIZONTAL", { gap: 10 });
      c.fills = [];
      const box = autol(figma.createFrame(), "HORIZONTAL", {});
      box.resize(20, 20);
      box.primaryAxisSizingMode = "FIXED";
      box.counterAxisSizingMode = "FIXED";
      box.cornerRadius = 6;
      if (st === "Checked") {
        box.fills = [ACCENT_GRAD];
        box.appendChild(checkVec("#FFFFFF", 11));
      } else {
        box.fills = [solid("#FFFFFF", 0.04)];
        box.strokes = [solid("#FFFFFF", 0.18)];
        box.strokeWeight = 1.5;
      }
      c.appendChild(box);
      c.appendChild(txt(st === "Checked" ? "Checked" : "Unchecked", F.body, 14, st === "Checked" ? "#C8CFDA" : "#9AA4B2"));
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 2), page), "Checkbox");
  }
  {
    const comps = [];
    for (const st of ["Selected", "Unselected"]) {
      const c = figma.createComponent();
      c.name = `State=${st}`;
      autol(c, "HORIZONTAL", { gap: 10 });
      c.fills = [];
      const ring = autol(figma.createFrame(), "HORIZONTAL", {});
      ring.resize(20, 20);
      ring.primaryAxisSizingMode = "FIXED";
      ring.counterAxisSizingMode = "FIXED";
      ring.cornerRadius = 999;
      if (st === "Selected") {
        ring.fills = [];
        ring.strokes = [solid("#6366F1")];
        ring.strokeWeight = 1.5;
        const dotIn = figma.createEllipse();
        dotIn.resize(10, 10);
        dotIn.fills = [solid("#6366F1")];
        ring.appendChild(dotIn);
      } else {
        ring.fills = [solid("#FFFFFF", 0.04)];
        ring.strokes = [solid("#FFFFFF", 0.18)];
        ring.strokeWeight = 1.5;
      }
      c.appendChild(ring);
      c.appendChild(txt(st === "Selected" ? "Selected" : "Option", F.body, 14, st === "Selected" ? "#C8CFDA" : "#9AA4B2"));
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 2), page), "Radio");
  }
  {
    const comps = [];
    for (const st of ["On", "Off"]) {
      const c = figma.createComponent();
      c.name = `State=${st}`;
      autol(c, "HORIZONTAL", { p: 3, main: st === "On" ? "MAX" : "MIN" });
      c.resize(44, 26);
      c.primaryAxisSizingMode = "FIXED";
      c.counterAxisSizingMode = "FIXED";
      c.cornerRadius = 999;
      c.fills = st === "On" ? [ACCENT_GRAD] : [solid("#FFFFFF", 0.12)];
      const knob = figma.createEllipse();
      knob.name = "Knob";
      knob.resize(20, 20);
      knob.fills = [solid("#FFFFFF")];
      knob.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.3 }, offset: { x: 0, y: 1 }, radius: 3, visible: true, blendMode: "NORMAL" }];
      c.appendChild(knob);
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 2), page), "Toggle");
  }

  // ═════════════════════════════════════════════
  // SEGMENTED CONTROL
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Segmented Control";
    autol(c, "HORIZONTAL", { p: 4, gap: 3 });
    c.cornerRadius = 11;
    c.fills = [solid("#FFFFFF", 0.05)];
    c.strokes = [solid("#FFFFFF", 0.06)];
    c.strokeWeight = 1;
    const items = ["Spot", "Margin", "Futures"];
    items.forEach((label, i) => {
      const seg = autol(figma.createFrame(), "HORIZONTAL", { px: 16, py: 7 });
      seg.name = i === 0 ? "Segment Active" : "Segment";
      seg.cornerRadius = 8;
      if (i === 0) {
        seg.fills = [solid("#1E232E")];
        seg.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.3 }, offset: { x: 0, y: 2 }, radius: 6, visible: true, blendMode: "NORMAL" }];
      } else {
        seg.fills = [];
      }
      seg.appendChild(txt(label, F.bodySemi, 13, i === 0 ? "#F2F4F8" : "#9AA4B2"));
      c.appendChild(seg);
    });
    placeSet(c, "Segmented Control");
  }

  // ═════════════════════════════════════════════
  // BADGE / STATUS — Confirmed / Pending / Failed / Draft
  // ═════════════════════════════════════════════
  {
    const types = {
      Confirmed: { bg: solid("#10B981", 0.14), text: "#34D399", dot: "#34D399" },
      Pending:   { bg: solid("#F59E0B", 0.14), text: "#FBBF24", dot: "#FBBF24" },
      Failed:    { bg: solid("#F43F5E", 0.14), text: "#FB7185", dot: "#FB7185" },
      Draft:     { bg: solid("#FFFFFF", 0.07), text: "#9AA4B2", dot: null },
    };
    const comps = [];
    for (const [tn, tc] of Object.entries(types)) {
      const c = figma.createComponent();
      c.name = `Status=${tn}`;
      autol(c, "HORIZONTAL", { px: 11, gap: 6 });
      c.minHeight = 26;
      c.cornerRadius = 999;
      c.fills = [tc.bg];
      if (tc.dot) {
        const d = figma.createEllipse();
        d.name = "Dot";
        d.resize(6, 6);
        d.fills = [solid(tc.dot)];
        c.appendChild(d);
      }
      c.appendChild(txt(tn, F.bodySemi, 12, tc.text));
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 4), page), "Badge / Status");
  }

  // ═════════════════════════════════════════════
  // BADGE / CHANGE — Up / Down (% ticker)
  // ═════════════════════════════════════════════
  {
    const comps = [];
    for (const dir of ["Up", "Down"]) {
      const up = dir === "Up";
      const c = figma.createComponent();
      c.name = `Direction=${dir}`;
      autol(c, "HORIZONTAL", { px: 9, gap: 4 });
      c.minHeight = 24;
      c.cornerRadius = 7;
      c.fills = [solid(up ? "#34D399" : "#FB7185", 0.12)];
      const arrow = vec(10, 10, up ? "M 0 10 L 10 0 M 4 0 L 10 0 L 10 6" : "M 0 0 L 10 10 M 4 10 L 10 10 L 10 4", up ? "#34D399" : "#FB7185", 1.8);
      arrow.name = "Trend";
      c.appendChild(arrow);
      c.appendChild(txt(up ? "+2.41%" : "-3.22%", F.monoSemi, 11.5, up ? "#34D399" : "#FB7185"));
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 2), page), "Badge / Change");
  }

  // ═════════════════════════════════════════════
  // BADGE / SPECIAL — New / Verified
  // ═════════════════════════════════════════════
  {
    const comps = [];
    {
      const c = figma.createComponent();
      c.name = "Type=New";
      autol(c, "HORIZONTAL", { px: 10 });
      c.minHeight = 24;
      c.cornerRadius = 7;
      c.fills = [ACCENT_GRAD];
      c.appendChild(txt("NEW", F.bodyBold, 11.5, "#FFFFFF"));
      comps.push(c);
    }
    {
      const c = figma.createComponent();
      c.name = "Type=Verified";
      autol(c, "HORIZONTAL", { px: 9, gap: 5 });
      c.minHeight = 24;
      c.cornerRadius = 7;
      c.fills = [solid("#0EA5E9", 0.14)];
      const seal = figma.createEllipse();
      seal.name = "Seal";
      seal.resize(13, 13);
      seal.fills = [solid("#38BDF8")];
      c.appendChild(seal);
      c.appendChild(txt("Verified", F.bodySemi, 11.5, "#38BDF8"));
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 2), page), "Badge / Special");
  }

  // ═════════════════════════════════════════════
  // CHIP / CHAIN — Ethereum / Solana / Polygon
  // ═════════════════════════════════════════════
  {
    const chains = { Ethereum: "#627EEA", Solana: "#14F195", Polygon: "#8247E5" };
    const comps = [];
    for (const [cn, col] of Object.entries(chains)) {
      const c = figma.createComponent();
      c.name = `Chain=${cn}`;
      autol(c, "HORIZONTAL", { px: 11, gap: 7 });
      c.minHeight = 30;
      c.cornerRadius = 999;
      c.fills = [solid("#FFFFFF", 0.05)];
      c.strokes = [solid("#FFFFFF", 0.08)];
      c.strokeWeight = 1;
      const coin = figma.createEllipse();
      coin.name = "Coin";
      coin.resize(18, 18);
      coin.fills = [solid(col)];
      c.appendChild(coin);
      c.appendChild(txt(cn, F.bodyMed, 12.5, "#C8CFDA"));
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 3), page), "Chip / Chain");
  }

  // ═════════════════════════════════════════════
  // AVATAR — Size × Type (Default / Status / Ring)
  // ═════════════════════════════════════════════
  {
    const sizes = { SM: 28, MD: 36, LG: 46, XL: 52 };
    const comps = [];
    for (const [sn, sz] of Object.entries(sizes)) {
      for (const type of ["Default", "Status", "Ring"]) {
        const c = figma.createComponent();
        c.name = `Size=${sn}, Type=${type}`;
        const pad = type === "Ring" ? 3 : 0;
        autol(c, "HORIZONTAL", { p: pad });
        c.cornerRadius = 999;
        c.fills = type === "Ring" ? [ACCENT_GRAD] : [];

        const face = autol(figma.createFrame(), "HORIZONTAL", {});
        face.name = "Photo";
        face.resize(sz, sz);
        face.primaryAxisSizingMode = "FIXED";
        face.counterAxisSizingMode = "FIXED";
        face.cornerRadius = 999;
        face.fills = [grad135("#3F4656", "#1E232E")];
        if (type === "Ring") { face.strokes = [solid("#12151C")]; face.strokeWeight = 2.5; }
        face.appendChild(txt("A", F.disp, Math.round(sz * 0.42), "#C8CFDA"));
        c.appendChild(face);

        if (type === "Status") {
          const st = figma.createEllipse();
          st.name = "Status";
          st.resize(12, 12);
          st.fills = [solid("#34D399")];
          st.strokes = [solid("#12151C")];
          st.strokeWeight = 2.5;
          c.appendChild(st);
          st.layoutPositioning = "ABSOLUTE";
          st.x = sz - 12; st.y = sz - 12;
        }
        comps.push(c);
      }
    }
    placeSet(figma.combineAsVariants(gridify(comps, 3), page), "Avatar");
  }

  // ═════════════════════════════════════════════
  // AVATAR GROUP
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Avatar Group";
    autol(c, "HORIZONTAL", { gap: -12 });
    c.fills = [];
    const tones = ["#3F4656", "#4338CA", "#312E81"];
    tones.forEach((tone, i) => {
      const a = autol(figma.createFrame(), "HORIZONTAL", {});
      a.name = `Avatar ${i + 1}`;
      a.resize(36, 36);
      a.primaryAxisSizingMode = "FIXED";
      a.counterAxisSizingMode = "FIXED";
      a.cornerRadius = 999;
      a.fills = [grad135(tone, "#1E232E")];
      a.strokes = [solid("#12151C")];
      a.strokeWeight = 2.5;
      c.appendChild(a);
    });
    const more = autol(figma.createFrame(), "HORIZONTAL", {});
    more.name = "More";
    more.resize(36, 36);
    more.primaryAxisSizingMode = "FIXED";
    more.counterAxisSizingMode = "FIXED";
    more.cornerRadius = 999;
    more.fills = [solid("#1E232E")];
    more.strokes = [solid("#12151C")];
    more.strokeWeight = 2.5;
    more.appendChild(txt("+9", F.bodyBold, 11.5, "#C8CFDA"));
    c.appendChild(more);
    placeSet(c, "Avatar Group");
  }

  // ═════════════════════════════════════════════
  // TAB (underline) — Active / Inactive
  // ═════════════════════════════════════════════
  {
    const comps = [];
    for (const st of ["Active", "Inactive"]) {
      const c = figma.createComponent();
      c.name = `State=${st}`;
      autol(c, "VERTICAL", { gap: 12, cross: "MIN" });
      c.fills = [];
      c.appendChild(txt("Overview", F.bodySemi, 13.5, st === "Active" ? "#F2F4F8" : "#9AA4B2"));
      const line = figma.createRectangle();
      line.name = "Indicator";
      line.resize(64, 2);
      line.fills = st === "Active" ? [solid("#6366F1")] : [solid("#FFFFFF", 0)];
      c.appendChild(line);
      line.layoutSizingHorizontal = "FILL";
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 2), page), "Tab");
  }

  // ═════════════════════════════════════════════
  // PILL / TIMEFRAME — Active / Inactive
  // ═════════════════════════════════════════════
  {
    const comps = [];
    for (const st of ["Active", "Inactive"]) {
      const c = figma.createComponent();
      c.name = `State=${st}`;
      autol(c, "HORIZONTAL", { px: 13, py: 6 });
      c.cornerRadius = 9;
      c.fills = st === "Active" ? [solid("#6366F1", 0.14)] : [];
      c.appendChild(txt("24H", F.monoSemi, 12, st === "Active" ? "#A5ABFC" : "#9AA4B2"));
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 2), page), "Pill / Timeframe");
  }

  // ═════════════════════════════════════════════
  // BREADCRUMB
  // ═════════════════════════════════════════════
  {
    const c = figma.createComponent();
    c.name = "Breadcrumb";
    autol(c, "HORIZONTAL", { gap: 8 });
    c.fills = [];
    const parts = [["Markets", "#9AA4B2"], ["Bitcoin", "#9AA4B2"], ["Chart", "#F2F4F8"]];
    parts.forEach(([label, col], i) => {
      c.appendChild(txt(label, i === parts.length - 1 ? F.bodySemi : F.body, 13, col));
      if (i < parts.length - 1) c.appendChild(vec(5, 9, "M 0 0 L 4.5 4.5 L 0 9", "#5E6776", 1.5));
    });
    placeSet(c, "Breadcrumb");
  }

  // ═════════════════════════════════════════════
  // PAGINATION ITEM — Active / Default / Arrow
  // ═════════════════════════════════════════════
  {
    const comps = [];
    for (const type of ["Active", "Default", "Arrow"]) {
      const c = figma.createComponent();
      c.name = `Type=${type}`;
      autol(c, "HORIZONTAL", {});
      c.resize(32, 32);
      c.primaryAxisSizingMode = "FIXED";
      c.counterAxisSizingMode = "FIXED";
      c.cornerRadius = 9;
      c.fills = type === "Active" ? [ACCENT_GRAD] : [solid("#FFFFFF", 0.04)];
      if (type === "Arrow") c.appendChild(vec(6, 10, "M 5 0 L 0 5 L 5 10", "#C8CFDA", 1.6));
      else c.appendChild(txt("1", F.bodySemi, 13, type === "Active" ? "#FFFFFF" : "#C8CFDA"));
      comps.push(c);
    }
    placeSet(figma.combineAsVariants(gridify(comps, 3), page), "Pagination Item");
  }

  figma.viewport.scrollAndZoomIntoView(page.children);
  figma.closePlugin("✅ Helix core components: Button, Icon Button, Input, Amount, Select, Checkbox, Radio, Toggle, Segmented, Badges ×3, Chip, Avatar, Avatar Group, Tab, Pill, Breadcrumb, Pagination");
})();
