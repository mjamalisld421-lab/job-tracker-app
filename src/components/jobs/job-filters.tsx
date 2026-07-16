"use client";

import type { JobStatus } from "@/types/job";
import { JOB_STATUSES, STATUS_LABELS } from "@/lib/jobs";

interface JobFiltersProps {
  query: string;
  status: "ALL" | JobStatus;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: "ALL" | JobStatus) => void;
}

export function JobFilters({ query, status, onQueryChange, onStatusChange }: JobFiltersProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgb(15_23_42/0.03)] sm:grid-cols-[1fr_200px]">
      <label className="grid gap-1.5 text-sm font-medium text-slate-700" htmlFor="job-search">
        Search
        <input
          id="job-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by company or role"
          className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-3 focus:ring-slate-100"
        />
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-slate-700" htmlFor="status-filter">
        Status
        <select
          id="status-filter"
          value={status}
          onChange={(event) => onStatusChange(event.target.value as "ALL" | JobStatus)}
          className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-slate-950 outline-none transition focus:border-slate-500 focus:ring-3 focus:ring-slate-100"
        >
          <option value="ALL">All statuses</option>
          {JOB_STATUSES.map((item) => <option key={item} value={item}>{STATUS_LABELS[item]}</option>)}
        </select>
      </label>
    </div>
  );
}
