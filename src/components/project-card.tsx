"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { thumbnails } from "./project-thumbnails";

export function ProjectCard({ project }: { project: Project }) {
  const Thumb = thumbnails[project.slug];

  return (
    <Link href={`/work/${project.slug}`} className="group block h-full">
      <div className="h-full rounded-3xl bg-surface border border-border bento-glow card-lift overflow-hidden flex flex-col">
        <div className="aspect-[4/3] overflow-hidden">
          {Thumb ? (
            <div className="w-full h-full group-hover:scale-[1.03] transition-transform duration-700">
              <Thumb />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/20 via-accent-2/10 to-transparent flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Preview</span>
            </div>
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-base group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight
              size={16}
              className="text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0"
            />
          </div>
          <p className="text-muted-foreground text-sm mt-1.5 line-clamp-2 flex-1">
            {project.description}
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-chip">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
