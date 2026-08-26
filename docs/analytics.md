# Portfolio analytics contract

## Runtime configuration

The browser integration starts only when both `NEXT_PUBLIC_POSTHOG_KEY` and
`NEXT_PUBLIC_POSTHOG_HOST` are present. Production builds enable analytics by
default. Ordinary local development remains disabled; set
`NEXT_PUBLIC_POSTHOG_ENABLED=true` only for intentional local verification.
Set it to `false` to suppress capture in any environment.

Automated browser verification may additionally set
`NEXT_PUBLIC_POSTHOG_TEST_MODE=true`. This disables request batching and
compression so a localhost sink can inspect deterministic event payloads. It
does not weaken the SDK bot filter. Never set test mode in Cloudflare Preview
or Production.

These are public ingestion values. Never add a PostHog personal API key or any
other private token to a `NEXT_PUBLIC_*` variable.

## Pageviews and attribution

PostHog's built-in pageview capture is disabled because its History API hooks
also observe App Router hydration transitions. The portfolio runtime emits the
standard `$pageview` event once after the initial route is hydrated and once
after each pathname or search-string navigation. Hash-only section navigation
is intentionally not a pageview.

The supported campaign inputs are `utm_source`, `utm_medium`, `utm_campaign`,
`utm_content`, and `utm_term`.

### First-touch attribution

First touch is independent of PostHog person profiles and remains available for
anonymous visitors:

- Before `posthog.init`, the first tagged landing is written synchronously to
  origin-scoped `localStorage` under `portfolio_first_campaign_v1`.
- Only the five exact `first_utm_*` properties are accepted. Values are
  trimmed and limited to 120 characters.
- The record has no application TTL. It lasts until the visitor clears site
  storage, the browser evicts it, or the origin changes.
- A later tagged campaign does not overwrite an existing first touch.
- The same values are mirrored with `posthog.register_once` into PostHog's
  anonymous localStorage persistence. No `identify()` call is made.
- The `before_send` hook attaches the values to standard and custom events.
  They therefore survive App Router navigation, untagged subsequent events,
  reloads, and later visits in the same browser.
- If localStorage is unavailable, the current tagged page still gets in-memory
  first-touch properties, but cross-visit persistence is unavailable.

### Current and session attribution

PostHog's automatic campaign/referrer persistence is disabled because its
anonymous `$set` and flags context can include a raw `$initial_current_url`
before `before_send` can sanitize it. The portfolio persists only allowlisted
campaign values:

- Current `utm_*` values use origin-scoped `localStorage` under
  `portfolio_current_campaign_v1`. A later tagged campaign overwrites current
  attribution; untagged navigation and later untagged visits keep the most
  recent campaign until storage is cleared or evicted.
- Session-entry `$session_entry_utm_*` values use `sessionStorage` under
  `portfolio_session_campaign_v1`. They are written from the first tagged URL
  in the browser tab and are not overwritten by a later campaign in that tab.
  They last until the tab/session storage is closed or cleared.
- `before_send` attaches both sets to standard and custom events. They describe
  current/tab-session context and remain separate from immutable
  `first_utm_*` attribution.

Canonical Career-Ops format:

```text
https://dangpham.pages.dev/?utm_source=cv&utm_medium=resume&utm_campaign=<company-slug>&utm_content=<role-slug>
```

Use lowercase ASCII kebab-case slugs and stable company/role values. Use
`utm_term` only for a useful optional variant such as `senior` or `referral`.
Never place a person's name, email address, requisition token, or other private
data in a UTM value.

## Event taxonomy

| Event | Purpose | Core properties |
| --- | --- | --- |
| `$pageview` | Initial and App Router route/search visit | Sanitized URL/path/referrer plus campaign properties |
| `section_viewed` | Meaningful homepage section exposure | `section`, `placement` |
| `work_opened` | Internal project case-study opening | `project_slug`, `project_name`, `placement`, `section` |
| `external_work_clicked` | Non-social outbound portfolio work | `label`, sanitized `href`, `destination_type`, `placement`, `section`, `source` |
| `linkedin_clicked` | LinkedIn intent | stable label and sanitized destination |
| `dribbble_clicked` | Dribbble intent | stable label and sanitized destination |
| `github_clicked` | GitHub intent | stable label and sanitized destination |
| `email_clicked` | Email intent | stable label and `mailto:` scheme only; no address |
| `phone_clicked` | Phone intent | stable label and `tel:` scheme only; no number |
| `scroll_depth` | Useful document reach | `depth` (50 or 90), `placement` |

Every custom event includes `analytics_schema_version: 1`. Link capture uses a
single delegated listener and never delays navigation. Autocapture is disabled,
so arbitrary clicks and element text are not collected.

`experience`, `work`, and `about` each fire at most once per pageview. A
section counts after at least 25% of its height or 240 CSS pixels (whichever is
smaller) is visible. Scroll milestones fire once per pageview when the bottom
of the viewport reaches 50% and 90% of the document.

