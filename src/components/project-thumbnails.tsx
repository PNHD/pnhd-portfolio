"use client";

export function NovaThumb() {
  return (
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="nova-bg" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a1a2e" />
          <stop offset="1" stopColor="#16213e" />
        </linearGradient>
        <linearGradient id="nova-accent" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f97316" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#nova-bg)" />
      {/* Phone mockup 1 */}
      <rect x="180" y="80" width="180" height="360" rx="24" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <rect x="192" y="100" width="156" height="320" rx="16" fill="#1e293b" />
      <rect x="208" y="116" width="124" height="20" rx="4" fill="#334155" />
      <rect x="208" y="148" width="80" height="10" rx="3" fill="#475569" />
      <rect x="208" y="170" width="124" height="60" rx="8" fill="url(#nova-accent)" opacity="0.3" />
      <rect x="208" y="242" width="58" height="58" rx="8" fill="#334155" />
      <rect x="274" y="242" width="58" height="58" rx="8" fill="#334155" />
      <rect x="208" y="312" width="124" height="36" rx="8" fill="#f97316" opacity="0.8" />
      <rect x="208" y="360" width="124" height="8" rx="2" fill="#334155" />
      <rect x="208" y="376" width="90" height="8" rx="2" fill="#334155" />
      {/* Phone mockup 2 */}
      <rect x="420" y="120" width="180" height="360" rx="24" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <rect x="432" y="140" width="156" height="320" rx="16" fill="#1e293b" />
      <circle cx="510" cy="220" r="40" fill="url(#nova-accent)" opacity="0.2" />
      <circle cx="510" cy="220" r="24" fill="url(#nova-accent)" opacity="0.4" />
      <rect x="470" y="280" width="80" height="10" rx="3" fill="#475569" />
      <rect x="480" y="300" width="60" height="8" rx="2" fill="#334155" />
      <rect x="448" y="330" width="50" height="50" rx="10" fill="#334155" />
      <rect x="506" y="330" width="50" height="50" rx="10" fill="#334155" />
      <rect x="448" y="388" width="50" height="50" rx="10" fill="#334155" />
      <rect x="506" y="388" width="50" height="50" rx="10" fill="url(#nova-accent)" opacity="0.3" />
      {/* Floating elements */}
      <rect x="80" y="200" width="60" height="60" rx="12" fill="#f97316" opacity="0.15" transform="rotate(-12 110 230)" />
      <rect x="660" y="160" width="50" height="50" rx="10" fill="#06b6d4" opacity="0.15" transform="rotate(8 685 185)" />
      <circle cx="700" cy="400" r="30" fill="#f97316" opacity="0.1" />
      {/* Label */}
      <text x="400" y="540" textAnchor="middle" fill="#94a3b8" fontSize="14" fontFamily="system-ui">NOVA — Mobile UI Kit</text>
    </svg>
  );
}

export function SerenityThumb() {
  return (
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="serenity-bg" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e1b4b" />
          <stop offset="1" stopColor="#312e81" />
        </linearGradient>
        <radialGradient id="serenity-glow" cx="400" cy="260" r="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" stopOpacity="0.3" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#serenity-bg)" />
      <circle cx="400" cy="260" r="200" fill="url(#serenity-glow)" />
      {/* Phone */}
      <rect x="310" y="60" width="180" height="380" rx="24" fill="#0f0e2a" stroke="#4c1d95" strokeWidth="1.5" />
      <rect x="322" y="80" width="156" height="340" rx="16" fill="#1a1744" />
      {/* Breathing circle */}
      <circle cx="400" cy="220" r="60" fill="#7c3aed" opacity="0.15" />
      <circle cx="400" cy="220" r="45" fill="#7c3aed" opacity="0.25" />
      <circle cx="400" cy="220" r="30" fill="#7c3aed" opacity="0.4" />
      <circle cx="400" cy="220" r="8" fill="#a78bfa" />
      {/* UI elements */}
      <text x="400" y="310" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontFamily="system-ui">Breathe</text>
      <rect x="350" y="340" width="100" height="32" rx="16" fill="#7c3aed" opacity="0.5" />
      <rect x="372" y="352" width="56" height="8" rx="4" fill="#c4b5fd" opacity="0.7" />
      <rect x="340" y="388" width="48" height="6" rx="3" fill="#4c1d95" />
      <rect x="396" y="388" width="48" height="6" rx="3" fill="#4c1d95" />
      {/* Stars */}
      <circle cx="200" cy="120" r="2" fill="#c4b5fd" opacity="0.5" />
      <circle cx="600" cy="100" r="1.5" fill="#c4b5fd" opacity="0.4" />
      <circle cx="650" cy="200" r="2" fill="#c4b5fd" opacity="0.3" />
      <circle cx="150" cy="300" r="1.5" fill="#c4b5fd" opacity="0.4" />
      <circle cx="680" cy="350" r="2" fill="#c4b5fd" opacity="0.3" />
      <circle cx="120" cy="450" r="1.5" fill="#c4b5fd" opacity="0.2" />
      <text x="400" y="540" textAnchor="middle" fill="#94a3b8" fontSize="14" fontFamily="system-ui">SERENITY — Meditation App</text>
    </svg>
  );
}

