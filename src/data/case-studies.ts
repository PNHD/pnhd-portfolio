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
    hero: "A production-ready Dashboard & SaaS UI Kit — 80+ screens, 200+ components with auto layout, light & dark themes, built on a token-based design system.",
    challenge:
      "SaaS teams waste weeks rebuilding the same dashboard patterns from scratch — stat cards, data tables, analytics charts, user management, settings, and auth flows. Existing UI kits often lack proper auto layout, component variants, or dark mode. I set out to build a truly production-ready kit that designers can drop into any SaaS project and start customizing immediately.",
    process: [
      {
        title: "Market Research & Competitive Audit",
        description:
          "Analyzed 30+ top-selling UI kits on UI8, Creative Market, and Gumroad. Benchmarked against Untitled UI, shadcn/ui, and AlignUI to identify gaps: most kits lack comprehensive dark mode, consistent token usage, or real-world data in screens. Mapped the 6 most requested screen categories for SaaS: Dashboard, Analytics, Users, Settings, Auth, and empty states.",
      },
      {
        title: "Design System Foundation",
        description:
          "Built a token-based foundation in Figma: 70+ color styles organized by role (Primary, Neutral, Success, Warning, Error, Info, Surface, Border, Text), 22 text styles (Display → Code), 7 effect styles (Shadow XS→XL, Focus rings). 8pt grid, Inter typeface, semantic naming convention. Both light and dark color sets included.",
      },
      {
        title: "Component Library (200+ Variants)",
        description:
          "Designed 14 component sets with full variant coverage: Button (5 types × 4 sizes × 3 states), Input (3 sizes × 5 states with labels & helpers), Badge (6 colors × 3 sizes × dot toggle), Avatar, Toggle, Checkbox, Stat Card, Table Row, Nav Item, Select, Toast (4 types), Modal, Tab (2 styles), and Progress Bar (4 colors × 4 percentages). Every component uses auto layout.",
      },
      {
        title: "Screen Design — Real-World Layouts",
        description:
          "Composed 6 core screens using components: Dashboard Overview (light + dark), Analytics with period filtering, Users table with search/filter/status badges, Settings profile form, and Login with Google SSO. Each screen features a consistent sidebar navigation, top bar, and content area — ready for production handoff.",
      },
      {
        title: "Documentation & Packaging for UI8",
        description:
          "Created a polished cover page, organized all components and screens with clear naming conventions, and wrote a README with customization instructions. File structured for easy browsing: Cover & Tokens → Components → Screens. Prepared product listing description, preview images, and pricing strategy for UI8.net.",
      },
    ],
    solution:
      "Nova ships as a single Figma file with 3 sections: Design System (70+ color styles, 22 text styles, 7 shadow/focus effects), Component Library (200+ variants across 14 component sets, all with auto layout), and Screen Templates (6+ production-ready dashboard screens in light & dark). Every element follows consistent naming, uses auto layout for responsive resizing, and is organized for quick customization.",
    results: [
      "200+ component variants across 14 categories",
      "6 production-ready screens with light & dark themes",
      "70+ color styles with semantic naming",
      "Full auto layout — every component resizes correctly",
      "Token-based system for 1-click theme customization",
      "Listed on UI8.net as premium design resource",
    ],
    tools: ["Figma", "Figma Auto-Layout", "Figma Variants", "Figma Styles"],
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
