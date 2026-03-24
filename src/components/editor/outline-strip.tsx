"use client";

import { useMemo } from "react";
import { ListTree } from "lucide-react";
import { outlineFromMarkdown } from "@/lib/markdown";
import { cn } from "@/lib/utils";

export function OutlineStrip({
  markdown,
  onJump,
  className,
}: {
  markdown: string;
  onJump: (title: string) => void;
  className?: string;
}) {
  const headings = useMemo(() => outlineFromMarkdown(markdown), [markdown]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Document outline"
      className={cn(
        "border-border bg-background/80 flex items-center gap-2 border-t px-3 py-2 backdrop-blur-sm",
        className,
      )}
    >
      <ListTree
        aria-hidden="true"
        className="text-muted-foreground size-3.5 shrink-0"
      />
      <ul className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {headings.map((heading) => (
          <li key={`${heading.level}-${heading.text}`} className="shrink-0">
            <button
              type="button"
              onClick={() => onJump(heading.text)}
              className={cn(
                "hover:bg-muted text-muted-foreground hover:text-foreground rounded px-1.5 py-0.5 text-[11px] whitespace-nowrap transition-colors duration-150 ease-out",
                heading.level === 1 && "text-foreground font-medium",
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
