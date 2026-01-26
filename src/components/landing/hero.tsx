import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookTemplate,
  Layers,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitHubMark } from "@/components/brand";

const STATS = [
  { value: "4 min", label: "Median time to a publishable README" },
  { value: "13", label: "Section types in the library" },
  { value: "60+", label: "Badge templates generated per repo" },
];

const PIPELINE = [
  {
    icon: GitHubMark,
    title: "Connect GitHub",
    body: "OAuth in one click. Pick a repo, or queue several for a batch run.",
  },
  {
    icon: ScanSearch,
    title: "Analyze the repository",
    body: "Manifests, lockfiles, routes, workflows and docs are read on a read-only clone.",
  },
  {
    icon: Layers,
    title: "Detect stack & features",
    body: "Languages, frameworks, databases and infrastructure are classified with confidence.",
  },
  {
    icon: Sparkles,
    title: "Generate the README",
    body: "Sections are drafted from real evidence, with badges, diagrams and copy-pasteable usage.",
  },
  {
    icon: BadgeCheck,
    title: "Refine & publish",
    body: "Edit inline, rewrite any section, then open a pull request or commit directly.",
  },
];

export function Hero() {
  return (
    <section className="relative">
      <div
        aria-hidden="true"
        className="bg-primary/5 pointer-events-none absolute inset-x-0 top-0 h-72"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-14 pb-6 pl-safe pr-safe sm:pt-20">
        <div className="max-w-3xl">
          <Badge variant="default" className="h-7 gap-1.5 px-2.5">
            <Sparkles aria-hidden="true" />
            Analyzes your real codebase, not a template
          </Badge>

          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Your repository already contains everything a great README needs.
          </h1>

          <p className="text-muted-foreground mt-5 max-w-2xl text-pretty text-base sm:text-lg">
            README Studio reads your stack, features and workflows, then writes a
            professional <span className="text-foreground font-medium">README.md</span>{" "}
            with badges, architecture diagrams and copy-pasteable examples — ready
            to commit or open as a pull request.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link href="/repos">
                <GitHubMark />
                Connect GitHub &amp; generate README
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#example">
                <BookTemplate aria-hidden="true" />
                See example READMEs
              </Link>
            </Button>
          </div>

          <p className="text-muted-foreground mt-4 flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5">
              <GitHubMark className="size-3.5" />
              Read-only by default
            </span>
            <span aria-hidden="true">·</span>
            No credit card required
          </p>
        </div>

        <dl className="border-border mt-12 grid gap-6 border-t pt-6 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold tabular-nums">
                  {stat.value}
                </span>
                <span className="text-muted-foreground text-pretty text-[13px]">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-6xl px-4 py-14 pl-safe pr-safe">
      <div className="max-w-2xl">
        <h2 className="text-balance text-2xl font-semibold sm:text-3xl">
          Five deterministic steps, no blank page
        </h2>
        <p className="text-muted-foreground mt-3 text-pretty text-sm sm:text-base">
          Every claim in the generated README is traceable to something in your
          repository, so you can review instead of rewrite.
        </p>
      </div>

      <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {PIPELINE.map((step, index) => (
          <li
            key={step.title}
            className="border-border bg-card flex flex-col gap-3 rounded-xl border p-4 shadow-xs"
          >
            <div className="flex items-center gap-2">
              <span className="bg-accent text-accent-foreground flex size-7 items-center justify-center rounded-md">
                <step.icon aria-hidden="true" className="size-4" />
              </span>
              <span className="text-muted-foreground text-xs tabular-nums">
                Step {index + 1}
              </span>
            </div>
            <h3 className="text-balance text-[13px] font-semibold">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-pretty text-[13px]">
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-8">
        <Button variant="outline" asChild>
          <Link href="/analyze">
            Watch the analysis pipeline
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
