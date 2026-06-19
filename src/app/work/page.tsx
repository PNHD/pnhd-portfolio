"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/portfolio";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

export default function WorkPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const filtered = filter
    ? projects.filter((p) => p.tags.includes(filter))
    : projects;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          My <span className="gradient-text">Work</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl">
          A selection of UI design, concept projects, and 3D work.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setFilter(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === null
              ? "bg-foreground text-background"
              : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag === filter ? null : tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === tag
                ? "bg-foreground text-background"
                : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter ?? "all"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
