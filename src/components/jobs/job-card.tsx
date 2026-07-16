"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TYPE_LABELS } from "@/lib/jobs";
import type { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  onDeleted: (id: string) => void;
}

function formatDate(date: string | null) {
  if (!date) return "Not applied yet";
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}

export function JobCard({ job, onDeleted }: JobCardProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function deleteJob() {
    setDeleting(true);
    setError("");
    try {
      const response = await fetch(`/api/jobs/${job.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Unable to delete this job.");
      onDeleted(job.id);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to delete this job.");
      setDeleting(false);
      setConfirming(false);
    }
  }

  return (
    <article className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgb(15_23_42/0.03)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600" aria-hidden="true">{job.company.charAt(0).toUpperCase()}</span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-500">{job.company}</p>
            <h2 className="mt-0.5 truncate text-lg font-bold tracking-tight text-slate-950">{job.role}</h2>
          </div>
        </div>
        <Badge status={job.status} />
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div><dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Location</dt><dd className="mt-1 truncate font-medium text-slate-700">{job.location || "Remote / flexible"}</dd></div>
        <div><dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Type</dt><dd className="mt-1 font-medium text-slate-700">{TYPE_LABELS[job.type]}</dd></div>
        <div><dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Salary</dt><dd className="mt-1 truncate font-medium text-slate-700">{job.salary || "Not specified"}</dd></div>
        <div><dt className="text-xs font-medium uppercase tracking-wide text-slate-400">Applied</dt><dd className="mt-1 font-medium text-slate-700">{formatDate(job.appliedAt)}</dd></div>
      </dl>
      {job.notes && <p className="mt-4 line-clamp-2 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-500">{job.notes}</p>}
      {error && <p role="alert" className="mt-4 text-sm text-rose-600">{error}</p>}
      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
        <Link href={`/jobs/${job.id}/edit`} className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          Edit details
        </Link>
        <Button variant="ghost" className="text-rose-600 hover:bg-rose-50 hover:text-rose-700" onClick={() => setConfirming(true)}>
          Delete job
        </Button>
      </div>

      {confirming && (
        <div className="absolute inset-0 z-10 grid place-items-center rounded-xl bg-white/95 p-6 text-center backdrop-blur-sm" role="alertdialog" aria-modal="true" aria-labelledby={`delete-${job.id}`}>
          <div>
            <h3 id={`delete-${job.id}`} className="font-bold text-slate-950">Delete this application?</h3>
            <p className="mt-2 text-sm text-slate-500">This action cannot be undone.</p>
            <div className="mt-5 flex justify-center gap-2">
              <Button variant="secondary" disabled={deleting} onClick={() => setConfirming(false)}>Cancel</Button>
              <Button variant="danger" disabled={deleting} onClick={deleteJob}>{deleting ? "Deleting…" : "Delete job"}</Button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
