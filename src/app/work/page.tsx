import Link from "next/link";
import type { Metadata } from "next";
import { WorkGallery } from "@/components/work-gallery";
import {
  portfolioEvidence,
  refreshedSiteConfig,
  workItems,
} from "@/data/portfolio-refresh";
import { pageOneExtraWorkItems } from "@/data/portfolio-page1-extra";
import { legacyExtraWorkItems } from "@/data/portfolio-legacy-extra";

export const metadata: Metadata = {
  title: "Work Archive",
  description:
    "The complete public Dribbble archive: 89 source-linked works across digital design, UI, motion, 3D, illustration and icon systems.",
  alternates: { canonical: "/work" },
};

const onSiteWorkCount =
  workItems.length + pageOneExtraWorkItems.length + legacyExtraWorkItems.length;

export default function Archive() {
  return (
    <div className="archive wrap case">
      <Link className="case-back" href="/#work">
        ← Back to selected work
      </Link>

      <div className="arch-head reveal">
        <div className="kicker">Full work archive</div>
        <h1 className="case-title dsp">
          Real work, grouped by discipline.
          <small>
            {onSiteWorkCount} of {portfolioEvidence.dribbbleShotCount} public
            Dribbble shots verified and mapped here
          </small>
        </h1>
        <p className="case-blurb">
          This is the complete public Dribbble archive, organized for easier review
          across Digital / Web, UI / Product, Motion, 3D / Illustration and Icon /
          System work. Every card links back to the original Dribbble shot. Tutorial,
          copywork and credited-source studies are labeled rather than presented as
          original client work.
        </p>
        <div className="archive-proof mono">
          <span>{onSiteWorkCount} unique source-linked works on-site</span>
          <span aria-hidden="true">•</span>
          <a
            href={refreshedSiteConfig.links.dribbble}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open source archive on Dribbble ↗
          </a>
        </div>
      </div>

      <WorkGallery />
    </div>
  );
}
