"use client";

import { useState } from "react";
import { History, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/controls";
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
import { Separator } from "@/components/ui/primitives";
import type { VersionEntry } from "@/lib/types";

export function VersionsPanel({
  versions,
  onSave,
  onRevert,
}: {
  versions: VersionEntry[];
  onSave: () => void;
  onRevert: (id: string) => void;
}) {
  const [pendingRevert, setPendingRevert] = useState<VersionEntry | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <History aria-hidden="true" className="size-3.5" />
            Versions
            <span className="text-muted-foreground tabular-nums">
              {versions.length}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-0">
          <div className="flex items-center justify-between gap-2 p-3">
            <div>
              <p className="text-[13px] font-medium">Version history</p>
              <p className="text-muted-foreground text-xs">
                Snapshots from this session
              </p>
            </div>
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                onSave();
                setOpen(false);
              }}
            >
              <Save aria-hidden="true" className="size-3" />
              Save
            </Button>
          </div>
          <Separator />
          <ul className="max-h-72 overflow-y-auto p-1.5">
            {versions.map((version, index) => (
              <li
                key={version.id}
                className="hover:bg-muted flex items-start gap-2.5 rounded-md p-2 transition-colors duration-150 ease-out"
              >
                <span
                  aria-hidden="true"
                  className="bg-border mt-1 size-1.5 shrink-0 rounded-full"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">
                    {version.label}
                  </p>
                  <p className="text-muted-foreground text-pretty text-xs">
                    {version.summary}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-[11px]">
                    {version.author} · {version.at}
                  </p>
                </div>
                {index === 0 ? (
                  <span className="text-muted-foreground shrink-0 text-[11px]">
                    latest
                  </span>
                ) : (
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    aria-label={`Revert to ${version.label}`}
                    onClick={() => {
                      setPendingRevert(version);
                      setOpen(false);
                    }}
                  >
                    <RotateCcw aria-hidden="true" className="size-3.5" />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>

      <AlertDialog
        open={pendingRevert !== null}
        onOpenChange={(next) => !next && setPendingRevert(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Revert to “{pendingRevert?.label}”?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your current section content and ordering will be replaced. A
              snapshot of the current state is saved first, so you can redo this.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingRevert) onRevert(pendingRevert.id);
                setPendingRevert(null);
              }}
            >
              Revert document
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
