import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WWM Build Lab — Product Case Study",
  description:
    "Case study for WWM Build Lab: product UI, evidence-aware game data, reproducible calculation states and Cloudflare production delivery.",
  alternates: { canonical: "/projects/wwm-build-lab" },
};

const LIVE = "https://wonton-wwm.pages.dev";
const REPO = "https://github.com/PNHD/wwm-calc";

const evidenceLayers = [
  ["01", "Current Global client", "Current English Global screenshots are the highest-priority source."],
  ["02", "Official patch notes", "Official Global changes are used before workbook or community references."],
  ["03", "Workbook constants", "The Lv100 Upper / 100上 profile supplies constants that are cross-checked against Global."],
  ["04", "Observed fixtures", "Player or dummy observations can validate behavior when they are clearly scoped."],
  ["05", "Community / CN", "Reference material remains lower priority and is not applied automatically when it conflicts with Global."],
] as const;

export default function WwmBuildLabCaseStudy() {
  return (
    <article className="project-case wrap case">
      <Link className="case-back" href="/#projects">
        ← Back to projects
      </Link>

      <header className="project-case-hero project-case-hero-media">
        <div className="case-hero-copy">
          <div className="kicker">Independent Product · Product Design + Implementation</div>
          <h1 className="case-title dsp">WWM Build Lab</h1>
          <p className="case-blurb">
            A gear and combat calculator for Where Winds Meet Global. I treated it as
            a product problem first: make complex build data understandable, keep
            calculations reproducible and expose uncertainty instead of presenting
            every number with the same confidence.
          </p>

          <div className="case-facts" aria-label="Project facts">
            <div className="case-fact">
              <span className="mono">Profile</span>
              <b>Global 2.0 · Tier 96</b>
            </div>
            <div className="case-fact">
              <span className="mono">Focus</span>
              <b>Build comparison</b>
            </div>
            <div className="case-fact">
              <span className="mono">Stack</span>
              <b>TypeScript</b>
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
            <img src="/projects/wwm-build-lab.png" alt="WWM Build Lab calculator interface" />
            <div className="case-media-hud mono" aria-hidden="true">
              <span>LIVE PRODUCT UI</span>
              <span>GLOBAL 2.0 / T96</span>
            </div>
          </div>
          <figcaption>Local screenshot from the deployed independent product.</figcaption>
        </figure>
      </header>

      <nav className="case-jump" aria-label="WWM Build Lab case study sections">
        <a href="#brief">Brief</a>
        <a href="#product">Product logic</a>
        <a href="#evidence">Evidence</a>
        <a href="#shipping">Shipping</a>
        <a href="#result">Result</a>
      </nav>

      <section className="case-story-grid" id="brief">
        <div className="case-story-block">
          <div className="work-cat mono">Problem</div>
          <h2 className="dsp">A calculator is only useful if the data behind it can be trusted.</h2>
          <p>
            The game exposes interacting stats, caps, weapon types, buffs and combat
            rules. A polished interface would still be misleading if constants from
            different versions or regions were mixed together without an evidence state.
          </p>
        </div>
        <div className="case-story-block">
          <div className="work-cat mono">My role</div>
          <h2 className="dsp">Product structure, information design and implementation workflow.</h2>
          <p>
            I shaped the calculation experience, source-priority rules, uncertainty
            states and deployment checks, then iterated the interface around real build
            configuration and comparison tasks rather than a static dashboard mockup.
          </p>
        </div>
      </section>

      <section className="case-detail-section" id="product">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Product logic</div>
            <h2 className="dsp">The interface is organized around decisions, not raw formulas.</h2>
          </div>
          <p className="case-section-lede">
            The useful loop is configure → compare → understand. Data provenance and
            confidence stay attached to that loop so a player can tell when a result is
            a supported calculation and when the source is incomplete.
          </p>
        </div>

        <div className="case-production-rail">
          <div className="case-production-step">
            <span className="mono">01 / CONFIGURE</span>
            <b>Build inputs</b>
            <p>Choose gear and combat inputs in a structure that mirrors the decisions a player is actually making.</p>
          </div>
          <div className="case-production-step">
            <span className="mono">02 / CALCULATE</span>
            <b>Rules stay explicit</b>
            <p>Caps, direct critical, Precision, Affinity and per-skill outcome eligibility are kept as distinct rules rather than flattened together.</p>
          </div>
          <div className="case-production-step">
            <span className="mono">03 / COMPARE</span>
            <b>See the build consequence</b>
            <p>The UI emphasizes the effect of a build choice instead of exposing a wall of disconnected constants.</p>
          </div>
          <div className="case-production-step">
            <span className="mono">04 / VERIFY</span>
            <b>Evidence state</b>
            <p>Current Global evidence outranks older workbook or community references when sources disagree.</p>
          </div>
          <div className="case-production-step">
            <span className="mono">05 / REPRODUCE</span>
            <b>Build provenance</b>
            <p>Production output includes build information so the served commit and data version can be checked.</p>
          </div>
        </div>
      </section>

      <section className="case-detail-section" id="evidence">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Evidence hierarchy</div>
            <h2 className="dsp">Uncertainty is part of the interface model.</h2>
          </div>
          <p className="case-section-lede">
            The data policy is deliberately ordered. That makes source conflicts visible
            and prevents lower-confidence references from silently overriding the current
            Global client.
          </p>
        </div>

        <div className="case-production-rail">
          {evidenceLayers.map(([n, title, body]) => (
            <div className="case-production-step" key={title}>
              <span className="mono">{n} / SOURCE</span>
              <b>{title}</b>
              <p>{body}</p>
            </div>
          ))}
        </div>

        <div className="case-callout">
          <span className="mono">NO FAKE PRECISION</span>
          <div>
            <strong className="dsp">Unknown is a valid product state.</strong>
            <p>
              A complete current Global T96 Relaid Modulating cap table has not been
              verified. Relaid roll quality therefore displays N/A instead of being
              compared against standard Tier 96 caps as if the missing table were known.
            </p>
          </div>
        </div>
      </section>

      <section className="case-detail-section" id="shipping">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Shipping &amp; verification</div>
            <h2 className="dsp">A live calculator needs a verifiable production state.</h2>
          </div>
          <p className="case-section-lede">
            The project is deployed to Cloudflare Pages and every production build emits
            a build-info file containing commit, branch, build time and data version.
          </p>
        </div>

        <div className="case-schema-board">
          <div className="case-schema-tabs" aria-hidden="true">
            <span className="active">build-info.json</span>
            <span>audit:global-v2</span>
            <span>lint</span>
            <span>build</span>
            <span>deploy:pages</span>
          </div>
          <div className="case-schema-body">
            <div className="case-schema-copy">
              <span className="mono">PRODUCTION PROVENANCE</span>
              <h3 className="dsp">The UI and the data version can be checked together.</h3>
              <p>
                This turns deployment verification into part of the product workflow
                instead of relying on a visual spot-check after release.
              </p>
            </div>
            <div className="case-schema-fields mono">
              <span>commit</span>
              <span>branch</span>
              <span>build time</span>
              <span>data version</span>
              <span>Global 2.0 profile</span>
              <span>Cloudflare Pages</span>
            </div>
          </div>
        </div>
      </section>

      <section className="case-detail-section case-result-section" id="result">
        <div>
          <div className="work-cat mono">What this demonstrates</div>
          <h2 className="dsp">Product design that survives contact with messy data.</h2>
        </div>
        <div className="case-proof-list">
          <span>Product UI &amp; information architecture</span>
          <span>Evidence-aware data design</span>
          <span>Uncertainty states</span>
          <span>Calculation-system thinking</span>
          <span>TypeScript implementation</span>
          <span>Production provenance</span>
          <span>Cloudflare delivery</span>
        </div>
      </section>

      <div className="case-next case-next-split">
        <Link className="view-all" href="/work">
          ← Full work archive
        </Link>
        <Link
          className="view-all"
          href="/projects/thien-kim"
          data-analytics-event="work_opened"
          data-analytics-placement="case_next"
          data-analytics-section-context="projects"
          data-project-slug="thien-kim"
          data-project-name="Thiên Kim"
        >
          Next: Thiên Kim — AI visual &amp; video workflow →
        </Link>
      </div>
    </article>
  );
}
