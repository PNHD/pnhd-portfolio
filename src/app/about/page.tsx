"use client";

import { motion } from "framer-motion";
import { siteConfig, experiences, skills } from "@/data/portfolio";

export default function AboutPage() {
  const grouped = skills.reduce(
    (acc, s) => {
      (acc[s.category] ??= []).push(s.name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About</h1>

        {/* Bio */}
        <div className="mb-16 max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
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
            interfaces that purely 2D designers can&apos;t match.
          </p>
        </div>

        {/* Skills */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Skills & Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wider">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Experience</h2>
          <div className="space-y-0 border-l-2 border-border ml-2">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8 pb-8 last:pb-0"
              >
                <div className="absolute left-[-7px] top-1 w-3 h-3 rounded-full bg-accent" />
                <p className="text-xs text-muted-foreground mb-1">
                  {exp.period}
                </p>
                <h3 className="font-semibold">{exp.role}</h3>
                <p className="text-sm text-accent">{exp.company}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
