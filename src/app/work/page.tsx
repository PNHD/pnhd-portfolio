import Link from "next/link";
import type { Metadata } from "next";
import { WorkGallery } from "@/components/work-gallery";
import {
  portfolioEvidence,
  refreshedSiteConfig,
  workItems,
} from "@/data/portfolio-refresh";
import { pageOneExtraWorkItems } from "@/data/portfolio-page1-extra";

export const metadata: Metadata = {
  title: "Work Archive",
  description:
    "Selected real work across digital design, UI, motion, 3D and icon systems, sourced from Dang Pham's Dribbble archive.",
  alternates: { canonical: "/work" },
};

const onSiteWorkCount = workItems.length + pageOneExtraWorkItems.length;

export default function Archive() {
  return (
    <div className="archive wrap case">
      <Link className="case-back" href="/#work">
        ← Back to selected work
      </Link>

      <div className="arch-head reveal">
        <div className="kicker">Work archive</div>
        <h1 className="case-title dsp">
          Real work, grouped by discipline.
          <small>
            {portfolioEvidence.dribbbleShotCount} shots in the source archive · a
            hiring-focused selection shown here
          </small>
        </h1>
        <p className="case-blurb">
          The on-site selection prioritizes work most useful for Visual, Marketing,
          Digital, Graphic and UI design roles: web creative, interface systems,
          motion, 3D and icon work. Every card links to its original Dribbble shot;
          tutorial and credited-source studies are labeled instead of being presented
          as original client work.
        </p>
        <div className="archive-proof mono">
          <span>{onSiteWorkCount} source-linked pieces verified on-site</span>
          <span aria-hidden="true">•</span>
          <a
            href={refreshedSiteConfig.links.dribbble}
            target="_blank"
            rel="noopener noreferrer"
          >
            View all {portfolioEvidence.dribbbleShotCount} on Dribbble ↗
          </a>
        </div>
      </div>

      <WorkGallery />
    </div>
  );
}
