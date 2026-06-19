"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

const links = [
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
    <div className="mx-auto max-w-4xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl">
          Interested in working together? Feel free to reach out via email or
          connect on social platforms.
        </p>

        {/* Email */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-muted hover:bg-accent/10 transition-colors group mb-12"
        >
          <Mail size={20} className="text-accent" />
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium group-hover:text-accent transition-colors">
              {siteConfig.email}
            </p>
          </div>
        </a>

        {/* Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 rounded-2xl bg-muted hover:bg-accent/10 transition-colors group"
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
                className="text-muted-foreground group-hover:text-accent transition-colors"
              />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
