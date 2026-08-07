import Link from "next/link";
import type { Metadata } from "next";
import { ThienKimContinuity } from "@/components/thien-kim-continuity";
import { ThienKimProduction } from "@/components/thien-kim-production";
import { ThienKimSystem } from "@/components/thien-kim-system";

export const metadata: Metadata = {
  title: "Thiên Kim — AI Image & Video Workflow Case Study",
  description:
    "Independent case study for Thiên Kim: a virtual-character image and video workflow focused on identity continuity, outfit variation, shot planning, routing and quality control.",
  alternates: { canonical: "/projects/thien-kim" },
};

const TIKTOK = "https://www.tiktok.com/@tieu.thienkim";

const looks = [
  {
    src: "https://drive.usercontent.google.com/download?id=1ayj0R_NkqpvD0YcbFBkXPLr8FbsBhY9s",
    alt: "Thiên Kim in a floral dress in a sunlit stone alley, framed as a close portrait",
    label: "Floral / close portrait",
    featured: true,
  },
  {
    src: "https://drive.usercontent.google.com/download?id=11PHZFe0-FRdAVMsNewSz4-w9VWEmYg8x",
    alt: "Thiên Kim in a white top with wide light-blue denim at a bright cafe exterior",
    label: "White + wide denim",
  },
  {
    src: "https://drive.usercontent.google.com/download?id=1u3329z6BU6jP_YmnVK9m1L4eH0bIP1EI",
    alt: "Thiên Kim in a white graphic T-shirt and denim shorts on a quiet sunlit street",
    label: "Casual streetwear",
  },
  {
    src: "https://drive.usercontent.google.com/download?id=1R0KlDUDras-64z-8PSuoMnu0Z4oyr3CO",
    alt: "Thiên Kim in a white dress with a cropped pink jacket and double ponytails",
    label: "Feminine styling",
  },
  {
    src: "https://drive.usercontent.google.com/download?id=1lXeHIPsfrV382Vqwb8p8j7EF0xq-q84F",
    alt: "Thiên Kim in a strawberry graphic T-shirt with a red skirt and red sneakers",
    label: "Graphic OOTD",
  },
  {
    src: "https://drive.usercontent.google.com/download?id=1btczxvvj0mKAzKKrO4NeE9HNOlk9SHTg",
    alt: "Thiên Kim in a black devil-inspired costume with small red horns",
    label: "Costume variation",
  },
  {
    src: "https://drive.usercontent.google.com/download?id=1xBiPH24nnV6b6gSiCJDx6v3LGekce9Fv",
    alt: "Thiên Kim in a white top and pale blue skirt on a bright street",
    label: "Clean daytime look",
  },
  {
    src: "https://drive.usercontent.google.com/download?id=18xoTPqqK7Xxb3I3hWTKKCwKNkrGorcpm",
    alt: "Thiên Kim in a white top and pale blue skirt in a softly lit interior",
    label: "Interior variation",
  },
] as const;

const videos = [
  {
    src: "https://drive.usercontent.google.com/download?id=1FSgo_YQCRYY907xrabYkrCMol6VxGWl3",
    poster: "https://drive.usercontent.google.com/download?id=1K_yV-k2-4EHNlzEEdAa59gUHBwjmusPp",
    title: "Green look",
    note: "Short-form styling and motion output.",
  },
  {
    src: "https://drive.usercontent.google.com/download?id=1GQRzMz1h5U-d93HiRvKizieAYtAfYCKl",
    poster: "https://drive.usercontent.google.com/download?id=1o82AlMg23vINl4j39SpaYiy5vJRofMwf",
    title: "Country AI",
    note: "Location, styling and movement variation.",
  },
  {
    src: "https://drive.usercontent.google.com/download?id=1XHyxvtPiEg5o3jkBjJBfEd-tPw_Muj8V",
    poster: "https://drive.usercontent.google.com/download?id=18ggG_D4YStPaFNcJuhLTrutRaOoPz48C",
    title: "Tuscany",
    note: "A longer vertical motion sequence built around a consistent look.",
  },
  {
    src: "https://drive.usercontent.google.com/download?id=1VtbS3MqYhTvRA3yGVI7UOkD5C6sKIOoL",
    poster: "https://drive.usercontent.google.com/download?id=1SuIkFzxJWdczMMf-lSo4OXIR-fLCYlqX",
    title: "White lace",
    note: "A styling-led image-to-video output.",
  },
] as const;

