// ============================================================
// NOVA UI KIT — Part 3: Dashboard Screens
// Run AFTER 01 and 02
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
  let screenX = 0;
  const SCREEN_GAP = 100;

  // ── Helpers ──
  function createText(chars, font, size, color, parent) {
    const t = figma.createText();
    t.characters = chars;
    t.fontName = { family: "Inter", style: font };
    t.fontSize = size;
    t.fills = [{ type: "SOLID", color: hex(color) }];
    if (parent) parent.appendChild(t);
    return t;
  }

  function createSidebar(parent) {
    const sidebar = figma.createFrame();
    sidebar.name = "Sidebar";
    sidebar.layoutMode = "VERTICAL";
    sidebar.primaryAxisSizingMode = "FIXED";
    sidebar.counterAxisSizingMode = "FIXED";
    sidebar.resize(260, 900);
    sidebar.paddingLeft = 16; sidebar.paddingRight = 16;
    sidebar.paddingTop = 24; sidebar.paddingBottom = 24;
    sidebar.itemSpacing = 4;
    sidebar.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    sidebar.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    sidebar.strokeWeight = 1;
    sidebar.strokeAlign = "INSIDE";
    parent.appendChild(sidebar);

    // Logo
    const logo = figma.createFrame();
    logo.name = "Logo";
    logo.layoutMode = "HORIZONTAL";
    logo.counterAxisAlignItems = "CENTER";
    logo.itemSpacing = 10;
    logo.paddingLeft = 12; logo.paddingRight = 12;
    logo.paddingTop = 8; logo.paddingBottom = 20;
    logo.primaryAxisSizingMode = "AUTO";
    logo.counterAxisSizingMode = "AUTO";
    logo.fills = [];

    const logoIcon = figma.createFrame();
    logoIcon.resize(32, 32);
    logoIcon.cornerRadius = 8;
    logoIcon.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
    logo.appendChild(logoIcon);

    const logoText = createText("Nova", "Bold", 20, "#111827", null);
    logo.appendChild(logoText);

    sidebar.appendChild(logo);
    logo.layoutSizingHorizontal = "FILL";

    // Nav items
    const navItems = [
      { label: "Dashboard", active: true },
      { label: "Analytics", active: false },
      { label: "Users", active: false },
      { label: "Products", active: false },
      { label: "Orders", active: false },
      { label: "Messages", active: false },
      { label: "Settings", active: false },
    ];

    for (const item of navItems) {
      const nav = figma.createFrame();
      nav.name = item.label;
      nav.layoutMode = "HORIZONTAL";
      nav.counterAxisAlignItems = "CENTER";
      nav.paddingLeft = 12; nav.paddingRight = 12;
      nav.paddingTop = 10; nav.paddingBottom = 10;
      nav.itemSpacing = 12;
      nav.cornerRadius = 8;
      nav.primaryAxisSizingMode = "AUTO";
      nav.counterAxisSizingMode = "AUTO";
      nav.fills = item.active ? [{ type: "SOLID", color: hex("#EEF2FF") }] : [];

      const icon = figma.createRectangle();
      icon.resize(20, 20);
      icon.cornerRadius = 4;
      icon.fills = [{ type: "SOLID", color: hex(item.active ? "#4F46E5" : "#9CA3AF") }];
      nav.appendChild(icon);

      createText(item.label, item.active ? "Semi Bold" : "Medium", 14, item.active ? "#4F46E5" : "#374151", nav);

      sidebar.appendChild(nav);
      nav.layoutSizingHorizontal = "FILL";
    }

    return sidebar;
  }

  function createTopBar(parent, title) {
    const topbar = figma.createFrame();
    topbar.name = "Top Bar";
    topbar.layoutMode = "HORIZONTAL";
    topbar.primaryAxisAlignItems = "CENTER";
    topbar.counterAxisAlignItems = "CENTER";
    topbar.paddingLeft = 32; topbar.paddingRight = 32;
    topbar.paddingTop = 16; topbar.paddingBottom = 16;
    topbar.primaryAxisSizingMode = "FIXED";
    topbar.counterAxisSizingMode = "AUTO";
    topbar.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    topbar.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    topbar.strokeWeight = 1;
    topbar.strokeAlign = "INSIDE";
    parent.appendChild(topbar);
    topbar.layoutSizingHorizontal = "FILL";

    createText(title, "Semi Bold", 20, "#111827", topbar);

    // Spacer
    const spacer = figma.createFrame();
    spacer.fills = [];
    spacer.layoutMode = "HORIZONTAL";
    spacer.primaryAxisSizingMode = "FIXED";
    spacer.counterAxisSizingMode = "FIXED";
    spacer.resize(10, 1);
    topbar.appendChild(spacer);
    spacer.layoutSizingHorizontal = "FILL";

    // Search
    const search = figma.createFrame();
    search.name = "Search";
    search.layoutMode = "HORIZONTAL";
    search.counterAxisAlignItems = "CENTER";
    search.paddingLeft = 12; search.paddingRight = 12;
    search.paddingTop = 8; search.paddingBottom = 8;
    search.itemSpacing = 8;
    search.cornerRadius = 8;
    search.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
    search.primaryAxisSizingMode = "AUTO";
    search.counterAxisSizingMode = "AUTO";
    createText("Search...", "Regular", 14, "#9CA3AF", search);
    topbar.appendChild(search);

    // Notification bell
    const bell = figma.createEllipse();
    bell.resize(36, 36);
    bell.fills = [{ type: "SOLID", color: hex("#F3F4F6") }];
    topbar.appendChild(bell);

    // Avatar
    const avatar = figma.createEllipse();
    avatar.resize(36, 36);
    avatar.fills = [{ type: "SOLID", color: hex("#EEF2FF") }];
    topbar.appendChild(avatar);

    return topbar;
  }

  function createStatCard(parent, label, value, trend, trendVal) {
    const card = figma.createFrame();
    card.name = `Stat: ${label}`;
    card.layoutMode = "VERTICAL";
    card.primaryAxisSizingMode = "AUTO";
    card.counterAxisSizingMode = "FIXED";
    card.paddingLeft = 24; card.paddingRight = 24;
    card.paddingTop = 24; card.paddingBottom = 24;
    card.itemSpacing = 12;
    card.cornerRadius = 12;
    card.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    card.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    card.strokeWeight = 1;
    card.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.04 }, offset: { x: 0, y: 1 }, radius: 3, spread: 0, visible: true }];
    parent.appendChild(card);
    card.layoutSizingHorizontal = "FILL";

    createText(label, "Medium", 14, "#6B7280", card);

    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL";
    row.counterAxisAlignItems = "BASELINE";
    row.itemSpacing = 12;
    row.primaryAxisSizingMode = "AUTO";
    row.counterAxisSizingMode = "AUTO";
    row.fills = [];
    card.appendChild(row);
    row.layoutSizingHorizontal = "FILL";

    createText(value, "Bold", 28, "#111827", row);

    const badge = figma.createFrame();
    badge.layoutMode = "HORIZONTAL";
    badge.paddingLeft = 8; badge.paddingRight = 8;
    badge.paddingTop = 4; badge.paddingBottom = 4;
    badge.cornerRadius = 999;
    badge.primaryAxisSizingMode = "AUTO";
    badge.counterAxisSizingMode = "AUTO";
    const isUp = trend === "up";
    badge.fills = [{ type: "SOLID", color: hex(isUp ? "#ECFDF5" : "#FEF2F2") }];
    createText(trendVal, "Medium", 12, isUp ? "#059669" : "#DC2626", badge);
    row.appendChild(badge);

    createText("vs last period", "Regular", 12, "#9CA3AF", card);
    return card;
  }

  // ════════════════════════════════════════
  // SCREEN 1: MAIN DASHBOARD (Light)
  // ════════════════════════════════════════
  {
    const screen = figma.createFrame();
    screen.name = "Dashboard — Overview (Light)";
    screen.resize(1440, 900);
    screen.layoutMode = "HORIZONTAL";
    screen.primaryAxisSizingMode = "FIXED";
    screen.counterAxisSizingMode = "FIXED";
    screen.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
    screen.x = screenX; screen.y = 0;

    createSidebar(screen);

    // Main content
    const main = figma.createFrame();
    main.name = "Main";
    main.layoutMode = "VERTICAL";
    main.primaryAxisSizingMode = "FIXED";
    main.counterAxisSizingMode = "FIXED";
    main.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
    screen.appendChild(main);
    main.layoutSizingHorizontal = "FILL";
    main.layoutSizingVertical = "FILL";

    createTopBar(main, "Dashboard");

    // Content area
    const content = figma.createFrame();
    content.name = "Content";
    content.layoutMode = "VERTICAL";
    content.paddingLeft = 32; content.paddingRight = 32;
    content.paddingTop = 24; content.paddingBottom = 24;
    content.itemSpacing = 24;
    content.primaryAxisSizingMode = "AUTO";
    content.counterAxisSizingMode = "FIXED";
    content.fills = [];
    main.appendChild(content);
    content.layoutSizingHorizontal = "FILL";

    // Stats row
    const statsRow = figma.createFrame();
    statsRow.name = "Stats";
    statsRow.layoutMode = "HORIZONTAL";
    statsRow.itemSpacing = 20;
    statsRow.primaryAxisSizingMode = "FIXED";
    statsRow.counterAxisSizingMode = "AUTO";
    statsRow.fills = [];
    content.appendChild(statsRow);
    statsRow.layoutSizingHorizontal = "FILL";

    createStatCard(statsRow, "Total Revenue", "$45,231", "up", "+20.1%");
    createStatCard(statsRow, "Subscriptions", "+2,350", "up", "+12.5%");
    createStatCard(statsRow, "Active Users", "12,234", "down", "-3.2%");
    createStatCard(statsRow, "Bounce Rate", "21.3%", "up", "+4.1%");

    // Charts row
    const chartsRow = figma.createFrame();
    chartsRow.name = "Charts";
    chartsRow.layoutMode = "HORIZONTAL";
    chartsRow.itemSpacing = 20;
    chartsRow.primaryAxisSizingMode = "FIXED";
    chartsRow.counterAxisSizingMode = "AUTO";
    chartsRow.fills = [];
    content.appendChild(chartsRow);
    chartsRow.layoutSizingHorizontal = "FILL";

    // Revenue chart card
    const chartCard = figma.createFrame();
    chartCard.name = "Revenue Chart";
    chartCard.layoutMode = "VERTICAL";
    chartCard.paddingLeft = 24; chartCard.paddingRight = 24;
    chartCard.paddingTop = 24; chartCard.paddingBottom = 24;
    chartCard.itemSpacing = 20;
    chartCard.cornerRadius = 12;
    chartCard.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    chartCard.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    chartCard.strokeWeight = 1;
    chartCard.primaryAxisSizingMode = "AUTO";
    chartCard.counterAxisSizingMode = "FIXED";
    chartsRow.appendChild(chartCard);
    chartCard.layoutSizingHorizontal = "FILL";

    createText("Revenue Overview", "Semi Bold", 16, "#111827", chartCard);

    // Chart placeholder (bar chart visual)
    const chartArea = figma.createFrame();
    chartArea.name = "Chart Area";
    chartArea.resize(500, 240);
    chartArea.fills = [];
    chartArea.layoutMode = "HORIZONTAL";
    chartArea.primaryAxisAlignItems = "MAX";
    chartArea.counterAxisAlignItems = "MAX";
    chartArea.itemSpacing = 12;
    chartArea.paddingBottom = 0;
    chartArea.primaryAxisSizingMode = "FIXED";
    chartArea.counterAxisSizingMode = "FIXED";
    chartCard.appendChild(chartArea);
    chartArea.layoutSizingHorizontal = "FILL";

    const barHeights = [120, 160, 100, 200, 180, 140, 220, 170, 190, 150, 210, 240];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let i = 0; i < 12; i++) {
      const barCol = figma.createFrame();
      barCol.layoutMode = "VERTICAL";
      barCol.primaryAxisAlignItems = "MAX";
      barCol.counterAxisAlignItems = "CENTER";
      barCol.itemSpacing = 8;
      barCol.primaryAxisSizingMode = "FIXED";
      barCol.counterAxisSizingMode = "FIXED";
      barCol.resize(10, 240);
      barCol.fills = [];
      chartArea.appendChild(barCol);
      barCol.layoutSizingHorizontal = "FILL";

      const bar = figma.createRectangle();
      bar.name = "Bar";
      bar.resize(28, barHeights[i]);
      bar.cornerRadius = 4;
      bar.fills = [{ type: "SOLID", color: hex(i === 11 ? "#4F46E5" : "#C7D2FE") }];
      barCol.appendChild(bar);
    }

    // Pie chart card
    const pieCard = figma.createFrame();
    pieCard.name = "Traffic Sources";
    pieCard.layoutMode = "VERTICAL";
    pieCard.paddingLeft = 24; pieCard.paddingRight = 24;
    pieCard.paddingTop = 24; pieCard.paddingBottom = 24;
    pieCard.itemSpacing = 20;
    pieCard.cornerRadius = 12;
    pieCard.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    pieCard.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    pieCard.strokeWeight = 1;
    pieCard.primaryAxisSizingMode = "AUTO";
    pieCard.counterAxisSizingMode = "FIXED";
    pieCard.resize(360, 10);
    chartsRow.appendChild(pieCard);

    createText("Traffic Sources", "Semi Bold", 16, "#111827", pieCard);

    // Donut placeholder
    const donut = figma.createEllipse();
    donut.resize(180, 180);
    donut.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
    donut.strokes = [{ type: "SOLID", color: hex("#FFFFFF") }];
    donut.strokeWeight = 40;
    pieCard.appendChild(donut);

    // Legend
    const sources = [
      { label: "Organic", color: "#4F46E5", pct: "42%" },
      { label: "Direct", color: "#10B981", pct: "28%" },
      { label: "Referral", color: "#F59E0B", pct: "18%" },
      { label: "Social", color: "#EF4444", pct: "12%" },
    ];
    for (const src of sources) {
      const row = figma.createFrame();
      row.layoutMode = "HORIZONTAL";
      row.counterAxisAlignItems = "CENTER";
      row.itemSpacing = 8;
      row.primaryAxisSizingMode = "AUTO";
      row.counterAxisSizingMode = "AUTO";
      row.fills = [];

      const dot = figma.createEllipse();
      dot.resize(8, 8);
      dot.fills = [{ type: "SOLID", color: hex(src.color) }];
      row.appendChild(dot);
      createText(src.label, "Regular", 14, "#374151", row);

      const spacer = figma.createFrame();
      spacer.fills = [];
      spacer.resize(10, 1);
      spacer.layoutMode = "HORIZONTAL";
      spacer.primaryAxisSizingMode = "FIXED";
      spacer.counterAxisSizingMode = "FIXED";
      row.appendChild(spacer);
      spacer.layoutSizingHorizontal = "FILL";

      createText(src.pct, "Semi Bold", 14, "#111827", row);
      pieCard.appendChild(row);
      row.layoutSizingHorizontal = "FILL";
    }

    screenX += 1440 + SCREEN_GAP;
  }

  // ════════════════════════════════════════
  // SCREEN 2: DASHBOARD DARK MODE
  // ════════════════════════════════════════
  {
    const screen = figma.createFrame();
    screen.name = "Dashboard — Overview (Dark)";
    screen.resize(1440, 900);
    screen.layoutMode = "HORIZONTAL";
    screen.primaryAxisSizingMode = "FIXED";
    screen.counterAxisSizingMode = "FIXED";
    screen.fills = [{ type: "SOLID", color: hex("#0F172A") }];
    screen.x = screenX; screen.y = 0;

    // Dark sidebar
    const sidebar = figma.createFrame();
    sidebar.name = "Sidebar";
    sidebar.layoutMode = "VERTICAL";
    sidebar.primaryAxisSizingMode = "FIXED";
    sidebar.counterAxisSizingMode = "FIXED";
    sidebar.resize(260, 900);
    sidebar.paddingLeft = 16; sidebar.paddingRight = 16;
    sidebar.paddingTop = 24; sidebar.paddingBottom = 24;
    sidebar.itemSpacing = 4;
    sidebar.fills = [{ type: "SOLID", color: hex("#111827") }];
    sidebar.strokes = [{ type: "SOLID", color: hex("#1F2937") }];
    sidebar.strokeWeight = 1;
    screen.appendChild(sidebar);

    // Logo
    const logoRow = figma.createFrame();
    logoRow.layoutMode = "HORIZONTAL";
    logoRow.counterAxisAlignItems = "CENTER";
    logoRow.itemSpacing = 10;
    logoRow.paddingLeft = 12; logoRow.paddingRight = 12;
    logoRow.paddingTop = 8; logoRow.paddingBottom = 20;
    logoRow.primaryAxisSizingMode = "AUTO";
    logoRow.counterAxisSizingMode = "AUTO";
    logoRow.fills = [];
    const li = figma.createFrame(); li.resize(32,32); li.cornerRadius=8; li.fills=[{type:"SOLID",color:hex("#818CF8")}];
    logoRow.appendChild(li);
    createText("Nova","Bold",20,"#F9FAFB",logoRow);
    sidebar.appendChild(logoRow);
    logoRow.layoutSizingHorizontal = "FILL";

    const navItems = ["Dashboard","Analytics","Users","Products","Orders","Messages","Settings"];
    for (let i = 0; i < navItems.length; i++) {
      const nav = figma.createFrame();
      nav.layoutMode="HORIZONTAL"; nav.counterAxisAlignItems="CENTER";
      nav.paddingLeft=12;nav.paddingRight=12;nav.paddingTop=10;nav.paddingBottom=10;
      nav.itemSpacing=12; nav.cornerRadius=8;
      nav.primaryAxisSizingMode="AUTO"; nav.counterAxisSizingMode="AUTO";
      nav.fills = i===0?[{type:"SOLID",color:hex("#1E293B")}]:[];
      const ic = figma.createRectangle(); ic.resize(20,20); ic.cornerRadius=4;
      ic.fills=[{type:"SOLID",color:hex(i===0?"#818CF8":"#6B7280")}];
      nav.appendChild(ic);
      createText(navItems[i],i===0?"Semi Bold":"Medium",14,i===0?"#818CF8":"#9CA3AF",nav);
      sidebar.appendChild(nav);
      nav.layoutSizingHorizontal = "FILL";
    }

    // Main
    const main = figma.createFrame();
    main.name = "Main";
    main.layoutMode = "VERTICAL";
    main.primaryAxisSizingMode = "FIXED";
    main.counterAxisSizingMode = "FIXED";
    main.fills = [{ type: "SOLID", color: hex("#0F172A") }];
    screen.appendChild(main);
    main.layoutSizingHorizontal = "FILL";
    main.layoutSizingVertical = "FILL";

    // Dark topbar
    const topbar = figma.createFrame();
    topbar.layoutMode="HORIZONTAL"; topbar.primaryAxisAlignItems="CENTER"; topbar.counterAxisAlignItems="CENTER";
    topbar.paddingLeft=32;topbar.paddingRight=32;topbar.paddingTop=16;topbar.paddingBottom=16;
    topbar.primaryAxisSizingMode="FIXED"; topbar.counterAxisSizingMode="AUTO";
    topbar.fills=[{type:"SOLID",color:hex("#111827")}];
    topbar.strokes=[{type:"SOLID",color:hex("#1F2937")}]; topbar.strokeWeight=1;
    main.appendChild(topbar);
    topbar.layoutSizingHorizontal = "FILL";
    createText("Dashboard","Semi Bold",20,"#F9FAFB",topbar);

    const sp = figma.createFrame(); sp.fills=[]; sp.resize(10,1);
    sp.layoutMode="HORIZONTAL"; sp.primaryAxisSizingMode="FIXED"; sp.counterAxisSizingMode="FIXED";
    topbar.appendChild(sp); sp.layoutSizingHorizontal = "FILL";

    const srch = figma.createFrame();
    srch.layoutMode="HORIZONTAL"; srch.counterAxisAlignItems="CENTER";
    srch.paddingLeft=12;srch.paddingRight=12;srch.paddingTop=8;srch.paddingBottom=8;
    srch.itemSpacing=8; srch.cornerRadius=8; srch.fills=[{type:"SOLID",color:hex("#1E293B")}];
    srch.primaryAxisSizingMode="AUTO"; srch.counterAxisSizingMode="AUTO";
    createText("Search...","Regular",14,"#6B7280",srch);
    topbar.appendChild(srch);

    // Dark content
    const content = figma.createFrame();
    content.layoutMode="VERTICAL"; content.paddingLeft=32;content.paddingRight=32;
    content.paddingTop=24;content.paddingBottom=24; content.itemSpacing=24;
    content.primaryAxisSizingMode="AUTO"; content.counterAxisSizingMode="FIXED";
    content.fills=[];
    main.appendChild(content);
    content.layoutSizingHorizontal = "FILL";

    // Dark stat cards
    const statsRow = figma.createFrame();
    statsRow.layoutMode="HORIZONTAL"; statsRow.itemSpacing=20;
    statsRow.primaryAxisSizingMode="FIXED"; statsRow.counterAxisSizingMode="AUTO";
    statsRow.fills=[];
    content.appendChild(statsRow);
    statsRow.layoutSizingHorizontal = "FILL";

    const darkStats = [
      {label:"Total Revenue",val:"$45,231",trend:"+20.1%",up:true},
      {label:"Subscriptions",val:"+2,350",trend:"+12.5%",up:true},
      {label:"Active Users",val:"12,234",trend:"-3.2%",up:false},
      {label:"Bounce Rate",val:"21.3%",trend:"+4.1%",up:true},
    ];

    for (const s of darkStats) {
      const card = figma.createFrame();
      card.layoutMode="VERTICAL"; card.primaryAxisSizingMode="AUTO"; card.counterAxisSizingMode="FIXED";
      card.paddingLeft=24;card.paddingRight=24;card.paddingTop=24;card.paddingBottom=24;
      card.itemSpacing=12; card.cornerRadius=12;
      card.fills=[{type:"SOLID",color:hex("#1E293B")}];
      card.strokes=[{type:"SOLID",color:hex("#334155")}]; card.strokeWeight=1;
      statsRow.appendChild(card);
      card.layoutSizingHorizontal = "FILL";

      createText(s.label,"Medium",14,"#9CA3AF",card);
      const vr = figma.createFrame();
      vr.layoutMode="HORIZONTAL"; vr.counterAxisAlignItems="BASELINE"; vr.itemSpacing=12;
      vr.primaryAxisSizingMode="AUTO"; vr.counterAxisSizingMode="AUTO"; vr.fills=[];
      card.appendChild(vr); vr.layoutSizingHorizontal="FILL";
      createText(s.val,"Bold",28,"#F9FAFB",vr);

      const bdg = figma.createFrame();
      bdg.layoutMode="HORIZONTAL"; bdg.paddingLeft=8;bdg.paddingRight=8;bdg.paddingTop=4;bdg.paddingBottom=4;
      bdg.cornerRadius=999; bdg.primaryAxisSizingMode="AUTO"; bdg.counterAxisSizingMode="AUTO";
      bdg.fills=[{type:"SOLID",color:hex(s.up?"#064E3B":"#7F1D1D")}];
      createText(s.trend,"Medium",12,s.up?"#34D399":"#FCA5A5",bdg);
      vr.appendChild(bdg);

      createText("vs last period","Regular",12,"#6B7280",card);
    }

    // Dark chart card
    const chartCard = figma.createFrame();
    chartCard.layoutMode="VERTICAL"; chartCard.paddingLeft=24;chartCard.paddingRight=24;
    chartCard.paddingTop=24;chartCard.paddingBottom=24; chartCard.itemSpacing=20;
    chartCard.cornerRadius=12;
    chartCard.fills=[{type:"SOLID",color:hex("#1E293B")}];
    chartCard.strokes=[{type:"SOLID",color:hex("#334155")}]; chartCard.strokeWeight=1;
    chartCard.primaryAxisSizingMode="AUTO"; chartCard.counterAxisSizingMode="FIXED";
    content.appendChild(chartCard);
    chartCard.layoutSizingHorizontal = "FILL";

    createText("Revenue Overview","Semi Bold",16,"#F9FAFB",chartCard);

    const ca = figma.createFrame();
    ca.resize(500,200); ca.fills=[];
    ca.layoutMode="HORIZONTAL"; ca.primaryAxisAlignItems="MAX"; ca.counterAxisAlignItems="MAX";
    ca.itemSpacing=12; ca.primaryAxisSizingMode="FIXED"; ca.counterAxisSizingMode="FIXED";
    chartCard.appendChild(ca);
    ca.layoutSizingHorizontal = "FILL";

    const bh = [100,140,80,180,160,120,200,150,170,130,190,200];
    for (let i=0;i<12;i++) {
      const bc = figma.createFrame();
      bc.layoutMode="VERTICAL"; bc.primaryAxisAlignItems="MAX"; bc.counterAxisAlignItems="CENTER";
      bc.primaryAxisSizingMode="FIXED"; bc.counterAxisSizingMode="FIXED";
      bc.resize(10,200); bc.fills=[];
      ca.appendChild(bc); bc.layoutSizingHorizontal="FILL";
      const bar = figma.createRectangle();
      bar.resize(28,bh[i]); bar.cornerRadius=4;
      bar.fills=[{type:"SOLID",color:hex(i===11?"#818CF8":"#312E81")}];
      bc.appendChild(bar);
    }

    screenX += 1440 + SCREEN_GAP;
  }

  // ════════════════════════════════════════
  // SCREEN 3: ANALYTICS
  // ════════════════════════════════════════
  {
    const screen = figma.createFrame();
    screen.name = "Analytics";
    screen.resize(1440, 900);
    screen.layoutMode = "HORIZONTAL";
    screen.primaryAxisSizingMode = "FIXED";
    screen.counterAxisSizingMode = "FIXED";
    screen.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
    screen.x = screenX; screen.y = 0;

    createSidebar(screen);

    const main = figma.createFrame();
    main.name = "Main";
    main.layoutMode = "VERTICAL";
    main.primaryAxisSizingMode = "FIXED";
    main.counterAxisSizingMode = "FIXED";
    main.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
    screen.appendChild(main);
    main.layoutSizingHorizontal = "FILL";
    main.layoutSizingVertical = "FILL";

    createTopBar(main, "Analytics");

    const content = figma.createFrame();
    content.layoutMode = "VERTICAL";
    content.paddingLeft = 32; content.paddingRight = 32;
    content.paddingTop = 24; content.paddingBottom = 24;
    content.itemSpacing = 24;
    content.primaryAxisSizingMode = "AUTO";
    content.counterAxisSizingMode = "FIXED";
    content.fills = [];
    main.appendChild(content);
    content.layoutSizingHorizontal = "FILL";

    // Line chart card
    const lineChart = figma.createFrame();
    lineChart.name = "Visitors Over Time";
    lineChart.layoutMode = "VERTICAL";
    lineChart.paddingLeft = 24; lineChart.paddingRight = 24;
    lineChart.paddingTop = 24; lineChart.paddingBottom = 24;
    lineChart.itemSpacing = 20;
    lineChart.cornerRadius = 12;
    lineChart.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    lineChart.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    lineChart.strokeWeight = 1;
    lineChart.primaryAxisSizingMode = "AUTO";
    lineChart.counterAxisSizingMode = "FIXED";
    content.appendChild(lineChart);
    lineChart.layoutSizingHorizontal = "FILL";

    // Chart header row
    const chartHeader = figma.createFrame();
    chartHeader.layoutMode = "HORIZONTAL";
    chartHeader.primaryAxisAlignItems = "CENTER";
    chartHeader.counterAxisAlignItems = "CENTER";
    chartHeader.primaryAxisSizingMode = "FIXED";
    chartHeader.counterAxisSizingMode = "AUTO";
    chartHeader.fills = [];
    lineChart.appendChild(chartHeader);
    chartHeader.layoutSizingHorizontal = "FILL";

    createText("Visitors Over Time", "Semi Bold", 16, "#111827", chartHeader);
    const chSpacer = figma.createFrame(); chSpacer.fills=[]; chSpacer.resize(10,1);
    chSpacer.layoutMode="HORIZONTAL"; chSpacer.primaryAxisSizingMode="FIXED"; chSpacer.counterAxisSizingMode="FIXED";
    chartHeader.appendChild(chSpacer); chSpacer.layoutSizingHorizontal="FILL";

    // Period tabs
    for (const period of ["7D", "1M", "3M", "1Y"]) {
      const tab = figma.createFrame();
      tab.layoutMode = "HORIZONTAL";
      tab.paddingLeft = 12; tab.paddingRight = 12;
      tab.paddingTop = 6; tab.paddingBottom = 6;
      tab.cornerRadius = 6;
      tab.primaryAxisSizingMode = "AUTO";
      tab.counterAxisSizingMode = "AUTO";
      tab.fills = period === "1M" ? [{ type: "SOLID", color: hex("#EEF2FF") }] : [];
      createText(period, "Medium", 13, period === "1M" ? "#4F46E5" : "#6B7280", tab);
      chartHeader.appendChild(tab);
    }

    // Chart placeholder
    const chartPlaceholder = figma.createRectangle();
    chartPlaceholder.resize(1000, 300);
    chartPlaceholder.cornerRadius = 8;
    chartPlaceholder.fills = [{ type: "SOLID", color: hex("#F8FAFC") }];
    lineChart.appendChild(chartPlaceholder);

    screenX += 1440 + SCREEN_GAP;
  }

  // ════════════════════════════════════════
  // SCREEN 4: USERS TABLE
  // ════════════════════════════════════════
  {
    const screen = figma.createFrame();
    screen.name = "Users — Table View";
    screen.resize(1440, 900);
    screen.layoutMode = "HORIZONTAL";
    screen.primaryAxisSizingMode = "FIXED";
    screen.counterAxisSizingMode = "FIXED";
    screen.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
    screen.x = screenX; screen.y = 0;

    createSidebar(screen);

    const main = figma.createFrame();
    main.layoutMode = "VERTICAL";
    main.primaryAxisSizingMode = "FIXED";
    main.counterAxisSizingMode = "FIXED";
    main.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
    screen.appendChild(main);
    main.layoutSizingHorizontal = "FILL";
    main.layoutSizingVertical = "FILL";

    createTopBar(main, "Users");

    const content = figma.createFrame();
    content.layoutMode = "VERTICAL";
    content.paddingLeft = 32; content.paddingRight = 32;
    content.paddingTop = 24; content.paddingBottom = 24;
    content.itemSpacing = 20;
    content.primaryAxisSizingMode = "AUTO";
    content.counterAxisSizingMode = "FIXED";
    content.fills = [];
    main.appendChild(content);
    content.layoutSizingHorizontal = "FILL";

    // Filter bar
    const filterBar = figma.createFrame();
    filterBar.layoutMode = "HORIZONTAL";
    filterBar.counterAxisAlignItems = "CENTER";
    filterBar.itemSpacing = 12;
    filterBar.primaryAxisSizingMode = "FIXED";
    filterBar.counterAxisSizingMode = "AUTO";
    filterBar.fills = [];
    content.appendChild(filterBar);
    filterBar.layoutSizingHorizontal = "FILL";

    // Search input
    const searchInput = figma.createFrame();
    searchInput.layoutMode = "HORIZONTAL";
    searchInput.counterAxisAlignItems = "CENTER";
    searchInput.paddingLeft = 14; searchInput.paddingRight = 14;
    searchInput.paddingTop = 10; searchInput.paddingBottom = 10;
    searchInput.cornerRadius = 8;
    searchInput.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    searchInput.strokes = [{ type: "SOLID", color: hex("#D1D5DB") }];
    searchInput.strokeWeight = 1;
    searchInput.primaryAxisSizingMode = "FIXED";
    searchInput.counterAxisSizingMode = "AUTO";
    searchInput.resize(300, 10);
    createText("Search users...", "Regular", 14, "#9CA3AF", searchInput);
    filterBar.appendChild(searchInput);

    const fSpacer = figma.createFrame(); fSpacer.fills=[]; fSpacer.resize(10,1);
    fSpacer.layoutMode="HORIZONTAL"; fSpacer.primaryAxisSizingMode="FIXED"; fSpacer.counterAxisSizingMode="FIXED";
    filterBar.appendChild(fSpacer); fSpacer.layoutSizingHorizontal="FILL";

    // Add user button
    const addBtn = figma.createFrame();
    addBtn.layoutMode = "HORIZONTAL";
    addBtn.primaryAxisAlignItems = "CENTER";
    addBtn.counterAxisAlignItems = "CENTER";
    addBtn.paddingLeft = 16; addBtn.paddingRight = 16;
    addBtn.paddingTop = 10; addBtn.paddingBottom = 10;
    addBtn.cornerRadius = 8;
    addBtn.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
    addBtn.primaryAxisSizingMode = "AUTO";
    addBtn.counterAxisSizingMode = "AUTO";
    createText("+ Add User", "Semi Bold", 14, "#FFFFFF", addBtn);
    filterBar.appendChild(addBtn);

    // Table card
    const tableCard = figma.createFrame();
    tableCard.name = "Table";
    tableCard.layoutMode = "VERTICAL";
    tableCard.cornerRadius = 12;
    tableCard.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    tableCard.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    tableCard.strokeWeight = 1;
    tableCard.primaryAxisSizingMode = "AUTO";
    tableCard.counterAxisSizingMode = "FIXED";
    tableCard.clipsContent = true;
    content.appendChild(tableCard);
    tableCard.layoutSizingHorizontal = "FILL";

    // Table header
    const headerRow = figma.createFrame();
    headerRow.layoutMode = "HORIZONTAL";
    headerRow.counterAxisAlignItems = "CENTER";
    headerRow.paddingLeft = 24; headerRow.paddingRight = 24;
    headerRow.paddingTop = 12; headerRow.paddingBottom = 12;
    headerRow.primaryAxisSizingMode = "FIXED";
    headerRow.counterAxisSizingMode = "AUTO";
    headerRow.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
    tableCard.appendChild(headerRow);
    headerRow.layoutSizingHorizontal = "FILL";

    const cols = ["Name", "Email", "Status", "Role", "Last Active"];
    for (const col of cols) {
      const t = createText(col, "Medium", 12, "#6B7280", headerRow);
      t.layoutSizingHorizontal = "FILL";
    }

    // Table rows
    const users = [
      { name: "Olivia Rhye", email: "olivia@email.com", status: "Active", role: "Admin", date: "Jan 4, 2026" },
      { name: "Phoenix Baker", email: "phoenix@email.com", status: "Active", role: "Editor", date: "Jan 4, 2026" },
      { name: "Lana Steiner", email: "lana@email.com", status: "Inactive", role: "Viewer", date: "Dec 28, 2025" },
      { name: "Demi Wilkinson", email: "demi@email.com", status: "Active", role: "Editor", date: "Jan 3, 2026" },
      { name: "Candice Wu", email: "candice@email.com", status: "Active", role: "Admin", date: "Jan 4, 2026" },
      { name: "Natali Craig", email: "natali@email.com", status: "Inactive", role: "Viewer", date: "Dec 20, 2025" },
      { name: "Drew Cano", email: "drew@email.com", status: "Active", role: "Editor", date: "Jan 2, 2026" },
    ];

    for (const user of users) {
      const row = figma.createFrame();
      row.layoutMode = "HORIZONTAL";
      row.counterAxisAlignItems = "CENTER";
      row.paddingLeft = 24; row.paddingRight = 24;
      row.paddingTop = 14; row.paddingBottom = 14;
      row.primaryAxisSizingMode = "FIXED";
      row.counterAxisSizingMode = "AUTO";
      row.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
      row.strokes = [{ type: "SOLID", color: hex("#F3F4F6") }];
      row.strokeWeight = 1;
      tableCard.appendChild(row);
      row.layoutSizingHorizontal = "FILL";

      // Name with avatar
      const nameCell = figma.createFrame();
      nameCell.layoutMode = "HORIZONTAL";
      nameCell.counterAxisAlignItems = "CENTER";
      nameCell.itemSpacing = 12;
      nameCell.primaryAxisSizingMode = "FIXED";
      nameCell.counterAxisSizingMode = "AUTO";
      nameCell.fills = [];
      row.appendChild(nameCell);
      nameCell.layoutSizingHorizontal = "FILL";

      const av = figma.createEllipse();
      av.resize(32, 32);
      av.fills = [{ type: "SOLID", color: hex("#EEF2FF") }];
      nameCell.appendChild(av);
      createText(user.name, "Medium", 14, "#111827", nameCell);

      const emailT = createText(user.email, "Regular", 14, "#6B7280", row);
      emailT.layoutSizingHorizontal = "FILL";

      // Status badge
      const statusCell = figma.createFrame();
      statusCell.layoutMode = "HORIZONTAL";
      statusCell.primaryAxisSizingMode = "FIXED";
      statusCell.counterAxisSizingMode = "AUTO";
      statusCell.fills = [];
      row.appendChild(statusCell);
      statusCell.layoutSizingHorizontal = "FILL";

      const statusBadge = figma.createFrame();
      statusBadge.layoutMode = "HORIZONTAL";
      statusBadge.counterAxisAlignItems = "CENTER";
      statusBadge.paddingLeft = 8; statusBadge.paddingRight = 8;
      statusBadge.paddingTop = 2; statusBadge.paddingBottom = 2;
      statusBadge.itemSpacing = 4;
      statusBadge.cornerRadius = 999;
      statusBadge.primaryAxisSizingMode = "AUTO";
      statusBadge.counterAxisSizingMode = "AUTO";
      const isActive = user.status === "Active";
      statusBadge.fills = [{ type: "SOLID", color: hex(isActive ? "#ECFDF5" : "#F3F4F6") }];

      const dot = figma.createEllipse();
      dot.resize(6, 6);
      dot.fills = [{ type: "SOLID", color: hex(isActive ? "#10B981" : "#9CA3AF") }];
      statusBadge.appendChild(dot);
      createText(user.status, "Medium", 12, isActive ? "#059669" : "#6B7280", statusBadge);
      statusCell.appendChild(statusBadge);

      const roleT = createText(user.role, "Regular", 14, "#374151", row);
      roleT.layoutSizingHorizontal = "FILL";

      const dateT = createText(user.date, "Regular", 14, "#6B7280", row);
      dateT.layoutSizingHorizontal = "FILL";
    }

    screenX += 1440 + SCREEN_GAP;
  }

  // ════════════════════════════════════════
  // SCREEN 5: SETTINGS
  // ════════════════════════════════════════
  {
    const screen = figma.createFrame();
    screen.name = "Settings — Profile";
    screen.resize(1440, 900);
    screen.layoutMode = "HORIZONTAL";
    screen.primaryAxisSizingMode = "FIXED";
    screen.counterAxisSizingMode = "FIXED";
    screen.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
    screen.x = screenX; screen.y = 0;

    createSidebar(screen);

    const main = figma.createFrame();
    main.layoutMode = "VERTICAL";
    main.primaryAxisSizingMode = "FIXED";
    main.counterAxisSizingMode = "FIXED";
    main.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
    screen.appendChild(main);
    main.layoutSizingHorizontal = "FILL";
    main.layoutSizingVertical = "FILL";

    createTopBar(main, "Settings");

    const content = figma.createFrame();
    content.layoutMode = "HORIZONTAL";
    content.paddingLeft = 32; content.paddingRight = 32;
    content.paddingTop = 24; content.paddingBottom = 24;
    content.itemSpacing = 32;
    content.primaryAxisSizingMode = "FIXED";
    content.counterAxisSizingMode = "AUTO";
    content.fills = [];
    main.appendChild(content);
    content.layoutSizingHorizontal = "FILL";

    // Settings nav
    const settingsNav = figma.createFrame();
    settingsNav.layoutMode = "VERTICAL";
    settingsNav.primaryAxisSizingMode = "AUTO";
    settingsNav.counterAxisSizingMode = "FIXED";
    settingsNav.resize(200, 10);
    settingsNav.itemSpacing = 4;
    settingsNav.fills = [];

    const settingsTabs = ["Profile", "Account", "Notifications", "Security", "Billing", "Integrations"];
    for (let i = 0; i < settingsTabs.length; i++) {
      const tab = figma.createFrame();
      tab.layoutMode = "HORIZONTAL";
      tab.counterAxisAlignItems = "CENTER";
      tab.paddingLeft = 12; tab.paddingRight = 12;
      tab.paddingTop = 8; tab.paddingBottom = 8;
      tab.cornerRadius = 6;
      tab.primaryAxisSizingMode = "AUTO";
      tab.counterAxisSizingMode = "AUTO";
      tab.fills = i === 0 ? [{ type: "SOLID", color: hex("#EEF2FF") }] : [];
      createText(settingsTabs[i], i === 0 ? "Semi Bold" : "Medium", 14, i === 0 ? "#4F46E5" : "#6B7280", tab);
      settingsNav.appendChild(tab);
      tab.layoutSizingHorizontal = "FILL";
    }
    content.appendChild(settingsNav);

    // Profile form
    const form = figma.createFrame();
    form.layoutMode = "VERTICAL";
    form.primaryAxisSizingMode = "AUTO";
    form.counterAxisSizingMode = "FIXED";
    form.itemSpacing = 24;
    form.paddingLeft = 32; form.paddingRight = 32;
    form.paddingTop = 32; form.paddingBottom = 32;
    form.cornerRadius = 12;
    form.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    form.strokes = [{ type: "SOLID", color: hex("#E5E7EB") }];
    form.strokeWeight = 1;
    content.appendChild(form);
    form.layoutSizingHorizontal = "FILL";

    createText("Profile Information", "Semi Bold", 18, "#111827", form);
    createText("Update your personal details and profile picture.", "Regular", 14, "#6B7280", form);

    // Avatar section
    const avatarSection = figma.createFrame();
    avatarSection.layoutMode = "HORIZONTAL";
    avatarSection.counterAxisAlignItems = "CENTER";
    avatarSection.itemSpacing = 20;
    avatarSection.primaryAxisSizingMode = "AUTO";
    avatarSection.counterAxisSizingMode = "AUTO";
    avatarSection.fills = [];
    form.appendChild(avatarSection);
    avatarSection.layoutSizingHorizontal = "FILL";

    const bigAvatar = figma.createEllipse();
    bigAvatar.resize(72, 72);
    bigAvatar.fills = [{ type: "SOLID", color: hex("#EEF2FF") }];
    avatarSection.appendChild(bigAvatar);

    const uploadBtn = figma.createFrame();
    uploadBtn.layoutMode = "HORIZONTAL";
    uploadBtn.primaryAxisAlignItems = "CENTER";
    uploadBtn.counterAxisAlignItems = "CENTER";
    uploadBtn.paddingLeft = 16; uploadBtn.paddingRight = 16;
    uploadBtn.paddingTop = 10; uploadBtn.paddingBottom = 10;
    uploadBtn.cornerRadius = 8;
    uploadBtn.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    uploadBtn.strokes = [{ type: "SOLID", color: hex("#D1D5DB") }];
    uploadBtn.strokeWeight = 1;
    uploadBtn.primaryAxisSizingMode = "AUTO";
    uploadBtn.counterAxisSizingMode = "AUTO";
    createText("Change Photo", "Semi Bold", 14, "#374151", uploadBtn);
    avatarSection.appendChild(uploadBtn);

    // Form fields
    const fields = [
      { label: "Full Name", value: "Dang Pham" },
      { label: "Email Address", value: "dang@example.com" },
      { label: "Job Title", value: "Product Designer" },
      { label: "Bio", value: "Design leader passionate about creating intuitive digital experiences." },
    ];

    for (const field of fields) {
      const fieldGroup = figma.createFrame();
      fieldGroup.layoutMode = "VERTICAL";
      fieldGroup.itemSpacing = 6;
      fieldGroup.primaryAxisSizingMode = "AUTO";
      fieldGroup.counterAxisSizingMode = "FIXED";
      fieldGroup.fills = [];
      form.appendChild(fieldGroup);
      fieldGroup.layoutSizingHorizontal = "FILL";

      const lbl = createText(field.label, "Medium", 14, "#374151", fieldGroup);
      lbl.layoutSizingHorizontal = "FILL";

      const inp = figma.createFrame();
      inp.layoutMode = "HORIZONTAL";
      inp.counterAxisAlignItems = "CENTER";
      inp.paddingLeft = 14; inp.paddingRight = 14;
      inp.paddingTop = 10; inp.paddingBottom = 10;
      inp.cornerRadius = 8;
      inp.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
      inp.strokes = [{ type: "SOLID", color: hex("#D1D5DB") }];
      inp.strokeWeight = 1;
      inp.primaryAxisSizingMode = "FIXED";
      inp.counterAxisSizingMode = "AUTO";
      const valText = createText(field.value, "Regular", 14, "#111827", inp);
      valText.layoutSizingHorizontal = "FILL";
      fieldGroup.appendChild(inp);
      inp.layoutSizingHorizontal = "FILL";
    }

    // Save button
    const saveRow = figma.createFrame();
    saveRow.layoutMode = "HORIZONTAL";
    saveRow.primaryAxisAlignItems = "MAX";
    saveRow.primaryAxisSizingMode = "FIXED";
    saveRow.counterAxisSizingMode = "AUTO";
    saveRow.fills = [];
    form.appendChild(saveRow);
    saveRow.layoutSizingHorizontal = "FILL";

    const saveBtn = figma.createFrame();
    saveBtn.layoutMode = "HORIZONTAL";
    saveBtn.primaryAxisAlignItems = "CENTER";
    saveBtn.counterAxisAlignItems = "CENTER";
    saveBtn.paddingLeft = 20; saveBtn.paddingRight = 20;
    saveBtn.paddingTop = 10; saveBtn.paddingBottom = 10;
    saveBtn.cornerRadius = 8;
    saveBtn.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
    saveBtn.primaryAxisSizingMode = "AUTO";
    saveBtn.counterAxisSizingMode = "AUTO";
    createText("Save Changes", "Semi Bold", 14, "#FFFFFF", saveBtn);
    saveRow.appendChild(saveBtn);

    screenX += 1440 + SCREEN_GAP;
  }

  // ════════════════════════════════════════
  // SCREEN 6: LOGIN / AUTH
  // ════════════════════════════════════════
  {
    const screen = figma.createFrame();
    screen.name = "Auth — Login";
    screen.resize(1440, 900);
    screen.layoutMode = "HORIZONTAL";
    screen.primaryAxisSizingMode = "FIXED";
    screen.counterAxisSizingMode = "FIXED";
    screen.fills = [{ type: "SOLID", color: hex("#F9FAFB") }];
    screen.x = screenX; screen.y = 0;

    // Left panel (branding)
    const leftPanel = figma.createFrame();
    leftPanel.resize(600, 900);
    leftPanel.fills = [{
      type: "GRADIENT_LINEAR",
      gradientTransform: [[0.7, 0.7, 0], [-0.7, 0.7, 0.3]],
      gradientStops: [
        { position: 0, color: { r: 0.31, g: 0.27, b: 0.9, a: 1 } },
        { position: 1, color: { r: 0.51, g: 0.36, b: 0.95, a: 1 } },
      ],
    }];
    leftPanel.layoutMode = "VERTICAL";
    leftPanel.primaryAxisAlignItems = "CENTER";
    leftPanel.counterAxisAlignItems = "CENTER";
    leftPanel.primaryAxisSizingMode = "FIXED";
    leftPanel.counterAxisSizingMode = "FIXED";
    leftPanel.itemSpacing = 24;
    leftPanel.paddingLeft = 60; leftPanel.paddingRight = 60;
    screen.appendChild(leftPanel);

    createText("Nova", "Bold", 48, "#FFFFFF", leftPanel);
    const tagline = createText("The modern dashboard for ambitious teams", "Regular", 20, "#FFFFFF", leftPanel);
    tagline.opacity = 0.8;
    tagline.textAlignHorizontal = "CENTER";

    // Right panel (form)
    const rightPanel = figma.createFrame();
    rightPanel.layoutMode = "VERTICAL";
    rightPanel.primaryAxisAlignItems = "CENTER";
    rightPanel.counterAxisAlignItems = "CENTER";
    rightPanel.primaryAxisSizingMode = "FIXED";
    rightPanel.counterAxisSizingMode = "FIXED";
    rightPanel.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    rightPanel.paddingLeft = 80; rightPanel.paddingRight = 80;
    screen.appendChild(rightPanel);
    rightPanel.layoutSizingHorizontal = "FILL";
    rightPanel.layoutSizingVertical = "FILL";

    const loginForm = figma.createFrame();
    loginForm.layoutMode = "VERTICAL";
    loginForm.primaryAxisSizingMode = "AUTO";
    loginForm.counterAxisSizingMode = "FIXED";
    loginForm.resize(400, 10);
    loginForm.itemSpacing = 24;
    loginForm.fills = [];

    createText("Welcome back", "Bold", 28, "#111827", loginForm);
    createText("Enter your credentials to access your account", "Regular", 16, "#6B7280", loginForm);

    // Google button
    const googleBtn = figma.createFrame();
    googleBtn.layoutMode = "HORIZONTAL";
    googleBtn.primaryAxisAlignItems = "CENTER";
    googleBtn.counterAxisAlignItems = "CENTER";
    googleBtn.paddingTop = 12; googleBtn.paddingBottom = 12;
    googleBtn.cornerRadius = 8;
    googleBtn.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
    googleBtn.strokes = [{ type: "SOLID", color: hex("#D1D5DB") }];
    googleBtn.strokeWeight = 1;
    googleBtn.primaryAxisSizingMode = "FIXED";
    googleBtn.counterAxisSizingMode = "AUTO";
    createText("Continue with Google", "Semi Bold", 14, "#374151", googleBtn);
    loginForm.appendChild(googleBtn);
    googleBtn.layoutSizingHorizontal = "FILL";

    // Divider
    const divRow = figma.createFrame();
    divRow.layoutMode = "HORIZONTAL";
    divRow.counterAxisAlignItems = "CENTER";
    divRow.itemSpacing = 16;
    divRow.primaryAxisSizingMode = "FIXED";
    divRow.counterAxisSizingMode = "AUTO";
    divRow.fills = [];
    loginForm.appendChild(divRow);
    divRow.layoutSizingHorizontal = "FILL";

    const dv1 = figma.createRectangle(); dv1.resize(100,1); dv1.fills=[{type:"SOLID",color:hex("#E5E7EB")}];
    divRow.appendChild(dv1); dv1.layoutSizingHorizontal = "FILL";
    createText("or", "Regular", 14, "#9CA3AF", divRow);
    const dv2 = figma.createRectangle(); dv2.resize(100,1); dv2.fills=[{type:"SOLID",color:hex("#E5E7EB")}];
    divRow.appendChild(dv2); dv2.layoutSizingHorizontal = "FILL";

    // Email field
    for (const [lbl, placeholder] of [["Email", "name@example.com"], ["Password", "••••••••"]]) {
      const fg = figma.createFrame();
      fg.layoutMode = "VERTICAL";
      fg.itemSpacing = 6;
      fg.primaryAxisSizingMode = "AUTO";
      fg.counterAxisSizingMode = "FIXED";
      fg.fills = [];
      loginForm.appendChild(fg);
      fg.layoutSizingHorizontal = "FILL";

      const l = createText(lbl, "Medium", 14, "#374151", fg);
      l.layoutSizingHorizontal = "FILL";

      const inp = figma.createFrame();
      inp.layoutMode = "HORIZONTAL";
      inp.counterAxisAlignItems = "CENTER";
      inp.paddingLeft = 14; inp.paddingRight = 14;
      inp.paddingTop = 10; inp.paddingBottom = 10;
      inp.cornerRadius = 8;
      inp.fills = [{ type: "SOLID", color: hex("#FFFFFF") }];
      inp.strokes = [{ type: "SOLID", color: hex("#D1D5DB") }];
      inp.strokeWeight = 1;
      inp.primaryAxisSizingMode = "FIXED";
      inp.counterAxisSizingMode = "AUTO";
      const ph = createText(placeholder, "Regular", 14, "#9CA3AF", inp);
      ph.layoutSizingHorizontal = "FILL";
      fg.appendChild(inp);
      inp.layoutSizingHorizontal = "FILL";
    }

    // Sign in button
    const signInBtn = figma.createFrame();
    signInBtn.layoutMode = "HORIZONTAL";
    signInBtn.primaryAxisAlignItems = "CENTER";
    signInBtn.counterAxisAlignItems = "CENTER";
    signInBtn.paddingTop = 12; signInBtn.paddingBottom = 12;
    signInBtn.cornerRadius = 8;
    signInBtn.fills = [{ type: "SOLID", color: hex("#4F46E5") }];
    signInBtn.primaryAxisSizingMode = "FIXED";
    signInBtn.counterAxisSizingMode = "AUTO";
    createText("Sign in", "Semi Bold", 14, "#FFFFFF", signInBtn);
    loginForm.appendChild(signInBtn);
    signInBtn.layoutSizingHorizontal = "FILL";

    const signupText = createText("Don't have an account? Sign up", "Regular", 14, "#6B7280", loginForm);
    signupText.textAlignHorizontal = "CENTER";

    rightPanel.appendChild(loginForm);

    screenX += 1440 + SCREEN_GAP;
  }

  figma.notify(`✅ 6 screens created: Dashboard Light, Dashboard Dark, Analytics, Users Table, Settings, Login. Total width: ${screenX}px`);
})();
