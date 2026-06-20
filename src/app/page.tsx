"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { thumbnails } from "@/components/project-thumbnails";
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

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

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

    // Scroll-to-top visibility
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Custom cursor (desktop only)
    const cursor = cursorRef.current;
    let raf = 0;
    let mouseX = 0,
      mouseY = 0,
      curX = 0,
      curY = 0;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor?.classList.add("visible");
    };
    const loop = () => {
      curX += (mouseX - curX) * 0.2;
      curY += (mouseY - curY) * 0.2;
      if (cursor) {
        cursor.style.left = curX + "px";
        cursor.style.top = curY + "px";
      }
      raf = requestAnimationFrame(loop);
    };
    const enter = () => cursor?.classList.add("hovering");
    const leave = () => cursor?.classList.remove("hovering");
    let hoverEls: Element[] = [];
    if (fine && cursor) {
      document.addEventListener("mousemove", onMove);
      raf = requestAnimationFrame(loop);
      hoverEls = [...document.querySelectorAll("a, button, .ed-card, .ed-skill-list li, .ed-timeline-item")];
      hoverEls.forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  const scrollTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number) => void } }).lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="ed">
      <div className="ed-grain" />
      <div ref={cursorRef} className="ed-cursor" />

      {/* ───── HERO ───── */}
      <section id="hero" className="ed-hero">
        <div className="ed-hero-bg ed-noise">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/projects/isometric-bedroom.jpg" alt="" />
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
              const Thumb = thumbnails[project.slug];
              const large = i === 0 || i === projects.length - 1;
              return (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className={`ed-card ed-reveal${large ? " large" : ""}`}
                >
                  <div className="ed-project-img ed-noise">
                    {Thumb ? <Thumb /> : null}
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
          <div className="ed-about-grid">
            <div className="ed-about-text ed-reveal">
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
                including <strong>S3Corp.</strong>, <strong>Shopline</strong>,
                and <strong>Select Technology</strong>. I care most about
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
            <div className="ed-about-img ed-noise ed-reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/projects/stylized-tree.jpg" alt="3D render by Dang Pham" />
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
        <div className="ed-contact-bg ed-noise">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/projects/cauldron-bitcoin.jpg" alt="" />
        </div>
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
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Scroll to top */}
      <button
        onClick={scrollTop}
        className={`ed-totop${showTop ? " show" : ""}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
