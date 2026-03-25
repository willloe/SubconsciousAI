import { ChevronDown } from "lucide-react";

import type { ExplorerOptionId, SelectOption } from "@/lib/types";
import { cn } from "@/lib/utils";

type PanelSelectProps<T extends ExplorerOptionId> = {
  label: string;
  options: Array<SelectOption<T>>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export function PanelSelect<T extends ExplorerOptionId>({
  label,
  options,
  value,
  onChange,
  className
}: PanelSelectProps<T>) {
  return (
    <label className={cn("flex min-w-[220px] flex-col gap-1.5", className)}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
          className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-10 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      </div>
    </label>
  );
}
