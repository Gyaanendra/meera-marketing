# Meera scroll kit

## Files

- `index.html` — **open this directly in a browser, no build step.** Full
  standalone preview of the redesign: hero, two scroll-expand-media
  sections (video 16:9, image 4:5), feature grid, one dark section, footer.
  Uses Tailwind, GSAP + ScrollTrigger, and Lenis all via CDN.
- `DESIGN_STYLE_GUIDE.md` — the full design spec (colors, type, spacing,
  shape motif, motion rules) this page implements. Hand this to your coding
  agent alongside the files below.
- `lib/gsap.ts` — registers ScrollTrigger once for the Next.js port.
- `components/SmoothScroll.tsx` — Lenis provider, wrap `app/layout.tsx` with
  it once.
- `components/ScrollExpandMedia.tsx` — the React version of the pinned
  expand/contract effect. Drop in an `<img>` or `<video>` as its child.

## Try it now

Just double-click `index.html`, or run a tiny local server if your browser
blocks the Google Fonts/CDN requests over `file://`:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Scroll past the hero — the video placeholder pins and expands to full
width, then contracts back as you keep scrolling. Swap the placeholder
`<div>`s (marked with `<!-- replace with -->` comments) for a real
`<video>` or `<img>` and it works the same way.

## Porting into your Next.js project

1. `npm install gsap lenis`
2. Copy `lib/gsap.ts` and `components/SmoothScroll.tsx` into your project.
3. Wrap your root layout:

```tsx
// app/layout.tsx
import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
```

4. Copy `components/ScrollExpandMedia.tsx` in and use it anywhere:

```tsx
<ScrollExpandMedia caption={<h2 className="font-display text-5xl">Watch it work.</h2>} startWidthVW="40vw" aspectRatio="16 / 9">
  <video src="/product-demo.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
</ScrollExpandMedia>
```

5. Apply the tokens from `DESIGN_STYLE_GUIDE.md` section 2–4 as Tailwind
   theme extensions (see `tailwind.config` block at the top of `index.html`
   for the exact values already wired up) or as raw CSS variables.
