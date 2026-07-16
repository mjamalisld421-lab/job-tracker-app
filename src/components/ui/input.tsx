import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;
  const errorId = error && inputId ? `${inputId}-error` : undefined;

  return (
    <label className="grid gap-1.5 text-sm font-medium text-slate-700" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={`h-11 rounded-lg border bg-white px-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-3 focus:ring-slate-100 ${error ? "border-rose-400" : "border-slate-200"} ${className}`}
        {...props}
      />
      {error && <span id={errorId} className="text-xs font-normal text-rose-600">{error}</span>}
    </label>
  );
}
