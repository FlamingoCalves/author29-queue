import { Suspense } from "react";
import { StagesBoard } from "@/components/demo/StagesBoard";

export default function StagesPage() {
  return (
    <Suspense fallback={<div className="px-4 py-16 text-center text-sm text-muted">Loading stages…</div>}>
      <StagesBoard />
    </Suspense>
  );
}
