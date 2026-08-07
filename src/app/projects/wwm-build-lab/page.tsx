import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WWM Build Lab — Case Study",
  description:
    "Mini case study for WWM Build Lab: product design, evidence-checked game data, calculation systems and production implementation.",
  alternates: { canonical: "/projects/wwm-build-lab" },
};

const LIVE = "https://wonton-wwm.pages.dev";
const REPO = "https://github.com/PNHD/wwm-calc";

export default function WwmBuildLabCaseStudy() {
  return (
    <article className="project-case wrap case">
      <Link className="case-back" href="/#projects">
        ← Back to projects
      </Link>

      <header className="project-case-hero">
        <div>
          <div className="kicker">Independent Product · Case Study</div>
          <h1 className="case-title dsp">WWM Build Lab</h1>
          <p className="case-blurb">
            A gear and combat calculator for Where Winds Meet Global. I treated it as
            a product-design problem first: make complex build data understandable,
            keep calculations reproducible, and make uncertainty visible instead of
            pretending every value is equally trustworthy.
          </p>
          <div className="project-case-actions">
            <a className="btn btn-accent" href={LIVE} target="_blank" rel="noopener noreferrer">
              Open live product ↗
            </a>
            <a className="btn btn-ghost" href={REPO} target="_blank" rel="noopener noreferrer">
              View GitHub ↗
            </a>
          </div>
        </div>
        <div className="case-system-preview case-system-wwm" aria-label="WWM Build Lab system overview">
          <span className="mono">GLOBAL 2.0 · TIER 96</span>
          <strong className="dsp">Build → compare → verify</strong>
          <div className="case-metric-grid">
            <i>Gear inputs</i>
            <i>Combat rules</i>
            <i>Evidence state</i>
            <i>Build output</i>
          </div>
        </div>
      </header>

      <section className="case-story-grid">
        <div className="case-story-block">
          <div className="work-cat mono">Problem</div>
          <h2 className="dsp">A calculator is only useful if the data behind it can be trusted.</h2>
          <p>
            The game exposes many interacting stats, caps and build choices. A polished
            interface alone would be misleading if the underlying constants were stale
            or mixed between different regional versions.
          </p>
        </div>
        <div className="case-story-block">
          <div className="work-cat mono">My role</div>
          <h2 className="dsp">Product structure, interface design and implementation workflow.</h2>
          <p>
            I shaped the information model, calculation experience, data-status rules
            and production workflow, then iterated the interface around real build
            comparison tasks rather than a static dashboard mockup.
          </p>
        </div>
      </section>

      <section className="case-detail-section">
        <div className="case-detail-head">
          <div className="work-cat mono">Key decisions</div>
          <h2 className="dsp">Designing uncertainty into the product.</h2>
        </div>
        <div className="case-decision-grid">
          <div>
            <b>Evidence hierarchy</b>
            <p>Current Global client evidence takes priority over patch notes, workbook constants and community references.</p>
          </div>
          <div>
            <b>No fake precision</b>
            <p>When a current cap table is not verified, the interface shows N/A rather than presenting a guessed comparison.</p>
          </div>
          <div>
            <b>Reproducible builds</b>
            <p>Production output includes build information so the deployed calculation state can be checked against a commit and data version.</p>
          </div>
          <div>
            <b>UI around decisions</b>
            <p>The product is organized around configuring, comparing and understanding builds, not simply exposing raw formulas.</p>
          </div>
        </div>
      </section>

      <section className="case-detail-section case-result-section">
        <div>
          <div className="work-cat mono">What this demonstrates</div>
          <h2 className="dsp">Design that survives contact with messy data.</h2>
        </div>
        <div className="case-proof-list">
          <span>Product UI & information architecture</span>
          <span>Evidence-aware data design</span>
          <span>TypeScript implementation</span>
          <span>Cloudflare production workflow</span>
        </div>
      </section>

      <div className="case-next">
        <Link className="view-all" href="/projects/thien-kim">
          Next case study: Thiên Kim — AI visual & video workflow →
        </Link>
      </div>
    </article>
  );
}
