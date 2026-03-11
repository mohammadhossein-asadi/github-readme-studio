"use client";

import { useState } from "react";
import { Reorder, useDragControls, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowUp,
  ChevronRight,
  GripVertical,
  Loader2,
  Lock,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label, Textarea } from "@/components/ui/field";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, Switch } from "@/components/ui/controls";
import { Kbd } from "@/components/ui/primitives";
import { REWRITE_LATENCY, rewrite, rewriteActions } from "@/lib/ai";
import type { Section } from "@/lib/types";
import { cn } from "@/lib/utils";

const KIND_LABELS: Partial<Record<Section["kind"], string>> = {
  hero: "Title",
  badges: "Badges",
  "tech-stack": "Stack",
  api: "API",
  "custom": "Custom",
};

export function SectionCard({
  section,
  index,
  total,
  active,
  scope,
  onPatch,
  onMove,
  onDelete,
}: {
  section: Section;
  index: number;
  total: number;
  active: boolean;
  /** Namespaces element ids so the desktop and mobile panes never collide. */
  scope: string;
  onPatch: (patch: Partial<Section>) => void;
  onMove: (direction: -1 | 1) => void;
  onDelete: () => void;
}) {
  const titleId = `${scope}-title-${section.id}`;
  const contentId = `${scope}-content-${section.id}`;
  const dragControls = useDragControls();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [busyAction, setBusyAction] = useState<string | null>(null);

  async function runRewrite(action: (typeof rewriteActions)[number]) {
    setBusyAction(action.id);
    await new Promise((resolve) => setTimeout(resolve, REWRITE_LATENCY));
    onPatch({ content: rewrite(section.content, action.id) });
    setBusyAction(null);
    toast.success(`Section updated: ${action.label.toLowerCase()}`, {
      description: "Rewrites are simulated in the prototype.",
    });
  }

  const charCount = section.content.length;

  return (
    <>
      <Reorder.Item
        value={section}
        dragListener={false}
        dragControls={dragControls}
        id={`${scope}-${section.id}`}
        data-section-id={section.id}
        className={cn(
          "bg-card border-border group relative rounded-lg border",
          "transition-[border-color,box-shadow] duration-150 ease-out",
          !section.enabled && "opacity-60",
          active && "border-primary/60 ring-primary/20 ring-1",
        )}
      >
        <div className="flex items-center gap-1.5 p-2">
          <button
            type="button"
            aria-label={`Reorder ${section.title}. Press the up and down arrow keys to move it.`}
            onPointerDown={(event) => dragControls.start(event)}
            className="text-muted-foreground hover:bg-muted hover:text-foreground cursor-grab touch-none rounded p-1 active:cursor-grabbing"
          >
            <GripVertical aria-hidden="true" className="size-4" />
          </button>

          <Switch
            checked={section.enabled}
            onCheckedChange={(checked) => onPatch({ enabled: checked })}
            aria-label={`Include ${section.title} in the README`}
          />

          <Collapsible open={open} onOpenChange={setOpen} className="min-w-0 flex-1">
            <CollapsibleTrigger className="flex w-full min-w-0 items-center gap-2 rounded-md px-1 py-1 text-left focus-visible:ring-ring/40 focus-visible:ring-[3px] focus-visible:outline-none">
              <ChevronRight
                aria-hidden="true"
                className={cn(
                  "text-muted-foreground size-3.5 shrink-0 transition-transform duration-150 ease-out",
                  open && "rotate-90",
                )}
              />
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                {section.title}
              </span>
              {section.locked ? (
                <Lock aria-hidden="true" className="text-muted-foreground size-3" />
              ) : null}
              {KIND_LABELS[section.kind] ? (
                <Badge variant="secondary">{KIND_LABELS[section.kind]}</Badge>
              ) : null}
              <span className="text-muted-foreground hidden shrink-0 text-[11px] tabular-nums sm:inline">
                {charCount}
              </span>
            </CollapsibleTrigger>

            <CollapsibleContent className="overflow-hidden">
              <div className="flex flex-col gap-3 px-1 pt-3 pb-1">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={titleId}>Heading</Label>
                  <Textarea
                    id={titleId}
                    value={section.title}
                    rows={1}
                    onChange={(event) => onPatch({ title: event.target.value })}
                    className="min-h-0 py-1.5 text-[13px] font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor={contentId}>Markdown body</Label>
                    <span className="text-muted-foreground text-[11px] tabular-nums">
                      {charCount} chars
                    </span>
                  </div>
                  <Textarea
                    id={contentId}
                    value={section.content}
                    onChange={(event) => onPatch({ content: event.target.value })}
                    rows={8}
                    spellCheck
                    className="min-h-40 font-mono text-xs leading-relaxed"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={busyAction !== null}
                      >
                        {busyAction ? (
                          <Loader2 aria-hidden="true" className="animate-spin" />
                        ) : (
                          <Sparkles aria-hidden="true" />
                        )}
                        Improve with AI
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-64">
                      <DropdownMenuLabel>Rewrite this section</DropdownMenuLabel>
                      {rewriteActions.map((action) => (
                        <DropdownMenuItem
                          key={action.id}
                          onSelect={() => void runRewrite(action)}
                        >
                          <Wand2 aria-hidden="true" />
                          <span className="flex flex-col gap-0.5">
                            <span>{action.label}</span>
                            <span className="text-muted-foreground text-xs">
                              {action.description}
                            </span>
                          </span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="ml-auto flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => onMove(-1)}
                      disabled={index === 0 || section.locked}
                      aria-label={`Move ${section.title} up`}
                    >
                      <ArrowUp aria-hidden="true" className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => onMove(1)}
                      disabled={index === total - 1}
                      aria-label={`Move ${section.title} down`}
                    >
                      <ArrowDown aria-hidden="true" className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => setConfirmOpen(true)}
                      disabled={section.locked}
                      aria-label={`Delete ${section.title}`}
                    >
                      <Trash2 aria-hidden="true" className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <AnimatePresence initial={false}>
          {active ? (
            <span
              aria-hidden="true"
              className="bg-primary absolute inset-y-2 -left-px w-0.5 rounded-full"
            />
          ) : null}
        </AnimatePresence>
      </Reorder.Item>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{section.title}”?</AlertDialogTitle>
            <AlertDialogDescription>
              The section and its content are removed from this draft. You can
              restore it from version history, or re-add it from the section
              library.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep section</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setConfirmOpen(false);
                onDelete();
              }}
            >
              Delete section
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function ReorderHint() {
  return (
    <p className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-[11px]">
      Drag <GripVertical aria-hidden="true" className="inline size-3" /> to
      reorder, or use <Kbd>↑</Kbd>
      <Kbd>↓</Kbd> on the section actions.
    </p>
  );
}
