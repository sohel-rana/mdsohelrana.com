# Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin mdsohelrana.com to the editorial/luxury visual language specified in `docs/superpowers/specs/2026-07-20-editorial-redesign-design.md`.

**Architecture:** Component architecture is unchanged — all seven homepage components keep their filenames and their `profile.ts` bindings. `global.css` is rewritten with new tokens plus five shared primitive classes; each component's markup and scoped styles are then rewritten to consume them. One new component (`Footer.astro`) is extracted from `Contact.astro`.

**Tech Stack:** Astro 5, plain CSS (scoped `<style>` per component + `global.css`), Google Fonts.

## Global Constraints

- **Dark only.** No light mode, no `prefers-color-scheme` branches.
- **Border radius is `0`** everywhere except `.chip`, which is `2px`.
- **No monospace font.** `--font-mono` is deleted. Code blocks use the system
  stack `ui-monospace, SFMono-Regular, Menlo, monospace` declared locally.
- **Fluid type for display sizes.** Every font-size **above 30px** uses
  `clamp()` — hero, section headings, contact headline, card titles, stat
  figures. Secondary type in the 21–30px band (wordmark, card index, row names,
  group names, `h4`, `prose h3`, blockquote) stays at the fixed size the tasks
  specify; the design file holds these fixed too and they need no scaling.
  No per-breakpoint `font-size` overrides either way.
- **`profile.ts` stays the single source of truth.** No content hardcoded into
  component markup.
- **Preserve `[data-reveal]`.** Keep the CSS rule and its
  `prefers-reduced-motion` guard in `global.css`, *and* keep the `data-reveal`
  attributes on elements as you rewrite each component's markup. It is easy to
  drop these during a rewrite; the animation fails silently if you do.
- **Preserve Nav's existing toggle** at 820px, including `aria-expanded` wiring
  and its script.
- **Do not reintroduce blog post cover images** (removed in `c9b3a1e`).
- Exact token values are in spec §1 and MUST be copied verbatim.

## Testing approach

This project has no test framework and adding one for a visual re-skin is not
warranted. Each task verifies with:

1. `npm run build` — must exit 0 with no warnings about missing imports.
2. `npm run dev`, then a named visual check specific to that task.
3. `grep` assertions where a task's goal is removal of something.

Run `npm run dev` once at the start and leave it running; Astro hot-reloads.

## File structure

| File | Change | Responsibility |
|---|---|---|
| `src/styles/global.css` | rewrite | Tokens, resets, 5 shared primitives |
| `src/layouts/Base.astro` | modify | Font link swap, render `<Footer />` |
| `src/components/Footer.astro` | **create** | Site footer, was inside Contact |
| `src/data/profile.ts` | modify | Drop `highlights`, retune copy, set `featured` |
| `src/components/Nav.astro` | rewrite styles | Sticky nav, keep existing toggle |
| `src/components/Hero.astro` | rewrite | Photo/text grid + stat band |
| `src/components/Work.astro` | rewrite | Featured cards + More work rows |
| `src/components/Experience.astro` | rewrite | Two-col rows + education |
| `src/components/Skills.astro` | rewrite | Three-col chip groups |
| `src/components/Nerddevs.astro` | rewrite | Surface band + stat band |
| `src/components/Contact.astro` | rewrite | Headline + email link; footer removed |
| `src/pages/blog/index.astro` | rewrite | Post rows with thumbnails |
| `src/pages/blog/[id].astro` | rewrite | Article typography |

---

### Task 1: Foundation — tokens, fonts, shared primitives

Everything else depends on this. Nothing will look right until Task 13; that is
expected and not a reason to deviate.

**Files:**
- Modify: `src/styles/global.css` (full rewrite of `:root` and helpers)
- Modify: `src/layouts/Base.astro:126-130` (font `<link>`)

**Interfaces:**
- Produces: CSS custom properties `--bg --surface --raised --line --ink --muted
  --faint --accent --on-accent --font-display --font-body --gutter --maxw`;
  classes `.wrap`, `.sec-head`, `.stat-band`, `.chip`, `.btn-accent`,
  `.btn-line`; attribute hook `[data-reveal]`. Every later task consumes these.

