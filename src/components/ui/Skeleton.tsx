"use client";

import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-background-elevated rounded-lg",
        className
      )}
    />
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="h-12 bg-background-elevated rounded-lg animate-pulse" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-16 bg-background-card rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-background-card border border-border rounded-xl p-6">
      <div className="h-6 w-1/3 bg-background-elevated rounded animate-pulse mb-4" />
      <div className="h-4 w-2/3 bg-background-elevated rounded animate-pulse mb-2" />
      <div className="h-4 w-1/2 bg-background-elevated rounded animate-pulse" />
    </div>
  );
}
