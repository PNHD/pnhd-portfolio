import Link from "next/link";
import type { Metadata } from "next";

const LIVE = "https://wwm-homestead.pages.dev";
const REPO = "https://github.com/PNHD/homestead";

export const metadata: Metadata = {
  title: "WWM Homestead Planner — Case Study",
  description:
    "Case study for WWM Homestead Planner: production planning, profit calculation, material runway and optimizer workflows in a live React web app.",
  alternates: { canonical: "/projects/wwm-homestead" },
};

export default function HomesteadCaseStudy() {
  return (
    <article className="project-case wrap case">
      <Link className="case-back" href="/#projects">
        ← Back to projects
      </Link>

      <header className="project-case-hero">
        <div>
          <div className="kicker">Independent Product · Planning Tool</div>
          <h1 className="case-title dsp">WWM Homestead Planner</h1>
          <p className="case-blurb">
            A fan-made planning app for a production economy with limited slots,
            material dependencies, retainers, orders and several selling paths. The
            product turns those interacting constraints into a dashboard and planning
            workflow instead of asking the user to maintain a spreadsheet mentally.
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

        <figure className="case-hero-media">
          <img src="/projects/wwm-homestead.png" alt="WWM Homestead Planner live dashboard" />
          <figcaption className="case-caption mono">Live product · browser capture</figcaption>
        </figure>
      </header>

      <section className="case-story-grid">
        <div className="case-story-block">
          <div className="work-cat mono">Problem</div>
          <h2 className="dsp">The useful answer is not “what makes money?” but “what should I run with the resources I actually have?”</h2>
          <p>
            Production choices affect revenue, material draw, stockout time, limited
            skill slots and which retainers are available. A single profit table misses
            the dependencies that make the planning problem difficult.
          </p>
        </div>
        <div className="case-story-block">
          <div className="work-cat mono">My role</div>
          <h2 className="dsp">Product structure, planning flows, recommendation logic and implementation.</h2>
          <p>
            I organized the app around real planning questions, built the interaction
            model for production and materials, and implemented the tool as a live
            React/TypeScript product with browser persistence and import/export.
          </p>
        </div>
      </section>

      <section className="case-detail-section case-product-evidence">
        <div className="case-detail-head">
          <div className="work-cat mono">Product in use</div>
          <h2 className="dsp">One dashboard connects profit, capacity, material risk and the production plan.</h2>
        </div>
        <figure className="case-wide-media">
          <img src="/projects/wwm-homestead.png" alt="WWM Homestead Planner interface showing dashboard and planning information" />
          <figcaption className="case-caption">Captured from the deployed app. The product is designed to be used as a working planner, not a static dashboard concept.</figcaption>
        </figure>
      </section>

      <section className="case-detail-section">
        <div className="case-detail-head">
          <div className="work-cat mono">Product structure</div>
          <h2 className="dsp">The interface separates overview, planning and exception handling.</h2>
        </div>
        <div className="case-decision-grid">
          <div><b>Dashboard</b><p>Surfaces weekly profit, slot use, serving/capacity limits, order shortfalls and material risks at a glance.</p></div>
          <div><b>Production + revenue</b><p>Craft lines connect output rates, prices, assigned retainers and estimated profit instead of keeping those inputs in separate tools.</p></div>
          <div><b>Materials runway</b><p>Ingredient draw is compared with production and current stock so a profitable plan can still be flagged when it will run out of inputs.</p></div>
          <div><b>Recommendations + optimizer</b><p>Suggested lines consider available roster/slots and try to avoid plans that violate important material constraints.</p></div>
        </div>
      </section>

      <section className="case-detail-section case-evidence-split">
        <div>
          <div className="work-cat mono">Data decisions</div>
          <h2 className="dsp">Calculation logic stays separate from source data.</h2>
          <p className="case-long-copy">
            Recipes, prices, yields, skills and production rates are generated into a
            data module from referenced community planning sources. The calculation
            layer combines those constants rather than inventing new game values. That
            separation makes it easier to audit the numbers and update a source without
            rewriting the UI.
          </p>
        </div>
        <div className="case-proof-stack">
          <div><b>Roster-aware</b><p>Planning can use the retainers the user actually has rather than an idealized global list.</p></div>
          <div><b>Constraint-aware</b><p>Industry slots, skill slots, short orders and material runway are treated as constraints, not afterthoughts.</p></div>
          <div><b>Local persistence</b><p>The plan can live in the browser and be exported/imported as JSON for portability.</p></div>
          <div><b>Live implementation</b><p>Vite, React, TypeScript and Tailwind are used to ship the planning model as an interactive web app.</p></div>
        </div>
      </section>

      <section className="case-detail-section case-result-section">
        <div>
          <div className="work-cat mono">What this demonstrates</div>
          <h2 className="dsp">Turning a dense system into a sequence of practical decisions.</h2>
        </div>
        <div className="case-proof-list">
          <span>Product UI</span>
          <span>Planning / optimizer flows</span>
          <span>Data modeling</span>
          <span>React + TypeScript</span>
          <span>Constraint visualization</span>
          <span>Live product delivery</span>
        </div>
      </section>

      <div className="case-next">
        <Link className="view-all" href="/work">View full work →</Link>
      </div>
    </article>
  );
}