- [ ] **Step 1: Replace the `:root` block in `global.css`**

```css
:root {
  --bg:        oklch(0.192 0.006 62);
  --surface:   oklch(0.232 0.007 62);
  --raised:    oklch(0.26  0.008 62);
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
}
```

Delete `--card`, `--radius`, `--font-mono`, `--accent-bright`, `--accent-soft`.

- [ ] **Step 2: Update base element styles**

Keep the existing reset. Change these declarations:

```css
body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 16.5px;
  line-height: 1.62;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

::selection { background: var(--accent); color: var(--on-accent); }

h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.005em;
}

html { scroll-behavior: smooth; scroll-padding-top: 80px; }
```

Delete the old `section { padding: 96px 0 }` rule — sections now set their own
padding.

- [ ] **Step 3: Delete the old helpers, add the five primitives**

Remove `.container`, `.eyebrow`, `.section-title`, `.section-lead`, `.btn`,
`.btn-primary`, `.btn-ghost`. Add:

```css
.wrap {
  max-width: var(--maxw);
  margin-inline: auto;
  padding-inline: var(--gutter);
}

.sec-head {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 14px;
}
.sec-head .num {
  font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase;
  color: var(--accent); font-weight: 600;
}
.sec-head .rule { height: 1px; width: 40px; background: var(--accent); }
.sec-head .label {
  font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--muted);
}

.stat-band {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-block: 1px solid var(--line);
}
.stat-band > div { padding: 30px 0 30px 26px; border-left: 1px solid var(--line); }
.stat-band .figure {
  font-family: var(--font-display); font-weight: 600;
  font-size: clamp(34px, 4vw, 46px); line-height: 1; color: var(--accent);
}
.stat-band .label {
  font-size: 11.5px; letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--muted); margin-top: 10px;
}

.chip {
  border: 1px solid var(--line);
  color: var(--muted);
  font-size: 12.5px;
  padding: 5px 11px;
  border-radius: 2px;
  white-space: nowrap;
}

.btn-accent, .btn-line {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 14px; letter-spacing: 0.02em;
  transition: filter 0.18s ease, border-color 0.18s ease, color 0.18s ease;
}
.btn-accent {
  background: var(--accent); color: var(--on-accent);
  padding: 15px 28px; font-weight: 700;
}
.btn-accent:hover { filter: brightness(1.08); }
.btn-line {
  border: 1px solid var(--line); color: var(--ink);
  padding: 14px 26px; font-weight: 600;
}
.btn-line:hover { border-color: var(--accent); color: var(--accent); }
```

- [ ] **Step 4: Swap the font link in `Base.astro`**

Replace the `href` on the Google Fonts `<link>` (leave both `preconnect` tags
untouched):

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,600&family=Manrope:wght@400;500;600;700&display=swap"
/>
```

- [ ] **Step 5: Verify the build and fonts**

```bash
npm run build
```
Expected: exit 0. The site will look broken — components still reference
deleted classes. That is expected at this stage.

```bash
grep -rn "font-mono\|--radius\|--card\|accent-soft\|accent-bright" src/styles/global.css
```
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add src/styles/global.css src/layouts/Base.astro
git commit -m "Add editorial design tokens and shared primitives"
```

---

### Task 2: Content model — `profile.ts`

**Files:**
- Modify: `src/data/profile.ts:43-195`

**Interfaces:**
- Produces: `Project` without `highlights`; `projects[0..3].featured === true`.
  Tasks 6 (Work) depends on this shape.

- [ ] **Step 1: Remove `highlights` from the `Project` type**

Delete the `highlights: string[];` line from the type declaration, then delete
the `highlights: [...]` array from all eight project entries.

- [ ] **Step 2: Shorten the four featured descriptions**

Replace `description` verbatim with the strings in spec §5 for Genius, US
Messaging Platform, Biddaan and TestReach. Leave `description` on projects
`05`–`08` untouched — those rows do not render it.

