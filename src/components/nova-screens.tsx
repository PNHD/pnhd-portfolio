"use client";

const PHONE_W = 220;
const PHONE_H = 440;
const PHONE_RX = 28;
const SCREEN_INSET = 10;

function PhoneFrame({
  children,
  x = 0,
  y = 0,
}: {
  children: React.ReactNode;
  x?: number;
  y?: number;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        width={PHONE_W}
        height={PHONE_H}
        rx={PHONE_RX}
        fill="#0f172a"
        stroke="#334155"
        strokeWidth="2"
      />
      {/* Notch */}
      <rect
        x={(PHONE_W - 60) / 2}
        y={6}
        width={60}
        height={18}
        rx={9}
        fill="#1e293b"
      />
      {/* Screen area */}
      <clipPath id={`screen-${x}-${y}`}>
        <rect
          x={SCREEN_INSET}
          y={SCREEN_INSET + 14}
          width={PHONE_W - SCREEN_INSET * 2}
          height={PHONE_H - SCREEN_INSET * 2 - 14}
          rx={PHONE_RX - SCREEN_INSET}
        />
      </clipPath>
      <g clipPath={`url(#screen-${x}-${y})`}>{children}</g>
      {/* Home indicator */}
      <rect
        x={(PHONE_W - 40) / 2}
        y={PHONE_H - 14}
        width={40}
        height={4}
        rx={2}
        fill="#475569"
      />
    </g>
  );
}

export function NovaOnboardingScreen() {
  return (
    <svg
      viewBox="0 0 280 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect width="280" height="500" fill="#0a0f1a" rx="8" />
      <PhoneFrame x={30} y={30}>
        <rect x={10} y={24} width={200} height={416} fill="#0f172a" />
        {/* Illustration area */}
        <circle cx={110} cy={160} r={60} fill="#f97316" opacity={0.08} />
        <circle cx={110} cy={160} r={40} fill="#f97316" opacity={0.15} />
        <circle cx={110} cy={160} r={20} fill="#f97316" opacity={0.3} />
        <rect x={96} y={146} width={28} height={28} rx={6} fill="#fb923c" opacity={0.8} />
        {/* Text */}
        <rect x={40} y={250} width={140} height={12} rx={3} fill="#e2e8f0" opacity={0.9} />
        <rect x={55} y={272} width={110} height={8} rx={2} fill="#64748b" />
        <rect x={65} y={288} width={90} height={8} rx={2} fill="#64748b" />
        {/* Dots indicator */}
        <circle cx={95} cy={320} r={4} fill="#f97316" />
        <circle cx={110} cy={320} r={4} fill="#334155" />
        <circle cx={125} cy={320} r={4} fill="#334155" />
        {/* CTA button */}
        <rect x={30} y={350} width={160} height={44} rx={22} fill="#f97316" />
        <rect x={75} y={368} width={70} height={8} rx={3} fill="#ffffff" opacity={0.9} />
        {/* Skip */}
        <rect x={80} y={410} width={60} height={8} rx={3} fill="#64748b" />
      </PhoneFrame>
    </svg>
  );
}

