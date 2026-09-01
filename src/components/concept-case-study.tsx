import Link from "next/link";

export type ConceptCaseStudyProps = {
  title: string;
  kicker: string;
  summary: string;
  liveHref: string;
  screenshot: string;
  screenshotAlt: string;
  problem: string;
  role: string;
  workflow: { label: string; title: string; body: string }[];
  decisions: { title: string; body: string }[];
  demonstrates: string[];
};

export function ConceptCaseStudy({
  title,
  kicker,
  summary,
  liveHref,
  screenshot,
  screenshotAlt,
  problem,
  role,
  workflow,
  decisions,
  demonstrates,
}: ConceptCaseStudyProps) {
  return (
    <article className="project-case wrap case">
      <Link className="case-back" href="/#projects">
        ← Back to projects
      </Link>

      <header className="project-case-hero project-case-hero-media">
        <div className="case-hero-copy">
          <div className="kicker">{kicker}</div>
          <h1 className="case-title dsp">{title}</h1>
          <p className="case-blurb">{summary}</p>
          <div className="project-case-actions">
            <a className="btn btn-accent" href={liveHref} target="_blank" rel="noopener noreferrer">
              Open live concept ↗
            </a>
          </div>
        </div>

        <figure className="case-hero-media-block">
          <div className="case-product-shot">
            <img src={screenshot} alt={screenshotAlt} />
            <div className="case-media-hud mono" aria-hidden="true">
              <span>SELF-DIRECTED CONCEPT</span>
              <span>2026</span>
            </div>
          </div>
          <figcaption>Live interactive concept built as portfolio evidence, not client work.</figcaption>
        </figure>
      </header>

      <section className="case-story-grid" id="brief">
        <div className="case-story-block">
          <div className="work-cat mono">Problem</div>
          <h2 className="dsp">A realistic product problem, not a decorative dashboard brief.</h2>
          <p>{problem}</p>
        </div>
        <div className="case-story-block">
          <div className="work-cat mono">My role</div>
          <h2 className="dsp">Product framing, interface design and working prototype.</h2>
          <p>{role}</p>
        </div>
      </section>

      <section className="case-detail-section" id="workflow">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Core workflow</div>
            <h2 className="dsp">The interface is organized around decisions and state changes.</h2>
          </div>
          <p className="case-section-lede">
            The concept is intentionally interactive so the design can be judged against a real task flow instead of only a polished screenshot.
          </p>
        </div>
        <div className="case-production-rail">
          {workflow.map((step, index) => (
            <div className="case-production-step" key={step.title}>
              <span className="mono">{String(index + 1).padStart(2, "0")} / {step.label}</span>
              <b>{step.title}</b>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="case-detail-section" id="decisions">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Design decisions</div>
            <h2 className="dsp">System choices are tied to operational use.</h2>
          </div>
          <p className="case-section-lede">
            The goal is not to claim invented conversion or efficiency gains. The case shows the reasoning and interaction model that can be evaluated directly in the live prototype.
          </p>
        </div>
        <div className="case-production-rail">
          {decisions.map((decision, index) => (
            <div className="case-production-step" key={decision.title}>
              <span className="mono">{String(index + 1).padStart(2, "0")} / DECISION</span>
              <b>{decision.title}</b>
              <p>{decision.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="case-detail-section case-result-section" id="result">
        <div>
          <div className="work-cat mono">What this demonstrates</div>
          <h2 className="dsp">Client-relevant product thinking without pretending this was paid work.</h2>
        </div>
        <div className="case-proof-list">
          {demonstrates.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <div className="case-next case-next-split">
        <Link className="view-all" href="/work">
          ← Full work archive
        </Link>
        <Link className="view-all" href="/#projects">
          More product concepts →
        </Link>
      </div>
    </article>
  );
}
