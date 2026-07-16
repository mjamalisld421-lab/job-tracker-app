import type { Job as PrismaJob, JobStatus, JobType } from "@prisma/client";
import type { Job, JobInput } from "@/types/job";

export const JOB_STATUSES = ["SAVED", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"] as const satisfies readonly JobStatus[];
export const JOB_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"] as const satisfies readonly JobType[];

export const STATUS_LABELS: Record<JobStatus, string> = {
  SAVED: "Saved",
  APPLIED: "Applied",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  REJECTED: "Rejected",
};

export const TYPE_LABELS: Record<JobType, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  FREELANCE: "Freelance",
};

export const EMPTY_JOB_INPUT: JobInput = {
  company: "",
  role: "",
  location: "",
  salary: "",
  status: "SAVED",
  type: "FULL_TIME",
  appliedAt: "",
  notes: "",
};

export function serializeJob(job: PrismaJob): Job {
  return {
    ...job,
    appliedAt: job.appliedAt?.toISOString() ?? null,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  };
}

export function validateJobInput(value: unknown):
  | { success: true; data: JobInput }
  | { success: false; errors: Record<string, string> } {
  if (!value || typeof value !== "object") {
    return { success: false, errors: { form: "A valid job payload is required." } };
  }

  const input = value as Record<string, unknown>;
  const clean = (field: string) =>
    typeof input[field] === "string" ? input[field].trim() : "";
  const company = clean("company");
  const role = clean("role");
  const status = clean("status") as JobStatus;
  const type = clean("type") as JobType;
  const appliedAt = clean("appliedAt");
  const errors: Record<string, string> = {};

  if (!company) errors.company = "Company is required.";
  if (company.length > 100) errors.company = "Company must be 100 characters or fewer.";
  if (!role) errors.role = "Role is required.";
  if (role.length > 120) errors.role = "Role must be 120 characters or fewer.";
  if (clean("location").length > 120) errors.location = "Location must be 120 characters or fewer.";
  if (clean("salary").length > 100) errors.salary = "Salary must be 100 characters or fewer.";
  if (clean("notes").length > 2000) errors.notes = "Notes must be 2,000 characters or fewer.";
  if (!JOB_STATUSES.includes(status)) errors.status = "Select a valid status.";
  if (!JOB_TYPES.includes(type)) errors.type = "Select a valid job type.";
  if (appliedAt && Number.isNaN(Date.parse(`${appliedAt}T00:00:00`))) {
    errors.appliedAt = "Enter a valid application date.";
  }

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      company,
      role,
      location: clean("location"),
      salary: clean("salary"),
      status,
      type,
      appliedAt,
      notes: clean("notes"),
    },
  };
}

export function toPrismaJobData(input: JobInput) {
  return {
    company: input.company,
    role: input.role,
    location: input.location || null,
    salary: input.salary || null,
    status: input.status,
    type: input.type,
    appliedAt: input.appliedAt ? new Date(`${input.appliedAt}T00:00:00.000Z`) : null,
    notes: input.notes || null,
  };
}