## Standard-event URL and error privacy

The final `before_send` hook applies to standard PostHog events as well as
custom events:

- `$current_url` retains no query parameters or fragment.
- `$referrer` retains no query parameters or fragment.
- Pathname properties have query/fragment suffixes removed.
- Other URL-, href-, and filename-shaped properties have all query parameters
  and fragments removed.
- Exception structures are traversed recursively. Embedded HTTP(S) URLs lose
  query parameters/fragments, and embedded `mailto:` or `tel:` values are
  redacted.

This policy applies to emitted `$pageview`, `$pageleave`, `$web_vitals`,
and `$exception` payloads. Legitimate UTM attribution remains available only
as explicit campaign properties.
Automatic campaign/referrer persistence is disabled so unsanitized
`$initial_current_url` data cannot bypass the event hook via anonymous `$set`
or feature-flag person context.

## Dead clicks, replay, logs, and exceptions

`capture_dead_clicks: true` keeps the SDK ready, but dead clicks also depend
on PostHog project configuration. With project-level dead-click capture
disabled, `$dead_click` is not considered operational.

Session replay is intentionally forced off with
`disable_session_recording: true`, regardless of the current project setting.
For a later reviewed opt-in, the retained configuration masks all input values,
masks mail/phone text and attributes, blocks marked private regions, records no
request headers or bodies, excludes cross-origin iframes and fonts, and
sanitizes page/network URLs in the browser before transmission. Enabling replay
requires both a deliberate code change and project-side review.

Console collection is explicitly off in both SDK paths:
`enable_recording_console_log: false` for replay logs and
`logs.captureConsoleLogs: false` for structured browser logs. Keep it off for
initial production analytics because application and third-party console output
can contain visitor input, tokens, or other private context.

Frontend exception capture and Web Vitals capture remain enabled. Network
timing is off while replay is off. Web Vitals uses PostHog's standard
`$web_vitals` event rather than a custom metric.

## Cloudflare Pages handoff

The repository uses Next.js static export:

- Build command: `npm run build`
- Build output directory: `out`
- Required: `NEXT_PUBLIC_POSTHOG_KEY`
- Required: `NEXT_PUBLIC_POSTHOG_HOST`
- Optional: `NEXT_PUBLIC_POSTHOG_ENABLED`

Never deploy `NEXT_PUBLIC_POSTHOG_TEST_MODE=true`. If Preview traffic should
stay out of production analytics, omit the key/host there or set
`NEXT_PUBLIC_POSTHOG_ENABLED=false`. A rebuild is required after changing
`NEXT_PUBLIC_*` values because Next.js inlines them into the client bundle.

## Reading CV campaign results

### `CV → Portfolio Visits` insight

Create this once in the PostHog project that receives production traffic.

- Insight type: Trends.
- Series: event `$pageview`, measured by **Total count**. Add a second series
  on the same event measured by **Unique sessions** for a visit-shaped number.
- Filters: `utm_source` equals `cv` **and** `utm_medium` equals `resume`.
- Breakdown: event property `utm_campaign` (the company slug). Add
  `utm_content` as a second breakdown, or switch to it, to split by role slug.
- Date range: since the first CV send; set the chart to cumulative if you want
  a running total rather than per-day bars.

For first send/last send timestamps, open the breakdown value and read the
underlying events, or build a table insight on `$pageview` filtered the same
way and aggregated by `min(timestamp)` and `max(timestamp)` per
`utm_campaign`.

To answer "did company X's CV produce a visit?", read the row for that
company's `utm_campaign` slug. An absent row means no tagged visit was
recorded for that campaign.

### Clicks and depth by company campaign

Every custom event carries the same attribution properties, so any event can be
filtered by `utm_campaign` the same way. Useful follow-ups:

- `work_opened` broken down by `utm_campaign` — which campaigns led to a case
  study being opened.
- `external_work_clicked`, `dribbble_clicked`, `github_clicked` — outbound
  interest per campaign.
- `email_clicked` / `linkedin_clicked` — contact intent per campaign.
- `scroll_depth` with `depth = 90` — campaigns that produced a full read.

Use `first_utm_campaign` instead of `utm_campaign` when you want the campaign
that originally introduced the browser, rather than the most recent tagged
entry. Use `$session_entry_utm_campaign` for the campaign that started the
current tab session.

### What a campaign hit does and does not prove

A hit means: a browser opened the portfolio through a URL tagged for that
specific job application.

It does not prove that the CV PDF itself was opened, that the visitor works at
that company, that the visitor was a recruiter or hiring manager, or that one
hit equals one person. CV files are forwarded, links are shared, previews and
security scanners can fetch URLs, and one person may visit repeatedly from more
than one browser or device.

Treat campaign hits as a directional signal about which applications generated
attention, not as proof of who looked. The implementation is deliberately
anonymous and must not be extended with identification to close this gap.
