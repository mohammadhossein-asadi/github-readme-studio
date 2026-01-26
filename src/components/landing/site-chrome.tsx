import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandWordmark, GitHubMark } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#example", label: "Example" },
  { href: "#pricing", label: "Pricing" },
];

export function SiteHeader() {
  return (
    <header className="bg-background/80 border-border pt-safe sticky top-0 z-nav border-b backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 pl-safe pr-safe">
        <Link href="/" className="rounded-md" aria-label="README Studio home">
          <BrandWordmark />
        </Link>

        <nav aria-label="Marketing" className="ml-4 hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-150 ease-out"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/dashboard">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/repos">
              <GitHubMark className="size-3.5" />
              Connect GitHub
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/repos", label: "Repositories" },
      { href: "/editor", label: "README Editor" },
      { href: "/templates", label: "Templates" },
    ],
  },
  {
    heading: "Example READMEs",
    links: [
      { href: "/editor", label: "Next.js SaaS" },
      { href: "/editor", label: "Go CLI" },
      { href: "/editor", label: "Python data pipeline" },
      { href: "/editor", label: "Rust library" },
    ],
  },
  {
    heading: "Account",
    links: [
      { href: "/settings", label: "Settings" },
      { href: "/settings", label: "GitHub access" },
      { href: "/templates", label: "My templates" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-border mt-4 border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 pl-safe pr-safe pb-safe sm:flex-row">
        <div className="max-w-xs">
          <BrandWordmark />
          <p className="text-muted-foreground mt-3 text-pretty text-[13px]">
            Professional GitHub READMEs generated from your real codebase, in
            minutes.
          </p>
          <Button variant="outline" size="sm" className="mt-4" asChild>
            <Link href="/repos">
              Generate your first README
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid flex-1 gap-8 sm:grid-cols-3">
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-[13px] font-medium">{column.heading}</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-[13px] transition-colors duration-150 ease-out"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-border border-t px-4 py-4 pl-safe pr-safe">
        <p className="text-muted-foreground mx-auto w-full max-w-6xl text-xs">
          © 2026 README Studio. A product prototype — placeholder data throughout.
        </p>
      </div>
    </footer>
  );
}
