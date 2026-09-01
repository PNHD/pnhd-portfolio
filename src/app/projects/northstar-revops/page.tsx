import type { Metadata } from "next";
import { ConceptCaseStudy } from "@/components/concept-case-study";

export const metadata: Metadata = {
  title: "Northstar RevOps — Product Case Study",
  description: "Self-directed B2B SaaS RevOps product concept covering forecasting, risk triage, dense data and deal-level workflows.",
  alternates: { canonical: "/projects/northstar-revops" },
};

export default function NorthstarRevOpsCaseStudy() {
  return (
    <ConceptCaseStudy
      title="Northstar RevOps"
      kicker="Self-directed concept · B2B SaaS operations"
      summary="A live revenue-operations command center exploring how a SaaS team can scan pipeline health, switch forecast scenarios, isolate regional risk and move from summary metrics into a deal-level decision."
      liveHref="https://northstar-revops-1iggj3.v2.appdeploy.ai/"
      screenshot="https://appdeployai-v2-qa-screenshots.s3.us-east-1.amazonaws.com/northstar-revops-1iggj3/1788286942989/web.png"
      screenshotAlt="Northstar RevOps revenue operations command center"
      problem="Revenue teams work with dense pipelines, changing confidence levels and mixed-risk opportunities. A useful command center has to keep summary metrics, signals, filtering and deal detail connected without turning the screen into a wall of equally weighted numbers."
      role="I framed the workflow, designed the hierarchy and interaction model, implemented the responsive prototype and added working scenario, search, region-filter and watchlist states."
      workflow={[
        { label: "SCAN", title: "Read the quarter at a glance", body: "Open pipeline, forecast, coverage and risk are grouped as decision signals rather than decorative KPI cards." },
        { label: "MODEL", title: "Switch forecast confidence", body: "Commit, Likely and Upside states recalculate the projection so scenario planning is visible in the interface." },
        { label: "FILTER", title: "Narrow the operating view", body: "Region and search controls update both the visible deals and summary metrics instead of acting as isolated table filters." },
        { label: "TRIAGE", title: "Open a deal in context", body: "The detail drawer keeps health, ARR, stage, region and risk reasoning together, then exposes a watchlist action." },
      ]}
      decisions={[
        { title: "Dense without feeling compressed", body: "Small type, restrained borders and a limited accent palette keep many data points scannable while preserving hierarchy." },
        { title: "Risk is not just a color", body: "Risk labels, exposed ARR and signal copy provide textual context so status is not communicated by color alone." },
        { title: "Summary and detail stay linked", body: "Filters recalculate the top-level numbers, reinforcing that dashboard metrics are a view of the current working set." },
      ]}
      demonstrates={["B2B SaaS UI", "Data-dense hierarchy", "Forecast states", "Operational filtering", "Deal-detail workflow", "Responsive product UI", "Implementation-aware design"]}
    />
  );
}
