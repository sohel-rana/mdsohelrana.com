# Editorial Redesign — Design Spec

**Date:** 2026-07-20
**Status:** Approved
**Source:** `~/Downloads/Sohel Rana - Portfolio (standalone).html`

## Goal

Re-skin mdsohelrana.com to the editorial/luxury visual language in the provided
standalone HTML design. The design covers the homepage only; this spec extends
its language to the blog pages so the site reads as one piece.

This is a re-skin, not a re-architecture. The design's section structure maps
1:1 onto the existing Astro components, and `profile.ts` remains the single
source of truth for content.

## Direction

| | Current | Target |
|---|---|---|
| Display type | Space Grotesk | Bodoni Moda (serif) |
| Body type | Inter | Manrope |
| Mono | JetBrains Mono | *(removed)* |
| Background | cool navy `#070b14` | warm dark `oklch(.192 .006 62)` |
| Accent | orange `#f97316` | gold `oklch(.79 .09 82)` |
| Shape | 14px rounded cards, glow shadows | hairline rules, sharp edges, flat |
| Container | centered 1100px | 1440px full-bleed, 56px gutters |
| Section marks | eyebrow + gradient rule | roman numerals I–VI |

Dark-only. The gold accent depends on the warm dark ground to read correctly;
the design specifies no light mode and the current site has none either.

## Decisions

Three questions the design file did not answer, resolved with the user:

1. **Blog pages** — extend the design language to blog index and post pages.
2. **Content density** — adopt the design's tighter copy. Drop per-project
   `highlights` bullets; one blurb plus one metric line per project.
3. **Responsive** — author breakpoints faithful to the design's intent. The
   design is fixed-px desktop-only; its sizes become the upper bound of fluid
   `clamp()` values.

Two calls made during design review, both confirmed:

- `highlights` is deleted from `profile.ts`, not left unused (YAGNI).
- The existing `[data-reveal]` scroll-reveal is kept rather than replaced by the
  design's CSS-only `fu` keyframe animation — same effect, already working.

## 1. Tokens

Replace the `:root` block in `src/styles/global.css` entirely.

```css
--bg:        oklch(0.192 0.006 62);
--surface:   oklch(0.232 0.007 62);
--raised:    oklch(0.26  0.008 62);   /* card hover */
--line:      oklch(0.32  0.006 68);
--ink:       oklch(0.925 0.006 85);
--muted:     oklch(0.66  0.008 78);
--faint:     oklch(0.5   0.008 72);
--accent:    oklch(0.79  0.09  82);
--on-accent: oklch(0.2   0.02  70);

--font-display: 'Bodoni Moda', serif;
--font-body:    'Manrope', sans-serif;

--gutter: clamp(20px, 5vw, 56px);
--maxw:   1440px;
```

Removed: `--card`, `--radius`, `--font-mono`, `--accent-bright`, `--accent-soft`.
Border radius is `0` throughout; chips alone keep `2px`.

Font loading in `src/layouts/Base.astro` — the existing Google Fonts `<link>`
swaps its query to:

```
family=Bodoni+Moda:opsz,wght@6..96,500;6..96,600&family=Manrope:wght@400;500;600;700&display=swap
```

`preconnect` hints stay as they are.

## 2. Type scale

The design's fixed pixel sizes become the maximum of a fluid `clamp()`.

| Role | Value |
|---|---|
| Hero h1 | `clamp(52px, 9vw, 104px)` — Bodoni 600, lh 0.98, ls -0.005em |
| Section h2 | `clamp(34px, 5.5vw, 58px)` — Bodoni 600, lh 1.02–1.05 |
| Contact h2 | `clamp(38px, 6.5vw, 68px)` — Bodoni 600, lh 1.0 |
| Card h3 | `clamp(26px, 3vw, 32px)` — Bodoni 600, lh 1.08 |
| Stat figure | `clamp(34px, 4vw, 46px)` — Bodoni 600, gold |
| Body | 16.5–17.5px Manrope 400, lh 1.6–1.64, `--muted` |
| Eyebrow / label | 11.5–13px, uppercase, ls 0.14–0.26em |

## 3. Shared primitives

The design repeats five constructs across sections. These live in `global.css`
as classes rather than being duplicated into seven scoped style blocks.

- **`.wrap`** — `max-width: var(--maxw)`, `margin-inline: auto`, inline padding
  `var(--gutter)`
