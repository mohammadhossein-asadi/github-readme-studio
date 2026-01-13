"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-[13px] leading-none font-medium select-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input bg-card flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-sm shadow-xs",
        "transition-[color,box-shadow,border-color] duration-150 ease-out outline-none",
        "file:mr-2 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-ring/35 focus-visible:ring-[3px]",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/25 aria-invalid:ring-[3px]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input bg-card flex min-h-20 w-full resize-y rounded-md border px-3 py-2 text-sm shadow-xs",
        "transition-[color,box-shadow,border-color] duration-150 ease-out outline-none",
        "placeholder:text-muted-foreground field-sizing-content",
        "focus-visible:border-ring focus-visible:ring-ring/35 focus-visible:ring-[3px]",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/25 aria-invalid:ring-[3px]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

/** Helper/error text, wired to the control with aria-describedby by the caller. */
function FieldMessage({
  className,
  tone = "muted",
  id,
  ...props
}: React.ComponentProps<"p"> & { tone?: "muted" | "error" }) {
  return (
    <p
      id={id}
      data-slot="field-message"
      className={cn(
        "text-pretty text-xs",
        tone === "error" ? "text-destructive" : "text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Label, Input, Textarea, FieldMessage };
