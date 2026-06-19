"use client";

const items = [
  "UI Design",
  "Figma",
  "3D Art",
  "Blender",
  "Motion",
  "After Effects",
  "Photoshop",
  "Prototyping",
  "Illustrator",
  "Branding",
  "Adobe XD",
  "Design Systems",
];

export function Marquee() {
  // Duplicate the list so the -50% translate loops seamlessly
  const loop = [...items, ...items];

  return (
    <div className="marquee-strip marquee-mask py-6 overflow-hidden select-none">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
