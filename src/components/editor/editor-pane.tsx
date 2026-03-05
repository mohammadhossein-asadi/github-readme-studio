"use client";

import { Reorder } from "motion/react";
import { Layers, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/primitives";
import { MarkdownCodeEditor } from "@/components/editor/markdown-code-editor";
import { ReorderHint, SectionCard } from "@/components/editor/section-card";
import type { Section } from "@/lib/types";
import { cn } from "@/lib/utils";

export function EditorPane({
  sections,
  mode,
  markdown,
  activeId,
  scope,
  onModeChange,
  onRawChange,
  onReorder,
  onPatch,
  onMove,
  onDelete,
  onAddFirstSection,
  className,
}: {
  sections: Section[];
  mode: "sections" | "markdown";
  markdown: string;
  activeId: string | null;
  /** Namespaces ids; the desktop and mobile panes are mounted together. */
  scope: "desktop" | "mobile";
  onModeChange: (mode: "sections" | "markdown") => void;
  onRawChange: (value: string) => void;
  onReorder: (next: Section[]) => void;
  onPatch: (id: string, patch: Partial<Section>) => void;
  onMove: (id: string, direction: -1 | 1) => void;
  onDelete: (id: string) => void;
  onAddFirstSection: () => void;
  className?: string;
}) {
  return (
    <section
      aria-label="README source"
      className={cn("flex h-full min-h-0 flex-col", className)}
    >
      <Tabs
        value={mode}
        onValueChange={(value) => onModeChange(value as "sections" | "markdown")}
        className="flex h-full min-h-0 flex-col"
      >
        <div className="border-border flex items-center gap-2 border-b px-3 py-2">
          <TabsList aria-label="Editor mode">
            <TabsTrigger value="sections">
              <Layers aria-hidden="true" />
              Sections
            </TabsTrigger>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
          </TabsList>
          <span className="text-muted-foreground ml-auto text-[11px] tabular-nums">
            {sections.filter((section) => section.enabled).length} of{" "}
            {sections.length} included
          </span>
        </div>

        <TabsContent
          value="sections"
          className="min-h-0 flex-1 overflow-y-auto p-3 pb-safe"
        >
          {sections.length === 0 ? (
            <EmptyState
              icon={<Layers aria-hidden="true" />}
              title="No sections yet"
              description="Start from a professional section structure, then edit each block inline."
              action={
                <Button size="sm" onClick={onAddFirstSection}>
                  <Plus aria-hidden="true" className="size-3.5" />
                  Add the first section
                </Button>
              }
            />
          ) : (
            <div className="flex flex-col gap-3">
              <ReorderHint />
              <Reorder.Group
                axis="y"
                values={sections}
                onReorder={onReorder}
                layoutScroll
                className="flex list-none flex-col gap-2"
              >
                {sections.map((section, index) => (
                  <SectionCard
                    key={section.id}
                    section={section}
                    index={index}
                    total={sections.length}
                    active={section.id === activeId}
                    scope={scope}
                    onPatch={(patch) => onPatch(section.id, patch)}
                    onMove={(direction) => onMove(section.id, direction)}
                    onDelete={() => onDelete(section.id)}
                  />
                ))}
              </Reorder.Group>
            </div>
          )}
        </TabsContent>

        <TabsContent value="markdown" className="min-h-0 flex-1">
          <div className="flex h-full min-h-0 flex-col">
            <p className="border-border text-muted-foreground border-b px-3 py-2 text-[11px]">
              Raw GitHub-flavoured Markdown. Switching back to{" "}
              <span className="text-foreground font-medium">Sections</span>{" "}
              re-parses this document.
            </p>
            <div className="min-h-0 flex-1">
              <MarkdownCodeEditor value={markdown} onChange={onRawChange} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
