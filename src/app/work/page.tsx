"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/portfolio";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

export default function WorkPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const filtered = filter
    ? projects.filter((p) => p.tags.includes(filter))
    : projects;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Work</h1>
      <p className="text-muted-foreground mb-10 max-w-xl">
        A selection of UI design, concept projects, and 3D work.
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setFilter(null)}
          className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
            filter === null
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag === filter ? null : tag)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              filter === tag
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
