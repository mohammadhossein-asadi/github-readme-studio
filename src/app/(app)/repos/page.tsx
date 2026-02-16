"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Check,
  GitFork,
  Globe,
  Lock,
  RefreshCw,
  Search,
  Sparkles,
  Star,
  TriangleAlert,
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
import { Input } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/controls";
import { EmptyState, StatusDot } from "@/components/ui/primitives";
import { PageBody, PageHeader } from "@/components/page-header";
import { ScoreBar } from "@/components/score-bar";
import { useWorkspace } from "@/components/app-shell/workspace-provider";
import { mockRepos } from "@/lib/mock/repos";
import { cn } from "@/lib/utils";

type VisibilityFilter = "all" | "public" | "private";
type SortKey = "stars" | "updated" | "name";

const sorts: { value: SortKey; label: string }[] = [
  { value: "stars", label: "Most stars" },
  { value: "updated", label: "Recently updated" },
  { value: "name", label: "Name" },
];

function RepoCardSkeleton() {
  return (
    <Card className="gap-4">
      <CardHeader>
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-2 h-3 w-full" />
        <Skeleton className="mt-1.5 h-3 w-2/3" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-1.5 w-full rounded-full" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReposPage() {
  const router = useRouter();
  const { repoId, setRepoId, queued, toggleQueued } = useWorkspace();
  const [query, setQuery] = useState("");
  const [visibility, setVisibility] = useState<VisibilityFilter>("all");
  const [sort, setSort] = useState<SortKey>("stars");
  const [loading, setLoading] = useState(true);

  // Simulated fetch so the loading skeleton is part of the real flow.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const repos = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return mockRepos
      .filter((entry) =>
        visibility === "all" ? true : entry.visibility === visibility,
      )
      .filter((entry) =>
        needle
          ? entry.fullName.toLowerCase().includes(needle) ||
            entry.language.toLowerCase().includes(needle) ||
            entry.topics.some((topic) => topic.includes(needle))
          : true,
      )
      .sort((a, b) => {
        if (sort === "stars") return b.stars - a.stars;
        if (sort === "name") return a.fullName.localeCompare(b.fullName);
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
  }, [query, visibility, sort]);

  const languages = useMemo(
    () => Array.from(new Set(mockRepos.map((entry) => entry.language))),
    [],
  );

  return (
    <>
      <PageHeader
        title="My repositories"
        description="Select one or more repositories to document. We only read metadata and file names — never your source code."
        actions={
          <>
            <Badge variant="success" className="h-8 gap-1.5 px-2.5">
              <StatusDot tone="success" />
              GitHub connected
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  toast.success("Repository list refreshed");
                }, 700);
              }}
            >
              <RefreshCw aria-hidden="true" className="size-3.5" />
              Refresh
            </Button>
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-56 flex-1">
            <Search
              aria-hidden="true"
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
            />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search repositories, languages or topics…"
              aria-label="Search repositories"
              className="pl-8"
            />
          </div>

          <ToggleGroup
            type="single"
            value={visibility}
            onValueChange={(value) =>
              value && setVisibility(value as VisibilityFilter)
            }
            aria-label="Filter by visibility"
          >
            {(["all", "public", "private"] as const).map((option) => (
              <ToggleGroupItem key={option} value={option} className="capitalize">
                {option}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <ToggleGroup
            type="single"
            value={sort}
            onValueChange={(value) => value && setSort(value as SortKey)}
            aria-label="Sort repositories"
          >
            {sorts.map((option) => (
              <ToggleGroupItem key={option.value} value={option.value}>
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <p className="text-muted-foreground text-xs" role="status">
          {loading
            ? "Loading repositories…"
            : `${repos.length} of ${mockRepos.length} repositories · ${queued.length} queued for analysis`}
        </p>
      </PageHeader>

      <PageBody className="gap-4">
        {queued.length > 0 && !loading ? (
          <div className="border-primary/30 bg-accent/60 flex flex-wrap items-center gap-3 rounded-lg border p-3">
            <Sparkles aria-hidden="true" className="text-primary size-4" />
            <p className="text-[13px]">
              <span className="font-medium">
                {queued.length}{" "}
                {queued.length === 1 ? "repository" : "repositories"}
              </span>{" "}
              queued for batch analysis.
            </p>
            <Button
              size="sm"
              className="ml-auto"
              onClick={() => router.push("/analyze")}
            >
              Run analysis pipeline
            </Button>
          </div>
        ) : null}

        {loading ? (
          <div
            aria-busy="true"
            aria-live="polite"
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            <span className="sr-only">Loading repositories</span>
            {Array.from({ length: 6 }).map((_, index) => (
              <RepoCardSkeleton key={index} />
            ))}
          </div>
        ) : repos.length === 0 ? (
          <EmptyState
            icon={<Search aria-hidden="true" />}
            title="No repositories match those filters"
            description="Try a different search term, or include private repositories in the filter."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setVisibility("all");
                }}
              >
                Clear filters
              </Button>
            }
          />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {repos.map((entry) => {
              const selected = queued.includes(entry.id);
              const current = entry.id === repoId;
              return (
                <li key={entry.id}>
                  <Card
                    className={cn(
                      "h-full gap-4 transition-[border-color,box-shadow] duration-150 ease-out",
                      selected && "border-primary/50 ring-primary/20 ring-1",
                    )}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {entry.visibility === "private" ? (
                          <Lock aria-hidden="true" className="text-muted-foreground size-3.5" />
                        ) : (
                          <Globe aria-hidden="true" className="text-muted-foreground size-3.5" />
                        )}
                        <span className="truncate">{entry.fullName}</span>
                        {current ? (
                          <Badge variant="default" className="ml-auto">
                            Editing
                          </Badge>
                        ) : null}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {entry.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col gap-3">
                      <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                        <span className="flex items-center gap-1.5">
                          <span
                            aria-hidden="true"
                            className="size-2 rounded-full"
                            style={{ backgroundColor: entry.languageColor }}
                          />
                          {entry.language}
                        </span>
                        <span className="flex items-center gap-1 tabular-nums">
                          <Star aria-hidden="true" className="size-3" />
                          {entry.stars.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1 tabular-nums">
                          <GitFork aria-hidden="true" className="size-3" />
                          {entry.forks}
                        </span>
                        <span>· updated {entry.updatedLabel}</span>
                      </div>

                      <div className="space-y-1.5">
                        <p className="text-muted-foreground text-xs">
                          README quality
                        </p>
                        <ScoreBar score={entry.readmeScore} />
                      </div>

                      <ul className="flex flex-wrap gap-1.5">
                        {entry.topics.slice(0, 3).map((topic) => (
                          <li key={topic}>
                            <Badge variant="outline">{topic}</Badge>
                          </li>
                        ))}
                        {entry.topics.length > 3 ? (
                          <li>
                            <Badge variant="secondary">
                              +{entry.topics.length - 3}
                            </Badge>
                          </li>
                        ) : null}
                      </ul>

                      {!entry.hasReadme ? (
                        <p className="text-warning flex items-center gap-1.5 text-xs">
                          <TriangleAlert aria-hidden="true" className="size-3.5" />
                          No README found — we will create one from scratch.
                        </p>
                      ) : null}

                      <div className="mt-auto flex items-center gap-2 pt-1">
                        <Button
                          variant={selected ? "default" : "outline"}
                          size="sm"
                          aria-pressed={selected}
                          onClick={() => toggleQueued(entry.id)}
                          className="flex-1"
                        >
                          {selected ? (
                            <Check aria-hidden="true" className="size-3.5" />
                          ) : null}
                          {selected ? "Queued" : "Select"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setRepoId(entry.id)}
                          disabled={current}
                        >
                          {current ? "Current" : "Set active"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}

        <p className="text-muted-foreground text-pretty text-xs">
          Detected languages:{" "}
          {languages.map((language, index) => (
            <span key={language}>
              {index > 0 ? ", " : ""}
              <span className="text-foreground font-medium">{language}</span>
            </span>
          ))}
          .{" "}
          <Link href="/settings" className="text-primary underline underline-offset-2">
            Manage GitHub access
          </Link>
        </p>
      </PageBody>
    </>
  );
}
