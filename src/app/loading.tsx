import { Container } from "@/components/layout/container";

export default function Loading() {
  return (
    <main className="py-10 sm:py-14" aria-busy="true" aria-label="Loading content">
      <Container>
        <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-10 w-80 max-w-full animate-pulse rounded bg-slate-200" />
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }, (_, index) => <div key={index} className="h-32 animate-pulse rounded-xl border border-slate-200 bg-white" />)}
        </div>
      </Container>
    </main>
  );
}
