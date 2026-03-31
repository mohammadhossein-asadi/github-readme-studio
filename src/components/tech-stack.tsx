"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { StackItem } from "@/lib/types";

function initials(name: string) {
  return name
    .split(/[\s.-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function TechIcon({
  item,
  className,
}: {
  item: StackItem;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "bg-muted text-muted-foreground inline-flex size-4 items-center justify-center rounded text-[8px] font-semibold",
          className,
        )}
      >
        {initials(item.name)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${item.slug}`}
      alt=""
      width={16}
      height={16}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("size-4 shrink-0", className)}
    />
  );
}

export function TechChips({
  items,
  className,
  showCategory = false,
}: {
  items: StackItem[];
  className?: string;
  showCategory?: boolean;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li key={item.id}>
          <Badge
            variant="outline"
            className="bg-card h-7 gap-1.5 px-2 text-xs font-medium"
            title={item.note ?? item.category}
          >
            <TechIcon item={item} />
            {item.name}
            {item.version ? (
              <span className="text-muted-foreground tabular-nums">
                {item.version}
              </span>
            ) : null}
            {showCategory ? (
              <span className="text-muted-foreground sr-only">
                {item.category}
              </span>
            ) : null}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

export function StackByCategory({ items }: { items: StackItem[] }) {
  const groups = items.reduce<Record<string, StackItem[]>>((accumulator, item) => {
    accumulator[item.category] = [...(accumulator[item.category] ?? []), item];
    return accumulator;
  }, {});

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(groups).map(([category, entries]) => (
        <div key={category} className="flex flex-col gap-2">
          <h3 className="text-muted-foreground text-[11px] font-medium">
            {category}
          </h3>
          <TechChips items={entries} />
        </div>
      ))}
    </div>
  );
}
