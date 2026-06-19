// ============================================================
// NOVA UI KIT — Part 4: Icon Library + Screen Upgrades
// Adds real vector icons and additional polished screens
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

  // ── ICON LIBRARY ──
  // Lucide-style 24x24 stroke icons as vector paths
  const ICONS = {
    "Home": "M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V9.5Z",
    "BarChart": "M18 20V10 M12 20V4 M6 20V14",
    "Users": "M17 21V19C17 16.79 15.21 15 13 15H5C2.79 15 1 16.79 1 19V21 M9 11C11.21 11 13 9.21 13 7C13 4.79 11.21 3 9 3C6.79 3 5 4.79 5 7C5 9.21 6.79 11 9 11Z M23 21V19C23 17.14 21.73 15.57 20 15.13 M16 3.13C17.73 3.57 19 5.14 19 7C19 8.86 17.73 10.43 16 10.87",
    "ShoppingBag": "M6 2L3 6V20C3 20.55 3.45 21 4 21H20C20.55 21 21 20.55 21 20V6L18 2H6Z M3 6H21 M16 10C16 12.21 14.21 14 12 14C9.79 14 8 12.21 8 10",
    "Mail": "M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z M22 6L12 13L2 6",
    "Bell": "M18 8C18 4.69 15.31 2 12 2C8.69 2 6 4.69 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z M13.73 21C13.37 21.64 12.74 22 12 22C11.26 22 10.63 21.64 10.27 21",
    "Settings": "M12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15Z M19.4 15C19.13 15.63 19.24 16.36 19.7 16.86L19.77 16.93C20.13 17.3 20.34 17.79 20.34 18.31C20.34 18.83 20.13 19.32 19.77 19.69C19.4 20.05 18.91 20.26 18.39 20.26C17.87 20.26 17.38 20.05 17.01 19.69L16.94 19.62C16.44 19.16 15.71 19.05 15.08 19.32C14.46 19.58 14.06 20.18 14.06 20.84V21C14.06 22.1 13.16 23 12.06 23C10.96 23 10.06 22.1 10.06 21V20.91C10.04 20.22 9.6 19.61 8.95 19.36C8.32 19.09 7.59 19.2 7.09 19.66L7.02 19.73C6.65 20.09 6.16 20.3 5.64 20.3C5.12 20.3 4.63 20.09 4.26 19.73C3.53 19 3.53 17.81 4.26 17.09L4.33 17.02C4.79 16.52 4.9 15.79 4.63 15.16C4.37 14.54 3.77 14.14 3.11 14.14H3C1.9 14.14 1 13.24 1 12.14C1 11.04 1.9 10.14 3 10.14H3.09C3.78 10.12 4.39 9.68 4.64 9.03C4.91 8.4 4.8 7.67 4.34 7.17L4.27 7.1C3.54 6.37 3.54 5.18 4.27 4.46C5 3.73 6.19 3.73 6.91 4.46L6.98 4.53C7.48 4.99 8.21 5.1 8.84 4.83H9C9.62 4.57 10.02 3.97 10.02 3.31V3.14C10.02 2.04 10.92 1.14 12.02 1.14C13.12 1.14 14.02 2.04 14.02 3.14V3.23C14.02 3.89 14.42 4.49 15.04 4.75C15.67 5.02 16.4 4.91 16.9 4.45L16.97 4.38C17.7 3.65 18.89 3.65 19.61 4.38C20.34 5.11 20.34 6.3 19.61 7.02L19.54 7.09C19.08 7.59 18.97 8.32 19.24 8.95V9.11C19.5 9.73 20.1 10.13 20.76 10.13H20.93C22.03 10.13 22.93 11.03 22.93 12.13C22.93 13.23 22.03 14.13 20.93 14.13H20.84C20.18 14.13 19.58 14.53 19.32 15.15",
    "Search": "M11 19C15.42 19 19 15.42 19 11C19 6.58 15.42 3 11 3C6.58 3 3 6.58 3 11C3 15.42 6.58 19 11 19Z M21 21L16.65 16.65",
    "Plus": "M12 5V19 M5 12H19",
    "ChevronDown": "M6 9L12 15L18 9",
    "Check": "M20 6L9 17L4 12",
    "X": "M18 6L6 18 M6 6L18 18",
    "ArrowUp": "M12 19V5 M5 12L12 5L19 12",
    "ArrowDown": "M12 5V19 M19 12L12 19L5 12",
    "Calendar": "M16 2V6 M8 2V6 M3 10H21 M5 4H19C20.1 4 21 4.9 21 6V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V6C3 4.9 3.9 4 5 4Z",
    "CreditCard": "M1 10H23 M3 4H21C22.1 4 23 4.9 23 6V18C23 19.1 22.1 20 21 20H3C1.9 20 1 19.1 1 18V6C1 4.9 1.9 4 3 4Z",
    "Filter": "M22 3H2L10 12.46V19L14 21V12.46L22 3Z",
    "Download": "M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15 M7 10L12 15L17 10 M12 15V3",
    "Eye": "M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z M12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15Z",
    "Logout": "M9 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H9 M16 17L21 12L16 7 M21 12H9",
  };

  // Create Icon components
  const iconComps = [];
  for (const [name, pathData] of Object.entries(ICONS)) {
    const comp = figma.createComponent();
    comp.name = `Icon=${name}`;
    comp.resize(24, 24);
    comp.fills = [];

    const vector = figma.createVector();
    vector.vectorPaths = [{ windingRule: "NONZERO", data: pathData }];
    vector.strokes = [{ type: "SOLID", color: hex("#6B7280") }];
    vector.strokeWeight = 2;
    vector.strokeCap = "ROUND";
    vector.strokeJoin = "ROUND";
    vector.fills = [];
    vector.resize(24, 24);
    vector.constraints = { horizontal: "SCALE", vertical: "SCALE" };
    comp.appendChild(vector);

    iconComps.push(comp);
  }

  const iconSet = figma.combineAsVariants(iconComps, page);
  iconSet.name = "Icon";
  iconSet.x = 800;
  iconSet.y = 0;

  // ── ADDITIONAL SCREENS ──

  function createText(chars, font, size, color, parent) {
    const t = figma.createText();
    t.characters = chars;
    t.fontName = { family: "Inter", style: font };
    t.fontSize = size;
    t.fills = [{ type: "SOLID", color: hex(color) }];
    if (parent) parent.appendChild(t);
    return t;
  }

  // ── Screen: Billing & Plans ──
  {
    const screen = figma.createFrame();
    screen.name = "Billing & Plans";
    screen.resize(1440, 900);
    screen.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
    screen.layoutMode = "HORIZONTAL";
    screen.primaryAxisSizingMode = "FIXED";
    screen.counterAxisSizingMode = "FIXED";
    screen.x = 0;
    screen.y = 2000;

    // Sidebar placeholder
    const sidebar = figma.createFrame();
    sidebar.name = "Sidebar";
    sidebar.resize(260, 900);
    sidebar.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    sidebar.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    sidebar.strokeWeight = 1;
    sidebar.layoutMode = "VERTICAL";
    sidebar.paddingLeft = 16; sidebar.paddingRight = 16;
    sidebar.paddingTop = 24; sidebar.paddingBottom = 24;
    sidebar.itemSpacing = 4;
    sidebar.primaryAxisSizingMode = "FIXED";
    sidebar.counterAxisSizingMode = "FIXED";
    screen.appendChild(sidebar);

    const logoRow = figma.createFrame();
    logoRow.layoutMode = "HORIZONTAL";
    logoRow.counterAxisAlignItems = "CENTER";
    logoRow.itemSpacing = 10;
    logoRow.paddingLeft = 12; logoRow.paddingBottom = 20;
    logoRow.fills = [];
    logoRow.primaryAxisSizingMode = "AUTO";
    logoRow.counterAxisSizingMode = "AUTO";
    sidebar.appendChild(logoRow);
    logoRow.layoutSizingHorizontal = "FILL";
    const logoIcon = figma.createFrame();
    logoIcon.resize(32, 32);
    logoIcon.cornerRadius = 8;
    logoIcon.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
    logoRow.appendChild(logoIcon);
    createText("Nova", "Bold", 20, "#111827", logoRow);

    const navLabels = ["Dashboard", "Analytics", "Users", "Products", "Orders", "Billing", "Settings"];
    for (const label of navLabels) {
      const nav = figma.createFrame();
      nav.layoutMode = "HORIZONTAL";
      nav.counterAxisAlignItems = "CENTER";
      nav.paddingLeft = 12; nav.paddingRight = 12;
      nav.paddingTop = 10; nav.paddingBottom = 10;
      nav.itemSpacing = 12;
      nav.cornerRadius = 8;
      nav.primaryAxisSizingMode = "AUTO";
      nav.counterAxisSizingMode = "AUTO";
      nav.fills = label === "Billing" ? [{ type: "SOLID", color: hex("#EEF2FF") }] : [];
      const ic = figma.createRectangle();
      ic.resize(20, 20); ic.cornerRadius = 4;
      ic.fills = [{ type: "SOLID", color: hex(label === "Billing" ? "#4F46E5" : "#9CA3AF") }];
      nav.appendChild(ic);
      createText(label, label === "Billing" ? "Semi Bold" : "Medium", 14, label === "Billing" ? "#4F46E5" : "#374151", nav);
      sidebar.appendChild(nav);
      nav.layoutSizingHorizontal = "FILL";
    }

    // Main content
    const main = figma.createFrame();
    main.name = "Main Content";
    main.layoutMode = "VERTICAL";
    main.paddingLeft = 32; main.paddingRight = 32;
    main.paddingTop = 0; main.paddingBottom = 32;
    main.itemSpacing = 24;
    main.fills = [];
    main.primaryAxisSizingMode = "FIXED";
    main.counterAxisSizingMode = "FIXED";
    screen.appendChild(main);
    main.layoutSizingHorizontal = "FILL";
    main.layoutSizingVertical = "FILL";

    // Top bar
    const topbar = figma.createFrame();
    topbar.layoutMode = "HORIZONTAL";
    topbar.counterAxisAlignItems = "CENTER";
    topbar.paddingTop = 20; topbar.paddingBottom = 20;
    topbar.fills = [];
    topbar.primaryAxisSizingMode = "AUTO";
    topbar.counterAxisSizingMode = "AUTO";
    main.appendChild(topbar);
    topbar.layoutSizingHorizontal = "FILL";
    createText("Billing & Plans", "Semi Bold", 24, "#111827", topbar);

    // Current plan card
    const planCard = figma.createFrame();
    planCard.name = "Current Plan";
    planCard.layoutMode = "HORIZONTAL";
    planCard.primaryAxisAlignItems = "CENTER";
    planCard.counterAxisAlignItems = "CENTER";
    planCard.paddingLeft = 32; planCard.paddingRight = 32;
    planCard.paddingTop = 32; planCard.paddingBottom = 32;
    planCard.cornerRadius = 16;
    planCard.fills = [{
      type: "GRADIENT_LINEAR",
      gradientTransform: [[1, 0, 0], [0, 1, 0]],
      gradientStops: [
        { position: 0, color: { r: 0.31, g: 0.28, b: 0.9, a: 1 } },
        { position: 1, color: { r: 0.58, g: 0.27, b: 0.95, a: 1 } },
      ],
    }];
    planCard.primaryAxisSizingMode = "AUTO";
    planCard.counterAxisSizingMode = "AUTO";
    main.appendChild(planCard);
    planCard.layoutSizingHorizontal = "FILL";

    const planInfo = figma.createFrame();
    planInfo.layoutMode = "VERTICAL";
    planInfo.itemSpacing = 8;
    planInfo.fills = [];
    planInfo.primaryAxisSizingMode = "AUTO";
    planInfo.counterAxisSizingMode = "AUTO";
    planCard.appendChild(planInfo);
    planInfo.layoutSizingHorizontal = "FILL";
    createText("Pro Plan", "Bold", 24, "#FFFFFF", planInfo);
    createText("$29/month • Billed monthly", "Regular", 16, "#C7D2FE", planInfo);
    createText("Your plan renews on July 15, 2026", "Regular", 14, "#A5B4FC", planInfo);

    const upgradeBtn = figma.createFrame();
    upgradeBtn.layoutMode = "HORIZONTAL";
    upgradeBtn.primaryAxisAlignItems = "CENTER";
    upgradeBtn.counterAxisAlignItems = "CENTER";
    upgradeBtn.paddingLeft = 24; upgradeBtn.paddingRight = 24;
    upgradeBtn.paddingTop = 12; upgradeBtn.paddingBottom = 12;
    upgradeBtn.cornerRadius = 10;
    upgradeBtn.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    upgradeBtn.primaryAxisSizingMode = "AUTO";
    upgradeBtn.counterAxisSizingMode = "AUTO";
    createText("Upgrade Plan", "Semi Bold", 14, "#4F46E5", upgradeBtn);
    planCard.appendChild(upgradeBtn);

    // Pricing cards row
    const pricingRow = figma.createFrame();
    pricingRow.name = "Pricing Plans";
    pricingRow.layoutMode = "HORIZONTAL";
    pricingRow.itemSpacing = 20;
    pricingRow.fills = [];
    pricingRow.primaryAxisSizingMode = "AUTO";
    pricingRow.counterAxisSizingMode = "AUTO";
    main.appendChild(pricingRow);
    pricingRow.layoutSizingHorizontal = "FILL";

    const plans = [
      { name: "Starter", price: "$0", desc: "For individuals", features: ["1 user", "5 projects", "1GB storage", "Email support"], current: false },
      { name: "Pro", price: "$29", desc: "For small teams", features: ["10 users", "50 projects", "50GB storage", "Priority support", "API access"], current: true },
      { name: "Enterprise", price: "$99", desc: "For large teams", features: ["Unlimited users", "Unlimited projects", "500GB storage", "24/7 support", "API access", "SSO & SAML", "Custom branding"], current: false },
    ];

    for (const plan of plans) {
      const card = figma.createFrame();
      card.name = plan.name;
      card.layoutMode = "VERTICAL";
      card.paddingLeft = 24; card.paddingRight = 24;
      card.paddingTop = 24; card.paddingBottom = 24;
      card.itemSpacing = 16;
      card.cornerRadius = 12;
      card.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
      card.strokes = [{ type: "SOLID", color: hex(plan.current ? "#4F46E5" : "#E5E7EB") }];
      card.strokeWeight = plan.current ? 2 : 1;
      card.primaryAxisSizingMode = "AUTO";
      card.counterAxisSizingMode = "AUTO";
      pricingRow.appendChild(card);
      card.layoutSizingHorizontal = "FILL";

      if (plan.current) {
        const badge = figma.createFrame();
        badge.layoutMode = "HORIZONTAL";
        badge.paddingLeft = 10; badge.paddingRight = 10;
        badge.paddingTop = 4; badge.paddingBottom = 4;
        badge.cornerRadius = 999;
        badge.fills = [{ type: "SOLID", color: hex("#EEF2FF") }];
        badge.primaryAxisSizingMode = "AUTO";
        badge.counterAxisSizingMode = "AUTO";
        createText("Current Plan", "Medium", 12, "#4F46E5", badge);
        card.appendChild(badge);
      }

      createText(plan.name, "Semi Bold", 18, "#111827", card);
      const priceRow = figma.createFrame();
      priceRow.layoutMode = "HORIZONTAL";
      priceRow.counterAxisAlignItems = "BASELINE";
      priceRow.itemSpacing = 4;
      priceRow.fills = [];
      priceRow.primaryAxisSizingMode = "AUTO";
      priceRow.counterAxisSizingMode = "AUTO";
      createText(plan.price, "Bold", 36, "#111827", priceRow);
      createText("/month", "Regular", 16, "#6B7280", priceRow);
      card.appendChild(priceRow);
      createText(plan.desc, "Regular", 14, "#6B7280", card);

      // Divider
      const div = figma.createRectangle();
      div.resize(10, 1);
      div.fills = [{ type: "SOLID", color: hex("#E5E7EB") }];
      card.appendChild(div);
      div.layoutSizingHorizontal = "FILL";

      for (const feat of plan.features) {
        const featRow = figma.createFrame();
        featRow.layoutMode = "HORIZONTAL";
        featRow.counterAxisAlignItems = "CENTER";
        featRow.itemSpacing = 8;
        featRow.fills = [];
        featRow.primaryAxisSizingMode = "AUTO";
        featRow.counterAxisSizingMode = "AUTO";
        const checkIcon = figma.createEllipse();
        checkIcon.resize(16, 16);
        checkIcon.fills = [{ type: "SOLID", color: hex("#10B981") }];
        featRow.appendChild(checkIcon);
        createText(feat, "Regular", 14, "#374151", featRow);
        card.appendChild(featRow);
        featRow.layoutSizingHorizontal = "FILL";
      }

      // Button
      const btn = figma.createFrame();
      btn.layoutMode = "HORIZONTAL";
      btn.primaryAxisAlignItems = "CENTER";
      btn.counterAxisAlignItems = "CENTER";
      btn.paddingTop = 10; btn.paddingBottom = 10;
      btn.cornerRadius = 8;
      btn.primaryAxisSizingMode = "AUTO";
      btn.counterAxisSizingMode = "AUTO";
      if (plan.current) {
        btn.fills = [];
        btn.strokes = [{ type: "SOLID", color: hex("#D1D5DB") }];
        btn.strokeWeight = 1;
        createText("Current Plan", "Semi Bold", 14, "#6B7280", btn);
      } else {
        btn.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
        createText(plan.name === "Enterprise" ? "Contact Sales" : "Get Started", "Semi Bold", 14, "#FFFFFF", btn);
      }
      card.appendChild(btn);
      btn.layoutSizingHorizontal = "FILL";
    }

    // Payment history
    const historyCard = figma.createFrame();
    historyCard.name = "Payment History";
    historyCard.layoutMode = "VERTICAL";
    historyCard.paddingLeft = 24; historyCard.paddingRight = 24;
    historyCard.paddingTop = 24; historyCard.paddingBottom = 24;
    historyCard.itemSpacing = 16;
    historyCard.cornerRadius = 12;
    historyCard.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    historyCard.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    historyCard.strokeWeight = 1;
    historyCard.primaryAxisSizingMode = "AUTO";
    historyCard.counterAxisSizingMode = "AUTO";
    main.appendChild(historyCard);
    historyCard.layoutSizingHorizontal = "FILL";

    createText("Payment History", "Semi Bold", 16, "#111827", historyCard);

    const payments = [
      { date: "Jun 15, 2026", amount: "$29.00", status: "Paid", invoice: "INV-2026-006" },
      { date: "May 15, 2026", amount: "$29.00", status: "Paid", invoice: "INV-2026-005" },
      { date: "Apr 15, 2026", amount: "$29.00", status: "Paid", invoice: "INV-2026-004" },
    ];

    // Header row
    const headerRow = figma.createFrame();
    headerRow.layoutMode = "HORIZONTAL";
    headerRow.paddingBottom = 8;
    headerRow.fills = [];
    headerRow.primaryAxisSizingMode = "AUTO";
    headerRow.counterAxisSizingMode = "AUTO";
    historyCard.appendChild(headerRow);
    headerRow.layoutSizingHorizontal = "FILL";
    const hCols = ["Date", "Invoice", "Amount", "Status", ""];
    for (const col of hCols) {
      const cell = figma.createFrame();
      cell.fills = [];
      cell.layoutMode = "HORIZONTAL";
      cell.primaryAxisSizingMode = "AUTO";
      cell.counterAxisSizingMode = "AUTO";
      if (col) createText(col, "Medium", 12, "#6B7280", cell);
      headerRow.appendChild(cell);
      cell.layoutSizingHorizontal = "FILL";
    }

    for (const p of payments) {
      const row = figma.createFrame();
      row.layoutMode = "HORIZONTAL";
      row.counterAxisAlignItems = "CENTER";
      row.paddingTop = 12; row.paddingBottom = 12;
      row.fills = [];
      row.strokes = [{ type: "SOLID", color: hex("#F3F4F6") }];
      row.strokeWeight = 1;
      row.strokesIncludedInLayout = false;
      row.primaryAxisSizingMode = "AUTO";
      row.counterAxisSizingMode = "AUTO";
      historyCard.appendChild(row);
      row.layoutSizingHorizontal = "FILL";

      const vals = [p.date, p.invoice, p.amount, p.status, "Download"];
      const colors = ["#374151", "#374151", "#374151", "#059669", "#4F46E5"];
      for (let i = 0; i < vals.length; i++) {
        const cell = figma.createFrame();
        cell.fills = [];
        cell.layoutMode = "HORIZONTAL";
        cell.primaryAxisSizingMode = "AUTO";
        cell.counterAxisSizingMode = "AUTO";
        if (i === 3) {
          const badge = figma.createFrame();
          badge.layoutMode = "HORIZONTAL";
          badge.paddingLeft = 8; badge.paddingRight = 8;
          badge.paddingTop = 2; badge.paddingBottom = 2;
          badge.cornerRadius = 999;
          badge.fills = [{ type: "SOLID", color: hex("#ECFDF5") }];
          badge.primaryAxisSizingMode = "AUTO";
          badge.counterAxisSizingMode = "AUTO";
          createText(vals[i], "Medium", 12, colors[i], badge);
          cell.appendChild(badge);
        } else {
          createText(vals[i], i === 4 ? "Medium" : "Regular", 14, colors[i], cell);
        }
        row.appendChild(cell);
        cell.layoutSizingHorizontal = "FILL";
      }
    }
  }

  // ── Screen: Empty State ──
  {
    const screen = figma.createFrame();
    screen.name = "Empty State — No Data";
    screen.resize(1440, 900);
    screen.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
    screen.layoutMode = "HORIZONTAL";
    screen.primaryAxisSizingMode = "FIXED";
    screen.counterAxisSizingMode = "FIXED";
    screen.x = 0;
    screen.y = 3100;

    // Sidebar
    const sidebar = figma.createFrame();
    sidebar.name = "Sidebar";
    sidebar.resize(260, 900);
    sidebar.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    sidebar.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    sidebar.strokeWeight = 1;
    sidebar.primaryAxisSizingMode = "FIXED";
    sidebar.counterAxisSizingMode = "FIXED";
    screen.appendChild(sidebar);

    // Main
    const main = figma.createFrame();
    main.name = "Main";
    main.layoutMode = "VERTICAL";
    main.primaryAxisAlignItems = "CENTER";
    main.counterAxisAlignItems = "CENTER";
    main.fills = [];
    main.primaryAxisSizingMode = "FIXED";
    main.counterAxisSizingMode = "FIXED";
    screen.appendChild(main);
    main.layoutSizingHorizontal = "FILL";
    main.layoutSizingVertical = "FILL";

    // Empty state illustration
    const emptyBox = figma.createFrame();
    emptyBox.name = "Empty State";
    emptyBox.layoutMode = "VERTICAL";
    emptyBox.primaryAxisAlignItems = "CENTER";
    emptyBox.counterAxisAlignItems = "CENTER";
    emptyBox.itemSpacing = 16;
    emptyBox.fills = [];
    emptyBox.primaryAxisSizingMode = "AUTO";
    emptyBox.counterAxisSizingMode = "AUTO";

    const circle = figma.createEllipse();
    circle.resize(80, 80);
    circle.fills = [{ type: "SOLID", color: hex("#EEF2FF") }];
    emptyBox.appendChild(circle);

    const innerCircle = figma.createEllipse();
    innerCircle.resize(40, 40);
    innerCircle.fills = [{ type: "SOLID", color: hex("#C7D2FE") }];
    innerCircle.x = 20; innerCircle.y = 20;
    circle.appendChild(innerCircle);

    createText("No projects yet", "Semi Bold", 20, "#111827", emptyBox);
    createText("Get started by creating your first project.\nIt only takes a few seconds.", "Regular", 16, "#6B7280", emptyBox);

    const addBtn = figma.createFrame();
    addBtn.layoutMode = "HORIZONTAL";
    addBtn.primaryAxisAlignItems = "CENTER";
    addBtn.counterAxisAlignItems = "CENTER";
    addBtn.paddingLeft = 20; addBtn.paddingRight = 20;
    addBtn.paddingTop = 12; addBtn.paddingBottom = 12;
    addBtn.itemSpacing = 8;
    addBtn.cornerRadius = 10;
    addBtn.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
    addBtn.primaryAxisSizingMode = "AUTO";
    addBtn.counterAxisSizingMode = "AUTO";
    createText("+ Create Project", "Semi Bold", 14, "#FFFFFF", addBtn);
    emptyBox.appendChild(addBtn);

    main.appendChild(emptyBox);
  }

  // ── Screen: Notifications ──
  {
    const screen = figma.createFrame();
    screen.name = "Notifications";
    screen.resize(1440, 900);
    screen.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
    screen.layoutMode = "HORIZONTAL";
    screen.primaryAxisSizingMode = "FIXED";
    screen.counterAxisSizingMode = "FIXED";
    screen.x = 0;
    screen.y = 4200;

    const sidebar = figma.createFrame();
    sidebar.resize(260, 900);
    sidebar.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    sidebar.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    sidebar.strokeWeight = 1;
    sidebar.primaryAxisSizingMode = "FIXED";
    sidebar.counterAxisSizingMode = "FIXED";
    screen.appendChild(sidebar);

    const main = figma.createFrame();
    main.name = "Main";
    main.layoutMode = "VERTICAL";
    main.paddingLeft = 32; main.paddingRight = 32;
    main.paddingTop = 24; main.paddingBottom = 24;
    main.itemSpacing = 20;
    main.fills = [];
    main.primaryAxisSizingMode = "FIXED";
    main.counterAxisSizingMode = "FIXED";
    screen.appendChild(main);
    main.layoutSizingHorizontal = "FILL";
    main.layoutSizingVertical = "FILL";

    // Header
    const header = figma.createFrame();
    header.layoutMode = "HORIZONTAL";
    header.counterAxisAlignItems = "CENTER";
    header.itemSpacing = 12;
    header.fills = [];
    header.primaryAxisSizingMode = "AUTO";
    header.counterAxisSizingMode = "AUTO";
    main.appendChild(header);
    header.layoutSizingHorizontal = "FILL";
    createText("Notifications", "Semi Bold", 24, "#111827", header);
    const spacer = figma.createFrame();
    spacer.fills = [];
    spacer.layoutMode = "HORIZONTAL";
    spacer.primaryAxisSizingMode = "FIXED";
    spacer.counterAxisSizingMode = "FIXED";
    spacer.resize(10, 1);
    header.appendChild(spacer);
    spacer.layoutSizingHorizontal = "FILL";
    const markAll = figma.createFrame();
    markAll.layoutMode = "HORIZONTAL";
    markAll.paddingLeft = 16; markAll.paddingRight = 16;
    markAll.paddingTop = 8; markAll.paddingBottom = 8;
    markAll.cornerRadius = 8;
    markAll.fills = [];
    markAll.strokes = [{ type: "SOLID", color: hex("#D1D5DB") }];
    markAll.strokeWeight = 1;
    markAll.primaryAxisSizingMode = "AUTO";
    markAll.counterAxisSizingMode = "AUTO";
    createText("Mark all as read", "Medium", 14, "#374151", markAll);
    header.appendChild(markAll);

    // Notification items
    const notifications = [
      { type: "info", title: "New team member", desc: "Sarah Chen joined your team as Designer", time: "2 min ago", unread: true },
      { type: "success", title: "Deployment successful", desc: "v2.4.0 deployed to production", time: "1 hour ago", unread: true },
      { type: "warning", title: "Storage limit approaching", desc: "You've used 45GB of 50GB storage", time: "3 hours ago", unread: true },
      { type: "info", title: "Comment on Dashboard UI", desc: "Alex mentioned you: \"@Dang can you review this layout?\"", time: "5 hours ago", unread: false },
      { type: "success", title: "Invoice paid", desc: "Payment of $29.00 received for Pro plan", time: "1 day ago", unread: false },
      { type: "info", title: "Weekly report ready", desc: "Your analytics report for last week is ready to view", time: "2 days ago", unread: false },
    ];

    const typeColors = { info: "#3B82F6", success: "#10B981", warning: "#F59E0B", error: "#EF4444" };

    for (const n of notifications) {
      const item = figma.createFrame();
      item.layoutMode = "HORIZONTAL";
      item.primaryAxisAlignItems = "MIN";
      item.counterAxisAlignItems = "MIN";
      item.paddingLeft = 20; item.paddingRight = 20;
      item.paddingTop = 16; item.paddingBottom = 16;
      item.itemSpacing = 16;
      item.cornerRadius = 12;
      item.fills = [{ type: "SOLID", color: hex(n.unread ? "#FFFFFF" : "#F9FAFB") }];
      if (n.unread) {
        item.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
        item.strokeWeight = 1;
      }
      item.primaryAxisSizingMode = "AUTO";
      item.counterAxisSizingMode = "AUTO";
      main.appendChild(item);
      item.layoutSizingHorizontal = "FILL";

      // Dot / icon
      const dot = figma.createEllipse();
      dot.resize(8, 8);
      dot.fills = [{ type: "SOLID", color: hex(n.unread ? typeColors[n.type] : "#D1D5DB") }];
      const dotWrap = figma.createFrame();
      dotWrap.resize(8, 24);
      dotWrap.fills = [];
      dotWrap.layoutMode = "VERTICAL";
      dotWrap.primaryAxisAlignItems = "CENTER";
      dotWrap.counterAxisAlignItems = "CENTER";
      dotWrap.primaryAxisSizingMode = "FIXED";
      dotWrap.counterAxisSizingMode = "FIXED";
      dotWrap.appendChild(dot);
      item.appendChild(dotWrap);

      // Content
      const content = figma.createFrame();
      content.layoutMode = "VERTICAL";
      content.itemSpacing = 4;
      content.fills = [];
      content.primaryAxisSizingMode = "AUTO";
      content.counterAxisSizingMode = "AUTO";
      createText(n.title, "Semi Bold", 14, n.unread ? "#111827" : "#6B7280", content);
      createText(n.desc, "Regular", 14, n.unread ? "#374151" : "#9CA3AF", content);
      createText(n.time, "Regular", 12, "#9CA3AF", content);
      item.appendChild(content);
      content.layoutSizingHorizontal = "FILL";
    }
  }

  figma.closePlugin("✅ Upgrade complete: 20 vector icons + 3 new screens");
})();
