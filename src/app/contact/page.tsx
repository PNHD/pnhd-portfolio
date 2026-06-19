"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

const socials = [
  {
    label: "Dribbble",
    href: siteConfig.links.dribbble,
    description: "Design shots & visual work",
  },
  {
    label: "Behance",
    href: siteConfig.links.behance,
    description: "Detailed case studies",
  },
  {
    label: "GitHub",
    href: siteConfig.links.github,
    description: "Code & open source",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Let&apos;s <span className="gradient-text">connect</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-14 max-w-xl">
          Interested in working together? Feel free to reach out via email or
          connect on social platforms.
        </p>

        {/* Email CTA */}
        <motion.a
          href={`mailto:${siteConfig.email}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4 p-6 rounded-2xl bg-surface border border-border card-lift group mb-14"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <Mail size={20} className="text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium group-hover:text-accent transition-colors">
              {siteConfig.email}
            </p>
          </div>
          <ArrowUpRight
            size={18}
            className="text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
          />
        </motion.a>

        {/* Social */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {socials.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="flex items-center justify-between p-5 rounded-2xl bg-surface border border-border card-lift group"
            >
              <div>
                <p className="font-medium group-hover:text-accent transition-colors">
                  {link.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
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

        {/* Availability note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex items-center gap-3 text-sm text-muted-foreground"
        >
          <Sparkles size={14} className="text-accent" />
          <p>Currently accepting new projects. Typical response time: 24 hours.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
