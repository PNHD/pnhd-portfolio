// NOVA UI KIT — Part 3: 20 Dashboard Screens
// Run AFTER 00, 01, 02, 02b
(async () => {
  try {
  for (const s of ["Regular","Medium","Semi Bold","Bold","Light"])
    await figma.loadFontAsync({ family:"Inter", style:s });

  const hex = h => ({ r:parseInt(h.slice(1,3),16)/255, g:parseInt(h.slice(3,5),16)/255, b:parseInt(h.slice(5,7),16)/255 });

  const L = { // Light theme
    bg:"#F8FAFC", surf:"#FFFFFF", surf2:"#F1F5F9",
    border:"#E2E8F0", border2:"#F1F5F9",
    txt:"#0F172A", txt2:"#334155", txt3:"#64748B", muted:"#94A3B8",
    side:"#FFFFFF", sideBorder:"#E2E8F0",
    navActive:"#EEF2FF", navActiveText:"#4F46E5",
    primary:"#4F46E5", primarySoft:"#EEF2FF",
    success:"#059669", successSoft:"#ECFDF5",
    error:"#DC2626", errorSoft:"#FEF2F2",
    warn:"#D97706", warnSoft:"#FFFBEB",
    info:"#2563EB", infoSoft:"#EFF6FF",
  };
  const D = { // Dark theme
    bg:"#0F172A", surf:"#1E293B", surf2:"#0F172A",
    border:"#334155", border2:"#1E293B",
    txt:"#F8FAFC", txt2:"#CBD5E1", txt3:"#94A3B8", muted:"#64748B",
    side:"#111827", sideBorder:"#1F2937",
    navActive:"#1E293B", navActiveText:"#818CF8",
    primary:"#818CF8", primarySoft:"#1E1B4B",
    success:"#34D399", successSoft:"#064E3B",
    error:"#FCA5A5", errorSoft:"#7F1D1D",
    warn:"#FCD34D", warnSoft:"#78350F",
    info:"#60A5FA", infoSoft:"#1E3A5F",
  };

  let X = 0; const GAP = 80;

  function fr(name, cfg={}) {
    const f = figma.createFrame();
    f.name = name;
    if (cfg.wh) f.resize(cfg.wh[0], cfg.wh[1]);
    f.fills = cfg.fill != null ? [{ type:"SOLID", color:hex(cfg.fill) }] : [];
    if (cfg.lay) {
      f.layoutMode = cfg.lay;
      f.primaryAxisSizingMode = cfg.pSz || "AUTO";
      f.counterAxisSizingMode = cfg.cSz || "AUTO";
      if (cfg.pAl) f.primaryAxisAlignItems = cfg.pAl;
      if (cfg.cAl) f.counterAxisAlignItems = cfg.cAl;
    }
    if (cfg.gap) f.itemSpacing = cfg.gap;
    if (cfg.p) { const [t,r,b,l] = Array.isArray(cfg.p)?cfg.p:[cfg.p,cfg.p,cfg.p,cfg.p]; f.paddingTop=t;f.paddingRight=r;f.paddingBottom=b;f.paddingLeft=l; }
    if (cfg.r) f.cornerRadius = cfg.r;
    if (cfg.stroke) { f.strokes=[{type:"SOLID",color:hex(cfg.stroke)}]; f.strokeWeight=cfg.sw||1; f.strokeAlign="INSIDE"; }
    if (cfg.sh) f.effects=[{type:"DROP_SHADOW",color:{r:0,g:0,b:0,a:cfg.sh},offset:{x:0,y:2},radius:8,visible:true,blendMode:"NORMAL"}];
    if (cfg.clip) f.clipsContent=true;
    return f;
  }

  function tx(str, style, size, color, parent) {
    const t = figma.createText();
    t.characters = str;
    t.fontName = { family:"Inter", style };
    t.fontSize = size;
    t.fills = [{ type:"SOLID", color:hex(color) }];
    if (parent) parent.appendChild(t);
    return t;
  }

  function rc(w, h, fill, r=0, parent) {
    const x = figma.createRectangle();
    x.resize(w,h);
    x.fills = fill ? [{ type:"SOLID", color:hex(fill) }] : [];
    if (r) x.cornerRadius = r;
    if (parent) parent.appendChild(x);
    return x;
  }

  function el(w, h, fill, parent) {
    const e = figma.createEllipse();
    e.resize(w,h);
    e.fills = fill ? [{ type:"SOLID", color:hex(fill) }] : [];
    if (parent) parent.appendChild(e);
    return e;
  }

  function sp(parent) {
    const s = fr("_sp", { fill:null, lay:"HORIZONTAL", pSz:"FIXED", cSz:"FIXED" });
    s.resize(4,1);
    if (parent) parent.appendChild(s);
    s.layoutSizingHorizontal="FILL";
    return s;
  }

  function fill(f) { f.layoutSizingHorizontal="FILL"; return f; }

  // ── Sidebar ──
  function sidebar(parent, T, active="Dashboard") {
    const nav = fr("Sidebar", { fill:T.side, lay:"VERTICAL", pSz:"FIXED", cSz:"FIXED", p:[20,14,20,14], gap:2, stroke:T.sideBorder });
    nav.resize(240, 900);
    parent.appendChild(nav);

    const logo = fr("Logo", { fill:null, lay:"HORIZONTAL", cAl:"CENTER", gap:10, p:[4,10,18,10], pSz:"AUTO", cSz:"AUTO" });
    const lm = fr("Mark", { fill:T.primary, r:8 }); lm.resize(30,30); logo.appendChild(lm);
    tx("Nova", "Bold", 18, T.txt, logo);
    nav.appendChild(logo); fill(logo);

    const navItems = [
      {label:"Dashboard",group:"MAIN"},{label:"Analytics",group:"MAIN"},{label:"Users",group:"MAIN"},
      {label:"Products",group:"MAIN"},{label:"Orders",group:"MAIN"},{label:"Messages",group:"MAIN",badge:"3"},
      {label:"Reports",group:"MANAGE"},{label:"Calendar",group:"MANAGE"},{label:"Settings",group:"MANAGE"},
    ];
    let lastGroup = "";
    for (const item of navItems) {
      if (item.group !== lastGroup) {
        lastGroup = item.group;
        const glw = fr("", { fill:null, lay:"HORIZONTAL", pSz:"AUTO", cSz:"AUTO", p:[6,0,2,10] });
        tx(item.group==="MAIN"?"MAIN MENU":"MANAGEMENT","Medium",10,T.muted,glw).letterSpacing={value:1,unit:"PIXELS"};
        nav.appendChild(glw); fill(glw);
      }
      const isAct = item.label===active;
      const ni = fr(item.label, { fill:isAct?T.navActive:null, lay:"HORIZONTAL", cAl:"CENTER", gap:10, p:[9,12,9,12], r:8, pSz:"AUTO", cSz:"AUTO" });
      const ic = fr("", { fill:isAct?T.primarySoft:T.surf2, r:6 }); ic.resize(20,20);
      ic.layoutMode="HORIZONTAL"; ic.primaryAxisAlignItems="CENTER"; ic.counterAxisAlignItems="CENTER";
      ic.primaryAxisSizingMode="FIXED"; ic.counterAxisSizingMode="FIXED";
      rc(12,12,isAct?T.primary:T.txt3,3,ic); ni.appendChild(ic);
      tx(item.label,isAct?"Semi Bold":"Medium",14,isAct?T.navActiveText:T.txt2,ni);
      if (item.badge) {
        sp(ni);
        const b=fr("",{fill:T.primary,r:999,lay:"HORIZONTAL",pSz:"AUTO",cSz:"AUTO",p:[2,6,2,6]});
        tx(item.badge,"Medium",11,"#FFFFFF",b); ni.appendChild(b);
      }
      nav.appendChild(ni); fill(ni);
    }

    const dv = rc(10,1,T.border); nav.appendChild(dv); fill(dv);
    const ur = fr("User", { fill:null, lay:"HORIZONTAL", cAl:"CENTER", gap:10, p:[12,10,4,10], pSz:"AUTO", cSz:"AUTO" });
    el(32,32,T.primary,ur);
    const ui = fr("",{fill:null,lay:"VERTICAL",gap:2,pSz:"AUTO",cSz:"AUTO"});
    tx("Dang Pham","Semi Bold",13,T.txt,ui); tx("Admin","Regular",12,T.txt3,ui);
    ur.appendChild(ui); fill(ui); nav.appendChild(ur); fill(ur);
    return nav;
  }

  // ── Topbar ──
  function topbar(parent, title, T) {
    const bar = fr("Topbar", { fill:T.surf, lay:"HORIZONTAL", cAl:"CENTER", p:[16,24,16,28], gap:14, pSz:"FIXED", cSz:"AUTO", stroke:T.border, sh:0.03 });
    parent.appendChild(bar); fill(bar);
    const tg = fr("",{fill:null,lay:"VERTICAL",gap:2,pSz:"AUTO",cSz:"AUTO"});
    tx(title,"Semi Bold",20,T.txt,tg); bar.appendChild(tg); sp(bar);
    const sb = fr("Search",{fill:T.bg,stroke:T.border,r:8,lay:"HORIZONTAL",cAl:"CENTER",gap:8,p:[9,14,9,14],pSz:"FIXED",cSz:"AUTO"});
    sb.resize(220,10); rc(14,14,T.muted,2,sb); tx("Search anything...","Regular",14,T.muted,sb); bar.appendChild(sb);
    const nb = fr("",{fill:T.surf2,r:8,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",pSz:"FIXED",cSz:"FIXED"}); nb.resize(38,38); rc(14,14,T.txt3,2,nb); bar.appendChild(nb);
    el(36,36,T.primary,bar);
    return bar;
  }

  // ── Stat card ──
  function statCard(parent, label, value, change, up, T, iconFill) {
    const card = fr(`Stat:${label}`, { fill:T.surf, stroke:T.border, r:12, sh:0.05, lay:"VERTICAL", gap:12, p:[20,20,20,20], pSz:"AUTO", cSz:"FIXED" });
    parent.appendChild(card); fill(card);
    const top = fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",pSz:"FIXED",cSz:"AUTO"}); fill(top);
    tx(label,"Medium",13,T.txt3,top); sp(top);
    const ib = fr("",{fill:iconFill||T.primarySoft,r:8,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",pSz:"FIXED",cSz:"FIXED"}); ib.resize(36,36);
    rc(18,18,iconFill?"#FFFFFF":T.primary,3,ib); top.appendChild(ib); card.appendChild(top);
    tx(value,"Bold",28,T.txt,card);
    const cr = fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:6,pSz:"AUTO",cSz:"AUTO"});
    const cb = fr("",{fill:up?T.successSoft:T.errorSoft,r:999,lay:"HORIZONTAL",cAl:"CENTER",gap:3,p:[3,8,3,6],pSz:"AUTO",cSz:"AUTO"});
    rc(7,7,up?T.success:T.error,2,cb); tx(change,"Semi Bold",12,up?T.success:T.error,cb); cr.appendChild(cb);
    tx("from last month","Regular",12,T.txt3,cr); card.appendChild(cr);
    const sp2 = fr("Spark",{fill:null,lay:"HORIZONTAL",cAl:"MAX",gap:2,pSz:"FIXED",cSz:"FIXED"}); sp2.resize(100,28);
    for (const h of [10,14,9,18,13,20,16,22,18,24,20,28]) { const b=rc(5,h,up?T.success:T.error,2); b.opacity=0.55; sp2.appendChild(b); }
    card.appendChild(sp2); fill(sp2);
    return card;
  }

  // ── Bar chart card ──
  function barChart(parent, title, subtitle, T, heights) {
    const card = fr(title, { fill:T.surf, stroke:T.border, r:12, sh:0.04, lay:"VERTICAL", gap:16, p:[20,20,20,20], pSz:"AUTO", cSz:"FIXED" });
    parent.appendChild(card); fill(card);
    const hdr = fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",pSz:"FIXED",cSz:"AUTO"}); fill(hdr);
    const hl = fr("",{fill:null,lay:"VERTICAL",gap:2,pSz:"AUTO",cSz:"AUTO"});
    tx(title,"Semi Bold",15,T.txt,hl); tx(subtitle,"Regular",12,T.txt3,hl); hdr.appendChild(hl); sp(hdr);
    for (const [t,a] of [["W",""],["M",""],["Q",""],["Y","Y"]]) {
      const tb = fr("",{fill:a?T.primarySoft:null,r:6,lay:"HORIZONTAL",p:[5,10,5,10],pSz:"AUTO",cSz:"AUTO"});
      tx(t,"Medium",12,a?T.primary:T.txt3,tb); hdr.appendChild(tb);
    }
    card.appendChild(hdr);
    const area = fr("Area",{fill:null,lay:"HORIZONTAL",cAl:"MAX",gap:8,pSz:"FIXED",cSz:"FIXED"}); area.resize(600,160);
    card.appendChild(area); fill(area);
    for (let i=0;i<heights.length;i++) {
      const col = fr("",{fill:null,lay:"VERTICAL",cAl:"CENTER",pAl:"MAX",pSz:"FIXED",cSz:"AUTO"}); col.resize(10,170);
      area.appendChild(col); fill(col);
      const isLast = i===heights.length-1;
      const b=rc(22,heights[i],isLast?T.primary:T.primarySoft,4); if(!isLast)b.opacity=0.8; col.appendChild(b);
    }
    return card;
  }

  // ── Screen scaffold ──
  function screen(name, T, active) {
    const s = fr(name, { fill:T.bg, lay:"HORIZONTAL", pSz:"FIXED", cSz:"FIXED" });
    s.resize(1440,900); s.x=X; s.y=0; X+=1440+GAP;
    sidebar(s, T, active);
    const m = fr("Main",{fill:T.bg,lay:"VERTICAL",pSz:"FIXED",cSz:"FIXED"}); s.appendChild(m); fill(m); m.layoutSizingVertical="FILL";
    topbar(m, name.replace(/^.*—\s*/,""), T);
    const c = fr("Content",{fill:null,lay:"VERTICAL",gap:18,p:[22,28,22,28],pSz:"AUTO",cSz:"FIXED"}); m.appendChild(c); fill(c);
    return { s, m, c };
  }

  // ── Table ──
  function tableCard(parent, T, cols, rows) {
    const card = fr("Table",{fill:T.surf,stroke:T.border,r:12,lay:"VERTICAL",pSz:"AUTO",cSz:"FIXED",clip:true});
    parent.appendChild(card); fill(card);
    const hdr = fr("Header",{fill:T.surf2,lay:"HORIZONTAL",cAl:"CENTER",p:[12,20,12,20],pSz:"FIXED",cSz:"AUTO"}); fill(hdr);
    for (const col of cols) { const ct=tx(col,"Medium",12,T.txt3,hdr); ct.layoutSizingHorizontal="FILL"; }
    card.appendChild(hdr);
    for (const row of rows) {
      rc(10,1,T.border2,0,card).layoutSizingHorizontal="FILL";
      const rw = fr("Row",{fill:T.surf,lay:"HORIZONTAL",cAl:"CENTER",p:[14,20,14,20],gap:8,pSz:"FIXED",cSz:"AUTO"}); fill(rw);
      for (const [ci,cell] of row.entries()) {
        const cellFr = fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:8,pSz:"FIXED",cSz:"AUTO"}); fill(cellFr);
        if (ci===0) el(28,28,T.primarySoft,cellFr);
        if (typeof cell==="object"&&cell.badge) {
          const b=fr("",{fill:cell.color+"22",r:999,lay:"HORIZONTAL",p:[2,8,2,8],pSz:"AUTO",cSz:"AUTO"});
          el(6,6,cell.color,b); tx(cell.badge,"Medium",12,cell.color,b); cellFr.appendChild(b);
        } else { const ct=tx(String(cell),"Regular",14,T.txt2,cellFr); ct.layoutSizingHorizontal="FILL"; }
        rw.appendChild(cellFr);
      }
      card.appendChild(rw);
    }
    return card;
  }

  // ── Form field ──
  function field(parent, label, value, T) {
    const fg = fr("",{fill:null,lay:"VERTICAL",gap:6,pSz:"AUTO",cSz:"FIXED"}); parent.appendChild(fg); fill(fg);
    tx(label,"Medium",13,T.txt2,fg);
    const inp = fr("",{fill:T.surf,stroke:T.border,r:8,lay:"HORIZONTAL",cAl:"CENTER",p:[10,14,10,14],pSz:"FIXED",cSz:"AUTO"});
    tx(value,"Regular",14,value.startsWith("Enter")||value==="••••••••••"?T.muted:T.txt,inp); fg.appendChild(inp); fill(inp);
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 1 — Dashboard Overview (Light)
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Dashboard — Overview", L, "Dashboard");
    const ph=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",pSz:"FIXED",cSz:"AUTO"}); fill(ph);
    const phl=fr("",{fill:null,lay:"VERTICAL",gap:2,pSz:"AUTO",cSz:"AUTO"});
    tx("Good morning, Dang 👋","Bold",22,L.txt,phl); tx("Here's what's happening with Nova today","Regular",14,L.txt3,phl);
    ph.appendChild(phl); sp(ph);
    const exp=fr("",{fill:L.primary,r:8,lay:"HORIZONTAL",cAl:"CENTER",p:[10,16,10,16],pSz:"AUTO",cSz:"AUTO"});
    tx("Export Report","Semi Bold",14,"#FFFFFF",exp); ph.appendChild(exp); c.appendChild(ph);

    const stats=fr("Stats",{fill:null,lay:"HORIZONTAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(stats); fill(stats);
    statCard(stats,"Total Revenue","$124,592","+18.4%",true,L,null);
    statCard(stats,"Active Users","8,249","+12.5%",true,L,"#059669");
    statCard(stats,"New Orders","1,824","+5.2%",true,L,"#D97706");
    statCard(stats,"Churn Rate","2.4%","-0.8%",false,L,"#DC2626");

    const cr=fr("Charts",{fill:null,lay:"HORIZONTAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(cr); fill(cr);
    barChart(cr,"Revenue Overview","Last 12 months",L,[80,110,90,140,120,100,160,130,150,110,170,190]);

    const rCol=fr("RCol",{fill:null,lay:"VERTICAL",gap:14,pSz:"AUTO",cSz:"FIXED"}); rCol.resize(320,10); cr.appendChild(rCol);
    const dc=fr("Traffic",{fill:L.surf,stroke:L.border,r:12,sh:0.04,lay:"VERTICAL",gap:14,p:[18,18,18,18],pSz:"AUTO",cSz:"FIXED"}); rCol.appendChild(dc);
    tx("Traffic Sources","Semi Bold",14,L.txt,dc);
    const da=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",pAl:"CENTER",pSz:"AUTO",cSz:"AUTO"});
    const donut=el(100,100,L.primary); donut.strokes=[{type:"SOLID",color:hex(L.surf)}]; donut.strokeWeight=28; da.appendChild(donut); dc.appendChild(da);
    for (const [lbl,pct,col] of [["Organic","42%","#4F46E5"],["Direct","28%","#10B981"],["Referral","18%","#F59E0B"],["Social","12%","#EF4444"]]) {
      const row=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:8,pSz:"AUTO",cSz:"AUTO"});
      el(8,8,col,row); tx(lbl,"Regular",13,L.txt2,row); sp(row); tx(pct,"Semi Bold",13,L.txt,row);
      dc.appendChild(row); fill(row);
    }
    const ac=fr("Activity",{fill:L.surf,stroke:L.border,r:12,sh:0.04,lay:"VERTICAL",gap:0,pSz:"AUTO",cSz:"FIXED"}); rCol.appendChild(ac);
    const ah=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",p:[14,16,14,16],pSz:"FIXED",cSz:"AUTO"});
    tx("Recent Activity","Semi Bold",14,L.txt,ah); sp(ah); tx("View all","Medium",12,L.primary,ah); ac.appendChild(ah); fill(ah);
    for (const [name,desc,time,col] of [["New user signup","John D. joined","2m ago",L.success],["Order #1284","Payment received","15m ago",L.info],["Server alert","CPU usage 89%","1h ago",L.warn],["New comment","On Dashboard doc","2h ago",L.primary]]) {
      rc(10,1,L.border2,0,ac).layoutSizingHorizontal="FILL";
      const row=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:10,p:[10,16,10,16],pSz:"FIXED",cSz:"AUTO"});
      el(8,8,col,row);
      const info=fr("",{fill:null,lay:"VERTICAL",gap:1,pSz:"AUTO",cSz:"AUTO"});
      tx(name,"Medium",13,L.txt,info); tx(desc,"Regular",12,L.txt3,info); row.appendChild(info); fill(info);
      tx(time,"Regular",12,L.muted,row); ac.appendChild(row); fill(row);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 2 — Dashboard Overview (Dark)
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Dashboard — Overview (Dark)", D, "Dashboard");
    const ph=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",pSz:"FIXED",cSz:"AUTO"}); fill(ph);
    const phl=fr("",{fill:null,lay:"VERTICAL",gap:2,pSz:"AUTO",cSz:"AUTO"});
    tx("Good morning, Dang 👋","Bold",22,D.txt,phl); tx("Here's what's happening with Nova today","Regular",14,D.txt3,phl);
    ph.appendChild(phl); sp(ph);
    const exp=fr("",{fill:D.primary,r:8,lay:"HORIZONTAL",cAl:"CENTER",p:[10,16,10,16],pSz:"AUTO",cSz:"AUTO"});
    tx("Export Report","Semi Bold",14,"#FFFFFF",exp); ph.appendChild(exp); c.appendChild(ph);
    const stats=fr("Stats",{fill:null,lay:"HORIZONTAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(stats); fill(stats);
    statCard(stats,"Total Revenue","$124,592","+18.4%",true,D,null);
    statCard(stats,"Active Users","8,249","+12.5%",true,D,"#34D399");
    statCard(stats,"New Orders","1,824","+5.2%",true,D,"#FCD34D");
    statCard(stats,"Churn Rate","2.4%","-0.8%",false,D,"#FCA5A5");
    const cr=fr("Charts",{fill:null,lay:"HORIZONTAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(cr); fill(cr);
    barChart(cr,"Revenue Overview","Last 12 months",D,[80,110,90,140,120,100,160,130,150,110,170,190]);
    const rCol=fr("RCol",{fill:null,lay:"VERTICAL",gap:14,pSz:"AUTO",cSz:"FIXED"}); rCol.resize(320,10); cr.appendChild(rCol);
    const dc=fr("Traffic",{fill:D.surf,stroke:D.border,r:12,sh:0.08,lay:"VERTICAL",gap:14,p:[18,18,18,18],pSz:"AUTO",cSz:"FIXED"}); rCol.appendChild(dc);
    tx("Traffic Sources","Semi Bold",14,D.txt,dc);
    const da=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",pAl:"CENTER",pSz:"AUTO",cSz:"AUTO"});
    const donut=el(100,100,D.primary); donut.strokes=[{type:"SOLID",color:hex(D.surf)}]; donut.strokeWeight=28; da.appendChild(donut); dc.appendChild(da);
    for (const [lbl,pct,col] of [["Organic","42%","#818CF8"],["Direct","28%","#34D399"],["Referral","18%","#FCD34D"],["Social","12%","#FCA5A5"]]) {
      const row=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:8,pSz:"AUTO",cSz:"AUTO"});
      el(8,8,col,row); tx(lbl,"Regular",13,D.txt2,row); sp(row); tx(pct,"Semi Bold",13,D.txt,row);
      dc.appendChild(row); fill(row);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 3 — Analytics (Light)
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Analytics — Performance", L, "Analytics");
    const kpis=fr("KPIs",{fill:null,lay:"HORIZONTAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(kpis); fill(kpis);
    for (const [lbl,val,ch,up] of [["Page Views","1.24M","+22%",true],["Sessions","284K","+14%",true],["Avg. Duration","3m 42s","+8%",true],["Bounce Rate","38.4%","-5%",true]]) {
      const k=fr(lbl,{fill:L.surf,stroke:L.border,r:12,sh:0.04,lay:"VERTICAL",gap:8,p:[16,18,16,18],pSz:"AUTO",cSz:"FIXED"}); kpis.appendChild(k); fill(k);
      tx(lbl,"Medium",12,L.txt3,k); tx(val,"Bold",24,L.txt,k);
      const cr2=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:4,pSz:"AUTO",cSz:"AUTO"});
      const cb=fr("",{fill:up?L.successSoft:L.errorSoft,r:999,lay:"HORIZONTAL",p:[2,6,2,6],pSz:"AUTO",cSz:"AUTO"}); tx(ch,"Medium",11,up?L.success:L.error,cb); cr2.appendChild(cb);
      tx("vs last period","Regular",11,L.txt3,cr2); k.appendChild(cr2);
    }
    barChart(c,"Visitors Over Time","Daily sessions — last 30 days",L,[60,75,55,90,80,70,110,85,100,75,120,95,105,80,130,100,115,88,140,108,125,95,150,120,135,105,160,130,145,170]);
    const bot=fr("Bottom",{fill:null,lay:"HORIZONTAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(bot); fill(bot);
    const tp=fr("Top Pages",{fill:L.surf,stroke:L.border,r:12,sh:0.04,lay:"VERTICAL",gap:0,pSz:"AUTO",cSz:"FIXED"}); bot.appendChild(tp); fill(tp);
    const tph=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",p:[14,16,14,16],pSz:"FIXED",cSz:"AUTO"});
    tx("Top Pages","Semi Bold",14,L.txt,tph); sp(tph); tx("This month","Medium",12,L.txt3,tph); tp.appendChild(tph); fill(tph);
    for (const [pg,views,pct] of [["/dashboard","24,521","28%"],["/analytics","18,320","21%"],["/users","12,400","14%"],["/settings","9,850","11%"],["/login","8,230","9%"]]) {
      rc(10,1,L.border2,0,tp).layoutSizingHorizontal="FILL";
      const row=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:10,p:[10,16,10,16],pSz:"FIXED",cSz:"AUTO"});
      tx(pg,"Regular",13,L.txt,row); fill(row); sp(row); tx(views,"Medium",13,L.txt,row); tx(pct,"Regular",12,L.txt3,row);
      tp.appendChild(row); fill(row);
    }
    const dv2=fr("Devices",{fill:L.surf,stroke:L.border,r:12,sh:0.04,lay:"VERTICAL",gap:14,p:[18,18,18,18],pSz:"AUTO",cSz:"FIXED"}); dv2.resize(280,10); bot.appendChild(dv2);
    tx("Device Breakdown","Semi Bold",14,L.txt,dv2);
    for (const [dev,pct,col,w] of [["Desktop","64%","#4F46E5",160],["Mobile","28%","#10B981",70],["Tablet","8%","#F59E0B",20]]) {
      const row=fr("",{fill:null,lay:"VERTICAL",gap:6,pSz:"AUTO",cSz:"FIXED"}); fill(row);
      const lab=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:6,pSz:"AUTO",cSz:"AUTO"});
      el(8,8,col,lab); tx(dev,"Regular",13,L.txt2,lab); lab.itemSpacing=6; sp(lab); tx(pct,"Semi Bold",13,L.txt,lab); row.appendChild(lab); fill(lab);
      const bg=fr("",{fill:L.surf2,r:999,pSz:"FIXED",cSz:"FIXED"}); bg.resize(240,6);
      const f2=fr("",{fill:col,r:999,pSz:"FIXED",cSz:"FIXED"}); f2.resize(w,6); bg.appendChild(f2); row.appendChild(bg); dv2.appendChild(row);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 4 — Analytics (Dark)
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Analytics — Performance (Dark)", D, "Analytics");
    const kpis=fr("KPIs",{fill:null,lay:"HORIZONTAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(kpis); fill(kpis);
    for (const [lbl,val,ch,up] of [["Page Views","1.24M","+22%",true],["Sessions","284K","+14%",true],["Avg. Duration","3m 42s","+8%",true],["Bounce Rate","38.4%","-5%",true]]) {
      const k=fr(lbl,{fill:D.surf,stroke:D.border,r:12,sh:0.08,lay:"VERTICAL",gap:8,p:[16,18,16,18],pSz:"AUTO",cSz:"FIXED"}); kpis.appendChild(k); fill(k);
      tx(lbl,"Medium",12,D.txt3,k); tx(val,"Bold",24,D.txt,k);
      const cr2=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:4,pSz:"AUTO",cSz:"AUTO"});
      const cb=fr("",{fill:up?D.successSoft:D.errorSoft,r:999,lay:"HORIZONTAL",p:[2,6,2,6],pSz:"AUTO",cSz:"AUTO"}); tx(ch,"Medium",11,up?D.success:D.error,cb); cr2.appendChild(cb);
      tx("vs last period","Regular",11,D.txt3,cr2); k.appendChild(cr2);
    }
    barChart(c,"Visitors Over Time","Daily sessions — last 30 days",D,[60,75,55,90,80,70,110,85,100,75,120,95,105,80,130,100,115,88,140,108,125,95,150,120,135,105,160,130,145,170]);
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 5 — Users Table
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Users — Management", L, "Users");
    const fb=fr("Filter",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:10,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(fb); fill(fb);
    const si=fr("",{fill:L.surf,stroke:L.border,r:8,lay:"HORIZONTAL",cAl:"CENTER",gap:8,p:[10,14,10,14],pSz:"FIXED",cSz:"AUTO"}); si.resize(280,10);
    rc(14,14,L.muted,2,si); tx("Search users...","Regular",14,L.muted,si); fb.appendChild(si);
    for (const [lbl,a] of [["All Users",true],["Active",false],["Inactive",false],["Admin",false]]) {
      const t=fr("",{fill:a?L.primarySoft:L.surf,stroke:a?null:L.border,r:8,lay:"HORIZONTAL",p:[9,14,9,14],pSz:"AUTO",cSz:"AUTO"});
      tx(lbl,"Medium",14,a?L.primary:L.txt2,t); fb.appendChild(t);
    }
    sp(fb);
    const ab=fr("",{fill:L.primary,r:8,lay:"HORIZONTAL",p:[10,16,10,16],pSz:"AUTO",cSz:"AUTO"});
    tx("+ Invite User","Semi Bold",14,"#FFFFFF",ab); fb.appendChild(ab);
    tableCard(c,L,["Name","Email","Role","Status","Last Active","Actions"],[
      ["Olivia Rhye","olivia@company.com","Admin",{badge:"Active",color:L.success},"Jan 15, 2026","•••"],
      ["Phoenix Baker","phoenix@company.com","Editor",{badge:"Active",color:L.success},"Jan 14, 2026","•••"],
      ["Lana Steiner","lana@company.com","Viewer",{badge:"Inactive",color:L.muted},"Dec 28, 2025","•••"],
      ["Demi Wilkinson","demi@company.com","Editor",{badge:"Active",color:L.success},"Jan 13, 2026","•••"],
      ["Candice Wu","candice@company.com","Admin",{badge:"Active",color:L.success},"Jan 15, 2026","•••"],
      ["Natali Craig","natali@company.com","Viewer",{badge:"Pending",color:L.warn},"Dec 20, 2025","•••"],
      ["Drew Cano","drew@company.com","Editor",{badge:"Active",color:L.success},"Jan 12, 2026","•••"],
      ["Orlando Diggs","orlando@company.com","Viewer",{badge:"Inactive",color:L.muted},"Nov 30, 2025","•••"],
    ]);
    const pg=fr("Pagination",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:6,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(pg); fill(pg);
    tx("Showing 1–8 of 128 users","Regular",13,L.txt3,pg); sp(pg);
    for (const [lbl,a] of [["←",false],["1",true],["2",false],["3",false],["...",false],["16",false],["→",false]]) {
      const b=fr("",{fill:a?L.primary:L.surf,stroke:a?null:L.border,r:6,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",pSz:"FIXED",cSz:"FIXED"}); b.resize(32,32);
      tx(lbl,"Medium",13,a?"#FFFFFF":L.txt2,b); pg.appendChild(b);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 6 — User Profile Detail
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Users — Profile Detail", L, "Users");
    const cols=fr("Cols",{fill:null,lay:"HORIZONTAL",gap:20,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(cols); fill(cols);
    const pc=fr("Profile",{fill:L.surf,stroke:L.border,r:12,sh:0.04,lay:"VERTICAL",gap:16,p:[24,24,24,24],pSz:"AUTO",cSz:"FIXED"}); pc.resize(280,10); cols.appendChild(pc);
    el(80,80,L.primary,pc); tx("Olivia Rhye","Bold",20,L.txt,pc); tx("Product Designer","Regular",14,L.txt3,pc);
    const badge2=fr("",{fill:L.successSoft,r:999,lay:"HORIZONTAL",cAl:"CENTER",gap:4,p:[4,10,4,10],pSz:"AUTO",cSz:"AUTO"});
    el(6,6,L.success,badge2); tx("Active","Medium",12,L.success,badge2); pc.appendChild(badge2);
    rc(10,1,L.border,0,pc).layoutSizingHorizontal="FILL";
    for (const [lbl,val] of [["Email","olivia@company.com"],["Role","Admin"],["Department","Design"],["Location","San Francisco"],["Joined","Jan 2024"]]) {
      const row=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:8,pSz:"AUTO",cSz:"AUTO"}); fill(row);
      tx(lbl,"Medium",12,L.txt3,row); sp(row); tx(val,"Regular",13,L.txt,row); pc.appendChild(row);
    }
    const eb=fr("",{fill:null,stroke:L.border,r:8,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",p:[9,16,9,16],pSz:"FIXED",cSz:"AUTO"});
    tx("Edit Profile","Medium",14,L.txt2,eb); pc.appendChild(eb); fill(eb);
    const rp=fr("Right",{fill:null,lay:"VERTICAL",gap:16,pSz:"AUTO",cSz:"FIXED"}); cols.appendChild(rp); fill(rp);
    const stats2=fr("",{fill:null,lay:"HORIZONTAL",gap:12,pSz:"FIXED",cSz:"AUTO"}); fill(stats2);
    for (const [lbl,val] of [["Projects","24"],["Tasks Done","186"],["Comments","432"]]) {
      const k=fr("",{fill:L.surf,stroke:L.border,r:12,lay:"VERTICAL",gap:4,p:[14,18,14,18],pSz:"AUTO",cSz:"FIXED"}); fill(k);
      tx(val,"Bold",22,L.txt,k); tx(lbl,"Regular",12,L.txt3,k); stats2.appendChild(k);
    }
    rp.appendChild(stats2);
    const af=fr("Activity Feed",{fill:L.surf,stroke:L.border,r:12,lay:"VERTICAL",gap:0,pSz:"AUTO",cSz:"FIXED"}); rp.appendChild(af); fill(af);
    const afh=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",p:[14,18,14,18],pSz:"FIXED",cSz:"AUTO"});
    tx("Recent Activity","Semi Bold",14,L.txt,afh); af.appendChild(afh); fill(afh);
    for (const [action,time] of [
      ["Submitted design review for Dashboard v3","2 hours ago"],
      ["Commented on Analytics wireframes","4 hours ago"],
      ["Updated component library in Figma","Yesterday at 3:20 PM"],
      ["Completed Q1 design audit","Jan 13 at 10:00 AM"],
      ["Joined Nova design team","Jan 4, 2026"],
    ]) {
      rc(10,1,L.border2,0,af).layoutSizingHorizontal="FILL";
      const row=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:12,p:[12,18,12,18],pSz:"FIXED",cSz:"AUTO"});
      const dot=fr("",{fill:L.primarySoft,r:999,pSz:"FIXED",cSz:"FIXED"}); dot.resize(10,10); row.appendChild(dot);
      const inf=fr("",{fill:null,lay:"VERTICAL",gap:2,pSz:"AUTO",cSz:"AUTO"});
      tx(action,"Regular",13,L.txt,inf); tx(time,"Regular",11,L.muted,inf); row.appendChild(inf); fill(inf);
      af.appendChild(row); fill(row);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 7 — Products Grid
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Products — Catalog", L, "Products");
    const fb=fr("Filter",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:10,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(fb); fill(fb);
    const si=fr("",{fill:L.surf,stroke:L.border,r:8,lay:"HORIZONTAL",cAl:"CENTER",gap:8,p:[10,14,10,14],pSz:"FIXED",cSz:"AUTO"}); si.resize(260,10);
    rc(14,14,L.muted,2,si); tx("Search products...","Regular",14,L.muted,si); fb.appendChild(si);
    for (const [lbl,a] of [["All",true],["Active",false],["Draft",false],["Archived",false]]) {
      const t=fr("",{fill:a?L.primarySoft:L.surf,stroke:a?null:L.border,r:8,lay:"HORIZONTAL",p:[9,14,9,14],pSz:"AUTO",cSz:"AUTO"});
      tx(lbl,"Medium",14,a?L.primary:L.txt2,t); fb.appendChild(t);
    }
    sp(fb);
    const ab=fr("",{fill:L.primary,r:8,lay:"HORIZONTAL",p:[10,16,10,16],pSz:"AUTO",cSz:"AUTO"});
    tx("+ Add Product","Semi Bold",14,"#FFFFFF",ab); fb.appendChild(ab);
    const grid=fr("Grid",{fill:null,lay:"HORIZONTAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(grid); fill(grid);
    const products=[
      {name:"Analytics Pro",cat:"SaaS Tool",price:"$49/mo",rev:"$24,200",col:L.success},
      {name:"Dashboard Kit",cat:"UI Kit",price:"$89",rev:"$18,400",col:L.success},
      {name:"Nova Icons",cat:"Icon Set",price:"$29",rev:"$9,800",col:L.success},
      {name:"CRM Template",cat:"Template",price:"$149",rev:"—",col:L.warn},
      {name:"Form Builder",cat:"SaaS Tool",price:"$39/mo",rev:"$12,100",col:L.success},
      {name:"Email Designer",cat:"SaaS Tool",price:"$29/mo",rev:"$7,350",col:L.success},
    ];
    for (const p of products) {
      const card=fr(p.name,{fill:L.surf,stroke:L.border,r:12,sh:0.04,lay:"VERTICAL",gap:12,p:[16,16,16,16],pSz:"AUTO",cSz:"FIXED"}); card.resize(172,10); grid.appendChild(card);
      const thumb=fr("",{fill:L.primarySoft,r:8,pSz:"FIXED",cSz:"FIXED"}); thumb.resize(140,90);
      thumb.layoutMode="HORIZONTAL"; thumb.primaryAxisAlignItems="CENTER"; thumb.counterAxisAlignItems="CENTER";
      thumb.primaryAxisSizingMode="FIXED"; thumb.counterAxisSizingMode="FIXED";
      rc(36,5,L.primary,3,thumb); card.appendChild(thumb);
      const status=fr("",{fill:p.col+"22",r:999,lay:"HORIZONTAL",p:[2,8,2,8],pSz:"AUTO",cSz:"AUTO"});
      tx(p.rev==="—"?"Draft":"Active","Medium",11,p.col,status); card.appendChild(status);
      tx(p.name,"Semi Bold",14,L.txt,card); tx(p.cat,"Regular",12,L.txt3,card);
      const pr=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",pSz:"AUTO",cSz:"AUTO"}); fill(pr);
      tx(p.price,"Semi Bold",15,L.primary,pr); sp(pr); tx(p.rev,"Regular",12,L.txt3,pr); card.appendChild(pr);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 8 — Orders
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Orders — Management", L, "Orders");
    const sum=fr("Summary",{fill:null,lay:"HORIZONTAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(sum); fill(sum);
    for (const [lbl,val,col,bg] of [["Total Orders","3,842",L.txt,L.surf],["Pending","241",L.warn,L.warnSoft],["Completed","3,401",L.success,L.successSoft],["Cancelled","200",L.error,L.errorSoft]]) {
      const k=fr(lbl,{fill:bg,stroke:L.border,r:12,sh:0.03,lay:"VERTICAL",gap:6,p:[14,18,14,18],pSz:"AUTO",cSz:"FIXED"}); sum.appendChild(k); fill(k);
      tx(lbl,"Medium",12,L.txt3,k); tx(val,"Bold",22,col,k);
    }
    const fb=fr("Filter",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:10,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(fb); fill(fb);
    const si=fr("",{fill:L.surf,stroke:L.border,r:8,lay:"HORIZONTAL",cAl:"CENTER",gap:8,p:[10,14,10,14],pSz:"FIXED",cSz:"AUTO"}); si.resize(240,10);
    rc(14,14,L.muted,2,si); tx("Search orders...","Regular",14,L.muted,si); fb.appendChild(si); sp(fb);
    const ab=fr("",{fill:L.primary,r:8,lay:"HORIZONTAL",p:[10,16,10,16],pSz:"AUTO",cSz:"AUTO"});
    tx("Export CSV","Semi Bold",14,"#FFFFFF",ab); fb.appendChild(ab);
    tableCard(c,L,["Order ID","Customer","Product","Amount","Status","Date"],[
      ["#ORD-4821","Olivia Rhye","Analytics Pro",{badge:"Completed",color:L.success},"$49.00","Jan 15"],
      ["#ORD-4820","Phoenix Baker","Dashboard Kit",{badge:"Pending",color:L.warn},"$89.00","Jan 15"],
      ["#ORD-4819","Lana Steiner","Nova Icons",{badge:"Completed",color:L.success},"$29.00","Jan 14"],
      ["#ORD-4818","Demi Wilkinson","CRM Template",{badge:"Cancelled",color:L.error},"$149.00","Jan 14"],
      ["#ORD-4817","Candice Wu","Form Builder",{badge:"Completed",color:L.success},"$39.00","Jan 13"],
      ["#ORD-4816","Drew Cano","Analytics Pro",{badge:"Processing",color:L.info},"$49.00","Jan 13"],
    ]);
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 9 — Messages / Inbox
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Messages — Inbox", L, "Messages");
    c.layoutMode="HORIZONTAL"; c.itemSpacing=0;
    c.paddingLeft=0; c.paddingRight=0; c.paddingTop=0; c.paddingBottom=0;

    const tl=fr("Threads",{fill:L.surf,stroke:L.border,lay:"VERTICAL",gap:0,pSz:"FIXED",cSz:"FIXED"}); tl.resize(320,720); c.appendChild(tl);
    const tlh=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",p:[14,16,14,16],pSz:"FIXED",cSz:"AUTO"});
    tx("Inbox","Semi Bold",16,L.txt,tlh); sp(tlh);
    const nm=fr("",{fill:L.primary,r:999,lay:"HORIZONTAL",p:[2,7,2,7],pSz:"AUTO",cSz:"AUTO"}); tx("12","Medium",11,"#FFFFFF",nm); tlh.appendChild(nm);
    tl.appendChild(tlh); fill(tlh);
    for (const [i,msg] of [
      {from:"Sarah Chen",preview:"Hey! Can you review the new design...",time:"10:32 AM",unread:true},
      {from:"Alex Morgan",preview:"The client loved the presentation!",time:"9:15 AM",unread:true},
      {from:"Team Nova",preview:"Weekly sync in 30 minutes",time:"Yesterday",unread:false},
      {from:"Jordan Lee",preview:"I updated the component variants...",time:"Yesterday",unread:false},
      {from:"Design Team",preview:"Q1 OKRs review document shared",time:"Mon",unread:false},
      {from:"Mike Torres",preview:"Invoice #1284 has been paid",time:"Mon",unread:false},
    ].entries()) {
      rc(288,1,L.border2,0,tl).layoutSizingHorizontal="FILL";
      const tr2=fr("",{fill:i===0?L.primarySoft:L.surf,lay:"HORIZONTAL",cAl:"CENTER",gap:10,p:[12,16,12,16],pSz:"FIXED",cSz:"AUTO"}); fill(tr2);
      el(36,36,i===0?L.primary:L.primarySoft,tr2);
      const ti=fr("",{fill:null,lay:"VERTICAL",gap:3,pSz:"AUTO",cSz:"AUTO"});
      const nh=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",pSz:"FIXED",cSz:"AUTO"}); fill(nh);
      tx(msg.from,"Semi Bold",13,L.txt,nh); sp(nh); tx(msg.time,"Regular",11,L.txt3,nh); ti.appendChild(nh); fill(nh);
      tx(msg.preview,"Regular",12,L.txt3,ti); tr2.appendChild(ti); fill(ti); tl.appendChild(tr2);
    }

    const cv=fr("Chat",{fill:L.bg,lay:"VERTICAL",gap:0,pSz:"FIXED",cSz:"FIXED"}); cv.resize(820,720); c.appendChild(cv);
    const ch=fr("ChatHeader",{fill:L.surf,stroke:L.border,lay:"HORIZONTAL",cAl:"CENTER",gap:12,p:[14,20,14,20],pSz:"FIXED",cSz:"AUTO"}); fill(ch);
    el(36,36,L.primary,ch);
    const chi=fr("",{fill:null,lay:"VERTICAL",gap:2,pSz:"AUTO",cSz:"AUTO"});
    tx("Sarah Chen","Semi Bold",15,L.txt,chi); tx("Product Designer · Online","Regular",12,L.success,chi); ch.appendChild(chi); fill(chi); cv.appendChild(ch);
    const mb=fr("Messages",{fill:null,lay:"VERTICAL",gap:10,p:[16,16,16,16],pSz:"AUTO",cSz:"FIXED"}); fill(mb); cv.appendChild(mb);
    for (const {text,mine} of [
      {text:"Hey! Can you review the new design proposals I sent?",mine:false},
      {text:"Sure! Just opened them. The color palette looks great 🎨",mine:true},
      {text:"Thanks! I was going for a more premium feel. What do you think about the typography?",mine:false},
      {text:"Inter is always a solid choice. The sizing hierarchy is clean.",mine:true},
    ]) {
      const mw=fr("",{fill:null,lay:"HORIZONTAL",pAl:mine?"MAX":"MIN",pSz:"FIXED",cSz:"AUTO"}); fill(mw);
      const bbl=fr("",{fill:mine?L.primary:L.surf,stroke:mine?null:L.border,r:12,lay:"HORIZONTAL",p:[10,14,10,14],pSz:"AUTO",cSz:"AUTO"});
      tx(text,"Regular",14,mine?"#FFFFFF":L.txt,bbl); mw.appendChild(bbl); mb.appendChild(mw);
    }
    const inp=fr("Input",{fill:L.surf,stroke:L.border,lay:"HORIZONTAL",cAl:"CENTER",gap:10,p:[12,16,12,16],pSz:"FIXED",cSz:"AUTO"}); fill(inp);
    tx("Type a message...","Regular",14,L.muted,inp); sp(inp);
    const sb2=fr("",{fill:L.primary,r:8,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",pSz:"FIXED",cSz:"FIXED"}); sb2.resize(36,36); rc(16,16,"#FFFFFF",3,sb2); inp.appendChild(sb2); cv.appendChild(inp);
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 10 — Calendar
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Calendar — Schedule", L, "Calendar");
    const top2=fr("CalTop",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:10,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(top2); fill(top2);
    const navBtns=fr("",{fill:null,lay:"HORIZONTAL",gap:6,pSz:"AUTO",cSz:"AUTO"});
    for (const lbl of ["←","→"]) { const b=fr("",{fill:L.surf,stroke:L.border,r:8,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",pSz:"FIXED",cSz:"FIXED"}); b.resize(34,34); tx(lbl,"Medium",14,L.txt,b); navBtns.appendChild(b); }
    top2.appendChild(navBtns); tx("January 2026","Semi Bold",18,L.txt,top2); sp(top2);
    for (const v of ["Month","Week","Day"]) { const b=fr("",{fill:v==="Month"?L.primarySoft:L.surf,stroke:v==="Month"?null:L.border,r:8,lay:"HORIZONTAL",p:[8,14,8,14],pSz:"AUTO",cSz:"AUTO"}); tx(v,"Medium",13,v==="Month"?L.primary:L.txt2,b); top2.appendChild(b); }
    const ab3=fr("",{fill:L.primary,r:8,lay:"HORIZONTAL",p:[9,14,9,14],pSz:"AUTO",cSz:"AUTO"}); tx("+ New Event","Semi Bold",14,"#FFFFFF",ab3); top2.appendChild(ab3);
    const cal=fr("Cal",{fill:L.surf,stroke:L.border,r:12,sh:0.04,lay:"VERTICAL",gap:0,pSz:"AUTO",cSz:"FIXED"}); c.appendChild(cal); fill(cal);
    const dh=fr("Days",{fill:L.surf2,lay:"HORIZONTAL",pSz:"FIXED",cSz:"AUTO"}); fill(dh);
    for (const d of ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]) {
      const dc2=fr("",{fill:null,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",pSz:"FIXED",cSz:"FIXED"}); dc2.resize(163,36); tx(d,"Medium",12,L.txt3,dc2); dh.appendChild(dc2);
    }
    cal.appendChild(dh);
    const events={4:[{text:"Team Standup",color:L.primary}],10:[{text:"Design Review",color:L.info}],15:[{text:"Client Call",color:L.success},{text:"Sprint Planning",color:L.warn}],20:[{text:"Product Launch",color:L.error}],22:[{text:"All Hands",color:L.primary}]};
    for (const week of [[1,2,3,4,5,6,7],[8,9,10,11,12,13,14],[15,16,17,18,19,20,21],[22,23,24,25,26,27,28],[29,30,31,1,2,3,4]]) {
      const wr=fr("Week",{fill:null,lay:"HORIZONTAL",pSz:"FIXED",cSz:"FIXED"}); wr.resize(1141,104); cal.appendChild(wr);
      for (const d of week) {
        const dc3=fr("",{fill:d===15?L.primarySoft:null,lay:"VERTICAL",gap:4,p:[8,8,6,8],pSz:"FIXED",cSz:"FIXED",stroke:L.border2,sw:0.5}); dc3.resize(163,104); wr.appendChild(dc3);
        tx(String(d),"Semi Bold",13,d===15?L.primary:L.txt,dc3);
        for (const ev of (events[d]||[])) {
          const eb2=fr("",{fill:ev.color+"18",r:4,lay:"HORIZONTAL",p:[3,6,3,6],pSz:"AUTO",cSz:"AUTO"}); tx(ev.text,"Medium",11,ev.color,eb2); dc3.appendChild(eb2); fill(eb2);
        }
      }
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 11 — Kanban Board
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Projects — Kanban Board", L, "Reports");
    const top3=fr("Top",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:10,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(top3); fill(top3);
    tx("Q1 Product Roadmap","Semi Bold",18,L.txt,top3); sp(top3);
    const ab4=fr("",{fill:L.primary,r:8,lay:"HORIZONTAL",p:[9,14,9,14],pSz:"AUTO",cSz:"AUTO"}); tx("+ Add Task","Semi Bold",14,"#FFFFFF",ab4); top3.appendChild(ab4);
    const board=fr("Board",{fill:null,lay:"HORIZONTAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(board); fill(board);
    for (const {title,color,cards} of [
      {title:"Backlog",color:L.muted,cards:["Research user segments","Define metrics framework","Competitive analysis"]},
      {title:"In Progress",color:L.info,cards:["Dashboard redesign","API integration","Component library"]},
      {title:"In Review",color:L.warn,cards:["Settings page v2","Onboarding flow","Mobile responsiveness"]},
      {title:"Done",color:L.success,cards:["Auth screens","Style guide","Design tokens"]},
    ]) {
      const kc=fr(title,{fill:L.surf2,r:12,lay:"VERTICAL",gap:10,p:[14,14,14,14],pSz:"AUTO",cSz:"FIXED"}); kc.resize(276,10); board.appendChild(kc);
      const ch2=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:8,pSz:"AUTO",cSz:"AUTO"}); fill(ch2);
      el(8,8,color,ch2); tx(title,"Semi Bold",14,L.txt,ch2); sp(ch2);
      const cnt=fr("",{fill:L.surf,stroke:L.border,r:999,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",p:[2,7,2,7],pSz:"AUTO",cSz:"AUTO"});
      tx(String(cards.length),"Medium",11,L.txt3,cnt); ch2.appendChild(cnt); kc.appendChild(ch2);
      for (const card of cards) {
        const kd=fr(card,{fill:L.surf,stroke:L.border,r:8,sh:0.03,lay:"VERTICAL",gap:10,p:[12,12,12,12],pSz:"AUTO",cSz:"FIXED"}); fill(kd); kc.appendChild(kd);
        tx(card,"Medium",13,L.txt,kd);
        const meta=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:6,pSz:"AUTO",cSz:"AUTO"}); fill(meta);
        const prio=fr("",{fill:L.primarySoft,r:4,lay:"HORIZONTAL",p:[2,6,2,6],pSz:"AUTO",cSz:"AUTO"}); tx("High","Medium",11,L.primary,prio); meta.appendChild(prio); sp(meta);
        for (let i=0;i<2;i++) { const a2=el(20,20,L.primary); a2.opacity=0.6+i*0.2; meta.appendChild(a2); }
        kd.appendChild(meta);
      }
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 12 — Settings — Profile
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Settings — Profile", L, "Settings");
    const row=fr("Row",{fill:null,lay:"HORIZONTAL",gap:24,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(row); fill(row);
    const sn=fr("SettingsNav",{fill:L.surf,stroke:L.border,r:12,lay:"VERTICAL",gap:2,p:[12,12,12,12],pSz:"AUTO",cSz:"FIXED"}); sn.resize(220,10); row.appendChild(sn);
    for (const [lbl,a] of [["Profile",true],["Account",false],["Notifications",false],["Security",false],["Billing",false],["Integrations",false],["API Keys",false]]) {
      const item=fr("",{fill:a?L.primarySoft:null,r:8,lay:"HORIZONTAL",cAl:"CENTER",gap:10,p:[9,12,9,12],pSz:"AUTO",cSz:"AUTO"}); fill(item);
      tx(lbl,a?"Semi Bold":"Medium",14,a?L.primary:L.txt2,item); sn.appendChild(item);
    }
    const form=fr("Form",{fill:L.surf,stroke:L.border,r:12,sh:0.04,lay:"VERTICAL",gap:20,p:[28,28,28,28],pSz:"AUTO",cSz:"FIXED"}); row.appendChild(form); fill(form);
    tx("Profile Information","Semi Bold",18,L.txt,form);
    tx("Update your name, photo and personal details.","Regular",14,L.txt3,form);
    rc(10,1,L.border,0,form).layoutSizingHorizontal="FILL";
    const avrow=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:16,pSz:"AUTO",cSz:"AUTO"}); fill(avrow);
    el(72,72,L.primary,avrow);
    const avbts=fr("",{fill:null,lay:"VERTICAL",gap:8,pSz:"AUTO",cSz:"AUTO"});
    const ub=fr("",{fill:L.surf,stroke:L.primary,r:8,lay:"HORIZONTAL",p:[9,16,9,16],pSz:"AUTO",cSz:"AUTO"}); tx("Change photo","Medium",14,L.primary,ub); avbts.appendChild(ub);
    const rb=fr("",{fill:null,stroke:L.border,r:8,lay:"HORIZONTAL",p:[9,16,9,16],pSz:"AUTO",cSz:"AUTO"}); tx("Remove","Medium",14,L.error,rb); avbts.appendChild(rb);
    avrow.appendChild(avbts); form.appendChild(avrow);
    const grid2=fr("",{fill:null,lay:"HORIZONTAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); fill(grid2);
    const left=fr("",{fill:null,lay:"VERTICAL",gap:14,pSz:"AUTO",cSz:"FIXED"}); fill(left); grid2.appendChild(left);
    const right2=fr("",{fill:null,lay:"VERTICAL",gap:14,pSz:"AUTO",cSz:"FIXED"}); fill(right2); grid2.appendChild(right2);
    for (const [lbl,val] of [["First Name","Dang"],["Job Title","Product Designer"],["Company","Nova Studio"]]) field(left,lbl,val,L);
    for (const [lbl,val] of [["Last Name","Pham"],["Email Address","dang@nova.studio"],["Website","https://nova.studio"]]) field(right2,lbl,val,L);
    form.appendChild(grid2);
    const acts=fr("",{fill:null,lay:"HORIZONTAL",gap:10,pAl:"MAX",pSz:"FIXED",cSz:"AUTO"}); fill(acts);
    const can=fr("",{fill:null,stroke:L.border,r:8,lay:"HORIZONTAL",p:[10,18,10,18],pSz:"AUTO",cSz:"AUTO"}); tx("Cancel","Medium",14,L.txt2,can); acts.appendChild(can);
    const sv=fr("",{fill:L.primary,r:8,lay:"HORIZONTAL",p:[10,18,10,18],pSz:"AUTO",cSz:"AUTO"}); tx("Save Changes","Semi Bold",14,"#FFFFFF",sv); acts.appendChild(sv);
    form.appendChild(acts);
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 13 — Settings — Billing (Dark)
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Settings — Billing (Dark)", D, "Settings");
    const row=fr("Row",{fill:null,lay:"HORIZONTAL",gap:24,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(row); fill(row);
    const sn=fr("SettingsNav",{fill:D.surf,stroke:D.border,r:12,lay:"VERTICAL",gap:2,p:[12,12,12,12],pSz:"AUTO",cSz:"FIXED"}); sn.resize(220,10); row.appendChild(sn);
    for (const [lbl,a] of [["Profile",false],["Account",false],["Notifications",false],["Security",false],["Billing",true],["Integrations",false]]) {
      const item=fr("",{fill:a?D.primarySoft:null,r:8,lay:"HORIZONTAL",cAl:"CENTER",gap:10,p:[9,12,9,12],pSz:"AUTO",cSz:"AUTO"}); fill(item);
      tx(lbl,a?"Semi Bold":"Medium",14,a?D.primary:D.txt2,item); sn.appendChild(item);
    }
    const content2=fr("Content",{fill:null,lay:"VERTICAL",gap:16,pSz:"AUTO",cSz:"FIXED"}); row.appendChild(content2); fill(content2);
    const plan=fr("Plan",{fill:D.surf,stroke:D.border,r:12,sh:0.08,lay:"VERTICAL",gap:16,p:[24,24,24,24],pSz:"AUTO",cSz:"FIXED"}); content2.appendChild(plan); fill(plan);
    tx("Current Plan","Semi Bold",16,D.txt,plan);
    const pinfo=fr("",{fill:D.primarySoft,r:12,lay:"HORIZONTAL",cAl:"CENTER",gap:16,p:[16,20,16,20],pSz:"FIXED",cSz:"AUTO"}); fill(pinfo);
    const pl=fr("",{fill:null,lay:"VERTICAL",gap:4,pSz:"AUTO",cSz:"AUTO"});
    tx("Pro Plan","Bold",18,D.primary,pl); tx("$49 / month · Billed annually","Regular",13,D.txt3,pl); pinfo.appendChild(pl); fill(pl); sp(pinfo);
    const up=fr("",{fill:D.primary,r:8,lay:"HORIZONTAL",p:[9,16,9,16],pSz:"AUTO",cSz:"AUTO"}); tx("Upgrade","Semi Bold",13,"#FFFFFF",up); pinfo.appendChild(up); plan.appendChild(pinfo);
    const inv=fr("Invoices",{fill:D.surf,stroke:D.border,r:12,lay:"VERTICAL",gap:0,pSz:"AUTO",cSz:"FIXED"}); content2.appendChild(inv); fill(inv);
    const ih=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",p:[14,20,14,20],pSz:"FIXED",cSz:"AUTO"}); fill(ih);
    tx("Invoice History","Semi Bold",15,D.txt,ih); sp(ih); tx("Download All","Medium",13,D.primary,ih); inv.appendChild(ih);
    for (const [date,amt] of [["Jan 1, 2026","$49.00"],["Dec 1, 2025","$49.00"],["Nov 1, 2025","$49.00"],["Oct 1, 2025","$49.00"]]) {
      rc(10,1,D.border2,0,inv).layoutSizingHorizontal="FILL";
      const row2=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",p:[12,20,12,20],pSz:"FIXED",cSz:"AUTO"}); fill(row2);
      tx(date,"Regular",14,D.txt,row2); sp(row2); tx(amt,"Medium",14,D.txt,row2);
      const sb3=fr("",{fill:D.successSoft,r:999,lay:"HORIZONTAL",p:[3,8,3,8],pSz:"AUTO",cSz:"AUTO"}); tx("Paid","Medium",12,D.success,sb3); row2.appendChild(sb3);
      const dl=fr("",{fill:null,stroke:D.border,r:6,lay:"HORIZONTAL",p:[6,12,6,12],pSz:"AUTO",cSz:"AUTO"}); tx("PDF","Medium",12,D.txt2,dl); row2.appendChild(dl);
      inv.appendChild(row2);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 14 — Notifications Center
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Notifications — Center", L, "Dashboard");
    const top4=fr("Top",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",pSz:"FIXED",cSz:"AUTO"}); c.appendChild(top4); fill(top4);
    tx("Notifications","Semi Bold",18,L.txt,top4); sp(top4);
    const mrb=fr("",{fill:null,stroke:L.border,r:8,lay:"HORIZONTAL",p:[9,14,9,14],pSz:"AUTO",cSz:"AUTO"}); tx("Mark all read","Medium",14,L.txt2,mrb); top4.appendChild(mrb);
    const tabs=fr("Tabs",{fill:null,lay:"HORIZONTAL",gap:4,pSz:"AUTO",cSz:"AUTO"}); c.appendChild(tabs);
    for (const [t,a] of [["All",true],["Unread",false],["Mentions",false],["System",false]]) {
      const tb=fr("",{fill:a?L.primarySoft:null,r:8,lay:"HORIZONTAL",p:[9,16,9,16],pSz:"AUTO",cSz:"AUTO"});
      tx(t,"Medium",14,a?L.primary:L.txt2,tb); tabs.appendChild(tb);
    }
    const nl=fr("List",{fill:L.surf,stroke:L.border,r:12,lay:"VERTICAL",gap:0,pSz:"AUTO",cSz:"FIXED"}); c.appendChild(nl); fill(nl);
    for (const [i,n] of [
      {icon:L.primary,title:"New team member added",body:"Sarah Chen joined the Design team",time:"2 minutes ago",unread:true},
      {icon:L.success,title:"Payment received",body:"Invoice #1284 for $2,400 has been paid",time:"15 minutes ago",unread:true},
      {icon:L.info,title:"Design review scheduled",body:"Q1 product review on Jan 20 at 2:00 PM",time:"1 hour ago",unread:true},
      {icon:L.warn,title:"Storage limit warning",body:"You're using 85% of your storage quota",time:"3 hours ago",unread:false},
      {icon:L.error,title:"Deploy failed",body:"Production deploy failed at 09:42 AM",time:"5 hours ago",unread:false},
      {icon:L.primary,title:"New comment on Dashboard",body:"Phoenix left a comment on your design",time:"Yesterday",unread:false},
      {icon:L.success,title:"Subscription renewed",body:"Pro plan renewed for another month",time:"Jan 1, 2026",unread:false},
    ].entries()) {
      if(i>0) rc(10,1,L.border2,0,nl).layoutSizingHorizontal="FILL";
      const row=fr("",{fill:n.unread?L.primarySoft+"55":L.surf,lay:"HORIZONTAL",cAl:"CENTER",gap:14,p:[14,20,14,20],pSz:"FIXED",cSz:"AUTO"}); fill(row);
      const ud=fr("",{fill:null,pSz:"FIXED",cSz:"FIXED"}); ud.resize(8,8); if(n.unread){ud.fills=[{type:"SOLID",color:hex(L.primary)}]; ud.cornerRadius=999;} row.appendChild(ud);
      const nic=fr("",{fill:n.icon+"18",r:999,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",pSz:"FIXED",cSz:"FIXED"}); nic.resize(40,40); rc(18,18,n.icon,3,nic); row.appendChild(nic);
      const info=fr("",{fill:null,lay:"VERTICAL",gap:3,pSz:"AUTO",cSz:"AUTO"});
      tx(n.title,"Semi Bold",14,L.txt,info); tx(n.body,"Regular",13,L.txt3,info); row.appendChild(info); fill(info);
      tx(n.time,"Regular",12,L.muted,row); nl.appendChild(row);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 15 — Reports
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Reports — Overview", L, "Reports");
    const top5=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",pSz:"FIXED",cSz:"AUTO"}); c.appendChild(top5); fill(top5);
    tx("Business Reports","Semi Bold",20,L.txt,top5); sp(top5);
    const sel=fr("",{fill:L.surf,stroke:L.border,r:8,lay:"HORIZONTAL",cAl:"CENTER",p:[9,14,9,14],gap:6,pSz:"AUTO",cSz:"AUTO"});
    tx("Last 30 days ▾","Medium",14,L.txt2,sel); top5.appendChild(sel);
    const ex=fr("",{fill:L.primary,r:8,lay:"HORIZONTAL",p:[9,16,9,16],pSz:"AUTO",cSz:"AUTO"});
    tx("Export PDF","Semi Bold",14,"#FFFFFF",ex); top5.appendChild(ex);
    const kpis=fr("",{fill:null,lay:"HORIZONTAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(kpis); fill(kpis);
    for (const [lbl,val,ch,up] of [["Gross Revenue","$248,920","+24.1%",true],["Net Profit","$89,210","+18.3%",true],["Expenses","$159,710","+11.2%",false],["EBITDA","$102,500","+29.4%",true]]) {
      const k=fr(lbl,{fill:L.surf,stroke:L.border,r:12,sh:0.04,lay:"VERTICAL",gap:8,p:[18,20,18,20],pSz:"AUTO",cSz:"FIXED"}); kpis.appendChild(k); fill(k);
      tx(lbl,"Medium",12,L.txt3,k); tx(val,"Bold",24,L.txt,k);
      const row=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:6,pSz:"AUTO",cSz:"AUTO"});
      const b=fr("",{fill:up?L.successSoft:L.errorSoft,r:999,lay:"HORIZONTAL",p:[2,6,2,6],pSz:"AUTO",cSz:"AUTO"}); tx(ch,"Medium",11,up?L.success:L.error,b); row.appendChild(b);
      tx("vs last period","Regular",11,L.txt3,row); k.appendChild(row);
    }
    const cols2=fr("",{fill:null,lay:"HORIZONTAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(cols2); fill(cols2);
    barChart(cols2,"Monthly Revenue","Jan–Dec 2025",L,[140,160,130,190,170,150,210,180,200,165,230,260]);
    const rt=fr("Revenue Breakdown",{fill:L.surf,stroke:L.border,r:12,lay:"VERTICAL",gap:0,pSz:"AUTO",cSz:"FIXED"}); rt.resize(380,10); cols2.appendChild(rt);
    const rth=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",p:[14,18,14,18],pSz:"FIXED",cSz:"AUTO"});
    tx("Revenue Breakdown","Semi Bold",14,L.txt,rth); fill(rth); rt.appendChild(rth);
    for (const [cat,val,pct,col] of [["Subscriptions","$148,200","59%",L.primary],["One-time Sales","$62,350","25%",L.info],["Consulting","$25,120","10%",L.success],["Other","$13,250","6%",L.warn]]) {
      rc(10,1,L.border2,0,rt).layoutSizingHorizontal="FILL";
      const row=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:10,p:[12,18,12,18],pSz:"FIXED",cSz:"AUTO"}); fill(row);
      el(10,10,col,row); tx(cat,"Regular",13,L.txt,row); fill(row); tx(val,"Semi Bold",13,L.txt,row); tx(pct,"Regular",12,L.txt3,row);
      rt.appendChild(row);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 16 — Auth — Login
  // ══════════════════════════════════════════════════════════════
  {
    const s=fr("Auth — Login",{fill:L.bg,lay:"HORIZONTAL",pSz:"FIXED",cSz:"FIXED"}); s.resize(1440,900); s.x=X; s.y=0; X+=1440+GAP;
    const lp=fr("Brand",{fill:L.primary,lay:"VERTICAL",pAl:"CENTER",cAl:"CENTER",gap:24,p:[60,60,60,60],pSz:"FIXED",cSz:"FIXED"}); lp.resize(580,900);
    const lm2=fr("",{fill:"#FFFFFF",r:12}); lm2.resize(48,48); lp.appendChild(lm2);
    const lt=tx("Nova","Bold",42,"#FFFFFF",lp); lt.textAlignHorizontal="CENTER";
    const tagline=tx("The modern dashboard\nfor ambitious teams","Light",22,"#FFFFFF",lp); tagline.textAlignHorizontal="CENTER"; tagline.opacity=0.85; tagline.lineHeight={value:32,unit:"PIXELS"};
    const test=fr("",{fill:"#FFFFFF",r:16,lay:"VERTICAL",gap:10,p:[20,22,20,22],pSz:"FIXED",cSz:"AUTO"}); test.resize(440,10); test.opacity=0.15; lp.appendChild(test);
    tx("\"Nova transformed how our team works. Analytics are incredible.\"","Regular",15,"#FFFFFF",test);
    const ta=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:10,pSz:"AUTO",cSz:"AUTO"});
    el(32,32,"#FFFFFF",ta); const ti=fr("",{fill:null,lay:"VERTICAL",gap:2,pSz:"AUTO",cSz:"AUTO"}); tx("Sarah Chen","Medium",13,"#FFFFFF",ti); tx("CEO, TechVenture","Regular",12,"#FFFFFF",ti); ti.opacity=0.7; ta.appendChild(ti); test.appendChild(ta);
    s.appendChild(lp);
    const rp=fr("Form Panel",{fill:"#FFFFFF",lay:"VERTICAL",pAl:"CENTER",cAl:"CENTER",pSz:"FIXED",cSz:"FIXED"}); rp.resize(860,900); s.appendChild(rp);
    const form=fr("Form",{fill:null,lay:"VERTICAL",gap:20,pSz:"FIXED",cSz:"AUTO"}); form.resize(380,10); rp.appendChild(form);
    tx("Welcome back","Bold",30,L.txt,form); tx("Sign in to your account","Regular",16,L.txt3,form);
    const social=fr("",{fill:null,lay:"HORIZONTAL",gap:10,pSz:"AUTO",cSz:"AUTO"}); fill(social);
    for (const provider of ["Google","GitHub"]) {
      const b=fr("",{fill:null,stroke:L.border,r:8,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",p:[11,16,11,16],gap:8,pSz:"AUTO",cSz:"AUTO"}); fill(b);
      rc(18,18,L.txt3,2,b); tx(`Continue with ${provider}`,"Medium",14,L.txt,b); social.appendChild(b);
    }
    form.appendChild(social);
    const divider=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:12,pSz:"FIXED",cSz:"AUTO"}); fill(divider);
    rc(10,1,L.border,0,divider).layoutSizingHorizontal="FILL"; tx("or","Regular",13,L.muted,divider); rc(10,1,L.border,0,divider).layoutSizingHorizontal="FILL";
    form.appendChild(divider);
    for (const [lbl,ph] of [["Email","name@company.com"],["Password","••••••••••"]]) {
      const fg=fr("",{fill:null,lay:"VERTICAL",gap:6,pSz:"AUTO",cSz:"FIXED"}); fill(fg);
      const lrow=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",pSz:"FIXED",cSz:"AUTO"}); fill(lrow);
      tx(lbl,"Medium",14,L.txt2,lrow); if(lbl==="Password"){ sp(lrow); tx("Forgot password?","Medium",13,L.primary,lrow); }
      fg.appendChild(lrow);
      const inp=fr("",{fill:L.surf,stroke:L.border,r:8,lay:"HORIZONTAL",cAl:"CENTER",p:[11,14,11,14],pSz:"FIXED",cSz:"AUTO"}); tx(ph,"Regular",14,L.muted,inp); fg.appendChild(inp); fill(inp);
      form.appendChild(fg);
    }
    const sb4=fr("",{fill:L.primary,r:8,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",p:[12,0,12,0],pSz:"FIXED",cSz:"AUTO"}); fill(sb4); tx("Sign in","Semi Bold",15,"#FFFFFF",sb4); form.appendChild(sb4);
    tx("Don't have an account? Sign up →","Regular",14,L.txt3,form).textAlignHorizontal="CENTER";
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 17 — Auth — Register
  // ══════════════════════════════════════════════════════════════
  {
    const s=fr("Auth — Register",{fill:L.bg,lay:"HORIZONTAL",pSz:"FIXED",cSz:"FIXED"}); s.resize(1440,900); s.x=X; s.y=0; X+=1440+GAP;
    const lp=fr("Brand",{fill:"#0F172A",lay:"VERTICAL",pAl:"CENTER",cAl:"CENTER",gap:24,p:[60,60,60,60],pSz:"FIXED",cSz:"FIXED"}); lp.resize(580,900);
    const lm3=fr("",{fill:L.primary,r:12}); lm3.resize(48,48); lp.appendChild(lm3);
    tx("Start your free trial","Bold",36,"#F8FAFC",lp).textAlignHorizontal="CENTER";
    tx("Join 5,000+ teams building with Nova","Regular",18,"#94A3B8",lp).textAlignHorizontal="CENTER";
    for (const f of ["No credit card required","14-day free trial","Cancel anytime"]) {
      const fi=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:8,pSz:"AUTO",cSz:"AUTO"});
      const ck=fr("",{fill:L.success,r:999,pSz:"FIXED",cSz:"FIXED"}); ck.resize(16,16); fi.appendChild(ck); tx(f,"Regular",15,"#CBD5E1",fi); lp.appendChild(fi);
    }
    s.appendChild(lp);
    const rp=fr("Form Panel",{fill:"#FFFFFF",lay:"VERTICAL",pAl:"CENTER",cAl:"CENTER",pSz:"FIXED",cSz:"FIXED"}); rp.resize(860,900); s.appendChild(rp);
    const form=fr("Form",{fill:null,lay:"VERTICAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); form.resize(420,10); rp.appendChild(form);
    tx("Create your account","Bold",28,L.txt,form); tx("Get started in less than 2 minutes","Regular",15,L.txt3,form);
    const nr=fr("",{fill:null,lay:"HORIZONTAL",gap:12,pSz:"FIXED",cSz:"AUTO"}); fill(nr);
    for (const [lbl,ph] of [["First name","John"],["Last name","Smith"]]) {
      const fg=fr("",{fill:null,lay:"VERTICAL",gap:6,pSz:"AUTO",cSz:"FIXED"}); fill(fg); tx(lbl,"Medium",13,L.txt2,fg);
      const inp=fr("",{fill:L.surf,stroke:L.border,r:8,lay:"HORIZONTAL",cAl:"CENTER",p:[10,14,10,14],pSz:"FIXED",cSz:"AUTO"}); tx(ph,"Regular",14,L.muted,inp); fill(inp); fg.appendChild(inp); nr.appendChild(fg);
    }
    form.appendChild(nr);
    for (const [lbl,ph] of [["Work email","name@company.com"],["Password","8+ characters"],["Company (optional)","Your company name"]]) field(form,lbl,ph,L);
    const sb5=fr("",{fill:L.primary,r:8,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",p:[12,0,12,0],pSz:"FIXED",cSz:"AUTO"}); fill(sb5); tx("Create account","Semi Bold",15,"#FFFFFF",sb5); form.appendChild(sb5);
    tx("Already have an account? Sign in","Regular",13,L.txt3,form).textAlignHorizontal="CENTER";
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 18 — Onboarding
  // ══════════════════════════════════════════════════════════════
  {
    const s=fr("Onboarding — Setup",{fill:L.bg,lay:"HORIZONTAL",pSz:"FIXED",cSz:"FIXED"}); s.resize(1440,900); s.x=X; s.y=0; X+=1440+GAP;
    const ps=fr("Progress",{fill:"#0F172A",lay:"VERTICAL",gap:0,p:[40,40,40,40],pSz:"FIXED",cSz:"FIXED"}); ps.resize(380,900); s.appendChild(ps);
    const lm4=fr("",{fill:L.primary,r:10}); lm4.resize(36,36); ps.appendChild(lm4);
    tx("Nova","Bold",22,"#F8FAFC",ps);
    const psteps=fr("",{fill:null,lay:"VERTICAL",gap:0,p:[24,0,0,0],pSz:"AUTO",cSz:"AUTO"});
    for (const [i,step] of [["Create account"],["Set up workspace"],["Invite team"],["Import data"],["You're all set!"]].entries()) {
      const sd=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:14,p:[12,0,12,0],pSz:"AUTO",cSz:"AUTO"});
      const num=fr("",{fill:i<2?L.primary:i===2?"#1E293B":null,stroke:i>=2?"#334155":null,r:999,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",pSz:"FIXED",cSz:"FIXED"}); num.resize(28,28);
      tx(i<2?"✓":String(i+1),"Medium",12,i<2?"#FFFFFF":i===2?L.primary:"#94A3B8",num); sd.appendChild(num);
      tx(step[0],"Medium",14,i===2?"#F8FAFC":"#64748B",sd); psteps.appendChild(sd);
    }
    ps.appendChild(psteps);
    const mc=fr("Main",{fill:"#FFFFFF",lay:"VERTICAL",pAl:"CENTER",cAl:"CENTER",pSz:"FIXED",cSz:"FIXED"}); mc.resize(1060,900); s.appendChild(mc);
    const content3=fr("",{fill:null,lay:"VERTICAL",gap:24,pSz:"FIXED",cSz:"AUTO"}); content3.resize(560,10); mc.appendChild(content3);
    const prog=fr("",{fill:L.surf2,r:999,pSz:"FIXED",cSz:"FIXED"}); prog.resize(560,6); content3.appendChild(prog);
    const progFill=fr("",{fill:L.primary,r:999,pSz:"FIXED",cSz:"FIXED"}); progFill.resize(168,6); prog.appendChild(progFill);
    tx("Set up your workspace","Bold",28,L.txt,content3);
    tx("Choose a name and customize how your team will use Nova","Regular",16,L.txt3,content3);
    field(content3,"Workspace name","Acme Corporation",L);
    field(content3,"Workspace URL","acme.nova.app",L);
    tx("Team size","Medium",13,L.txt2,content3);
    const sizes=fr("",{fill:null,lay:"HORIZONTAL",gap:8,pSz:"AUTO",cSz:"AUTO"});
    for (const s2 of ["1–5","6–20","21–50","51–200","200+"]) {
      const b=fr("",{fill:s2==="6–20"?L.primarySoft:L.surf,stroke:s2==="6–20"?L.primary:L.border,r:8,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",p:[9,14,9,14],pSz:"AUTO",cSz:"AUTO"});
      tx(s2,"Medium",13,s2==="6–20"?L.primary:L.txt2,b); sizes.appendChild(b);
    }
    content3.appendChild(sizes);
    const acts=fr("",{fill:null,lay:"HORIZONTAL",gap:12,pAl:"MAX",pSz:"FIXED",cSz:"AUTO"}); fill(acts);
    const back=fr("",{fill:null,stroke:L.border,r:8,lay:"HORIZONTAL",p:[11,20,11,20],pSz:"AUTO",cSz:"AUTO"}); tx("← Back","Medium",14,L.txt2,back); acts.appendChild(back);
    const cont=fr("",{fill:L.primary,r:8,lay:"HORIZONTAL",p:[11,20,11,20],pSz:"AUTO",cSz:"AUTO"}); tx("Continue →","Semi Bold",14,"#FFFFFF",cont); acts.appendChild(cont);
    content3.appendChild(acts);
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 19 — Empty States
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("Empty States — Reference", L, "Dashboard");
    const grid3=fr("Grid",{fill:null,lay:"HORIZONTAL",gap:20,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(grid3); fill(grid3);
    for (const {title,body,action,icon} of [
      {title:"No results found",body:"Try adjusting your search or filters to find what you're looking for",action:"Clear filters",icon:L.muted},
      {title:"No notifications yet",body:"You're all caught up! New notifications will appear here",action:"Go to Dashboard",icon:L.primary},
      {title:"No team members",body:"Invite your team to start collaborating on Nova",action:"Invite Members",icon:L.success},
      {title:"No data available",body:"Connect a data source to see your analytics and reports",action:"Connect Source",icon:L.info},
    ]) {
      const card=fr(title,{fill:L.surf,stroke:L.border,r:16,sh:0.04,lay:"VERTICAL",pAl:"CENTER",cAl:"CENTER",gap:12,p:[40,24,40,24],pSz:"AUTO",cSz:"FIXED"}); card.resize(268,10); grid3.appendChild(card);
      const ico=fr("",{fill:icon+"18",r:999,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",pSz:"FIXED",cSz:"FIXED"}); ico.resize(64,64); rc(28,28,icon,6,ico); card.appendChild(ico);
      tx(title,"Semi Bold",16,L.txt,card).textAlignHorizontal="CENTER";
      tx(body,"Regular",13,L.txt3,card).textAlignHorizontal="CENTER";
      const ab=fr("",{fill:icon,r:8,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",p:[10,18,10,18],pSz:"AUTO",cSz:"AUTO"}); tx(action,"Semi Bold",13,"#FFFFFF",ab); card.appendChild(ab);
    }
    const e404=fr("Error States",{fill:null,lay:"HORIZONTAL",gap:20,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(e404); fill(e404);
    for (const [code,title,body,col] of [["404","Page not found","This page doesn't exist or has been moved",L.error],["500","Server error","Something went wrong. Our team has been notified",L.warn],["403","Access denied","You don't have permission to view this resource",L.info]]) {
      const card=fr(code,{fill:L.surf,stroke:L.border,r:16,sh:0.04,lay:"VERTICAL",pAl:"CENTER",cAl:"CENTER",gap:10,p:[32,20,32,20],pSz:"AUTO",cSz:"FIXED"}); card.resize(358,10); e404.appendChild(card);
      const ct=tx(code,"Bold",48,col,card); ct.textAlignHorizontal="CENTER"; ct.opacity=0.2;
      tx(title,"Semi Bold",16,L.txt,card).textAlignHorizontal="CENTER";
      tx(body,"Regular",13,L.txt3,card).textAlignHorizontal="CENTER";
      const ab=fr("",{fill:col,r:8,lay:"HORIZONTAL",pAl:"CENTER",cAl:"CENTER",p:[9,16,9,16],pSz:"AUTO",cSz:"AUTO"}); tx("Go back home","Medium",13,"#FFFFFF",ab); card.appendChild(ab);
    }
  }

  // ══════════════════════════════════════════════════════════════
  // SCREEN 20 — CRM — Contacts (Dark)
  // ══════════════════════════════════════════════════════════════
  {
    const {c} = screen("CRM — Contacts (Dark)", D, "Users");
    const ph=fr("",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",pSz:"FIXED",cSz:"AUTO"}); c.appendChild(ph); fill(ph);
    tx("Contacts","Semi Bold",20,D.txt,ph); sp(ph);
    const ab=fr("",{fill:D.primary,r:8,lay:"HORIZONTAL",p:[10,16,10,16],pSz:"AUTO",cSz:"AUTO"}); tx("+ Add Contact","Semi Bold",14,"#FFFFFF",ab); ph.appendChild(ab);
    const stats=fr("Stats",{fill:null,lay:"HORIZONTAL",gap:16,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(stats); fill(stats);
    for (const [lbl,val,col] of [["Total Contacts","1,842",D.txt],["Leads","324",D.info],["Customers","1,280",D.success],["Churned","238",D.error]]) {
      const k=fr(lbl,{fill:D.surf,stroke:D.border,r:12,sh:0.08,lay:"VERTICAL",gap:6,p:[16,20,16,20],pSz:"AUTO",cSz:"FIXED"}); stats.appendChild(k); fill(k);
      tx(lbl,"Medium",12,D.txt3,k); tx(val,"Bold",24,col,k);
    }
    const fb=fr("Filter",{fill:null,lay:"HORIZONTAL",cAl:"CENTER",gap:10,pSz:"FIXED",cSz:"AUTO"}); c.appendChild(fb); fill(fb);
    const si=fr("",{fill:D.surf,stroke:D.border,r:8,lay:"HORIZONTAL",cAl:"CENTER",gap:8,p:[10,14,10,14],pSz:"FIXED",cSz:"AUTO"}); si.resize(260,10);
    rc(14,14,D.muted,2,si); tx("Search contacts...","Regular",14,D.muted,si); fb.appendChild(si);
    for (const [lbl,a] of [["All",true],["Leads",false],["Customers",false]]) {
      const t=fr("",{fill:a?D.primarySoft:D.surf,stroke:a?null:D.border,r:8,lay:"HORIZONTAL",p:[9,14,9,14],pSz:"AUTO",cSz:"AUTO"});
      tx(lbl,"Medium",14,a?D.primary:D.txt2,t); fb.appendChild(t);
    }
    tableCard(c,D,["Name","Company","Email","Status","Deal Value","Last Contact"],[
      ["Olivia Rhye","TechVenture","olivia@tv.com",{badge:"Customer",color:D.success},"$12,400","Today"],
      ["Phoenix Baker","Startup Co","phoenix@sc.com",{badge:"Lead",color:D.info},"$5,200","Yesterday"],
      ["Lana Steiner","Agency Inc","lana@ai.com",{badge:"Customer",color:D.success},"$28,000","Jan 10"],
      ["Demi Wilkinson","DesignHub","demi@dh.com",{badge:"Lead",color:D.info},"$3,800","Jan 8"],
      ["Candice Wu","Growth Co","candice@gc.com",{badge:"Churned",color:D.error},"—","Dec 15"],
      ["Jordan Lee","Nova Corp","jordan@nc.com",{badge:"Customer",color:D.success},"$18,600","Jan 14"],
    ]);
  }

    figma.closePlugin(`✅ Nova UI Kit: 20 screens created! Scroll right to see all.`);
  } catch(e) {
    figma.closePlugin(`❌ Error: ${e.message || String(e)}`);
  }
})();
