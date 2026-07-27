# Meera Marketing Website

A brand-forward marketing website for **Meera** — the AI Chief of Staff by Hypotenuse Analytics. Built with a Bauhaus-inspired design system (cream base, red accent, geometric shape motifs, Syne/Archivo typography).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animations | GSAP 3.15 (ScrollTrigger) + Framer Motion |
| Smooth Scroll | Lenis 1.1 |
| Icons | @animateicons/react (Lucide) |
| TypeScript | 5.9 |

## Design System

- **Colors**: Cream base `#F1EEE4`, near-black ink `#16171B`, Bauhaus-red accent `#D6402C`, cobalt `#1F4EAD`, ochre `#E8A93B`
- **Typography**: Syne (display 700/800), Archivo (body 400/500/600), JetBrains Mono (data/mono)
- **Radius**: 0px on brand shapes, `6px` on UI chrome (`--radius-ui`)
- **Shape motifs**: SpeakerCircle, VoiceArc, GridDots, OverlapZone — SVG flat fills, 0px radius
- **Buttons**: Color shift on hover (no scale-transform)

## Sections (01–10)

| # | Section | Highlights |
|---|---------|-----------|
| 01 | **Hero** | Animated headline stagger, collage widget panel (calendar, tasks, recording, stat badge, chat), HeroVoices SVG art, responsive mobile fallback |
| 02 | **Video** | Scroll-triggered expand media with product demo video (R2), mute/unmute toggle |
| 03 | **Dashboard** | 320vh scroll-pinned timeline with 3-image crossfade cycle, 16:10 aspect ratio |
| 04 | **Product** | 6 feature cards with CardIcon variants, scattered SVG shape decorations |
| 05 | **Phases** | Dark section with asymmetric bento grid, 6 management capability cards, CardIcon inverted for contrast |
| 06 | **Steps** | 4-step workflow with @animateicons/react icons, interleaved animated SVG art cards with GSAP loops |
| 07 | **System Flow** | Hub-and-spoke architecture diagram (SVG), mobile vertical stacked layout |
| 08 | **About** | Hypotenuse Analytics 3-pillar cards (3px colored borders), stats bar, decorative shape accents |
| 09 | **Testimonials** | Full-width asymmetric bento grid, 7 team quotes with GSAP directional reveals + GSAP-looped SVG art |
| 10 | **CTA** | Dark section with interactive calendar widget + contact form, team social proof |

Plus **Navigation** (floating GSAP-animated pill), **Footer** (4-column, draw-on SVG divider), **LoadingScreen** (SVG path-morph curtain + progress ring + counter).

## Animations

- **GSAP ScrollTrigger**: Scroll reveals on all sections (fade + translate-Y), hero stagger, navigation pill transition
- **Lenis Smooth Scroll**: 1.15s duration, exponential easing, global `window.__lenis` for programmatic scrollTo
- **Ambient BG**: GSAP-looped shape motif clusters (drift/pulse/rotate/dance) in Video, Product, and CTA sections
- **SVG Art Cards**: Continuous GSAP loops (pulsing circles, drifting dots, rotating arms, drawing strokes) in Steps and Testimonials
- **Loading Screen**: SVG path-morph curtain (curved → flat), red progress ring sync'd to counter 0–100
- **Footer**: Draw-on SVG divider via stroke-dashoffset

## Project Structure

```
meera-marketing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + Syne/Archivo/JetBrains Mono fonts + SmoothScroll
│   │   └── page.tsx            # All 10 sections composed in order
│   ├── components/
│   │   ├── shapes/
│   │   │   ├── primitives.tsx      # SpeakerCircle, VoiceArc, GridDots, OverlapZone
│   │   │   └── VoicesComposition.tsx # HeroVoices, CardIcon (4 variants + inverted)
│   │   ├── AmbientShapes.tsx    # Animated background shape clusters (GSAP loops)
│   │   ├── SmoothScroll.tsx     # Lenis + GSAP ticker integration
│   │   ├── ScrollExpandMedia.tsx # Scroll-triggered media expand (pinned scrub)
│   │   ├── LoadingScreen.tsx    # SVG path-morph loader with progress ring
│   │   ├── Navigation.tsx       # Floating GSAP-animated pill nav
│   │   ├── HeroSection.tsx      # Collage + widget panel + HeroVoices art
│   │   ├── VideoSection.tsx     # Product demo with ScrollExpandMedia
│   │   ├── DashboardSection.tsx  # 3-image scroll cycle
│   │   ├── ProductSection.tsx    # Feature cards
│   │   ├── PhasesSection.tsx     # Dark bento grid
│   │   ├── StepsSection.tsx      # Bento with animated SVG art
│   │   ├── SystemFlowSection.tsx # Architecture diagram
│   │   ├── SystemFlowDiagram.tsx # Hub-and-spoke SVG
│   │   ├── AboutSection.tsx      # Company info + stats
│   │   ├── TestimonialsSection.tsx # Full-width bento + animated art
│   │   ├── CTASection.tsx        # Calendar booking + form
│   │   └── Footer.tsx            # 4-column footer + draw-on divider
│   ├── lib/
│   │   ├── gsap.ts              # GSAP + ScrollTrigger registration
│   │   └── utils.ts             # cn() utility
│   ├── providers.tsx
│   └── styles/
│       └── globals.css          # Design tokens, Tailwind v4, custom CSS
├── public/
│   ├── dashboards/
│   │   ├── 1.png, 2.png, 3.png  # Dashboard scroll-cycle images
│   ├── images/
│   │   ├── team/                 # Team headshots (AVIF)
│   │   └── ...                   # Misc images
│   └── logo.png
├── DESIGN_STYLE_GUIDE.md         # Full Bauhaus design system spec
├── PRODUCT.md                    # Brand register
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (Turbopack)
npm run dev

# Build for production
npm run build

# Open http://localhost:3000
```

## Environment

Copy `.env.local.example` to `.env.local` and adjust as needed:

```bash
cp .env.local.example .env.local
```

## License

Internal — Hypotenuse Analytics