- [ ] **Step 3: Set `featured` and retune "More work" roles**

Add `featured: true` to Biddaan (`03`) and TestReach (`04`); Genius and US
Messaging already have it. Then set `role` on the remaining four per spec §5:

```ts
// 05 AI Mate
role: 'Consumer AI assistant · GPT-5',
// 06 NerdCRM
role: '$4/seat CRM for sales teams',
// 07 DailyHabitz
role: 'iOS habit tracker · AI coaching',
// 08 Medical Imaging AI Platform
role: 'Lead & Cloud Architect · Azure',
```

- [ ] **Step 4: Verify**

```bash
npm run build
```
Expected: exit 0. If it fails with a TypeScript error about `highlights`, a
component still reads it — note which, it is fixed in Task 6.

```bash
grep -n "highlights" src/data/profile.ts
```
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add src/data/profile.ts
git commit -m "Tighten project copy and mark four featured projects"
```

---

### Task 3: Extract `Footer.astro`

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/components/Contact.astro:26` (remove `<footer>` and its styles)
- Modify: `src/layouts/Base.astro` (render `<Footer />` after `<slot />`)

**Interfaces:**
- Produces: `Footer.astro`, default export, no props. Rendered once by `Base`.

- [ ] **Step 1: Create `Footer.astro`**

```astro
---
import { person } from '../data/profile';
const year = new Date().getFullYear();
---

<footer class="footer">
  <div class="wrap inner">
    <span>© {year} {person.name}. All rights reserved.</span>
    <span>{person.location} · {person.timezone}</span>
  </div>
</footer>

<style>
  .footer { border-top: 1px solid var(--line); }
  .inner {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding-block: 28px;
    font-size: 12.5px;
    letter-spacing: 0.04em;
    color: var(--faint);
  }
  @media (max-width: 560px) {
    .inner { flex-direction: column; }
  }
</style>
```

- [ ] **Step 2: Remove the footer from `Contact.astro`**

Delete the `<footer class="footer">` element and every `.footer*` rule in its
`<style>` block. Leave the rest of the component alone — it is rewritten in
Task 10.

- [ ] **Step 3: Render it from `Base.astro`**

Import `Footer` and place it immediately after `<slot />`:

```astro
<slot />
<Footer />
```

- [ ] **Step 4: Verify**

```bash
npm run build
```
Expected: exit 0.

Visual check: load `/` and `/blog`. Both must show the footer — `/blog` had
none before this task. Confirm the footer appears exactly once on `/`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.astro src/components/Contact.astro src/layouts/Base.astro
git commit -m "Extract footer so blog pages render one too"
```

---

### Task 4: Nav

**Files:**
- Modify: `src/components/Nav.astro`

Rewrite the `<style>` block and the link markup. **Do not touch** the
`.menu-btn` element, its `aria-expanded` attribute, the `@media (max-width:
820px)` toggle behaviour, or the script at the bottom of the file.

- [ ] **Step 1: Restyle the bar and wordmark**

```css
.nav {
  position: sticky; top: 0; z-index: 10;
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}
.nav-inner {
  display: flex; justify-content: space-between; align-items: center;
  padding-block: 26px;
}
.wordmark {
  font-family: var(--font-display);
  font-size: 24px; font-weight: 600; letter-spacing: 0.01em;
}
```

Wrap the nav's contents in `<div class="wrap nav-inner">`.

- [ ] **Step 2: Restyle the links**

```css
.links {
  display: flex; align-items: center; gap: 30px;
  font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--muted);
}
.links a:hover { color: var(--accent); }
.cv {
  border: 1px solid var(--accent); color: var(--accent);
  padding: 10px 16px; letter-spacing: 0.12em;
}
.cv:hover { background: var(--accent); color: var(--on-accent); }
```

Link set: Work, Experience, Skills, Blog, NerdDevs, then the CV button. **Blog
links to `/blog`** as a normal internal link — no `target="_blank"`, no
absolute URL (the design file used one because it was a standalone export).

- [ ] **Step 3: Verify**

```bash
npm run build
```
Expected: exit 0.

Visual check: at desktop width the nav is a hairline-bottomed bar with a Bodoni
wordmark. Narrow the window past 820px — the toggle must still open and close
the panel, and the button's `aria-expanded` must flip in devtools.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.astro
git commit -m "Restyle nav to editorial design"
```

