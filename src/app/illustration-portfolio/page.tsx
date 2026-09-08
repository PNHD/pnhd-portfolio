import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Illustration Portfolio",
  description:
    "Selected vector illustration work by Dang Pham, including the Soft Systems SaaS onboarding and product-state illustration collection.",
};

const groups = [
  {
    label: "01",
    title: "Onboarding",
    description: "Friendly product moments for setup, first-run guidance and automation.",
    samples: [
      ["Welcome", "/illustration-portfolio/soft-systems/welcome.svg"],
      ["Setup Automation", "/illustration-portfolio/soft-systems/setup-automation.svg"],
    ],
  },
  {
    label: "02",
    title: "Empty states",
    description: "Clear, low-noise visuals for quiet screens and zero-data moments.",
    samples: [
      ["No Search Results", "/illustration-portfolio/soft-systems/no-search-results.svg"],
      ["Empty Calendar", "/illustration-portfolio/soft-systems/empty-calendar.svg"],
    ],
  },
  {
    label: "03",
    title: "Error & system states",
    description: "Useful metaphors for interruptions, permissions and system feedback.",
    samples: [
      ["Page Not Found", "/illustration-portfolio/soft-systems/page-not-found.svg"],
      ["Access Denied", "/illustration-portfolio/soft-systems/access-denied.svg"],
    ],
  },
  {
    label: "04",
    title: "Success states",
    description: "Positive confirmation scenes for completed actions and progress milestones.",
    samples: [
      ["Account Created", "/illustration-portfolio/soft-systems/account-created.svg"],
      ["Goal Achieved", "/illustration-portfolio/soft-systems/goal-achieved.svg"],
    ],
  },
] as const;

const heroSamples = [
  ["Welcome", "/illustration-portfolio/soft-systems/welcome.svg"],
  ["No Search Results", "/illustration-portfolio/soft-systems/no-search-results.svg"],
  ["Access Denied", "/illustration-portfolio/soft-systems/access-denied.svg"],
  ["Goal Achieved", "/illustration-portfolio/soft-systems/goal-achieved.svg"],
] as const;

const craftNotes = [
  ["40", "distinct scenes in the full collection"],
  ["4", "product-state groups"],
  ["SVG + PNG", "editable vector + transparent raster"],
  ["3000 × 3000", "high-resolution PNG exports"],
] as const;

export default function IllustrationPortfolioPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Illustration portfolio · Dang Pham</p>
          <h1>Illustration systems for digital products.</h1>
          <p className={styles.lead}>
            Selected vector work focused on SaaS onboarding, empty states, system feedback and
            success moments — designed as cohesive families rather than isolated one-off scenes.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#soft-systems">
              View selected work
            </a>
            <Link className={styles.secondaryAction} href="/">
              Main portfolio
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual} aria-label="Selected Soft Systems illustrations">
          {heroSamples.map(([title, src]) => (
            <div className={styles.heroTile} key={title}>
              <Image src={src} alt={`${title} vector illustration`} width={1600} height={1600} priority />
              <span>{title}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.stats} aria-label="Collection details">
        {craftNotes.map(([value, label]) => (
          <div className={styles.stat} key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className={styles.section} id="soft-systems">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Selected collection · Soft Systems</p>
            <h2>SaaS onboarding & product-state illustrations</h2>
          </div>
          <p>
            A 40-scene vector family spanning the full product lifecycle. The visual language uses
            rounded geometry, deep-ink outlines, blue focal objects and restrained cyan, coral and
            amber accents for a clean editorial product feel.
          </p>
        </div>

        <div className={styles.groupList}>
          {groups.map((group) => (
            <article className={styles.groupSection} key={group.title}>
              <div className={styles.groupMeta}>
                <span>{group.label}</span>
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
              </div>

              <div className={styles.sampleGrid}>
                {group.samples.map(([title, src]) => (
                  <div className={styles.sampleCard} key={title}>
                    <div className={styles.sampleArt}>
                      <Image src={src} alt={`${title} vector illustration`} width={1600} height={1600} />
                    </div>
                    <div className={styles.sampleTitle}>{title}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.craftSection}>
        <div className={styles.craftIntro}>
          <p className={styles.eyebrow}>Vector craft</p>
          <h2>Built to be useful after the preview.</h2>
          <p>
            The full pack contains 40 canonical SVGs and matching transparent PNG exports. Only a
            small selection is shown here as portfolio samples.
          </p>
        </div>

        <div className={styles.craftGrid}>
          <div>
            <h3>Editable sources</h3>
            <p>
              Canonical artwork is native SVG geometry on a 1600 × 1600 canvas, organized as vector
              shapes and paths rather than flattened artwork.
            </p>
          </div>
          <div>
            <h3>Production-ready exports</h3>
            <p>
              Every illustration has a matching 3000 × 3000 RGBA PNG with real alpha transparency
              for direct use in product UI, web and presentation layouts.
            </p>
          </div>
          <div>
            <h3>Clean dependencies</h3>
            <p>
              The SVG files contain no embedded bitmap artwork, external fonts, external stylesheets
              or scripts, keeping the collection portable and straightforward to edit.
            </p>
          </div>
          <div>
            <h3>Original visual system</h3>
            <p>
              No traced stock artwork or vendor-specific interfaces are used. The collection was
              developed with AI-assisted art direction and code-authored vector construction, then
              validated and visually reviewed as a coherent family.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.footerCta}>
        <div>
          <p className={styles.eyebrow}>Dang Pham · Product & Visual Designer</p>
          <h2>Vector illustration for product experiences.</h2>
        </div>
        <div className={styles.footerLinks}>
          <a href="https://dribbble.com/pnhd" target="_blank" rel="noreferrer">
            Dribbble
          </a>
          <a href="https://www.behance.net/five3105" target="_blank" rel="noreferrer">
            Behance
          </a>
          <Link href="/">Full portfolio</Link>
        </div>
      </section>
    </main>
  );
}
