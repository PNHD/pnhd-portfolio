import Link from "next/link";
import { experiences } from "@/data/portfolio";
import { verifiedCapabilityGroups } from "@/data/portfolio-capabilities";
import {
  portfolioEvidence,
  refreshedSiteConfig as siteConfig,
  workItems,
} from "@/data/portfolio-refresh";

const MARQUEE = [
  "Visual Design",
  "Marketing Creative",
  "Digital Design",
  "Web & UI",
  "Motion",
  "3D",
  "Icon Systems",
];

const SHOWCASE = workItems.slice(0, 4);

export default function Home() {
  const featured = workItems.filter((item) => item.featured).slice(0, 8);

  return (
    <>
      <section className="hero wrap">
        <div className="hero-text">
          <div className="pills rise r1">
            <span className="pill">
              <span className="live" />
              Available for selected roles &amp; freelance
            </span>
            <span className="pill">Ho Chi Minh City, VN</span>
          </div>
          <h1 className="h1 dsp rise r2">
            Visual systems, digital experiences, and motion with a clear{" "}
            <span className="em">point of view</span>.
          </h1>
          <p className="hero-sub rise r3">
            I&apos;m Dang — a visual and digital designer working across marketing
            creative, web and product UI, motion, icon systems and 3D. I translate
            briefs into polished visual work that stays clear and consistent across
            channels.
          </p>
          <div className="hero-role-line rise r3" aria-label="Role fit">
            <span>Marketing Design</span>
            <span>Visual / Graphic</span>
            <span>Digital / Web</span>
            <span>UI</span>
            <span>Motion / 3D</span>
          </div>
          <div className="hero-cta rise r4">
            <Link className="btn btn-accent" href="/#work">
              See selected work <span className="arr">↗</span>
            </Link>
            <Link className="btn btn-ghost" href="/#contact">
              Let&apos;s talk
            </Link>
          </div>
          <div className="hero-foot rise r5">
            <span>Open to Visual · Marketing · Digital · Graphic design roles</span>
            <span className="ln" />
            <span>2026</span>
          </div>
        </div>

        <div className="hero-showcase rise r3" aria-hidden="true">
          {[0, 1].map((col) => (
            <div key={col} className={`sc-col sc-col-${col === 0 ? "a" : "b"}`}>
              <div className="sc-track">
                {[...SHOWCASE, ...SHOWCASE].map((item, i) => (
                  <div className="sc-card" key={`${item.href}-${i}`}>
                    <div className="sc-thumb sc-thumb-real">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="sc-meta">
                      <span className="sc-name dsp">{item.title}</span>
                      <span className="sc-tag">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="marquee">
        <div className="mq-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 30 }}>
              <span className="mq-item dsp">{m}</span>
              <span className="mq-sep" />
            </span>
          ))}
        </div>
      </div>

      <section className="section wrap" id="work">
        <div className="reveal work-head">
          <div>
            <div className="kicker">Selected Work</div>
            <h2 className="stitle dsp">
              Range matters. So does knowing what each piece is for.
            </h2>
          </div>
          <Link className="view-all" href="/work">
            Browse by discipline <span>→</span>
          </Link>
        </div>

        <div className="proof-strip reveal">
          <div className="proof-card">
            <b>{portfolioEvidence.dribbbleShotCount}</b>
            <span>shots visible in the Dribbble archive</span>
          </div>
          <div className="proof-card">
            <b>Digital + UI</b>
            <span>web, landing pages, mobile and interface systems</span>
          </div>
          <div className="proof-card">
            <b>Motion + 3D</b>
            <span>After Effects studies, loops and Blender illustration</span>
          </div>
          <div className="proof-card">
            <b>Source-linked</b>
            <span>selected cards open the original Dribbble work</span>
          </div>
        </div>

        <div className="work-grid">
          {featured.map((item) => (
            <a
              key={item.href}
              className="wcard reveal work-real-card"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="wthumb work-real-thumb">
                <img
                  className="work-real-img"
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />
                <span className="work-source mono">Dribbble ↗</span>
                <span className="warrow">↗</span>
              </div>
              <div className="wmeta">
                <div>
                  <div className="work-cat mono">{item.category}</div>
                  <div className="wname dsp">{item.title}</div>
                  {item.note ? <p className="wblurb">{item.note}</p> : null}
                  <div className="wtags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="wtag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="work-more">
          <Link className="view-all" href="/work">
            View categorized archive <span>→</span>
          </Link>
        </div>
      </section>

      <section className="section wrap" id="about">
        <div className="reveal">
          <div className="kicker">About</div>
          <h2 className="stitle dsp">A multidisciplinary designer, not a one-format specialist.</h2>
        </div>
        <div className="about-grid">
          <div className="about-body reveal">
            <p>
              My background spans <strong>visual, graphic and digital design</strong>,
              with UI as a strong part of the toolkit rather than the whole story.
              I&apos;m comfortable moving from a landing page or campaign-style visual
              to interface design, motion and 3D while keeping hierarchy and craft
              consistent.
            </p>
            <p>
              That range is especially useful for teams that need one designer to
              understand the brief, work within an established visual language, and
              adapt the idea across <strong>different digital formats</strong> without
              losing quality.
            </p>
          </div>
          <div className="stats reveal">
            {[
              { num: "89", lab: "Dribbble shots" },
              { num: "5", lab: "Core disciplines" },
              { num: "Adobe", lab: "+ Figma workflow" },
              { num: "3D", lab: "+ motion capability" },
            ].map((s) => (
              <div className="stat" key={s.lab}>
                <div className="num dsp">{s.num}</div>
                <div className="lab">{s.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" id="experience">
        <div className="reveal">
          <div className="kicker">Experience</div>
          <h2 className="stitle dsp">Design experience across product, digital and communication work.</h2>
        </div>
        <div className="exp">
          {experiences.map((x) => (
            <div className="exp-row reveal" key={x.company + x.period}>
              <div className="exp-date mono">{x.period}</div>
              <div>
                <div className="exp-role dsp">{x.role}</div>
                <div className="exp-co mono">{x.company}</div>
                <p className="exp-desc">{x.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap" id="skills">
        <div className="reveal">
          <div className="kicker">Capabilities &amp; Tools</div>
          <h2 className="stitle dsp">Built for cross-channel creative work.</h2>
        </div>
        <div className="skills-grid">
          {verifiedCapabilityGroups.map((group) => (
            <div className="skill-col reveal" key={group.h}>
              <h4>{group.h}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap" id="contact">
        <div className="contact reveal">
          <div className="contact-card">
            <span className="ast ast-bg" aria-hidden="true">
              <i />
            </span>
            <div className="contact-kick">Let&apos;s work together</div>
            <h2 className="dsp">
              Need visual work that can move across <span className="em">formats</span>?
            </h2>
            <p>
              Open to Visual, Marketing, Digital and Graphic Designer roles, plus
              selected freelance work. UI, motion and 3D remain part of the toolkit
              when the brief needs them.
            </p>
            <div className="contact-actions">
              <a className="btn btn-light" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email} <span className="arr">↗</span>
              </a>
              <a
                className="btn btn-line-d"
                href={siteConfig.links.dribbble}
                target="_blank"
                rel="noopener noreferrer"
              >
                View full Dribbble archive
              </a>
            </div>
            <div className="contact-proof">
              {portfolioEvidence.dribbbleShotCount} public Dribbble shots · selected work above links to source
            </div>
            <div className="socials">
              <a
                className="social"
                href={siteConfig.links.behance}
                target="_blank"
                rel="noopener noreferrer"
              >
                Behance ↗
              </a>
              <a
                className="social"
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