---

### Task 5: Hero

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Rebuild the markup**

Structure, inside `<section class="wrap">`:

```
div.hero (grid)
  div.photo    → img (person photo), div.vignette, div.baseline
  div.intro    → div.eyebrow-line, h1, p.summary, div.actions, div.socials
div.stat-band  → one div per stats[] entry
```

The `h1` renders `person.name` split across two lines — put a `<br />` between
first and last name to match the design's two-line lockup.

- [ ] **Step 2: Style the grid and photo**

```css
.hero {
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  gap: 72px;
  align-items: center;
  padding-top: 92px;
}
.photo { position: relative; }
.photo img {
  width: 100%; aspect-ratio: 4 / 5;
  object-fit: cover; object-position: top center;
  filter: grayscale(0.32) contrast(1.02) brightness(0.96);
  border: 1px solid var(--line);
}
.vignette {
  position: absolute; inset: 0; pointer-events: none;
  box-shadow: inset 0 -120px 90px -60px rgba(0, 0, 0, 0.55);
}
.baseline {
  position: absolute; left: 0; right: 0; bottom: 0;
  height: 2px; background: var(--accent);
}
```

- [ ] **Step 3: Style the text column**

```css
.eyebrow-line {
  font-size: 12.5px; letter-spacing: 0.26em; text-transform: uppercase;
  color: var(--accent); font-weight: 600; margin-bottom: 24px;
}
h1 { font-size: clamp(52px, 9vw, 104px); line-height: 0.98; }
.summary {
  max-width: 560px; margin-top: 30px;
  font-size: 17.5px; line-height: 1.64; color: var(--muted);
}
.summary strong { color: var(--ink); font-weight: inherit; }
.actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 36px; }
.socials {
  display: flex; gap: 26px; margin-top: 24px;
  font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--faint);
}
.socials a:hover { color: var(--accent); }
```

Actions: `btn-accent` → `mailto:{person.email}` "Get in touch";
`btn-line` → `person.cvFile` "Download CV ↓".

- [ ] **Step 4: Add the stat band**

Render `stats[]` into `.stat-band` using the primitive from Task 1 — one
`<div>` per stat with `.figure` and `.label` children. Give it
`margin-top: 72px`.

- [ ] **Step 5: Verify**

```bash
npm run build
```
Expected: exit 0.

