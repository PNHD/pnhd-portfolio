"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Palette,
  Box,
  Wand2,
  Bot,
} from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { thumbnails } from "@/components/project-thumbnails";
import { HeroVisual } from "@/components/hero-visual";
import { Marquee } from "@/components/marquee";
import { CountUp } from "@/components/count-up";
import { siteConfig, projects, skills, experiences } from "@/data/portfolio";
import type { ReactNode } from "react";

const stats = [
  { value: 8, suffix: "+", label: "Years of experience" },
  { value: 6, suffix: "", label: "Companies & studios" },
  { value: 50, suffix: "+", label: "Products shipped" },
  { value: 100, suffix: "%", label: "Passion for craft" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const categoryIcons: Record<string, ReactNode> = {
  Design: <Palette size={18} />,
  "3D": <Box size={18} />,
  Motion: <Wand2 size={18} />,
  "AI Tools": <Bot size={18} />,
};

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const notFeatured = projects.filter((p) => !p.featured);

  const grouped = skills.reduce(
    (acc, s) => {
      (acc[s.category] ??= []).push(s.name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
    <>
      {/* ══════════════════════════════════════
          01 — HERO
          ══════════════════════════════════════ */}
      <section className="relative min-h-dvh flex flex-col justify-center overflow-hidden">
        <div className="aurora" />
        <div className="starfield" />
        <div className="grid-fade" />

        <div className="mx-auto max-w-7xl px-6 md:px-10 pt-32 md:pt-36 pb-16 relative z-10 w-full">
          {/* Top row — name + status */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="flex items-center justify-between mb-12 md:mb-16"
          >
            <p className="label">{siteConfig.name}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="hidden sm:inline">Available for work</span>
            </div>
          </motion.div>

          {/* Two-column: text + visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left — copy */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease }}
                className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-border bg-surface/60 backdrop-blur-sm text-xs font-medium text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                UI / Product Designer · Ho Chi Minh City
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease }}
                className="hero-headline"
              >
                <span className="block">Designing</span>
                <span className="block">interfaces with</span>
                <span className="block gradient-text">depth.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease }}
                className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed mt-8"
              >
                I craft intuitive, polished products with a sharp eye for
                detail — across mobile, web, and SaaS interfaces.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease }}
                className="flex gap-4 mt-10"
              >
                <Link
                  href="/work"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:scale-[1.03] active:scale-[0.97] transition-transform"
                >
                  View Work
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border bg-surface/40 backdrop-blur-sm text-sm font-medium hover:bg-surface hover:border-foreground/20 transition-all"
                >
                  Contact
                </Link>
              </motion.div>
            </div>

            {/* Right — floating visual */}
            <div className="lg:col-span-6">
              <HeroVisual />
            </div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 mt-16 md:mt-20 pt-10 border-t border-border"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="stat-value">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Marquee band */}
      <section className="border-y border-border bg-surface/30">
        <Marquee />
      </section>

      {/* ══════════════════════════════════════
          02 — SELECTED WORK
          ══════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="section-index">02</span>
            <h2 className="heading-xl mt-2">Selected Work</h2>
          </div>
          <Link
            href="/work"
            className="link-underline text-sm text-muted-foreground hover:text-foreground transition-colors pb-0.5"
          >
            All projects
          </Link>
        </motion.div>

        {/* Featured hero project — full width */}
        {featured[0] && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="mb-10"
          >
            <Link href={`/work/${featured[0].slug}`} className="group block">
              <div className="featured-card">
                <div className="aspect-[16/10] md:aspect-[16/9] overflow-hidden relative">
                  {(() => {
                    const Thumb = thumbnails[featured[0].slug];
                    return Thumb ? (
                      <div className="w-full h-full card-image">
                        <Thumb />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent/20 via-accent-2/10 to-transparent" />
                    );
                  })()}
                  <div className="card-overlay" />
                </div>
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {featured[0].tags.map((tag) => (
                        <span key={tag} className="tag-chip">{tag}</span>
                      ))}
                    </div>
                    <h3 className="heading-lg group-hover:text-accent transition-colors">
                      {featured[0].title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1.5 max-w-lg leading-relaxed">
                      {featured[0].description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-accent shrink-0">
                    View project
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* 2-column grid for remaining */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featured.slice(1).map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
          {notFeatured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (featured.length - 1 + i) * 0.1, ease }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          03 — ABOUT STRIP
          ══════════════════════════════════════ */}
      <section className="border-y border-border">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16"
          >
            <div className="md:col-span-4">
              <span className="section-index">03</span>
              <h2 className="heading-xl mt-2">About</h2>
            </div>
            <div className="md:col-span-8 space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-foreground text-lg md:text-xl leading-relaxed">
                I&apos;m a UI &amp; product designer focused on clean, intuitive
                interfaces — turning complex flows into experiences that feel
                effortless.
              </p>
              <p>
                Over 8 years, I&apos;ve designed across mobile apps, SaaS
                dashboards, e-commerce, and branding for 6 companies
                including S3Corp., Shopline, and Select Technology. I&apos;m
                passionate about research-driven design that puts users first.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors mt-4"
              >
                <span className="link-underline">Read more about me</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          04 — EXPERIENCE
          ══════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="section-index">04</span>
          <h2 className="heading-xl mt-2 mb-14">Experience</h2>
        </motion.div>

        <div className="space-y-0 divide-y divide-border">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease }}
              className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-7 first:pt-0"
            >
              <p className="mono text-muted-foreground md:col-span-3 pt-0.5">
                {exp.period}
              </p>
              <div className="md:col-span-4">
                <h3 className="font-semibold">{exp.role}</h3>
                <p className="text-sm text-accent">{exp.company}</p>
              </div>
              <p className="md:col-span-5 text-sm text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          05 — SKILLS
          ══════════════════════════════════════ */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="section-index">05</span>
            <h2 className="heading-xl mt-2 mb-14">Tools & Skills</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Object.entries(grouped).map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease }}
                className="glow-card p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center text-accent mb-5">
                  {categoryIcons[category]}
                </div>
                <p className="text-sm font-semibold mb-4">{category}</p>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-muted-foreground flex items-center gap-2.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          06 — CTA
          ══════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="rounded-2xl border border-border p-10 md:p-20 text-center relative overflow-hidden spotlight"
        >
          <div className="aurora opacity-70" />
          <div className="grid-fade" />
          <div className="relative z-10">
            <span className="section-index">06</span>
            <h2 className="heading-xl mt-4 mb-5">
              Let&apos;s work{" "}
              <span className="gradient-text">together</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
              Have a project in mind? I&apos;d love to bring your vision to
              life with thoughtful UI design and 3D artistry.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-foreground text-background text-sm font-medium hover:scale-[1.03] active:scale-[0.97] transition-transform"
            >
              Get in Touch
              <ArrowRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
