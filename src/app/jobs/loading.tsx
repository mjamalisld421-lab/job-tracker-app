import { Container } from "@/components/layout/container";

export default function JobsLoading() {
  return (
    <main className="py-10 sm:py-14" aria-busy="true" aria-label="Loading jobs">
      <Container>
        <div className="h-10 w-48 animate-pulse rounded bg-slate-200" />
        <div className="mt-8 h-24 animate-pulse rounded-xl border border-slate-200 bg-white" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => <div key={index} className="h-72 animate-pulse rounded-xl border border-slate-200 bg-white" />)}
        </div>
      </Container>
    </main>
  );
}