export function NovaDashboardScreen() {
  return (
    <svg
      viewBox="0 0 280 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect width="280" height="500" fill="#0a0f1a" rx="8" />
      <PhoneFrame x={30} y={30}>
        <rect x={10} y={24} width={200} height={416} fill="#0f172a" />
        {/* Status bar area */}
        <rect x={20} y={36} width={60} height={8} rx={2} fill="#94a3b8" />
        {/* Greeting */}
        <rect x={20} y={60} width={80} height={10} rx={3} fill="#64748b" />
        <rect x={20} y={76} width={120} height={14} rx={3} fill="#e2e8f0" />
        {/* Balance card */}
        <rect x={20} y={106} width={180} height={80} rx={14} fill="url(#nova-dash-grad)" />
        <rect x={34} y={120} width={50} height={6} rx={2} fill="#ffffff" opacity={0.6} />
        <rect x={34} y={136} width={90} height={16} rx={3} fill="#ffffff" opacity={0.95} />
        <rect x={34} y={162} width={60} height={8} rx={3} fill="#ffffff" opacity={0.5} />
        {/* Quick actions */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect
              x={20 + i * 47}
              y={200}
              width={38}
              height={38}
              rx={12}
              fill="#1e293b"
            />
            <rect
              x={30 + i * 47}
              y={213}
              width={18}
              height={12}
              rx={3}
              fill={i === 0 ? "#f97316" : i === 1 ? "#06b6d4" : "#8b5cf6"}
              opacity={0.5}
            />
            <rect
              x={23 + i * 47}
              y={244}
              width={32}
              height={5}
              rx={2}
              fill="#475569"
            />
          </g>
        ))}
        {/* Transaction list */}
        <rect x={20} y={264} width={80} height={8} rx={2} fill="#94a3b8" />
        {[0, 1, 2, 3].map((i) => (
          <g key={`tx-${i}`}>
            <circle cx={36} cy={296 + i * 42} r={14} fill="#1e293b" />
            <rect
              x={56}
              y={290 + i * 42}
              width={70}
              height={6}
              rx={2}
              fill="#e2e8f0"
              opacity={0.8}
            />
            <rect
              x={56}
              y={302 + i * 42}
              width={50}
              height={5}
              rx={2}
              fill="#64748b"
            />
            <rect
              x={155}
              y={293 + i * 42}
              width={40}
              height={8}
              rx={2}
              fill={i % 2 === 0 ? "#10b981" : "#ef4444"}
              opacity={0.7}
            />
          </g>
        ))}
      </PhoneFrame>
      <defs>
        <linearGradient id="nova-dash-grad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f97316" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function NovaProfileScreen() {
  return (
    <svg
      viewBox="0 0 280 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect width="280" height="500" fill="#0a0f1a" rx="8" />
      <PhoneFrame x={30} y={30}>
        <rect x={10} y={24} width={200} height={416} fill="#0f172a" />
        {/* Header */}
        <rect x={20} y={40} width={60} height={10} rx={3} fill="#e2e8f0" />
        {/* Avatar */}
        <circle cx={110} cy={110} r={36} fill="#1e293b" />
        <circle cx={110} cy={110} r={34} fill="#f97316" opacity={0.15} />
        <rect x={98} y={98} width={24} height={24} rx={12} fill="#f97316" opacity={0.5} />
        {/* Name */}
        <rect x={65} y={160} width={90} height={12} rx={3} fill="#e2e8f0" />
        <rect x={75} y={178} width={70} height={7} rx={2} fill="#64748b" />
        {/* Stats row */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={22 + i * 64} y={204} width={52} height={46} rx={10} fill="#1e293b" />
            <rect x={34 + i * 64} y={214} width={28} height={10} rx={2} fill="#f97316" opacity={0.7} />
            <rect x={30 + i * 64} y={232} width={36} height={6} rx={2} fill="#64748b" />
          </g>
        ))}
        {/* Menu items */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`menu-${i}`}>
            <rect x={20} y={270 + i * 38} width={180} height={30} rx={8} fill="#1e293b" />
            <rect x={34} y={280 + i * 38} width={16} height={10} rx={3} fill="#f97316" opacity={0.4} />
            <rect x={58} y={281 + i * 38} width={70} height={8} rx={2} fill="#94a3b8" />
          </g>
        ))}
      </PhoneFrame>
    </svg>
  );
}

