import Link from "next/link";
import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandWordmark } from "@/components/brand";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 pt-safe pb-safe text-center">
      <BrandWordmark />
      <div className="flex flex-col items-center gap-2">
        <span className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-lg">
          <Compass aria-hidden="true" className="size-5" />
        </span>
        <h1 className="text-balance text-lg font-semibold">
          That page does not exist
        </h1>
        <p className="text-muted-foreground max-w-sm text-pretty text-[13px]">
          The link may be outdated. Head back to the dashboard and pick up where
          you left off.
        </p>
      </div>
      <Button asChild>
        <Link href="/dashboard">Go to dashboard</Link>
      </Button>
    </div>
  );
}
