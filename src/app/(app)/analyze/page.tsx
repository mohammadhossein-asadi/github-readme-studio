"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Loader2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress, StatusDot } from "@/components/ui/primitives";
import { Switch } from "@/components/ui/controls";
import { PageBody, PageHeader } from "@/components/page-header";
import { ScoreBar } from "@/components/score-bar";
import { StackByCategory, TechChips } from "@/components/tech-stack";
import { useWorkspace } from "@/components/app-shell/workspace-provider";
import {
  analysisStages,
  cortexFeatures,
  cortexFindings,
  cortexStack,
} from "@/lib/mock/repos";
import type { AnalysisStageId } from "@/lib/types";
import { cn } from "@/lib/utils";

type StageState = "pending" | "active" | "done" | "failed";

const FAILING_STAGE: AnalysisStageId = "artifacts";

export default function AnalyzePage() {
  const router = useRouter();
  const { repo } = useWorkspace();
  const [states, setStates] = useState<Record<AnalysisStageId, StageState>>(
    () =>
      Object.fromEntries(
        analysisStages.map((stage) => [stage.id, "pending"]),
      ) as Record<AnalysisStageId, StageState>,
  );
  const [runId, setRunId] = useState(0);
  const [running, setRunning] = useState(true);
  const [injectFailure, setInjectFailure] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const advance = () => {
      if (cancelled) return;
      if (index >= analysisStages.length) {
        setRunning(false);
        return;
      }
      const stage = analysisStages[index];
      setStates((current) => ({ ...current, [stage.id]: "active" }));

      timer = setTimeout(() => {
        if (cancelled) return;
        if (injectFailure && stage.id === FAILING_STAGE) {
          setStates((current) => ({ ...current, [stage.id]: "failed" }));
          setRunning(false);
          return;
        }
        setStates((current) => ({ ...current, [stage.id]: "done" }));
        index += 1;
        advance();
      }, stage.duration);
    };

    // Everything is scheduled inside timers: the effect body itself never sets
    // state, which keeps re-runs and StrictMode double-invocation predictable.
    timer = setTimeout(() => {
      setStates(
        Object.fromEntries(
          analysisStages.map((stage) => [stage.id, "pending"]),
        ) as Record<AnalysisStageId, StageState>,
      );
      setRunning(true);
      index = 0;
      timer = setTimeout(advance, 120);
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [runId, injectFailure]);

  const recompute = useCallback(() => setRunId((value) => value + 1), []);

  const doneCount = useMemo(
    () => Object.values(states).filter((state) => state === "done").length,
    [states],
  );
  const failed = Object.values(states).some((state) => state === "failed");
  const progress = Math.round((doneCount / analysisStages.length) * 100);
  const complete = !running && !failed && doneCount === analysisStages.length;

  const stackReady = states.stack === "done";
  const featuresReady = states.features === "done";
  const artifactsReady = states.artifacts === "done";

  return (
    <>
      <PageHeader
        title="Analyzing repository"
        description={`Reading ${repo.fullName} to detect the tech stack, capabilities and documentation gaps.`}
        actions={
          <>
            <div className="flex items-center gap-2">
              <Switch
                id="inject-failure"
                checked={injectFailure}
                onCheckedChange={setInjectFailure}
              />
              <label htmlFor="inject-failure" className="text-xs">
                Simulate a stage failure
              </label>
            </div>
            <Button variant="outline" size="sm" onClick={recompute}>
              <RotateCcw aria-hidden="true" className="size-3.5" />
              Re-run
            </Button>
            <Button
              size="sm"
              disabled={!complete}
              onClick={() => router.push("/editor")}
            >
              <Sparkles aria-hidden="true" className="size-3.5" />
              Open editor
            </Button>
          </>
        }
      >
        <div className="flex items-center gap-3">
          <Progress
            value={progress}
            className="max-w-md"
            aria-label="Analysis progress"
          />
          <span className="text-muted-foreground text-xs tabular-nums">
            {progress}%
          </span>
          <span aria-live="polite" className="sr-only">
            {complete
              ? "Analysis complete"
              : failed
                ? "Analysis stopped because a stage failed"
                : `${progress}% complete`}
          </span>
        </div>
      </PageHeader>

      <PageBody>
        <div className="grid gap-5 lg:grid-cols-[22rem_1fr]">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Pipeline</CardTitle>
              <CardDescription>
                {analysisStages.length} stages · runs on a read-only clone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="flex flex-col">
                {analysisStages.map((stage, index) => {
                  const state = states[stage.id];
                  const isLast = index === analysisStages.length - 1;
                  return (
                    <li key={stage.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className={cn(
                            "flex size-6 shrink-0 items-center justify-center rounded-full border",
                            state === "done" &&
                              "bg-success border-success text-background",
                            state === "active" &&
                              "border-primary text-primary",
                            state === "failed" &&
                              "bg-destructive border-destructive text-destructive-foreground",
                            state === "pending" &&
                              "border-border text-muted-foreground",
                          )}
                        >
                          {state === "done" ? (
                            <Check aria-hidden="true" className="size-3.5" />
                          ) : state === "active" ? (
                            <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
                          ) : state === "failed" ? (
                            <CircleAlert aria-hidden="true" className="size-3.5" />
                          ) : (
                            <span className="text-[10px] tabular-nums">
                              {index + 1}
                            </span>
                          )}
                        </span>
                        {!isLast ? (
                          <span
                            aria-hidden="true"
                            className={cn(
                              "my-1 w-px flex-1",
                              state === "done" ? "bg-success/50" : "bg-border",
                            )}
                          />
                        ) : null}
                      </div>

                      <div className={cn("min-w-0 flex-1 pb-5", isLast && "pb-0")}>
                        <p className="text-[13px] font-medium">
                          {stage.label}
                        </p>
                        <p className="text-muted-foreground text-pretty text-xs">
                          {state === "failed"
                            ? "Could not read workflow files — check repository permissions."
                            : state === "active"
                              ? stage.detail
                              : state === "done"
                                ? stage.result
                                : "Waiting"}
                        </p>
                        {state === "failed" ? (
                          <div className="mt-2 flex items-center gap-2">
                            <Button size="xs" variant="outline" onClick={recompute}>
                              Retry stage
                            </Button>
                            <Button
                              size="xs"
                              variant="ghost"
                              onClick={() => {
                                setInjectFailure(false);
                                recompute();
                              }}
                            >
                              Skip
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-5">
            {stackReady ? (
              <Card className="animate-in fade-in-0 slide-in-from-bottom-1 duration-200 ease-out">
                <CardHeader>
                  <CardTitle>Detected stack</CardTitle>
                  <CardDescription>
                    Next.js 15 + TypeScript + Tailwind + Prisma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StackByCategory items={cortexStack} />
                </CardContent>
              </Card>
            ) : null}

            {featuresReady ? (
              <Card className="animate-in fade-in-0 slide-in-from-bottom-1 duration-200 ease-out">
                <CardHeader>
                  <CardTitle>Detected capabilities</CardTitle>
                  <CardDescription>
                    Classified from routes, manifests and workflows.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <TechChips
                    items={cortexFeatures.map((feature) => ({
                      id: feature.id,
                      name: feature.label,
                      slug: "github",
                      category: "Tooling",
                      note: feature.description,
                    }))}
                  />
                  <ul className="divide-border divide-y">
                    {cortexFeatures.slice(0, 5).map((feature) => (
                      <li
                        key={feature.id}
                        className="flex items-start gap-2.5 py-2.5 first:pt-0 last:pb-0"
                      >
                        <StatusDot
                          tone={
                            feature.confidence === "high"
                              ? "success"
                              : feature.confidence === "medium"
                                ? "warning"
                                : "neutral"
                          }
                          className="mt-1.5"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-medium">
                            {feature.label}
                          </p>
                          <p className="text-muted-foreground text-pretty text-xs">
                            {feature.description}
                          </p>
                        </div>
                        <Badge
                          variant={
                            feature.confidence === "high"
                              ? "success"
                              : feature.confidence === "medium"
                                ? "warning"
                                : "secondary"
                          }
                        >
                          {feature.confidence}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}

            {artifactsReady ? (
              <Card className="animate-in fade-in-0 slide-in-from-bottom-1 duration-200 ease-out">
                <CardHeader>
                  <CardTitle>Existing README analysis</CardTitle>
                  <CardDescription>
                    Current quality score and the sections worth adding.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <ScoreBar score={repo.readmeScore} />
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {cortexFindings.map((finding) => (
                      <li
                        key={finding.id}
                        className="border-border flex items-start gap-2.5 rounded-lg border p-3"
                      >
                        <StatusDot
                          tone={
                            finding.status === "missing"
                              ? "danger"
                              : finding.status === "outdated"
                                ? "warning"
                                : "success"
                          }
                          className="mt-1.5"
                        />
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium">
                            {finding.label}
                          </p>
                          <p className="text-muted-foreground text-pretty text-xs">
                            {finding.advice}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}

            {!stackReady ? (
              <Card className="border-dashed">
                <CardContent className="text-muted-foreground flex items-center gap-3 text-[13px]">
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                  Detected stack, capabilities and README analysis will appear here
                  as each stage completes.
                </CardContent>
              </Card>
            ) : null}

            {complete ? (
              <Card className="border-primary/30 bg-accent/50 animate-in fade-in-0 duration-200 ease-out">
                <CardContent className="flex flex-wrap items-center gap-3">
                  <Sparkles aria-hidden="true" className="text-primary size-5" />
                  <p className="text-pretty text-[13px]">
                    <span className="font-medium">12 sections drafted.</span>{" "}
                    Review and refine them in the editor before publishing.
                  </p>
                  <Button
                    size="sm"
                    className="ml-auto"
                    onClick={() => router.push("/editor")}
                  >
                    Open editor
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Button>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </PageBody>
    </>
  );
}
