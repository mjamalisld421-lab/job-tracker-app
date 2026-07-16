import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export function Select({ label, error, id, className = "", children, ...props }: SelectProps) {
  const selectId = id ?? props.name;
  const errorId = error && selectId ? `${selectId}-error` : undefined;

  return (
    <label className="grid gap-1.5 text-sm font-medium text-slate-700" htmlFor={selectId}>
      {label}
      <select
        id={selectId}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={`h-11 rounded-lg border bg-white px-3 text-slate-950 outline-none transition focus:border-slate-500 focus:ring-3 focus:ring-slate-100 ${error ? "border-rose-400" : "border-slate-200"} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <span id={errorId} className="text-xs font-normal text-rose-600">{error}</span>}
    </label>
  );
}
