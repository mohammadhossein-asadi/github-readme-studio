"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  ClipboardCopy,
  Download,
  GitFork,
  Moon,
  Search,
  Sun,
  Upload,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/primitives";
import { primaryNav, secondaryNav } from "@/components/app-shell/nav-config";
import { useWorkspace } from "@/components/app-shell/workspace-provider";
import {
  cortexSections,
} from "@/lib/mock/sections";
import { downloadMarkdown, sectionsToMarkdown } from "@/lib/markdown";

export function CommandPalette({
  open,
  onOpenChange,
  onPublish,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublish: () => void;
}) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { repo, repos, setRepoId } = useWorkspace();

  const run = (action: () => void) => {
    onOpenChange(false);
    action();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search commands, repositories and sections…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {[...primaryNav, ...secondaryNav].map((item) => (
            <CommandItem
              key={item.href}
              value={`${item.label} ${item.description}`}
              onSelect={() => run(() => router.push(item.href))}
            >
              <item.icon aria-hidden="true" />
              <span>{item.label}</span>
              {item.shortcut ? (
                <span className="ml-auto flex items-center gap-1">
                  <Kbd>⌘</Kbd>
                  <Kbd>{item.shortcut}</Kbd>
                </span>
              ) : null}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            value="publish update repository commit pull request"
            onSelect={() => run(onPublish)}
          >
            <Upload aria-hidden="true" />
            Publish README to {repo.fullName}
          </CommandItem>
          <CommandItem
            value="copy markdown clipboard"
            onSelect={() =>
              run(async () => {
                await navigator.clipboard.writeText(
                  sectionsToMarkdown(cortexSections),
                );
                toast.success("Markdown copied to clipboard");
              })
            }
          >
            <ClipboardCopy aria-hidden="true" />
            Copy generated markdown
          </CommandItem>
          <CommandItem
            value="download readme file export"
            onSelect={() =>
              run(() => {
                downloadMarkdown("README.md", sectionsToMarkdown(cortexSections));
                toast.success("Downloaded README.md");
              })
            }
          >
            <Download aria-hidden="true" />
            Download README.md
          </CommandItem>
          <CommandItem
            value="theme dark light appearance toggle"
            onSelect={() =>
              run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
            }
          >
            {resolvedTheme === "dark" ? (
              <Sun aria-hidden="true" />
            ) : (
              <Moon aria-hidden="true" />
            )}
            Switch to {resolvedTheme === "dark" ? "light" : "dark"} theme
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Repositories">
          {repos.map((entry) => (
            <CommandItem
              key={entry.id}
              value={`${entry.fullName} ${entry.language} ${entry.topics.join(" ")}`}
              onSelect={() =>
                run(() => {
                  setRepoId(entry.id);
                  toast.success(`Switched to ${entry.fullName}`);
                })
              }
            >
              <GitFork aria-hidden="true" />
              <span className="truncate">{entry.fullName}</span>
              <span className="text-muted-foreground ml-auto text-xs">
                {entry.language}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Sections">
          {cortexSections.map((section) => (
            <CommandItem
              key={section.id}
              value={`section ${section.title}`}
              onSelect={() =>
                run(() => {
                  router.push(`/editor?section=${section.id}`);
                })
              }
            >
              <Search aria-hidden="true" className="text-muted-foreground" />
              <span>Jump to {section.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
