import {
  thienKimSheetTabs,
  thienKimTrackedFields,
} from "@/data/thien-kim-case";

export function ThienKimSystem() {
  return (
    <section className="case-detail-section" id="system">
      <div className="case-section-split">
        <div className="case-detail-head">
          <div className="work-cat mono">Tools &amp; production system</div>
          <h2 className="dsp">The workflow records decisions, not just prompts.</h2>
        </div>
        <p className="case-section-lede">
          n8n and Google Sheets keep planning, reference strategy, review state and
          routing visible around the actual media tools. The system is there to support
          repeatability, not replace visual judgment.
        </p>
      </div>

      <div className="case-schema-board">
        <div className="case-schema-tabs" aria-label="Core Google Sheets tabs">
          {thienKimSheetTabs.map((tab, index) => (
            <span className={index === 0 ? "active" : ""} key={tab}>
              {tab}
            </span>
          ))}
        </div>
        <div className="case-schema-body">
          <div className="case-schema-copy">
            <span className="mono">SELECTED TRACKING FIELDS</span>
            <h3 className="dsp">Continuity, risk and routing stay visible.</h3>
            <p>
              Alongside prompts and URLs, the production model keeps reference
              strategy, continuity notes, review signals and the selected video route.
            </p>
          </div>
          <div className="case-schema-fields mono">
            {thienKimTrackedFields.map((field) => (
              <span key={field}>{field}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="case-tool-grid" aria-label="Thiên Kim production tools">
        <div className="case-tool-card">
          <span className="mono">CONCEPT + IMAGE</span>
          <b>ChatGPT</b>
          <p>Concept direction, prompt preparation and reference-led image generation.</p>
        </div>
        <div className="case-tool-card">
          <span className="mono">ORCHESTRATION</span>
          <b>n8n + Google Sheets</b>
          <p>Shot structure, analysis fields, review state and production tracking.</p>
        </div>
        <div className="case-tool-card">
          <span className="mono">MOTION</span>
          <b>Kling / Dreamina</b>
          <p>Image-to-video options for shots that are suitable for direct motion generation.</p>
        </div>
        <div className="case-tool-card">
          <span className="mono">REFERENCE ROUTING</span>
          <b>RunningHub</b>
          <p>Reference-video-driven motion routes using an explicit character anchor plan.</p>
        </div>
        <div className="case-tool-card">
          <span className="mono">EDIT</span>
          <b>CapCut</b>
          <p>Short-form assembly, pacing, finishing and vertical export.</p>
        </div>
      </div>
    </section>
  );
}