export function NovaEcommerceScreen() {
  return (
    <svg
      viewBox="0 0 280 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect width="280" height="500" fill="#0a0f1a" rx="8" />
      <PhoneFrame x={30} y={30}>
        <rect x={10} y={24} width={200} height={416} fill="#0f172a" />
        {/* Search bar */}
        <rect x={20} y={40} width={160} height={32} rx={16} fill="#1e293b" />
        <rect x={36} y={52} width={60} height={8} rx={3} fill="#475569" />
        {/* Category pills */}
        <rect x={20} y={84} width={50} height={24} rx={12} fill="#f97316" />
        <rect x={32} y={92} width={26} height={8} rx={3} fill="#fff" opacity={0.9} />
        <rect x={76} y={84} width={50} height={24} rx={12} fill="#1e293b" />
        <rect x={132} y={84} width={50} height={24} rx={12} fill="#1e293b" />
        {/* Product grid */}
        {[0, 1].map((row) =>
          [0, 1].map((col) => (
            <g key={`prod-${row}-${col}`}>
              <rect
                x={20 + col * 94}
                y={120 + row * 140}
                width={86}
                height={130}
                rx={12}
                fill="#1e293b"
              />
              <rect
                x={24 + col * 94}
                y={124 + row * 140}
                width={78}
                height={72}
                rx={8}
                fill="#334155"
              />
              <rect
                x={28 + col * 94}
                y={204 + row * 140}
                width={60}
                height={7}
                rx={2}
                fill="#e2e8f0"
                opacity={0.8}
              />
              <rect
                x={28 + col * 94}
                y={216 + row * 140}
                width={40}
                height={6}
                rx={2}
                fill="#64748b"
              />
              <rect
                x={28 + col * 94}
                y={230 + row * 140}
                width={30}
                height={8}
                rx={2}
                fill="#f97316"
                opacity={0.7}
              />
            </g>
          ))
        )}
        {/* Bottom tab bar */}
        <rect x={10} y={404} width={200} height={36} fill="#0f172a" />
        <line x1={10} y1={404} x2={210} y2={404} stroke="#1e293b" strokeWidth={1} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={`tab-${i}`}
            x={26 + i * 38}
            y={414}
            width={14}
            height={14}
            rx={3}
            fill={i === 0 ? "#f97316" : "#475569"}
            opacity={i === 0 ? 0.8 : 0.4}
          />
        ))}
      </PhoneFrame>
    </svg>
  );
}

export function NovaMessagingScreen() {
  return (
    <svg
      viewBox="0 0 280 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect width="280" height="500" fill="#0a0f1a" rx="8" />
      <PhoneFrame x={30} y={30}>
        <rect x={10} y={24} width={200} height={416} fill="#0f172a" />
        {/* Header */}
        <rect x={20} y={38} width={16} height={16} rx={3} fill="#475569" />
        <circle cx={60} cy={46} r={14} fill="#1e293b" />
        <rect x={80} y={38} width={70} height={8} rx={2} fill="#e2e8f0" />
        <rect x={80} y={50} width={40} height={6} rx={2} fill="#10b981" />
        {/* Messages */}
        {/* Received */}
        <rect x={20} y={80} width={120} height={36} rx={14} fill="#1e293b" />
        <rect x={32} y={92} width={80} height={8} rx={3} fill="#94a3b8" />
        <rect x={20} y={122} width={90} height={36} rx={14} fill="#1e293b" />
        <rect x={32} y={134} width={60} height={8} rx={3} fill="#94a3b8" />
        {/* Sent */}
        <rect x={80} y={170} width={120} height={36} rx={14} fill="#f97316" opacity={0.8} />
        <rect x={92} y={182} width={80} height={8} rx={3} fill="#fff" opacity={0.9} />
        <rect x={100} y={218} width={100} height={36} rx={14} fill="#f97316" opacity={0.8} />
        <rect x={112} y={230} width={60} height={8} rx={3} fill="#fff" opacity={0.9} />
        {/* Received */}
        <rect x={20} y={268} width={140} height={50} rx={14} fill="#1e293b" />
        <rect x={32} y={280} width={100} height={8} rx={3} fill="#94a3b8" />
        <rect x={32} y={296} width={70} height={8} rx={3} fill="#94a3b8" />
        {/* Sent */}
        <rect x={90} y={330} width={110} height={36} rx={14} fill="#f97316" opacity={0.8} />
        <rect x={102} y={342} width={70} height={8} rx={3} fill="#fff" opacity={0.9} />
        {/* Input */}
        <rect x={20} y={390} width={145} height={36} rx={18} fill="#1e293b" />
        <rect x={36} y={404} width={60} height={8} rx={3} fill="#475569" />
        <circle cx={190} cy={408} r={18} fill="#f97316" />
        <rect x={184} y={404} width={12} height={8} rx={2} fill="#fff" opacity={0.9} />
      </PhoneFrame>
    </svg>
  );
}

