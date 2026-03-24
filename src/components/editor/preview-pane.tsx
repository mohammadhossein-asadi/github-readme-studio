"use client";

import { ExternalLink, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/controls";
import { MarkdownPreview } from "@/components/markdown-preview";
import { OutlineStrip } from "@/components/editor/outline-strip";
import type { Repo } from "@/lib/types";
import type { DocStats } from "@/lib/markdown";
import { cn } from "@/lib/utils";

export function PreviewPane({
  repo,
  markdown,
  theme,
  onThemeChange,
  width,
  onWidthChange,
  stats,
  onJumpToSection,
  className,
}: {
  repo: Repo;
  markdown: string;
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
  width: "desktop" | "tablet" | "mobile";
  onWidthChange: (width: "desktop" | "tablet" | "mobile") => void;
  stats: DocStats;
  onJumpToSection?: (title: string) => void;
  className?: string;
}) {
  return (
    <section
      aria-label="README preview"
      className={cn("bg-subtle flex h-full min-h-0 flex-col", className)}
    >
      <div className="border-border bg-background/60 flex flex-wrap items-center gap-2 border-b px-3 py-2">
        <ToggleGroup
          type="single"
          value={theme}
          onValueChange={(value) => value && onThemeChange(value as "light" | "dark")}
          aria-label="Preview theme"
        >
          <ToggleGroupItem value="light">Light</ToggleGroupItem>
          <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          type="single"
          value={width}
          onValueChange={(value) =>
            value && onWidthChange(value as "desktop" | "tablet" | "mobile")
          }
          aria-label="Preview width"
        >
          <ToggleGroupItem value="desktop">Desktop</ToggleGroupItem>
          <ToggleGroupItem value="tablet">Tablet</ToggleGroupItem>
          <ToggleGroupItem value="mobile">Mobile</ToggleGroupItem>
        </ToggleGroup>

        <div className="text-muted-foreground ml-auto flex items-center gap-3 text-[11px] tabular-nums">
          <span>{stats.words} words</span>
          <span aria-hidden="true">·</span>
          <span>{stats.readingMinutes} min read</span>
          <Button variant="ghost" size="xs" asChild>
            <a
              href={`https://github.com/${repo.fullName}`}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink aria-hidden="true" className="size-3" />
              Open repo
            </a>
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-safe">
        <div className="mx-auto w-full max-w-3xl">
          <div className="border-border bg-background mb-3 flex items-center gap-2 rounded-lg border px-3 py-2">
            <span className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
              <Maximize2 aria-hidden="true" className="size-3" />
              {width === "desktop"
                ? "Desktop width"
                : width === "tablet"
                  ? "Tablet width"
                  : "Mobile width"}
            </span>
            <span className="text-muted-foreground ml-auto truncate text-[11px]">
              {repo.fullName} / README.md
            </span>
          </div>

          <MarkdownPreview markdown={markdown} theme={theme} width={width} />
        </div>
      </div>

      {onJumpToSection ? (
        <OutlineStrip markdown={markdown} onJump={onJumpToSection} />
      ) : null}
    </section>
  );
}
