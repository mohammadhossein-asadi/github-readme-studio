import { cn } from "@/lib/utils";

function buildPath(values: number[], width: number, height: number, pad = 2) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const step = (width - pad * 2) / Math.max(1, values.length - 1);

  return values
    .map((value, index) => {
      const x = pad + index * step;
      const y = height - pad - ((value - min) / span) * (height - pad * 2);
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function Sparkline({
  values,
  label,
  className,
  tone = "primary",
}: {
  values: number[];
  label: string;
  className?: string;
  tone?: "primary" | "success" | "chart-2";
}) {
  const width = 240;
  const height = 56;
  const stroke = {
    primary: "var(--chart-1)",
    success: "var(--success)",
    "chart-2": "var(--chart-2)",
  }[tone];

  const id = `spark-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const path = buildPath(values, width, height);

  return (
    <figure className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label}
        className="h-14 w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`${path} L${width - 2},${height} L2,${height} Z`}
          fill={`url(#${id})`}
        />
        <path
          d={path}
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}

export function BarChart({
  data,
  label,
  className,
}: {
  data: { label: string; value: number }[];
  label: string;
  className?: string;
}) {
  const max = Math.max(...data.map((entry) => entry.value)) || 1;

  return (
    <figure className={cn("flex flex-col gap-2.5", className)}>
      <div
        role="img"
        aria-label={label}
        className="flex h-32 items-end gap-2"
      >
        {data.map((entry) => (
          <div key={entry.label} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-muted-foreground text-[10px] tabular-nums">
              {entry.value}
            </span>
            <div
              className="bg-chart-1/85 w-full rounded-t-sm"
              style={{ height: `${Math.max(4, (entry.value / max) * 84)}px` }}
            />
            <span className="text-muted-foreground truncate text-[10px]">
              {entry.label}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}