- **`.sec-head`** — the `I ——— FEATURED WORK` row: gold roman numeral (600,
  ls .24em), 40px gold rule, muted label (ls .22em)
- **`.stat-band`** — 4-column grid, hairline `border-top`/`border-bottom`,
  `border-left` per cell, Bodoni gold figure over uppercase muted label
- **`.chip`** — 1px `--line` border, 2px radius, 12.5px, `--muted`
- **`.btn-accent`** — gold fill, `--on-accent` text, 700, hover `brightness(1.08)`
- **`.btn-line`** — `--line` border, hover border and text to gold

`[data-reveal]` and its `prefers-reduced-motion` guard carry over unchanged.

## 4. Components

All seven components keep their filenames and their `profile.ts` bindings.
Markup and scoped styles are rewritten.

- **`Nav.astro`** — sticky, hairline bottom, `--bg` ground. Bodoni wordmark at
  24px. Uppercase 12px links (ls .14em) hovering to gold. "Download CV" as a
  gold-outlined button filling gold on hover.
- **`Hero.astro`** — `0.82fr / 1.18fr` grid, 72px gap. Photo left: `4/5` aspect,
  `object-position: top center`, `grayscale(.32) contrast(1.02) brightness(.96)`,
  hairline border, inset bottom shadow, 2px gold baseline bar. Text right: gold
  headline eyebrow (ls .26em), hero h1, summary, two buttons, LinkedIn/GitHub
  row. `.stat-band` follows below the grid.
- **`Work.astro`** — `.sec-head` `I`. Two-column featured cards on `--surface`
  with a 2px gold `border-top`, hover to `--raised`. Card: index numeral +
  period row, Bodoni title, gold role, blurb, Bodoni gold metric, chip row,
  then a hairline-topped link row. Below, "More work" as
  `1.1fr 1.2fr 0.9fr 1fr` hairline-separated rows.
- **`Experience.astro`** — `.sec-head` `II`. Rows on a `0.32fr / 0.68fr` grid,
  56px gap, hairline `border-top`. Left: gold period, faint location. Right:
  Bodoni role, muted org, note paragraph. Education renders as a final row.
- **`Skills.astro`** — `.sec-head` `III`. Three-column groups, each with a
  hairline `border-top`, Bodoni gold group name, and a wrapped chip row.
- **`Nerddevs.astro`** — `.sec-head` `IV`. Full-bleed `--surface` band with
  88px vertical padding. Headline, blurb, its own `.stat-band`, gold CTA.
- **`Contact.astro`** — `.sec-head` `V`. Oversized Bodoni headline, lead
  paragraph, then the email as a 34px Bodoni link with a gold `border-bottom`,
  beside an uppercase LinkedIn link.
- **`Footer.astro`** — **new component.** The footer currently lives inside
  `Contact.astro`, which means blog pages render no footer at all. Extract it
  to its own component and render it from `Base.astro` so every page gets it.
  Hairline top, `space-between`, 12.5px faint: copyright left, "Dhaka,
  Bangladesh · UTC+6" right.

## 5. Content model

`src/data/profile.ts` changes:

- `Project.highlights` — **removed** from the type and all eight entries.
- `Project.description` — shortened to the design's blurb wording, transcribed
  here so this spec does not depend on the source file:
  - **Genius — AI Chat 5.0**: "An AI chat companion with GPT-4/5 and
    Vision-powered image analysis. I designed the architecture and AI pipeline
    end to end — a high-throughput Node.js backend built to survive viral
    growth."
  - **US Messaging Platform**: "A second phone number that lives in an app —
    text and call without handing out your real one. I own the queue-driven
    system design where deliverability is the product."
  - **Biddaan — EdTech LMS**: "Bangladesh's localized multi-vendor LMS.
    Educators run their whole teaching business — live classes, courses, exams
    and payments — from one platform."
  - **TestReach**: "Secure online assessment with remote proctoring — the
    platform behind high-stakes professional exams worldwide. I architected the
    core systems and led the engineering team."
  - `05`–`08` render as "More work" rows, which show only name, role, period
    and metric — their `description` is not rendered and is left as-is.
