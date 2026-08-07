import Link from "next/link";
import type { Metadata } from "next";
import { ThienKimContinuity } from "@/components/thien-kim-continuity";
import { ThienKimProduction } from "@/components/thien-kim-production";
import { ThienKimSystem } from "@/components/thien-kim-system";

export const metadata: Metadata = {
  title: "Thiên Kim — AI Visual & Video Case Study",
  description:
    "Case study for Thiên Kim: virtual-character art direction, continuity rules, short-form shot planning, AI image/video routing, QC and an n8n + Google Sheets production system.",
  alternates: { canonical: "/projects/thien-kim" },
};

const TIKTOK = "https://www.tiktok.com/@tieu.thienkim";

export default function ThienKimCaseStudy() {
  return (
    <article className="project-case wrap case thien-kim-case">
      <Link className="case-back" href="/#projects">
        ← Back to projects
      </Link>

      <header className="project-case-hero project-case-hero-media">
        <div className="case-hero-copy">
          <div className="kicker">Independent Project · AI Image &amp; Video</div>
          <h1 className="case-title dsp">Thiên Kim</h1>
          <p className="case-blurb">
            A self-directed virtual-character system for repeatable image and short-form
            video production. The core design problem is continuity: preserve a
            recognizable person and visual language while still allowing outfits,
            locations, camera angles and motion to change from shot to shot.
          </p>

          <div className="case-facts" aria-label="Project facts">
            <div className="case-fact">
              <span className="mono">Focus</span>
              <b>Character continuity</b>
            </div>
            <div className="case-fact">
              <span className="mono">Format</span>
              <b>Vertical short-form</b>
            </div>
            <div className="case-fact">
              <span className="mono">System</span>
              <b>n8n + Sheets</b>
            </div>
            <div className="case-fact">
              <span className="mono">Workflow</span>
              <b>v8.3</b>
            </div>
          </div>

          <div className="project-case-actions">
            <a className="btn btn-accent" href={TIKTOK} target="_blank" rel="noopener noreferrer">
              View published output ↗
            </a>
            <Link className="btn btn-ghost" href="/work">
              View full work
            </Link>
          </div>
        </div>

        <figure className="case-hero-media-block">
          <div className="case-hero-frame">
            <img
              src="/projects/thien-kim-collage.webp"
              alt="Editorial collage showing Thiên Kim across multiple OOTD looks"
            />
            <div className="case-media-hud mono" aria-hidden="true">
              <span>VISUAL RANGE / OOTD</span>
              <span>AI CHARACTER</span>
            </div>
          </div>
          <figcaption>
            A sharper project cover built from multiple Thiên Kim looks to show styling
            range and character consistency at a glance.
          </figcaption>
        </figure>
      </header>

      <nav className="case-jump" aria-label="Thiên Kim case study sections">
        <a href="#brief">Brief</a>
        <a href="#continuity">Continuity</a>
        <a href="#production">Production</a>
        <a href="#routing">Routing</a>
        <a href="#quality">QC</a>
        <a href="#system">System</a>
        <a href="#output">Output</a>
      </nav>

      <section className="case-story-grid" id="brief">
        <div className="case-story-block">
          <div className="work-cat mono">Problem</div>
          <h2 className="dsp">A good first frame is not enough.</h2>
          <p>
            Generative output can drift in face identity, body proportion, hair,
            wardrobe, props, background and camera logic. Motion adds another failure
            mode: a still image can look correct while the animated result breaks the
            character a second later.
          </p>
        </div>
        <div className="case-story-block">
          <div className="work-cat mono">My role</div>
          <h2 className="dsp">Art direction, shot logic, prompt systems and workflow design.</h2>
          <p>
            I defined the continuity rules, planned shot packs, built reference and
            prompt-routing logic, structured QC fields and iterated an n8n + Google
            Sheets production workflow around the way the media is actually made.
          </p>
        </div>
      </section>

      <ThienKimContinuity />
      <ThienKimProduction />
      <ThienKimSystem />

      <section className="case-detail-section case-result-section">
        <div>
          <div className="work-cat mono">What this demonstrates</div>
          <h2 className="dsp">AI video treated as a design system, not a one-click effect.</h2>
        </div>
        <div className="case-proof-list">
          <span>Virtual-character art direction</span>
          <span>Reference continuity design</span>
          <span>Short-form shot planning</span>
          <span>AI image &amp; I2V direction</span>
          <span>Trend / mimic routing</span>
          <span>n8n workflow design</span>
          <span>Structured QC</span>
          <span>Production tracking</span>
        </div>
      </section>

      <section className="case-output-feature" id="output">
        <div className="case-output-image" aria-hidden="true">
          <img src="/projects/thien-kim-collage.webp" alt="" />
        </div>
        <div className="case-output-copy">
          <div className="work-cat mono">Published output</div>
          <h2 className="dsp">The live channel is the proof layer for current image and video experiments.</h2>
          <p>
            The portfolio links to the actual TikTok account rather than fabricating
            view counts or campaign outcomes. The system can evolve while the public
            output remains directly inspectable.
          </p>
          <a className="btn btn-accent" href={TIKTOK} target="_blank" rel="noopener noreferrer">
            Open @tieu.thienkim ↗
          </a>
        </div>
      </section>

      <div className="case-next case-next-split">
        <Link className="view-all" href="/projects/wwm-build-lab">
          ← Previous: WWM Build Lab
        </Link>
        <Link className="view-all" href="/projects/wwm-homestead">
          Next: WWM Homestead Planner →
        </Link>
      </div>
    </article>
  );
}
