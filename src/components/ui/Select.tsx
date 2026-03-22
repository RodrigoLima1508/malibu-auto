"use client";

import { cn } from "@/lib/utils";

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  className?: string;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  error,
  className,
}: SelectProps) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full px-4 py-3 rounded-lg bg-background-card border border-border appearance-none",
          "text-white",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
          "transition-all duration-200 cursor-pointer",
          error && "border-error focus:ring-error/50 focus:border-error"
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}
