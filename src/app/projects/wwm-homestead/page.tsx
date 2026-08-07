import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WWM Homestead Planner — Product Case Study",
  description:
    "Case study for WWM Homestead Planner: production planning, revenue and material runway, retainer allocation, recommendations and an optimization workflow.",
  alternates: { canonical: "/projects/wwm-homestead" },
};

const LIVE = "https://wwm-homestead.pages.dev";
const REPO = "https://github.com/PNHD/homestead";

const productAreas = [
  ["01", "Dashboard", "A one-glance view of weekly profit, slot use, serving capacity, order shortfalls and material risk."],
  ["02", "Production & Revenue", "Plan craft lines, assign recruited retainers and compare output, prices and profit for the active setup."],
  ["03", "Optimizer", "Reserve short orders first, respect industry and skill-slot constraints, use a recruited retainer once and avoid runway-breaking picks when possible."],
  ["04", "Materials", "Aggregate ingredient draw against farms, gathering and intermediates to expose net rate, stock, runway and stockout risk."],
  ["05", "Orders & Roster", "Track Touchstone requirements, recruited retainers, skill levels and high-priority recruitment without separating planning from capacity."],
] as const;

export default function WwmHomesteadCaseStudy() {
  return (
    <article className="project-case wrap case">
      <Link className="case-back" href="/#projects">
        ← Back to projects
      </Link>

      <header className="project-case-hero project-case-hero-media">
        <div className="case-hero-copy">
          <div className="kicker">Independent Product · Planning Tool</div>
          <h1 className="case-title dsp">WWM Homestead Planner</h1>
          <p className="case-blurb">
            A web app for planning production, profit, material runway and retainer
            labor in Where Winds Meet. The product turns a large set of interacting
            recipes, slots, orders, prices and staffing constraints into a single
            operational planning loop.
          </p>

          <div className="case-facts" aria-label="Project facts">
            <div className="case-fact">
              <span className="mono">Focus</span>
              <b>Production planning</b>
            </div>
            <div className="case-fact">
              <span className="mono">Model</span>
              <b>Profit + runway</b>
            </div>
            <div className="case-fact">
              <span className="mono">Stack</span>
              <b>React + TypeScript</b>
            </div>
            <div className="case-fact">
              <span className="mono">Delivery</span>
              <b>Cloudflare</b>
            </div>
          </div>

          <div className="project-case-actions">
            <a className="btn btn-accent" href={LIVE} target="_blank" rel="noopener noreferrer">
              Open live product ↗
            </a>
            <a className="btn btn-ghost" href={REPO} target="_blank" rel="noopener noreferrer">
              View GitHub ↗
            </a>
          </div>
        </div>

        <figure className="case-hero-media-block">
          <div className="case-product-shot">
            <img src="/projects/wwm-homestead.png" alt="WWM Homestead Planner dashboard interface" />
            <div className="case-media-hud mono" aria-hidden="true">
              <span>LIVE PRODUCT UI</span>
              <span>PLANNER / OPTIMIZER</span>
            </div>
          </div>
          <figcaption>Local screenshot from the deployed independent planning tool.</figcaption>
        </figure>
      </header>

      <nav className="case-jump" aria-label="WWM Homestead Planner case study sections">
        <a href="#brief">Brief</a>
        <a href="#model">Product model</a>
        <a href="#optimizer">Optimizer</a>
        <a href="#data">Data</a>
        <a href="#result">Result</a>
      </nav>

      <section className="case-story-grid" id="brief">
        <div className="case-story-block">
          <div className="work-cat mono">Problem</div>
          <h2 className="dsp">Production choices are linked to profit, stock, orders and labor at the same time.</h2>
          <p>
            A profitable recipe can still be a poor choice if it drains a scarce
            ingredient, blocks a required order or consumes the wrong retainer. The
            product therefore has to show system consequences, not just rank items by
            a single value.
          </p>
        </div>
        <div className="case-story-block">
          <div className="work-cat mono">My role</div>
          <h2 className="dsp">Product structure, planning logic, interface design and implementation.</h2>
          <p>
            I organized the planning model around production queues, material flow,
            staffing and orders, then built dashboards and recommendations that reuse
            the same underlying state instead of creating disconnected calculators.
          </p>
        </div>
      </section>

      <section className="case-detail-section" id="model">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Product model</div>
            <h2 className="dsp">One planning state feeds every decision surface.</h2>
          </div>
          <p className="case-section-lede">
            Production, materials, orders and roster data are intentionally connected.
            Editing one part of the plan changes the risk and recommendation context in
            the others.
          </p>
        </div>

        <div className="case-production-rail">
          {productAreas.map(([n, title, body]) => (
            <div className="case-production-step" key={title}>
              <span className="mono">{n} / MODULE</span>
              <b>{title}</b>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="case-detail-section" id="optimizer">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Optimizer</div>
            <h2 className="dsp">Recommendations respect constraints before chasing yield.</h2>
          </div>
          <p className="case-section-lede">
            The optimizer is deliberately pragmatic rather than pretending to solve a
            frictionless economy. It prioritizes short orders, available production
            capacity, recruited retainers and material runway.
          </p>
        </div>

        <div className="case-lock-board">
          <div className="case-lock-title">
            <span className="mono">GREEDY PLANNING LOGIC</span>
            <strong className="dsp">Useful because the constraints stay visible.</strong>
          </div>
          <div className="case-lock-columns">
            <div>
              <span className="mono">RESERVE</span>
              <b>Order shortfalls first</b>
              <p>Required output is protected before the planner fills remaining capacity with profit-oriented choices.</p>
            </div>
            <div>
              <span className="mono">RESPECT</span>
              <b>Slots &amp; staffing</b>
              <p>Industry and skill-slot capacity constrain the plan, and each recruited retainer can only be assigned once.</p>
            </div>
            <div>
              <span className="mono">AVOID</span>
              <b>Runway-breaking picks</b>
              <p>When possible, recommendations avoid choices that would push ingredients below the configured runway target.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="case-detail-section" id="data">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Data integrity</div>
            <h2 className="dsp">The calculation engine combines source constants; it does not invent them.</h2>
          </div>
          <p className="case-section-lede">
            Game constants are generated from the community Homestead Planner v2.0 and
            Arbiter System spreadsheets. The calculation layer combines those constants
            with the user&apos;s plan and roster state.
          </p>
        </div>

        <div className="case-schema-board">
          <div className="case-schema-tabs" aria-hidden="true">
            <span className="active">gameData.ts</span>
            <span>calc.ts</span>
            <span>Dashboard</span>
            <span>Optimizer</span>
            <span>Materials</span>
          </div>
          <div className="case-schema-body">
            <div className="case-schema-copy">
              <span className="mono">SOURCE → MODEL → UI</span>
              <h3 className="dsp">Keep data, calculation and presentation responsibilities separate.</h3>
              <p>
                That separation makes it easier to update game constants without hiding
                them inside UI code, while the same plan state can drive dashboards,
                recommendations and runway warnings.
              </p>
            </div>
            <div className="case-schema-fields mono">
              <span>recipes</span>
              <span>prices</span>
              <span>crop yields</span>
              <span>retainer skills</span>
              <span>production rates</span>
              <span>best-seller bonus</span>
              <span>inventory stock</span>
              <span>material runway</span>
              <span>Touchstone orders</span>
              <span>production queues</span>
            </div>
          </div>
        </div>

        <div className="case-callout">
          <span className="mono">SCOPE</span>
          <div>
            <strong className="dsp">Fan-made planning tool, not an official game service.</strong>
            <p>
              The product is designed around a documented community data source and the
              player&apos;s own browser-stored plan. Save/share is handled through JSON
              export and import rather than implying an official account integration.
            </p>
          </div>
        </div>
      </section>

      <section className="case-detail-section case-result-section" id="result">
        <div>
          <div className="work-cat mono">What this demonstrates</div>
          <h2 className="dsp">Product UI for a planning problem with real constraints.</h2>
        </div>
        <div className="case-proof-list">
          <span>Information architecture</span>
          <span>Planning workflows</span>
          <span>Constraint-aware recommendations</span>
          <span>Dashboard design</span>
          <span>Material runway modeling</span>
          <span>React + TypeScript implementation</span>
          <span>Local save / JSON share</span>
          <span>Cloudflare delivery</span>
        </div>
      </section>

      <div className="case-next case-next-split">
        <Link className="view-all" href="/projects/thien-kim">
          ← Previous: Thiên Kim
        </Link>
        <Link className="view-all" href="/work">
          Full work archive →
        </Link>
      </div>
    </article>
  );
}
