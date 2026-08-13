import Link from "next/link";

export function DemoBanner() {
  return (
    <div className="border-b border-[rgba(36,28,24,0.12)] bg-ink px-4 py-2 text-center text-xs font-semibold text-paper">
      Interactive trial · this copy lives in your browser only · nothing sends.{" "}
      <Link href="/" className="underline underline-offset-2">
        Back to start
      </Link>
    </div>
  );
}
