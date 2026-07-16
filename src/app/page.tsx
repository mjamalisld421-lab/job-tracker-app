import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { JobStats } from "@/components/jobs/job-stats";
import { prisma } from "@/lib/prisma";
import { TYPE_LABELS } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [total, applied, interviews, offers, rejected, recentJobs] = await prisma.$transaction([
    prisma.job.count(),
    prisma.job.count({ where: { status: "APPLIED" } }),
    prisma.job.count({ where: { status: "INTERVIEW" } }),
    prisma.job.count({ where: { status: "OFFER" } }),
    prisma.job.count({ where: { status: "REJECTED" } }),
    prisma.job.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
  ]);

  return (
    <main className="py-10 sm:py-14">
      <Container>
        <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-600">Application dashboard</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Keep your search moving.</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">Track every opportunity, next step, and outcome from one focused workspace.</p>
          </div>
          <Link href="/jobs/new" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">Add a job</Link>
        </section>

        <JobStats stats={{ total, applied, interviews, offers, rejected }} />

        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div><h2 className="text-xl font-bold tracking-tight text-slate-950">Recent activity</h2><p className="mt-1 text-sm text-slate-500">Your five most recently updated applications.</p></div>
            <Link href="/jobs" className="shrink-0 text-sm font-semibold text-slate-700 hover:text-slate-950"><span className="sm:hidden">View all</span><span className="hidden sm:inline">View all jobs →</span></Link>
          </div>
          {recentJobs.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgb(15_23_42/0.03)]">
              <div className="hidden grid-cols-[1.4fr_1fr_1fr_auto] gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:grid">
                <span>Opportunity</span><span>Type</span><span>Location</span><span>Status</span>
              </div>
              {recentJobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}/edit`} className="grid gap-3 border-b border-slate-100 px-5 py-4 transition last:border-0 hover:bg-slate-50 sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-center sm:gap-4">
                  <div className="min-w-0"><p className="truncate font-semibold text-slate-950">{job.role}</p><p className="mt-0.5 truncate text-sm text-slate-500">{job.company}</p></div>
                  <span className="text-sm text-slate-600">{TYPE_LABELS[job.type]}</span>
                  <span className="truncate text-sm text-slate-600">{job.location || "Remote / flexible"}</span>
                  <Badge status={job.status} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <div className="mx-auto grid size-12 place-items-center rounded-xl bg-slate-100 text-sm font-bold text-slate-500" aria-hidden="true">JT</div>
              <h2 className="mt-4 text-lg font-bold text-slate-950">Your pipeline is ready</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Add the first opportunity you want to track, then update its status as your application progresses.</p>
              <Link href="/jobs/new" className="mt-5 inline-flex rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Add your first job</Link>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
