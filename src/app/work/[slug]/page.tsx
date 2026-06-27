import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/data/portfolio";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} — ${p.title}`, description: p.blurb };
}

export default async function CaseStudy({ params }: { params: Params }) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="case wrap">
      <Link className="case-back" href="/#work">
        ← Back to work
      </Link>

      <div className="case-head">
        <div>
          <div className="case-num mono">{p.num} / Selected Work</div>
          <h1 className="case-title dsp">
            {p.name}
            <small>{p.title}</small>
          </h1>
        </div>
        <div>
          <p className="case-blurb">{p.blurb}</p>
          <div className="case-tags">
            {p.tags.map((t) => (
              <span key={t} className="wtag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="case-hero-img">
        <div className="ph-grid" />
        <span className="ph-dim mono">{p.heroDim}</span>
        <span className="ph-lab">{p.heroLab}</span>
      </div>

      <div className="facts">
        <div className="fact">
          <div className="k">Role</div>
          <div className="v dsp">{p.facts.role}</div>
        </div>
        <div className="fact">
          <div className="k">Timeline</div>
          <div className="v dsp">{p.facts.timeline}</div>
        </div>
        <div className="fact">
          <div className="k">Type</div>
          <div className="v dsp">{p.facts.type}</div>
        </div>
        <div className="fact">
          <div className="k">Platform</div>
          <div className="v dsp">{p.facts.platform}</div>
        </div>
      </div>

      <div className="case-block">
        <h3>Overview</h3>
        <div className="body">
          <p>{p.intro}</p>
        </div>
      </div>

      <div className="case-block">
        <h3>The challenge</h3>
        <div className="body">
          <p>{p.challenge}</p>
        </div>
      </div>

      <div className="case-block">
        <h3>Approach</h3>
        <div className="approach-list">
          {p.approach.map((step) => (
            <div className="approach-item" key={step.n}>
              <span className="ai-n">{step.n}</span>
              <span className="ai-t">{step.t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="case-gallery">
        {p.gallery.map((g) => (
          <div className="gph" key={g.lab}>
            <div className="ph-grid" />
            <span className="ph-dim mono">{g.dim}</span>
            <span className="ph-lab">{g.lab}</span>
          </div>
        ))}
      </div>

      <div className="case-out">
        <h3>Outcome</h3>
        <div className="out-grid">
          {p.outcomes.map((o) => (
            <div className="outcome" key={o.lab}>
              <div className="num dsp">{o.num}</div>
              <div className="lab">{o.lab}</div>
            </div>
          ))}
        </div>
      </div>

      <Link className="case-next" href={`/work/${next.slug}`}>
        <span>
          <span className="cn-k">Next project</span>
          <span className="cn-n dsp">
            {next.name} — {next.title}
          </span>
        </span>
        <span className="cn-arr">↗</span>
      </Link>
    </div>
  );
}
