import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Check } from "lucide-react";
import { projects } from "@/data/portfolio";
import { caseStudies } from "@/data/case-studies";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

// CSS-art per project (shared with homepage cards — see globals.css .ed-art-*)
const projectArt: Record<string, string> = {
  "nova-ui-kit": "ed-art-nova",
  "meditation-app": "ed-art-serenity",
  "analytics-dashboard": "ed-art-pulse",
  "3d-landing-page": "ed-art-elevate",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = projects[idx];
  const cs = caseStudies[slug];
  const next = projects[(idx + 1) % projects.length];
  const art = projectArt[slug] ?? "ed-art-nova";

  return (
    <div className="ed ed-case">
      <div className="ed-case-wrap">
        <Link href="/#work" className="ed-case-back">
          <ArrowLeft size={14} /> Back to Work
        </Link>

        <div className="ed-section-label">
          <span className="num">{project.year}</span> Case Study
        </div>
        <h1 className="ed-case-title">{project.title}</h1>

        <div className="ed-case-meta">
          {project.tags.map((tag) => (
            <span key={tag} className="ed-tag">{tag}</span>
          ))}
          {project.externalLink && (
            <a
              href={project.externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ed-case-buy"
            >
              {project.externalLink.label} <ExternalLink size={12} />
            </a>
          )}
        </div>

        <p className="ed-case-lead">{cs?.hero ?? project.description}</p>

        <div className="ed-case-hero">
          <div className={`ed-art ${art}`} />
        </div>

        {cs && (
          <>
            <section className="ed-case-section">
              <h2>The <span className="ed-serif">Challenge</span></h2>
              <p>{cs.challenge}</p>
            </section>

            <section className="ed-case-section">
              <h2><span className="ed-serif">Process</span></h2>
              <div className="ed-case-steps">
                {cs.process.map((step, i) => (
                  <div key={step.title} className="ed-case-step">
                    <div className="ed-case-num">{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="ed-case-section">
              <h2>The <span className="ed-serif">Solution</span></h2>
              <p>{cs.solution}</p>
            </section>

            <section className="ed-case-section">
              <h2><span className="ed-serif">Results</span></h2>
              <ul className="ed-results">
                {cs.results.map((r) => (
                  <li key={r}><Check size={16} /> {r}</li>
                ))}
              </ul>
            </section>

            <section className="ed-case-section">
              <h2><span className="ed-serif">Tools</span></h2>
              <div className="ed-tools">
                {cs.tools.map((t) => (
                  <span key={t} className="ed-tool">{t}</span>
                ))}
              </div>
            </section>
          </>
        )}

        <Link href={`/work/${next.slug}`} className="ed-case-next">
          <div>
            <div className="ed-case-next-label">Next Project</div>
            <div className="ed-case-next-title">{next.title}</div>
          </div>
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
