import { Suspense } from "react";
import { ReviewDesk } from "@/components/demo/ReviewDesk";

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="px-4 py-16 text-center text-sm text-muted">Loading review…</div>}>
      <ReviewDesk />
    </Suspense>
  );
}
