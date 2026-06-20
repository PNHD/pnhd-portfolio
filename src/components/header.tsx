"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/portfolio";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`ed-nav${scrolled ? " scrolled" : ""}`}>
      <Link href="/" className="ed-logo">
        Dang Pham <span className="dot" />
      </Link>
      <div className="ed-navlinks">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/#contact" className="ed-navcta">
          Let&apos;s Talk
        </Link>
      </div>
    </nav>
  );
}
