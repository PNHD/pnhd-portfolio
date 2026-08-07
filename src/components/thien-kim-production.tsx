import { thienKimQcChecks } from "@/data/thien-kim-case";

export function ThienKimProduction() {
  return (
    <>
      <section className="case-detail-section" id="production">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Production loop</div>
            <h2 className="dsp">The workflow follows the media, not the other way around.</h2>
          </div>
          <p className="case-section-lede">
            Planning, generation, review, motion and editing are treated as separate
            gates. A weak image can be replaced before motion, and an unstable motion
            result can be routed back instead of being accepted by default.
          </p>
        </div>

        <div className="case-production-rail">
          <div className="case-production-step">
            <span className="mono">01 / PLAN</span>
            <b>Concept → look → shot plan</b>
            <p>
              Structure the concept, reference strategy, styling direction, framing
              and generation fields before media work begins.
            </p>
          </div>
          <div className="case-production-step">
            <span className="mono">02 / IMAGE</span>
            <b>Reference-led generation</b>
            <p>
              Generate against the Thiên Kim identity anchors, select a strong master
              look and use it to support continuity through the sequence.
            </p>
          </div>
          <div className="case-production-step">
            <span className="mono">03 / QC</span>
            <b>Keep, replace or reroute</b>
            <p>
              Review identity, outfit, anatomy, environment, composition and motion
              safety before committing an image to the next stage.
            </p>
          </div>
          <div className="case-production-step">
            <span className="mono">04 / MOTION</span>
            <b>Use the suitable route</b>
            <p>
              Choose direct image-to-video or a reference-led motion workflow based on
              the shot instead of applying one method to every output.
            </p>
          </div>
          <div className="case-production-step">
            <span className="mono">05 / EDIT</span>
            <b>Assemble and finish</b>
            <p>
              Build the short-form edit, review pacing and export the selected output;
              public links can then be recorded back into the production system.
            </p>
          </div>
        </div>
      </section>

      <section className="case-detail-section" id="quality">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Quality control</div>
            <h2 className="dsp">A generated asset is not finished when it renders.</h2>
          </div>
          <p className="case-section-lede">
            QC is a design gate. The same review categories can be used manually and
            in structured workflow fields so a weak shot is identified before it
            enters the final edit.
          </p>
        </div>

        <div className="case-qc-grid">
          {thienKimQcChecks.map(([title, body], index) => (
            <div className="case-qc-item" key={title}>
              <span className="mono">0{index + 1}</span>
              <div>
                <b>{title}</b>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
