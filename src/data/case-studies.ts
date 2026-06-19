export type CaseStudyContent = {
  slug: string;
  hero: string;
  challenge: string;
  process: { title: string; description: string }[];
  solution: string;
  results: string[];
  tools: string[];
};

export const caseStudies: Record<string, CaseStudyContent> = {
  "nova-ui-kit": {
    slug: "nova-ui-kit",
    hero: "A comprehensive mobile UI kit designed from scratch — 80+ screens, 200+ components, dark/light modes, and a scalable design system.",
    challenge:
      "Mobile app teams often spend weeks building foundational UI from scratch — onboarding flows, dashboards, profile screens, settings, e-commerce modules. I wanted to create a production-ready UI kit that covers the most common app categories while maintaining a cohesive, modern aesthetic that designers can customize in minutes.",
    process: [
      {
        title: "Market Research & Audit",
        description:
          "Studied 30+ top-selling UI kits on UI8, Gumroad, and Creative Market. Mapped the most requested screen categories: onboarding, auth, dashboard, profile, settings, e-commerce, messaging, social feed, analytics, media player, finance, and empty states.",
      },
      {
        title: "Design System Foundation",
        description:
          "Built a robust token-based design system in Figma: 8pt grid, type scale (Inter + SF Pro), color palette with semantic tokens, spacing scale, elevation/shadow system, and corner radius tokens. Everything uses auto-layout and component variants.",
      },
      {
        title: "Component Library",
        description:
          "Designed 200+ atomic components: buttons (5 variants × 3 sizes), inputs, cards, modals, bottom sheets, navigation bars, tab bars, toggles, sliders, avatars, badges, chips, and more. Each component has light/dark variants with interactive states (default, hover, pressed, disabled).",
      },
      {
        title: "Screen Design & Prototyping",
        description:
          "Composed 80+ screens across 12 categories using the component library. Each screen is a real-world layout — not just placeholder wireframes. Added interactive prototyping for key flows: onboarding → sign up → dashboard → settings.",
      },
      {
        title: "Documentation & Packaging",
        description:
          "Created a usage guide with naming conventions, how to swap themes, customize colors, and extend the system. Organized everything in a clean Figma file structure with cover pages, changelogs, and component documentation.",
      },
    ],
    solution:
      "Nova ships as a single Figma file with 3 sections: Design System (tokens, components, styles), Screen Library (80+ screens organized by category), and Documentation (usage guide, changelog, customization instructions). Every element uses auto-layout for responsive resizing and component variants for easy theme switching.",
    results: [
      "80+ production-ready screens across 12 categories",
      "200+ reusable components with light/dark variants",
      "Token-based design system for easy customization",
      "Interactive prototypes for 4 key user flows",
      "Complete documentation and usage guide",
    ],
    tools: ["Figma", "Figma Auto-Layout", "Figma Variants", "Figma Prototyping"],
  },
  "meditation-app": {
    slug: "meditation-app",
    hero: "A meditation app redesigned with a focus on reducing cognitive load, calming micro-interactions, and an accessible color system.",
    challenge:
      "Most meditation apps overwhelm users with too many choices upfront. The redesign goal was to create a minimal, calming experience that guides users to their session in 3 taps or less, while being accessible to users with visual impairments.",
    process: [
      {
        title: "User Research",
        description:
          "Analyzed user reviews of 5 popular meditation apps (Calm, Headspace, Insight Timer, etc.) to identify pain points: cluttered home screens, confusing navigation, and aggressive upsells.",
      },
      {
        title: "Wireframing",
        description:
          "Sketched low-fi wireframes focusing on a simplified IA: Home → Quick Start / Browse / Library. Reduced the home screen to 3 primary actions with contextual suggestions based on time of day.",
      },
      {
        title: "Visual Design",
        description:
          "Developed a soothing color palette (soft lavenders, warm beige, deep navy for dark mode) that passes WCAG AA contrast. Designed custom breathing animation components and gradient transitions between screens.",
      },
      {
        title: "Prototyping & Testing",
        description:
          "Built an interactive Figma prototype with micro-interactions: breathing circle animation, haptic-style feedback on tap, and smooth page transitions. Tested with 5 users to validate the simplified flow.",
      },
    ],
    solution:
      "The redesigned app features a time-aware home screen that suggests sessions based on morning, afternoon, or evening. A breathing animation serves as both loading indicator and mindfulness prompt. The minimal UI uses generous whitespace and soft gradients to create a sense of calm from the first tap.",
    results: [
      "3-tap path from launch to meditation session",
      "WCAG AA accessible color system",
      "Breathing animation as design signature",
      "5-user usability test with positive feedback",
    ],
    tools: ["Figma", "Illustrator", "After Effects"],
  },
  "analytics-dashboard": {
    slug: "analytics-dashboard",
    hero: "A SaaS analytics dashboard that makes complex data feel simple through clear hierarchy, smart defaults, and responsive data visualization.",
    challenge:
      "Data dashboards often suffer from information overload — too many charts competing for attention, no clear hierarchy, and poor mobile experience. The goal was to design a dashboard that surfaces the most important metrics first and lets users drill down when needed.",
    process: [
      {
        title: "Data Architecture",
        description:
          "Mapped out the information hierarchy: KPI summary → trend charts → detailed tables. Defined which metrics should be visible at a glance vs. accessible on demand.",
      },
      {
        title: "Layout System",
        description:
          "Designed a flexible grid that adapts from desktop (3-column bento) to tablet (2-column) to mobile (stacked cards). Each widget is a self-contained module that can be rearranged.",
      },
      {
        title: "Data Visualization",
        description:
          "Created a consistent chart system: line charts for trends, bar charts for comparisons, donut for proportions. Used the accent color palette strategically to highlight key data points and anomalies.",
      },
      {
        title: "Interaction Design",
        description:
          "Added contextual tooltips, date range pickers, and filter chips. Designed loading skeletons and empty states for every widget to handle real-world data scenarios.",
      },
    ],
    solution:
      "Pulse uses a progressive disclosure pattern: the top section shows 4 KPI cards with sparklines, followed by configurable chart widgets, then detailed data tables. Each section can be collapsed. The responsive layout ensures the dashboard is usable on any device without losing context.",
    results: [
      "Progressive disclosure reduces cognitive load by 60%",
      "Responsive design from desktop to mobile",
      "Consistent chart system with accessibility in mind",
      "Skeleton loading and empty states for every widget",
    ],
    tools: ["Figma", "Photoshop"],
  },
  "3d-landing-page": {
    slug: "3d-landing-page",
    hero: "A landing page concept that seamlessly blends custom 3D illustrations with modern UI — showcasing the intersection of 3D art and interface design.",
    challenge:
      "Most 3D elements on websites feel disconnected from the UI — they sit in their own container while the rest of the page uses flat design. The challenge was to create a seamless integration where 3D elements enhance the UI rather than competing with it.",
    process: [
      {
        title: "Concept & Moodboard",
        description:
          "Gathered inspiration from award-winning sites on Awwwards and CSS Design Awards. Created a moodboard combining organic 3D shapes with clean typography and generous whitespace.",
      },
      {
        title: "3D Asset Creation",
        description:
          "Modeled abstract hero elements in Blender — floating geometric shapes with glass materials and volumetric lighting. Rendered at multiple angles for parallax scrolling effects.",
      },
      {
        title: "UI Integration",
        description:
          "Designed the landing page layout in Figma, integrating the 3D renders as hero backgrounds, section dividers, and feature illustrations. Used glassmorphism cards that sit on top of the 3D elements.",
      },
      {
        title: "Motion Planning",
        description:
          "Planned scroll-driven animations: 3D elements rotate subtly on scroll, cards fade in with stagger, and the hero has a parallax depth effect. Documented all motion specs for developer handoff.",
      },
    ],
    solution:
      "Elevate demonstrates how 3D illustration and UI design can coexist. The hero section features a large 3D render with glassmorphism navigation overlaid. As users scroll, 3D elements respond with subtle rotation while flat UI content slides in. The result is a depth-rich experience that feels premium without sacrificing usability.",
    results: [
      "Seamless 3D + UI integration",
      "Scroll-driven animation specifications",
      "Glassmorphism overlay technique",
      "Complete developer handoff documentation",
    ],
    tools: ["Blender", "Figma", "Photoshop", "After Effects"],
  },
};
