# Meera — Design Style Guide
### "Structured Signal" — Bauhaus geometry meets disciplined minimalism

This document is the single source of truth for visual decisions on the Meera
marketing site. It is written to be followed literally — every value is a
final decision, not a suggestion. If a coding agent is implementing this, it
should treat every hex code, number, and rule below as exact, and should not
substitute "close enough" alternatives (wrong font weight, wrong shade of
red, wrong spacing step) unless a rule explicitly says "flexible."

---

## 1. Direction, in one paragraph

Meera turns messy, spoken meetings into structured, actionable signal. The
site should *look* like that promise: geometric, gridded, and precise —
Bauhaus's belief that clean shapes reveal order beneath chaos — but built
with a restrained, modern minimalist hand (generous whitespace, one accent
color doing real work, no decoration that doesn't carry meaning). Think:
**the Bauhaus poster tradition (Herbert Bayer, Joost Schmidt) redrawn as a
2026 B2B AI product site.** Not retro pastiche — the geometry is load-bearing,
not decorative wallpaper.

**The one thing someone should remember:** a recurring motif of circles and
arcs that stand in for *voices in a meeting* — a solid circle is a speaker,
a thin arc is their voice/waveform, overlapping circles are cross-talk. This
motif appears in the hero, section dividers, and loading/empty states. It is
the signature element. Nothing else on the page should compete with it for
visual weight.

---

## 2. Color system

Cream base, ink text, one Bauhaus-red accent used sparingly, cobalt and
ochre as secondary geometry-only colors (never used for text or UI chrome —
they live inside the shape motif and data visualizations only).

```css
:root {
  /* Base */
  --color-bg: #F1EEE4;         /* warm paper, not stark white */
  --color-bg-raised: #FFFFFF;  /* cards / panels sitting on --bg */
  --color-ink: #16171B;        /* primary text — near-black, not pure #000 */
  --color-ink-soft: #52524C;   /* secondary text / captions */
  --color-line: #D9D5C7;       /* hairline borders, dividers */

  /* Accent — used for CTAs, links, the ONE highlighted word per section */
  --color-red: #D6402C;        /* Bauhaus red — primary accent */
  --color-red-ink: #FFF6F2;    /* text-on-red */

  /* Geometry-only palette — shape motif + charts, never body text/buttons */
  --color-cobalt: #1F4EAD;
  --color-ochre:  #E8A93B;

  /* Dark section variant (used for 1–2 high-contrast sections, not the whole page) */
  --color-ink-bg: #16171B;
  --color-ink-bg-raised: #202127;
  --color-paper-on-dark: #F1EEE4;
}
```

**Usage ratio (per viewport, roughly):** 65% `--color-bg`, 25% `--color-ink`
(type + shapes), 10% total for red/cobalt/ochre combined. If a screen has
more color than that, pull it back.

**Rules:**
- Red is a *highlight*, not a background. Never a red section background.
- Cobalt and ochre only appear inside the geometric shape motif or in data
  visualizations (charts, waveform graphics) — never in buttons, links, or nav.
- Exactly one dark (`--color-ink-bg`) section is allowed per page as a
  rhythm-break (e.g. the "What Meera manages" feature grid already dark in
  the current build — keep that one, don't add more).
- Never use a purple gradient, never use `#D97757` (that specific terracotta
  reads as "generic AI tool" — our red is more saturated and cooler to avoid
  that association).

---

## 3. Typography system

Two families, doing clearly different jobs, plus one monospace for
data/utility text (this product shows timestamps, transcripts, model names —
give that content its own voice).

| Role | Font | Source | Weight(s) |
|---|---|---|---|
| Display / headlines | **Syne** | Google Fonts | 700 (Bold), 800 (ExtraBold) |
| Body / UI text | **Archivo** | Google Fonts | 400, 500, 600 |
| Data / utility (labels, timestamps, model tags, eyebrows) | **JetBrains Mono** | Google Fonts | 400, 500 |

```css
/* next/font/google in app/layout.tsx */
import { Syne, Archivo, JetBrains_Mono } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700","800"], variable: "--font-display" });
const archivo = Archivo({ subsets: ["latin"], weight: ["400","500","600"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--font-mono" });
```

**Why these:** Syne has flared, geometric-but-not-generic letterforms — bold
weights read almost like cut paper, which suits the Bauhaus-poster feel
without reaching for the overused Space Grotesk. Archivo is a grotesque
built for long-form UI reading at small sizes. JetBrains Mono signals
"this is data/system output," which reinforces the product's precision.

### Type scale (desktop / mobile)

| Token | Size (desktop) | Size (mobile) | Line-height | Letter-spacing | Font |
|---|---|---|---|---|---|
| `--text-display` (hero H1) | 96px | 44px | 0.95 | -0.02em | Syne 800 |
| `--text-h2` | 56px | 32px | 1.0 | -0.01em | Syne 800 |
| `--text-h3` | 32px | 22px | 1.1 | 0 | Syne 700 |
| `--text-lead` (intro paragraph) | 22px | 18px | 1.5 | 0 | Archivo 400 |
| `--text-body` | 17px | 16px | 1.6 | 0 | Archivo 400 |
| `--text-caption` | 14px | 13px | 1.4 | 0.01em | Archivo 500 |
| `--text-eyebrow`/`--text-mono` | 13px | 12px | 1.4 | 0.08em, UPPERCASE | JetBrains Mono 500 |

**Rules:**
- Headlines are always Syne, always tight line-height, never centered on
  desktop (left-align to the grid — centered Syne headlines look like a
  poster mockup, not a real product).
- Never italicize Syne. If emphasis is needed inline, use `--color-red` on
  the emphasized word(s) instead of italics or bold — this is how you get
  the "one highlighted word per section" signature look seen in the
  reference (e.g. "operational **truth**").
- Body copy is always Archivo 400 at `--text-body` minimum — never smaller
  than 16px on mobile, 17px on desktop, for accessibility.
- Eyebrows ("01 / WHO WE ARE" style labels) are mono, uppercase, tracked out
  wide. Keep the numbering — it's already meaningful here because Phases,
  "What Meera does," and "Four steps" are genuinely sequential/enumerable
  content, not decoration. Do not add numbering to non-sequential content
  (e.g. don't number the feature cards inside "What Meera manages" — those
  are a set, not a sequence).

---

## 4. Spacing & grid system

8px base unit. Everything — padding, gaps, margins — is a multiple of 8
(4px is the only allowed half-step, used for tight icon/label pairs).

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 96px;
  --space-9: 128px;
  --space-10: 192px;
}
```

**Layout grid:**
- Max content width: `1280px`, centered, with `--space-5` (32px) side gutters
  on desktop, `--space-3` (16px) on mobile.
- 12-column grid on desktop (`≥1024px`), 4-column on mobile (`<640px`),
  gutter = `--space-4` (24px).
- Vertical rhythm between major sections: `--space-9` (128px) desktop,
  `--space-7` (64px) mobile. Don't let sections touch — the Bauhaus grid
  feeling comes from generous, *consistent* air, not tight stacking.
- Card internal padding: `--space-5` (32px) desktop / `--space-4` (24px) mobile.
- Border-radius: **0px on all geometric/brand shapes** (circles are drawn as
  actual circles, not rounded squares). UI chrome (buttons, input fields,
  toast/badges) gets a small consistent radius: `--radius-ui: 6px`. Never
  mix — decorative shapes are hard geometry, interactive chrome is soft.

---

## 5. The shape motif ("voices" system)

This is the signature element. Build it once as a small set of reusable
SVG/CSS primitives, then compose it differently per section — never the
exact same arrangement twice.

**Primitives:**
1. **Speaker circle** — a solid filled circle, one of `--color-ink`,
   `--color-red`, `--color-cobalt`, or `--color-ochre`. Represents a person.
2. **Voice arc** — a quarter- or half-ring (stroke only, 3–6px stroke width,
   no fill), radiating from or overlapping a speaker circle. Represents
   speech/sound. Multiple concentric arcs = someone talking at length.
3. **Grid dots** — a small dot-matrix (like the reference image's dotted
   square) representing structured/transcribed data — used near
   text-heavy areas to visually connect "voice → structured text."
4. **Overlap zone** — where two speaker circles' arcs intersect, rendered
   as a darker/denser overlap — represents cross-talk or a decision point.

**Composition rules:**
- 3–5 primitives per composition, max. This is not a busy illustration —
  it's a diagram with restraint.
- Always align at least one primitive to the underlying 12-column grid so it
  reads as "designed," not "placed."
- Use flat fills only — no gradients, no drop shadows on the shapes
  themselves (a very subtle ambient shadow on the *composition as a whole*
  against the page background is fine, nothing per-shape).
- The hero composition is the most elaborate version; every other use
  (section dividers, empty states, loading spinners) is a simpler 2–3
  primitive subset — reinforcing the same visual language at lower volume.

---

## 6. Motion & animation principles

Pairs with the GSAP + Lenis + `ScrollExpandMedia` implementation already in
the codebase (`lib/gsap.ts`, `components/SmoothScroll.tsx`,
`components/ScrollExpandMedia.tsx`). Rules for anything new:

- **Easing:** default to `cubic-bezier(0.22, 1, 0.36, 1)` (a confident
  "quart-out") for reveals; use `cubic-bezier(0.65, 0, 0.35, 1)` for anything
  symmetric/scrubbed (expand-then-contract). Never use linear easing except
  for continuous loops (e.g. a marquee).
- **Durations:** micro-interactions (hover, button press) 150–250ms.
  Section reveals 500–800ms. The hero media expand/contract is
  *scroll-scrubbed*, not time-based — its duration is however long the user
  takes to scroll through the pinned section (typically tie to ~150–200vh
  of scroll distance).
- **One orchestrated moment per page, not scattered micro-effects.** The
  page-load hero reveal (staggered: eyebrow → headline words → subhead →
  buttons, ~60–80ms stagger) is the one big choreographed moment. Everything
  else on scroll should feel like *quiet confirmation* (fade + 16px
  translate-Y, 0.6s) — not another spectacle.
- **Respect `prefers-reduced-motion`:** disable Lenis smoothing and swap all
  scroll-scrub effects for simple opacity fades when it's set.
- Shape-motif primitives may get a very slow (8–14s), subtle idle rotation
  or arc-stroke "draw-on" animation on scroll-into-view — this is the one
  place a little playfulness is earned, since it reinforces the "voices/
  waveform" metaphor. Keep amplitude small; it should read as *alive*, not
  *distracting*.

---

## 7. Component patterns

- **Nav:** transparent over hero, solidifies to `--color-bg` with a
  `1px solid --color-line` bottom border after ~80px scroll (crossfade,
  200ms). Logo mark stays the blue square + "M" — it already reads clean;
  don't touch it.
- **Primary button:** `--color-red` fill, `--color-red-ink` text, Archivo
  600, `--radius-ui`, `--space-3` `--space-5` padding. On hover: background
  darkens 8%, no scale-transform (scale-on-hover reads generic/AI-templated
  — use a color shift instead).
- **Secondary button:** transparent fill, `1px solid --color-ink`, `--color-ink`
  text. Hover: fill flips to `--color-ink`, text to `--color-bg`.
- **Cards (feature grid):** `--color-bg-raised` on light sections /
  `--color-ink-bg-raised` on the dark section, 0px radius, `1px solid
  --color-line` (or `rgba(241,238,228,0.12)` on dark), icon token top-left
  using one shape-motif primitive (not a generic emoji/icon-library glyph —
  replace the current emoji icons with the shape system for cohesion).
- **Eyebrow label:** mono, uppercase, `--color-ink-soft`, `letter-spacing:
  0.08em`, preceded by the number where the content is genuinely sequential.

---

## 8. Do's and don'ts

**Do:**
- Let whitespace and the grid do the "premium" work — resist the urge to
  fill every section with a shape or a card.
- Keep exactly one accent color (red) for interactive/emphasis elements.
- Reuse the speaker-circle/voice-arc motif everywhere a decorative visual
  is needed instead of stock illustration or generic AI gradient blobs.
- Left-align headlines to the grid.

**Don't:**
- Don't use purple gradients, glassmorphism, or generic blob shapes.
- Don't use `#D97757`/warm-clay-on-cream — too close to a common
  AI-generated-site tell.
- Don't center Syne display headlines.
- Don't add numbered eyebrows to non-sequential content sets.
- Don't scale-transform buttons/cards on hover — use color/border changes.
- Don't stack more than one dark section per page.

---

## 9. Ready-to-use prompts (for a coding agent implementing this section by section)

Copy/paste one at a time; each assumes `lib/gsap.ts`, `SmoothScroll.tsx`,
and this style guide are already in the repo and should be read first.

**Prompt — Design tokens:**
> Read `DESIGN_STYLE_GUIDE.md`. Create `app/tokens.css` implementing every
> CSS variable in sections 2, 3, and 4 exactly as specified (colors, type
> scale as `--text-*` custom properties using `clamp()` between the mobile
> and desktop sizes given, and spacing scale). Import it once in
> `app/layout.tsx`. Do not invent additional colors or spacing values outside
> this scale.

**Prompt — Fonts:**
> In `app/layout.tsx`, load Syne (700/800), Archivo (400/500/600), and
> JetBrains Mono (400/500) via `next/font/google` exactly as shown in
> section 3 of `DESIGN_STYLE_GUIDE.md`. Expose them as CSS variables
> `--font-display`, `--font-body`, `--font-mono` on the `<html>` element.

**Prompt — Shape motif component:**
> Build `components/shapes/` containing four primitives as described in
> section 5 of `DESIGN_STYLE_GUIDE.md`: `SpeakerCircle`, `VoiceArc`,
> `GridDots`, and a `VoicesComposition` that arranges 3–5 of them per the
> composition rules. Use only flat fills from the geometry-only palette
> (`--color-cobalt`, `--color-ochre`, `--color-red`, `--color-ink`). No
> gradients, no per-shape drop shadows, 0px radius.

**Prompt — Hero section:**
> Rebuild the hero using `--text-display` for the H1, left-aligned to the
> 12-column grid (not centered), with the word "AI" or one other word
> rendered in `--color-red`. Stagger-reveal on load: eyebrow → headline
> words → subhead → CTA buttons, 60–80ms stagger, easing
> `cubic-bezier(0.22,1,0.36,1)`. Place a `VoicesComposition` (5 primitives)
> as the hero's visual anchor instead of empty space.

**Prompt — Scroll-expand media:**
> Wire the existing `components/ScrollExpandMedia.tsx` into the "See Meera
> in action" section using the product demo video. Follow section 6's
> easing/duration rules — scrub-driven, not time-based, over ~180vh of
> pinned scroll, symmetric expand-in/contract-out.

**Prompt — Feature grid cards:**
> Restyle the feature grid cards per section 7: 0px radius,
> `--color-bg-raised` fill, `1px solid --color-line`, replace all emoji
> icons with a 2-primitive `VoicesComposition` variant sized 40×40px in the
> top-left of each card.
