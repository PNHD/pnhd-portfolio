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
            references remain authoritative, while the selected master look becomes a
            temporary styling anchor for the current shot pack.
          </p>
        </div>

        <div className="case-flow-grid">
          {thienKimContinuitySteps.map((step, index) => (
            <div className="case-flow-step" key={step.n}>
              <div className="case-flow-top">
                <span className="mono">{step.n}</span>
                {index < thienKimContinuitySteps.length - 1 ? <i aria-hidden="true">→</i> : null}
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
              <b>Identity &amp; selected look</b>
              <p>
                Face, body proportions and the chosen styling logic for the current
                sequence: outfit, hair, accessories, lighting and environment cues.
              </p>
            </div>
            <div>
              <span className="mono">VARY</span>
              <b>Shot expression</b>
              <p>
                Framing, pose, camera angle, shot purpose and motion when they remain
                compatible with the identity and selected styling direction.
              </p>
            </div>
            <div>
              <span className="mono">REJECT</span>
              <b>Continuity breaks</b>
              <p>
                Face drift, changed wardrobe, impossible anatomy, unstable background
                logic or motion that breaks the selected character look.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="case-detail-section" id="routing">
        <div className="case-section-split">
          <div className="case-detail-head">
            <div className="work-cat mono">Execution routing</div>
            <h2 className="dsp">Choose the production route before generating motion.</h2>
          </div>
          <p className="case-section-lede">
            A source can call for direct image-to-video, reference-led mimic, segmented
            handling or a controlled still sequence. Routing first avoids forcing the
            same generation method onto every concept.
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
          <span className="mono">REFERENCE-LED MOTION</span>
          <div>
            <strong className="dsp">Match the inputs to what the tool actually accepts.</strong>
            <p>
              Some mimic routes rely on a reference video and a character anchor image
              instead of a long text prompt. The workflow records that input plan
              explicitly rather than inventing controls that are not present.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
