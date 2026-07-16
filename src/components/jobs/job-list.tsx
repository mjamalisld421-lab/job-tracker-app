"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { JobCard } from "@/components/jobs/job-card";
import { JobFilters } from "@/components/jobs/job-filters";
import type { Job, JobStatus } from "@/types/job";

export function JobList({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ALL" | JobStatus>("ALL");

  const filteredJobs = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesQuery = !needle || job.company.toLowerCase().includes(needle) || job.role.toLowerCase().includes(needle);
      return matchesQuery && (status === "ALL" || job.status === status);
    });
  }, [jobs, query, status]);

  const filtersActive = query.trim().length > 0 || status !== "ALL";

  function clearFilters() {
    setQuery("");
    setStatus("ALL");
  }

  return (
    <div className="grid gap-6">
      <JobFilters query={query} status={status} onQueryChange={setQuery} onStatusChange={setStatus} />
      <div className="-mt-2 flex min-h-7 flex-wrap items-center justify-between gap-2 text-sm text-slate-500" aria-live="polite">
        <p>Showing <span className="font-semibold text-slate-700">{filteredJobs.length}</span> of {jobs.length} {jobs.length === 1 ? "job" : "jobs"}</p>
        {filtersActive && <button type="button" onClick={clearFilters} className="font-semibold text-slate-700 underline-offset-4 hover:text-slate-950 hover:underline">Clear filters</button>}
      </div>
      {filteredJobs.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => <JobCard key={job.id} job={job} onDeleted={(id) => setJobs((items) => items.filter((item) => item.id !== id))} />)}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-xl bg-slate-100 text-sm font-bold text-slate-500" aria-hidden="true">JT</div>
          <h2 className="mt-4 text-lg font-bold text-slate-950">{jobs.length === 0 ? "No jobs tracked yet" : "No matching jobs"}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            {jobs.length === 0 ? "Add your first opportunity to start building a clear view of your job search." : "Try a different search term or status filter."}
          </p>
          {jobs.length === 0 ? (
            <Link href="/jobs/new" className="mt-5 inline-flex rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Add your first job</Link>
          ) : (
            <button type="button" onClick={clearFilters} className="mt-5 inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Clear search and filters</button>
          )}
        </div>
      )}
    </div>
  );
}
