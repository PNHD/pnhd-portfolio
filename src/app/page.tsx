import Link from "next/link";
import { experiences } from "@/data/portfolio";
import { verifiedCapabilityGroups } from "@/data/portfolio-capabilities";
import { independentProjects } from "@/data/independent-projects";
import {
  refreshedSiteConfig as siteConfig,
  workItems,
} from "@/data/portfolio-refresh";
import { dribbbleImage } from "@/lib/dribbble-image";

const MARQUEE = [
  "Product UI",
  "Visual Design",
  "E-commerce",
  "AI Creative",
  "Motion",
  "Figma",
  "Design Systems",
  "3D",
];

const SERVICES = [
  {
    eyebrow: "Service 01 · SaaS / Product",
    title: "Product UI Polish Sprint",
    description:
      "For working SaaS products that need a clearer, more consistent and production-ready interface without a full rebuild.",
    tags: ["UI audit", "Key screens", "Responsive", "Components", "Developer handoff"],
  },
  {
    eyebrow: "Service 02 · E-commerce / Creative",
    title: "AI-Assisted Creative Sprint",
    description:
      "For digital brands that need more campaign and product-creative variations while keeping visual direction, product accuracy and quality control intact.",
    tags: ["Static creative", "AI image", "Motion", "Video", "Source files"],
  },
] as const;

const FEATURED_HREFS = [
  "https://dribbble.com/shots/12877734-Luxrious-Fashion-Web-Design",
  "https://dribbble.com/shots/11126436-Divine-Experience-Landing-Page",
  "https://dribbble.com/shots/11430675-G-A-T-Sneaker-Shop-App-UI-Kit",
  "https://dribbble.com/shots/11333730-Nike-Web-UI-Design",
  "https://dribbble.com/shots/14781306-iOS-14-Glossy-icons-Dark-Light-Versions-492-icons",
  "https://dribbble.com/shots/11131772-Food-Delivery-App",
  "https://dribbble.com/shots/11912884-3D-Sushi-Illustration",
  "https://dribbble.com/shots/16308893-80-s-Style-Animation-Loop",
];

const SHOWCASE_HREFS = [
  FEATURED_HREFS[0],
  FEATURED_HREFS[2],
  FEATURED_HREFS[4],
  FEATURED_HREFS[6],
];

const featured = FEATURED_HREFS.flatMap((href) => {
  const item = workItems.find((work) => work.href === href);
  return item ? [item] : [];
});

