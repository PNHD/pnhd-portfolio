"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { NovaThumb, PulseThumb, SerenityThumb } from "./project-thumbnails";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 70, damping: 18, mass: 0.6 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  // Parallax layers — each shifts by a different depth factor on mouse move.
  // Applied on the OUTER wrapper (x/y); the idle "breathe" lives on an inner
  // layer so the two never fight over the same transform axis.
  const backX = useTransform(sx, (v) => v * 16);
  const backY = useTransform(sy, (v) => v * 16);
  const midX = useTransform(sx, (v) => v * 30);
  const midY = useTransform(sy, (v) => v * 30);
  const frontX = useTransform(sx, (v) => v * 48);
  const frontY = useTransform(sy, (v) => v * 48);
  const orbAX = useTransform(sx, (v) => v * 60);
  const orbAY = useTransform(sy, (v) => v * 60);
  const orbBX = useTransform(sx, (v) => v * -40);
  const orbBY = useTransform(sy, (v) => v * -40);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.5, ease }}
      className="relative h-[380px] sm:h-[440px] md:h-[500px] w-full"
      aria-hidden
    >
      {/* Ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 35%, transparent), transparent 70%)",
        }}
      />

      {/* Floating orbs */}
      <motion.div style={{ x: orbAX, y: orbAY }} className="absolute right-[6%] top-[8%]">
        <motion.div
          className="float-orb w-16 h-16 opacity-80"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.div style={{ x: orbBX, y: orbBY }} className="absolute left-[2%] bottom-[14%]">
        <motion.div
          className="float-orb w-10 h-10 opacity-50"
          style={{ background: "var(--accent-2)" }}
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      {/* Back card — Serenity */}
      <motion.div style={{ x: backX, y: backY }} className="absolute left-[2%] top-[14%] w-[52%] aspect-[4/5]">
        <motion.div
          className="float-card inset-0 w-full h-full"
          style={{ rotate: -8 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <SerenityThumb />
        </motion.div>
      </motion.div>

      {/* Mid card — Pulse dashboard */}
      <motion.div style={{ x: midX, y: midY }} className="absolute right-[3%] top-[6%] w-[60%] aspect-[16/11]">
        <motion.div
          className="float-card inset-0 w-full h-full"
          style={{ rotate: 5 }}
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <PulseThumb />
        </motion.div>
      </motion.div>

      {/* Front card — Nova (hero piece) */}
      <motion.div
        style={{ x: frontX, y: frontY }}
        className="absolute left-1/2 bottom-[4%] -translate-x-1/2 w-[66%] aspect-[16/10] z-10"
      >
        <motion.div
          className="float-card inset-0 w-full h-full"
          style={{ rotate: -3 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <NovaThumb />
        </motion.div>
      </motion.div>

      {/* Floating badge */}
      <motion.div style={{ x: frontX, y: frontY }} className="absolute right-[4%] bottom-[26%] z-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease }}
          className="float-badge"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span>Crafting daily</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
