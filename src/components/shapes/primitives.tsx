export function SpeakerCircle({ cx, cy, r, color = "var(--color-ink)" }: {
  cx: number; cy: number; r: number; color?: string;
}) {
  return <circle cx={cx} cy={cy} r={r} fill={color} />;
}

export function VoiceArc({ cx, cy, r, stroke = "var(--color-cobalt)", width = 5, startAngle = 0, endAngle = 180 }: {
  cx: number; cy: number; r: number; stroke?: string; width?: number; startAngle?: number; endAngle?: number;
}) {
  const startRad = ((startAngle - 90) * Math.PI) / 180;
  const endRad = ((endAngle - 90) * Math.PI) / 180;
  const x1 = Math.round((cx + r * Math.cos(startRad)) * 10000) / 10000;
  const y1 = Math.round((cy + r * Math.sin(startRad)) * 10000) / 10000;
  const x2 = Math.round((cx + r * Math.cos(endRad)) * 10000) / 10000;
  const y2 = Math.round((cy + r * Math.sin(endRad)) * 10000) / 10000;
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return (
    <path
      d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`}
      stroke={stroke}
      strokeWidth={width}
      fill="none"
      strokeLinecap="round"
    />
  );
}

export function GridDots({ x, y, cols = 3, rows = 3, size = 8, gap = 8, color = "var(--color-ink)" }: {
  x: number; y: number; cols?: number; rows?: number; size?: number; gap?: number; color?: string;
}) {
  const dots: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        <rect key={`${r}-${c}`} x={x + c * (size + gap)} y={y + r * (size + gap)} width={size} height={size} fill={color} rx={0} />
      );
    }
  }
  return <>{dots}</>;
}

export function OverlapZone({ cx, cy, r, color = "var(--color-red)" }: {
  cx: number; cy: number; r: number; color?: string;
}) {
  return <circle cx={cx} cy={cy} r={r} fill={color} opacity={0.15} />;
}
