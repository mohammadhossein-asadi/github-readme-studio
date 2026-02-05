import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Clock3,
  FileText,
  GitFork,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusDot } from "@/components/ui/primitives";
import { PageBody, PageHeader } from "@/components/page-header";
import { BarChart, Sparkline } from "@/components/charts";
import { ScoreBar } from "@/components/score-bar";
import { mockRepos } from "@/lib/mock/repos";
import { cortexFindings } from "@/lib/mock/repos";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Overview of your connected repositories, README quality scores and recent generation activity.",
  alternates: { canonical: "/dashboard" },
  robots: { index: false, follow: false },
};

const stats = [
  {
    label: "READMEs generated",
    value: "24",
    delta: "+6 this week",
    icon: FileText,
    tone: "text-chart-1",
  },
  {
    label: "Average quality",
    value: "86",
    suffix: "/100",
    delta: "+11 points",
    icon: TrendingUp,
    tone: "text-success",
  },
  {
    label: "Repositories connected",
    value: "6",
    delta: "3 need attention",
    icon: GitFork,
    tone: "text-chart-2",
  },
  {
    label: "Time saved",
    value: "12.4",
    suffix: "h",
    delta: "vs. writing by hand",
    icon: Clock3,
    tone: "text-chart-3",
  },
];

const activity = [
  { label: "Mon", value: 2 },
  { label: "Tue", value: 4 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 7 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 1 },
  { label: "Sun", value: 3 },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Track README quality across every connected repository and pick up where you left off."
        actions={
          <>
            <Button variant="outline" size="sm" asChild>
              <Link href="/repos">
                <GitFork aria-hidden="true" className="size-3.5" />
                My repositories
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/analyze">
                <Sparkles aria-hidden="true" className="size-3.5" />
                Analyze a repository
              </Link>
            </Button>
          </>
        }
      />

      <PageBody className="gap-5">
        <section
          aria-label="Key metrics"
          className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((stat) => (
            <Card key={stat.label} className="gap-3">
              <CardHeader>
                <CardDescription>{stat.label}</CardDescription>
                <CardAction>
                  <stat.icon aria-hidden="true" className={`size-4 ${stat.tone}`} />
                </CardAction>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-2xl font-semibold tabular-nums">
                  {stat.value}
                  {stat.suffix ? (
                    <span className="text-muted-foreground text-sm font-normal">
                      {stat.suffix}
                    </span>
                  ) : null}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">{stat.delta}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Continue where you left off</CardTitle>
              <CardDescription>
                acme/cortex has a draft README with 12 sections generated.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="border-border flex flex-wrap items-center gap-3 rounded-lg border p-3">
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: "#3178c6" }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">acme/cortex</p>
                  <p className="text-muted-foreground truncate text-xs">
                    Next.js 15 · TypeScript · Tailwind · Prisma
                  </p>
                </div>
                <Badge variant="warning">Draft</Badge>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/editor">
                    Resume editing
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border-border rounded-lg border p-3">
                  <p className="text-[13px] font-medium">Stars over 30 days</p>
                  <p className="text-muted-foreground mb-1 text-xs tabular-nums">
                    2,841 total · +184
                  </p>
                  <Sparkline
                    label="Repository stars over the last 30 days"
                    values={[
                      2610, 2640, 2628, 2680, 2712, 2705, 2748, 2779, 2761, 2810,
                      2830, 2812, 2841,
                    ]}
                  />
                </div>
                <div className="border-border rounded-lg border p-3">
                  <p className="text-[13px] font-medium">READMEs generated</p>
                  <p className="text-muted-foreground mb-1 text-xs">This week</p>
                  <BarChart
                    label="READMEs generated per day this week"
                    data={activity}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-5">
            <Card>
              <CardHeader>
                <CardTitle>Top gaps to fix</CardTitle>
                <CardDescription>
                  Highest-impact missing sections across your repositories.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5">
                <ul className="flex flex-col gap-2.5">
                  {cortexFindings
                    .filter((finding) => finding.status !== "present")
                    .slice(0, 4)
                    .map((finding) => (
                      <li key={finding.id} className="flex items-start gap-2.5">
                        <StatusDot
                          tone={finding.status === "missing" ? "danger" : "warning"}
                          className="mt-1.5"
                        />
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium">{finding.label}</p>
                          <p className="text-muted-foreground text-pretty text-xs">
                            {finding.advice}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
                <Button variant="outline" size="sm" className="mt-1 w-full" asChild>
                  <Link href="/editor">Fix all in the editor</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent activity</CardTitle>
                <CardDescription>Generations and publishes.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <ul className="flex flex-col gap-3">
                  {[
                    { repo: "acme/cortex", action: "Draft generated", at: "2h ago", tone: "info" as const },
                    { repo: "acme/orbit-cli", action: "Pull request opened", at: "yesterday", tone: "success" as const },
                    { repo: "acme/nebula-ui", action: "Committed to main", at: "5d ago", tone: "success" as const },
                  ].map((entry) => (
                    <li key={entry.repo + entry.action} className="flex items-center gap-2.5">
                      <StatusDot tone={entry.tone} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium">
                          {entry.repo}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {entry.action}
                        </p>
                      </div>
                      <span className="text-muted-foreground shrink-0 text-xs">
                        {entry.at}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>README health</CardTitle>
            <CardDescription>
              Quality is scored on completeness, accuracy and discoverability.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-border divide-y">
              {mockRepos.map((repo) => (
                <li
                  key={repo.id}
                  className="flex flex-wrap items-center gap-3 px-4 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[13px] font-medium">
                        {repo.fullName}
                      </p>
                      {repo.hasReadme ? (
                        <Badge variant="secondary">has README</Badge>
                      ) : (
                        <Badge variant="danger">none</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground truncate text-xs">
                      {repo.description}
                    </p>
                  </div>
                  <div className="w-full max-w-56 shrink-0">
                    <ScoreBar score={repo.readmeScore} />
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/editor?repo=${repo.id}`}>
                      Open
                      <ArrowRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-success/30 bg-success-muted/30">
          <CardContent className="flex flex-wrap items-center gap-3">
            <CircleCheck aria-hidden="true" className="text-success size-5" />
            <p className="text-pretty text-[13px]">
              <span className="font-medium">Tip:</span> connect a repository with
              no README at all — generation is fastest when there is nothing to
              preserve.
            </p>
            <Button variant="outline" size="sm" className="ml-auto" asChild>
              <Link href="/repos">Find one</Link>
            </Button>
          </CardContent>
        </Card>
      </PageBody>
    </>
  );
}
