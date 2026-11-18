import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  photographyMedia,
  photographyPath,
  photographyPortfolioReview,
  photographyPreviewEnabled,
  photographyProject,
} from "@/data/photography-preview";
import styles from "./page.module.css";

const description =
  "A nine-image e-commerce photography case study covering reference-led AI generation, Photoshop finishing, and quality control for personalized apparel.";

export const metadata: Metadata = {
  title: photographyProject.title,
  description,
  alternates: { canonical: photographyPath },
  robots: { index: true, follow: true },
  openGraph: { title: photographyProject.title, description, url: photographyPath, type: "article" },
};

const productImages = [
  { id: "US_1st", title: "The personalization hero", alt: "Woman in a red sweatshirt beside a golden-coated dog with a circular pet photo inset" },
  { id: "US_2nd", title: "The product detail", alt: "Navy sweatshirt with a pet print next to product details on a warm gray background" },
  { id: "US_3rd", title: "Christmas in the kitchen", alt: "Man in a forest-green pet-print sweatshirt beside a beagle in a kitchen" },
  { id: "US_4th", title: "On the front porch", alt: photographyProject.thumbnailAlt },
  { id: "US_5th", title: "Beside the fireplace", alt: "Man kneeling with a corgi in a navy pet-print sweatshirt by the fireplace" },
  { id: "US_6th", title: "Wrapping gifts", alt: "Man wearing a forest-green personalized sweatshirt at a gift-wrapping table" },
];

const sectionImages = [
  { id: "section-1", title: "Product detail crop", source: "US_2nd", alt: "Wide crop of the navy sweatshirt and its product copy" },
  { id: "section-2", title: "Front porch crop", source: "US_4th", alt: "Wide crop of the red sweatshirt and Bernese Mountain Dog on the porch" },
  { id: "section-3", title: "Gift-wrapping crop", source: "US_6th", alt: "Wide crop of the sweatshirt print and decorated tree" },
];

const workflow = [
  { title: "Anchor the product", body: "I paired the supplied garment color and silhouette with the approved print and matching pet reference. These details guided the shot list." },
  { title: "Generate scene options", body: "I used Seedream for the final lifestyle frames. Prompts described garment fit, print visibility, the pose, camera framing, fabric, and seasonal lighting." },
  { title: "Select and iterate", body: "I reviewed candidates against the product and pet references. The corgi scene was revised from a standing pose to a kneeling interaction. A separate iteration addressed a pale rim around the chest artwork." },
];

function StudyImage({
  id,
  alt,
  wide = false,
  hero = false,
  sizes = "(max-width: 365px) 90vw, (max-width: 680px) 45vw, (max-width: 1000px) 30vw, 390px",
}: {
  id: string;
  alt: string;
  wide?: boolean;
  hero?: boolean;
  sizes?: string;
}) {
  return (
    // The static export uses pre-encoded responsive WebP variants outside the repo.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${photographyMedia}/${id}-768.webp`}
      srcSet={`${photographyMedia}/${id}-480.webp 480w, ${photographyMedia}/${id}-768.webp 768w, ${photographyMedia}/${id}-1080.webp 1080w`}
      sizes={sizes}
      width={1080}
      height={wide ? 720 : 1080}
      alt={alt}
      loading={hero ? "eager" : "lazy"}
      fetchPriority={hero ? "high" : undefined}
      decoding="async"
    />
  );
}