Visual check: photo sits left at 4:5 with a gold bar along its bottom edge and
a darkened lower third. Name is large Bodoni on two lines. Four stats sit in a
row between hairlines, each figure gold.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.astro
git commit -m "Rebuild hero with editorial photo/text grid"
```

---

### Task 6: Work

**Files:**
- Modify: `src/components/Work.astro`

**Interfaces:**
- Consumes: `projects` from Task 2 — `featured` flag, `impact` as the metric,
  no `highlights`.

- [ ] **Step 1: Split the data**

```ts
const featured = projects.filter((p) => p.featured);
const more = projects.filter((p) => !p.featured);
```

- [ ] **Step 2: Section header and intro**

`.sec-head` with num `I`, label `Featured Work`. Then an `h2` reading
"Products used by millions" at `clamp(34px, 5.5vw, 58px)`, and a lead
paragraph at `max-width: 640px`, `color: var(--muted)`.

- [ ] **Step 3: Featured cards**

```css
.cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 26px; margin-top: 40px; }
.card {
  background: var(--surface);
  border-top: 2px solid var(--accent);
  padding: 36px 34px;
  display: flex; flex-direction: column;
  transition: background 0.18s ease;
}
.card:hover { background: var(--raised); }
.card-top { display: flex; justify-content: space-between; align-items: baseline; }
.idx { font-family: var(--font-display); font-size: 26px; color: var(--faint); }
.period { font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.card h3 { font-size: clamp(26px, 3vw, 32px); line-height: 1.08; margin-top: 16px; }
.role { font-size: 12.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--accent); margin-top: 8px; }
.blurb { margin-top: 16px; font-size: 15.5px; line-height: 1.6; color: var(--muted); }
.metric { font-family: var(--font-display); font-size: 20px; color: var(--accent); margin-top: 20px; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.links {
  display: flex; gap: 20px; margin-top: auto; padding-top: 20px;
  border-top: 1px solid var(--line);
  font-size: 12.5px; letter-spacing: 0.06em; text-transform: uppercase;
}
.links a:hover { color: var(--accent); }
```

Card body order: index + period, `h3` name, role, `description`, `impact` as
`.metric`, `tags` as `.chip`s, then the link row. The link row renders `live`
first (label + " ↗") then `caseStudy` ("Case study →"), each only if present.
`margin-top: auto` on `.links` keeps link rows aligned across the pair.

If `nda` is true, append ` · NDA` to the period text.

- [ ] **Step 4: "More work" rows**

```css
.more-row {
  display: grid;
  grid-template-columns: 1.1fr 1.2fr 0.9fr 1fr;
  gap: 24px; align-items: baseline;
  padding: 22px 0; border-top: 1px solid var(--line);
}
.more-name { font-family: var(--font-display); font-size: 23px; font-weight: 600; }
.more-role { font-size: 14px; color: var(--muted); }
.more-period { font-size: 12.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--faint); }
.more-metric { font-size: 14px; color: var(--accent); text-align: right; }
```

Preceded by a `More work` label: 12px, ls 0.2em, uppercase, `--muted`.

- [ ] **Step 5: Verify**

```bash
npm run build
```
Expected: exit 0.

Visual check: exactly four cards in a 2×2 grid, each with a gold top border and
link rows aligned to the card bottom. Four "More work" rows below, metrics
right-aligned in gold.

- [ ] **Step 6: Commit**

```bash
git add src/components/Work.astro
git commit -m "Rebuild work section with featured cards and more-work rows"
```

---

### Task 7: Experience

**Files:**
- Modify: `src/components/Experience.astro`

- [ ] **Step 1: Header and rows**

`.sec-head` num `II`, label `Experience`. `h2`: "19+ years — from national
systems to AI products", `max-width: 840px`.

```css
.row {
  display: grid; grid-template-columns: 0.32fr 0.68fr;
  gap: 56px; padding: 34px 0; border-top: 1px solid var(--line);
}
.period { font-size: 12.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); font-weight: 600; }
.place { font-size: 13px; color: var(--faint); margin-top: 6px; }
.row h4 { font-size: 26px; line-height: 1.15; }
.org { font-size: 14px; color: var(--muted); margin-top: 4px; letter-spacing: 0.02em; }
.note { font-size: 15.5px; line-height: 1.6; color: var(--muted); margin-top: 12px; max-width: 620px; }
```

Left cell: `job.period`, `job.location`. Right cell: `job.role`, `job.company`,
then `job.points` joined into one paragraph (`points.join(' ')`) — the design
has no bullets here.

- [ ] **Step 2: Education as a final row**

Keep rendering `education` — it is already imported. Use the same `.row` grid:
left cell `education.period`, right cell `education.degree` as the `h4` and
`education.school` as `.org`.

- [ ] **Step 3: Verify**

```bash
npm run build
```
Expected: exit 0.

Visual check: five job rows plus one education row, hairline-separated, gold
periods on the left, Bodoni roles on the right. No bullet lists anywhere.

- [ ] **Step 4: Commit**

```bash
git add src/components/Experience.astro
git commit -m "Rebuild experience as two-column editorial rows"
```

---

### Task 8: Skills

**Files:**
- Modify: `src/components/Skills.astro`

- [ ] **Step 1: Rebuild**

`.sec-head` num `III`, label `Skills`. `h2`: "The stack I build with". Lead:
"Technologies matched to the problem — never the other way around."
(`max-width: 560px`).

```css
.groups { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px 48px; margin-top: 44px; }
.group { border-top: 1px solid var(--line); padding-top: 20px; }
.group-name {
  font-family: var(--font-display); font-size: 21px; font-weight: 600;
  color: var(--accent); margin-bottom: 16px;
}
.items { display: flex; flex-wrap: wrap; gap: 8px; }
```

Items render as `.chip`.

- [ ] **Step 2: Verify**

```bash
npm run build
```
Expected: exit 0.

Visual check: six groups in a 3×2 grid, each with a hairline above and a gold
Bodoni heading.

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.astro
git commit -m "Rebuild skills as three-column chip groups"
```

