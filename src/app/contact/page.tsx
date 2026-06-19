"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

const socials = [
  { label: "Dribbble", href: siteConfig.links.dribbble, description: "Design shots & visual work" },
  { label: "Behance", href: siteConfig.links.behance, description: "Detailed case studies" },
  { label: "GitHub", href: siteConfig.links.github, description: "Code & open source" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20"
      >
        {/* Left — headline */}
        <div className="md:col-span-7">
          <span className="section-index">Contact</span>
          <h1 className="display mt-4 mb-8">
            Let&apos;s{" "}
            <span className="gradient-text">talk</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed mb-12">
            Interested in working together or have a question? Drop me a line — I typically respond within 24 hours.
          </p>

          {/* Email — large */}
          <motion.a
            href={`mailto:${siteConfig.email}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease }}
            className="group glow-card flex items-center gap-5 p-6 mb-6"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center shrink-0">
              <Mail size={20} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="label mb-1">Email</p>
              <p className="font-medium group-hover:text-accent transition-colors truncate">
                {siteConfig.email}
              </p>
            </div>
            <ArrowUpRight
              size={18}
              className="text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
            />
          </motion.a>
        </div>

        {/* Right — social links */}
        <div className="md:col-span-5 flex flex-col justify-end">
          <p className="label mb-4">Find me on</p>
          <div className="space-y-3">
            {socials.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease }}
                className="group glow-card flex items-center justify-between p-5"
              >
                <div>
                  <p className="font-medium group-hover:text-accent transition-colors">
                    {link.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {link.description}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </motion.a>
            ))}
          </div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 flex items-center gap-2.5 text-sm text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Currently accepting new projects
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
