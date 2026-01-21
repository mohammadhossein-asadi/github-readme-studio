"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Sidebar } from "@/components/app-shell/sidebar";
import { Topbar } from "@/components/app-shell/topbar";
import { CommandPalette } from "@/components/app-shell/command-palette";
import { useWorkspace } from "@/components/app-shell/workspace-provider";
import { PublishDialog } from "@/components/publish-dialog";
import { TooltipProvider } from "@/components/ui/primitives";
import { cortexSections } from "@/lib/mock/sections";
import { sectionsToMarkdown } from "@/lib/markdown";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { repo } = useWorkspace();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);

  // The editor is the hero experience: it collapses the sidebar by default.
  // Derived rather than synced, so route changes never trigger a render cascade.
  const editorRoute = pathname.startsWith("/editor");
  const [manualCollapsed, setManualCollapsed] = useState<boolean | null>(null);
  const collapsed = manualCollapsed ?? editorRoute;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey) {
        if (event.key.toLowerCase() === "k") {
          event.preventDefault();
          setPaletteOpen((open) => !open);
        }
      }
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (!typing && !event.metaKey && !event.ctrlKey && event.key === "[") {
        setManualCollapsed((value) => !(value ?? editorRoute));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [editorRoute, setManualCollapsed]);

  const openMobileNav = useCallback(() => setMobileNavOpen(true), []);

  return (
    <TooltipProvider delayDuration={400}>
      <div className="bg-background flex h-dvh w-full overflow-hidden">
        <a
          href="#main-content"
          className="bg-primary text-primary-foreground sr-only rounded-md px-3 py-2 text-sm focus:not-sr-only focus:absolute focus:top-3 focus:left-3 z-tooltip"
        >
          Skip to content
        </a>

        <div className="hidden shrink-0 lg:block">
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setManualCollapsed((value) => !(value ?? editorRoute))}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            onOpenPalette={() => setPaletteOpen(true)}
            onOpenMobileNav={openMobileNav}
            onPublish={() => setPublishOpen(true)}
            publishLabel="Publish"
          />
          <main id="main-content" className="min-h-0 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <DialogPrimitive.Root open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-foreground/25 dark:bg-black/60 fixed inset-0 z-overlay lg:hidden max-h-screen overflow-y-auto" />
          <DialogPrimitive.Content
            aria-label="Navigation"
            className="bg-sidebar data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left fixed inset-y-0 left-0 z-modal w-64 duration-200 lg:hidden max-h-screen overflow-y-auto flex flex-col"
          >
            <DialogPrimitive.Title className="sr-only">
              Navigation
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Main application navigation
            </DialogPrimitive.Description>
            <DialogPrimitive.Close
              aria-label="Close navigation"
              className="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-3 right-3 z-dropdown rounded-md p-1"
            >
              <X aria-hidden="true" className="size-4" />
            </DialogPrimitive.Close>
            <Sidebar
              collapsed={false}
              onToggle={() => setMobileNavOpen(false)}
              onNavigate={() => setMobileNavOpen(false)}
              className="w-full pt-10"
            />
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onPublish={() => setPublishOpen(true)}
      />

      <PublishDialog
        repo={repo}
        markdown={sectionsToMarkdown(cortexSections)}
        open={publishOpen}
        onOpenChange={setPublishOpen}
      />
    </TooltipProvider>
  );
}
