"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { analytics, safeAnalyticsHref } from "@/lib/analytics";

const SECTION_NAMES = ["experience", "work", "about"] as const;
const SCROLL_MILESTONES = [50, 90] as const;

function stableLabel(anchor: HTMLAnchorElement, fallback: string) {
  return (
    anchor.dataset.analyticsLabel ||
    anchor.getAttribute("aria-label") ||
    fallback
  )
    .trim()
    .slice(0, 120);
}

function eventPlacement(anchor: HTMLAnchorElement) {
  const explicit = anchor.dataset.analyticsPlacement;
  if (explicit) return explicit;

  const section = anchor.closest<HTMLElement>("section[id]");
  return section?.id ? `${section.id}_section` : "unspecified";
}

function externalDestinationType(href: string) {
  try {
    const hostname = new URL(href, window.location.origin).hostname.replace(/^www\./, "");
    return hostname.split(".", 1)[0] || "external_work";
  } catch {
    return "external_work";
  }
}

function highIntentEvent(href: string) {
  if (/^mailto:/i.test(href)) return "email_clicked" as const;
  if (/^tel:/i.test(href)) return "phone_clicked" as const;

  try {
    const hostname = new URL(href, window.location.origin).hostname.replace(/^www\./, "");
    if (hostname === "linkedin.com" || hostname.endsWith(".linkedin.com")) {
      return "linkedin_clicked" as const;
    }
    if (hostname === "dribbble.com" || hostname.endsWith(".dribbble.com")) {
      return "dribbble_clicked" as const;
    }
    if (hostname === "github.com" || hostname.endsWith(".github.com")) {
      return "github_clicked" as const;
    }
  } catch {
    return null;
  }

  return null;
}

export function AnalyticsRuntime() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageKey = `${pathname}?${searchParams.toString()}`;

  useEffect(() => {
    const seenSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = (entry.target as HTMLElement).dataset.analyticsSection;
          if (!section || seenSections.has(section)) continue;

          const requiredPixels = Math.min(240, entry.boundingClientRect.height * 0.25);
          if (entry.isIntersecting && entry.intersectionRect.height >= requiredPixels) {
            seenSections.add(section);
            analytics.sectionViewed({
              section: section as (typeof SECTION_NAMES)[number],
              placement: "homepage",
            });
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5] },
    );

    for (const section of SECTION_NAMES) {
      const element = document.querySelector(`[data-analytics-section="${section}"]`);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [pageKey]);

  useEffect(() => {
    const fired = new Set<number>();
    let scheduled = false;
    let trackingReady = false;
    const readyTimer = window.setTimeout(() => {
      trackingReady = true;
    }, 750);

    const measure = () => {
      scheduled = false;
      const documentHeight = document.documentElement.scrollHeight;
      if (documentHeight <= 0) return;

      const depth = ((window.scrollY + window.innerHeight) / documentHeight) * 100;
      for (const milestone of SCROLL_MILESTONES) {
        if (depth >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          analytics.scrollDepth({ depth: milestone, placement: "page" });
        }
      }
    };

    const onScroll = () => {
      if (!trackingReady) return;
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pageKey]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const placement = eventPlacement(anchor);
      const section = anchor.dataset.analyticsSectionContext;
      const explicitEvent = anchor.dataset.analyticsEvent;

      if (explicitEvent === "work_opened") {
        const projectSlug = anchor.dataset.projectSlug;
        const projectName = anchor.dataset.projectName;
        if (!projectSlug || !projectName) return;

        analytics.workOpened({
          project_slug: projectSlug,
          project_name: projectName,
          placement,
          section: section || "work",
        });
        return;
      }

      if (explicitEvent === "external_work_clicked") {
        analytics.externalWorkClicked({
          label: stableLabel(anchor, "external work"),
          href: safeAnalyticsHref(href),
          destination_type: anchor.dataset.destinationType || "external_work",
          placement,
          section,
          source: "portfolio",
        });
        return;
      }

      const intentEvent = highIntentEvent(href);
      if (intentEvent) {
        const destinationType = intentEvent.replace("_clicked", "");
        analytics.socialClicked(intentEvent, {
          label: stableLabel(anchor, destinationType),
          href: safeAnalyticsHref(href),
          destination_type: destinationType,
          placement,
          section,
          source: "portfolio",
        });
        return;
      }

      try {
        const destination = new URL(href, window.location.origin);
        if (!/^https?:$/.test(destination.protocol) || destination.origin === window.location.origin) {
          return;
        }

        analytics.externalWorkClicked({
          label: stableLabel(anchor, "external work"),
          href: safeAnalyticsHref(href),
          destination_type:
            anchor.dataset.destinationType || externalDestinationType(href),
          placement,
          section,
          source: "portfolio",
        });
      } catch {
        return;
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
