import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/portfolio";
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

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={14} /> Back to Work
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-muted-foreground text-lg mb-6">
        {project.description}
      </p>

      <div className="flex gap-2 mb-10 flex-wrap">
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

      {/* Placeholder hero image */}
      <div className="aspect-video rounded-2xl bg-muted mb-12 flex items-center justify-center">
        <span className="text-muted-foreground">Case study hero image</span>
      </div>

      {/* Case study content placeholder */}
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>The Challenge</h2>
        <p className="text-muted-foreground">
          Case study content coming soon. This will include the problem
          statement, research findings, and design goals.
        </p>

        <h2>Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-8">
          {["Research", "Wireframes", "Visual Design", "Prototype"].map(
            (step, i) => (
              <div
                key={step}
                className="aspect-[4/3] rounded-xl bg-muted flex items-center justify-center"
              >
                <div className="text-center">
                  <span className="text-3xl font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-muted-foreground mt-2">{step}</p>
                </div>
              </div>
            )
          )}
        </div>

        <h2>Solution</h2>
        <p className="text-muted-foreground">
          Design solution details and final mockups will be showcased here.
        </p>

        <h2>Results</h2>
        <p className="text-muted-foreground">
          Impact metrics and key takeaways from the project.
        </p>
      </div>
    </div>
  );
}
