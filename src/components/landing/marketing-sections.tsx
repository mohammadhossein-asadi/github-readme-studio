import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ChartNoAxesColumn,
  CircleCheck,
  Layers,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Upload,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExamplePreview } from "@/components/landing/example-preview";

const FEATURES = [
  {
    icon: ScanSearch,
    title: "Stack detection you can trust",
    body: "Parses package manifests, lockfiles, Dockerfiles and CI config to name exact versions — Next.js 15.4, not just “Node”.",
  },
  {
    icon: Layers,
    title: "Section library, not a wall of text",
    body: "Hero, badges, features, tech stack, architecture, installation, usage, API, screenshots, roadmap and more.",
  },
  {
    icon: BadgeCheck,
    title: "Badges that stay correct",
    body: "Shields.io badges generated from your repository, with outdated workflow references flagged before publish.",
  },
  {
    icon: Workflow,
    title: "Architecture diagrams",
    body: "Mermaid flowcharts drafted from the real request path, editable as text or replaceable with your own image.",
  },
  {
    icon: ChartNoAxesColumn,
    title: "Metrics worth sharing",
    body: "Stars over time, download counts and coverage, rendered as theme-aware charts you can embed.",
  },
  {
    icon: ShieldCheck,
    title: "Publish safely",
    body: "Pull request by default, direct commit only behind an explicit confirmation, with permission warnings up front.",
  },
];

const BEFORE = [
  "## TODO",
  "npm install",
  "run npm start",
  "(no badges, no license, no architecture)",
];

const AFTER = [
  "Hero + tagline describing the outcome",
  "Live build, version, license and coverage badges",
  "Feature table written from detected routes",
  "Mermaid architecture diagram of the request path",
  "Installation tabs for npm, yarn, pnpm and bun",
  "Copy-pasteable usage example with citations",
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    features: [
      "3 repository analyses a month",
      "All 13 section types",
      "Pull request publishing",
      "Markdown export",
    ],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Team",
    price: "$24",
    cadence: "per editor / month",
    features: [
      "Unlimited analyses and templates",
      "Direct commits and branch targeting",
      "Private repository indexing",
      "Shared template library",
      "Version history for 90 days",
    ],
    cta: "Start 14-day trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual",
    features: [
      "Self-hosted deployment",
      "SSO and audit logging",
      "Custom section components",
      "Priority support and onboarding",
    ],
    cta: "Talk to us",
    highlighted: false,
  },
];

