import posthog, { type CaptureResult, type Properties } from "posthog-js";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const CUSTOM_EVENTS = new Set([
  "section_viewed",
  "work_opened",
  "external_work_clicked",
  "linkedin_clicked",
  "dribbble_clicked",
  "github_clicked",
  "email_clicked",
  "phone_clicked",
  "scroll_depth",
]);
const FIRST_TOUCH_STORAGE_KEY = "portfolio_first_campaign_v1";
const CURRENT_CAMPAIGN_STORAGE_KEY = "portfolio_current_campaign_v1";
const SESSION_CAMPAIGN_STORAGE_KEY = "portfolio_session_campaign_v1";
const URL_PROPERTY_NAMES = new Set([
  "$current_url",
  "$referrer",
  "$pathname",
  "current_url",
  "referrer",
  "pathname",
  "url",
  "URL",
  "href",
  "filename",
  "source_url",
  "script_url",
]);

type UtmKey = (typeof UTM_KEYS)[number];
type FirstTouchKey = `first_${UtmKey}`;
type SessionTouchKey = `$session_entry_${UtmKey}`;
type SectionName = "experience" | "work" | "about";
type ScrollMilestone = 50 | 90;
type SocialEvent =
  | "linkedin_clicked"
  | "dribbble_clicked"
  | "github_clicked"
  | "email_clicked"
  | "phone_clicked";

type CommonProperties = {
  placement: string;
  section?: string;
  label?: string;
  href?: string;
  source?: string;
  destination_type?: string;
};

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const enabledOverride = process.env.NEXT_PUBLIC_POSTHOG_ENABLED;
const testMode = process.env.NEXT_PUBLIC_POSTHOG_TEST_MODE === "true";
let firstTouchProperties: Properties = {};
let currentCampaignProperties: Properties = {};
let sessionCampaignProperties: Properties = {};

export const analyticsEnabled =
  Boolean(key && host) &&
  (enabledOverride === "true" ||
    (process.env.NODE_ENV === "production" && enabledOverride !== "false"));

