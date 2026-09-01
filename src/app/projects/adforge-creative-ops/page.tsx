import type { Metadata } from "next";
import { ConceptCaseStudy } from "@/components/concept-case-study";

export const metadata: Metadata = {
  title: "AdForge Creative Ops — Product Case Study",
  description: "Self-directed AI creative operations concept turning a campaign brief into structured creative directions with human review and handoff.",
  alternates: { canonical: "/projects/adforge-creative-ops" },
};

export default function AdForgeCreativeOpsCaseStudy() {
  return (
    <ConceptCaseStudy
      title="AdForge Creative Ops"
      kicker="Self-directed concept · AI creative workflow"
      summary="A working AI-assisted creative-operations tool that turns a product, audience and goal into three structured ad directions, then keeps human review and selection in the loop before production."
      liveHref="https://adforge-creative-ops-aesma7.v2.appdeploy.ai/"
      screenshot="https://appdeployai-v2-qa-screenshots.s3.us-east-1.amazonaws.com/adforge-creative-ops-aesma7/1788287086972/web.png"
      screenshotAlt="AdForge Creative Ops AI-assisted concept generation workflow"
      problem="Teams can generate a large volume of AI copy or imagery quickly, but volume alone does not create a useful creative system. The product problem is to structure generation around a real brief, make outputs comparable, preserve human judgment and avoid turning AI suggestions into unsupported performance claims."
      role="I designed the brief-to-review workflow, implemented the product interface and wired a real backend AI generation route with structured output, validation and a visible failure state."
      workflow={[
        { label: "BRIEF", title: "Define product, audience and goal", body: "The generator starts from three business inputs instead of an open-ended prompt box." },
        { label: "GENERATE", title: "Create distinct structured directions", body: "The backend returns exactly three concepts with hook, promise, visual system and CTA fields so outputs can be reviewed consistently." },
        { label: "REVIEW", title: "Compare concepts side by side", body: "Cards keep the strategic fields aligned, making differences easier to judge than free-form AI text." },
        { label: "SELECT", title: "Move one direction to production", body: "Selection exposes a handoff state rather than treating generation as the final deliverable." },
      ]}
      decisions={[
        { title: "AI is a collaborator, not the claim", body: "The interface explicitly frames generated concepts as starting points and avoids invented metrics, endorsements or product capabilities." },
        { title: "Structured output improves review", body: "A fixed schema makes each angle comparable and production-useful while still allowing creative variation." },
        { title: "Failure stays visible", body: "Required-field validation and a backend error state prevent silent failure and keep the workflow recoverable." },
      ]}
      demonstrates={["AI product UX", "Structured generation", "Creative operations", "Human-in-the-loop review", "Backend AI integration", "Guardrail design", "Production handoff"]}
    />
  );
}
