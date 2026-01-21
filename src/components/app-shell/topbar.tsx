"use client";

import { Menu, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/primitives";
import { ThemeToggle } from "@/components/theme-toggle";
import { RepoSwitcher } from "@/components/app-shell/repo-switcher";
import { UserMenu } from "@/components/app-shell/user-menu";

export function Topbar({
  onOpenPalette,
  onOpenMobileNav,
  onPublish,
  publishLabel = "Publish",
}: {
  onOpenPalette: () => void;
  onOpenMobileNav: () => void;
  onPublish: () => void;
  publishLabel?: string;
}) {
  return (
    <header className="bg-background/85 border-border pt-safe sticky top-0 z-nav border-b backdrop-blur-sm">
      <div className="flex h-13 items-center gap-1.5 px-3 pl-safe pr-safe">
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          onClick={onOpenMobileNav}
          aria-label="Open navigation"
        >
          <Menu aria-hidden="true" className="size-4" />
        </Button>

        <RepoSwitcher />

        <button
          type="button"
          onClick={onOpenPalette}
          className="border-border bg-card text-muted-foreground hover:bg-muted mx-auto hidden h-8 w-full max-w-sm items-center gap-2 rounded-md border px-2.5 text-[13px] transition-colors duration-150 ease-out md:flex"
        >
          <Search aria-hidden="true" className="size-3.5" />
          <span className="truncate">Search or jump to…</span>
          <span className="ml-auto flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>

        <div className="ml-auto flex items-center gap-1.5 md:ml-0">
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={onOpenPalette}
            aria-label="Search or jump to"
          >
            <Search aria-hidden="true" className="size-4" />
          </Button>
          <ThemeToggle />
          <UserMenu />
          <Button size="sm" onClick={onPublish}>
            <Upload aria-hidden="true" className="size-3.5" />
            <span className="hidden sm:inline">{publishLabel}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
