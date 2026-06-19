"use client";

import { motion } from "framer-motion";
import { siteConfig, experiences, skills } from "@/data/portfolio";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function AboutPage() {
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
    <div className="mx-auto max-w-4xl px-6 py-20">
      <motion.div {...fadeUp}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About <span className="gradient-text">me</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-16 max-w-xl">
          A quick look at who I am and what I bring to the table.
        </p>
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 max-w-2xl space-y-4 text-muted-foreground leading-relaxed"
      >
        <p>
          Hi, I&apos;m <strong className="text-foreground">{siteConfig.name}</strong> — a UI
          Designer based in Ho Chi Minh City, Vietnam with 8+ years of
          experience in graphic and interface design.
        </p>
        <p>
          I love learning how people think and behave, and I leverage research
          to design user-centered products and experiences. My process is
          hands-on, collaborative, and iterative.
        </p>
        <p>
          What sets me apart is my combination of UI design expertise and 3D
          illustration skills (Blender). I bring a unique visual depth to
          interfaces that purely 2D designers can&apos;t match. I also actively
          use AI tools like Claude, ChatGPT, and Gemini to accelerate
          research, ideation, and content workflows.
        </p>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-2xl font-bold mb-8">Skills & Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(grouped).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-surface border border-border p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <span>{categoryIcons[category] ?? "•"}</span>
                <h3 className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {category}
                </h3>
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
      </motion.div>

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-8">Experience</h2>
        <div className="space-y-0 border-l-2 border-border ml-2">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative pl-8 pb-10 last:pb-0"
            >
              <div className="absolute left-[-7px] top-1.5 w-3 h-3 rounded-full bg-accent timeline-dot" />
              <p className="text-xs text-muted-foreground mb-1">{exp.period}</p>
              <h3 className="font-semibold">{exp.role}</h3>
              <p className="text-sm text-accent mt-0.5">{exp.company}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
