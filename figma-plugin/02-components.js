// ============================================================
// NOVA UI KIT — Part 2: Components
// Run AFTER 01-foundation.js
// ============================================================

(async () => {
  const hex = (h) => ({
    r: parseInt(h.slice(1, 3), 16) / 255,
    g: parseInt(h.slice(3, 5), 16) / 255,
    b: parseInt(h.slice(5, 7), 16) / 255,
  });

  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  const page = figma.currentPage;
  let yOffset = 0;

  // ════════════════════════════════════════
  // BUTTON
  // ════════════════════════════════════════
  {
    const types = {
      Primary: { bg: "#4F46E5", text: "#FFFFFF", hBg: "#4338CA", bd: null },
      Secondary: { bg: "#FFFFFF", text: "#374151", hBg: "#F9FAFB", bd: "#D1D5DB" },
      Tertiary: { bg: "#F3F4F6", text: "#374151", hBg: "#E5E7EB", bd: null },
      Ghost: { bg: null, text: "#4F46E5", hBg: "#EEF2FF", bd: null },
      Destructive: { bg: "#DC2626", text: "#FFFFFF", hBg: "#B91C1C", bd: null },
    };
    const sizes = {
      SM: { px: 12, py: 8, fs: 13, r: 8, gap: 6 },
      MD: { px: 16, py: 10, fs: 14, r: 8, gap: 8 },
      LG: { px: 20, py: 12, fs: 16, r: 10, gap: 8 },
      XL: { px: 24, py: 14, fs: 16, r: 12, gap: 8 },
    };

    const comps = [];
    for (const [tn, tc] of Object.entries(types)) {
      for (const [sn, sc] of Object.entries(sizes)) {
        for (const st of ["Default", "Hover", "Disabled"]) {
          const comp = figma.createComponent();
          comp.name = `Type=${tn}, Size=${sn}, State=${st}`;
          comp.layoutMode = "HORIZONTAL";
          comp.primaryAxisAlignItems = "CENTER";
          comp.counterAxisAlignItems = "CENTER";
          comp.paddingLeft = sc.px; comp.paddingRight = sc.px;
          comp.paddingTop = sc.py; comp.paddingBottom = sc.py;
          comp.itemSpacing = sc.gap;
          comp.cornerRadius = sc.r;
          comp.primaryAxisSizingMode = "AUTO";
          comp.counterAxisSizingMode = "AUTO";

          const bgC = st === "Hover" ? tc.hBg : tc.bg;
          if (bgC) comp.fills = [{ type: "SOLID", color: hex(bgC) }];
          else if (st === "Hover" && tn === "Ghost") comp.fills = [{ type: "SOLID", color: hex("#EEF2FF") }];
          else comp.fills = [];

          if (tc.bd) { comp.strokes = [{ type: "SOLID", color: hex(tc.bd) }]; comp.strokeWeight = 1; }
          if (st === "Disabled") comp.opacity = 0.5;

          const label = figma.createText();
          label.characters = "Button";
          label.fontName = { family: "Inter", style: "Semi Bold" };
          label.fontSize = sc.fs;
          label.fills = [{ type: "SOLID", color: hex(tc.text) }];
          comp.appendChild(label);
          comps.push(comp);
        }
      }
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Button";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // ════════════════════════════════════════
  // INPUT
  // ════════════════════════════════════════
  {
    const sizes = { SM: { h: 36, px: 12, fs: 14, r: 8 }, MD: { h: 40, px: 14, fs: 14, r: 8 }, LG: { h: 48, px: 16, fs: 16, r: 10 } };
    const states = {
      Default: { bd: "#D1D5DB", bg: "#FFFFFF", ph: "#9CA3AF" },
      Focus: { bd: "#6366F1", bg: "#FFFFFF", ph: "#9CA3AF" },
      Filled: { bd: "#D1D5DB", bg: "#FFFFFF", ph: "#111827" },
      Error: { bd: "#EF4444", bg: "#FFFFFF", ph: "#9CA3AF" },
      Disabled: { bd: "#E5E7EB", bg: "#F9FAFB", ph: "#D1D5DB" },
    };

    const comps = [];
    for (const [sn, sc] of Object.entries(sizes)) {
      for (const [st, stc] of Object.entries(states)) {
        const wrapper = figma.createComponent();
        wrapper.name = `Size=${sn}, State=${st}`;
        wrapper.layoutMode = "VERTICAL";
        wrapper.primaryAxisSizingMode = "AUTO";
        wrapper.counterAxisSizingMode = "FIXED";
        wrapper.resize(320, 10);
        wrapper.itemSpacing = 6;
        wrapper.fills = [];

        const label = figma.createText();
        label.characters = "Label";
        label.fontName = { family: "Inter", style: "Medium" };
        label.fontSize = 14;
        label.fills = [{ type: "SOLID", color: hex("#374151") }];
        wrapper.appendChild(label);
        label.layoutSizingHorizontal = "FILL";

        const input = figma.createFrame();
        input.name = "Field";
        input.layoutMode = "HORIZONTAL";
        input.counterAxisAlignItems = "CENTER";
        input.paddingLeft = sc.px; input.paddingRight = sc.px;
        input.paddingTop = 0; input.paddingBottom = 0;
        input.minHeight = sc.h;
        input.cornerRadius = sc.r;
        input.fills = [{ type: "SOLID", color: hex(stc.bg) }];
        input.strokes = [{ type: "SOLID", color: hex(stc.bd) }];
        input.strokeWeight = st === "Focus" ? 2 : 1;
        input.primaryAxisSizingMode = "FIXED";
        input.counterAxisSizingMode = "AUTO";
        if (st === "Disabled") input.opacity = 0.6;
        if (st === "Focus") input.effects = [{ type: "DROP_SHADOW", color: { r: 0.39, g: 0.4, b: 0.95, a: 0.15 }, offset: { x: 0, y: 0 }, radius: 0, spread: 3, visible: true }];

        const ph = figma.createText();
        ph.characters = st === "Filled" ? "john@example.com" : "Enter text...";
        ph.fontName = { family: "Inter", style: "Regular" };
        ph.fontSize = sc.fs;
        ph.fills = [{ type: "SOLID", color: hex(stc.ph) }];
        input.appendChild(ph);
        ph.layoutSizingHorizontal = "FILL";

        wrapper.appendChild(input);
        input.layoutSizingHorizontal = "FILL";

        const helper = figma.createText();
        helper.characters = st === "Error" ? "This field is required" : "Helper text";
        helper.fontName = { family: "Inter", style: "Regular" };
        helper.fontSize = 12;
        helper.fills = [{ type: "SOLID", color: hex(st === "Error" ? "#EF4444" : "#6B7280") }];
        wrapper.appendChild(helper);
        helper.layoutSizingHorizontal = "FILL";

        comps.push(wrapper);
      }
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Input";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // ════════════════════════════════════════
  // BADGE
  // ════════════════════════════════════════
  {
    const types = {
      Gray: { bg: "#F3F4F6", text: "#374151", dot: "#6B7280" },
      Primary: { bg: "#EEF2FF", text: "#4338CA", dot: "#6366F1" },
      Success: { bg: "#ECFDF5", text: "#047857", dot: "#10B981" },
      Warning: { bg: "#FFFBEB", text: "#B45309", dot: "#F59E0B" },
      Error: { bg: "#FEF2F2", text: "#B91C1C", dot: "#EF4444" },
      Info: { bg: "#EFF6FF", text: "#1D4ED8", dot: "#3B82F6" },
    };
    const sizes = { SM: { px: 8, py: 2, fs: 12, r: 6 }, MD: { px: 10, py: 4, fs: 12, r: 6 }, LG: { px: 12, py: 4, fs: 14, r: 8 } };

    const comps = [];
    for (const [tn, tc] of Object.entries(types)) {
      for (const [sn, sc] of Object.entries(sizes)) {
        for (const hasDot of [true, false]) {
          const comp = figma.createComponent();
          comp.name = `Color=${tn}, Size=${sn}, Dot=${hasDot ? "Yes" : "No"}`;
          comp.layoutMode = "HORIZONTAL";
          comp.primaryAxisAlignItems = "CENTER";
          comp.counterAxisAlignItems = "CENTER";
          comp.paddingLeft = sc.px; comp.paddingRight = sc.px;
          comp.paddingTop = sc.py; comp.paddingBottom = sc.py;
          comp.itemSpacing = 6;
          comp.cornerRadius = 999;
          comp.primaryAxisSizingMode = "AUTO";
          comp.counterAxisSizingMode = "AUTO";
          comp.fills = [{ type: "SOLID", color: hex(tc.bg) }];

          if (hasDot) {
            const dot = figma.createEllipse();
            dot.name = "Dot";
            dot.resize(6, 6);
            dot.fills = [{ type: "SOLID", color: hex(tc.dot) }];
            comp.appendChild(dot);
          }

          const label = figma.createText();
          label.characters = "Badge";
          label.fontName = { family: "Inter", style: "Medium" };
          label.fontSize = sc.fs;
          label.fills = [{ type: "SOLID", color: hex(tc.text) }];
          comp.appendChild(label);
          comps.push(comp);
        }
      }
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Badge";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // ════════════════════════════════════════
  // AVATAR
  // ════════════════════════════════════════
  {
    const sizes = { XS: 24, SM: 32, MD: 40, LG: 48, XL: 64, "2XL": 80 };
    const comps = [];
    for (const [sn, sz] of Object.entries(sizes)) {
      for (const type of ["Initials", "Placeholder"]) {
        const comp = figma.createComponent();
        comp.name = `Size=${sn}, Type=${type}`;
        comp.layoutMode = "HORIZONTAL";
        comp.primaryAxisAlignItems = "CENTER";
        comp.counterAxisAlignItems = "CENTER";
        comp.resize(sz, sz);
        comp.primaryAxisSizingMode = "FIXED";
        comp.counterAxisSizingMode = "FIXED";
        comp.cornerRadius = 999;
        comp.fills = [{ type: "SOLID", color: hex("#EEF2FF") }];

        if (type === "Initials") {
          const txt = figma.createText();
          txt.characters = "DP";
          txt.fontName = { family: "Inter", style: "Semi Bold" };
          txt.fontSize = Math.max(10, Math.round(sz * 0.4));
          txt.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
          comp.appendChild(txt);
        } else {
          const icon = figma.createEllipse();
          icon.resize(sz * 0.5, sz * 0.5);
          icon.fills = [{ type: "SOLID", color: hex("#A5B4FC") }];
          comp.appendChild(icon);
        }
        comps.push(comp);
      }
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Avatar";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // ════════════════════════════════════════
  // TOGGLE / SWITCH
  // ════════════════════════════════════════
  {
    const comps = [];
    for (const sz of ["SM", "MD"]) {
      for (const st of ["Off", "On", "Disabled Off", "Disabled On"]) {
        const w = sz === "SM" ? 36 : 44;
        const h = sz === "SM" ? 20 : 24;
        const thumbSz = sz === "SM" ? 16 : 20;
        const isOn = st.includes("On");
        const isDis = st.includes("Disabled");

        const comp = figma.createComponent();
        comp.name = `Size=${sz}, State=${st}`;
        comp.resize(w, h);
        comp.cornerRadius = 999;
        comp.fills = [{ type: "SOLID", color: hex(isOn ? "#4F46E5" : "#D1D5DB") }];
        if (isDis) comp.opacity = 0.5;

        const thumb = figma.createEllipse();
        thumb.name = "Thumb";
        thumb.resize(thumbSz, thumbSz);
        thumb.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
        thumb.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 1 }, radius: 3, spread: 0, visible: true }];
        thumb.x = isOn ? w - thumbSz - 2 : 2;
        thumb.y = (h - thumbSz) / 2;
        comp.appendChild(thumb);

        comps.push(comp);
      }
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Toggle";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // ════════════════════════════════════════
  // CHECKBOX
  // ════════════════════════════════════════
  {
    const comps = [];
    for (const sz of ["SM", "MD"]) {
      for (const st of ["Unchecked", "Checked", "Indeterminate", "Disabled"]) {
        const boxSz = sz === "SM" ? 16 : 20;
        const comp = figma.createComponent();
        comp.name = `Size=${sz}, State=${st}`;
        comp.layoutMode = "HORIZONTAL";
        comp.primaryAxisAlignItems = "CENTER";
        comp.counterAxisAlignItems = "CENTER";
        comp.itemSpacing = 8;
        comp.primaryAxisSizingMode = "AUTO";
        comp.counterAxisSizingMode = "AUTO";
        comp.fills = [];

        const box = figma.createFrame();
        box.name = "Box";
        box.resize(boxSz, boxSz);
        box.cornerRadius = 4;
        if (st === "Checked" || st === "Indeterminate") {
          box.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
        } else {
          box.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
          box.strokes = [{ type: "SOLID", color: hex("#D1D5DB") }];
          box.strokeWeight = 1.5;
        }
        comp.appendChild(box);

        if (st === "Checked") {
          const check = figma.createRectangle();
          check.name = "Checkmark";
          check.resize(boxSz * 0.5, boxSz * 0.3);
          check.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
          check.cornerRadius = 1;
          check.x = boxSz * 0.25; check.y = boxSz * 0.35;
          box.appendChild(check);
        }

        const label = figma.createText();
        label.characters = "Checkbox label";
        label.fontName = { family: "Inter", style: "Regular" };
        label.fontSize = sz === "SM" ? 14 : 16;
        label.fills = [{ type: "SOLID", color: hex(st === "Disabled" ? "#9CA3AF" : "#374151") }];
        comp.appendChild(label);

        if (st === "Disabled") comp.opacity = 0.6;
        comps.push(comp);
      }
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Checkbox";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // ════════════════════════════════════════
  // STAT CARD (for dashboards)
  // ════════════════════════════════════════
  {
    const comps = [];
    for (const trend of ["Up", "Down", "Neutral"]) {
      const comp = figma.createComponent();
      comp.name = `Trend=${trend}`;
      comp.layoutMode = "VERTICAL";
      comp.primaryAxisSizingMode = "AUTO";
      comp.counterAxisSizingMode = "FIXED";
      comp.resize(280, 10);
      comp.paddingLeft = 24; comp.paddingRight = 24;
      comp.paddingTop = 24; comp.paddingBottom = 24;
      comp.itemSpacing = 16;
      comp.cornerRadius = 12;
      comp.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
      comp.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
      comp.strokeWeight = 1;
      comp.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.05 }, offset: { x: 0, y: 1 }, radius: 2, spread: 0, visible: true }];

      // Label
      const lbl = figma.createText();
      lbl.characters = "Total Revenue";
      lbl.fontName = { family: "Inter", style: "Medium" };
      lbl.fontSize = 14;
      lbl.fills = [{ type: "SOLID", color: hex("#6B7280") }];
      comp.appendChild(lbl);
      lbl.layoutSizingHorizontal = "FILL";

      // Value row
      const row = figma.createFrame();
      row.name = "Value Row";
      row.layoutMode = "HORIZONTAL";
      row.primaryAxisAlignItems = "MIN";
      row.counterAxisAlignItems = "BASELINE";
      row.itemSpacing = 12;
      row.primaryAxisSizingMode = "AUTO";
      row.counterAxisSizingMode = "AUTO";
      row.fills = [];

      const val = figma.createText();
      val.characters = "$45,231.89";
      val.fontName = { family: "Inter", style: "Bold" };
      val.fontSize = 30;
      val.fills = [{ type: "SOLID", color: hex("#111827") }];
      row.appendChild(val);

      // Trend badge
      const badge = figma.createFrame();
      badge.name = "Trend";
      badge.layoutMode = "HORIZONTAL";
      badge.primaryAxisAlignItems = "CENTER";
      badge.counterAxisAlignItems = "CENTER";
      badge.paddingLeft = 8; badge.paddingRight = 8;
      badge.paddingTop = 4; badge.paddingBottom = 4;
      badge.itemSpacing = 4;
      badge.cornerRadius = 999;
      badge.primaryAxisSizingMode = "AUTO";
      badge.counterAxisSizingMode = "AUTO";

      const trendColor = trend === "Up" ? "#059669" : trend === "Down" ? "#DC2626" : "#6B7280";
      const trendBg = trend === "Up" ? "#ECFDF5" : trend === "Down" ? "#FEF2F2" : "#F3F4F6";
      badge.fills = [{ type: "SOLID", color: hex(trendBg) }];

      const trendText = figma.createText();
      trendText.characters = trend === "Up" ? "+20.1%" : trend === "Down" ? "-4.3%" : "0.0%";
      trendText.fontName = { family: "Inter", style: "Medium" };
      trendText.fontSize = 12;
      trendText.fills = [{ type: "SOLID", color: hex(trendColor) }];
      badge.appendChild(trendText);
      row.appendChild(badge);

      comp.appendChild(row);
      row.layoutSizingHorizontal = "FILL";

      // Subtitle
      const sub = figma.createText();
      sub.characters = "from last month";
      sub.fontName = { family: "Inter", style: "Regular" };
      sub.fontSize = 12;
      sub.fills = [{ type: "SOLID", color: hex("#9CA3AF") }];
      comp.appendChild(sub);
      sub.layoutSizingHorizontal = "FILL";

      comps.push(comp);
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Stat Card";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // ════════════════════════════════════════
  // TABLE ROW
  // ════════════════════════════════════════
  {
    const comps = [];
    for (const type of ["Header", "Body", "Body Hover"]) {
      const comp = figma.createComponent();
      comp.name = `Type=${type}`;
      comp.layoutMode = "HORIZONTAL";
      comp.primaryAxisAlignItems = "CENTER";
      comp.counterAxisAlignItems = "CENTER";
      comp.paddingLeft = 24; comp.paddingRight = 24;
      comp.paddingTop = 12; comp.paddingBottom = 12;
      comp.primaryAxisSizingMode = "FIXED";
      comp.counterAxisSizingMode = "AUTO";
      comp.resize(960, 10);
      comp.fills = type === "Body Hover" ? [{ type: "SOLID", color: hex("#F9FAFB") }] : [{ type: "SOLID", color: hex("#FFFFFF") }];
      if (type !== "Header") {
        comp.strokes = [{ type: "SOLID", color: hex("#F3F4F6") }];
        comp.strokeWeight = 1;
        comp.strokesIncludedInLayout = false;
      }

      const cols = ["Name", "Email", "Status", "Role", "Actions"];
      const widths = [200, 260, 120, 160, 120];
      const isHeader = type === "Header";

      for (let i = 0; i < cols.length; i++) {
        const cell = figma.createFrame();
        cell.name = cols[i];
        cell.layoutMode = "HORIZONTAL";
        cell.counterAxisAlignItems = "CENTER";
        cell.primaryAxisSizingMode = "FIXED";
        cell.counterAxisSizingMode = "AUTO";
        cell.resize(widths[i], 10);
        cell.fills = [];

        const txt = figma.createText();
        txt.characters = isHeader ? cols[i] : (
          i === 0 ? "Olivia Rhye" :
          i === 1 ? "olivia@example.com" :
          i === 2 ? "Active" :
          i === 3 ? "Admin" : "Edit"
        );
        txt.fontName = { family: "Inter", style: isHeader ? "Medium" : "Regular" };
        txt.fontSize = isHeader ? 12 : 14;
        txt.fills = [{ type: "SOLID", color: hex(isHeader ? "#6B7280" : (i === 4 ? "#4F46E5" : "#374151")) }];
        if (isHeader) txt.letterSpacing = { value: 0.5, unit: "PIXELS" };
        cell.appendChild(txt);

        comp.appendChild(cell);
      }

      comps.push(comp);
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Table Row";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // ════════════════════════════════════════
  // SIDEBAR NAV ITEM
  // ════════════════════════════════════════
  {
    const comps = [];
    for (const st of ["Default", "Active", "Hover"]) {
      const comp = figma.createComponent();
      comp.name = `State=${st}`;
      comp.layoutMode = "HORIZONTAL";
      comp.primaryAxisAlignItems = "MIN";
      comp.counterAxisAlignItems = "CENTER";
      comp.paddingLeft = 12; comp.paddingRight = 12;
      comp.paddingTop = 10; comp.paddingBottom = 10;
      comp.itemSpacing = 12;
      comp.cornerRadius = 8;
      comp.primaryAxisSizingMode = "FIXED";
      comp.counterAxisSizingMode = "AUTO";
      comp.resize(240, 10);

      if (st === "Active") comp.fills = [{ type: "SOLID", color: hex("#EEF2FF") }];
      else if (st === "Hover") comp.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
      else comp.fills = [];

      const icon = figma.createRectangle();
      icon.name = "Icon";
      icon.resize(20, 20);
      icon.cornerRadius = 4;
      icon.fills = [{ type: "SOLID", color: hex(st === "Active" ? "#4F46E5" : "#6B7280") }];
      comp.appendChild(icon);

      const label = figma.createText();
      label.characters = "Dashboard";
      label.fontName = { family: "Inter", style: st === "Active" ? "Semi Bold" : "Medium" };
      label.fontSize = 14;
      label.fills = [{ type: "SOLID", color: hex(st === "Active" ? "#4F46E5" : "#374151") }];
      comp.appendChild(label);
      label.layoutSizingHorizontal = "FILL";

      comps.push(comp);
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Nav Item";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // ════════════════════════════════════════
  // DROPDOWN / SELECT
  // ════════════════════════════════════════
  {
    const comps = [];
    for (const st of ["Default", "Open", "Disabled"]) {
      const comp = figma.createComponent();
      comp.name = `State=${st}`;
      comp.layoutMode = "HORIZONTAL";
      comp.primaryAxisAlignItems = "CENTER";
      comp.counterAxisAlignItems = "CENTER";
      comp.paddingLeft = 14; comp.paddingRight = 14;
      comp.paddingTop = 10; comp.paddingBottom = 10;
      comp.itemSpacing = 8;
      comp.cornerRadius = 8;
      comp.primaryAxisSizingMode = "FIXED";
      comp.counterAxisSizingMode = "AUTO";
      comp.resize(320, 10);
      comp.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
      comp.strokes = [{ type: "SOLID", color: hex(st === "Open" ? "#6366F1" : "#D1D5DB") }];
      comp.strokeWeight = st === "Open" ? 2 : 1;
      if (st === "Disabled") comp.opacity = 0.5;

      const val = figma.createText();
      val.characters = "Select option...";
      val.fontName = { family: "Inter", style: "Regular" };
      val.fontSize = 14;
      val.fills = [{ type: "SOLID", color: hex("#9CA3AF") }];
      comp.appendChild(val);
      val.layoutSizingHorizontal = "FILL";

      const arrow = figma.createRectangle();
      arrow.name = "Chevron";
      arrow.resize(12, 12);
      arrow.fills = [{ type: "SOLID", color: hex("#9CA3AF") }];
      arrow.cornerRadius = 2;
      comp.appendChild(arrow);

      comps.push(comp);
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Select";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // ════════════════════════════════════════
  // TOAST / NOTIFICATION
  // ════════════════════════════════════════
  {
    const types = {
      Success: { bg: "#ECFDF5", border: "#A7F3D0", icon: "#10B981", text: "#065F46" },
      Error: { bg: "#FEF2F2", border: "#FECACA", icon: "#EF4444", text: "#991B1B" },
      Warning: { bg: "#FFFBEB", border: "#FDE68A", icon: "#F59E0B", text: "#92400E" },
      Info: { bg: "#EFF6FF", border: "#BFDBFE", icon: "#3B82F6", text: "#1E40AF" },
    };
    const comps = [];
    for (const [tn, tc] of Object.entries(types)) {
      const comp = figma.createComponent();
      comp.name = `Type=${tn}`;
      comp.layoutMode = "HORIZONTAL";
      comp.primaryAxisAlignItems = "MIN";
      comp.counterAxisAlignItems = "MIN";
      comp.paddingLeft = 16; comp.paddingRight = 16;
      comp.paddingTop = 16; comp.paddingBottom = 16;
      comp.itemSpacing = 12;
      comp.cornerRadius = 12;
      comp.primaryAxisSizingMode = "FIXED";
      comp.counterAxisSizingMode = "AUTO";
      comp.resize(400, 10);
      comp.fills = [{ type: "SOLID", color: hex(tc.bg) }];
      comp.strokes = [{ type: "SOLID", color: hex(tc.border) }];
      comp.strokeWeight = 1;

      const icon = figma.createEllipse();
      icon.name = "Icon";
      icon.resize(20, 20);
      icon.fills = [{ type: "SOLID", color: hex(tc.icon) }];
      comp.appendChild(icon);

      const textCol = figma.createFrame();
      textCol.name = "Content";
      textCol.layoutMode = "VERTICAL";
      textCol.itemSpacing = 4;
      textCol.primaryAxisSizingMode = "AUTO";
      textCol.counterAxisSizingMode = "AUTO";
      textCol.fills = [];

      const title = figma.createText();
      title.characters = `${tn} notification`;
      title.fontName = { family: "Inter", style: "Semi Bold" };
      title.fontSize = 14;
      title.fills = [{ type: "SOLID", color: hex(tc.text) }];
      textCol.appendChild(title);

      const desc = figma.createText();
      desc.characters = "This is a description of the notification with more details.";
      desc.fontName = { family: "Inter", style: "Regular" };
      desc.fontSize = 14;
      desc.fills = [{ type: "SOLID", color: hex(tc.text) }];
      desc.opacity = 0.8;
      textCol.appendChild(desc);

      comp.appendChild(textCol);
      textCol.layoutSizingHorizontal = "FILL";

      comps.push(comp);
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Toast";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // ════════════════════════════════════════
  // MODAL / DIALOG
  // ════════════════════════════════════════
  {
    const comp = figma.createComponent();
    comp.name = "Modal";
    comp.layoutMode = "VERTICAL";
    comp.primaryAxisSizingMode = "AUTO";
    comp.counterAxisSizingMode = "FIXED";
    comp.resize(480, 10);
    comp.paddingLeft = 24; comp.paddingRight = 24;
    comp.paddingTop = 24; comp.paddingBottom = 24;
    comp.itemSpacing = 20;
    comp.cornerRadius = 16;
    comp.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    comp.effects = [
      { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.1 }, offset: { x: 0, y: 20 }, radius: 25, spread: -5, visible: true },
      { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.04 }, offset: { x: 0, y: 8 }, radius: 10, spread: -6, visible: true },
    ];

    // Header
    const header = figma.createFrame();
    header.name = "Header";
    header.layoutMode = "VERTICAL";
    header.itemSpacing = 8;
    header.primaryAxisSizingMode = "AUTO";
    header.fills = [];
    comp.appendChild(header);
    header.layoutSizingHorizontal = "FILL";

    const title = figma.createText();
    title.characters = "Delete project";
    title.fontName = { family: "Inter", style: "Semi Bold" };
    title.fontSize = 18;
    title.fills = [{ type: "SOLID", color: hex("#111827") }];
    header.appendChild(title);
    title.layoutSizingHorizontal = "FILL";

    const desc = figma.createText();
    desc.characters = "Are you sure you want to delete this project? This action cannot be undone.";
    desc.fontName = { family: "Inter", style: "Regular" };
    desc.fontSize = 14;
    desc.fills = [{ type: "SOLID", color: hex("#6B7280") }];
    header.appendChild(desc);
    desc.layoutSizingHorizontal = "FILL";

    // Divider
    const divider = figma.createRectangle();
    divider.name = "Divider";
    divider.resize(432, 1);
    divider.fills = [{ type: "SOLID", color: hex("#E5E7EB") }];
    comp.appendChild(divider);
    divider.layoutSizingHorizontal = "FILL";

    // Footer buttons
    const footer = figma.createFrame();
    footer.name = "Footer";
    footer.layoutMode = "HORIZONTAL";
    footer.primaryAxisAlignItems = "MAX";
    footer.counterAxisAlignItems = "CENTER";
    footer.itemSpacing = 12;
    footer.primaryAxisSizingMode = "FIXED";
    footer.counterAxisSizingMode = "AUTO";
    footer.fills = [];
    comp.appendChild(footer);
    footer.layoutSizingHorizontal = "FILL";

    // Cancel button
    const cancelBtn = figma.createFrame();
    cancelBtn.name = "Cancel";
    cancelBtn.layoutMode = "HORIZONTAL";
    cancelBtn.primaryAxisAlignItems = "CENTER";
    cancelBtn.counterAxisAlignItems = "CENTER";
    cancelBtn.paddingLeft = 16; cancelBtn.paddingRight = 16;
    cancelBtn.paddingTop = 10; cancelBtn.paddingBottom = 10;
    cancelBtn.cornerRadius = 8;
    cancelBtn.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    cancelBtn.strokes = [{ type: "SOLID", color: hex("#D1D5DB") }];
    cancelBtn.strokeWeight = 1;
    cancelBtn.primaryAxisSizingMode = "AUTO";
    cancelBtn.counterAxisSizingMode = "AUTO";
    const cancelTxt = figma.createText();
    cancelTxt.characters = "Cancel";
    cancelTxt.fontName = { family: "Inter", style: "Semi Bold" };
    cancelTxt.fontSize = 14;
    cancelTxt.fills = [{ type: "SOLID", color: hex("#374151") }];
    cancelBtn.appendChild(cancelTxt);
    footer.appendChild(cancelBtn);

    // Delete button
    const delBtn = figma.createFrame();
    delBtn.name = "Delete";
    delBtn.layoutMode = "HORIZONTAL";
    delBtn.primaryAxisAlignItems = "CENTER";
    delBtn.counterAxisAlignItems = "CENTER";
    delBtn.paddingLeft = 16; delBtn.paddingRight = 16;
    delBtn.paddingTop = 10; delBtn.paddingBottom = 10;
    delBtn.cornerRadius = 8;
    delBtn.fills = [{ type: "SOLID", color: hex("#DC2626") }];
    delBtn.primaryAxisSizingMode = "AUTO";
    delBtn.counterAxisSizingMode = "AUTO";
    const delTxt = figma.createText();
    delTxt.characters = "Delete";
    delTxt.fontName = { family: "Inter", style: "Semi Bold" };
    delTxt.fontSize = 14;
    delTxt.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    delBtn.appendChild(delTxt);
    footer.appendChild(delBtn);

    comp.x = 0; comp.y = yOffset;
    yOffset += comp.height + 100;
  }

  // ════════════════════════════════════════
  // TABS
  // ════════════════════════════════════════
  {
    const comps = [];
    for (const style of ["Underline", "Pill"]) {
      for (const st of ["Default", "Active"]) {
        const comp = figma.createComponent();
        comp.name = `Style=${style}, State=${st}`;
        comp.layoutMode = "HORIZONTAL";
        comp.primaryAxisAlignItems = "CENTER";
        comp.counterAxisAlignItems = "CENTER";
        comp.paddingLeft = style === "Pill" ? 16 : 4;
        comp.paddingRight = style === "Pill" ? 16 : 4;
        comp.paddingTop = style === "Pill" ? 8 : 12;
        comp.paddingBottom = style === "Pill" ? 8 : 12;
        comp.primaryAxisSizingMode = "AUTO";
        comp.counterAxisSizingMode = "AUTO";

        if (style === "Pill") {
          comp.cornerRadius = 8;
          comp.fills = st === "Active" ? [{ type: "SOLID", color: hex("#EEF2FF") }] : [];
        } else {
          comp.fills = [];
          if (st === "Active") {
            comp.strokes = [{ type: "SOLID", color: hex("#4F46E5") }];
            comp.strokeWeight = 2;
            comp.strokeAlign = "INSIDE";
          }
        }

        const label = figma.createText();
        label.characters = "Tab Label";
        label.fontName = { family: "Inter", style: st === "Active" ? "Semi Bold" : "Medium" };
        label.fontSize = 14;
        label.fills = [{ type: "SOLID", color: hex(st === "Active" ? "#4F46E5" : "#6B7280") }];
        comp.appendChild(label);

        comps.push(comp);
      }
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Tab";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // ════════════════════════════════════════
  // PROGRESS BAR
  // ════════════════════════════════════════
  {
    const comps = [];
    for (const pct of [25, 50, 75, 100]) {
      for (const color of ["Primary", "Success", "Warning", "Error"]) {
        const colorMap = { Primary: "#4F46E5", Success: "#10B981", Warning: "#F59E0B", Error: "#EF4444" };
        const comp = figma.createComponent();
        comp.name = `Progress=${pct}, Color=${color}`;
        comp.layoutMode = "VERTICAL";
        comp.primaryAxisSizingMode = "AUTO";
        comp.counterAxisSizingMode = "FIXED";
        comp.resize(320, 10);
        comp.itemSpacing = 8;
        comp.fills = [];

        // Label row
        const labelRow = figma.createFrame();
        labelRow.layoutMode = "HORIZONTAL";
        labelRow.primaryAxisAlignItems = "CENTER";
        labelRow.primaryAxisSizingMode = "FIXED";
        labelRow.counterAxisSizingMode = "AUTO";
        labelRow.fills = [];
        comp.appendChild(labelRow);
        labelRow.layoutSizingHorizontal = "FILL";

        const lbl = figma.createText();
        lbl.characters = "Progress";
        lbl.fontName = { family: "Inter", style: "Medium" };
        lbl.fontSize = 14;
        lbl.fills = [{ type: "SOLID", color: hex("#374151") }];
        labelRow.appendChild(lbl);
        lbl.layoutSizingHorizontal = "FILL";

        const pctTxt = figma.createText();
        pctTxt.characters = `${pct}%`;
        pctTxt.fontName = { family: "Inter", style: "Medium" };
        pctTxt.fontSize = 14;
        pctTxt.fills = [{ type: "SOLID", color: hex("#6B7280") }];
        labelRow.appendChild(pctTxt);

        // Track
        const track = figma.createFrame();
        track.name = "Track";
        track.resize(320, 8);
        track.cornerRadius = 999;
        track.fills = [{ type: "SOLID", color: hex("#F3F4F6") }];
        track.layoutMode = "HORIZONTAL";
        track.primaryAxisSizingMode = "FIXED";
        track.counterAxisSizingMode = "FIXED";
        comp.appendChild(track);
        track.layoutSizingHorizontal = "FILL";

        // Fill
        const fill = figma.createFrame();
        fill.name = "Fill";
        fill.resize(320 * (pct / 100), 8);
        fill.cornerRadius = 999;
        fill.fills = [{ type: "SOLID", color: hex(colorMap[color]) }];
        track.appendChild(fill);

        comps.push(comp);
      }
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Progress";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  figma.notify(`✅ Components created: Button, Input, Badge, Avatar, Toggle, Checkbox, Stat Card, Table Row, Nav Item, Select, Toast, Modal, Tab, Progress — at y=0 to ${yOffset}`);
})();
