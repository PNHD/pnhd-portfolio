import Link from "next/link";
import type { Metadata } from "next";
import { WorkGallery } from "@/components/work-gallery";
import { independentProjects } from "@/data/independent-projects";
import { refreshedSiteConfig } from "@/data/portfolio-refresh";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected independent products plus a broader archive across digital design, product UI, motion, 3D, illustration and icon systems.",
  alternates: { canonical: "/work" },
};

export default function Work() {
  return (
    <div className="archive wrap case">
      <Link className="case-back" href="/#work">
        ← Back home
      </Link>

      <div className="arch-head reveal">
        <div className="kicker">Full Work</div>
        <h1 className="case-title dsp">
          Products, interfaces and visual experiments.
        </h1>
        <p className="case-blurb">
          A broader view of my work beyond the homepage selection: shipped personal
          products, web and product UI, motion, 3D, illustration and icon systems.
          Practice, copywork and tutorial-based studies stay labeled where relevant.
        </p>
      </div>

      <section className="archive-projects" aria-labelledby="archive-products-title">
        <div className="archive-section-head reveal">
          <div>
            <div className="work-cat mono">Independent Products</div>
            <h2 id="archive-products-title" className="dsp">
              Self-directed work with real product depth.
            </h2>
          </div>
          <p>
            These projects show product thinking, systems design and implementation
            alongside the visual portfolio.
          </p>
        </div>
        <div className="project-grid compact-project-grid">
          {independentProjects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className={`project-visual project-visual-${index + 1}`}>
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
                  {project.liveHref ? (
                    <a href={project.liveHref} target="_blank" rel="noopener noreferrer">
                      Open live product ↗
                    </a>
                  ) : null}
                  <a href={project.repoHref} target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
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
              Browse by discipline.
            </h2>
          </div>
          <p>
            A larger archive of earlier visual work and studies. Cards open their
            original source posts for context.
          </p>
        </div>
        <WorkGallery />
        <div className="archive-source-link mono">
          <a
            href={refreshedSiteConfig.links.dribbble}
            target="_blank"
            rel="noopener noreferrer"
          >
            Dribbble profile ↗
          </a>
        </div>
      </section>
    </div>
  );
}
