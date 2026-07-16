import Link from "next/link";
import { Container } from "@/components/layout/container";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="JobTrack dashboard" className="flex shrink-0 items-center gap-2.5 font-bold tracking-tight text-slate-950">
          <span className="grid size-9 place-items-center rounded-xl bg-slate-950 text-sm text-white">JT</span>
          <span className="hidden sm:inline">JobTrack</span>
        </Link>
        <nav aria-label="Primary navigation" className="flex min-w-0 items-center gap-0.5 sm:gap-2">
          <Link className="rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 sm:px-3" href="/">
            <span className="sm:hidden">Home</span><span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link className="rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 sm:px-3" href="/jobs">
            Jobs
          </Link>
          <Link className="ml-0.5 rounded-lg bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 sm:ml-1 sm:px-3.5" href="/jobs/new">
            <span className="sm:hidden">New</span><span className="hidden sm:inline">Add job</span>
          </Link>
        </nav>
      </Container>
    </header>
  );
}
