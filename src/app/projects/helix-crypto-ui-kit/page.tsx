import type { Metadata } from "next";
import { ConceptCaseStudy } from "@/components/concept-case-study";

export const metadata: Metadata = {
  title: "Helix Crypto UI Kit — Design System Case Study",
  description:
    "Self-directed crypto and Web3 design system covering token foundations, a 320+ component library and 20 production screens for exchange, wallet, DeFi and NFT products.",
  alternates: { canonical: "/projects/helix-crypto-ui-kit" },
};

export default function HelixCryptoUiKitCaseStudy() {
  return (
    <ConceptCaseStudy
      title="Helix Crypto UI Kit"
      kicker="Self-directed project · Crypto / Web3 design system"
      summary="A crypto and Web3 design system built end to end: token foundations, a 320+ component library and 20 production screens covering exchange, wallet, DeFi and NFT products — shipped as a Figma kit with a working HTML preview. It is not client work."
      liveHref="https://helixkit.pages.dev/"
      screenshot="/projects/helix-crypto-ui-kit/trading-terminal.jpg"
      screenshotAlt="Helix Crypto UI Kit trading terminal screen with candlestick chart, order book and buy/sell panel"
      problem="Crypto products are dense by nature: live prices, order books, wallet balances, token metadata and risk states all compete for the same screen. Most kits solve the visual layer and stop there, leaving the hard part — keeping every state legible once the data is real and the layout is under pressure — to whoever builds it."
      role="I defined the token foundation, built the component library and screen set, wrote the Figma build scripts that generate variables, styles, variants and screens, and produced the HTML preview that serves as the live demo."
      facts={[
        { label: "Context", value: "Crypto / Web3 UI kit" },
        { label: "Role", value: "Token system, components, screens" },
        { label: "Scope", value: "320+ components · 20 screens" },
        { label: "Status", value: "Self-directed" },
        { label: "Evidence", value: "Live preview + Figma build scripts" },
      ]}
      workflow={[
        { label: "FOUNDATION", title: "One token layer for both modes", body: "An accent ramp from 50 to 950, dark and light neutrals, semantic success/danger/warning/info, a 4pt spacing scale and a radius scale exist before a single component does." },
        { label: "COMPONENTS", title: "States before decoration", body: "Buttons, inputs, selectors, badges, tables, charts and wallet cards ship as variants with default, focus, error, loading and disabled states built into the library." },
        { label: "SCREENS", title: "Real product surfaces, not hero art", body: "Twelve desktop and eight mobile screens cover the trading terminal, portfolio dashboard, markets, NFT marketplace, wallet, staking, transactions and settings." },
        { label: "THEME", title: "Light and dark from the same system", body: "Both modes resolve against the same token names, so a dark trading terminal and a light portfolio dashboard are two expressions of one system rather than two designs." },
      ]}
      decisions={[
        { title: "Numeric type gets its own voice", body: "A monospaced face is reserved for prices, balances and order-book figures so columns align and scanning a dense table stays calm." },
        { title: "Semantic color carries state, not decoration", body: "Success, danger, warning and info are the only saturated colors allowed to mean something; the accent stays reserved for action and focus." },
        { title: "A kit is only useful if it survives real screens", body: "Every component has to earn its place inside one of the twenty screens, which keeps the library honest instead of a gallery of pretty isolated parts." },
      ]}
      demonstrates={["Design systems", "Crypto / Web3 UI", "Trading terminal UI", "Component libraries", "Auto Layout and variants", "Light and dark themes", "Design-to-code preview"]}
      screenshotRatio={1176 / 648}
      screens={[
        {
          src: "/projects/helix-crypto-ui-kit/portfolio-light.jpg",
          alt: "Helix portfolio dashboard in the light theme showing total balance, value chart and asset allocation",
          label: "PORTFOLIO DASHBOARD · LIGHT",
          span: "full",
        },
        {
          src: "/projects/helix-crypto-ui-kit/design-tokens.jpg",
          alt: "Helix color tokens showing the accent ramp and matching dark and light neutral scales",
          label: "COLOR & NEUTRAL TOKENS",
          span: "full",
        },
        {
          src: "/projects/helix-crypto-ui-kit/nft-marketplace.jpg",
          alt: "Helix NFT marketplace in the dark theme with a featured drop and collection grid",
          label: "NFT MARKETPLACE · DARK",
        },
        {
          src: "/projects/helix-crypto-ui-kit/component-library.jpg",
          alt: "Helix component library showing button variants, inputs, selectors, and badges with states",
          label: "COMPONENT LIBRARY · STATES",
        },
        {
          src: "/projects/helix-crypto-ui-kit/mobile-screens.jpg",
          alt: "Four Helix mobile screens: onboarding, portfolio, coin detail and swap",
          label: "MOBILE SCREENS · iOS",
          span: "full",
        },
      ]}
    />
  );
}
