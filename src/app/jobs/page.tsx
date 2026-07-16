import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { JobList } from "@/components/jobs/job-list";
import { serializeJob } from "@/lib/jobs";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jobs",
  description: "Search, filter, and manage tracked job opportunities.",
};

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="py-10 sm:py-14">
      <Container>
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
          <div><p className="mb-2 text-sm font-semibold text-blue-600">Application pipeline</p><h1 className="text-3xl font-bold tracking-tight text-slate-950">All jobs</h1><p className="mt-2 text-sm leading-6 text-slate-500">Search, filter, and manage every opportunity in your pipeline.</p></div>
          <Link href="/jobs/new" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto">Add a job</Link>
        </div>
        <JobList initialJobs={jobs.map(serializeJob)} />
      </Container>
    </main>
  );
}