export default function ThienKimCaseStudy() {
  return (
    <article className="project-case wrap case thien-kim-case">
      <Link className="case-back" href="/#projects">
        ← Back to projects
      </Link>

      <header className="project-case-hero project-case-hero-media">
        <div className="case-hero-copy">
          <div className="kicker">Independent project · AI image + video workflow</div>
          <h1 className="case-title dsp">Thiên Kim</h1>
          <p className="case-blurb">
            A virtual-character content system exploring repeatable AI image and
            short-form video production through identity continuity, outfit variation,
            shot planning and workflow design.
          </p>

          <div className="case-facts" aria-label="Project facts">
            <div className="case-fact">
              <span className="mono">Project</span>
              <b>Self-directed</b>
            </div>
            <div className="case-fact">
              <span className="mono">Focus</span>
              <b>Identity continuity</b>
            </div>
            <div className="case-fact">
              <span className="mono">Format</span>
              <b>Image + short-form video</b>
            </div>
            <div className="case-fact">
              <span className="mono">System</span>
              <b>Planning + routing + QC</b>
            </div>
          </div>

          <div className="project-case-actions">
            <a className="btn btn-accent" href={TIKTOK} target="_blank" rel="noopener noreferrer">
              View @tieu.thienkim ↗
            </a>
            <Link className="btn btn-ghost" href="/work">
              View full work
            </Link>
          </div>
        </div>

        <figure className="case-hero-media-block">
          <div className="case-hero-frame tk-hero-frame">
            <img
              src="https://drive.usercontent.google.com/download?id=1WfukRCEWLP9WIcfmv3L53zr70uii2Gs_"
              alt="Editorial collage of Thiên Kim across several outfits and image-generation looks"
              fetchPriority="high"
            />
            <div className="case-media-hud mono" aria-hidden="true">
              <span>SELECTED LOOKS</span>
              <span>IMAGE + VIDEO SYSTEM</span>
            </div>
          </div>
          <figcaption>
            Selected project outputs assembled into one cover to show the character
            across multiple styling directions rather than relying on a single frame.
          </figcaption>
        </figure>
      </header>

      <nav className="case-jump" aria-label="Thiên Kim case study sections">
        <a href="#brief">Overview</a>
        <a href="#visual-range">Visual range</a>
        <a href="#continuity">Continuity</a>
        <a href="#production">Workflow</a>
        <a href="#routing">Routing</a>
        <a href="#quality">QC</a>
        <a href="#video-outputs">Video</a>
        <a href="#system">Tools</a>
      </nav>

      <section className="case-story-grid" id="brief">
        <div className="case-story-block">
          <div className="work-cat mono">Problem</div>
          <h2 className="dsp">A strong generated frame is not enough.</h2>
          <p>
            The project needs one recognizable character to survive changes in outfit,
            hair, environment, framing and motion. The design problem is deciding what
            should stay locked, what can vary, and when an output should be rejected.
          </p>
        </div>
        <div className="case-story-block">
          <div className="work-cat mono">My role</div>
          <h2 className="dsp">Art direction, shot planning and workflow design.</h2>
          <p>
            I define the identity anchors, styling direction, shot logic, prompt and
            reference strategy, production routing and review criteria, then use those
            rules to build repeatable image and short-form video outputs.
          </p>
        </div>
      </section>

      <section className="case-detail-section tk-visual-section" id="visual-range">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Visual range</div>
            <h2 className="dsp">One identity, deliberately different looks.</h2>
          </div>
          <p className="case-section-lede">
            These selected outputs show the working range of the character across
            casual streetwear, feminine styling, costume, interior and outdoor scenes,
            while keeping the same core identity readable across styling changes.
          </p>
        </div>

        <div className="tk-look-grid">
          {looks.map((look) => (
            <figure className={`tk-look${look.featured ? " tk-look-featured" : ""}`} key={look.src}>
              <img src={look.src} alt={look.alt} loading="lazy" decoding="async" />
              <figcaption className="mono">{look.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <ThienKimContinuity />
      <ThienKimProduction />

      <section className="case-detail-section tk-video-section" id="video-outputs">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Selected video outputs</div>
            <h2 className="dsp">The motion work is shown in the case study itself.</h2>
          </div>
          <p className="case-section-lede">
            Four project videos are embedded directly here so the work can be reviewed
            without depending on a social link. Each file is web-optimized while the
            public TikTok remains available as additional context.
          </p>
        </div>

        <div className="tk-video-grid">
          {videos.map((video) => (
            <figure className="tk-video-card" key={video.src}>
              <div className="tk-video-stage">
                <video
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  poster={video.poster}
                  aria-label={`Thiên Kim video output: ${video.title}`}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              </div>
              <figcaption>
                <strong>{video.title}</strong>
                <span>{video.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <ThienKimSystem />

      <section className="case-detail-section case-result-section">
        <div>
          <div className="work-cat mono">What this demonstrates</div>
          <h2 className="dsp">AI media treated as a designed production system.</h2>
        </div>
        <div className="case-proof-list">
          <span>Virtual-character direction</span>
          <span>Identity continuity rules</span>
          <span>Outfit and scene variation</span>
          <span>Short-form shot planning</span>
          <span>Reference-led image generation</span>
          <span>Image-to-video direction</span>
          <span>Workflow routing</span>
          <span>Structured quality control</span>
        </div>
      </section>

      <section className="case-output-feature" id="output">
        <div className="case-output-image">
          <img
            src="https://drive.usercontent.google.com/download?id=1ayj0R_NkqpvD0YcbFBkXPLr8FbsBhY9s"
            alt="Thiên Kim in a floral dress in a sunlit stone alley"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="case-output-copy">
          <div className="work-cat mono">Public output</div>
          <h2 className="dsp">See the project in its short-form context.</h2>
          <p>
            The case study shows the system and selected media directly. The TikTok
            account is linked as the public short-form channel for additional project
            context and published outputs.
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