export function PulseThumb() {
  return (
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="pulse-bg" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0c1220" />
          <stop offset="1" stopColor="#111827" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#pulse-bg)" />
      {/* Dashboard frame */}
      <rect x="80" y="60" width="640" height="420" rx="16" fill="#1f2937" stroke="#374151" strokeWidth="1" />
      {/* Sidebar */}
      <rect x="80" y="60" width="140" height="420" rx="16" fill="#111827" />
      <rect x="80" y="60" width="140" height="420" fill="#111827" />
      <rect x="80" y="60" width="140" height="60" rx="16" fill="#111827" />
      <circle cx="120" cy="90" r="12" fill="#f97316" opacity="0.3" />
      <rect x="140" y="84" width="60" height="10" rx="3" fill="#374151" />
      <rect x="100" y="140" width="100" height="8" rx="3" fill="#374151" />
      <rect x="100" y="168" width="80" height="8" rx="3" fill="#f97316" opacity="0.5" />
      <rect x="100" y="196" width="90" height="8" rx="3" fill="#374151" />
      <rect x="100" y="224" width="70" height="8" rx="3" fill="#374151" />
      {/* KPI cards */}
      <rect x="240" y="80" width="110" height="70" rx="10" fill="#1a2332" stroke="#2d3748" strokeWidth="1" />
      <rect x="254" y="94" width="40" height="6" rx="2" fill="#6b7280" />
      <rect x="254" y="112" width="60" height="14" rx="3" fill="#f97316" opacity="0.7" />
      <rect x="254" y="132" width="30" height="6" rx="2" fill="#10b981" />
      <rect x="366" y="80" width="110" height="70" rx="10" fill="#1a2332" stroke="#2d3748" strokeWidth="1" />
      <rect x="380" y="94" width="40" height="6" rx="2" fill="#6b7280" />
      <rect x="380" y="112" width="50" height="14" rx="3" fill="#06b6d4" opacity="0.7" />
      <rect x="380" y="132" width="30" height="6" rx="2" fill="#10b981" />
      <rect x="492" y="80" width="110" height="70" rx="10" fill="#1a2332" stroke="#2d3748" strokeWidth="1" />
      <rect x="506" y="94" width="40" height="6" rx="2" fill="#6b7280" />
      <rect x="506" y="112" width="55" height="14" rx="3" fill="#8b5cf6" opacity="0.7" />
      <rect x="506" y="132" width="30" height="6" rx="2" fill="#ef4444" />
      <rect x="618" y="80" width="82" height="70" rx="10" fill="#1a2332" stroke="#2d3748" strokeWidth="1" />
      <rect x="632" y="94" width="40" height="6" rx="2" fill="#6b7280" />
      <rect x="632" y="112" width="45" height="14" rx="3" fill="#10b981" opacity="0.7" />
      {/* Chart area */}
      <rect x="240" y="168" width="340" height="180" rx="10" fill="#1a2332" stroke="#2d3748" strokeWidth="1" />
      <polyline points="260,320 300,290 340,300 380,260 420,270 460,230 500,250 540,210" stroke="#f97316" strokeWidth="2" fill="none" opacity="0.8" />
      <polyline points="260,330 300,310 340,320 380,300 420,310 460,280 500,290 540,260" stroke="#06b6d4" strokeWidth="2" fill="none" opacity="0.5" />
      {/* Table */}
      <rect x="240" y="366" width="340" height="100" rx="10" fill="#1a2332" stroke="#2d3748" strokeWidth="1" />
      <rect x="258" y="380" width="50" height="6" rx="2" fill="#6b7280" />
      <rect x="340" y="380" width="50" height="6" rx="2" fill="#6b7280" />
      <rect x="430" y="380" width="50" height="6" rx="2" fill="#6b7280" />
      <rect x="520" y="380" width="40" height="6" rx="2" fill="#6b7280" />
      <line x1="258" y1="396" x2="562" y2="396" stroke="#2d3748" strokeWidth="1" />
      <rect x="258" y="406" width="70" height="6" rx="2" fill="#4b5563" />
      <rect x="340" y="406" width="40" height="6" rx="2" fill="#4b5563" />
      <rect x="430" y="406" width="55" height="6" rx="2" fill="#4b5563" />
      <rect x="520" y="406" width="30" height="6" rx="2" fill="#10b981" />
      <rect x="258" y="424" width="60" height="6" rx="2" fill="#4b5563" />
      <rect x="340" y="424" width="45" height="6" rx="2" fill="#4b5563" />
      <rect x="430" y="424" width="50" height="6" rx="2" fill="#4b5563" />
      <rect x="520" y="424" width="30" height="6" rx="2" fill="#ef4444" />
      {/* Donut chart */}
      <g transform="translate(640, 270)">
        <circle r="50" fill="none" stroke="#2d3748" strokeWidth="12" />
        <circle r="50" fill="none" stroke="#f97316" strokeWidth="12" strokeDasharray="120 195" strokeDashoffset="0" opacity="0.8" />
        <circle r="50" fill="none" stroke="#06b6d4" strokeWidth="12" strokeDasharray="80 235" strokeDashoffset="-120" opacity="0.7" />
        <circle r="50" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="50 265" strokeDashoffset="-200" opacity="0.6" />
      </g>
      <text x="400" y="540" textAnchor="middle" fill="#94a3b8" fontSize="14" fontFamily="system-ui">PULSE — Analytics Dashboard</text>
    </svg>
  );
}

