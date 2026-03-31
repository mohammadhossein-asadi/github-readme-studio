"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/controls";
import { Separator } from "@/components/ui/primitives";
import { badgeCategories, badgeTemplates } from "@/lib/mock/badges";
import type { Repo } from "@/lib/types";

export function BadgesDialog({
  repo,
  open,
  onOpenChange,
  selected,
  onSelectedChange,
  onApply,
}: {
  repo: Repo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: string[];
  onSelectedChange: (next: string[]) => void;
  onApply: (markdown: string) => void;
}) {
  const [preview, setPreview] = useState(true);

  const badgeMarkdown = useMemo(
    () =>
      badgeTemplates
        .filter((badge) => selected.includes(badge.id))
        .map((badge) => badge.markdown(repo))
        .join("\n"),
    [repo, selected],
  );

  const selectedBadges = badgeTemplates.filter((badge) =>
    selected.includes(badge.id),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Badge library</DialogTitle>
          <DialogDescription>
            Shields.io badges are generated from {repo.fullName}. Toggle a badge
            to add it to the top of the README.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="badge-preview">Live preview</Label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs">
                {selected.length} selected
              </span>
              <Switch
                id="badge-preview"
                checked={preview}
                onCheckedChange={setPreview}
              />
            </div>
          </div>

          {preview ? (
            <div className="border-border bg-subtle flex min-h-16 flex-wrap items-center justify-center gap-1.5 rounded-lg border p-4">
              {selectedBadges.length === 0 ? (
                <p className="text-muted-foreground text-xs">
                  Select a badge to preview it here.
                </p>
              ) : (
                selectedBadges.map((badge) => (
                  <BadgePreview
                    key={badge.id}
                    markdown={badge.markdown(repo)}
                    label={badge.label}
                  />
                ))
              )}
            </div>
          ) : null}

          <Separator />

          <div className="flex max-h-80 flex-col gap-4 overflow-y-auto pr-1">
            {badgeCategories.map((category) => (
              <fieldset key={category} className="flex flex-col gap-2">
                <legend className="text-muted-foreground mb-1 text-[11px] font-medium">
                  {category}
                </legend>
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {badgeTemplates
                    .filter((badge) => badge.category === category)
                    .map((badge) => {
                      const active = selected.includes(badge.id);
                      return (
                        <button
                          key={badge.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() =>
                            onSelectedChange(
                              active
                                ? selected.filter((id) => id !== badge.id)
                                : [...selected, badge.id],
                            )
                          }
                          className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left text-[13px] transition-colors duration-150 ease-out ${
                            active
                              ? "border-primary/50 bg-accent/60"
                              : "border-border hover:bg-muted"
                          }`}
                        >
                          {active ? (
                            <BadgeCheck
                              aria-hidden="true"
                              className="text-primary size-4 shrink-0"
                            />
                          ) : (
                            <Plus
                              aria-hidden="true"
                              className="text-muted-foreground size-4 shrink-0"
                            />
                          )}
                          <span className="truncate">{badge.label}</span>
                          <Badge variant="secondary" className="ml-auto">
                            {badge.category}
                          </Badge>
                        </button>
                      );
                    })}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onApply(badgeMarkdown);
              onOpenChange(false);
            }}
            disabled={selected.length === 0}
          >
            Insert {selected.length} badge{selected.length === 1 ? "" : "s"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BadgePreview({ markdown, label }: { markdown: string; label: string }) {
  const match = /\((.*?)\)/.exec(markdown);
  const src = match?.[1];
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={label} height={20} className="h-5" loading="lazy" />
  );
}