export function NovaDesignSystemScreen() {
  return (
    <svg
      viewBox="0 0 280 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect width="280" height="500" fill="#0a0f1a" rx="8" />
      {/* This shows the design system overview — not in a phone frame */}
      <g transform="translate(20, 20)">
        {/* Title */}
        <rect x={0} y={0} width={100} height={12} rx={3} fill="#e2e8f0" />
        <rect x={0} y={18} width={160} height={8} rx={2} fill="#64748b" />
        {/* Color palette */}
        <rect x={0} y={44} width={60} height={8} rx={2} fill="#94a3b8" />
        <rect x={0} y={60} width={36} height={36} rx={8} fill="#f97316" />
        <rect x={42} y={60} width={36} height={36} rx={8} fill="#06b6d4" />
        <rect x={84} y={60} width={36} height={36} rx={8} fill="#8b5cf6" />
        <rect x={126} y={60} width={36} height={36} rx={8} fill="#10b981" />
        <rect x={168} y={60} width={36} height={36} rx={8} fill="#ef4444" />
        <rect x={0} y={102} width={36} height={36} rx={8} fill="#0f172a" />
        <rect x={42} y={102} width={36} height={36} rx={8} fill="#1e293b" />
        <rect x={84} y={102} width={36} height={36} rx={8} fill="#334155" />
        <rect x={126} y={102} width={36} height={36} rx={8} fill="#64748b" />
        <rect x={168} y={102} width={36} height={36} rx={8} fill="#e2e8f0" />
        {/* Typography */}
        <rect x={0} y={156} width={60} height={8} rx={2} fill="#94a3b8" />
        <rect x={0} y={172} width={180} height={16} rx={3} fill="#e2e8f0" opacity={0.9} />
        <rect x={0} y={196} width={160} height={12} rx={3} fill="#e2e8f0" opacity={0.7} />
        <rect x={0} y={216} width={140} height={10} rx={3} fill="#e2e8f0" opacity={0.5} />
        <rect x={0} y={234} width={120} height={8} rx={2} fill="#94a3b8" />
        {/* Buttons */}
        <rect x={0} y={260} width={60} height={8} rx={2} fill="#94a3b8" />
        <rect x={0} y={278} width={80} height={32} rx={16} fill="#f97316" />
        <rect x={16} y={290} width={48} height={8} rx={3} fill="#fff" opacity={0.9} />
        <rect x={90} y={278} width={80} height={32} rx={16} fill="none" stroke="#f97316" strokeWidth={1.5} />
        <rect x={106} y={290} width={48} height={8} rx={3} fill="#f97316" opacity={0.7} />
        {/* Cards */}
        <rect x={0} y={328} width={60} height={8} rx={2} fill="#94a3b8" />
        <rect x={0} y={344} width={110} height={80} rx={12} fill="#1e293b" />
        <rect x={8} y={352} width={94} height={40} rx={6} fill="#334155" />
        <rect x={12} y={400} width={60} height={6} rx={2} fill="#e2e8f0" opacity={0.7} />
        <rect x={12} y={412} width={40} height={5} rx={2} fill="#64748b" />
        <rect x={120} y={344} width={110} height={80} rx={12} fill="#1e293b" />
        <rect x={128} y={352} width={94} height={40} rx={6} fill="#334155" />
        <rect x={132} y={400} width={60} height={6} rx={2} fill="#e2e8f0" opacity={0.7} />
        <rect x={132} y={412} width={40} height={5} rx={2} fill="#64748b" />
        {/* Spacing */}
        <rect x={0} y={440} width={60} height={8} rx={2} fill="#94a3b8" />
      </g>
    </svg>
  );
}

export const novaScreens = {
  onboarding: NovaOnboardingScreen,
  dashboard: NovaDashboardScreen,
  profile: NovaProfileScreen,
  ecommerce: NovaEcommerceScreen,
  messaging: NovaMessagingScreen,
  designSystem: NovaDesignSystemScreen,
};