- `Project.role` on `05`–`08` — the design's rows use a descriptive phrase
  rather than the current job-title framing, since the row has no blurb to
  carry meaning. Updated to: AI Mate "Consumer AI assistant · GPT-5", NerdCRM
  "$4/seat CRM for sales teams", DailyHabitz "iOS habit tracker · AI coaching",
  Medical Imaging AI "Lead & Cloud Architect · Azure". `01`–`04` keep their
  current `role` values.
- `Project.impact` — unchanged. It already holds exactly what the design calls
  `metric`; reused as-is rather than adding a duplicate field.
- `Project.featured` — set `true` on `01`–`04` (Genius, US Messaging, Biddaan,
  TestReach). Currently only `01` and `02` carry it. `05`–`08` render as
  "More work" rows.
- `caseStudy` and `live` are unchanged in shape; the card's link row renders
  whichever are present, `live` first.

`stats`, `experience`, `education`, `skills`, `company`, `person`, `site` keep
their current shapes.

## 6. Blog

Same tokens and primitives.

Both blog pages currently consume global classes that this redesign removes or
replaces — `.container`, `.eyebrow`, `.section-title`, `.section-lead`, `.btn`,
`.btn-primary`, `.btn-ghost`. Their **markup must be migrated**, not merely
restyled: `.container` becomes `.wrap`, the eyebrow/title/lead trio becomes
`.sec-head` plus a heading, and buttons become `.btn-accent` / `.btn-line`.

Section header uses the label `WRITING` with **no roman numeral**. The numerals
I–V mark position within the homepage's single scrolling sequence; the blog is
a separate page, so a numeral there would be arbitrary.

- **`src/pages/blog/index.astro`** — hairline-separated rows, each with the
  cover image, Bodoni title, gold date/meta, and muted description. Cover
  images get the hero's grayscale treatment, dropping to full color on hover.
  Note this is **net-new**: the index currently renders text-only cards with no
  image. Covers exist at `public/blog-covers/` and are already exposed as
  `post.data.image`, so the data is available — but the `<img>`, its sizing and
  its grid column are new markup, not a re-skin.
- **`src/pages/blog/[id].astro`** — cover image with the hero's inset shadow and
  gold baseline. Bodoni `h1`/`h2`/`h3`, Manrope body at a `68ch` measure,
  17.5px, lh 1.7. Inline links gold with a hairline underline. `blockquote`
  gets a 2px gold left border. `pre`/`code` on `--surface` with a hairline
  border, `ui-monospace` stack (no webfont — `--font-mono` is gone).

## 7. Responsive

The design specifies nothing below 1440px. Breakpoints:

- **≤1024px** — Skills 3-col to 2-col. Work featured cards to 1-col. "More
  work" rows drop the metric column to `1.1fr 1.2fr 0.9fr`. Hero gap to 48px.
- **≤768px** — Hero stacks: photo above text, `max-height: 420px`,
  `object-position: top center` retained. All grids single-column. Both stat
  bands to 2×2 (cell borders adjust so no orphan `border-left` on column 1).
  Experience rows stack, gap to 12px.
- **≤820px** — Nav links collapse behind the toggle. `Nav.astro` already
  implements this toggle at exactly this breakpoint, including the
  `aria-expanded` wiring and the open/close script; keep that behaviour and
  restyle only. The design's nav carries six links plus the CV button, so this
  breakpoint stays where it is rather than moving lower.
- **≤560px** — Gutter floors at 20px. "More work" rows stack to two lines
  (name + role, then period + metric).

Type is already fluid via `clamp()`, so no per-breakpoint font-size overrides
are needed.

## Out of scope

- Light mode — the design does not specify one.
- Content rewrites beyond adopting the design's existing blurb wording.
- Blog post content changes; only presentation changes.
- `og.png` regeneration to match the new palette. Worth doing later; not part
  of this work.

## Verification

- `npm run build` completes clean.
- All six homepage sections render with correct roman numerals I–V (plus VI on
  blog) and no layout overflow at 1440 / 1024 / 768 / 375px.
- Blog index and at least two post pages render with the new tokens, each with
  a footer (which they do not have today).
- No markup anywhere still uses `.container`, `.eyebrow`, `.section-title`,
  `.section-lead`, `.btn-primary` or `.btn-ghost`.
- No references remain to `--font-mono`, `--radius`, `--card`, `--accent-soft`,
  or `--accent-bright`.
- `prefers-reduced-motion` still suppresses reveal animation.
