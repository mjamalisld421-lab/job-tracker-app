"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export default function ErrorPage({ error, unstable_retry }: { error: Error & { digest?: string }; unstable_retry: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="grid min-h-[65vh] place-items-center py-16">
      <Container className="max-w-lg text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-xl bg-rose-50 text-xl text-rose-600" aria-hidden="true">!</div>
        <h1 className="mt-5 text-2xl font-bold text-slate-950">Something went wrong</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">We couldn’t load this view. Check your local database connection and try again.</p>
        <Button className="mt-6" onClick={unstable_retry}>Try again</Button>
      </Container>
    </main>
  );
}
