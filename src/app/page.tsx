"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { siteConfig, projects, skills } from "@/data/portfolio";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  const grouped = skills.reduce(
    (acc, s) => {
      (acc[s.category] ??= []).push(s.name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-36 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted text-sm text-muted-foreground mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for work
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl">
            Designing interfaces
            <br />
            that feel{" "}
            <span className="gradient-text">alive</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mt-6 max-w-xl leading-relaxed">
            {siteConfig.description}
          </p>
          <div className="flex gap-4 mt-10">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
            >
              View Work <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid — Featured Work + Info */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Selected Work</h2>
          <Link
            href="/work"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {/* Bento layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Featured project — large */}
          {featured[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-2 row-span-2"
            >
              <Link href={`/work/${featured[0].slug}`} className="group block h-full">
                <div className="h-full rounded-3xl bg-muted bento-glow p-1">
                  <div className="h-full rounded-[20px] bg-surface overflow-hidden flex flex-col">
                    <div className="flex-1 min-h-[300px] bg-gradient-to-br from-accent/20 via-accent-2/10 to-transparent flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Preview</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-xl group-hover:text-accent transition-colors">
                            {featured[0].title}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-2 max-w-md">
                            {featured[0].description}
                          </p>
                        </div>
                        <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-accent transition-colors mt-1 shrink-0" />
                      </div>
                      <div className="flex gap-2 mt-4">
                        {featured[0].tags.map((tag) => (
                          <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Other featured */}
          {featured.slice(1).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}

          {/* Stats bento card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-muted bento-glow p-1"
          >
            <div className="rounded-[20px] bg-surface p-6 h-full flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-bold gradient-text">8+</p>
                  <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text">50+</p>
                  <p className="text-sm text-muted-foreground mt-1">Projects Delivered</p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text">6</p>
                  <p className="text-sm text-muted-foreground mt-1">Companies</p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text">UI</p>
                  <p className="text-sm text-muted-foreground mt-1">+ 3D Design</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills — Bento style */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-2xl font-bold mb-8">Tools & Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(grouped).map(([category, items]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-muted bento-glow p-1"
            >
              <div className="rounded-[14px] bg-surface p-5 h-full">
                <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">
                  {category}
                </p>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
