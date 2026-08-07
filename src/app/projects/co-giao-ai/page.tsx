import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cô Giáo AI — AI Workflow Case Study",
  description:
    "Case study for Cô Giáo AI: an n8n and Discord educational-assistant system with context routing, persistent memory, image-input checks and deterministic ledgers.",
  alternates: { canonical: "/projects/co-giao-ai" },
};

export default function CoGiaoAiCaseStudy() {
  return (
    <article className="project-case wrap case">
      <Link className="case-back" href="/#projects">
        ← Back to projects
      </Link>

      <header className="project-case-hero">
        <div>
          <div className="kicker">Independent System · AI Automation</div>
          <h1 className="case-title dsp">Cô Giáo AI</h1>
          <p className="case-blurb">
            A self-directed educational-assistant system built around Discord and n8n.
            The interesting design problem was not the chat interface itself; it was
            making a multi-step AI workflow keep the right context, remember previous
            interactions, interpret image submissions and update scores or time rules
            without letting model output directly mutate state.
          </p>
          <div className="project-case-actions">
            <Link className="btn btn-accent" href="/work">
              View full work
            </Link>
          </div>
        </div>

        <figure className="case-hero-media case-system-map">
          <img src="/projects/co-giao-ai.svg" alt="Cô Giáo AI system architecture map" />
          <figcaption className="case-caption mono">
            Simplified system map · personal/student data intentionally omitted
          </figcaption>
        </figure>
      </header>

      <section className="case-story-grid">
        <div className="case-story-block">
          <div className="work-cat mono">Problem</div>
          <h2 className="dsp">A useful assistant needs state, guardrails and deterministic actions.</h2>
          <p>
            A Discord message can arrive as plain text, a reply to an older task, one
            or more screenshots, or a grading submission. If those inputs are treated
            as one generic prompt, the assistant can lose the active student, grade
            the wrong source or award points from an ambiguous model response.
          </p>
        </div>
        <div className="case-story-block">
          <div className="work-cat mono">My role</div>
          <h2 className="dsp">Workflow architecture, routing logic, reliability rules and iteration.</h2>
          <p>
            I designed the n8n orchestration, separated AI interpretation from
            deterministic state updates, added context and source locks, and iterated
            failure cases around image submissions, grading and ledger updates.
          </p>
        </div>
      </section>

      <section className="case-detail-section">
        <div className="case-detail-head">
          <div className="work-cat mono">System architecture</div>
          <h2 className="dsp">Discord is the interface. The workflow behind it does the real work.</h2>
        </div>
        <div className="case-decision-grid">
          <div>
            <b>1 · Intake</b>
            <p>Message text, reply context and image attachments are normalized before any model call.</p>
          </div>
          <div>
            <b>2 · Context guard</b>
            <p>The workflow resolves the active conversation context and protects task or exam source continuity.</p>
          </div>
          <div>
            <b>3 · AI routing</b>
            <p>Different intents and grade-appropriate tasks can be routed to specialized AI behavior instead of one universal prompt.</p>
          </div>
          <div>
            <b>4 · Memory + ledger</b>
            <p>Persistent memory supports continuity while deterministic nodes decide whether a score or time-ledger change is allowed.</p>
          </div>
        </div>
      </section>

      <section className="case-detail-section case-evidence-split">
        <div>
          <div className="work-cat mono">Reliability decisions</div>
          <h2 className="dsp">The most important work happened around the model.</h2>
          <p className="case-long-copy">
            I treated the AI response as untrusted interpretation rather than the
            final source of truth. That led to explicit checks before grading,
            awarding points or changing a time ledger.
          </p>
        </div>
        <div className="case-proof-stack">
          <div>
            <b>Reply-context lock</b>
            <p>Referenced Discord messages and attachments stay tied to the active task instead of being silently replaced by newer context.</p>
          </div>
          <div>
            <b>Original-source lock</b>
            <p>Grading can be anchored to the original task/exam source so an answer is not evaluated against a regenerated prompt.</p>
          </div>
          <div>
            <b>Image grading safeguards</b>
            <p>Screenshot/image submissions are decoded and validated before their interpretation is allowed to influence a result.</p>
          </div>
          <div>
            <b>Deterministic award gate</b>
            <p>Structured AI output is parsed first; ordinary workflow code decides whether score/minute updates are actually committed.</p>
          </div>
        </div>
      </section>

      <section className="case-detail-section">
        <div className="case-detail-head">
          <div className="work-cat mono">Iteration</div>
          <h2 className="dsp">The project evolved through failure-driven workflow revisions.</h2>
        </div>
        <div className="ai-pipeline">
          <div><span>01</span><b>Context continuity</b><p>Separate memory and reply-context handling reduced accidental context drift.</p></div>
          <div><span>02</span><b>Image input</b><p>Multi-image and screenshot handling became a first-class path instead of a text-only afterthought.</p></div>
          <div><span>03</span><b>Structured results</b><p>Score/minute changes are represented as structured data that workflow logic can validate.</p></div>
          <div><span>04</span><b>Safety hotfixes</b><p>Later revisions focused on source locking, answer quality, image grading and award safety rather than adding decorative features.</p></div>
        </div>
      </section>

      <section className="case-detail-section case-result-section">
        <div>
          <div className="work-cat mono">What this demonstrates</div>
          <h2 className="dsp">Designing an AI system means designing its failure boundaries.</h2>
        </div>
        <div className="case-proof-list">
          <span>n8n workflow architecture</span>
          <span>Discord interaction design</span>
          <span>Multi-agent / intent routing</span>
          <span>Persistent memory</span>
          <span>Image-input handling</span>
          <span>Deterministic state updates</span>
        </div>
      </section>

      <div className="case-next">
        <Link className="view-all" href="/projects/claude-ui-lab">
          Next case study: Claude UI Lab →
        </Link>
      </div>
    </article>
  );
}
