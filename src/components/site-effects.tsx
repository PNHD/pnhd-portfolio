"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

// Site-wide custom cursor + grain + scroll-to-top. Mounted once in the layout
// so it persists across client navigation (event delegation keeps the hover
// state correct on links rendered after navigation).
export function SiteEffects() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const cursor = cursorRef.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let raf = 0;
    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const loop = () => {
      cx += (mx - cx) * 0.2;
      cy += (my - cy) * 0.2;
      if (cursor) { cursor.style.left = cx + "px"; cursor.style.top = cy + "px"; }
      raf = requestAnimationFrame(loop);
    };
    const interactive = (t: EventTarget | null) =>
      t instanceof Element && t.closest("a, button");
    const onOver = (e: MouseEvent) => { if (interactive(e.target)) cursor?.classList.add("hovering"); };
    const onOut = (e: MouseEvent) => { if (interactive(e.target)) cursor?.classList.remove("hovering"); };

    if (fine && cursor) {
      document.documentElement.classList.add("ed-cursor-on");
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseover", onOver);
      document.addEventListener("mouseout", onOut);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("ed-cursor-on");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number) => void } }).lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="ed-grain" />
      <div ref={cursorRef} className="ed-cursor" />
      <button
        onClick={scrollTop}
        className={`ed-totop${showTop ? " show" : ""}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}
