"use client";

import { useMemo, useState } from "react";
import {
  workCategories,
  workItems,
  type WorkCategory,
} from "@/data/portfolio-refresh";

type Filter = "All" | WorkCategory;

export function WorkGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const items = useMemo(
    () =>
      filter === "All"
        ? workItems
        : workItems.filter((item) => item.category === filter),
    [filter]
  );

  return (
    <>
      <div className="archive-filters" aria-label="Filter portfolio work">
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

      <div className="work-grid archive-grid">
        {items.map((item) => (
          <a
            key={item.href}
            className="wcard reveal work-real-card"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="wthumb work-real-thumb">
              <img
                className="work-real-img"
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
              <span className="work-source mono">Dribbble ↗</span>
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
