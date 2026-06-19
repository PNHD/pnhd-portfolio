"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;
const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

export default function WorkPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const filtered = filter
    ? projects.filter((p) => p.tags.includes(filter))
    : projects;

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="section-index">Portfolio</span>
        <h1 className="heading-xl mt-2 mb-4">
          All <span className="gradient-text">Work</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mb-14 max-w-lg leading-relaxed">
          A selection of UI design, concept projects, and 3D work.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        className="flex flex-wrap gap-2 mb-14"
      >
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
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter ?? "all"}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
