export const refreshedSiteConfig = {
  name: "Dang Pham",
  title: "Visual / Digital Designer",
  tagline: "Visual design across campaigns, web, product UI, motion and 3D.",
  description:
    "Visual and Digital Designer in Ho Chi Minh City working across graphic and digital design, e-commerce and promotional visuals, web and product UI, motion, icon systems and 3D illustration.",
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
    tags: ["Web Design", "Fashion", "Figma"],
    href: "https://dribbble.com/shots/12877734-Luxrious-Fashion-Web-Design",
    image:
      "https://cdn.dribbble.com/userupload/27866631/file/still-34b15ce533bc056a880d4997e9fd7cd5.png?resize=400x0",
    featured: true,
    note: "Web UI study",
  },
  {
    title: "Bankey — Landing Page",
    category: "Digital / Web",
    tags: ["Landing Page", "Web UI", "Figma"],
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
    tags: ["UI Motion", "Animation", "App Design"],
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
    tags: ["3D Animation", "Loop", "Environment"],
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
    tags: ["Blender", "Isometric", "Environment"],
    href: "https://dribbble.com/shots/18553543-Simple-Isometric-Bedroom",
    image:
      "https://cdn.dribbble.com/userupload/2952143/file/original-27c6dd346450a1a9159b744c302ddb0b.jpg?resize=400x0",
    featured: true,
    note: "3D environment study",
  },
  {
    title: "iOS 14 Glossy Icons — Dark + Light",
    category: "Icon / System",
    tags: ["Icon Design", "Figma", "Icon System"],
    href: "https://dribbble.com/shots/14781306-iOS-14-Glossy-icons-Dark-Light-Versions-492-icons",
    image:
      "https://cdn.dribbble.com/userupload/29964718/file/original-ea062cab2467d883fb9472d45d029959.png?resize=400x0",
    featured: true,
    note: "Icon system",
  },
  {
    title: "Circular Reveal Animation",
    category: "Motion",
    tags: ["Animation", "Circular Reveal", "Motion Study"],
    href: "https://dribbble.com/shots/13955146-Circular-Reveal-Animation",
    image:
      "https://cdn.dribbble.com/userupload/28199867/file/still-629097842f79e01af9d6cc64cbd9e3cf.png?resize=400x0",
    note: "Motion study",
  },
  {
    title: "HA&IS Landing Page UI Animation Practice",
    category: "Motion",
    tags: ["After Effects", "Figma", "UI Animation"],
    href: "https://dribbble.com/shots/13892908-HA-IS-Landing-Page-UI-Animation-Pratice",
    image:
      "https://cdn.dribbble.com/userupload/28089669/file/still-f9816ba9f2c3df6539fe248542a04dec.png?resize=400x0",
    note: "Landing-page motion practice",
  },
  {
    title: "3D Aircraft Animation",
    category: "Motion",
    tags: ["Blender", "3D Animation", "Aircraft"],
    href: "https://dribbble.com/shots/12764752-3D-Aircraft-Animation",
    image:
      "https://cdn.dribbble.com/userupload/27848390/file/still-645a97c14d1003c9dd5281babd4404fc.png?resize=400x0",
    note: "3D motion study",
  },
  {
    title: "3D Aircraft",
    category: "3D / Illustration",
    tags: ["Blender", "3D Modeling", "Aircraft"],
    href: "https://dribbble.com/shots/12115534-3D-Aircraft",
    image:
      "https://cdn.dribbble.com/userupload/27653971/file/original-1e06cf67fb98df4a222942bb4ebbb6b6.png?resize=400x0",
    note: "3D modeling study",
  },
  {
    title: "Dragon Melting The Wall Animation",
    category: "Motion",
    tags: ["Blender", "3D Animation", "Low Poly"],
    href: "https://dribbble.com/shots/12073523-Dragon-Melting-The-Wall-Animation",
    image:
      "https://cdn.dribbble.com/userupload/27616802/file/still-521c4ad5aa56b5c5ccd6b8adb259d7b0.png?resize=400x0",
    note: "3D animation study",
  },
  {
    title: "Dragon Melting The Wall",
    category: "3D / Illustration",
    tags: ["Blender", "Diorama", "Low Poly"],
    href: "https://dribbble.com/shots/12046487-Dragon-Melting-The-Wall",
    image:
      "https://cdn.dribbble.com/userupload/27600703/file/original-c356b7f5ec8bf5861216bfc76cb0e69c.png?resize=400x0",
    note: "3D diorama study",
  },
  {
    title: "3D Building",
    category: "3D / Illustration",
    tags: ["Blender", "Isometric", "Low Poly"],
    href: "https://dribbble.com/shots/11918666-3D-Building",
    image:
      "https://cdn.dribbble.com/userupload/27509798/file/original-bdd9566add164964a7f5c296f3b3bca3.png?resize=400x0",
    note: "3D environment study",
  },
  {
    title: "3D Living Room",
    category: "3D / Illustration",
    tags: ["Blender", "Isometric", "Low Poly"],
    href: "https://dribbble.com/shots/11894581-3D-Living-Room",
    image:
      "https://cdn.dribbble.com/userupload/27494333/file/original-125d7183b2c47447f31cfe415ce63c26.png?resize=400x0",
    note: "3D room study",
  },
  {
    title: "Low Poly Rocket",
    category: "Motion",
    tags: ["Blender", "3D Animation", "Low Poly"],
    href: "https://dribbble.com/shots/11870822-Low-Poly-Rocket",
    image:
      "https://cdn.dribbble.com/userupload/27481793/file/still-7957cf413dd3b3afcfcc77437ee773f1.png?resize=400x0",
    note: "3D animation study",
  },
  {
    title: "Jelly Beans Factory",
    category: "Motion",
    tags: ["C4D", "3D Animation", "Loop"],
    href: "https://dribbble.com/shots/11761318-Jelly-Beans-Factory",
    image:
      "https://cdn.dribbble.com/userupload/27449615/file/still-91308b1d115c783c4e65ba6f2447e91d.png?resize=400x0",
    note: "3D loop study",
  },
  {
    title: "Skate Park Modeling & Animation",
    category: "Motion",
    tags: ["C4D", "3D Animation", "Modeling"],
    href: "https://dribbble.com/shots/11648797-Skate-Park-Modeling-Animation",
    image:
      "https://cdn.dribbble.com/userupload/27411276/file/still-0666772ad81954e05c7ac67cb6b4912c.png?resize=400x0",
    note: "Modeling + animation study",
  },
  {
    title: "Learning App",
    category: "UI / Product",
    tags: ["App Design", "Figma", "Learning"],
    href: "https://dribbble.com/shots/11313990-Learning-App",
    image:
      "https://cdn.dribbble.com/userupload/27117761/file/original-607171b7f0e0886ece81d20c934f3a3d.jpg?resize=400x0",
    note: "Mobile learning UI",
  },
  {
    title: "Facebook Redesign",
    category: "Digital / Web",
    tags: ["Figma", "Web UI", "Redesign"],
    href: "https://dribbble.com/shots/11297745-Facebook-Redesign",
    image:
      "https://cdn.dribbble.com/userupload/27102345/file/original-2ababfcf9e8d22501fb13ebbd1071ea4.jpg?resize=400x0",
    note: "Desktop UI redesign concept",
  },
  {
    title: "Daily UI #020 — Location Tracker",
    category: "Motion",
    tags: ["After Effects", "Figma", "Daily UI"],
    href: "https://dribbble.com/shots/11210821-Daily-UI-Challenge-020-Location-Tracker",
    image:
      "https://cdn.dribbble.com/userupload/27011338/file/still-6754b64e991a3096ac91fec632882369.png?resize=400x0",
    note: "Daily UI motion challenge",
  },
  {
    title: "Daily UI #019 — Leaderboard",
    category: "UI / Product",
    tags: ["Figma", "App UI", "Daily UI"],
    href: "https://dribbble.com/shots/11196214-Daily-UI-Challenge-019-Leaderboard",
    image:
      "https://cdn.dribbble.com/userupload/26996226/file/original-a8f19af57ebdd9e09a67d18ed4fcfa4d.jpg?resize=400x0",
    note: "Daily UI challenge",
  },
  {
    title: "Daily UI #018 — Analytics Chart",
    category: "Motion",
    tags: ["After Effects", "Figma", "Daily UI"],
    href: "https://dribbble.com/shots/11064135-Daily-UI-Challenge-018-Analytics-Chart",
    image:
      "https://cdn.dribbble.com/userupload/26817774/file/still-1e668470e7819ecba1b6a73211f79500.png?resize=400x0",
    note: "Daily UI motion challenge",
  },
];
