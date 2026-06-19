"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { novaScreens } from "@/components/nova-screens";

const tabs = [
  { key: "onboarding", label: "Onboarding" },
  { key: "dashboard", label: "Dashboard" },
  { key: "profile", label: "Profile" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "messaging", label: "Messaging" },
  { key: "designSystem", label: "Design System" },
] as const;

export function NovaGallery() {
  const [active, setActive] = useState<string>("onboarding");
  const Screen = novaScreens[active as keyof typeof novaScreens];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === tab.key
                ? "bg-foreground text-background"
                : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Screen preview */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl overflow-hidden border border-border bg-[#0a0f1a] flex items-center justify-center p-8"
        >
          <div className="w-full max-w-[280px]">
            {Screen && <Screen />}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
