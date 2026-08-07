export const refreshedSiteConfig = {
  name: "Dang Pham",
  title: "Visual / Digital Designer",
  tagline: "Brand-aware visual design across digital, UI, motion and 3D.",
  description:
    "Visual and Digital Designer in Ho Chi Minh City working across marketing creative, web and product UI, motion, icon systems and 3D illustration.",
  url: "https://dangpham.pages.dev",
  email: "phamnhathaidang@gmail.com",
  links: {
    dribbble: "https://dribbble.com/pnhd",
    behance: "https://www.behance.net/five3105",
    github: "https://github.com/PNHD",
  },
};

export const portfolioEvidence = {
  dribbbleShotCount: 89,
  note:
    "The public Dribbble archive currently shows 89 shots. Portfolio copy below is intentionally based on visible work and avoids invented client outcomes or campaign metrics.",
};

export type WorkCategory =
  | "Digital / Web"
  | "UI / Product"
  | "Motion"
  | "3D / Illustration"
  | "Icon / System";

export type WorkItem = {
  title: string;
  category: WorkCategory;
  tags: string[];
  href: string;
  image: string;
  featured?: boolean;
  note?: string;
};

export const workCategories: ("All" | WorkCategory)[] = [
  "All",
  "Digital / Web",
  "UI / Product",
  "Motion",
  "3D / Illustration",
  "Icon / System",
];

export const workItems: WorkItem[] = [
  {
    title: "Luxrious — Fashion Web Design",
    category: "Digital / Web",
    tags: ["Web Design", "Figma", "Visual Direction"],
    href: "https://dribbble.com/shots/12877734-Luxrious-Fashion-Web-Design",
    image:
      "https://cdn.dribbble.com/userupload/27866631/file/still-34b15ce533bc056a880d4997e9fd7cd5.png?resize=400x0",
    featured: true,
    note: "Web UI study",
  },
  {
    title: "Bankey — Landing Page",
    category: "Digital / Web",
    tags: ["Landing Page", "Figma", "Responsive UI"],
    href: "https://dribbble.com/shots/11463849-Bankey-Landing-Page",
    image:
      "https://cdn.dribbble.com/userupload/27269367/file/original-88ca2d8ad64bf14cc29a1276bbf2809c.jpg?resize=400x0",
    featured: true,
    note: "Landing page study",
  },
  {
    title: "Divine Experience — Landing Page",
    category: "Digital / Web",
    tags: ["Landing Page", "Fashion", "Figma"],
    href: "https://dribbble.com/shots/11126436-Divine-Experience-Landing-Page",
    image:
      "https://cdn.dribbble.com/userupload/26913957/file/original-d1fc6397185e5f37107a32e5e1016f95.png?resize=400x0",
    featured: true,
    note: "Digital visual study",
  },
  {
    title: "G.A.T — Sneaker Shop App UI Kit",
    category: "UI / Product",
    tags: ["App UI", "UI Kit", "Figma"],
    href: "https://dribbble.com/shots/11430675-G-A-T-Sneaker-Shop-App-UI-Kit",
    image:
      "https://cdn.dribbble.com/userupload/27235939/file/original-75e5a4af9344df280c303324fcf84233.jpg?resize=400x0",
    featured: true,
    note: "Mobile commerce UI",
  },
  {
    title: "Nike Web UI Design",
    category: "Digital / Web",
    tags: ["E-commerce", "Web UI", "Figma"],
    href: "https://dribbble.com/shots/11333730-Nike-Web-UI-Design",
    image:
      "https://cdn.dribbble.com/userupload/27133533/file/original-20a815be1becf12004198bb6444e848a.jpg?resize=400x0",
    featured: true,
    note: "Web UI concept",
  },
  {
    title: "Veloconti — Food Delivery App",
    category: "UI / Product",
    tags: ["Mobile UI", "Food", "Figma"],
    href: "https://dribbble.com/shots/11292018-Veloconti-Food-Delivery-App",
    image:
      "https://cdn.dribbble.com/userupload/27091402/file/original-15b4c0b52baff18a9fcf658e22f5e7c0.png?resize=400x0",
    featured: true,
    note: "Mobile app design",
  },
  {
    title: "Simple Splash Screen Animation",
    category: "Motion",
    tags: ["After Effects", "UI Motion", "Figma"],
    href: "https://dribbble.com/shots/14693119-Simple-Splash-Screen-Animation",
    image:
      "https://cdn.dribbble.com/userupload/29785361/file/still-f15ecd5fb169a823a1892735bfe49a93.png?resize=400x0",
    featured: true,
    note: "Interface motion study",
  },
  {
    title: "Food Delivery App",
    category: "Motion",
    tags: ["After Effects", "App Design", "Figma"],
    href: "https://dribbble.com/shots/11131772-Food-Delivery-App",
    image:
      "https://cdn.dribbble.com/userupload/26923487/file/still-d78b26157c0d65a55bb661c77e1f8388.png?resize=400x0",
    featured: true,
    note: "App UI + motion",
  },
  {
    title: "80's Style Animation Loop",
    category: "Motion",
    tags: ["3D Animation", "Blender", "Loop"],
    href: "https://dribbble.com/shots/16308893-80-s-Style-Animation-Loop",
    image:
      "https://cdn.dribbble.com/userupload/33038797/file/still-435b458048a81815c6f192c1b3eb6f97.png?resize=400x0",
    featured: true,
    note: "3D motion experiment",
  },
  {
    title: "3D Sushi Illustration",
    category: "3D / Illustration",
    tags: ["Blender", "Isometric", "Illustration"],
    href: "https://dribbble.com/shots/11912884-3D-Sushi-Illustration",
    image:
      "https://cdn.dribbble.com/userupload/27504259/file/original-ad66518d51449836b241e290ef32724a.png?resize=400x0",
    featured: true,
    note: "3D illustration",
  },
  {
    title: "Simple Isometric Bedroom",
    category: "3D / Illustration",
    tags: ["Blender", "Isometric", "3D"],
    href: "https://dribbble.com/shots/18553543-Simple-Isometric-Bedroom",
    image:
      "https://cdn.dribbble.com/userupload/2952143/file/original-27c6dd346450a1a9159b744c302ddb0b.jpg?resize=400x0",
    featured: true,
    note: "3D environment study",
  },
  {
    title: "iOS 14 Glossy Icons — Dark + Light",
    category: "Icon / System",
    tags: ["Icon Design", "Figma", "Light / Dark"],
    href: "https://dribbble.com/shots/14781306-iOS-14-Glossy-icons-Dark-Light-Versions-492-icons",
    image:
      "https://cdn.dribbble.com/userupload/29964718/file/original-ea062cab2467d883fb9472d45d029959.png?resize=400x0",
    featured: true,
    note: "Icon system",
  },
];

export const capabilityGroups = [
  {
    h: "Visual & Marketing",
    items: [
      "Digital campaign assets",
      "Social & web creative",
      "Brand-consistent production",
      "Typography & layout",
    ],
  },
  {
    h: "Product & Web",
    items: ["Figma", "Responsive UI", "Landing pages", "Design systems"],
  },
  {
    h: "Motion & 3D",
    items: ["After Effects", "Premiere", "Blender", "Visual storytelling"],
  },
  {
    h: "Adobe & AI",
    items: [
      "Photoshop",
      "Illustrator",
      "AI-assisted image/video workflows",
      "Creative production",
    ],
  },
] as const;
