import { AUTHOR29_URL } from "@/lib/author29";

export function Author29Bar() {
  return (
    <div className="sticky top-0 z-[60] bg-[#0c0c0d] text-[#f5f2ea]">
      <div className="mx-auto flex h-9 max-w-6xl items-center justify-between gap-3 px-4">
        <a
          href={AUTHOR29_URL}
          className="inline-flex min-w-0 items-baseline gap-0.5"
        >
          <span className="font-a29-display truncate text-[15px] font-bold tracking-tight">
            Author
          </span>
          <span className="font-a29-mono text-[15px] font-medium text-[#c17f59]">
            29
          </span>
        </a>
        <a
          href={AUTHOR29_URL}
          className="shrink-0 text-[11px] font-semibold tracking-wide text-[#8a847c] hover:text-[#e8a87c]"
        >
          Back to Author29 →
        </a>
      </div>
    </div>
  );
}
