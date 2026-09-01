import type { Metadata } from "next";
import { ConceptCaseStudy } from "@/components/concept-case-study";

export const metadata: Metadata = {
  title: "ReturnFlow Ops — Product Case Study",
  description: "Self-directed e-commerce operations concept covering returns triage, refund exposure, SLA risk and approval workflows.",
  alternates: { canonical: "/projects/returnflow-ops" },
};

export default function ReturnFlowOpsCaseStudy() {
  return (
    <ConceptCaseStudy
      title="ReturnFlow Ops"
      kicker="Self-directed concept · E-commerce operations"
      summary="A live returns-and-refunds operations console designed around queue triage, refund exposure, SLA risk, carrier state and manual approval decisions for a high-volume commerce team."
      liveHref="https://returnflow-ops-0v2co1.v2.appdeploy.ai/"
      screenshot="https://appdeployai-v2-qa-screenshots.s3.us-east-1.amazonaws.com/returnflow-ops-0v2co1/1788287024292/web.png"
      screenshotAlt="ReturnFlow Ops e-commerce returns operations console"
      problem="Returns teams juggle customer reasons, order value, case age, carrier status and fraud risk at once. The main challenge is helping an operator decide what deserves attention first without hiding the context needed before money moves."
      role="I defined the triage model, designed the queue and case-detail experience, implemented working filters and sorting, and built a clear approval state so the prototype behaves like an operations tool rather than a static admin mockup."
      workflow={[
        { label: "SCAN", title: "See exposure before opening cases", body: "Open-case count, refund value, SLA risk and high-risk case count summarize the current filtered queue." },
        { label: "PRIORITIZE", title: "Filter and reorder work", body: "Status, risk, search and value/age sorting let operators move between policy, urgency and financial exposure." },
        { label: "REVIEW", title: "Open decision context", body: "The drawer combines reason, value, age, carrier, SKU, risk rationale and activity history in one review surface." },
        { label: "ACT", title: "Complete the refund decision", body: "Approval changes the case state visibly so the primary action has a clear, durable outcome in the prototype." },
      ]}
      decisions={[
        { title: "Operational urgency is visible", body: "Age thresholds, risk labels and SLA alerts reinforce each other so urgent cases are not dependent on one visual treatment." },
        { title: "Money movement gets context", body: "Refund value sits beside risk and policy state rather than being treated as a standalone amount." },
        { title: "The queue remains compact", body: "Secondary attributes collapse on smaller viewports while the fields needed for triage stay visible." },
      ]}
      demonstrates={["E-commerce UX", "Operations dashboard", "Returns workflow", "Risk and SLA states", "Decision hierarchy", "Responsive admin UI", "Workflow prototyping"]}
    />
  );
}
