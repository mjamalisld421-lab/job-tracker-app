import type { JobStatsData } from "@/types/job";

const cards: Array<{ key: keyof JobStatsData; label: string; accent: string }> = [
  { key: "total", label: "Total jobs", accent: "bg-slate-950" },
  { key: "applied", label: "Applied", accent: "bg-blue-500" },
  { key: "interviews", label: "Interviews", accent: "bg-amber-500" },
  { key: "offers", label: "Offers", accent: "bg-emerald-500" },
  { key: "rejected", label: "Rejected", accent: "bg-rose-500" },
];

export function JobStats({ stats }: { stats: JobStatsData }) {
  return (
    <section aria-label="Application overview" className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {cards.map((card, index) => (
        <div key={card.key} className={`rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgb(15_23_42/0.03)] sm:p-5 ${index === 0 ? "col-span-2 lg:col-span-1" : ""}`}>
          <div className={`mb-4 h-1 w-8 rounded-full ${card.accent}`} />
          <p className="text-sm font-medium text-slate-500">{card.label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{stats[card.key]}</p>
        </div>
      ))}
    </section>
  );
}
