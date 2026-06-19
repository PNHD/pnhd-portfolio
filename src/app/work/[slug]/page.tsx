import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const cs = caseStudies[slug];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={14} /> Back to Work
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
          >
            {tag}
          </span>
        ))}
        <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
          {project.year}
        </span>
      </div>

      <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
        {cs?.hero ?? project.description}
      </p>

      <CaseStudyHero slug={slug} />

      {cs ? (
        <div className="space-y-16">
          {/* Challenge */}
          <section>
            <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">{cs.challenge}</p>
          </section>

          {/* Process */}
          <section>
            <h2 className="text-2xl font-bold mb-8">Process</h2>
            <div className="space-y-6">
              {cs.process.map((step, i) => (
                <div key={step.title} className="flex gap-5">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Solution */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Solution</h2>
            <p className="text-muted-foreground leading-relaxed">{cs.solution}</p>
          </section>

          {/* Results */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <ul className="space-y-3">
              {cs.results.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span className="text-muted-foreground">{r}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tools */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Tools Used</h2>
            <div className="flex flex-wrap gap-2">
              {cs.tools.map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 rounded-xl bg-muted text-sm text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <h2>The Challenge</h2>
          <p className="text-muted-foreground">Case study content coming soon.</p>
        </div>
      )}
    </div>
  );
}
