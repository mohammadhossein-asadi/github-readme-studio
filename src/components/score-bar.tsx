import { cn } from "@/lib/utils";

function tone(score: number) {
  if (score >= 75) return { bar: "bg-success", text: "text-success", label: "Strong" };
  if (score >= 50) return { bar: "bg-warning", text: "text-warning", label: "Fair" };
  return { bar: "bg-destructive", text: "text-destructive", label: "Weak" };
}

export function ScoreBar({
  score,
  className,
  showLabel = true,
}: {
  score: number;
  className?: string;
  showLabel?: boolean;
}) {
  const t = tone(score);
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className="bg-muted h-1.5 w-full overflow-hidden rounded-full"
        role="img"
        aria-label={`README quality ${score} out of 100, ${t.label}`}
      >
        <div
          className={cn("h-full rounded-full", t.bar)}
          style={{ width: `${score}%` }}
        />
      </div>
      {showLabel ? (
        <span className={cn("w-30 shrink-0 text-xs font-medium tabular-nums", t.text)}>
          {score}/100 · {t.label}
        </span>
      ) : null}
    </div>
  );
}

export function scoreTone(score: number) {
  return tone(score);
}
