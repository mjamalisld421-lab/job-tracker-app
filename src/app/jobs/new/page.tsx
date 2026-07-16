import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { JobForm } from "@/components/jobs/job-form";

export const metadata: Metadata = {
  title: "Add a job",
  description: "Add a job opportunity to the application pipeline.",
};

export default function NewJobPage() {
  return (
    <main className="py-10 sm:py-14">
      <Container className="max-w-4xl">
        <div className="mb-7"><p className="mb-2 text-sm font-semibold text-blue-600">New opportunity</p><h1 className="text-3xl font-bold tracking-tight text-slate-950">Add a job</h1><p className="mt-2 text-sm leading-6 text-slate-500">Capture the details now so your next step never gets lost.</p></div>
        <JobForm />
      </Container>
    </main>
  );
}
