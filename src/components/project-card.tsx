"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/work/${project.slug}`} className="group block h-full">
        <div className="h-full rounded-3xl bg-muted bento-glow p-1">
          <div className="h-full rounded-[20px] bg-surface overflow-hidden flex flex-col">
            <div className="aspect-[4/3] bg-gradient-to-br from-accent/20 via-accent-2/10 to-transparent flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
              <span className="text-sm text-muted-foreground">Preview</span>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-base group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-accent transition-colors mt-0.5 shrink-0" />
              </div>
              <p className="text-muted-foreground text-sm mt-1.5 line-clamp-2">
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
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
