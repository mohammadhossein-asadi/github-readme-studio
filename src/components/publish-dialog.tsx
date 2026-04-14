"use client";

import { useState } from "react";
import {
  Check,
  GitBranch,
  GitPullRequest,
  Loader2,
  Lock,
  TriangleAlert,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label, Textarea } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/controls";
import { Separator, StatusDot } from "@/components/ui/primitives";
import type { Repo } from "@/lib/types";

type PublishMode = "pull-request" | "direct";
type Stage = "idle" | "publishing" | "done";

export function PublishDialog({
  repo,
  markdown,
  open,
  onOpenChange,
}: {
  repo: Repo;
  markdown: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const branchOptions = [repo.defaultBranch, "develop", "docs/readme-studio"];
  const [branch, setBranch] = useState(repo.defaultBranch);
  const [mode, setMode] = useState<PublishMode>("pull-request");
  const [message, setMessage] = useState(
    "docs: rewrite README with generated sections",
  );
  const [stage, setStage] = useState<Stage>("idle");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const targetsDefaultBranch = branch === repo.defaultBranch;
  const canWrite = repo.visibility === "private";
  const needsConfirmation = mode === "direct" && targetsDefaultBranch;

  async function publish() {
    setStage("publishing");
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setStage("done");
    toast.success(
      mode === "direct"
        ? `Pushed to ${repo.fullName} (${branch})`
        : `Pull request opened on ${repo.fullName}`,
      {
        description:
          mode === "direct"
            ? "Committed README.md directly."
            : `Compare ${branch} → ${repo.defaultBranch} and review before merging.`,
      },
    );
  }

  function handlePrimaryAction() {
    if (needsConfirmation) {
      setConfirmOpen(true);
      return;
    }
    void publish();
  }

  const lines = markdown.split("\n").length;
  const bytes = new Blob([markdown]).size;

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(next) => {
          onOpenChange(next);
          if (!next) setStage("idle");
        }}
      >
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Publish README.md</DialogTitle>
            <DialogDescription>
              Update <span className="text-foreground font-medium">{repo.fullName}</span>{" "}
              with the generated README. Nothing is written until you confirm.
            </DialogDescription>
          </DialogHeader>

          {stage === "done" ? (
            <div className="border-success/30 bg-success-muted/50 flex flex-col gap-3 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <span className="bg-success text-background inline-flex size-5 items-center justify-center rounded-full">
                  <Check aria-hidden="true" className="size-3.5" />
                </span>
                <p className="text-[13px] font-medium">
                  {mode === "direct"
                    ? "README.md committed"
                    : `Pull request #482 opened`}
                </p>
              </div>
              <div className="text-muted-foreground grid gap-1 text-xs">
                <p>
                  <span className="text-foreground font-medium">Branch:</span>{" "}
                  {branch} → {repo.defaultBranch}
                </p>
                <p>
                  <span className="text-foreground font-medium">Message:</span>{" "}
                  {message}
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://github.com/${repo.fullName}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </a>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="publish-branch">Target branch</Label>
                <ToggleGroup
                  type="single"
                  value={branch}
                  onValueChange={(value) => value && setBranch(value)}
                  aria-label="Target branch"
                  className="w-full flex-wrap"
                >
                  {branchOptions.map((option) => (
                    <ToggleGroupItem key={option} value={option} className="flex-1">
                      <GitBranch aria-hidden="true" />
                      <span className="truncate">{option}</span>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                {repo.visibility === "public" ? (
                  <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <Lock aria-hidden="true" className="size-3" />
                    Public repository — branch protection likely requires a pull
                    request.
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="publish-message">Commit message</Label>
                <Textarea
                  id="publish-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={2}
                  className="min-h-0"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span id="publish-mode-label" className="text-[13px] font-medium">
                  How should we publish?
                </span>
                <ToggleGroup
                  type="single"
                  value={mode}
                  onValueChange={(value) => value && setMode(value as PublishMode)}
                  aria-labelledby="publish-mode-label"
                  className="w-full"
                >
                  <ToggleGroupItem value="pull-request" className="flex-1">
                    <GitPullRequest aria-hidden="true" />
                    Pull request
                  </ToggleGroupItem>
                  <ToggleGroupItem value="direct" className="flex-1">
                    <Upload aria-hidden="true" />
                    Direct commit
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {needsConfirmation ? (
                <div className="border-warning/40 bg-warning-muted/50 flex gap-2.5 rounded-lg border p-3">
                  <TriangleAlert
                    aria-hidden="true"
                    className="text-warning mt-0.5 size-4 shrink-0"
                  />
                  <div className="text-xs">
                    <p className="text-[13px] font-medium">
                      You are committing straight to {repo.defaultBranch}
                    </p>
                    <p className="text-muted-foreground text-pretty">
                      The existing README.md will be overwritten with no review
                      step. We will ask you to confirm.
                    </p>
                  </div>
                </div>
              ) : null}

              <Separator />

              <dl className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                <div>
                  <dt className="text-muted-foreground">File</dt>
                  <dd className="mt-0.5 font-medium">README.md</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Lines</dt>
                  <dd className="mt-0.5 font-medium tabular-nums">{lines}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Size</dt>
                  <dd className="mt-0.5 font-medium tabular-nums">
                    {(bytes / 1024).toFixed(1)} KB
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Permissions</dt>
                  <dd className="mt-0.5 flex items-center gap-1.5 font-medium">
                    <StatusDot tone={canWrite ? "success" : "warning"} />
                    {canWrite ? "Write" : "Read"}
                  </dd>
                </div>
              </dl>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={stage === "publishing"}
            >
              {stage === "done" ? "Close" : "Cancel"}
            </Button>
            {stage === "done" ? (
              <Badge variant="success" className="h-9 px-3">
                Published
              </Badge>
            ) : (
              <Button onClick={handlePrimaryAction} disabled={stage === "publishing"}>
                {stage === "publishing" ? (
                  <Loader2 aria-hidden="true" className="animate-spin" />
                ) : mode === "direct" ? (
                  <Upload aria-hidden="true" />
                ) : (
                  <GitPullRequest aria-hidden="true" />
                )}
                {stage === "publishing"
                  ? "Publishing…"
                  : mode === "direct"
                    ? "Commit README.md"
                    : "Open pull request"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Overwrite README.md on {repo.defaultBranch}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This replaces the file immediately with no review step. The commit
              cannot be undone from README Studio, and branch protection rules
              may reject it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setConfirmOpen(false);
                void publish();
              }}
            >
              Yes, commit directly
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
