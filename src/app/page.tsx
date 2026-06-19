"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { thumbnails } from "@/components/project-thumbnails";
import { siteConfig, projects, skills } from "@/data/portfolio";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  const grouped = skills.reduce(
    (acc, s) => {
      (acc[s.category] ??= []).push(s.name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  const categoryIcons: Record<string, string> = {
    Design: "🎨",
    "3D": "🧊",
    Motion: "✨",
    "AI Tools": "🤖",
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background orbs */}
        <div className="gradient-orb w-[500px] h-[500px] bg-accent/8 -top-48 -right-48 absolute" />
        <div
          className="gradient-orb w-[400px] h-[400px] bg-accent-2/6 top-20 -left-48 absolute"
          style={{ animationDelay: "-3s" }}
        />

        <div className="mx-auto max-w-6xl px-6 pt-28 pb-20 md:pt-40 md:pb-28 relative z-10">
          <motion.div variants={stagger} initial="initial" animate="animate">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted/80 border border-border text-sm text-muted-foreground mb-8">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for work
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] max-w-5xl"
            >
              Designing interfaces
              <br />
              that feel{" "}
              <span className="gradient-text">alive</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg md:text-xl mt-8 max-w-xl leading-relaxed"
            >
              {siteConfig.description}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-12">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                View Work
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Work — Bento Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex items-center justify-between mb-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold"
          >
            Selected Work
          </motion.h2>
          <Link
            href="/work"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured — large card */}
          {featured[0] && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 lg:col-span-2 row-span-2"
            >
              <Link href={`/work/${featured[0].slug}`} className="group block h-full">
                <div className="h-full rounded-3xl bg-surface border border-border bento-glow card-lift overflow-hidden flex flex-col">
                  <div className="flex-1 min-h-[320px] overflow-hidden">
                    {(() => {
                      const Thumb = thumbnails[featured[0].slug];
                      return Thumb ? (
                        <div className="w-full h-full group-hover:scale-[1.03] transition-transform duration-700">
                          <Thumb />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-accent/20 via-accent-2/10 to-transparent" />
                      );
                    })()}
                  </div>
                  <div className="p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-xl group-hover:text-accent transition-colors">
                          {featured[0].title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-2 max-w-md leading-relaxed">
                          {featured[0].description}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
                      />
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {featured[0].tags.map((tag) => (
                        <span key={tag} className="tag-chip">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Other featured */}
          {featured.slice(1).map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-surface border border-border bento-glow card-lift"
          >
            <div className="p-7 h-full flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-8">
                {[
                  ["8+", "Years Experience"],
                  ["50+", "Projects Delivered"],
                  ["6", "Companies"],
                  ["UI + 3D", "Design Focus"],
                ].map(([val, label]) => (
                  <div key={label}>
                    <p className="text-3xl font-bold gradient-text">{val}</p>
                    <p className="text-sm text-muted-foreground mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools marquee */}
      <section className="border-y border-border py-6 overflow-hidden mb-24">
        <div className="flex whitespace-nowrap">
          <div className="marquee flex items-center gap-8 pr-8">
            {[...skills, ...skills].map((s, i) => (
              <span
                key={`${s.name}-${i}`}
                className="text-sm text-muted-foreground flex items-center gap-2"
              >
                <span className="text-base">{categoryIcons[s.category] ?? "•"}</span>
                {s.name}
              </span>
            ))}
          </div>
          <div className="marquee flex items-center gap-8 pr-8" aria-hidden>
            {[...skills, ...skills].map((s, i) => (
              <span
                key={`dup-${s.name}-${i}`}
                className="text-sm text-muted-foreground flex items-center gap-2"
              >
                <span className="text-base">{categoryIcons[s.category] ?? "•"}</span>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Skills — Bento cards */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-10"
        >
          Tools & Skills
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {Object.entries(grouped).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-surface border border-border bento-glow card-lift p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{categoryIcons[category] ?? "•"}</span>
                <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {category}
                </p>
              </div>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-surface border border-border p-12 md:p-16 text-center relative overflow-hidden"
        >
          <div className="gradient-orb w-[300px] h-[300px] bg-accent/10 -top-32 -right-32 absolute" />
          <div className="gradient-orb w-[250px] h-[250px] bg-accent-2/8 -bottom-32 -left-32 absolute" style={{ animationDelay: "-4s" }} />
          <div className="relative z-10">
            <Sparkles size={24} className="mx-auto text-accent mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let&apos;s create something{" "}
              <span className="gradient-text">together</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Looking for a UI designer who brings both aesthetics and 3D skills to the table? I&apos;d love to hear about your project.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Get in Touch
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
