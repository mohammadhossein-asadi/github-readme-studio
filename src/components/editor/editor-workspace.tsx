"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Group, Panel, Separator } from "react-resizable-panels";
import { toast } from "sonner";
import {
  BadgeCheck,
  ClipboardCopy,
  Download,
  Eye,
  PenLine,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/controls";
import { Separator as Divider } from "@/components/ui/primitives";
import { EditorPane } from "@/components/editor/editor-pane";
import { PreviewPane } from "@/components/editor/preview-pane";
import { InsertMenu } from "@/components/editor/insert-menu";
import { BadgesDialog } from "@/components/editor/badges-dialog";
import { VersionsPanel } from "@/components/editor/versions-panel";
import { useEditorDocument } from "@/components/editor/use-editor-document";
import { useWorkspace } from "@/components/app-shell/workspace-provider";
import { PublishDialog } from "@/components/publish-dialog";
import { downloadMarkdown, sectionsToMarkdown } from "@/lib/markdown";
import { cortexSections } from "@/lib/mock/sections";

const ORIGINAL_MARKDOWN = sectionsToMarkdown(cortexSections);

export function EditorWorkspace({
  initialSectionId,
}: {
  initialSectionId?: string;
}) {
  const { repo } = useWorkspace();
  const { resolvedTheme } = useTheme();
  const doc = useEditorDocument();
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark" | null>(
    null,
  );
  const [previewWidth, setPreviewWidth] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [mobilePane, setMobilePane] = useState<"editor" | "preview">("editor");
  const [badgesOpen, setBadgesOpen] = useState(false);
  const [badgeSelection, setBadgeSelection] = useState<string[]>([
    "b_ci",
    "b_version",
    "b_license",
    "b_stars",
  ]);
  const [publishOpen, setPublishOpen] = useState(false);

  const effectivePreviewTheme =
    previewTheme ?? (resolvedTheme === "dark" ? "dark" : "light");

  const dirty = useMemo(
    () => doc.markdown !== ORIGINAL_MARKDOWN,
    [doc.markdown],
  );

  useEffect(() => {
    if (initialSectionId) doc.focusSection(initialSectionId);
    // Only run for the value present on first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSectionId]);

  // Cmd/Ctrl+S saves a version snapshot instead of the browser save dialog.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        doc.saveVersion();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [doc]);

  async function copyMarkdown() {
    await navigator.clipboard.writeText(doc.markdown);
    toast.success("Markdown copied to clipboard", {
      description: `${doc.markdown.split("\n").length} lines · ${doc.stats.words} words`,
    });
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-border flex flex-wrap items-center gap-2 border-b px-3 py-2 pl-safe pr-safe">
        <div className="flex min-w-0 items-center gap-2">
          <Badge variant="secondary" className="max-w-44 truncate">
            {repo.fullName}
          </Badge>
          {dirty ? (
            <Badge variant="warning">Unsaved changes</Badge>
          ) : (
            <Badge variant="success">Synced with analysis</Badge>
          )}
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-1.5">
          <InsertMenu
            onInsertSnippet={doc.insertSnippet}
            onAddSection={(kind, title) => doc.addSection(kind, title)}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBadgesOpen(true)}
          >
            <BadgeCheck aria-hidden="true" className="size-3.5" />
            Badges
          </Button>
          <VersionsPanel
            versions={doc.versions}
            onSave={() => doc.saveVersion()}
            onRevert={doc.revertTo}
          />
          <Divider
            orientation="vertical"
            className="mx-1 hidden h-5 sm:block"
          />
          <Button variant="ghost" size="sm" onClick={() => void copyMarkdown()}>
            <ClipboardCopy aria-hidden="true" className="size-3.5" />
            <span className="hidden sm:inline">Copy</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              downloadMarkdown(`${repo.name}-README.md`, doc.markdown);
              toast.success("Downloaded README.md");
            }}
          >
            <Download aria-hidden="true" className="size-3.5" />
            <span className="hidden sm:inline">Download</span>
          </Button>
          <Button size="sm" onClick={() => setPublishOpen(true)}>
            <Upload aria-hidden="true" className="size-3.5" />
            Publish
          </Button>
        </div>
      </div>

      <div className="border-border flex items-center gap-2 border-b px-3 py-2 lg:hidden">
        <ToggleGroup
          type="single"
          value={mobilePane}
          onValueChange={(value) =>
            value && setMobilePane(value as "editor" | "preview")
          }
          aria-label="Switch between editor and preview"
          className="w-full"
        >
          <ToggleGroupItem value="editor" className="flex-1">
            <PenLine aria-hidden="true" />
            Editor
          </ToggleGroupItem>
          <ToggleGroupItem value="preview" className="flex-1">
            <Eye aria-hidden="true" />
            Preview
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="min-h-0 flex-1">
        {/* Responsive visibility lives on plain wrapper divs: the panels Group
            writes an inline `display: flex`, which would win over `hidden`. */}
        <div className="hidden h-full min-h-0 lg:block">
          <Group orientation="horizontal" className="h-full" id="readme-editor">
            <Panel defaultSize="46" minSize="26" className="min-w-0">
              <EditorPane
                sections={doc.sections}
                mode={doc.mode}
                markdown={doc.markdown}
                activeId={doc.activeId}
                scope="desktop"
                onModeChange={doc.changeMode}
                onRawChange={doc.setRaw}
                onReorder={doc.reorder}
                onPatch={doc.patchSection}
                onMove={doc.moveSection}
                onDelete={doc.deleteSection}
                onAddFirstSection={() =>
                  doc.addSection("description", "Description")
                }
              />
            </Panel>

            <Separator
              aria-label="Resize editor and preview"
              className="bg-border hover:bg-primary/50 relative w-px transition-colors duration-150 ease-out"
            />

            <Panel defaultSize="54" minSize="30" className="min-w-0">
              <PreviewPane
                repo={repo}
                markdown={doc.markdown}
                theme={effectivePreviewTheme}
                onThemeChange={setPreviewTheme}
                width={previewWidth}
                onWidthChange={setPreviewWidth}
                stats={doc.stats}
                onJumpToSection={doc.jumpToHeading}
              />
            </Panel>
          </Group>
        </div>

        <div className="h-full min-h-0 lg:hidden">
          {mobilePane === "editor" ? (
            <EditorPane
              sections={doc.sections}
              mode={doc.mode}
              markdown={doc.markdown}
              activeId={doc.activeId}
              scope="mobile"
              onModeChange={doc.changeMode}
              onRawChange={doc.setRaw}
              onReorder={doc.reorder}
              onPatch={doc.patchSection}
              onMove={doc.moveSection}
              onDelete={doc.deleteSection}
              onAddFirstSection={() =>
                doc.addSection("description", "Description")
              }
            />
          ) : (
            <PreviewPane
              repo={repo}
              markdown={doc.markdown}
              theme={effectivePreviewTheme}
              onThemeChange={setPreviewTheme}
              width={previewWidth}
              onWidthChange={setPreviewWidth}
              stats={doc.stats}
              onJumpToSection={doc.jumpToHeading}
            />
          )}
        </div>
      </div>

      <BadgesDialog
        repo={repo}
        open={badgesOpen}
        onOpenChange={setBadgesOpen}
        selected={badgeSelection}
        onSelectedChange={setBadgeSelection}
        onApply={doc.setBadgeRow}
      />

      <PublishDialog
        repo={repo}
        markdown={doc.markdown}
        open={publishOpen}
        onOpenChange={setPublishOpen}
      />
    </div>
  );
}
