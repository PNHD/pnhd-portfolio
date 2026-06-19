"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { thumbnails } from "./project-thumbnails";

export function ProjectCard({ project }: { project: Project }) {
  const Thumb = thumbnails[project.slug];

  return (
    <Link href={`/work/${project.slug}`} className="group block h-full">
      <div className="h-full project-card flex flex-col">
        {/* Image — dominant */}
        <div className="aspect-[4/3] overflow-hidden relative">
          {Thumb ? (
            <div className="w-full h-full card-image">
              <Thumb />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/20 via-accent-2/10 to-transparent" />
          )}
          <div className="card-overlay" />
        </div>

        {/* Info */}
        <div className="p-5 md:p-6 flex-1 flex flex-col">
          <div className="flex gap-2 mb-2.5 flex-wrap">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-chip">{tag}</span>
            ))}
          </div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-base md:text-lg leading-snug group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight
              size={16}
              className="text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all mt-1 shrink-0 opacity-0 group-hover:opacity-100"
            />
          </div>
          <p className="text-muted-foreground text-sm mt-2 line-clamp-2 flex-1 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
