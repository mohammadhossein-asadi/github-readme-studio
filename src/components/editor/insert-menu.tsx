"use client";

import { ChevronDown, Plus, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { sectionPresets } from "@/lib/mock/sections";
import type { Section } from "@/lib/types";

export const snippets: {
  id: string;
  label: string;
  hint: string;
  markdown: string;
}[] = [
  {
    id: "table",
    label: "Comparison table",
    hint: "Three-column capability table",
    markdown:
      "| Feature | Free | Pro |\n| :--- | :---: | :---: |\n| Unlimited repositories | ✅ | ✅ |\n| Private indexing | — | ✅ |\n| Priority support | — | ✅ |",
  },
  {
    id: "alert",
    label: "Callout",
    hint: "GitHub alert block",
    markdown:
      "> [!WARNING]\n> Requires Node.js 20 or newer. Earlier releases are not supported.",
  },
  {
    id: "tasks",
    label: "Task list",
    hint: "Checklist with progress",
    markdown: "- [x] Document the happy path\n- [ ] Add migration notes\n- [ ] Record a demo GIF",
  },
  {
    id: "diagram",
    label: "Mermaid diagram",
    hint: "Flowchart or sequence diagram",
    markdown:
      '```mermaid\nflowchart LR\n  Client["Client"] --> API["API"]\n  API --> DB[("Database")]\n```',
  },
  {
    id: "code",
    label: "Code block",
    hint: "Fenced block with a language",
    markdown: "```ts\n// Paste your example here\n```",
  },
  {
    id: "details",
    label: "Collapsible section",
    hint: "Details / summary pair",
    markdown:
      "<details>\n<summary>Environment variables</summary>\n\n| Name | Required | Description |\n| :--- | :---: | :--- |\n| `DATABASE_URL` | yes | Postgres connection string |\n\n</details>",
  },
  {
    id: "footnote",
    label: "Footnote",
    hint: "Reference and definition",
    markdown:
      "Compatibility is verified nightly in CI.[^1]\n\n[^1]: Tested against Node 20, 22 and 24 on Linux and macOS.",
  },
];

export function InsertMenu({
  onInsertSnippet,
  onAddSection,
}: {
  onInsertSnippet: (markdown: string, label: string) => void;
  onAddSection: (preset: Section["kind"], title: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus aria-hidden="true" className="size-3.5" />
          Insert
          <ChevronDown aria-hidden="true" className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-72">
        <DropdownMenuLabel>New section</DropdownMenuLabel>
        {sectionPresets.map((preset) => (
          <DropdownMenuItem
            key={preset.kind + preset.title}
            onSelect={() => onAddSection(preset.kind, preset.title)}
          >
            <Type aria-hidden="true" />
            <span className="flex flex-col gap-0.5">
              <span>{preset.title}</span>
              <span className="text-muted-foreground text-xs">
                {preset.hint}
              </span>
            </span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Insert into current section</DropdownMenuLabel>
        {snippets.map((snippet) => (
          <DropdownMenuItem
            key={snippet.id}
            onSelect={() => onInsertSnippet(snippet.markdown, snippet.label)}
          >
            <Plus aria-hidden="true" />
            <span className="flex flex-col gap-0.5">
              <span>{snippet.label}</span>
              <span className="text-muted-foreground text-xs">
                {snippet.hint}
              </span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
