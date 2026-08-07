import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thiên Kim — AI Visual & Video Case Study",
  description:
    "Mini case study for Thiên Kim: virtual-character art direction, short-form AI image/video production, shot planning and repeatable n8n workflows.",
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

        <div className="ai-video-preview" aria-label="Thiên Kim short-form video workflow preview">
          <div className="ai-phone ai-phone-a">
            <span className="mono">9:16</span>
            <b>Character lock</b>
            <small>identity · outfit · camera</small>
          </div>
          <div className="ai-phone ai-phone-b">
            <span className="mono">6–12s</span>
            <b>Shot plan</b>
            <small>3–4 shots · timed motion</small>
          </div>
          <div className="ai-phone ai-phone-c">
            <span className="mono">I2V</span>
            <b>Video direction</b>
            <small>mimic · ratio · prompt routing</small>
          </div>
        </div>
      </header>

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
            repeatable content structures and iterated automation workflows for trend
            direction, prompt routing and image-to-video preparation.
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
          <div><span>04</span><b>Video routing</b><p>Ratio-aware and reference-mimic prompt preparation helps translate a chosen visual mechanic into image-to-video output.</p></div>
        </div>
      </section>

      <section className="case-detail-section">
        <div className="case-detail-head">
          <div className="work-cat mono">Workflow evolution</div>
          <h2 className="dsp">The workflow itself became part of the design work.</h2>
        </div>
        <div className="case-decision-grid">
          <div>
            <b>Content Planner v7.4</b>
            <p>Structured short-form content plans with explicit shot durations and vertical 9:16 output.</p>
          </div>
          <div>
            <b>Trend Analyzer v7.9</b>
            <p>Routes reusable visual mechanics and content types without pretending to know live trend charts when no live data is available.</p>
          </div>
          <div>
            <b>Video Prompt Optimizer v8.2</b>
            <p>Adds ratio-aware reference mimic and video prompt preparation for short-form generation.</p>
          </div>
          <div>
            <b>Mimic Anchor Workflow v8.3</b>
            <p>Refines anchor prompts and leaner structured outputs for more repeatable production.</p>
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
          <h2 className="dsp">See the current image and video experiments on TikTok.</h2>
          <p>
            I link to the live channel instead of displaying unverified view counts.
            Individual video embeds can be added later when source MP4 files are
            available, without changing the case-study structure.
          </p>
        </div>
        <a className="btn btn-accent" href={TIKTOK} target="_blank" rel="noopener noreferrer">
          Open @tieu.thienkim ↗
        </a>
      </section>

      <div className="case-next">
        <Link className="view-all" href="/projects/wwm-build-lab">
          Previous case study: WWM Build Lab →
        </Link>
      </div>
    </article>
  );
}
