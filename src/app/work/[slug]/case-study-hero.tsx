"use client";

import { thumbnails } from "@/components/project-thumbnails";

export function CaseStudyHero({ slug }: { slug: string }) {
  const Thumb = thumbnails[slug];

  return (
    <div className="aspect-video rounded-2xl overflow-hidden mb-16 bg-muted">
      {Thumb ? (
        <Thumb />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-accent/20 via-accent-2/10 to-transparent flex items-center justify-center">
          <span className="text-muted-foreground">Case study hero image</span>
        </div>
      )}
    </div>
  );
}
