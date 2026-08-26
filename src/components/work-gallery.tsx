"use client";

import { useMemo, useState } from "react";
import {
  workCategories,
  workItems,
  type WorkCategory,
} from "@/data/portfolio-refresh";
import { pageOneExtraWorkItems } from "@/data/portfolio-page1-extra";
import { legacyExtraWorkItems } from "@/data/portfolio-legacy-extra";
import { dribbbleImage } from "@/lib/dribbble-image";

type Filter = "All" | WorkCategory;

const archiveItems = [
  ...workItems,
  ...pageOneExtraWorkItems,
  ...legacyExtraWorkItems,
];

export function WorkGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const items = useMemo(
    () =>
      filter === "All"
        ? archiveItems
        : archiveItems.filter((item) => item.category === filter),
    [filter]
  );

  return (
    <>
      <div className="archive-filters" role="group" aria-label="Filter portfolio work">
        {workCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-chip ${filter === category ? "active" : ""}`}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="work-grid archive-grid" aria-live="polite">
        {items.map((item) => (
          <a
            key={item.href}
            className="wcard work-real-card"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.title} — open source work`}
            data-analytics-placement="work_archive_visual"
            data-analytics-section-context="work"
            data-analytics-label={item.title}
          >
            <div className="wthumb work-real-thumb">
              {/* Responsive Dribbble CDN variants are supplied directly for static export. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="work-real-img"
                src={dribbbleImage(item.image, 1000)}
                srcSet={`${dribbbleImage(item.image, 640)} 640w, ${dribbbleImage(item.image, 1000)} 1000w, ${dribbbleImage(item.image, 1400)} 1400w`}
                sizes="(max-width: 680px) calc(100vw - 36px), (max-width: 1320px) 46vw, 590px"
                alt={item.title}
                loading="lazy"
              />
              <span className="warrow">↗</span>
            </div>
            <div className="wmeta">
              <div>
                <div className="work-cat mono">{item.category}</div>
                <div className="wname dsp">{item.title}</div>
                {item.note ? <p className="wblurb">{item.note}</p> : null}
                <div className="wtags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="wtag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
