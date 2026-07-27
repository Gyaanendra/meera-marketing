import { SpeakerCircle, VoiceArc, GridDots, OverlapZone } from './primitives';

export function HeroVoices({ size = 320 }: { size?: number }) {
  const s = size;
  return (
    <svg viewBox={`0 0 ${s} ${s}`} width="100%" style={{ maxWidth: `${s}px` }}>
      {/* Main speaker */}
      <SpeakerCircle cx={s * 0.5} cy={s * 0.53} r={s * 0.225} color="var(--color-ink)" />
      {/* Second speaker */}
      <SpeakerCircle cx={s * 0.72} cy={s * 0.37} r={s * 0.13} color="var(--color-red)" />
      {/* Voice arcs */}
      <VoiceArc cx={s * 0.22} cy={s * 0.53} r={s * 0.28} stroke="var(--color-cobalt)" width={s * 0.019} startAngle={0} endAngle={160} />
      <VoiceArc cx={s * 0.3} cy={s * 0.61} r={s * 0.21} stroke="var(--color-ochre)" width={s * 0.019} startAngle={20} endAngle={150} />
      {/* Overlap (cross-talk) */}
      <OverlapZone cx={s * 0.58} cy={s * 0.44} r={s * 0.08} color="var(--color-red)" />
      {/* Grid dots (structured data) */}
      <GridDots x={s * 0.12} y={s * 0.78} cols={4} rows={4} size={s * 0.05} gap={s * 0.025} color="var(--color-ink)" />
    </svg>
  );
}

export function CardIcon({ size = 40, variant = 0, inverted = false }: { size?: number; variant?: number; inverted?: boolean }) {
  const s = size;
  const v = variant % 4;
  const ink = inverted ? 'var(--color-bg)' : 'var(--color-ink)';
  const primitives: React.ReactNode[] = [];

  if (v === 0) {
    primitives.push(
      <SpeakerCircle key="a" cx={s * 0.5} cy={s * 0.5} r={s * 0.35} color={ink} />,
      <VoiceArc key="b" cx={s * 0.15} cy={s * 0.5} r={s * 0.35} stroke="var(--color-red)" width={2.5} startAngle={0} endAngle={140} />,
    );
  } else if (v === 1) {
    primitives.push(
      <SpeakerCircle key="a" cx={s * 0.38} cy={s * 0.5} r={s * 0.25} color="var(--color-cobalt)" />,
      <SpeakerCircle key="b" cx={s * 0.68} cy={s * 0.5} r={s * 0.25} color="var(--color-ochre)" />,
    );
  } else if (v === 2) {
    primitives.push(
      <GridDots key="a" x={s * 0.2} y={s * 0.2} cols={3} rows={3} size={s * 0.1} gap={s * 0.05} color={ink} />,
      <rect key="b" x={s * 0.55} y={s * 0.55} width={s * 0.1} height={s * 0.1} fill="var(--color-red)" />,
    );
  } else {
    primitives.push(
      <SpeakerCircle key="a" cx={s * 0.5} cy={s * 0.4} r={s * 0.2} color={ink} />,
      <VoiceArc key="b" cx={s * 0.5} cy={s * 0.4} r={s * 0.4} stroke="var(--color-cobalt)" width={2} startAngle={30} endAngle={150} />,
    );
  }

  return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      {primitives}
    </svg>
  );
}
