import {
  thienKimSheetTabs,
  thienKimTrackedFields,
} from "@/data/thien-kim-case";

export function ThienKimSystem() {
  return (
    <section className="case-detail-section" id="system">
      <div className="case-section-split">
        <div className="case-detail-head">
          <div className="work-cat mono">Production system</div>
          <h2 className="dsp">The spreadsheet is a production model, not a prompt dump.</h2>
        </div>
        <p className="case-section-lede">
          The lean v8.3 setup keeps the core production tabs visible and tracks the
          decisions required to move from a concept to a reviewed, publishable asset.
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
              The workflow stores not just prompts and URLs, but also reference
              strategy, QC signals, workflow selection and regeneration notes.
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
          <p>Pack/shot structure, analysis fields, review state and production tracking.</p>
        </div>
        <div className="case-tool-card">
          <span className="mono">MOTION</span>
          <b>Kling / Dreamina</b>
          <p>Image-to-video options when a shot is suitable for direct motion generation.</p>
        </div>
        <div className="case-tool-card">
          <span className="mono">MIMIC ROUTING</span>
          <b>RunningHub</b>
          <p>Reference-video-driven routes with an explicit anchor-image input plan.</p>
        </div>
        <div className="case-tool-card">
          <span className="mono">EDIT</span>
          <b>CapCut</b>
          <p>Short-form assembly, pacing, music/caption finishing and vertical export.</p>
        </div>
      </div>
    </section>
  );
}
