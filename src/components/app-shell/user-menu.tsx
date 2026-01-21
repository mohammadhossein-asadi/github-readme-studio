"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  BookTemplate,
  CircleUser,
  LogOut,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const USER = {
  name: "Ava Lindqvist",
  login: "avalindqvist",
  plan: "Team",
};

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Account menu for ${USER.name}`}
        >
          <span
            aria-hidden="true"
            className="bg-primary text-primary-foreground inline-flex size-6 items-center justify-center rounded-full text-[10px] font-semibold"
          >
            AL
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5 py-2">
          <span className="text-foreground text-[13px] font-medium">
            {USER.name}
          </span>
          <span className="text-muted-foreground text-xs">@{USER.login}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <CircleUser aria-hidden="true" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/templates">
            <BookTemplate aria-hidden="true" />
            My templates
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings aria-hidden="true" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex items-center gap-1.5 py-1.5">
          <ShieldCheck aria-hidden="true" className="text-success size-3.5" />
          <span className="font-normal">{USER.plan} plan · GitHub connected</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={() =>
            toast("Sign out is not available in the prototype", {
              description: "Authentication is mocked with placeholder data.",
            })
          }
        >
          <LogOut aria-hidden="true" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
