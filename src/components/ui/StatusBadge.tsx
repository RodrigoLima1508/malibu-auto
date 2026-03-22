"use client";

import { cn, getStatusColor, getStatusLabel } from "@/lib/utils";
import { Status } from "@/types";

interface StatusBadgeProps {
  status: Status | string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border",
        getStatusColor(status),
        className
      )}
    >
      {getStatusLabel(status)}
    </span>
  );
}
