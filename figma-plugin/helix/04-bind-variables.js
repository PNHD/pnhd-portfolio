// ============================================================
// HELIX CRYPTO UI KIT — Part 4: Bind fills to Variables
// Run LAST (after 03b). Walks Components + Screens pages and
// rebinds every solid fill/stroke that matches a token hex to
// the corresponding Figma Variable, so the whole kit can be
// restyled (and mode-switched on Pro) from the token panel.
// ============================================================

(async () => {
  const toHex = (c) => {
    const b = (v) => Math.round(v * 255).toString(16).padStart(2, "0").toUpperCase();
    return "#" + b(c.r) + b(c.g) + b(c.b);
  };

  // token hex → variable name (dark set lives in "Helix Colors")
  const DARK_MAP = {
    "#0A0C10": "Bg/Canvas", "#12151C": "Bg/Surface", "#171B24": "Bg/Card", "#1E232E": "Bg/Elevated",
    "#252B37": "Border/Line", "#3F4656": "Border/Strong",
    "#5E6776": "Text/Muted", "#9AA4B2": "Text/Subtle", "#C8CFDA": "Text/Body", "#F2F4F8": "Text/Strong",
    "#6366F1": "Accent/500", "#8B5CF6": "Accent/Alt", "#A5ABFC": "Accent/300", "#828CF8": "Accent/400",
    "#4F46E5": "Accent/600", "#22D3EE": "Accent/Cyan",
    "#10B981": "Success/Base", "#34D399": "Success/Text",
    "#F43F5E": "Danger/Base", "#FB7185": "Danger/Text",
    "#F59E0B": "Warning/Base", "#FBBF24": "Warning/Text",
    "#0EA5E9": "Info/Base", "#38BDF8": "Info/Text",
  };
  // light-theme neutrals (Light mode on Pro, "(Light)" collection on Free)
  const LIGHT_MAP = {
    "#F6F7F9": "Bg/Canvas", "#F1F3F6": "Bg/Card",
    "#E6E8EC": "Border/Line", "#D7DBE2": "Border/Strong",
    "#9099A6": "Text/Muted", "#5A6473": "Text/Subtle", "#2A3340": "Text/Body", "#0E121B": "Text/Strong",
  };

  const getVars = figma.variables.getLocalVariablesAsync
    ? await figma.variables.getLocalVariablesAsync("COLOR")
    : figma.variables.getLocalVariables("COLOR");
  const getCols = figma.variables.getLocalVariableCollectionsAsync
    ? await figma.variables.getLocalVariableCollectionsAsync()
    : figma.variables.getLocalVariableCollections();

  const darkCol = getCols.find((c) => c.name === "Helix Colors");
  const lightCol = getCols.find((c) => c.name === "Helix Colors (Light)");
  if (!darkCol) { figma.closePlugin("❌ Run 00-variables.js first — 'Helix Colors' collection not found"); return; }
  const lightModeId = (darkCol.modes.find((m) => m.name === "Light") || {}).modeId || null;

  const byCol = {};
  for (const v of getVars) {
    (byCol[v.variableCollectionId] = byCol[v.variableCollectionId] || {})[v.name] = v;
  }
  const darkVars = byCol[darkCol.id] || {};
  const lightVars = lightCol ? (byCol[lightCol.id] || {}) : darkVars; // Pro: same collection, Light mode

  const resolve = (hexVal) => {
    if (DARK_MAP[hexVal] && darkVars[DARK_MAP[hexVal]]) return darkVars[DARK_MAP[hexVal]];
    if (LIGHT_MAP[hexVal] && lightVars[LIGHT_MAP[hexVal]]) return lightVars[LIGHT_MAP[hexVal]];
    return null;
  };

  let bound = 0;
  const rebindPaints = (paints) => {
    if (!Array.isArray(paints) || !paints.length) return null;
    let changed = false;
    const next = paints.map((p) => {
      if (p.type !== "SOLID") return p;
      if (p.boundVariables && p.boundVariables.color) return p;
      const v = resolve(toHex(p.color));
      if (!v) return p;
      changed = true;
      bound++;
      return figma.variables.setBoundVariableForPaint(p, "color", v);
    });
    return changed ? next : null;
  };
  const walk = (node) => {
    if ("fills" in node) {
      const nf = rebindPaints(node.fills);
      if (nf) node.fills = nf;
    }
    if ("strokes" in node) {
      const ns = rebindPaints(node.strokes);
      if (ns) node.strokes = ns;
    }
    if ("children" in node && node.children) {
      for (const ch of node.children) walk(ch);
    }
  };

  const pages = figma.root.children.filter((p) => /Components|Screens/.test(p.name));
  for (const page of pages) for (const node of page.children) walk(node);

  // On Pro, light screens must resolve variables in the Light mode
  let lightModeSet = 0;
  if (lightModeId) {
    const scrPage = figma.root.children.find((p) => /Screens/.test(p.name));
    if (scrPage && scrPage.findAll) {
      // screens may sit inside Sections — search frames recursively
      const lightFrames = scrPage.findAll((n) => n.type === "FRAME" && /Light/.test(n.name) && !!n.setExplicitVariableModeForCollection);
      for (const node of lightFrames) {
        node.setExplicitVariableModeForCollection(darkCol, lightModeId);
        lightModeSet++;
      }
    }
  }

  figma.closePlugin(`✅ Variables bound: ${bound} fills/strokes${lightModeId ? ` · ${lightModeSet} light screen(s) set to Light mode` : " (Free: light tokens use the (Light) collection)"}`);
})();
