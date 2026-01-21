import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "bg-primary text-primary-foreground inline-flex size-7 shrink-0 items-center justify-center rounded-md",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-4">
        <path
          d="M5 5.5h9.5L19 10v8.5H5z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M14 5.5V10h5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 14.5h7M8.5 17h4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** Brand icons were removed from lucide v1, so the GitHub mark is inline. */
export function GitHubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
    >
      <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.53.1.72-.23.72-.5v-1.8c-2.9.63-3.52-1.25-3.52-1.25-.48-1.2-1.16-1.52-1.16-1.52-.95-.65.07-.64.07-.64 1.05.08 1.6 1.08 1.6 1.08.93 1.6 2.45 1.14 3.05.87.1-.68.37-1.14.66-1.4-2.32-.27-4.76-1.16-4.76-5.17 0-1.14.4-2.07 1.07-2.8-.11-.27-.47-1.34.1-2.78 0 0 .87-.28 2.85 1.07a9.9 9.9 0 0 1 5.19 0c1.98-1.35 2.85-1.07 2.85-1.07.57 1.44.21 2.51.1 2.78.67.73 1.07 1.66 1.07 2.8 0 4.02-2.45 4.9-4.78 5.16.38.33.71.96.71 1.95v2.9c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5Z" />
    </svg>
  );
}

export function BrandWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <BrandMark />
      <span className="text-[13px] leading-tight font-semibold">
        README<span className="text-muted-foreground font-normal"> Studio</span>
      </span>
    </span>
  );
}