function sanitizeUrl(value: string, preserveUtms: boolean) {
  try {
    const url = new URL(value, window.location.origin);
    url.hash = "";

    for (const parameter of Array.from(url.searchParams.keys())) {
      if (!preserveUtms || !UTM_KEYS.includes(parameter as UtmKey)) {
        url.searchParams.delete(parameter);
      }
    }

    return url.toString();
  } catch {
    return value.split(/[?#]/, 1)[0];
  }
}

function sanitizePathname(value: string) {
  return value.split(/[?#]/, 1)[0];
}

function sanitizeEmbeddedUrls(value: string) {
  return value
    .replace(/https?:\/\/[^\s"'<>]+/gi, (url) => sanitizeUrl(url, false))
    .replace(/\b(mailto|tel):[^\s"'<>]+/gi, (_, scheme: string) => `${scheme}:[REDACTED]`);
}

function sanitizePropertyValue(
  propertyName: string,
  value: unknown,
  insideException = false,
): unknown {
  const exceptionContext =
    insideException ||
    propertyName.startsWith("$exception") ||
    propertyName === "exception";

  if (typeof value === "string") {
    if (propertyName === "$current_url" || propertyName === "current_url") {
      return sanitizeUrl(value, true);
    }
    if (propertyName === "$pathname" || propertyName === "pathname") {
      return sanitizePathname(value);
    }
    if (
      URL_PROPERTY_NAMES.has(propertyName) ||
      propertyName.endsWith("_url") ||
      propertyName.endsWith("_href")
    ) {
      return sanitizeUrl(value, false);
    }
    return exceptionContext ? sanitizeEmbeddedUrls(value) : value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizePropertyValue(propertyName, item, exceptionContext));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        sanitizePropertyValue(key, nestedValue, exceptionContext),
      ]),
    );
  }

  return value;
}

function sanitizeCapture(result: CaptureResult | null): CaptureResult | null {
  if (!result) return null;

  const properties = Object.fromEntries(
    Object.entries(result.properties).map(([propertyName, value]) => [
      propertyName,
      sanitizePropertyValue(propertyName, value),
    ]),
  ) as Properties;

  if (CUSTOM_EVENTS.has(result.event)) {
    properties.analytics_schema_version = 1;
  }

  refreshCampaignProperties();
  Object.assign(
    properties,
    currentCampaignProperties,
    sessionCampaignProperties,
    firstTouchProperties,
  );

  return { ...result, properties };
}

function readUtmValuesFromUrl() {
  const campaign: Partial<Record<UtmKey, string>> = {};
  const parameters = new URLSearchParams(window.location.search);

  for (const utmKey of UTM_KEYS) {
    const value = parameters.get(utmKey)?.trim().slice(0, 120);
    if (value) campaign[utmKey] = value;
  }

  return campaign;
}

function firstTouchFrom(values: Partial<Record<UtmKey, string>>) {
  return Object.fromEntries(
    Object.entries(values).map(([utmKey, value]) => [`first_${utmKey}`, value]),
  ) as Partial<Record<FirstTouchKey, string>>;
}

function sessionTouchFrom(values: Partial<Record<UtmKey, string>>) {
  return Object.fromEntries(
    Object.entries(values).map(([utmKey, value]) => [`$session_entry_${utmKey}`, value]),
  ) as Partial<Record<SessionTouchKey, string>>;
}

function parseStoredCampaign(value: string, propertyNames: readonly string[]) {
  const parsed = JSON.parse(value) as Record<string, unknown>;
  const campaign: Properties = {};

  for (const propertyName of propertyNames) {
    const storedValue = parsed[propertyName];
    if (typeof storedValue === "string" && storedValue.trim()) {
      campaign[propertyName] = storedValue.trim().slice(0, 120);
    }
  }

  return campaign;
}

function parseStoredFirstTouch(value: string) {
  const parsed = JSON.parse(value) as Record<string, unknown>;
  const campaign: Partial<Record<FirstTouchKey, string>> = {};

  for (const utmKey of UTM_KEYS) {
    const propertyName: FirstTouchKey = `first_${utmKey}`;
    const storedValue = parsed[propertyName];
    if (typeof storedValue === "string" && storedValue.trim()) {
      campaign[propertyName] = storedValue.trim().slice(0, 120);
    }
  }

  return campaign;
}

function loadFirstTouchProperties() {
  try {
    const stored = window.localStorage.getItem(FIRST_TOUCH_STORAGE_KEY);
    if (stored) return parseStoredFirstTouch(stored);

    const campaign = firstTouchFrom(readUtmValuesFromUrl());
    if (Object.keys(campaign).length > 0) {
      window.localStorage.setItem(FIRST_TOUCH_STORAGE_KEY, JSON.stringify(campaign));
    }
    return campaign;
  } catch {
    return firstTouchFrom(readUtmValuesFromUrl());
  }
}

function loadCurrentCampaignProperties() {
  const landingCampaign = readUtmValuesFromUrl();

  try {
    if (Object.keys(landingCampaign).length > 0) {
      window.localStorage.setItem(
        CURRENT_CAMPAIGN_STORAGE_KEY,
        JSON.stringify(landingCampaign),
      );
      return landingCampaign;
    }

    const stored = window.localStorage.getItem(CURRENT_CAMPAIGN_STORAGE_KEY);
    return stored ? parseStoredCampaign(stored, UTM_KEYS) : {};
  } catch {
    return landingCampaign;
  }
}

function loadSessionCampaignProperties() {
  const propertyNames = UTM_KEYS.map(
    (utmKey) => `$session_entry_${utmKey}` as SessionTouchKey,
  );

  try {
    const stored = window.sessionStorage.getItem(SESSION_CAMPAIGN_STORAGE_KEY);
    if (stored) return parseStoredCampaign(stored, propertyNames);

    const campaign = sessionTouchFrom(readUtmValuesFromUrl());
    if (Object.keys(campaign).length > 0) {
      window.sessionStorage.setItem(
        SESSION_CAMPAIGN_STORAGE_KEY,
        JSON.stringify(campaign),
      );
    }
    return campaign;
  } catch {
    return sessionTouchFrom(readUtmValuesFromUrl());
  }
}

function refreshCampaignProperties() {
  const campaign = readUtmValuesFromUrl();
  if (Object.keys(campaign).length === 0) return;

  currentCampaignProperties = campaign;

  try {
    window.localStorage.setItem(
      CURRENT_CAMPAIGN_STORAGE_KEY,
      JSON.stringify(currentCampaignProperties),
    );

    if (Object.keys(sessionCampaignProperties).length === 0) {
      sessionCampaignProperties = sessionTouchFrom(campaign);
      window.sessionStorage.setItem(
        SESSION_CAMPAIGN_STORAGE_KEY,
        JSON.stringify(sessionCampaignProperties),
      );
    }
  } catch {
    if (Object.keys(sessionCampaignProperties).length === 0) {
      sessionCampaignProperties = sessionTouchFrom(campaign);
    }
  }
}

function sanitizeReplayRequest<T extends { name?: string }>(request: T): T {
  if (!request.name) return request;
  return { ...request, name: sanitizeUrl(request.name, true) };
}

export function initializeAnalytics() {
  if (!analyticsEnabled || !key || !host || posthog.__loaded) return;

  firstTouchProperties = loadFirstTouchProperties();
  currentCampaignProperties = loadCurrentCampaignProperties();
  sessionCampaignProperties = loadSessionCampaignProperties();

  posthog.init(key, {
    api_host: host,
    defaults: "2026-05-30",
    capture_pageview: { path: true, search: true },
    capture_pageleave: true,
    capture_performance: {
      network_timing: false,
      web_vitals: true,
      web_vitals_attribution: false,
    },
    capture_exceptions: true,
    autocapture: false,
    capture_dead_clicks: true,
    person_profiles: "identified_only",
    persistence: "localStorage",
    internal_or_test_user_hostname: null,
    cross_subdomain_cookie: false,
    respect_dnt: true,
    opt_out_useragent_filter: false,
    request_batching: !testMode,
    disable_compression: testMode,
    debug: testMode,
    disableDeviceModel: true,
    disable_capture_url_hashes: true,
    mask_personal_data_properties: true,
    custom_personal_data_properties: ["email", "phone", "token", "auth", "code"],
    save_campaign_params: false,
    save_referrer: false,
    before_send: sanitizeCapture,
    loaded: (client) => {
      client.register_once(firstTouchProperties);
    },
    disable_session_recording: true,
    enable_recording_console_log: false,
    logs: {
      captureConsoleLogs: false,
    },
    session_recording: {
      maskAllInputs: true,
      maskTextSelector:
        "[data-ph-sensitive], a[href^='mailto:'], a[href^='tel:']",
      blockSelector: ".ph-no-capture, [data-ph-no-capture]",
      recordHeaders: false,
      recordBody: false,
      recordCrossOriginIframes: false,
      collectFonts: false,
      maskAttributeFn: (name, value) => {
        if (name === "href" && /^(mailto|tel):/i.test(value)) {
          return `${value.split(":", 1)[0]}:[REDACTED]`;
        }
        return value;
      },
      maskCapturedNetworkRequestFn: sanitizeReplayRequest,
    },
  });
}

function capture(event: string, properties: Properties) {
  if (!analyticsEnabled) return;
  posthog.capture(event, properties);
}

export const analytics = {
  sectionViewed(properties: { section: SectionName; placement: "homepage" }) {
    capture("section_viewed", properties);
  },

  workOpened(
    properties: CommonProperties & {
      project_slug: string;
      project_name: string;
    },
  ) {
    capture("work_opened", properties);
  },

  externalWorkClicked(properties: CommonProperties & { href: string }) {
    capture("external_work_clicked", properties);
  },

  socialClicked(event: SocialEvent, properties: CommonProperties) {
    capture(event, properties);
  },

  scrollDepth(properties: { depth: ScrollMilestone; placement: "page" }) {
    capture("scroll_depth", properties);
  },
};

export function safeAnalyticsHref(href: string) {
  if (/^(mailto|tel):/i.test(href)) {
    return `${href.split(":", 1)[0]}:`;
  }
  return sanitizeUrl(href, false);
}
