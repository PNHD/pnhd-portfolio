import type { Metadata } from "next";
import { ConceptCaseStudy } from "@/components/concept-case-study";

export const metadata: Metadata = {
  title: "Nexus UI Kit — Design System Portfolio Project",
  description:
    "Self-directed UI system portfolio artifact exploring reusable SaaS layouts, dashboards, components, responsive views and theme variants.",
  alternates: { canonical: "/projects/nexus-ui-kit" },
};

export default function NexusUiKitCaseStudy() {
  return (
    <ConceptCaseStudy
      title="Nexus UI Kit"
      kicker="Self-directed project · UI system / design system"
      summary="A portfolio/design-system artifact that explores how reusable layout and component patterns can stay coherent across SaaS landing pages, dashboards, documentation and mobile views. It is not client work."
      liveHref="https://nexus-react.pages.dev/"
      screenshot="/projects/nexus-ui-kit.svg"
      screenshotAlt="Illustrative Nexus UI Kit dashboard and component system composition"
      problem="A visual system has to stay recognizable when navigation, data density, documentation, introductory surfaces and responsive layouts all ask for different patterns."
      role="I designed the interface system, reusable patterns, responsive treatment and theme variants, then implemented the portfolio artifact as a working UI showcase."
      facts={[
        { label: "Context", value: "UI / design system" },
        { label: "Role", value: "Interface system design" },
        { label: "Scope", value: "Responsive SaaS surfaces" },
        { label: "Status", value: "Self-directed" },
        { label: "Evidence", value: "Live project + source repository" },
      ]}
      workflow={[
        { label: "FOUNDATION", title: "Set a shared visual language", body: "Layout, navigation, cards and type establish a common frame before surfaces diverge." },
        { label: "COMPOSE", title: "Apply patterns across surfaces", body: "Landing pages, dashboards, documentation and component views draw from the same reusable system." },
        { label: "ADAPT", title: "Preserve hierarchy on smaller screens", body: "Responsive treatments keep the important actions and information legible across mobile views." },
        { label: "THEME", title: "Test controlled visual variants", body: "Light, dark and accent-theme variants show where the system flexes without losing its identity." },
      ]}
      decisions={[
        { title: "Reusable structure before decoration", body: "Shared navigation, spacing, card and component patterns make different UI surfaces feel related." },
        { title: "Theme variation remains systemic", body: "Color variants are applied as a visual-system treatment rather than separate page designs." },
        { title: "Implementation-aware by design", body: "The artifact is built as a working interface showcase so responsive states and component consistency can be reviewed directly." },
      ]}
      demonstrates={["Design systems", "SaaS UI", "Admin dashboards", "Component patterns", "Responsive UI", "Light and dark themes", "Implementation-aware design"]}
    />
  );
}
