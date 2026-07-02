// ============================================================
// HELIX CRYPTO UI KIT — Part 2c: Pro features
// Run AFTER 02b. Closes the gap with premium kits (PrimeOne):
//  · Interactive Components — Button gains Hover variants wired
//    with ON_HOVER reactions; Toggle/Checkbox/Radio/Pill/Tab get
//    ON_CLICK state swaps for live prototyping
//  · Component Properties — TEXT props (editable labels) and
//    BOOLEAN props (show/hide dot, helper, status) on key sets
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

  const compPages = figma.root.children.filter((p) => /Components/.test(p.name));
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
  const variantsOf = (set) => (set && set.children ? set.children.filter((k) => k.type === "COMPONENT") : []);
  const TRANSITION = { type: "DISSOLVE", easing: { type: "EASE_OUT" }, duration: 0.15 };
  let reactionsWired = 0;
  const wire = async (node, trigger, destination) => {
    if (!node || !destination) return;
    const reaction = {
      trigger,
      actions: [{ type: "NODE", destinationId: destination.id, navigation: "CHANGE_TO", transition: TRANSITION, preserveScrollPosition: false }],
    };
    try {
      if (node.setReactionsAsync) await node.setReactionsAsync([reaction]);
      else node.reactions = [reaction];
      reactionsWired++;
    } catch (e) {
      // older builds use a single `action` — try the legacy shape
      try {
        const legacy = { trigger, action: reaction.actions[0] };
        if (node.setReactionsAsync) await node.setReactionsAsync([legacy]);
        else node.reactions = [legacy];
        reactionsWired++;
      } catch (e2) {}
    }
  };
  let propsAdded = 0;
  const addTextProp = (setOrComp, propLabel, defaultValue, layerName) => {
    try {
      const propId = setOrComp.addComponentProperty(propLabel, "TEXT", defaultValue);
      const targets = setOrComp.type === "COMPONENT" ? [setOrComp] : variantsOf(setOrComp);
      for (const v of targets) {
        const layer = v.findOne((k) => k.type === "TEXT" && (!layerName || k.name === layerName));
        if (layer) layer.componentPropertyReferences = { ...(layer.componentPropertyReferences || {}), characters: propId };
      }
      propsAdded++;
    } catch (e) {}
  };
  const addBoolProp = (setOrComp, propLabel, layerName, defaultValue) => {
    try {
      const propId = setOrComp.addComponentProperty(propLabel, "BOOLEAN", defaultValue !== false);
      const targets = setOrComp.type === "COMPONENT" ? [setOrComp] : variantsOf(setOrComp);
      for (const v of targets) {
        const layer = v.findOne((k) => k.name === layerName);
        if (layer) layer.componentPropertyReferences = { ...(layer.componentPropertyReferences || {}), visible: propId };
      }
      propsAdded++;
    } catch (e) {}
  };

  // ════════════════════════════════════════════════════════
  // 1 · BUTTON — Hover variants + ON_HOVER reactions + Label prop
  // ════════════════════════════════════════════════════════
  let hoverAdded = 0;
  {
    const set = findSet("Button");
    if (set && set.type === "COMPONENT_SET") {
      const HOVER_STYLE = {
        Primary:   (c) => { c.fills = [grad135("#787BF5", "#9D74F8")]; },
        Secondary: (c) => { c.fills = [solid("#FFFFFF", 0.1)]; },
        Outline:   (c) => { c.fills = [solid("#6366F1", 0.1)]; },
        Ghost:     (c) => { c.fills = [solid("#FFFFFF", 0.06)]; },
        Danger:    (c) => { c.fills = [solid("#F43F5E", 0.22)]; },
      };
      const defaults = variantsOf(set).filter((v) => /State=Default/.test(v.name));
      const setH = set.height;
      for (const v of defaults) {
        const typeName = (v.name.match(/Type=([^,]+)/) || [])[1];
        if (!typeName || !HOVER_STYLE[typeName]) continue;
        try {
          const hover = v.clone();
          hover.name = v.name.replace("State=Default", "State=Hover");
          set.appendChild(hover);
          hover.x = v.x;
          hover.y = v.y + setH + 16;
          HOVER_STYLE[typeName](hover);
          hoverAdded++;
          await wire(v, { type: "ON_HOVER" }, hover);
        } catch (e) {}
      }
      addTextProp(set, "Label", "Button", "Label");
    }
  }

  // ════════════════════════════════════════════════════════
  // 2 · CLICKABLE STATE SWAPS — Toggle, Checkbox, Radio, Pill, Tab
  // ════════════════════════════════════════════════════════
  const CLICK_PAIRS = [
    ["Toggle", "State=On", "State=Off", true],
    ["Checkbox", "State=Checked", "State=Unchecked", true],
    ["Radio", "State=Selected", "State=Unselected", true],
    ["Pill / Timeframe", "State=Active", "State=Inactive", false],
    ["Tab", "State=Active", "State=Inactive", false],
  ];
  for (const [setName, aName, bName, bothWays] of CLICK_PAIRS) {
    const set = findSet(setName);
    if (!set || set.type !== "COMPONENT_SET") continue;
    const a = variantsOf(set).find((v) => v.name === aName);
    const b = variantsOf(set).find((v) => v.name === bName);
    if (!a || !b) continue;
    await wire(b, { type: "ON_CLICK" }, a); // inactive/off → active/on
    if (bothWays) await wire(a, { type: "ON_CLICK" }, b);
  }

  // ════════════════════════════════════════════════════════
  // 3 · COMPONENT PROPERTIES on the rest of the library
  // ════════════════════════════════════════════════════════
  {
    const tab = findSet("Tab");
    if (tab) addTextProp(tab, "Label", "Overview");
    const pill = findSet("Pill / Timeframe");
    if (pill) addTextProp(pill, "Label", "24H");
    const select = findSet("Select");
    if (select) addTextProp(select, "Label", "Ethereum");
    const badgeStatus = findSet("Badge / Status");
    if (badgeStatus) addBoolProp(badgeStatus, "Show dot", "Dot");
    const input = findSet("Input");
    if (input) addBoolProp(input, "Show helper", "Helper");
    const avatar = findSet("Avatar");
    if (avatar) addBoolProp(avatar, "Show status", "Status");
    const toast = findSet("Toast");
    if (toast) addBoolProp(toast, "Show close", "Close");
  }

  figma.closePlugin(`✅ Helix pro features: ${hoverAdded} hover variants + ${reactionsWired} interactive reactions · ${propsAdded} component properties (Text/Boolean)`);
})();
