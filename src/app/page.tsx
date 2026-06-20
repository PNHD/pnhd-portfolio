"use client";

import { useEffect } from "react";
import Link from "next/link";
import { siteConfig, projects, experiences, skills } from "@/data/portfolio";

const marqueeItems = [
  "UI Design",
  "Product Design",
  "Design Systems",
  "SaaS Dashboards",
  "Mobile Apps",
  "Motion",
  "3D Art",
];

const stats = [
  { value: "8", suffix: "+", label: "Years Experience" },
  { value: "6", suffix: "", label: "Companies" },
  { value: "50", suffix: "+", label: "Projects Shipped" },
];

// CSS-art per project (see globals.css .ed-art-*)
const projectArt: Record<string, string> = {
  "nova-ui-kit": "ed-art-nova",
  "meditation-app": "ed-art-serenity",
  "analytics-dashboard": "ed-art-pulse",
  "3d-landing-page": "ed-art-elevate",
};

export default function Home() {
  const grouped = skills.reduce(
    (acc, s) => {
      (acc[s.category] ??= []).push(s.name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  useEffect(() => {
    // Reveal on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".ed-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ed">
      {/* ───── HERO ───── */}
      <section id="hero" className="ed-hero">
        <div className="ed-hero-orbs">
          <div className="ed-orb ed-orb-1" />
          <div className="ed-orb ed-orb-2" />
        </div>
        <div className="ed-hero-content">
          <span className="ed-label">Available for work</span>
          <h1 className="ed-hero-title">
            Designing<br />
            interfaces with<br />
            <span className="ed-serif">depth</span> &amp;{" "}
            <span className="ed-serif warm">intention</span>.
          </h1>
          <p className="ed-hero-sub">
            {siteConfig.title} based in Ho Chi Minh City. 8+ years crafting
            intuitive, visually rich experiences across mobile, web, and SaaS —
            built on research and a sharp eye for detail.
          </p>
          <div className="ed-cta-row">
            <Link href="/#work" className="ed-btn ed-btn-primary">
              View Work →
            </Link>
            <Link href="/#contact" className="ed-btn ed-btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="ed-hero-meta">
          <div>Ho Chi Minh City, VN</div>
          <div className="ed-scroll-ind">
            Scroll <span className="ed-scroll-line" />
          </div>
        </div>
      </section>

      {/* ───── MARQUEE ───── */}
      <div className="ed-marquee">
        <div className="ed-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="ed-marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ───── WORK ───── */}
      <section id="work" className="ed-section">
        <div className="ed-container">
          <div className="ed-section-label ed-reveal">
            <span className="num">01</span> Selected Work
          </div>
          <h2 className="ed-section-title ed-reveal">
            Crafted with <span className="ed-serif">precision</span>,<br />
            designed for <span className="ed-serif">impact</span>.
          </h2>
          <div className="ed-project-grid">
            {projects.map((project, i) => {
              const large = i === 0 || i === projects.length - 1;
              const art = projectArt[project.slug] ?? "ed-art-nova";
              return (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className={`ed-card ed-reveal${large ? " large" : ""}`}
                >
                  <div className="ed-project-img">
                    <div className={`ed-art ${art}`} />
                  </div>
                  <div className="ed-project-info">
                    <div>
                      <h3>{project.title}</h3>
                      <p className="ed-project-desc">{project.description}</p>
                      <div className="ed-tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="ed-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="ed-year">{project.year}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── ABOUT ───── */}
      <section id="about" className="ed-section ed-alt">
        <div className="ed-container">
          <div className="ed-section-label ed-reveal">
            <span className="num">02</span> About
          </div>
          <div className="ed-about-text ed-reveal" style={{ maxWidth: "760px" }}>
            <h2 className="ed-section-title" style={{ marginBottom: "2rem" }}>
              Designing with <span className="ed-serif">clarity</span> &amp;{" "}
              <span className="ed-serif warm">craft</span>.
            </h2>
            <p>
              I&apos;m a <strong>UI &amp; product designer</strong> focused on
              clean, intuitive interfaces — turning complex flows into
              experiences that feel effortless.
            </p>
            <p>
              Over <strong>8+ years</strong> I&apos;ve designed across mobile
              apps, SaaS dashboards, e-commerce, and branding for 6 companies
              including <strong>S3Corp.</strong>, <strong>Shopline</strong>, and{" "}
              <strong>Select Technology</strong>. I care most about
              research-driven design that puts users first.
            </p>
            <div className="ed-stats">
              {stats.map((s) => (
                <div key={s.label} className="ed-stat">
                  <div className="ed-stat-num">
                    <span className="ed-serif">{s.value}</span>
                    {s.suffix}
                  </div>
                  <div className="ed-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── EXPERIENCE ───── */}
      <section id="experience" className="ed-section">
        <div className="ed-container">
          <div className="ed-section-label ed-reveal">
            <span className="num">03</span> Experience
          </div>
          <h2 className="ed-section-title ed-reveal">
            A decade of <span className="ed-serif">crafting</span><br />
            digital experiences.
          </h2>
          <div className="ed-reveal">
            {experiences.map((exp, i) => (
              <div key={i} className="ed-timeline-item">
                <div className="ed-timeline-date">{exp.period}</div>
                <div className="ed-timeline-content">
                  <h3>{exp.role}</h3>
                  <div className="ed-company">{exp.company}</div>
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SKILLS ───── */}
      <section id="skills" className="ed-section ed-alt">
        <div className="ed-container">
          <div className="ed-section-label ed-reveal">
            <span className="num">04</span> Tools &amp; Skills
          </div>
          <h2 className="ed-section-title ed-reveal">
            The <span className="ed-serif">toolkit</span>.
          </h2>
          <div className="ed-skills-grid ed-reveal">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="ed-skill-cat">
                <h3>{category}</h3>
                <ul className="ed-skill-list">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CONTACT ───── */}
      <section id="contact" className="ed-contact">
        <div className="ed-contact-orb" />
        <div className="ed-contact-content">
          <div className="ed-label ed-reveal" style={{ justifyContent: "center" }}>
            Let&apos;s work together
          </div>
          <h2 className="ed-contact-title ed-reveal">
            Have a project in <span className="ed-serif">mind</span>?
          </h2>
          <p className="ed-contact-sub ed-reveal">
            I&apos;d love to help bring your product to life with thoughtful,
            detail-driven design.
          </p>
          <a href={`mailto:${siteConfig.email}`} className="ed-contact-email ed-reveal">
            {siteConfig.email}
          </a>
          <div className="ed-contact-socials ed-reveal">
            <a href={siteConfig.links.dribbble} target="_blank" rel="noopener noreferrer">
              Dribbble
            </a>
            <a href={siteConfig.links.behance} target="_blank" rel="noopener noreferrer">
              Behance
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
