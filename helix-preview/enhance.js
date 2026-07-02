// Helix preview enhancements — hover engine, theme switcher, desktop nav.
// The Claude Design runtime renders the template but does not implement the
// `style-hover` attribute or a props panel; this file fills those gaps.
(function () {
  "use strict";

  // ── 1 · Hover & press feedback ──
  // The React runtime strips the template's custom `style-hover` attribute,
  // so recreate the interaction layer with global CSS. Gradient-filled
  // anchors/buttons are CTAs (lift + glow); plain links brighten.
  var hoverCss = document.createElement("style");
  hoverCss.textContent =
    "a,button{transition:filter .18s ease,transform .18s ease,color .18s ease,background-color .18s ease,border-color .18s ease;cursor:pointer}" +
    "a:hover,button:hover{filter:brightness(1.14)}" +
    'a[style*="linear-gradient"]:hover,button[style*="linear-gradient"]:hover{transform:translateY(-2px);filter:brightness(1.08)}' +
    "a:active,button:active{transform:translateY(0) scale(.98)}" +
    "nav a:hover,footer a:hover{color:#F2F4F8 !important;filter:none}";
  document.head.appendChild(hoverCss);

  // ── 2 · Desktop nav (template hides it behind data-nav) ──
  var css = document.createElement("style");
  css.textContent =
    "@media (min-width: 960px){[data-nav]{display:flex !important}[data-nav2]{display:inline !important}}" +
    ".hx-theme{position:fixed;right:20px;bottom:20px;z-index:9999;display:flex;align-items:center;gap:10px;" +
    "padding:10px 14px;border-radius:999px;background:rgba(18,21,28,.92);border:1px solid rgba(255,255,255,.12);" +
    "backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 16px 40px -12px rgba(0,0,0,.7);" +
    "font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.12em;color:#9AA4B2}" +
    ".hx-dot{width:22px;height:22px;border-radius:50%;cursor:pointer;border:2px solid transparent;" +
    "transition:transform .15s ease,border-color .15s ease;padding:0;outline:none}" +
    ".hx-dot:hover{transform:scale(1.18)}" +
    ".hx-dot.on{border-color:#fff;transform:scale(1.12)}";
  document.head.appendChild(css);

  // ── 3 · Theme color switcher (accent pairs from the design's props) ──
  var THEMES = [
    ["#6366F1", "#8B5CF6"],
    ["#8B5CF6", "#D946EF"],
    ["#10B981", "#34D399"],
    ["#F97316", "#FB923C"],
    ["#0EA5E9", "#22D3EE"],
  ];
  function applyTheme(pair) {
    var roots = document.querySelectorAll('[style*="--accent"]');
    roots.forEach(function (r) {
      r.style.setProperty("--accent", pair[0]);
      r.style.setProperty("--accent-2", pair[1]);
    });
    document.documentElement.style.setProperty("--accent", pair[0]);
    document.documentElement.style.setProperty("--accent-2", pair[1]);
    try { localStorage.setItem("helix-accent", JSON.stringify(pair)); } catch (e) {}
  }
  function buildPanel() {
    if (document.querySelector(".hx-theme")) return;
    var panel = document.createElement("div");
    panel.className = "hx-theme";
    panel.setAttribute("aria-label", "Theme color");
    var label = document.createElement("span");
    label.textContent = "THEME";
    panel.appendChild(label);
    var savedPair = null;
    try { savedPair = JSON.parse(localStorage.getItem("helix-accent") || "null"); } catch (e) {}
    THEMES.forEach(function (pair) {
      var dot = document.createElement("button");
      dot.className = "hx-dot";
      dot.title = pair[0] + " → " + pair[1];
      dot.style.background = "linear-gradient(135deg," + pair[0] + "," + pair[1] + ")";
      if (savedPair ? savedPair[0] === pair[0] : pair[0] === "#6366F1") dot.classList.add("on");
      dot.addEventListener("click", function () {
        panel.querySelectorAll(".hx-dot").forEach(function (d) { d.classList.remove("on"); });
        dot.classList.add("on");
        applyTheme(pair);
      });
      panel.appendChild(dot);
    });
    document.body.appendChild(panel);
    if (savedPair) applyTheme(savedPair);
  }

  // wait for the React runtime to render the page root, then attach
  var tries = 0;
  var poll = setInterval(function () {
    tries++;
    if (document.querySelector('[style*="--accent"]') || tries > 100) {
      clearInterval(poll);
      buildPanel();
    }
  }, 100);
})();
