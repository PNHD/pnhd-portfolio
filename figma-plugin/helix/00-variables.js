// ============================================================
// HELIX CRYPTO UI KIT — Part 0: Pages + Figma Variables
// Run FIRST — creates the page structure and variable collections
// Figma Free note: free plan allows 1 mode per collection.
// This script tries Dark+Light modes; if blocked it creates a
// separate "(Light)" collection instead. Everything else works.
// ============================================================

(async () => {
  const hex = (h) => ({
    r: parseInt(h.slice(1, 3), 16) / 255,
    g: parseInt(h.slice(3, 5), 16) / 255,
    b: parseInt(h.slice(5, 7), 16) / 255,
  });
  const rgba = (h, a) => ({ ...hex(h), a });

  // ═════════════════════════════════════════════
  // PAGE STRUCTURE — 8 pro pages when the plan allows,
  // 3-page lite layout on Figma Free (3-page limit).
  // ═════════════════════════════════════════════
  const FULL_PAGES = [
    "📕 Cover", "🚀 Getting Started", "🎨 Foundations",
    "🧩 Components", "🗂 Components · Data",
    "🖥 Screens · Web", "📱 Screens · Mobile", "🎯 Prototype",
  ];
  const LITE_PAGES = ["🏠 Cover · Foundations", "🧩 Components", "📱 Screens"];
  const findP = (n) => figma.root.children.find((p) => p.name === n);
  let pagePlan;
  if (FULL_PAGES.every(findP)) {
    pagePlan = "full";
  } else if (LITE_PAGES.every(findP)) {
    pagePlan = "lite";
  } else {
    // probe how many pages this plan allows (Figma Free caps at 3 total)
    const temps = [];
    for (let i = 0; i < FULL_PAGES.length; i++) {
      try { const t = figma.createPage(); t.name = "HELIX_TMP_" + i; temps.push(t); }
      catch (e) { break; }
    }
    const spare = figma.root.children.filter((p) => /^Page \d+$/.test(p.name) && p.children.length === 0);
    const capacity = temps.length + spare.length;
    const targets = capacity >= FULL_PAGES.length ? FULL_PAGES : LITE_PAGES;
    pagePlan = targets === FULL_PAGES ? "full" : "lite";
    let ti = 0;
    for (const name of targets) {
      if (findP(name)) continue;
      const slot = spare.length ? spare.shift() : temps[ti++];
      if (slot) slot.name = name;
    }
    for (; ti < temps.length; ti++) { try { temps[ti].remove(); } catch (e) {} }
  }

  // ═════════════════════════════════════════════
  // COLOR VARIABLES — Dark (default) + Light
  // ═════════════════════════════════════════════
  const colors = figma.variables.createVariableCollection("Helix Colors");
  const darkModeId = colors.modes[0].modeId;
  colors.renameMode(darkModeId, "Dark");

  let lightModeId = null;
  let lightCollection = null;
  try {
    lightModeId = colors.addMode("Light");
  } catch (e) {
    // Figma Free: 1 mode per collection — fall back to a 2nd collection
    lightCollection = figma.variables.createVariableCollection("Helix Colors (Light)");
    lightCollection.renameMode(lightCollection.modes[0].modeId, "Light");
  }

  function colorVar(name, darkVal, lightVal) {
    const v = figma.variables.createVariable(name, colors, "COLOR");
    v.setValueForMode(darkModeId, darkVal);
    if (lightModeId) {
      v.setValueForMode(lightModeId, lightVal);
    } else if (lightCollection) {
      const lv = figma.variables.createVariable(name, lightCollection, "COLOR");
      lv.setValueForMode(lightCollection.modes[0].modeId, lightVal);
    }
    return v;
  }
  const c = (name, darkHex, lightHex) => colorVar(name, rgba(darkHex, 1), rgba(lightHex, 1));

  // ── Accent ramp (Indigo, same in both modes) ──
  const ramp = {
    50: "#EEF0FF", 100: "#E0E3FF", 200: "#C7CCFE", 300: "#A5ABFC",
    400: "#828CF8", 500: "#6366F1", 600: "#4F46E5", 700: "#4338CA",
    800: "#3730A3", 900: "#312E81", 950: "#1E1B4B",
  };
  for (const [step, h] of Object.entries(ramp)) c(`Accent/${step}`, h, h);
  c("Accent/Alt", "#8B5CF6", "#8B5CF6");
  c("Accent/Cyan", "#22D3EE", "#22D3EE");

  // ── Backgrounds ──
  c("Bg/Canvas",   "#0A0C10", "#F6F7F9");
  c("Bg/Surface",  "#12151C", "#FFFFFF");
  c("Bg/Card",     "#171B24", "#F1F3F6");
  c("Bg/Elevated", "#1E232E", "#FFFFFF");

  // ── Borders ──
  c("Border/Line",   "#252B37", "#E6E8EC");
  c("Border/Strong", "#3F4656", "#D7DBE2");
  colorVar("Border/Ghost", rgba("#FFFFFF", 0.07), rgba("#0E121B", 0.07));

  // ── Text ──
  c("Text/Muted",  "#5E6776", "#9099A6");
  c("Text/Subtle", "#9AA4B2", "#5A6473");
  c("Text/Body",   "#C8CFDA", "#2A3340");
  c("Text/Strong", "#F2F4F8", "#0E121B");
  c("Text/On Accent", "#FFFFFF", "#FFFFFF");
  c("Text/Link",   "#A5ABFC", "#4F46E5");

  // ── Semantic ──
  c("Success/Base", "#10B981", "#10B981");
  c("Success/Text", "#34D399", "#059669");
  colorVar("Success/Subtle", rgba("#34D399", 0.12), rgba("#10B981", 0.10));
  c("Danger/Base", "#F43F5E", "#F43F5E");
  c("Danger/Text", "#FB7185", "#E11D48");
  colorVar("Danger/Subtle", rgba("#FB7185", 0.12), rgba("#F43F5E", 0.10));
  c("Warning/Base", "#F59E0B", "#F59E0B");
  c("Warning/Text", "#FBBF24", "#D97706");
  colorVar("Warning/Subtle", rgba("#F59E0B", 0.14), rgba("#F59E0B", 0.12));
  c("Info/Base", "#0EA5E9", "#0EA5E9");
  c("Info/Text", "#38BDF8", "#0284C7");
  colorVar("Info/Subtle", rgba("#0EA5E9", 0.14), rgba("#0EA5E9", 0.10));

  // ═════════════════════════════════════════════
  // SPACING — 4pt grid (single mode, plan-safe)
  // ═════════════════════════════════════════════
  const spacing = figma.variables.createVariableCollection("Helix Spacing");
  spacing.renameMode(spacing.modes[0].modeId, "Default");
  const spaceTokens = { "xs": 4, "sm": 8, "md": 12, "lg": 16, "xl": 20, "2xl": 24, "3xl": 32, "4xl": 40, "5xl": 48, "6xl": 64 };
  for (const [name, val] of Object.entries(spaceTokens)) {
    const v = figma.variables.createVariable(`Space/${name}`, spacing, "FLOAT");
    v.setValueForMode(spacing.modes[0].modeId, val);
  }

  // ═════════════════════════════════════════════
  // RADIUS
  // ═════════════════════════════════════════════
  const radius = figma.variables.createVariableCollection("Helix Radius");
  radius.renameMode(radius.modes[0].modeId, "Default");
  const radiusTokens = { "xs": 4, "sm": 6, "md": 10, "lg": 14, "xl": 20, "2xl": 28, "full": 9999 };
  for (const [name, val] of Object.entries(radiusTokens)) {
    const v = figma.variables.createVariable(`Radius/${name}`, radius, "FLOAT");
    v.setValueForMode(radius.modes[0].modeId, val);
  }

  const modeNote = lightModeId
    ? "Dark + Light modes"
    : "Dark mode + separate (Light) collection — Figma Free";
  const pageNote = pagePlan === "full" ? "8 pages" : "3 pages (Free lite layout)";
  figma.closePlugin(`✅ Helix: ${pageNote} + variables created (${modeNote})`);
})();
