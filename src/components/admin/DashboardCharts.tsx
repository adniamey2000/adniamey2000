export function BarChart({
  data,
  colorClass = "fill-primary",
  label,
}: {
  data: { label: string; count: number }[];
  colorClass?: string;
  label: string;
}) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const W = 340;
  const H = 180;
  const pad = 28;
  const n = data.length;
  const slot = W / n;
  const barW = Math.min(slot * 0.5, 34);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={label}>
      {data.map((d, i) => {
        const h = (d.count / max) * (H - pad - 14);
        const x = i * slot + (slot - barW) / 2;
        const y = H - pad - h;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={h} rx={4} className={colorClass} />
            {d.count > 0 && (
              <text
                x={i * slot + slot / 2}
                y={y - 5}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                className="fill-ink"
              >
                {d.count}
              </text>
            )}
            <text
              x={i * slot + slot / 2}
              y={H - 8}
              textAnchor="middle"
              fontSize="9"
              className="fill-muted"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function GroupedBarChart({
  series,
  labels,
  label,
}: {
  series: { name: string; data: { label: string; count: number }[] }[];
  labels: string[];
  label: string;
}) {
  const max = Math.max(...series.flatMap((s) => s.data.map((d) => d.count)), 1);
  const W = 340;
  const H = 180;
  const pad = 28;
  const n = series[0]?.data.length ?? 0;
  const slot = W / n;
  const groupW = Math.min(slot * 0.6, 48);
  const barW = groupW / Math.max(series.length, 1);
  const colors = ["#4a4dbb", "#9fa1e1", "#1018e5"];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={label}>
      {series[0]?.data.map((d, i) => {
        return (
          <g key={d.label}>
            {series.map((s, j) => {
              const h = (s.data[i].count / max) * (H - pad - 14);
              const x = i * slot + (slot - groupW) / 2 + j * barW;
              const y = H - pad - h;
              return (
                <g key={s.name}>
                  <rect
                    x={x + 1}
                    y={y}
                    width={Math.max(barW - 2, 1)}
                    height={h}
                    rx={3}
                    fill={colors[j % colors.length]}
                  />
                  {s.data[i].count > 0 && (
                    <text
                      x={x + barW / 2}
                      y={y - 4}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="700"
                      className="fill-ink"
                    >
                      {s.data[i].count}
                    </text>
                  )}
                </g>
              );
            })}
            <text
              x={i * slot + slot / 2}
              y={H - 8}
              textAnchor="middle"
              fontSize="9"
              className="fill-muted"
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function DonutChart({
  parts,
  centerLabel = "au total",
}: {
  parts: { label: string; value: number; color: string }[];
  centerLabel?: string;
}) {
  const total = parts.reduce((s, p) => s + p.value, 0);
  if (total === 0) {
    return (
      <div className="flex h-44 items-center justify-center text-sm text-muted">
        Aucune donnée
      </div>
    );
  }

  const segments = parts
    .filter((p) => p.value > 0)
    .map((p, i, arr) => {
      const before = arr.slice(0, i).reduce((s, x) => s + x.value, 0);
      const start = (before / total) * 360;
      const end = ((before + p.value) / total) * 360;
      return `${p.color} ${start}deg ${end}deg`;
    });

  return (
    <div className="flex flex-wrap items-center gap-6">
      <div
        className="relative h-44 w-44 shrink-0 rounded-full"
        style={{ background: `conic-gradient(${segments.join(",")})` }}
      >
        <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-white">
          <span className="font-serif text-3xl font-bold text-ink">{total}</span>
          <span className="text-xs text-muted">{centerLabel}</span>
        </div>
      </div>
      <ul className="space-y-2 text-sm">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <span className="text-muted">{p.label}</span>
            <span className="ml-auto font-semibold text-ink">{p.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
