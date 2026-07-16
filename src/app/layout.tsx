import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "JobTrack — Application Tracker", template: "%s | JobTrack" },
  description: "A focused dashboard for managing job applications from saved opportunity to offer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        <Navbar />
        {children}
        <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">JobTrack · Built for a more organized job search</footer>
      </body>
    </html>
  );
}
