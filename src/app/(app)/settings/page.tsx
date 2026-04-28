"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  Link2Off,
  Monitor,
  Moon,
  RefreshCw,
  Sun,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { GitHubMark } from "@/components/brand";
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
import { Input, Label, Textarea } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { useMounted } from "@/lib/use-mounted";
import { Switch, ToggleGroup, ToggleGroupItem } from "@/components/ui/controls";
import { Separator, StatusDot } from "@/components/ui/primitives";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PageBody, PageHeader } from "@/components/page-header";

const THEMES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const [autoSave, setAutoSave] = useState(true);
  const [showOutline, setShowOutline] = useState(true);
  const [telemetry, setTelemetry] = useState(false);
  const [branch, setBranch] = useState("main");
  const [commitTemplate, setCommitTemplate] = useState(
    "docs: rewrite README with generated sections",
  );

  return (
    <>
      <PageHeader
        title="Settings"
        description="Appearance, GitHub access and publishing defaults. Changes apply immediately."
      />

      <PageBody className="max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Follows your system preference by default and is remembered on this
              device.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {mounted ? (
              <ToggleGroup
                type="single"
                value={theme ?? "system"}
                onValueChange={(value) => value && setTheme(value)}
                aria-label="Colour theme"
              >
                {THEMES.map((option) => (
                  <ToggleGroupItem key={option.value} value={option.value}>
                    <option.icon aria-hidden="true" />
                    {option.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            ) : (
              <Skeleton className="h-8 w-64 rounded-lg" />
            )}
            <Separator />
            <SettingRow
              id="auto-save"
              title="Auto-save version snapshots"
              description="Creates a history entry before destructive edits such as badge regeneration."
              checked={autoSave}
              onChange={setAutoSave}
            />
            <SettingRow
              id="outline"
              title="Show the document outline"
              description="Adds a jump list under the preview pane."
              checked={showOutline}
              onChange={setShowOutline}
            />
            <SettingRow
              id="telemetry"
              title="Anonymous usage telemetry"
              description="Repository names and content are never included."
              checked={telemetry}
              onChange={setTelemetry}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>GitHub connection</CardTitle>
            <CardDescription>
              README Studio reads file names and manifests. It only writes when you
              publish.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="border-border flex flex-wrap items-center gap-3 rounded-lg border p-3">
              <span className="bg-primary text-primary-foreground inline-flex size-8 items-center justify-center rounded-full text-xs font-semibold">
                AL
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-[13px] font-medium">
                  <GitHubMark className="size-3.5" />
                  avalindqvist
                  <StatusDot tone="success" />
                </p>
                <p className="text-muted-foreground text-xs">
                  Connected via GitHub OAuth · 6 repositories visible
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success("GitHub access re-verified")}
              >
                <RefreshCw aria-hidden="true" className="size-3.5" />
                Re-verify
              </Button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {["repo:read", "contents:write", "pull_requests:write", "user:email"].map(
                (scope) => (
                  <Badge key={scope} variant="outline" className="font-mono">
                    {scope}
                  </Badge>
                ),
              )}
            </div>

            <p className="text-muted-foreground text-pretty text-xs">
              Revoking access disconnects every repository. Existing drafts stay
              available in the editor until you delete them.
            </p>
          </CardContent>
          <CardFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Link2Off aria-hidden="true" className="size-3.5" />
                  Disconnect GitHub
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Disconnect GitHub?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will need to authorize again to analyze repositories or
                    publish READMEs. Drafts and templates are kept.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep connected</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      toast.success("GitHub disconnected", {
                        description: "Reconnect at any time from this page.",
                      })
                    }
                  >
                    Disconnect
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publishing defaults</CardTitle>
            <CardDescription>
              Pre-fills the publish dialog for every repository.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="default-branch">Default target branch</Label>
              <Input
                id="default-branch"
                value={branch}
                onChange={(event) => setBranch(event.target.value)}
                className="max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="commit-template">Commit message template</Label>
              <Textarea
                id="commit-template"
                value={commitTemplate}
                rows={2}
                onChange={(event) => setCommitTemplate(event.target.value)}
                className="min-h-0 max-w-lg"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TriangleAlert aria-hidden="true" className="text-destructive size-4" />
              Danger zone
            </CardTitle>
            <CardDescription>
              Irreversible actions require confirmation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-pretty text-[13px]">
              Deleting all drafts removes generated READMEs and version history
              from this workspace. Repositories are untouched.
            </p>
          </CardContent>
          <CardFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 aria-hidden="true" className="size-3.5" />
                  Delete all drafts
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete all drafts?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This removes 24 generated READMEs and their version history.
                    This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      toast.success("All drafts deleted", {
                        description: "This is a simulated action in the prototype.",
                      })
                    }
                  >
                    Delete everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </PageBody>
    </>
  );
}

function SettingRow({
  id,
  title,
  description,
  checked,
  onChange,
}: {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3">
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="mt-0.5"
      />
      <div className="min-w-0">
        <Label htmlFor={id}>{title}</Label>
        <p className="text-muted-foreground text-pretty text-xs">{description}</p>
      </div>
    </div>
  );
}
