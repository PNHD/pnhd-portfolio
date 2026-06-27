import Link from "next/link";
import { projects, experiences, skillGroups, siteConfig } from "@/data/portfolio";

const MARQUEE = [
  "UI Design",
  "Product Design",
  "Design Systems",
  "SaaS Dashboards",
  "Mobile Apps",
  "Motion",
  "3D",
];

const SHOWCASE = [
  { name: "Nova", tag: "UI Kit" },
  { name: "Serenity", tag: "Mobile" },
  { name: "Pulse", tag: "Dashboard" },
  { name: "Elevate", tag: "3D" },
];

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* ───── HERO ───── */}
      <section className="hero wrap">
        <div className="hero-text">
          <div className="pills rise r1">
            <span className="pill">
              <span className="live" />
              Available for work
            </span>
            <span className="pill">Ho Chi Minh City, VN</span>
            <span className="pill">8+ yrs experience</span>
          </div>
          <h1 className="h1 dsp rise r2">
            Interfaces with depth, intention, and a quiet{" "}
            <span className="em">obsession</span>.
          </h1>
          <p className="hero-sub rise r3">
            I&apos;m Dang — a UI &amp; product designer in Ho Chi Minh City. Eight
            years turning tangled problems into interfaces that feel calm, clear,
            and quietly delightful. Mobile, web, SaaS.
          </p>
          <div className="hero-cta rise r4">
            <Link className="btn btn-accent" href="/#work">
              See selected work <span className="arr">↗</span>
            </Link>
            <Link className="btn btn-ghost" href="/#contact">
              Let&apos;s talk
            </Link>
          </div>
          <div className="hero-foot rise r5">
            <span>Open to product roles &amp; freelance</span>
            <span className="ln" />
            <span>2026</span>
          </div>
        </div>
        <div className="hero-showcase rise r3" aria-hidden="true">
          {[0, 1].map((col) => (
            <div key={col} className={`sc-col sc-col-${col === 0 ? "a" : "b"}`}>
              <div className="sc-track">
                {[...SHOWCASE, ...SHOWCASE].map((s, i) => (
                  <div className="sc-card" key={i}>
                    <div className="sc-thumb">
                      <div className="sc-ph" />
                    </div>
                    <div className="sc-meta">
                      <span className="sc-name dsp">{s.name}</span>
                      <span className="sc-tag">{s.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── MARQUEE ───── */}
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

      {/* ───── WORK ───── */}
      <section className="section wrap" id="work">
        <div className="reveal work-head">
          <div>
            <div className="kicker">Selected Work</div>
            <h2 className="stitle dsp">Crafted with precision, designed for impact.</h2>
          </div>
          <Link className="view-all" href="/work">
            View all work <span>→</span>
          </Link>
        </div>
        <div className="work-grid">
          {featured.map((p) => (
            <Link key={p.slug} className="wcard reveal" href={`/work/${p.slug}`}>
              <div className="wthumb">
                <div className="ph-grid" />
                <span className="ph-dim mono">{p.heroDim}</span>
                <span className="ph-lab">{p.heroLab}</span>
                <span className="warrow">↗</span>
              </div>
              <div className="wmeta">
                <div>
                  <div className="wname dsp">
                    {p.name} — {p.title}
                  </div>
                  <p className="wblurb">{p.blurb}</p>
                  <div className="wtags">
                    {p.tags.map((t) => (
                      <span key={t} className="wtag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="wyear mono">{p.year}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="work-more">
          <Link className="view-all" href="/work">
            View all {projects.length} projects <span>→</span>
          </Link>
        </div>
      </section>

      {/* ───── ABOUT ───── */}
      <section className="section wrap" id="about">
        <div className="reveal">
          <div className="kicker">About</div>
          <h2 className="stitle dsp">Clarity is a craft. I treat it like one.</h2>
        </div>
        <div className="about-grid">
          <div className="about-body reveal">
            <p>
              I&apos;m a <strong>UI &amp; product designer</strong> obsessed with the
              unglamorous stuff — the empty states, the error copy, the 4px that
              finally makes a layout click.
            </p>
            <p>
              Over <strong>eight years</strong> I&apos;ve designed mobile apps, SaaS
              dashboards, e-commerce and brand systems for six companies, including{" "}
              <strong>S3Corp.</strong>, <strong>Shopline</strong> and{" "}
              <strong>Select Technology</strong>. I lead with research, sweat the
              details, and actually ship.
            </p>
          </div>
          <div className="stats reveal">
            {[
              { num: "8+", lab: "Years experience" },
              { num: "6", lab: "Companies" },
              { num: "50+", lab: "Projects shipped" },
              { num: "2", lab: "UI kits on UI8" },
            ].map((s) => (
              <div className="stat" key={s.lab}>
                <div className="num dsp">{s.num}</div>
                <div className="lab">{s.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── EXPERIENCE ───── */}
      <section className="section wrap" id="experience">
        <div className="reveal">
          <div className="kicker">Experience</div>
          <h2 className="stitle dsp">A decade of crafting digital experiences.</h2>
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

      {/* ───── SKILLS ───── */}
      <section className="section wrap" id="skills">
        <div className="reveal">
          <div className="kicker">Tools &amp; Skills</div>
          <h2 className="stitle dsp">The toolkit.</h2>
        </div>
        <div className="skills-grid">
          {skillGroups.map((s) => (
            <div className="skill-col reveal" key={s.h}>
              <h4>{s.h}</h4>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ───── CONTACT ───── */}
      <section className="section wrap" id="contact">
        <div className="contact reveal">
          <div className="contact-card">
            <span className="ast ast-bg" aria-hidden="true">
              <i />
            </span>
            <div className="contact-kick">Let&apos;s work together</div>
            <h2 className="dsp">
              Have a product that deserves <span className="em">better</span> pixels?
            </h2>
            <p>
              Open to product design roles, freelance projects, and the occasional
              ambitious concept. Tell me what you&apos;re building.
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
                View Dribbble
              </a>
            </div>
            <div className="socials">
              <a className="social" href={siteConfig.links.dribbble} target="_blank" rel="noopener noreferrer">
                Dribbble ↗
              </a>
              <a className="social" href={siteConfig.links.behance} target="_blank" rel="noopener noreferrer">
                Behance ↗
              </a>
              <a className="social" href={siteConfig.links.ui8} target="_blank" rel="noopener noreferrer">
                UI kits on UI8 ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
