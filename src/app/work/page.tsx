import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "All Work",
  description: "The full archive — shipped products, design systems, and concepts.",
};

export default function Archive() {
  return (
    <div className="archive wrap case">
      <Link className="case-back" href="/#work">
        ← Back to work
      </Link>
      <div className="arch-head reveal">
        <div className="kicker">The archive</div>
        <h1 className="case-title dsp">
          All work
          <small>{projects.length} projects · 2016 — 2026</small>
        </h1>
        <p className="case-blurb">
          Everything worth showing — shipped products, design systems, and
          self-initiated concepts. The highlights live on the home page; here&apos;s
          the full shelf.
        </p>
      </div>
      <div className="work-grid">
        {projects.map((p) => (
          <Link key={p.slug} className="wcard reveal" href={`/work/${p.slug}`}>
            <div className="wthumb">
              <div className="ph-grid" />
              <span className="ph-dim mono">{p.heroDim}</span>
              <span className="ph-lab">{p.heroLab}</span>
              <span className="warrow">↗</span>
            </div>
            <div className="wmeta">
              <div>
                <div className="wname dsp">
                  {p.name} — {p.title}
                </div>
                <p className="wblurb">{p.blurb}</p>
                <div className="wtags">
                  {p.tags.map((t) => (
                    <span key={t} className="wtag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="wyear mono">{p.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
