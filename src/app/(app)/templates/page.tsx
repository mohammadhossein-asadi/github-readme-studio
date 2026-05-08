"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  ArrowRight,
  BookTemplate,
  Eye,
  LayoutTemplate,
  Search,
  Star,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/controls";
import { EmptyState } from "@/components/ui/primitives";
import { Input } from "@/components/ui/field";
import { PageBody, PageHeader } from "@/components/page-header";
import { MarkdownPreview } from "@/components/markdown-preview";
import { sectionsToMarkdown } from "@/lib/markdown";
import { templateKinds, templates } from "@/lib/mock/templates";
import { useWorkspace } from "@/components/app-shell/workspace-provider";
import { cn } from "@/lib/utils";

const accentClass: Record<string, string> = {
  indigo: "bg-chart-1",
  sky: "bg-chart-2",
  teal: "bg-chart-3",
  amber: "bg-chart-4",
  violet: "bg-chart-5",
  emerald: "bg-chart-6",
  rose: "bg-destructive",
  neutral: "bg-muted-foreground",
};

export default function TemplatesPage() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const { setPendingTemplate } = useWorkspace();
  const [kind, setKind] = useState<(typeof templateKinds)[number]>("All");
  const [query, setQuery] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return templates.filter((template) => {
      if (kind !== "All" && template.kind !== kind) return false;
      if (!q) return true;
      return (
        template.name.toLowerCase().includes(q) ||
        template.language.toLowerCase().includes(q) ||
        template.stack.some((item) => item.toLowerCase().includes(q))
      );
    });
  }, [kind, query]);

  const preview = previewId
    ? templates.find((template) => template.id === previewId) ?? null
    : null;

  return (
    <>
      <PageHeader
        title="Templates"
        description="Start from a structure that reviewers already trust, then let the analysis fill in the specifics."
        actions={
          <Badge variant="secondary" className="h-8 px-2.5 tabular-nums">
            {templates.length} templates
          </Badge>
        }
      >
        <div className="flex flex-col gap-3">
          <label className="relative w-full sm:w-64">
            <span className="sr-only">Search templates</span>
            <Search
              aria-hidden="true"
              className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, language or stack…"
              className="h-9 pl-8"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1.5 -translate-y-1/2 rounded p-1"
              >
                <X aria-hidden="true" className="size-3.5" />
              </button>
            ) : null}
          </label>
          <ToggleGroup
            type="single"
            value={kind}
            onValueChange={(value) =>
              value && setKind(value as (typeof templateKinds)[number])
            }
            aria-label="Filter templates by project kind"
            className="flex flex-wrap"
          >
            {templateKinds.map((option) => (
              <ToggleGroupItem key={option} value={option}>
                {option}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </PageHeader>

      <PageBody>
        {visible.length === 0 ? (
          <EmptyState
            icon={<BookTemplate aria-hidden="true" />}
            title="No templates match"
            description="Try a different project kind, or clear the search to browse the full library."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setKind("All");
                  setQuery("");
                }}
              >
                Show all {templates.length} templates
              </Button>
            }
          />
        ) : (
          <>
            <p className="text-muted-foreground text-xs tabular-nums" role="status">
              Showing {visible.length} of {templates.length} templates
            </p>
            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((template) => (
                <li key={template.id}>
                  <Card className="h-full gap-4">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "size-2.5 shrink-0 rounded-sm",
                            accentClass[template.accent] ?? "bg-muted-foreground",
                          )}
                        />
                        {template.name}
                        <Badge variant="secondary" className="ml-auto">
                          {template.kind}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-pretty">
                        {template.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col gap-3">
                      <ul className="flex flex-wrap gap-1.5">
                        {template.previewSections.map((section) => (
                          <li key={section}>
                            <Badge variant="outline">{section}</Badge>
                          </li>
                        ))}
                      </ul>
                      <div className="text-muted-foreground mt-auto flex flex-wrap items-center gap-3 text-xs">
                        <span className="flex items-center gap-1 tabular-nums">
                          <LayoutTemplate aria-hidden="true" className="size-3" />
                          {template.sections} sections
                        </span>
                        <span className="flex items-center gap-1 tabular-nums">
                          <Star aria-hidden="true" className="size-3" />
                          {template.uses.toLocaleString()} uses
                        </span>
                        <Badge variant="outline" className="font-normal">
                          {template.language}
                        </Badge>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          setPendingTemplate({
                            id: template.id,
                            name: template.name,
                            sections: template.document,
                          });
                          toast.success(`Applied “${template.name}”`, {
                            description: `Opened in the editor with ${template.sections} sections.`,
                          });
                          router.push("/editor");
                        }}
                      >
                        Use this template
                        <ArrowRight aria-hidden="true" className="size-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPreviewId(template.id)}
                      >
                        <Eye aria-hidden="true" className="size-3.5" />
                        Preview
                      </Button>
                    </CardFooter>
                  </Card>
                </li>
              ))}
            </ul>
          </>
        )}
      </PageBody>

      <Dialog open={preview !== null} onOpenChange={(open) => !open && setPreviewId(null)}>
        <DialogContent className="max-w-3xl">
          {preview ? (
            <>
              <DialogHeader>
                <DialogTitle>{preview.name}</DialogTitle>
                <DialogDescription>
                  {preview.kind} · {preview.language} · rendered GitHub-flavored preview
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-[60dvh] overflow-y-auto rounded-lg border bg-background p-1">
                <MarkdownPreview
                  markdown={sectionsToMarkdown(preview.document)}
                  theme={resolvedTheme === "dark" ? "dark" : "light"}
                />
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
