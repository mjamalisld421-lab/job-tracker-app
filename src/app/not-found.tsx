import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <main className="grid min-h-[65vh] place-items-center py-16">
      <Container className="max-w-lg text-center">
        <p className="text-sm font-bold text-blue-600">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Job not found</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">This application may have been deleted, or the link may be incorrect.</p>
        <Link href="/jobs" className="mt-6 inline-flex rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Back to jobs</Link>
      </Container>
    </main>
  );
}
