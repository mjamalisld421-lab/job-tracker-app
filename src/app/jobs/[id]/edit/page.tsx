import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { JobForm } from "@/components/jobs/job-form";
import { serializeJob } from "@/lib/jobs";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit job",
  description: "Update a tracked job opportunity.",
};

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) notFound();

  return (
    <main className="py-10 sm:py-14">
      <Container className="max-w-4xl">
        <div className="mb-7"><p className="mb-2 text-sm font-semibold text-blue-600">Update opportunity</p><h1 className="text-3xl font-bold tracking-tight text-slate-950">Edit job</h1><p className="mt-2 text-sm leading-6 text-slate-500">Keep your application details and next steps current.</p></div>
        <JobForm job={serializeJob(job)} />
      </Container>
    </main>
  );
}
