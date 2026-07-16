import type { JobStatus, JobType } from "@prisma/client";

export type { JobStatus, JobType };

export interface Job {
  id: string;
  company: string;
  role: string;
  location: string | null;
  salary: string | null;
  status: JobStatus;
  type: JobType;
  appliedAt: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface JobInput {
  company: string;
  role: string;
  location: string;
  salary: string;
  status: JobStatus;
  type: JobType;
  appliedAt: string;
  notes: string;
}

export interface JobStatsData {
  total: number;
  applied: number;
  interviews: number;
  offers: number;
  rejected: number;
}
