"use client";

import Link from "next/link";
import { Check, ChevronsUpDown, Lock, Globe, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspace } from "@/components/app-shell/workspace-provider";

export function RepoSwitcher({ className }: { className?: string }) {
  const { repo, repos, setRepoId } = useWorkspace();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={className}
          aria-label={`Current repository ${repo.fullName}. Switch repository`}
        >
          <span
            aria-hidden="true"
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: repo.languageColor }}
          />
          <span className="max-w-[9rem] truncate font-medium">
            <span className="text-muted-foreground">{repo.owner}/</span>
            {repo.name}
          </span>
          <ChevronsUpDown
            aria-hidden="true"
            className="text-muted-foreground size-3.5"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-72">
        <DropdownMenuLabel>Repositories</DropdownMenuLabel>
        {repos.slice(0, 5).map((entry) => (
          <DropdownMenuItem
            key={entry.id}
            onSelect={() => setRepoId(entry.id)}
            className="gap-2.5"
          >
            {entry.visibility === "private" ? (
              <Lock aria-hidden="true" className="text-muted-foreground size-3.5" />
            ) : (
              <Globe aria-hidden="true" className="text-muted-foreground size-3.5" />
            )}
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-[13px] font-medium">
                {entry.fullName}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                {entry.language} · {entry.stars.toLocaleString()} stars
              </span>
            </span>
            {entry.id === repo.id ? (
              <Check aria-hidden="true" className="text-primary ml-auto size-4" />
            ) : null}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/repos">
            <Plus aria-hidden="true" />
            Connect another repository
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
