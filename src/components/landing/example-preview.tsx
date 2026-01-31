"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { MarkdownPreview } from "@/components/markdown-preview";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/controls";
import { Skeleton } from "@/components/ui/skeleton";
import { useMounted } from "@/lib/use-mounted";
import { cortexSections } from "@/lib/mock/sections";
import { sectionsToMarkdown } from "@/lib/markdown";

const EXAMPLE_MARKDOWN = sectionsToMarkdown(
  cortexSections.filter((section) =>
    ["sec_hero", "sec_badges", "sec_desc", "sec_features", "sec_stack"].includes(
      section.id,
    ),
  ),
);

export function ExamplePreview() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [touched, setTouched] = useState(false);

  // Follow the app theme until the visitor picks a preview theme explicitly.
  const effective = touched
    ? theme
    : resolvedTheme === "light"
      ? "light"
      : "dark";

  return (
    <div className="border-border bg-card overflow-hidden rounded-xl border shadow-sm">
      <div className="border-border flex flex-wrap items-center gap-2 border-b px-3 py-2">
        <span aria-hidden="true" className="flex items-center gap-1.5">
          <span className="bg-border size-2.5 rounded-full" />
          <span className="bg-border size-2.5 rounded-full" />
          <span className="bg-border size-2.5 rounded-full" />
        </span>
        <span className="text-muted-foreground ml-2 font-mono text-[11px]">
          acme/cortex · README.md
        </span>

        <div className="ml-auto">
          {mounted ? (
            <ToggleGroup
              type="single"
              value={effective}
              onValueChange={(value) => {
                if (!value) return;
                setTouched(true);
                setTheme(value as "light" | "dark");
              }}
              aria-label="Preview colour scheme"
            >
              <ToggleGroupItem value="light">Light</ToggleGroupItem>
              <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
            </ToggleGroup>
          ) : (
            <Skeleton className="h-8 w-40 rounded-lg" />
          )}
        </div>
      </div>

      <div className="max-h-[32rem] overflow-y-auto p-3">
        <MarkdownPreview
          markdown={EXAMPLE_MARKDOWN}
          theme={effective}
          width="desktop"
        />
      </div>
    </div>
  );
}