export default function PhotographyCaseStudy() {
  if (!photographyPreviewEnabled) notFound();

  return (
    <article className={`project-case wrap case ${styles.study}`}>
      <Link className={`case-back ${styles.back}`} href="/work">← Back to work</Link>

      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>
            {photographyPortfolioReview ? photographyProject.eyebrow : "Independent work · Private review"}
          </p>
          {photographyPortfolioReview ? (
            <h1 className={`dsp ${styles.title} ${styles.reviewTitle}`}>
              AI Lifestyle Photography <em>&amp; Personalized POD Mockups</em>
            </h1>
          ) : (
            <h1 className={`dsp ${styles.title}`}>AI Product Lifestyle <em>Photography</em></h1>
          )}
          <p className={styles.lede}>
            A seasonal e-commerce image set for a personalized pet sweatshirt, built with
            reference-led AI generation and finished in Photoshop.
          </p>
          <div className="project-case-actions">
            <a className="btn btn-accent" href="#gallery">View the final gallery <span aria-hidden="true">↓</span></a>
            <a className="btn btn-ghost" href="#workflow">Explore the workflow</a>
          </div>
        </div>
        <figure className={styles.heroImage}>
          <StudyImage {...productImages[3]} hero sizes="(max-width: 820px) 90vw, 48vw" />
          <figcaption>Holiday porch · Final lifestyle frame</figcaption>
        </figure>
      </header>

      <section className={styles.section} aria-labelledby="overview-title">
        <div className={styles.introGrid}>
          <div>
            <p className={styles.eyebrow}>Project overview</p>
            <h2 className="dsp" id="overview-title">A holiday image set for personalized apparel</h2>
          </div>
          <p>
            {photographyPortfolioReview
              ? "This personal project explores how to make a custom pet portrait feel at home on a sweatshirt while keeping the print readable at storefront size. The set pairs a personalization hero and a product detail with four holiday lifestyle scenes and three wider crops."
              : "I created this independently as a hiring exercise using the supplied garment and artwork references. The set pairs a personalization hero and a product detail with four holiday lifestyle scenes and three crops for product-page sections."}
          </p>
        </div>
        <dl className={styles.facts}>
          <div><dt>Product images</dt><dd>6 <span>· 1500 × 1500</span></dd></div>
          <div><dt>Section crops</dt><dd>3 <span>· 1080 × 720</span></dd></div>
          <div><dt>Deliverables</dt><dd>PNG, WebP <span>+ layered PSD</span></dd></div>
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="challenge-title">
        <div className={styles.introGrid}>
          <div>
            <p className={styles.eyebrow}>Creative challenge</p>
            <h2 className="dsp" id="challenge-title">Keep the print recognizable in every scene</h2>
          </div>
          <p>
            A personalized print has to read at listing size and look natural on fabric. The brief
            called for familiar holiday settings, believable folds and consistent print placement as
            colors, camera angles and poses changed. The hero also had to connect the original pet
            photo to the design on the garment.
          </p>
        </div>
      </section>

      <section className={styles.section} id="workflow" aria-labelledby="workflow-title">
        <p className={styles.eyebrow}>AI generation workflow</p>
        <h2 className="dsp" id="workflow-title">From product reference to selected frame</h2>
        <ol className={styles.steps}>
          {workflow.map(({ title, body }, index) => (
            <li key={title}>
              <span className={styles.eyebrow} aria-hidden="true">0{index + 1}</span>
              <h3 className="dsp">{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="finishing-title">
        <div className={styles.introGrid}>
          <div>
            <p className={styles.eyebrow}>Photoshop refinement</p>
            <h2 className="dsp" id="finishing-title">Build the detail image in layers</h2>
          </div>
          <p>
            In Photoshop, I placed and aligned the supplied print on the navy garment, set the
            background to #EAE9E4, and laid out the provided Futura type and paw icons. I then reframed
            three selected product images for the wide sections and prepared the exports.
          </p>
        </div>
      </section>

      {photographyPortfolioReview ? (
        <section className={styles.section} aria-labelledby="comparison-title">
          <p className={styles.eyebrow}>Framing and crops</p>
          <h2 className="dsp" id="comparison-title">One product detail, two storefront formats</h2>
          <div className={styles.pair}>
            <figure>
              <StudyImage {...productImages[1]} sizes="(max-width: 680px) 90vw, 48vw" />
              <figcaption><strong>Square product image</strong><span>Room around the garment lets the print and detail copy sit together.</span></figcaption>
            </figure>
            <figure>
              <StudyImage {...sectionImages[0]} wide sizes="(max-width: 680px) 90vw, 48vw" />
              <figcaption><strong>Wide section crop</strong><span>A tighter crop keeps the print and copy visible in a horizontal layout.</span></figcaption>
            </figure>
          </div>
        </section>
      ) : (
        <section className={styles.section} aria-labelledby="comparison-title">
          <p className={styles.eyebrow}>Before and after</p>
          <h2 className="dsp" id="comparison-title">From garment reference to finished product detail</h2>
          <div className={styles.pair}>
            <figure>
              <StudyImage id="navy-reference" alt="Supplied studio reference of a blank navy crewneck sweatshirt" sizes="(max-width: 680px) 90vw, 48vw" />
              <figcaption><strong>Before · Supplied reference</strong><span>Original navy garment reference from the hiring brief.</span></figcaption>
            </figure>
            <figure>
              <StudyImage {...productImages[1]} sizes="(max-width: 680px) 90vw, 48vw" />
              <figcaption><strong>After · Final Photoshop export</strong><span>US_2nd.png with the approved print, matched backdrop and typeset product details.</span></figcaption>
            </figure>
          </div>
        </section>
      )}

      <section className={styles.section} id="gallery" aria-labelledby="gallery-title">
        <p className={styles.eyebrow}>Final gallery</p>
        <h2 className="dsp" id="gallery-title">Six product images and three section crops</h2>
        <div className={styles.gallery}>
          {productImages.map((image) => (
            <figure key={image.id}>
              <StudyImage {...image} />
              <figcaption><strong>{image.title}</strong><span>{photographyPortfolioReview ? "Product image" : image.id}</span></figcaption>
            </figure>
          ))}
          {sectionImages.map((image) => (
            <figure key={image.id}>
              <StudyImage {...image} wide />
              <figcaption><strong>{image.title}</strong><span>{photographyPortfolioReview ? "Section crop" : `From ${image.source}`}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="qc-title">
        <div className={styles.introGrid}>
          <div>
            <p className={styles.eyebrow}>Quality control</p>
            <h2 className="dsp" id="qc-title">Review the product at full size and in context</h2>
          </div>
          <ul className={styles.checks}>
            <li><strong>Product fidelity</strong> Check the silhouette, garment color, pet markings, and print proportions against the reference.</li>
            <li><strong>Scene credibility</strong> Inspect hands, pet anatomy, contact shadows, fabric folds, and the variety of poses across the set.</li>
            <li><strong>Delivery</strong> Check crop legibility, pixel dimensions, naming, and the PNG and WebP export pairs.</li>
          </ul>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="services-title">
        <div>
          <p className={styles.eyebrow}>Services</p>
          <h2 className="dsp" id="services-title">Lifestyle imagery for your next product launch</h2>
          <p>Share your product photos, intended channels, and must-keep product details. I can scope AI-assisted lifestyle scenes, Photoshop compositing, and crops for your listing or campaign.</p>
        </div>
        <Link className="btn btn-accent" href="/#contact">Discuss your product <span aria-hidden="true">↗</span></Link>
      </section>
    </article>
  );
}
