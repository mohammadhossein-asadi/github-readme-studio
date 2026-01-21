"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen, Sparkles } from "lucide-react";
import { BrandMark, BrandWordmark } from "@/components/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/primitives";
import { primaryNav, secondaryNav, type NavItem } from "@/components/app-shell/nav-config";
import { cn } from "@/lib/utils";

function NavLink({
  item,
  collapsed,
  active,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  active: boolean;
  onNavigate?: () => void;
}) {
  const content = (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      aria-label={collapsed ? item.label : item.label}
      className={cn(
        "group flex h-10 items-center gap-2 rounded-md px-2 text-sm font-medium transition-[background-color,color] ease-out",
        collapsed && "justify-center px-2",
        active
          ? "bg-sidebar-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <item.icon aria-hidden="true" className="size-4 shrink-0" />
      {collapsed ? null : <span className="truncate w-40">{item.label}</span>}
    </Link>
  );

  if (!collapsed) return content;

  return (
    <Tooltip content={item.label} side="right" shortcut={item.shortcut}>
      <span className="flex items-center justify-center w-full h-full">{content}</span>
    </Tooltip>
  );
}

export function Sidebar({
  collapsed,
  onToggle,
  onNavigate,
  className,
}: {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "bg-sidebar border-sidebar-border flex h-full flex-col gap-1 border-r overflow-y-auto",
        collapsed ? "w-16 px-3 pt-4 pb-4" : "w-64 px-4 pt-4 pb-4",
        "max-w-full",
        className,
      )}
    >
      <div
        className={cn(
          "mb-2 flex items-center",
          collapsed ? "justify-center" : "justify-between px-1",
        )}
      >
        {collapsed ? (
          <Link href="/dashboard" aria-label="README Studio dashboard">
            <BrandMark />
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="rounded-md focus-visible:outline-none"
          >
            <BrandWordmark />
          </Link>
        )}
        {collapsed ? null : (
          <Tooltip content="Collapse sidebar" shortcut="[">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onToggle}
              aria-label="Collapse sidebar"
              className="text-muted-foreground"
            >
              <PanelLeftClose aria-hidden="true" className="size-4" />
            </Button>
          </Tooltip>
        )}
      </div>

      {collapsed ? (
        <Tooltip content="Expand sidebar" shortcut="[">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onToggle}
            aria-label="Expand sidebar"
            className="text-muted-foreground mx-auto mb-1"
          >
            <PanelLeftOpen aria-hidden="true" className="size-4" />
          </Button>
        </Tooltip>
      ) : null}

      <ul className="flex flex-col gap-0.5">
        {primaryNav.map((item) => (
          <li key={item.href}>
            <NavLink
              item={item}
              collapsed={collapsed}
              active={isActive(item.href)}
              onNavigate={onNavigate}
            />
          </li>
        ))}
      </ul>

      <div className="bg-sidebar-border my-2 h-px" role="presentation" />

      <ul className="flex flex-col gap-0.5">
        {secondaryNav.map((item) => (
          <li key={item.href}>
            <NavLink
              item={item}
              collapsed={collapsed}
              active={isActive(item.href)}
              onNavigate={onNavigate}
            />
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        {collapsed ? (
          <Tooltip content="3 repositories ready to document" side="right">
            <div className="flex justify-center py-2">
              <span className="bg-primary size-1.5 rounded-full" aria-hidden="true" />
            </div>
          </Tooltip>
        ) : (
          <div className="border-sidebar-border bg-background/60 rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <Sparkles aria-hidden="true" className="text-primary size-4" />
              <p className="text-[13px] font-medium">Analysis quota</p>
              <Badge variant="secondary" className="ml-auto tabular-nums">
                7 / 10
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1.5 text-pretty text-xs">
              Resets on the 1st. Upgrade for unlimited repository analyses.
            </p>
          </div>
        )}
      </div>
    </nav>
  );
}
