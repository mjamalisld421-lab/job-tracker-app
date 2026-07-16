"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { EMPTY_JOB_INPUT, JOB_STATUSES, JOB_TYPES, STATUS_LABELS, TYPE_LABELS } from "@/lib/jobs";
import type { Job, JobInput, JobStatus, JobType } from "@/types/job";

interface JobFormProps {
  job?: Job;
}

function initialValues(job?: Job): JobInput {
  if (!job) return EMPTY_JOB_INPUT;
  return {
    company: job.company,
    role: job.role,
    location: job.location ?? "",
    salary: job.salary ?? "",
    status: job.status,
    type: job.type,
    appliedAt: job.appliedAt?.slice(0, 10) ?? "",
    notes: job.notes ?? "",
  };
}

export function JobForm({ job }: JobFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<JobInput>(() => initialValues(job));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof JobInput>(key: K, value: JobInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: "" }));
  }

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!values.company.trim()) nextErrors.company = "Company is required.";
    if (!values.role.trim()) nextErrors.role = "Role is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(job ? `/api/jobs/${job.id}` : "/api/jobs", {
        method: job ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { errors?: Record<string, string>; error?: string };

      if (!response.ok) {
        setErrors(result.errors ?? { form: result.error ?? "Unable to save this job." });
        return;
      }

      router.push("/jobs");
      router.refresh();
    } catch {
      setErrors({ form: "Unable to reach the server. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Company *" name="company" autoComplete="organization" maxLength={100} value={values.company} error={errors.company} onChange={(event) => update("company", event.target.value)} placeholder="e.g. Linear" />
        <Input label="Role *" name="role" maxLength={120} value={values.role} error={errors.role} onChange={(event) => update("role", event.target.value)} placeholder="e.g. Senior Frontend Engineer" />
        <Input label="Location" name="location" maxLength={120} value={values.location} error={errors.location} onChange={(event) => update("location", event.target.value)} placeholder="e.g. Remote, Berlin" />
        <Input label="Salary" name="salary" maxLength={100} value={values.salary} error={errors.salary} onChange={(event) => update("salary", event.target.value)} placeholder="e.g. $120k–$145k" />
        <Select label="Status" name="status" value={values.status} error={errors.status} onChange={(event) => update("status", event.target.value as JobStatus)}>
          {JOB_STATUSES.map((status) => <option key={status} value={status}>{STATUS_LABELS[status]}</option>)}
        </Select>
        <Select label="Employment type" name="type" value={values.type} error={errors.type} onChange={(event) => update("type", event.target.value as JobType)}>
          {JOB_TYPES.map((type) => <option key={type} value={type}>{TYPE_LABELS[type]}</option>)}
        </Select>
        <Input label="Application date" name="appliedAt" type="date" value={values.appliedAt} error={errors.appliedAt} onChange={(event) => update("appliedAt", event.target.value)} />
        <label className="grid gap-1.5 text-sm font-medium text-slate-700 sm:col-span-2" htmlFor="notes">
          Notes
          <textarea id="notes" name="notes" rows={5} maxLength={2000} value={values.notes} aria-invalid={Boolean(errors.notes)} aria-describedby={errors.notes ? "notes-error" : undefined} onChange={(event) => update("notes", event.target.value)} placeholder="Interview details, contacts, next steps…" className={`rounded-lg border bg-white px-3 py-2.5 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-3 focus:ring-slate-100 ${errors.notes ? "border-rose-400" : "border-slate-200"}`} />
          {errors.notes && <span id="notes-error" className="text-xs font-normal text-rose-600">{errors.notes}</span>}
        </label>
      </div>
      {errors.form && <p role="alert" className="mt-5 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{errors.form}</p>}
      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
        <Link href="/jobs" className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancel</Link>
        <Button type="submit" disabled={submitting}>{submitting ? "Saving…" : job ? "Save changes" : "Add job"}</Button>
      </div>
    </form>
  );
}
