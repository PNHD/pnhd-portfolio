"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { siteConfig, projects } from "@/data/portfolio";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20 md:pt-36 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-medium mb-4">{siteConfig.title}</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-3xl">
            {siteConfig.tagline}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mt-6 max-w-xl">
            {siteConfig.description}
          </p>
          <div className="flex gap-4 mt-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
            >
              View Work <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Work */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold">Featured Work</h2>
          <Link
            href="/work"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Skills Overview */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-bold mb-10">Tools & Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            { icon: "🎨", label: "Figma" },
            { icon: "🖌️", label: "Photoshop" },
            { icon: "✏️", label: "Illustrator" },
            { icon: "🧊", label: "Blender" },
            { icon: "🎬", label: "After Effects" },
            { icon: "⚛️", label: "React" },
            { icon: "🔷", label: "TypeScript" },
            { icon: "💨", label: "Tailwind CSS" },
          ].map((skill) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 p-4 rounded-xl bg-muted"
            >
              <span className="text-2xl">{skill.icon}</span>
              <span className="font-medium text-sm">{skill.label}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