---

### Task 9: NerdDevs

**Files:**
- Modify: `src/components/Nerddevs.astro`

- [ ] **Step 1: Rebuild as a full-bleed band**

The `--surface` background must span the full viewport width while its content
stays within `.wrap`. Put the background on the `<section>` and `.wrap` inside:

```css
.band { background: var(--surface); margin-top: 96px; padding-block: 88px; }
```

`.sec-head` num `IV`, label `NerdDevs`. `h2` is the literal string "Building
something? NerdDevs can build it with you." at `max-width: 900px` — it is not
derived from `company.tagline`, which stays unused here. Blurb renders
`company.blurb` at `max-width: 680px`.

- [ ] **Step 2: Stat band and CTA**

Render `company.stats` into `.stat-band` with `margin-top: 40px`. Then a
`.btn-accent` linking to `company.url` reading `company.cta` with a trailing
` →`, `margin-top: 34px`, `display: inline-block`.

- [ ] **Step 3: Verify**

```bash
npm run build
```
Expected: exit 0.

Visual check: the section's lighter background runs edge to edge with no
horizontal scrollbar, while text aligns with the sections above it.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nerddevs.astro
git commit -m "Rebuild NerdDevs section as full-bleed surface band"
```

---

### Task 10: Contact

**Files:**
- Modify: `src/components/Contact.astro`

The footer was already removed in Task 3 — do not re-add it.

- [ ] **Step 1: Rebuild**

`.sec-head` num `V`, label `Contact`, `margin-bottom: 20px`.

```css
.contact { padding-block: 100px; }
.contact h2 { font-size: clamp(38px, 6.5vw, 68px); line-height: 1; max-width: 960px; }
.lead { max-width: 560px; margin-top: 22px; font-size: 17px; line-height: 1.6; color: var(--muted); }
.methods { display: flex; flex-wrap: wrap; gap: 16px 40px; align-items: center; margin-top: 36px; }
.email {
  font-family: var(--font-display);
  font-size: clamp(24px, 4vw, 34px);
  border-bottom: 1px solid var(--accent);
  padding-bottom: 6px;
}
.email:hover { color: var(--accent); }
.social { font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.social:hover { color: var(--accent); }
```

Headline: "Let's build something exceptional together." Lead: "Building an AI
product, scaling a SaaS, or launching an EdTech platform? I reply within one
business day."

- [ ] **Step 2: Verify**

```bash
npm run build
```
Expected: exit 0.

Visual check: oversized Bodoni headline, email underlined in gold, footer
appears once below (from `Base`, not from this component).

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.astro
git commit -m "Rebuild contact section with oversized editorial headline"
```

---

### Task 11: Blog index

**Files:**
- Modify: `src/pages/blog/index.astro`

**Interfaces:**
- Consumes: `.wrap`, `.sec-head`, `.chip` from Task 1.

- [ ] **Step 1: Migrate off deleted global classes**

Replace `.container` → `.wrap`. Replace the `.eyebrow` / `.section-title` /
`.section-lead` trio with `.sec-head` (label `Writing`, **no `.num` element** —
see spec §6) plus an `h1` and a lead paragraph.

- [ ] **Step 2: Rebuild post rows with thumbnails**

This is net-new markup — the index currently has no images.

```css
.post {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px; align-items: start;
  padding: 28px 0; border-top: 1px solid var(--line);
}
.post img {
  width: 100%; aspect-ratio: 16 / 10; object-fit: cover;
  border: 1px solid var(--line);
  filter: grayscale(0.32) contrast(1.02) brightness(0.96);
  transition: filter 0.25s ease;
}
.post:hover img { filter: none; }
.post h2 { font-size: clamp(24px, 3vw, 30px); line-height: 1.1; }
.post:hover h2 { color: var(--accent); }
.post-meta { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
.post-desc { color: var(--muted); font-size: 15.5px; margin-top: 12px; max-width: 620px; }
.post-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
```

Guard the image on `post.data.image` being present.

- [ ] **Step 3: Verify**

```bash
npm run build
```
Expected: exit 0.

```bash
grep -n "container\|eyebrow\|section-title\|section-lead\|btn-primary\|btn-ghost" src/pages/blog/index.astro
```
Expected: no output.

Visual check: twelve rows, each with a desaturated thumbnail that goes full
colour on hover.

- [ ] **Step 4: Commit**

```bash
git add src/pages/blog/index.astro
git commit -m "Rebuild blog index with thumbnails and editorial rows"
```

---

### Task 12: Blog post

**Files:**
- Modify: `src/pages/blog/[id].astro`

- [ ] **Step 1: Migrate off deleted global classes**

`.container` → `.wrap`. The two `.btn btn-ghost` / `.btn btn-primary` buttons
in `.post-footer` become `.btn-line` / `.btn-accent`.

- [ ] **Step 2: Restyle the article head**

No cover image — do not add one back. Back-link, then meta line (date · reading
time) in 12px uppercase gold, then the `h1` at `clamp(34px, 5.5vw, 56px)`, then
tags as `.chip`.

- [ ] **Step 3: Restyle `.prose`**

```css
.prose { max-width: 68ch; font-size: 17.5px; line-height: 1.7; color: var(--muted); }
.prose :global(h2) { font-family: var(--font-display); font-size: clamp(26px, 3.4vw, 34px); color: var(--ink); margin-top: 2.2em; margin-bottom: 0.5em; }
.prose :global(h3) { font-family: var(--font-display); font-size: 24px; color: var(--ink); margin-top: 1.8em; margin-bottom: 0.4em; }
.prose :global(p) { margin-bottom: 1.25em; }
.prose :global(strong) { color: var(--ink); font-weight: 600; }
.prose :global(a) { color: var(--accent); border-bottom: 1px solid var(--line); }
.prose :global(a:hover) { border-bottom-color: var(--accent); }
.prose :global(blockquote) {
  border-left: 2px solid var(--accent);
  padding-left: 22px; margin: 1.6em 0; color: var(--ink);
  font-family: var(--font-display); font-size: 21px; line-height: 1.45;
}
.prose :global(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.88em; background: var(--surface);
  border: 1px solid var(--line); border-radius: 2px; padding: 2px 6px;
}
.prose :global(pre) {
  background: var(--surface); border: 1px solid var(--line);
  padding: 20px; overflow-x: auto; margin: 1.6em 0;
}
.prose :global(pre code) { background: none; border: 0; padding: 0; }
.prose :global(ul), .prose :global(ol) { padding-left: 1.3em; margin-bottom: 1.25em; }
.prose :global(li) { margin-bottom: 0.5em; }
```

- [ ] **Step 4: Verify**

```bash
npm run build
```
Expected: exit 0.

```bash
grep -rn "font-mono\|--radius\|--card\|accent-soft\|accent-bright" src/
```
Expected: no output. This is the last file that referenced them.

Visual check: open two posts — one with code blocks, one without. Body text
holds a comfortable measure; `pre` blocks scroll horizontally rather than
widening the page.

- [ ] **Step 5: Commit**

```bash
git add "src/pages/blog/[id].astro"
git commit -m "Restyle blog post typography to editorial design"
```

---

### Task 13: Responsive pass and final sweep

**Files:**
- Modify: `src/components/Hero.astro`, `Work.astro`, `Experience.astro`,
  `Skills.astro`, `src/styles/global.css`, `src/pages/blog/index.astro`

- [ ] **Step 1: 1024px breakpoint**

```css
/* Skills.astro */
@media (max-width: 1024px) { .groups { grid-template-columns: repeat(2, 1fr); } }
/* Work.astro */
@media (max-width: 1024px) {
  .cards { grid-template-columns: 1fr; }
  .more-row { grid-template-columns: 1.1fr 1.2fr 0.9fr; }
  .more-metric { display: none; }
}
/* Hero.astro */
@media (max-width: 1024px) { .hero { gap: 48px; } }
```

- [ ] **Step 2: 768px breakpoint**

```css
/* Hero.astro */
@media (max-width: 768px) {
  .hero { grid-template-columns: 1fr; padding-top: 56px; }
  .photo img { max-height: 420px; }
}
/* global.css — both stat bands */
@media (max-width: 768px) {
  .stat-band { grid-template-columns: repeat(2, 1fr); }
  .stat-band > div:nth-child(odd) { border-left: 0; }
  .stat-band > div:nth-child(n + 3) { border-top: 1px solid var(--line); }
}
/* Skills.astro */
@media (max-width: 768px) { .groups { grid-template-columns: 1fr; } }
/* Experience.astro */
@media (max-width: 768px) { .row { grid-template-columns: 1fr; gap: 12px; } }
/* blog/index.astro */
@media (max-width: 768px) { .post { grid-template-columns: 1fr; gap: 16px; } }
```

The `nth-child(odd)` rule removes the orphan left border on the first column
once the band wraps to 2×2.

- [ ] **Step 3: 560px breakpoint**

```css
/* Work.astro */
@media (max-width: 560px) {
  .more-row { grid-template-columns: 1fr 1fr; }
  .more-name { grid-column: 1 / -1; }
  .more-role { grid-column: 1 / -1; }
}
```

Gutter already floors at 20px via the `clamp()` in `--gutter` — no rule needed.

- [ ] **Step 4: Full verification sweep**

```bash
npm run build
```
Expected: exit 0.

```bash
grep -rn "font-mono\|--radius\|--card\|accent-soft\|accent-bright\|section-title\|section-lead\|btn-primary\|btn-ghost\|\bcontainer\b" src/
```
Expected: no output.

Visual check at 1440 / 1024 / 768 / 375px on `/`, `/blog` and one post:
- No horizontal scrollbar at any width.
- Roman numerals read I, II, III, IV, V down the homepage; the blog header has
  a `WRITING` label and no numeral.
- Nav toggle works below 820px.
- Both stat bands are 2×2 below 768px with no orphan borders.
- Footer present on all three pages.

- [ ] **Step 5: Confirm reduced motion still works**

In devtools, enable "Emulate prefers-reduced-motion: reduce" and reload `/`.
Expected: all sections visible immediately, no fade-in translate.

- [ ] **Step 6: Commit**

Stage explicit paths — **never `git add -A`** here. An untracked
`package-lock.json` may be present (it is not gitignored) and must not be
swept into a redesign commit.

```bash
git add src/components/Hero.astro src/components/Work.astro \
        src/components/Experience.astro src/components/Skills.astro \
        src/styles/global.css src/pages/blog/index.astro
git commit -m "Add responsive breakpoints for editorial redesign"
```

---

## Notes for the implementer

- Sections set their own vertical padding — the old blanket
  `section { padding: 96px 0 }` is gone. Homepage sections use
  `padding-top: 96px` and `scroll-margin-top: 80px`.
- The design file (`~/Downloads/Sohel Rana - Portfolio (standalone).html`) is
  not in the repo and may not exist on your machine. Every value you need is in
  the spec or this plan; you should not need it.
- `og.png` is still in the old navy/orange palette. That is knowingly out of
  scope — do not regenerate it as part of this work.
