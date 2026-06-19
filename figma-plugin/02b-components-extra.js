// ============================================================
// NOVA UI KIT â€” Part 2B: Extra Components
// Radio, Alert, Tooltip, Breadcrumb, Pagination, Skeleton,
// Divider, Card variants, Avatar Group
// Run AFTER 02-components.js
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

  // Find last component to offset below
  for (const child of page.children) {
    const bottom = child.y + child.height;
    if (bottom > yOffset) yOffset = bottom;
  }
  yOffset += 120;

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // RADIO BUTTON
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    const comps = [];
    for (const sz of ["SM", "MD"]) {
      for (const st of ["Unselected", "Selected", "Disabled"]) {
        const circleSz = sz === "SM" ? 16 : 20;
        const dotSz = sz === "SM" ? 6 : 8;
        const comp = figma.createComponent();
        comp.name = `Size=${sz}, State=${st}`;
        comp.layoutMode = "HORIZONTAL";
        comp.primaryAxisAlignItems = "CENTER";
        comp.counterAxisAlignItems = "CENTER";
        comp.itemSpacing = 8;
        comp.primaryAxisSizingMode = "AUTO";
        comp.counterAxisSizingMode = "AUTO";
        comp.fills = [];

        const circle = figma.createEllipse();
        circle.name = "Circle";
        circle.resize(circleSz, circleSz);
        if (st === "Selected") {
          circle.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
        } else {
          circle.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
          circle.strokes = [{ type: "SOLID", color: hex("#D1D5DB") }];
          circle.strokeWeight = 1.5;
        }
        comp.appendChild(circle);

        if (st === "Selected") {
          const dot = figma.createEllipse();
          dot.name = "Dot";
          dot.resize(dotSz, dotSz);
          dot.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
          dot.x = (circleSz - dotSz) / 2;
          dot.y = (circleSz - dotSz) / 2;
          circle.appendChild(dot);
        }

        const label = figma.createText();
        label.characters = "Radio label";
        label.fontName = { family: "Inter", style: "Regular" };
        label.fontSize = sz === "SM" ? 14 : 16;
        label.fills = [{ type: "SOLID", color: hex(st === "Disabled" ? "#9CA3AF" : "#374151") }];
        comp.appendChild(label);

        if (st === "Disabled") comp.opacity = 0.6;
        comps.push(comp);
      }
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Radio";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // ALERT / BANNER
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    const types = {
      Info:    { bg: "#EFF6FF", border: "#BFDBFE", icon: "#3B82F6", title: "#1E40AF", text: "#1E3A5F" },
      Success: { bg: "#ECFDF5", border: "#A7F3D0", icon: "#10B981", title: "#065F46", text: "#064E3B" },
      Warning: { bg: "#FFFBEB", border: "#FDE68A", icon: "#F59E0B", title: "#92400E", text: "#78350F" },
      Error:   { bg: "#FEF2F2", border: "#FECACA", icon: "#EF4444", title: "#991B1B", text: "#7F1D1D" },
    };
    const comps = [];
    for (const [tn, tc] of Object.entries(types)) {
      for (const hasClose of [true, false]) {
        const comp = figma.createComponent();
        comp.name = `Type=${tn}, Close=${hasClose ? "Yes" : "No"}`;
        comp.layoutMode = "HORIZONTAL";
        comp.primaryAxisAlignItems = "MIN";
        comp.counterAxisAlignItems = "MIN";
        comp.paddingLeft = 16; comp.paddingRight = 16;
        comp.paddingTop = 14; comp.paddingBottom = 14;
        comp.itemSpacing = 12;
        comp.cornerRadius = 12;
        comp.primaryAxisSizingMode = "FIXED";
        comp.counterAxisSizingMode = "AUTO";
        comp.resize(480, 10);
        comp.fills = [{ type: "SOLID", color: hex(tc.bg) }];
        comp.strokes = [{ type: "SOLID", color: hex(tc.border) }];
        comp.strokeWeight = 1;

        // Icon placeholder
        const icon = figma.createEllipse();
        icon.name = "Icon";
        icon.resize(20, 20);
        icon.fills = [{ type: "SOLID", color: hex(tc.icon) }];
        comp.appendChild(icon);

        // Content
        const content = figma.createFrame();
        content.name = "Content";
        content.layoutMode = "VERTICAL";
        content.itemSpacing = 4;
        content.primaryAxisSizingMode = "AUTO";
        content.counterAxisSizingMode = "AUTO";
        content.fills = [];

        const title = figma.createText();
        title.characters = `${tn} alert title`;
        title.fontName = { family: "Inter", style: "Semi Bold" };
        title.fontSize = 14;
        title.fills = [{ type: "SOLID", color: hex(tc.title) }];
        content.appendChild(title);
        title.layoutSizingHorizontal = "FILL";

        const desc = figma.createText();
        desc.characters = "A short description providing more context about this alert message.";
        desc.fontName = { family: "Inter", style: "Regular" };
        desc.fontSize = 14;
        desc.fills = [{ type: "SOLID", color: hex(tc.text) }];
        content.appendChild(desc);
        desc.layoutSizingHorizontal = "FILL";

        comp.appendChild(content);
        content.layoutSizingHorizontal = "FILL";

        if (hasClose) {
          const close = figma.createFrame();
          close.name = "Close";
          close.resize(20, 20);
          close.cornerRadius = 4;
          close.fills = [];

          const x1 = figma.createRectangle();
          x1.resize(12, 2);
          x1.fills = [{ type: "SOLID", color: hex(tc.title) }];
          x1.rotation = 45;
          x1.x = 4; x1.y = 9;
          close.appendChild(x1);

          const x2 = figma.createRectangle();
          x2.resize(12, 2);
          x2.fills = [{ type: "SOLID", color: hex(tc.title) }];
          x2.rotation = -45;
          x2.x = 4; x2.y = 9;
          close.appendChild(x2);

          comp.appendChild(close);
        }

        comps.push(comp);
      }
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Alert";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // TOOLTIP
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    const comps = [];
    for (const pos of ["Top", "Bottom", "Left", "Right"]) {
      const comp = figma.createComponent();
      comp.name = `Position=${pos}`;
      comp.layoutMode = "HORIZONTAL";
      comp.primaryAxisAlignItems = "CENTER";
      comp.counterAxisAlignItems = "CENTER";
      comp.paddingLeft = 12; comp.paddingRight = 12;
      comp.paddingTop = 8; comp.paddingBottom = 8;
      comp.cornerRadius = 8;
      comp.primaryAxisSizingMode = "AUTO";
      comp.counterAxisSizingMode = "AUTO";
      comp.fills = [{ type: "SOLID", color: hex("#111827") }];
      comp.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.15 }, offset: { x: 0, y: 4 }, radius: 6, visible: true, blendMode: "NORMAL" }];

      const label = figma.createText();
      label.characters = "Tooltip text";
      label.fontName = { family: "Inter", style: "Medium" };
      label.fontSize = 12;
      label.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
      comp.appendChild(label);

      comps.push(comp);
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Tooltip";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // BREADCRUMB
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    const comp = figma.createComponent();
    comp.name = "Breadcrumb";
    comp.layoutMode = "HORIZONTAL";
    comp.primaryAxisAlignItems = "CENTER";
    comp.counterAxisAlignItems = "CENTER";
    comp.itemSpacing = 8;
    comp.primaryAxisSizingMode = "AUTO";
    comp.counterAxisSizingMode = "AUTO";
    comp.fills = [];

    const items = ["Home", "/", "Products", "/", "Category", "/", "Current Page"];
    for (const item of items) {
      const t = figma.createText();
      t.characters = item;
      t.fontName = { family: "Inter", style: item === "Current Page" ? "Medium" : "Regular" };
      t.fontSize = 14;
      if (item === "/") {
        t.fills = [{ type: "SOLID", color: hex("#D1D5DB") }];
      } else if (item === "Current Page") {
        t.fills = [{ type: "SOLID", color: hex("#111827") }];
      } else {
        t.fills = [{ type: "SOLID", color: hex("#6B7280") }];
      }
      comp.appendChild(t);
    }

    comp.x = 0; comp.y = yOffset;
    yOffset += comp.height + 100;
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // PAGINATION
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    const comp = figma.createComponent();
    comp.name = "Pagination";
    comp.layoutMode = "HORIZONTAL";
    comp.primaryAxisAlignItems = "CENTER";
    comp.counterAxisAlignItems = "CENTER";
    comp.itemSpacing = 4;
    comp.primaryAxisSizingMode = "AUTO";
    comp.counterAxisSizingMode = "AUTO";
    comp.fills = [];

    const pageItems = ["â†", "1", "2", "3", "...", "8", "9", "10", "â†’"];
    for (const item of pageItems) {
      const btn = figma.createFrame();
      btn.name = `Page ${item}`;
      btn.layoutMode = "HORIZONTAL";
      btn.primaryAxisAlignItems = "CENTER";
      btn.counterAxisAlignItems = "CENTER";
      btn.resize(40, 40);
      btn.primaryAxisSizingMode = "FIXED";
      btn.counterAxisSizingMode = "FIXED";
      btn.cornerRadius = 8;

      const isActive = item === "1";
      btn.fills = isActive ? [{ type: "SOLID", color: hex("#4F46E5") }] : [];
      if (!isActive && item !== "..." && item !== "â†" && item !== "â†’") {
        // hover-ready transparent
      }

      const t = figma.createText();
      t.characters = item;
      t.fontName = { family: "Inter", style: isActive ? "Semi Bold" : "Medium" };
      t.fontSize = 14;
      t.fills = [{ type: "SOLID", color: hex(isActive ? "#FFFFFF" : (item === "â†" || item === "â†’" ? "#6B7280" : "#374151")) }];
      btn.appendChild(t);

      comp.appendChild(btn);
    }

    comp.x = 0; comp.y = yOffset;
    yOffset += comp.height + 100;
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SKELETON LOADER
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    const comps = [];
    for (const type of ["Text", "Circle", "Card", "Row"]) {
      const comp = figma.createComponent();
      comp.name = `Type=${type}`;
      comp.fills = [];

      if (type === "Text") {
        comp.layoutMode = "VERTICAL";
        comp.itemSpacing = 12;
        comp.primaryAxisSizingMode = "AUTO";
        comp.counterAxisSizingMode = "FIXED";
        comp.resize(320, 10);

        for (let i = 0; i < 3; i++) {
          const line = figma.createRectangle();
          line.name = "Line";
          line.resize(i === 2 ? 200 : 320, 16);
          line.cornerRadius = 6;
          line.fills = [{ type: "SOLID", color: hex("#E5E7EB") }];
          comp.appendChild(line);
          line.layoutSizingHorizontal = i === 2 ? "HUG" : "FILL";
        }
      } else if (type === "Circle") {
        comp.layoutMode = "HORIZONTAL";
        comp.primaryAxisSizingMode = "AUTO";
        comp.counterAxisSizingMode = "AUTO";
        const circle = figma.createEllipse();
        circle.resize(48, 48);
        circle.fills = [{ type: "SOLID", color: hex("#E5E7EB") }];
        comp.appendChild(circle);
      } else if (type === "Card") {
        comp.layoutMode = "VERTICAL";
        comp.itemSpacing = 16;
        comp.primaryAxisSizingMode = "AUTO";
        comp.counterAxisSizingMode = "FIXED";
        comp.resize(320, 10);
        comp.paddingLeft = 16; comp.paddingRight = 16;
        comp.paddingTop = 16; comp.paddingBottom = 16;
        comp.cornerRadius = 16;
        comp.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
        comp.strokeWeight = 1;

        const img = figma.createRectangle();
        img.resize(288, 160);
        img.cornerRadius = 8;
        img.fills = [{ type: "SOLID", color: hex("#F3F4F6") }];
        comp.appendChild(img);
        img.layoutSizingHorizontal = "FILL";

        for (let i = 0; i < 2; i++) {
          const line = figma.createRectangle();
          line.resize(i === 1 ? 180 : 288, 14);
          line.cornerRadius = 6;
          line.fills = [{ type: "SOLID", color: hex("#E5E7EB") }];
          comp.appendChild(line);
          line.layoutSizingHorizontal = i === 1 ? "HUG" : "FILL";
        }
      } else if (type === "Row") {
        comp.layoutMode = "HORIZONTAL";
        comp.counterAxisAlignItems = "CENTER";
        comp.itemSpacing = 12;
        comp.primaryAxisSizingMode = "FIXED";
        comp.counterAxisSizingMode = "AUTO";
        comp.resize(480, 10);
        comp.paddingTop = 16; comp.paddingBottom = 16;

        const circle = figma.createEllipse();
        circle.resize(40, 40);
        circle.fills = [{ type: "SOLID", color: hex("#E5E7EB") }];
        comp.appendChild(circle);

        const lines = figma.createFrame();
        lines.layoutMode = "VERTICAL";
        lines.itemSpacing = 8;
        lines.primaryAxisSizingMode = "AUTO";
        lines.counterAxisSizingMode = "AUTO";
        lines.fills = [];

        const l1 = figma.createRectangle();
        l1.resize(200, 14);
        l1.cornerRadius = 6;
        l1.fills = [{ type: "SOLID", color: hex("#E5E7EB") }];
        lines.appendChild(l1);

        const l2 = figma.createRectangle();
        l2.resize(140, 12);
        l2.cornerRadius = 6;
        l2.fills = [{ type: "SOLID", color: hex("#F3F4F6") }];
        lines.appendChild(l2);

        comp.appendChild(lines);
        lines.layoutSizingHorizontal = "FILL";
      }

      comps.push(comp);
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Skeleton";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // DIVIDER
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    const comps = [];
    for (const type of ["Plain", "With Label"]) {
      const comp = figma.createComponent();
      comp.name = `Type=${type}`;
      comp.layoutMode = "HORIZONTAL";
      comp.counterAxisAlignItems = "CENTER";
      comp.primaryAxisSizingMode = "FIXED";
      comp.counterAxisSizingMode = "AUTO";
      comp.resize(480, 10);
      comp.itemSpacing = 16;
      comp.fills = [];

      if (type === "Plain") {
        const line = figma.createRectangle();
        line.resize(480, 1);
        line.fills = [{ type: "SOLID", color: hex("#E5E7EB") }];
        comp.appendChild(line);
        line.layoutSizingHorizontal = "FILL";
      } else {
        const l1 = figma.createRectangle();
        l1.resize(100, 1);
        l1.fills = [{ type: "SOLID", color: hex("#E5E7EB") }];
        comp.appendChild(l1);
        l1.layoutSizingHorizontal = "FILL";

        const label = figma.createText();
        label.characters = "or";
        label.fontName = { family: "Inter", style: "Medium" };
        label.fontSize = 14;
        label.fills = [{ type: "SOLID", color: hex("#9CA3AF") }];
        comp.appendChild(label);

        const l2 = figma.createRectangle();
        l2.resize(100, 1);
        l2.fills = [{ type: "SOLID", color: hex("#E5E7EB") }];
        comp.appendChild(l2);
        l2.layoutSizingHorizontal = "FILL";
      }

      comps.push(comp);
    }
    const set = figma.combineAsVariants(comps, page);
    set.name = "Divider";
    set.x = 0; set.y = yOffset;
    yOffset += set.height + 100;
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // AVATAR GROUP
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    const comp = figma.createComponent();
    comp.name = "Avatar Group";
    comp.layoutMode = "HORIZONTAL";
    comp.primaryAxisAlignItems = "CENTER";
    comp.counterAxisAlignItems = "CENTER";
    comp.primaryAxisSizingMode = "AUTO";
    comp.counterAxisSizingMode = "AUTO";
    comp.fills = [];

    const colors = ["#818CF8", "#34D399", "#F59E0B", "#F87171", "#60A5FA"];
    const initials = ["DP", "JK", "ML", "AW", "KR"];

    for (let i = 0; i < 5; i++) {
      const av = figma.createFrame();
      av.name = `Avatar ${i + 1}`;
      av.layoutMode = "HORIZONTAL";
      av.primaryAxisAlignItems = "CENTER";
      av.counterAxisAlignItems = "CENTER";
      av.resize(36, 36);
      av.primaryAxisSizingMode = "FIXED";
      av.counterAxisSizingMode = "FIXED";
      av.cornerRadius = 999;
      av.fills = [{ type: "SOLID", color: hex(colors[i]) }];
      av.strokes = [{ type: "SOLID", color: hex("#FFFFFF") }];
      av.strokeWeight = 2;
      if (i > 0) av.x = -8;

      const txt = figma.createText();
      txt.characters = initials[i];
      txt.fontName = { family: "Inter", style: "Semi Bold" };
      txt.fontSize = 12;
      txt.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
      av.appendChild(txt);

      comp.appendChild(av);
    }

    // +N counter
    const more = figma.createFrame();
    more.name = "More";
    more.layoutMode = "HORIZONTAL";
    more.primaryAxisAlignItems = "CENTER";
    more.counterAxisAlignItems = "CENTER";
    more.resize(36, 36);
    more.primaryAxisSizingMode = "FIXED";
    more.counterAxisSizingMode = "FIXED";
    more.cornerRadius = 999;
    more.fills = [{ type: "SOLID", color: hex("#F3F4F6") }];
    more.strokes = [{ type: "SOLID", color: hex("#FFFFFF") }];
    more.strokeWeight = 2;

    const moreTxt = figma.createText();
    moreTxt.characters = "+3";
    moreTxt.fontName = { family: "Inter", style: "Semi Bold" };
    moreTxt.fontSize = 12;
    moreTxt.fills = [{ type: "SOLID", color: hex("#6B7280") }];
    more.appendChild(moreTxt);
    comp.appendChild(more);

    comp.x = 0; comp.y = yOffset;
    yOffset += comp.height + 100;
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // BLOG CARD
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    const comp = figma.createComponent();
    comp.name = "Blog Card";
    comp.layoutMode = "VERTICAL";
    comp.primaryAxisSizingMode = "AUTO";
    comp.counterAxisSizingMode = "FIXED";
    comp.resize(360, 10);
    comp.cornerRadius = 16;
    comp.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    comp.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    comp.strokeWeight = 1;
    comp.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.05 }, offset: { x: 0, y: 1 }, radius: 2, visible: true, blendMode: "NORMAL" }];

    // Image
    const img = figma.createRectangle();
    img.name = "Image";
    img.resize(360, 200);
    img.fills = [{ type: "SOLID", color: hex("#F3F4F6") }];
    comp.appendChild(img);
    img.layoutSizingHorizontal = "FILL";

    // Content
    const content = figma.createFrame();
    content.name = "Content";
    content.layoutMode = "VERTICAL";
    content.paddingLeft = 24; content.paddingRight = 24;
    content.paddingTop = 20; content.paddingBottom = 24;
    content.itemSpacing = 12;
    content.primaryAxisSizingMode = "AUTO";
    content.counterAxisSizingMode = "AUTO";
    content.fills = [];

    // Category + date
    const meta = figma.createFrame();
    meta.layoutMode = "HORIZONTAL";
    meta.itemSpacing = 12;
    meta.primaryAxisSizingMode = "AUTO";
    meta.counterAxisSizingMode = "AUTO";
    meta.fills = [];

    const cat = figma.createText();
    cat.characters = "Design";
    cat.fontName = { family: "Inter", style: "Semi Bold" };
    cat.fontSize = 12;
    cat.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
    meta.appendChild(cat);

    const date = figma.createText();
    date.characters = "Jan 15, 2025";
    date.fontName = { family: "Inter", style: "Regular" };
    date.fontSize = 12;
    date.fills = [{ type: "SOLID", color: hex("#9CA3AF") }];
    meta.appendChild(date);
    content.appendChild(meta);

    const title = figma.createText();
    title.characters = "Building a Design System from Scratch";
    title.fontName = { family: "Inter", style: "Semi Bold" };
    title.fontSize = 18;
    title.fills = [{ type: "SOLID", color: hex("#111827") }];
    content.appendChild(title);
    title.layoutSizingHorizontal = "FILL";

    const excerpt = figma.createText();
    excerpt.characters = "Learn the fundamentals of creating a scalable design system that grows with your product.";
    excerpt.fontName = { family: "Inter", style: "Regular" };
    excerpt.fontSize = 14;
    excerpt.fills = [{ type: "SOLID", color: hex("#6B7280") }];
    content.appendChild(excerpt);
    excerpt.layoutSizingHorizontal = "FILL";

    // Author row
    const author = figma.createFrame();
    author.layoutMode = "HORIZONTAL";
    author.counterAxisAlignItems = "CENTER";
    author.itemSpacing = 10;
    author.primaryAxisSizingMode = "AUTO";
    author.counterAxisSizingMode = "AUTO";
    author.fills = [];

    const avatar = figma.createEllipse();
    avatar.resize(28, 28);
    avatar.fills = [{ type: "SOLID", color: hex("#C7D2FE") }];
    author.appendChild(avatar);

    const authorName = figma.createText();
    authorName.characters = "Dang Pham";
    authorName.fontName = { family: "Inter", style: "Medium" };
    authorName.fontSize = 13;
    authorName.fills = [{ type: "SOLID", color: hex("#374151") }];
    author.appendChild(authorName);

    const readTime = figma.createText();
    readTime.characters = "Â· 5 min read";
    readTime.fontName = { family: "Inter", style: "Regular" };
    readTime.fontSize = 13;
    readTime.fills = [{ type: "SOLID", color: hex("#9CA3AF") }];
    author.appendChild(readTime);

    content.appendChild(author);
    comp.appendChild(content);
    content.layoutSizingHorizontal = "FILL";

    comp.x = 0; comp.y = yOffset;
    yOffset += comp.height + 100;
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // PROFILE CARD
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    const comp = figma.createComponent();
    comp.name = "Profile Card";
    comp.layoutMode = "VERTICAL";
    comp.primaryAxisAlignItems = "CENTER";
    comp.counterAxisAlignItems = "CENTER";
    comp.primaryAxisSizingMode = "AUTO";
    comp.counterAxisSizingMode = "FIXED";
    comp.resize(280, 10);
    comp.paddingLeft = 24; comp.paddingRight = 24;
    comp.paddingTop = 32; comp.paddingBottom = 32;
    comp.itemSpacing = 16;
    comp.cornerRadius = 20;
    comp.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    comp.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    comp.strokeWeight = 1;

    // Avatar
    const avatar = figma.createFrame();
    avatar.layoutMode = "HORIZONTAL";
    avatar.primaryAxisAlignItems = "CENTER";
    avatar.counterAxisAlignItems = "CENTER";
    avatar.resize(72, 72);
    avatar.primaryAxisSizingMode = "FIXED";
    avatar.counterAxisSizingMode = "FIXED";
    avatar.cornerRadius = 999;
    avatar.fills = [{ type: "SOLID", color: hex("#EEF2FF") }];

    const initials = figma.createText();
    initials.characters = "DP";
    initials.fontName = { family: "Inter", style: "Bold" };
    initials.fontSize = 24;
    initials.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
    avatar.appendChild(initials);
    comp.appendChild(avatar);

    const name = figma.createText();
    name.characters = "Dang Pham";
    name.fontName = { family: "Inter", style: "Semi Bold" };
    name.fontSize = 18;
    name.fills = [{ type: "SOLID", color: hex("#111827") }];
    comp.appendChild(name);

    const role = figma.createText();
    role.characters = "UI Designer";
    role.fontName = { family: "Inter", style: "Regular" };
    role.fontSize = 14;
    role.fills = [{ type: "SOLID", color: hex("#6B7280") }];
    comp.appendChild(role);

    // Stats row
    const stats = figma.createFrame();
    stats.layoutMode = "HORIZONTAL";
    stats.itemSpacing = 24;
    stats.primaryAxisSizingMode = "AUTO";
    stats.counterAxisSizingMode = "AUTO";
    stats.fills = [];

    for (const [val, label] of [["50+", "Projects"], ["8+", "Years"], ["6", "Companies"]]) {
      const stat = figma.createFrame();
      stat.layoutMode = "VERTICAL";
      stat.primaryAxisAlignItems = "CENTER";
      stat.itemSpacing = 2;
      stat.primaryAxisSizingMode = "AUTO";
      stat.counterAxisSizingMode = "AUTO";
      stat.fills = [];

      const v = figma.createText();
      v.characters = val;
      v.fontName = { family: "Inter", style: "Bold" };
      v.fontSize = 16;
      v.fills = [{ type: "SOLID", color: hex("#111827") }];
      stat.appendChild(v);

      const l = figma.createText();
      l.characters = label;
      l.fontName = { family: "Inter", style: "Regular" };
      l.fontSize = 12;
      l.fills = [{ type: "SOLID", color: hex("#9CA3AF") }];
      stat.appendChild(l);

      stats.appendChild(stat);
    }
    comp.appendChild(stats);

    // Button
    const btn = figma.createFrame();
    btn.name = "Follow Button";
    btn.layoutMode = "HORIZONTAL";
    btn.primaryAxisAlignItems = "CENTER";
    btn.counterAxisAlignItems = "CENTER";
    btn.paddingLeft = 24; btn.paddingRight = 24;
    btn.paddingTop = 10; btn.paddingBottom = 10;
    btn.cornerRadius = 8;
    btn.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
    btn.primaryAxisSizingMode = "AUTO";
    btn.counterAxisSizingMode = "AUTO";

    const btnTxt = figma.createText();
    btnTxt.characters = "View Profile";
    btnTxt.fontName = { family: "Inter", style: "Semi Bold" };
    btnTxt.fontSize = 14;
    btnTxt.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    btn.appendChild(btnTxt);
    comp.appendChild(btn);

    comp.x = 0; comp.y = yOffset;
    yOffset += comp.height + 100;
  }

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // EMPTY STATE
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  {
    const comp = figma.createComponent();
    comp.name = "Empty State";
    comp.layoutMode = "VERTICAL";
    comp.primaryAxisAlignItems = "CENTER";
    comp.counterAxisAlignItems = "CENTER";
    comp.primaryAxisSizingMode = "AUTO";
    comp.counterAxisSizingMode = "FIXED";
    comp.resize(480, 10);
    comp.paddingLeft = 40; comp.paddingRight = 40;
    comp.paddingTop = 60; comp.paddingBottom = 60;
    comp.itemSpacing = 16;
    comp.cornerRadius = 16;
    comp.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    comp.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    comp.strokeWeight = 1;
    comp.strokesIncludedInLayout = true;

    // Icon circle
    const iconBg = figma.createFrame();
    iconBg.layoutMode = "HORIZONTAL";
    iconBg.primaryAxisAlignItems = "CENTER";
    iconBg.counterAxisAlignItems = "CENTER";
    iconBg.resize(56, 56);
    iconBg.primaryAxisSizingMode = "FIXED";
    iconBg.counterAxisSizingMode = "FIXED";
    iconBg.cornerRadius = 999;
    iconBg.fills = [{ type: "SOLID", color: hex("#F3F4F6") }];

    const iconRect = figma.createRectangle();
    iconRect.resize(24, 24);
    iconRect.cornerRadius = 4;
    iconRect.fills = [{ type: "SOLID", color: hex("#9CA3AF") }];
    iconBg.appendChild(iconRect);
    comp.appendChild(iconBg);

    const title = figma.createText();
    title.characters = "No results found";
    title.fontName = { family: "Inter", style: "Semi Bold" };
    title.fontSize = 18;
    title.fills = [{ type: "SOLID", color: hex("#111827") }];
    title.textAlignHorizontal = "CENTER";
    comp.appendChild(title);

    const desc = figma.createText();
    desc.characters = "Try adjusting your search or filter to find what you're looking for.";
    desc.fontName = { family: "Inter", style: "Regular" };
    desc.fontSize = 14;
    desc.fills = [{ type: "SOLID", color: hex("#6B7280") }];
    desc.textAlignHorizontal = "CENTER";
    comp.appendChild(desc);
    desc.layoutSizingHorizontal = "FILL";

    const btn = figma.createFrame();
    btn.layoutMode = "HORIZONTAL";
    btn.primaryAxisAlignItems = "CENTER";
    btn.counterAxisAlignItems = "CENTER";
    btn.paddingLeft = 20; btn.paddingRight = 20;
    btn.paddingTop = 10; btn.paddingBottom = 10;
    btn.cornerRadius = 8;
    btn.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
    btn.primaryAxisSizingMode = "AUTO";
    btn.counterAxisSizingMode = "AUTO";

    const btnTxt = figma.createText();
    btnTxt.characters = "Clear filters";
    btnTxt.fontName = { family: "Inter", style: "Semi Bold" };
    btnTxt.fontSize = 14;
    btnTxt.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    btn.appendChild(btnTxt);
    comp.appendChild(btn);

    comp.x = 0; comp.y = yOffset;
    yOffset += comp.height + 100;
  }

  figma.closePlugin(`âœ… Extra components: Radio, Alert, Tooltip, Breadcrumb, Pagination, Skeleton, Divider, Avatar Group, Blog Card, Profile Card, Empty State`);
})();