const FAQ = [
  {
    q: "Does README Studio read my source code?",
    a: "It reads file names, manifests, lockfiles and configuration on a read-only clone. Content is processed in memory and never used for training. Self-hosted deployments keep everything inside your network.",
  },
  {
    q: "What happens to my existing README?",
    a: "It is analyzed for quality and structure, then folded into the draft. Nothing is written back until you publish, and direct commits to a default branch require an extra confirmation.",
  },
  {
    q: "Can I edit the generated markdown directly?",
    a: "Yes. Switch between structured sections and raw GitHub-flavoured Markdown at any time; the editor re-parses your document when you switch back.",
  },
  {
    q: "Which repositories are supported?",
    a: "Anything on GitHub, public or private, across npm, pnpm, yarn, bun, Poetry, Cargo, Go modules, Maven and Gradle toolchains.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="border-border bg-subtle border-y">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 pl-safe pr-safe">
        <div className="max-w-2xl">
          <h2 className="text-balance text-2xl font-semibold sm:text-3xl">
            Built for the parts of documentation nobody enjoys
          </h2>
          <p className="text-muted-foreground mt-3 text-pretty text-sm sm:text-base">
            The tedious 90% is generated. Your time goes into the 10% that makes
            the project yours.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map((feature) => (
            <li
              key={feature.title}
              className="border-border bg-card flex flex-col gap-3 rounded-xl border p-4 shadow-xs"
            >
              <span className="bg-accent text-accent-foreground flex size-8 items-center justify-center rounded-lg">
                <feature.icon aria-hidden="true" className="size-4" />
              </span>
              <h3 className="text-balance text-[13px] font-semibold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-pretty text-[13px]">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function BeforeAfter() {
  return (
    <section id="example" className="mx-auto w-full max-w-6xl px-4 py-14 pl-safe pr-safe">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-start">
        <div>
          <h2 className="text-balance text-2xl font-semibold sm:text-3xl">
            From a two-line stub to something people star
          </h2>
          <p className="text-muted-foreground mt-3 text-pretty text-sm sm:text-base">
            The example below is a real generated document for a Next.js 15
            repository — badges, feature table, stack table and all. Toggle the
            preview scheme to see how it reads in both GitHub themes.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="border-border rounded-xl border p-4">
              <Badge variant="secondary">Before</Badge>
              <ul className="mt-3 flex flex-col gap-1.5">
                {BEFORE.map((line) => (
                  <li
                    key={line}
                    className="text-muted-foreground truncate font-mono text-xs"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-primary/30 bg-accent/40 rounded-xl border p-4">
              <Badge variant="default">After</Badge>
              <ul className="mt-3 flex flex-col gap-1.5">
                {AFTER.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-[13px]">
                    <CircleCheck
                      aria-hidden="true"
                      className="text-success mt-0.5 size-3.5 shrink-0"
                    />
                    <span className="text-pretty">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button className="mt-6" asChild>
            <Link href="/editor">
              Open this README in the editor
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </Button>
        </div>

        <ExamplePreview />
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="border-border bg-subtle border-y">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 pl-safe pr-safe">
        <div className="max-w-2xl">
          <h2 className="text-balance text-2xl font-semibold sm:text-3xl">
            Pricing that scales with your team, not your file count
          </h2>
          <p className="text-muted-foreground mt-3 text-pretty text-sm sm:text-base">
            Start free on a single repository. Upgrade when you want direct
            commits and shared templates.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <li
              key={plan.name}
              className={`flex flex-col gap-4 rounded-xl border p-5 ${
                plan.highlighted
                  ? "border-primary/50 bg-card ring-primary/15 shadow-sm ring-1"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-2">
                <h3 className="text-[13px] font-semibold">{plan.name}</h3>
                {plan.highlighted ? (
                  <Badge variant="default" className="ml-auto">
                    Most popular
                  </Badge>
                ) : null}
              </div>
              <p>
                <span className="text-2xl font-semibold tabular-nums">
                  {plan.price}
                </span>{" "}
                <span className="text-muted-foreground text-xs">
                  {plan.cadence}
                </span>
              </p>
              <ul className="flex flex-col gap-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[13px]">
                    <CircleCheck
                      aria-hidden="true"
                      className="text-success mt-0.5 size-3.5 shrink-0"
                    />
                    <span className="text-pretty">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-auto w-full"
                variant={plan.highlighted ? "default" : "outline"}
                asChild
              >
                <Link href="/repos">{plan.cta}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-14 pl-safe pr-safe">
      <h2 className="text-balance text-2xl font-semibold sm:text-3xl">
        Questions engineers actually ask
      </h2>
      <div className="mt-6 flex flex-col gap-2">
        {FAQ.map((item) => (
          <details
            key={item.q}
            className="group border-border bg-card rounded-xl border p-4"
          >
            <summary className="flex cursor-pointer items-center gap-2 text-[13px] font-medium">
              <ArrowRight
                aria-hidden="true"
                className="text-muted-foreground size-3.5 shrink-0 transition-transform duration-150 ease-out group-open:rotate-90"
              />
              <span className="text-balance">{item.q}</span>
            </summary>
            <p className="text-muted-foreground mt-3 text-pretty text-[13px]">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 pl-safe pr-safe">
      <div className="border-primary/30 bg-accent/40 flex flex-col items-start gap-4 rounded-xl border p-6 sm:p-8">
        <span className="bg-accent text-accent-foreground flex size-9 items-center justify-center rounded-lg">
          <Sparkles aria-hidden="true" className="size-4" />
        </span>
        <h2 className="max-w-xl text-balance text-2xl font-semibold">
          Ship a README you are proud to link in your next job application
        </h2>
        <p className="text-muted-foreground max-w-xl text-pretty text-sm">
          Connect GitHub, pick a repository, and have a publishable README in
          front of you in about four minutes.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link href="/repos">
              <Upload aria-hidden="true" />
              Connect GitHub &amp; generate README
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/templates">Browse templates</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
