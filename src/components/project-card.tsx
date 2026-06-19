"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/work/${project.slug}`} className="group block">
        <div className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden mb-4">
          <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-muted-foreground group-hover:scale-105 transition-transform duration-500">
            <span className="text-sm">Preview</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
          {project.description}
        </p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
