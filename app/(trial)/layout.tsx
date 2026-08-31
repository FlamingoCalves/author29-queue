import type { Metadata } from "next";
import { Suspense } from "react";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata: Metadata = {
  title: "Queue — Author29 trial",
  description: "Interactive trial. Fictional sample data. Nothing sends.",
};

export default function TrialLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="px-4 py-16 text-center text-sm text-muted">Loading…</div>}>
      <DemoShell>{children}</DemoShell>
    </Suspense>
  );
}
