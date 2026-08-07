import Link from "next/link";
import type { Metadata } from "next";

const NEXUS = "https://nexus-react.pages.dev/";
const HELIX = "https://helixkit.pages.dev/";

export const metadata: Metadata = {
  title: "Claude UI Lab — Interface Systems Case Study",
  description:
    "Case study for Nexus React and Helix Kit: two live Claude-assisted interface explorations focused on visual direction, reusable components and responsive implementation.",
  alternates: { canonical: "/projects/claude-ui-lab" },
};

export default function ClaudeUiLabCaseStudy() {
  return (
    <article className="project-case wrap case">
      <Link className="case-back" href="/#projects">
        ← Back to projects
      </Link>

      <header className="project-case-hero">
        <div>
          <div className="kicker">Independent Design Lab · Claude-assisted Build</div>
          <h1 className="case-title dsp">Claude UI Lab</h1>
          <p className="case-blurb">
            Nexus React and Helix Kit are two live interface experiments I used to
            explore a faster design-to-browser loop. Claude helped accelerate coding
            and iteration; I remained responsible for the visual direction, component
            decisions, hierarchy, responsive review and what was accepted or rejected.
          </p>
          <div className="project-case-actions">
            <a className="btn btn-accent" href={NEXUS} target="_blank" rel="noopener noreferrer">
              Open Nexus React ↗
            </a>
            <a className="btn btn-ghost" href={HELIX} target="_blank" rel="noopener noreferrer">
              Open Helix Kit ↗
            </a>
          </div>
        </div>

        <figure className="case-hero-media">
          <img src="/projects/nexus-react.png" alt="Nexus React live interface preview" />
          <figcaption className="case-caption mono">Nexus React · live browser capture</figcaption>
        </figure>
      </header>

      <section className="case-story-grid">
        <div className="case-story-block">
          <div className="work-cat mono">Why I made these</div>
          <h2 className="dsp">A design system is more useful when it can be tested in the browser.</h2>
          <p>
            Static mockups make it easy to avoid the difficult parts: responsive
            behavior, component states, density, long content and repeated patterns.
            These projects were a way to test visual systems as working interfaces.
          </p>
        </div>
        <div className="case-story-block">
          <div className="work-cat mono">My role</div>
          <h2 className="dsp">Direction, critique, component logic and implementation review.</h2>
          <p>
            I set the visual goals, chose the information hierarchy and component
            patterns, reviewed browser output at different sizes, and used Claude as
            an implementation partner rather than presenting generated code as design
            authorship on its own.
          </p>
        </div>
      </section>

      <section className="case-detail-section">
        <div className="case-detail-head">
          <div className="work-cat mono">Two live systems</div>
          <h2 className="dsp">Different visual languages, tested as real responsive pages.</h2>
        </div>
        <div className="case-live-pair">
          <figure className="case-media-card">
            <img src="/projects/nexus-react.png" alt="Nexus React interface screenshot" />
            <figcaption>
              <div><b>Nexus React</b><span className="mono">Interface system study</span></div>
              <p>A denser application-oriented visual system used to explore navigation, dashboard composition, components and responsive hierarchy.</p>
              <a href={NEXUS} target="_blank" rel="noopener noreferrer">Open live ↗</a>
            </figcaption>
          </figure>
          <figure className="case-media-card">
            <img src="/projects/helix-kit.png" alt="Helix Kit interface screenshot" />
            <figcaption>
              <div><b>Helix Kit</b><span className="mono">UI kit / visual language study</span></div>
              <p>A second interface direction used to test how tokens, reusable sections, typography and component styling hold together beyond a single hero screen.</p>
              <a href={HELIX} target="_blank" rel="noopener noreferrer">Open live ↗</a>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="case-detail-section">
        <div className="case-detail-head">
          <div className="work-cat mono">Design-to-browser loop</div>
          <h2 className="dsp">Claude made iteration faster; critique still determined the result.</h2>
        </div>
        <div className="case-decision-grid">
          <div>
            <b>Visual direction first</b>
            <p>I defined hierarchy, density, typography and the intended feel before judging implementation quality.</p>
          </div>
          <div>
            <b>Reusable patterns</b>
            <p>Repeated interface structures were treated as components and system decisions rather than isolated one-off screens.</p>
          </div>
          <div>
            <b>Browser review</b>
            <p>Desktop and smaller viewport behavior exposed spacing, wrapping and hierarchy issues that are easy to miss in a static frame.</p>
          </div>
          <div>
            <b>AI-assisted, not AI-owned</b>
            <p>The portfolio labels the workflow openly: Claude accelerated code production, while design judgment and acceptance stayed with me.</p>
          </div>
        </div>
      </section>

      <section className="case-detail-section case-result-section">
        <div>
          <div className="work-cat mono">What this demonstrates</div>
          <h2 className="dsp">I can move from visual direction to a working interface and keep reviewing the details.</h2>
        </div>
        <div className="case-proof-list">
          <span>Visual UI direction</span>
          <span>Reusable component thinking</span>
          <span>Responsive critique</span>
          <span>Design-system exploration</span>
          <span>Claude-assisted implementation</span>
          <span>Live browser output</span>
        </div>
      </section>

      <div className="case-next">
        <Link className="view-all" href="/projects/wwm-build-lab">
          Next case study: WWM Build Lab →
        </Link>
      </div>
    </article>
  );
}
