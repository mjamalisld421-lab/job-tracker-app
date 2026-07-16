import type { JobStatus } from "@/types/job";
import { STATUS_LABELS } from "@/lib/jobs";

const styles: Record<JobStatus, string> = {
  SAVED: "bg-slate-100 text-slate-700 ring-slate-200",
  APPLIED: "bg-blue-50 text-blue-700 ring-blue-200",
  INTERVIEW: "bg-amber-50 text-amber-700 ring-amber-200",
  OFFER: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  REJECTED: "bg-rose-50 text-rose-700 ring-rose-200",
};

export function Badge({ status }: { status: JobStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
