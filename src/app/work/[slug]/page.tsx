import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { caseStudies } from "@/data/case-studies";
import { CaseStudyHero } from "./case-study-hero";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = projects[idx];
  const cs = caseStudies[slug];
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft size={14} /> Back to Work
      </Link>

      <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
        {project.title}
      </h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        {project.tags.map((tag) => (
          <span key={tag} className="tag-chip">{tag}</span>
        ))}
        <span className="tag-chip">{project.year}</span>
      </div>

      <p className="text-muted-foreground text-lg mb-12 leading-relaxed max-w-2xl">
        {cs?.hero ?? project.description}
      </p>

      <div className="mb-16 rounded-2xl overflow-hidden border border-border">
        <CaseStudyHero slug={slug} />
      </div>

      {cs ? (
        <div className="space-y-20">
          {/* Challenge */}
          <section>
            <h2 className="text-2xl font-bold mb-5">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {cs.challenge}
            </p>
          </section>

          {/* Process */}
          <section>
            <h2 className="text-2xl font-bold mb-10">Process</h2>
            <div className="space-y-8">
              {cs.process.map((step, i) => (
                <div key={step.title} className="flex gap-5">
                  <div className="step-number">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Solution */}
          <section>
            <h2 className="text-2xl font-bold mb-5">Solution</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {cs.solution}
            </p>
          </section>

          {/* Results */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cs.results.map((r) => (
                <div
                  key={r}
                  className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border"
                >
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                  <span className="text-muted-foreground text-sm">{r}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section>
            <h2 className="text-2xl font-bold mb-5">Tools Used</h2>
            <div className="flex flex-wrap gap-3">
              {cs.tools.map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 rounded-xl bg-surface border border-border text-sm text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
          <p className="text-muted-foreground">Case study content coming soon.</p>
        </div>
      )}

      {/* Next project */}
      <div className="mt-24 pt-10 border-t border-border">
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-muted-foreground mb-1">Next project</p>
            <p className="text-xl font-semibold group-hover:text-accent transition-colors">
              {next.title}
            </p>
          </div>
          <ArrowRight
            size={20}
            className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all"
          />
        </Link>
      </div>
    </div>
  );
}
