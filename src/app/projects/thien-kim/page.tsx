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
    src: "/projects/thien-kim/look-floral.webp",
    alt: "Thiên Kim in a floral dress in a sunlit stone alley, framed as a close portrait",
    label: "Floral / close portrait",
    featured: true,
  },
  {
    src: "/projects/thien-kim/look-white-denim.webp",
    alt: "Thiên Kim in a white top with wide light-blue denim at a bright cafe exterior",
    label: "White + wide denim",
  },
  {
    src: "/projects/thien-kim/look-casual-street.webp",
    alt: "Thiên Kim in a white graphic T-shirt and denim shorts on a quiet sunlit street",
    label: "Casual streetwear",
  },
  {
    src: "/projects/thien-kim/look-pink.webp",
    alt: "Thiên Kim in a white dress with a cropped pink jacket and double ponytails",
    label: "Feminine styling",
  },
  {
    src: "/projects/thien-kim/look-strawberry.webp",
    alt: "Thiên Kim in a strawberry graphic T-shirt with a red skirt and red sneakers",
    label: "Graphic OOTD",
  },
  {
    src: "/projects/thien-kim/look-devil.webp",
    alt: "Thiên Kim in a black devil-inspired costume with small red horns",
    label: "Costume variation",
  },
  {
    src: "/projects/thien-kim/look-blue-street.webp",
    alt: "Thiên Kim in a white top and pale blue shorts on a bright outdoor set",
    label: "Clean daytime look",
  },
  {
    src: "/projects/thien-kim/look-blue-home.webp",
    alt: "Thiên Kim in a white top and pale blue shorts in a softly lit interior",
    label: "Interior variation",
  },
] as const;

const videos = [
  {
    src: "/projects/thien-kim/video-green.mp4",
    poster: "/projects/thien-kim/video-green-poster.webp",
    title: "Green look",
    note: "Short-form styling and motion output.",
  },
  {
    src: "/projects/thien-kim/video-country.mp4",
    poster: "/projects/thien-kim/video-country-poster.webp",
    title: "Country AI",
    note: "Location, styling and movement variation.",
  },
  {
    src: "/projects/thien-kim/video-tuscany.mp4",
    poster: "/projects/thien-kim/video-tuscany-poster.webp",
    title: "Tuscany",
    note: "A longer vertical motion sequence built around a consistent look.",
  },
  {
    src: "/projects/thien-kim/video-white-lace.mp4",
    poster: "/projects/thien-kim/video-white-lace-poster.webp",
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
              src="/projects/thien-kim-collage.webp"
              alt="Editorial collage of Thiên Kim across several outfits and image-generation looks"
              fetchPriority="high"
            />
            <div className="case-media-hud mono" aria-hidden="true">
              <span>SELECTED LOOKS</span>
              <span>IMAGE + VIDEO SYSTEM</span>
            </div>
          </div>
          <figcaption>
            Multiple styling directions are shown together so character range is visible
            before the workflow details.
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
            should stay locked, what can vary and when an output should be rejected.
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
            Selected outputs span casual streetwear, feminine styling, costume,
            interior and outdoor scenes while keeping the same character identity
            readable across styling changes.
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
            without depending on a social link. Video files use local portfolio assets;
            TikTok remains available as additional public context.
          </p>
        </div>

        <div className="tk-video-grid">
          {videos.map((video) => (
            <figure className="tk-video-card" key={video.src}>
              <div className="tk-video-stage">
                <video
                  controls
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
            src="/projects/thien-kim/look-floral.webp"
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
