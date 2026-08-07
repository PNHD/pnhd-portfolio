import {
  thienKimContinuitySteps,
  thienKimExecutionModes,
} from "@/data/thien-kim-case";

export function ThienKimContinuity() {
  return (
    <>
      <section className="case-detail-section" id="continuity">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Continuity system</div>
            <h2 className="dsp">Lock the identity once. Vary the shot deliberately.</h2>
          </div>
          <p className="case-section-lede">
            The reference strategy separates identity from composition. Original
            references remain authoritative, while Shot 1 becomes a temporary visual
            anchor for the current pack instead of replacing the character source.
          </p>
        </div>

        <div className="case-flow-grid">
          {thienKimContinuitySteps.map((step, index) => (
            <div className="case-flow-step" key={step.n}>
              <div className="case-flow-top">
                <span className="mono">{step.n}</span>
                {index < thienKimContinuitySteps.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </div>
              <h3 className="dsp">{step.title}</h3>
              <p>{step.body}</p>
              <small className="mono">{step.meta}</small>
            </div>
          ))}
        </div>

        <div className="case-lock-board" aria-label="Continuity lock model">
          <div className="case-lock-title">
            <span className="mono">CONTINUITY LOCK</span>
            <strong className="dsp">What stays fixed vs. what is allowed to move</strong>
          </div>
          <div className="case-lock-columns">
            <div>
              <span className="mono">LOCK</span>
              <b>Identity &amp; pack look</b>
              <p>
                Face, body proportions, outfit, hair, accessories, lighting mood,
                color mood and location atmosphere.
              </p>
            </div>
            <div>
              <span className="mono">VARY</span>
              <b>Shot expression</b>
              <p>
                Framing, pose, camera angle, shot purpose and motion — only when they
                remain compatible with the lock.
              </p>
            </div>
            <div>
              <span className="mono">REJECT</span>
              <b>Continuity breaks</b>
              <p>
                Generic face drift, changed wardrobe, impossible anatomy, unstable
                background or motion that destroys the selected master look.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="case-detail-section" id="routing">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Execution routing</div>
            <h2 className="dsp">Not every trend should become four independent I2V shots.</h2>
          </div>
          <p className="case-section-lede">
            Version 8.3 chooses a production strategy first. This prevents the workflow
            from forcing text prompts where a mimic tool has no prompt box, or forcing
            motion onto imagery that is safer as a still sequence.
          </p>
        </div>

        <div className="case-route-grid">
          {thienKimExecutionModes.map((route, index) => (
            <div className="case-route-card" key={route.mode}>
              <div className="case-route-code mono">
                <span>0{index + 1}</span>
                <code>{route.mode}</code>
              </div>
              <h3 className="dsp">{route.label}</h3>
              <p>{route.body}</p>
            </div>
          ))}
        </div>

        <div className="case-callout">
          <span className="mono">RUNNINGHUB MIMIC CONSTRAINT</span>
          <div>
            <strong className="dsp">One reference video + one Thiên Kim anchor image.</strong>
            <p>
              The preferred mimic route can have no prompt input box. The workflow
              therefore generates an anchor-image plan and does not pretend a mandatory
              text prompt exists where the tool cannot accept one.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