const showcase = SHOWCASE_HREFS.flatMap((href) => {
  const item = workItems.find((work) => work.href === href);
  return item ? [item] : [];
});

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-text">
          <div className="hero-eyebrow mono rise r1">
            Product &amp; Visual Designer · Ho Chi Minh City
          </div>
          <h1 className="h1 dsp rise r2">
            I help digital products and brands become{" "}
            <span className="em">clearer, sharper and ready to ship</span>.
          </h1>
          <p className="hero-sub rise r3">
            Senior multidisciplinary designer working across SaaS and product UI,
            e-commerce creative, motion and AI-assisted image/video production — with
            implementation-aware workflows when a project needs more than static design.
          </p>
          <div className="hero-role-line rise r3" aria-label="Service focus">
            <span>SaaS / Product UI</span>
            <span>E-commerce Creative</span>
            <span>Design Systems</span>
            <span>AI Image / Video</span>
          </div>
          <div className="hero-cta rise r4">
            <a
              className="btn btn-accent"
              href={`mailto:${siteConfig.email}?subject=Project%20inquiry`}
              data-analytics-placement="hero_primary"
              data-analytics-section-context="hero"
              data-analytics-label="project inquiry"
              data-ph-sensitive
            >
              Discuss a project <span className="arr">↗</span>
            </a>
            <Link className="btn btn-ghost" href="/#projects">
              View product case studies
            </Link>
          </div>
          <div className="hero-foot rise r5">
            <span>Available for selected freelance projects and design roles</span>
            <span className="ln" />
            <span>2026</span>
          </div>
        </div>

        <div className="hero-showcase rise r3" aria-hidden="true">
          {[0, 1].map((col) => (
            <div key={col} className={`sc-col sc-col-${col === 0 ? "a" : "b"}`}>
              <div className="sc-track">
                {[...showcase, ...showcase].map((item, i) => (
                  <div className="sc-card" key={`${item.href}-${i}`}>
                    <div className="sc-thumb sc-thumb-real">
                      <img
                        src={dribbbleImage(item.image, 640)}
                        srcSet={`${dribbbleImage(item.image, 480)} 480w, ${dribbbleImage(item.image, 800)} 800w`}
                        sizes="260px"
                        alt=""
                      />
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

      <section className="section wrap" id="services" data-analytics-section="services">
        <div className="reveal section-intro-row">
          <div>
            <div className="kicker">Ways to work together</div>
            <h2 className="stitle dsp">Two focused services built around work that needs to ship.</h2>
          </div>
          <p className="section-note">
            Start with a bounded sprint. If the collaboration works, the same system can
            continue as ongoing product or creative support.
          </p>
        </div>

        <div className="project-grid">
          {SERVICES.map((service) => (
            <article className="project-card reveal" key={service.title}>
              <div className="project-body">
                <div className="project-eyebrow mono">{service.eyebrow}</div>
                <h3 className="dsp">{service.title}</h3>
                <p>{service.description}</p>
                <div className="wtags">
                  {service.tags.map((tag) => (
                    <span className="wtag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(service.title)}`}
                    data-analytics-placement="home_services"
                    data-analytics-section-context="services"
                    data-analytics-label={service.title}
                    data-ph-sensitive
                  >
                    Ask about this service →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap" id="projects" data-analytics-section="projects">
        <div className="reveal section-intro-row">
          <div>
            <div className="kicker">Product Case Studies</div>
            <h2 className="stitle dsp">Proof through products, systems and repeatable workflows.</h2>
          </div>
          <p className="section-note">
            Self-directed projects showing problem framing, interface design, production
            systems and implementation-aware decision making.
          </p>
        </div>

        <div className="project-grid">
          {independentProjects.map((project, index) => (
            <article className="project-card reveal" key={project.title}>
              <div className={`project-visual project-visual-${index + 1} project-visual-thumb`}>
                <img
                  className="project-thumb-img"
                  src={project.thumbnail}
                  alt={project.thumbnailAlt}
                  loading="lazy"
                />
                <div className="project-visual-top mono">
                  <span>Independent / 0{index + 1}</span>
                  <span>2026</span>
                </div>
                <div className="project-visual-center">
                  <span className="project-mark" aria-hidden="true" />
                  <strong className="dsp">{project.accent}</strong>
                </div>
                <div className="project-visual-lines" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="project-body">
                <div className="project-eyebrow mono">{project.eyebrow}</div>
                <h3 className="dsp">{project.title}</h3>
                <p>{project.description}</p>
                <div className="wtags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="wtag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.caseHref ? (
                    <Link
                      href={project.caseHref}
                      data-analytics-event="work_opened"
                      data-analytics-placement="home_projects"
                      data-analytics-section-context="projects"
                      data-project-slug={project.caseHref.replace("/projects/", "")}
                      data-project-name={project.title}
                    >
                      View case study →
                    </Link>
                  ) : null}
                  {project.liveHref ? (
                    <a href={project.liveHref} target="_blank" rel="noopener noreferrer">
                      {project.title === "Thiên Kim" ? "View TikTok ↗" : "Open live product ↗"}
                    </a>
                  ) : null}
                  {project.repoHref ? (
                    <a href={project.repoHref} target="_blank" rel="noopener noreferrer">
                      GitHub ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap" id="work" data-analytics-section="work">
        <div className="reveal work-head">
          <div>
            <div className="kicker">Selected Visual Work</div>
            <h2 className="stitle dsp">Visual craft across web, interface, motion and systems.</h2>
          </div>
          <Link className="view-all" href="/work">
            View full work <span>→</span>
          </Link>
        </div>

        <div className="work-grid selected-work-grid">
          {featured.map((item) => (
            <a
              key={item.href}
              className="wcard reveal work-real-card"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-placement="home_featured"
              data-analytics-section-context="work"
              data-analytics-label={item.title}
            >
              <div className="wthumb work-real-thumb">
                <img
                  className="work-real-img"
                  src={dribbbleImage(item.image, 1000)}
                  srcSet={`${dribbbleImage(item.image, 640)} 640w, ${dribbbleImage(item.image, 1000)} 1000w, ${dribbbleImage(item.image, 1400)} 1400w`}
                  sizes="(max-width: 680px) calc(100vw - 36px), (max-width: 1320px) 46vw, 590px"
                  alt={item.title}
                  loading="lazy"
                />
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
            View full work <span>→</span>
          </Link>
        </div>
      </section>

      <section className="section wrap" id="experience" data-analytics-section="experience">
        <div className="reveal section-intro-row">
          <div>
            <div className="kicker">Experience</div>
            <h2 className="stitle dsp">Professional design work across product, visual and digital teams.</h2>
          </div>
          <p className="section-note">
            The case studies show how I work now; the timeline shows where that craft has
            been applied professionally.
          </p>
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

      <section className="section wrap" id="about" data-analytics-section="about">
        <div className="reveal">
          <div className="kicker">About</div>
          <h2 className="stitle dsp">A multidisciplinary designer with a product mindset.</h2>
        </div>
        <div className="about-grid">
          <div className="about-body reveal">
            <p>
              My background spans <strong>visual, graphic and digital design</strong>,
              including e-commerce and promotional work, with UI as a strong part of
              the toolkit rather than the whole story. I&apos;ve worked across visual
              communication, product interfaces, landing pages, motion and visual
              systems.
            </p>
            <p>
              I also build independent tools, prototypes and AI content workflows when
              a problem benefits from something more functional than a static design.
              The goal is the same: make complex information and production systems{" "}
              <strong>clear, usable and visually coherent</strong>.
            </p>
          </div>
          <div className="stats reveal">
            {[
              { num: "2016–25", lab: "Professional design experience" },
              { num: "Product", lab: "+ visual communication" },
              { num: "Figma", lab: "+ Adobe workflow" },
              { num: "AI Video", lab: "+ motion & 3D" },
            ].map((s) => (
              <div className="stat" key={s.lab}>
                <div className="num dsp">{s.num}</div>
                <div className="lab">{s.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" id="skills">
        <div className="reveal">
          <div className="kicker">Capabilities &amp; Tools</div>
          <h2 className="stitle dsp">Visual craft across interfaces, motion and AI workflows.</h2>
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
              Have a product or creative system that needs to{" "}
              <span className="em">feel ready to ship</span>?
            </h2>
            <p>
              Available for selected freelance product and visual-design projects, plus
              the right full-time design role. I can support UI, digital creative,
              motion and AI-assisted production without inventing business outcomes the
              work has not proved.
            </p>
            <div className="contact-actions">
              <a
                className="btn btn-light"
                href={`mailto:${siteConfig.email}?subject=Project%20inquiry`}
                data-analytics-placement="contact_primary"
                data-analytics-section-context="contact"
                data-analytics-label="project inquiry"
                data-ph-sensitive
              >
                Discuss a project <span className="arr">↗</span>
              </a>
              <Link className="btn btn-line-d" href="/work">
                View full work
              </Link>
            </div>
            <div className="socials">
              <a
                className="social"
                href={siteConfig.links.dribbble}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-placement="contact_social"
                data-analytics-section-context="contact"
                data-analytics-label="Dribbble"
              >
                Dribbble ↗
              </a>
              <a
                className="social"
                href={siteConfig.links.behance}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-placement="contact_social"
                data-analytics-section-context="contact"
                data-analytics-label="Behance"
                data-destination-type="behance"
              >
                Behance ↗
              </a>
              <a
                className="social"
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-placement="contact_social"
                data-analytics-section-context="contact"
                data-analytics-label="GitHub"
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
