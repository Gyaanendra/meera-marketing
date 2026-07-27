"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const SPOKES = [
  { label: "Chat", icon: "chat", color: "#D6402C" },
  { label: "Dashboard", icon: "dashboard", color: "#1F4EAD" },
  { label: "Recording", icon: "recording", color: "#E8A93B" },
  { label: "Mailing", icon: "mailing", color: "#1F4EAD" },
  { label: "Task manager", icon: "tasks", color: "#D6402C" },
];

const ICONS: Record<string, React.ReactNode> = {
  chat: <path d="M-6 -4 h12 v7 h-7 l-3 3 z" fill="#fff" />,
  dashboard: <path d="M-6 -6 h5 v5 h-5 z M2 -6 h5 v12 h-5 z M-6 1 h5 v5 h-5 z" fill="#fff" />,
  recording: <circle r="4" fill="#fff" />,
  tasks: <path d="M-6 -1 l3 3 l6 -6 M-6 5 h12" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />,
  mailing: <path d="M-7 -5 h14 v10 h-14 z M-7 -5 l7 6 l7 -6" fill="none" stroke="#fff" strokeWidth="1.4" />,
};

function SpokeIcon({ icon, size = 16 }: { icon: string; size?: number }) {
  const s = `translate(-${size / 2}, -${size / 2})`;
  return (
    <svg width={size} height={size} viewBox={`-8 -8 16 16`} style={{ flexShrink: 0 }}>
      {ICONS[icon]}
    </svg>
  );
}

/* ─── Desktop: hub-and-spoke SVG ─── */
function DesktopSVG({ svgRef }: { svgRef: React.RefObject<SVGSVGElement | null> }) {
  const width = 1000;
  const height = 340;
  const userX = 70;
  const meeraX = width / 2;
  const spokeX = width - 140;
  const centerY = height / 2;
  const spokeYs = SPOKES.map((_, i) => 40 + (i * (height - 80)) / (SPOKES.length - 1));

  return (
    <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="w-full">
      {/* connectors */}
      <path className="flow-line" d={`M ${userX + 26} ${centerY} L ${meeraX - 40} ${centerY}`} stroke="#B9B4A2" strokeWidth="2" fill="none" />
      {SPOKES.map((_, i) => (
        <path key={i} className="flow-line" d={`M ${meeraX + 40} ${centerY} C ${meeraX + 140} ${centerY}, ${spokeX - 160} ${spokeYs[i]}, ${spokeX - 26} ${spokeYs[i]}`} stroke="#B9B4A2" strokeWidth="2" fill="none" />
      ))}

      <circle className="meera-glow" cx={meeraX} cy={centerY} r="46" fill="#D6402C" opacity="0.18" />

      {/* user */}
      <g transform={`translate(${userX}, ${centerY})`}>
        <circle r="20" fill="#16171B" />
        <circle r="7" cy="-4" fill="#F1EEE4" />
        <path d="M-8 8 a8 6 0 0 1 16 0 z" fill="#F1EEE4" />
        <text y="34" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#52524C">You</text>
      </g>

      {/* meera */}
      <g transform={`translate(${meeraX}, ${centerY})`}>
        <circle r="34" fill="#D6402C" />
        <text textAnchor="middle" dy="5" fontFamily="Syne, sans-serif" fontWeight="800" fontSize="14" fill="#FFF6F2">M</text>
        <text y="54" textAnchor="middle" fontFamily="Syne, sans-serif" fontWeight="700" fontSize="13" fill="#16171B">Meera</text>
      </g>

      {/* spokes */}
      {SPOKES.map((spoke, i) => (
        <g key={spoke.label} transform={`translate(${spokeX}, ${spokeYs[i]})`}>
          <circle r="16" fill={spoke.color} />
          <use href={`#icon-${spoke.icon}`} />
          <text x="24" dy="4" fontFamily="Archivo, sans-serif" fontWeight="600" fontSize="13" fill="#16171B">{spoke.label}</text>
        </g>
      ))}

      <defs>
        {Object.entries(ICONS).map(([key, el]) => (
          <g key={key} id={`icon-${key}`}>{el}</g>
        ))}
      </defs>
    </svg>
  );
}

/* ─── Mobile: vertical flow ─── */
function MobileFlow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
      {/* You */}
      <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'var(--color-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-bg)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>You</div>
      <div style={{ color: 'var(--color-line)', fontSize: '1rem', lineHeight: 1 }}>&darr;</div>

      {/* Meera */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
        <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'var(--color-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.1rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>M</div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem' }}>Meera</span>
      </div>
      <div style={{ color: 'var(--color-line)', fontSize: '1rem', lineHeight: 1 }}>&darr;</div>

      {/* Spokes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', maxWidth: '280px' }}>
        {SPOKES.map((spoke) => (
          <div key={spoke.label} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.6rem 1rem',
            background: 'var(--color-bg-raised)',
            border: '1px solid var(--color-line)',
          }}>
            <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: spoke.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <SpokeIcon icon={spoke.icon} size={12} />
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem' }}>{spoke.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function SystemFlowDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile || !svgRef.current) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<SVGPathElement>('.flow-line').forEach((line, i) => {
        gsap.set(line, { strokeDasharray: '4 6' });
        gsap.to(line, {
          strokeDashoffset: -40,
          duration: 1.4,
          ease: 'none',
          repeat: -1,
          delay: i * 0.08,
        });
      });
      gsap.to('.meera-glow', {
        scale: 1.15, opacity: 0.35, duration: 1.6,
        ease: 'sine.inOut', repeat: -1, yoyo: true,
        transformOrigin: 'center',
      });
    }, svgRef);
    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) return <MobileFlow />;

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <DesktopSVG svgRef={svgRef} />
    </div>
  );
}
