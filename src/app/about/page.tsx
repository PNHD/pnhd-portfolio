"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Box,
  Wand2,
  Bot,
  Search,
  PenTool,
  Layers,
  Send,
} from "lucide-react";
import { siteConfig, experiences, skills } from "@/data/portfolio";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const categoryIcons: Record<string, ReactNode> = {
  Design: <Palette size={16} />,
  "3D": <Box size={16} />,
  Motion: <Wand2 size={16} />,
  "AI Tools": <Bot size={16} />,
};

const processSteps = [
  { icon: <Search size={20} />, title: "Research", description: "Understand users, business goals, and competitive landscape." },
  { icon: <PenTool size={20} />, title: "Design", description: "Wireframes to high-fidelity — iterating fast with Figma." },
  { icon: <Layers size={20} />, title: "Refine", description: "Polish interactions, animations, and cross-screen consistency." },
  { icon: <Send size={20} />, title: "Deliver", description: "Production-ready assets with tokens and dev handoff docs." },
];

export default function AboutPage() {
  const grouped = skills.reduce(
    (acc, s) => {
      (acc[s.category] ??= []).push(s.name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="section-index">About</span>
        <h1 className="heading-xl mt-2 mb-6">
          About <span className="gradient-text">me</span>
        </h1>
      </motion.div>

      {/* Bio — asymmetric layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-24"
      >
        <div className="md:col-span-7 space-y-5 text-muted-foreground leading-relaxed">
          <p className="text-foreground text-lg md:text-xl leading-relaxed">
            I&apos;m <strong>{siteConfig.name}</strong> — a UI &amp; product
            designer based in Ho Chi Minh City with 8+ years of experience
            across graphic design and interface design.
          </p>
          <p>
            I believe great design starts with understanding people. I leverage
            research to create user-centered products that are both beautiful
            and functional. My process is hands-on, collaborative, and iterative.
          </p>
          <p>
            I care most about clarity and detail — typography, spacing,
            interaction, and the small things that make a product feel right.
            When a project needs it, I can also lend a hand with 3D visuals in
            Blender.
          </p>
        </div>
        <div className="md:col-span-5 flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-4">
            {[
              ["8+", "Years"],
              ["50+", "Projects"],
              ["6", "Companies"],
              ["UI/UX", "Focus"],
            ].map(([val, label]) => (
              <div key={label} className="glow-card p-5 text-center">
                <p className="text-2xl font-bold gradient-text">{val}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <hr className="hr-gradient mb-24" />

      {/* Process */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="mb-24"
      >
        <span className="section-index">Process</span>
        <h2 className="heading-xl mt-2 mb-12">How I Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
              className="glow-card p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center text-accent mb-5">
                {step.icon}
              </div>
              <p className="mono text-muted-foreground mb-2">0{i + 1}</p>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <hr className="hr-gradient mb-24" />

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="mb-24"
      >
        <span className="section-index">Expertise</span>
        <h2 className="heading-xl mt-2 mb-12">Skills & Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Object.entries(grouped).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease }}
              className="glow-card p-6"
            >
              <div className="w-9 h-9 rounded-lg bg-accent/8 flex items-center justify-center text-accent mb-4">
                {categoryIcons[category]}
              </div>
              <p className="text-sm font-semibold mb-3">{category}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent/40 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <hr className="hr-gradient mb-24" />

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="section-index">Career</span>
        <h2 className="heading-xl mt-2 mb-12">Experience</h2>
        <div className="space-y-0 divide-y divide-border">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6, ease }}
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
      </motion.div>
    </div>
  );
}
