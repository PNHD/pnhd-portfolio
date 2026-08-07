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
            A planning target is typically a short pack of 3–5 usable shots. That is a
            production target, not a claim about published volume. Each stage can send
            a shot back for replacement before final editing.
          </p>
        </div>

        <div className="case-production-rail">
          <div className="case-production-step">
            <span className="mono">01 / PLAN</span>
            <b>Concept → pack → shot rows</b>
            <p>
              n8n and Google Sheets structure the concept, reference strategy, shot
              purpose, timing and generation fields before media work begins.
            </p>
          </div>
          <div className="case-production-step">
            <span className="mono">02 / IMAGE</span>
            <b>Reference-led generation</b>
            <p>
              Generate against the original Thiên Kim references, select the strongest
              frame and keep Shot 1 as the pack continuity anchor.
            </p>
          </div>
          <div className="case-production-step">
            <span className="mono">03 / QC</span>
            <b>Keep, replace or downgrade</b>
            <p>
              Evaluate identity, outfit, environment, variety and motion safety before
              choosing I2V, mimic or a slideshow route.
            </p>
          </div>
          <div className="case-production-step">
            <span className="mono">04 / MOTION</span>
            <b>Choose the right execution mode</b>
            <p>
              Use Kling or Dreamina for suitable image-to-video work, or route
              reference-led motion through the appropriate RunningHub mimic workflow.
            </p>
          </div>
          <div className="case-production-step">
            <span className="mono">05 / EDIT</span>
            <b>Assemble, publish, record</b>
            <p>
              CapCut is used for short-form assembly and finishing; published TikTok
              URLs can be recorded back into the production sheet.
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
            QC is treated as a design gate. The same categories appear in the manual
            review checklist and in structured workflow fields so a weak shot can be
            replaced instead of quietly entering the final edit.
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
