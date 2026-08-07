import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thiên Kim — AI Visual & Video Case Study",
  description:
    "Case study for Thiên Kim: virtual-character art direction, short-form AI image/video production, shot planning and repeatable n8n workflows.",
  alternates: { canonical: "/projects/thien-kim" },
};

const TIKTOK = "https://www.tiktok.com/@tieu.thienkim";

export default function ThienKimCaseStudy() {
  return (
    <article className="project-case wrap case">
      <Link className="case-back" href="/#projects">
        ← Back to projects
      </Link>

      <header className="project-case-hero thien-kim-case-hero">
        <div>
          <div className="kicker">Independent Project · AI Image & Video</div>
          <h1 className="case-title dsp">Thiên Kim</h1>
          <p className="case-blurb">
            A self-directed virtual-character project built to explore repeatable AI
            image and short-form video production. The challenge is not generating one
            attractive frame; it is keeping a recognizable character, visual language,
            camera logic and motion direction coherent across many outputs.
          </p>
          <div className="project-case-actions">
            <a className="btn btn-accent" href={TIKTOK} target="_blank" rel="noopener noreferrer">
              View TikTok output ↗
            </a>
            <Link className="btn btn-ghost" href="/work">
              View full work
            </Link>
          </div>
        </div>

        <figure className="case-hero-media case-hero-portrait">
          <img src="/projects/thien-kim-cover.svg" alt="Frame from a Thiên Kim AI-generated short-form video" />
          <figcaption className="case-caption mono">AI-generated video frame · 9:16 source</figcaption>
        </figure>
      </header>

      <section className="case-media-intro">
        <div className="case-detail-head">
          <div className="work-cat mono">Video output</div>
          <h2 className="dsp">The proof is the character surviving changes in scene, styling and motion.</h2>
          <p className="case-long-copy">
            These are frames taken from generated short-form video outputs used in the
            project—not photography placeholders. The live TikTok channel contains the
            moving versions; the portfolio keeps lightweight frames so the case study
            remains fast to load.
          </p>
        </div>
        <div className="tk-output-grid">
          <figure className="case-media-card tk-output-main">
            <img src="/projects/thien-kim-country.jpg" alt="Thiên Kim AI video frame in an outdoor rural scene" />
            <figcaption><b>Environment shift</b><span>Identity + outfit + outdoor scene</span></figcaption>
          </figure>
          <figure className="case-media-card">
            <img src="/projects/thien-kim-cover.svg" alt="Thiên Kim AI video frame used as the project cover" />
            <figcaption><b>Short-form framing</b><span>Vertical composition designed for social video</span></figcaption>
          </figure>
          <figure className="case-media-card tk-output-crop">
            <img src="/projects/thien-kim-country.jpg" alt="Closer crop of a Thiên Kim AI video frame for identity review" />
            <figcaption><b>Identity review</b><span>Face consistency checked beyond one hero frame</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="case-story-grid">
        <div className="case-story-block">
          <div className="work-cat mono">Problem</div>
          <h2 className="dsp">AI output drifts unless the visual system is explicit.</h2>
          <p>
            Face identity, body proportion, camera distance, styling and props can
            change between generations. Video adds another layer: motion can break the
            character even when the first frame is correct.
          </p>
        </div>
        <div className="case-story-block">
          <div className="work-cat mono">My role</div>
          <h2 className="dsp">Art direction, prompt systems, shot design and workflow iteration.</h2>
          <p>
            I defined the character rules, planned vertical short-form scenes, tested
            repeatable content structures and iterated automation workflows for prompt
            routing, reference handling and image-to-video preparation.
          </p>
        </div>
      </section>

      <section className="case-detail-section">
        <div className="case-detail-head">
          <div className="work-cat mono">Production system</div>
          <h2 className="dsp">From a visual reference to a reusable short-form workflow.</h2>
        </div>
        <div className="ai-pipeline">
          <div><span>01</span><b>Identity rules</b><p>Character style, exclusions, portrait consistency and 9:16 output constraints.</p></div>
          <div><span>02</span><b>Content direction</b><p>Lifestyle, street, cafe, park, close-up and transition patterns selected around a content type.</p></div>
          <div><span>03</span><b>Shot planning</b><p>Short videos are planned as timed shot sequences instead of asking a model for one vague continuous action.</p></div>
          <div><span>04</span><b>Video routing</b><p>Ratio-aware and reference-based prompt preparation helps translate a chosen visual mechanic into image-to-video output.</p></div>
        </div>
      </section>

      <section className="case-detail-section case-evidence-split">
        <div>
          <div className="work-cat mono">Consistency rules</div>
          <h2 className="dsp">The visual brief became a reusable constraint system.</h2>
          <p className="case-long-copy">
            Instead of treating each generation as a blank prompt, I kept a set of
            repeatable decisions around face priority, body proportion, camera
            distance, framing, outfit readability and unwanted props. Those rules are
            revised when a model repeatedly fails in the same way.
          </p>
        </div>
        <div className="case-proof-stack">
          <div><b>Identity first</b><p>Face and recognizable character features take priority over decorative scene detail.</p></div>
          <div><b>Camera logic</b><p>Medium/full-body framing, distance and lens feel are specified so the subject does not unpredictably rush toward camera.</p></div>
          <div><b>Shot-sized prompts</b><p>Motion is broken into short, legible actions that are easier to evaluate and regenerate.</p></div>
          <div><b>Failure-driven revisions</b><p>Recurring face, prop or framing errors become explicit negative constraints in later iterations.</p></div>
        </div>
      </section>

      <section className="case-detail-section">
        <div className="case-detail-head">
          <div className="work-cat mono">Workflow evolution</div>
          <h2 className="dsp">The workflow itself became part of the design work.</h2>
        </div>
        <div className="case-decision-grid">
          <div>
            <b>Content Planner</b>
            <p>Structured short-form plans with explicit shot durations and vertical output instead of one undifferentiated prompt.</p>
          </div>
          <div>
            <b>Direction / reference routing</b>
            <p>Reusable visual mechanics are separated from unsupported claims about live trends or performance data.</p>
          </div>
          <div>
            <b>Video prompt preparation</b>
            <p>Reference, ratio and motion instructions are normalized before sending a shot into image-to-video generation.</p>
          </div>
          <div>
            <b>Automation iteration</b>
            <p>n8n is used to reduce repeated formatting and routing work while visual judgment stays manual.</p>
          </div>
        </div>
      </section>

      <section className="case-detail-section case-result-section">
        <div>
          <div className="work-cat mono">What this demonstrates</div>
          <h2 className="dsp">AI video as a design workflow, not a one-click effect.</h2>
        </div>
        <div className="case-proof-list">
          <span>Virtual-character art direction</span>
          <span>AI image & image-to-video workflows</span>
          <span>Short-form shot planning</span>
          <span>n8n workflow design</span>
          <span>Prompt / reference iteration</span>
          <span>TikTok-ready vertical output</span>
        </div>
      </section>

      <section className="case-media-note">
        <div>
          <div className="work-cat mono">Published output</div>
          <h2 className="dsp">See the moving image/video experiments on TikTok.</h2>
          <p>
            I link to the live channel rather than publishing unverified view or growth
            numbers. The case study focuses on the production system and visual output
            that can be inspected directly.
          </p>
        </div>
        <a className="btn btn-accent" href={TIKTOK} target="_blank" rel="noopener noreferrer">
          Open @tieu.thienkim ↗
        </a>
      </section>

      <div className="case-next">
        <Link className="view-all" href="/projects/co-giao-ai">
          Next case study: Cô Giáo AI →
        </Link>
      </div>
    </article>
  );
}
