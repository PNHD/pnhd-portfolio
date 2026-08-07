import Link from "next/link";
import type { Metadata } from "next";
import { WorkGallery } from "@/components/work-gallery";
import { independentProjects } from "@/data/independent-projects";
import { portfolioEvidence, refreshedSiteConfig } from "@/data/portfolio-refresh";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Independent projects plus 89 source-linked visual works across digital design, product UI, motion, 3D, illustration and icon systems.",
  alternates: { canonical: "/work" },
};

export default function Work() {
  return (
    <div className="archive wrap case">
      <Link className="case-back" href="/#work">
        ← Back home
      </Link>

      <div className="arch-head reveal">
        <div className="kicker">Full Work Archive</div>
        <h1 className="case-title dsp">
          Products, interfaces and visual craft across formats.
        </h1>
        <p className="case-blurb">
          Start with the independent projects for deeper product and production context,
          then browse {portfolioEvidence.dribbbleShotCount} source-linked visual works
          across digital/web design, product UI, motion, 3D, illustration and icon systems.
          Earlier studies remain labeled as studies rather than client work.
        </p>
        <div className="hero-role-line archive-proof-line" aria-label="Archive coverage">
          <span>{portfolioEvidence.dribbbleShotCount} source-linked works</span>
          <span>3 independent case studies</span>
          <span>No invented client outcomes</span>
        </div>
      </div>

      <section className="archive-projects" aria-labelledby="archive-products-title">
        <div className="archive-section-head reveal">
          <div>
            <div className="work-cat mono">Independent Projects</div>
            <h2 id="archive-products-title" className="dsp">
              Deeper work: problem framing, systems and execution.
            </h2>
          </div>
          <p>
            These projects show product thinking, visual direction, AI production
            workflows and implementation alongside the broader visual archive.
          </p>
        </div>
        <div className="project-grid compact-project-grid">
          {independentProjects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className={`project-visual project-visual-${index + 1} project-visual-thumb`}>
                <img
                  className="project-thumb-img"
                  src={project.thumbnail}
                  alt={project.thumbnailAlt}
                  loading="lazy"
                />
                <div className="project-visual-top mono">
                  <span>Independent / 0{index + 1}</span>
                  <span>2026</span>
                </div>
                <div className="project-visual-center">
                  <span className="project-mark" aria-hidden="true" />
                  <strong className="dsp">{project.accent}</strong>
                </div>
                <div className="project-visual-lines" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="project-body">
                <div className="project-eyebrow mono">{project.eyebrow}</div>
                <h3 className="dsp">{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-links">
                  {project.caseHref ? <Link href={project.caseHref}>View case study →</Link> : null}
                  {project.liveHref ? (
                    <a href={project.liveHref} target="_blank" rel="noopener noreferrer">
                      {project.title === "Thiên Kim" ? "View TikTok ↗" : "Open live product ↗"}
                    </a>
                  ) : null}
                  {project.repoHref ? (
                    <a href={project.repoHref} target="_blank" rel="noopener noreferrer">
                      GitHub ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="archive-visual" aria-labelledby="visual-archive-title">
        <div className="archive-section-head reveal">
          <div>
            <div className="work-cat mono">Visual Archive</div>
            <h2 id="visual-archive-title" className="dsp">
              Browse the full visual range by discipline.
            </h2>
          </div>
          <p>
            Every card keeps its own thumbnail, category and source link. Use the filters
            to move between digital/web, product UI, motion, 3D/illustration and icon-system work.
          </p>
        </div>
        <WorkGallery />
        <div className="archive-source-link mono">
          <a
            href={refreshedSiteConfig.links.dribbble}
            target="_blank"
            rel="noopener noreferrer"
          >
            Original Dribbble archive ↗
          </a>
        </div>
      </section>
    </div>
  );
}