export function ElevateThumb() {
  return (
    <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="elev-bg" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0a0a0a" />
          <stop offset="1" stopColor="#171717" />
        </linearGradient>
        <linearGradient id="elev-grad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f97316" stopOpacity="0.6" />
          <stop offset="1" stopColor="#06b6d4" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="elev-glow" cx="400" cy="240" r="250" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316" stopOpacity="0.08" />
          <stop offset="1" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#elev-bg)" />
      <circle cx="400" cy="240" r="250" fill="url(#elev-glow)" />
      {/* 3D-ish geometric shapes */}
      {/* Cube */}
      <g transform="translate(380, 180)">
        <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="url(#elev-grad)" opacity="0.3" />
        <polygon points="0,-60 52,-30 0,0 -52,-30" fill="#f97316" opacity="0.15" />
        <polygon points="52,-30 52,30 0,60 0,0" fill="#06b6d4" opacity="0.1" />
        <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="none" stroke="url(#elev-grad)" strokeWidth="1.5" />
      </g>
      {/* Floating sphere */}
      <circle cx="250" cy="200" r="35" fill="#06b6d4" opacity="0.08" stroke="#06b6d4" strokeWidth="1" />
      <ellipse cx="244" cy="192" rx="12" ry="8" fill="#06b6d4" opacity="0.15" />
      {/* Torus ring */}
      <ellipse cx="560" cy="250" rx="50" ry="20" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="560" cy="250" rx="50" ry="20" fill="#f97316" opacity="0.05" />
      {/* Glass card overlay */}
      <rect x="200" y="340" width="400" height="140" rx="16" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" />
      <rect x="224" y="364" width="160" height="14" rx="4" fill="#fafafa" opacity="0.8" />
      <rect x="224" y="390" width="340" height="8" rx="3" fill="#a3a3a3" opacity="0.4" />
      <rect x="224" y="408" width="280" height="8" rx="3" fill="#a3a3a3" opacity="0.3" />
      <rect x="224" y="436" width="100" height="28" rx="14" fill="url(#elev-grad)" opacity="0.8" />
      <rect x="340" y="436" width="80" height="28" rx="14" fill="none" stroke="#a3a3a3" strokeOpacity="0.3" strokeWidth="1" />
      {/* Floating dots */}
      <circle cx="150" cy="140" r="3" fill="#f97316" opacity="0.4" />
      <circle cx="650" cy="120" r="2" fill="#06b6d4" opacity="0.5" />
      <circle cx="700" cy="350" r="3" fill="#f97316" opacity="0.3" />
      <circle cx="100" cy="400" r="2" fill="#06b6d4" opacity="0.3" />
      <circle cx="680" cy="460" r="2" fill="#f97316" opacity="0.2" />
      <text x="400" y="540" textAnchor="middle" fill="#94a3b8" fontSize="14" fontFamily="system-ui">ELEVATE — 3D Landing Page</text>
    </svg>
  );
}

export const thumbnails: Record<string, React.FC> = {
  "nova-ui-kit": NovaThumb,
  "meditation-app": SerenityThumb,
  "analytics-dashboard": PulseThumb,
  "3d-landing-page": ElevateThumb,
};
