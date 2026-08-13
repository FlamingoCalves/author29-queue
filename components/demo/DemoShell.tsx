"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DemoStoreProvider, useDemoStore } from "@/lib/demo/store";
import { PRODUCT, STUDIO } from "@/lib/demo/brand";
import { DemoBanner } from "./DemoBanner";

const NAV = [
  { href: "/today", label: "Today" },
  { href: "/stages", label: "Stages" },
  { href: "/review", label: "Review" },
];

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { resetDemo } = useDemoStore();

  return (
    <div className="min-h-screen bg-surface">
      <DemoBanner />
      <header className="sticky top-9 z-40 border-b border-[rgba(36,28,24,0.1)] bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-[11px] font-bold text-white">
              Q
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">{PRODUCT.name}</p>
              <p className="truncate text-xs text-muted">
                Author29 trial · {STUDIO.short}
              </p>
            </div>
          </Link>
          <button
            type="button"
            onClick={resetDemo}
            className="rounded-full border border-[rgba(36,28,24,0.12)] px-3 py-1.5 text-xs font-semibold text-muted hover:bg-surface"
          >
            Reset trial
          </button>
        </div>
        <nav className="overflow-x-auto border-t border-[rgba(36,28,24,0.08)]">
          <div className="mx-auto flex max-w-6xl gap-1 px-4 py-2">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    active
                      ? "bg-accent text-white"
                      : "text-muted hover:bg-surface hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

export function DemoShell({ children }: { children: React.ReactNode }) {
  return (
    <DemoStoreProvider>
      <ShellInner>{children}</ShellInner>
    </DemoStoreProvider>
  );
}
