"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CaptureContext, useCaptureMode } from "@/lib/demo/capture-context";
import { captureHref, parseCaptureParams } from "@/lib/demo/capture";
import { usePresented } from "@/lib/demo/presented";
import { DemoStoreProvider, useDemoStore } from "@/lib/demo/store";
import { PRODUCT } from "@/lib/demo/brand";
import { DemoBanner } from "./DemoBanner";

const NAV = [
  { href: "/today", label: "Today" },
  { href: "/stages", label: "Stages" },
  { href: "/review", label: "Review" },
];

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { resetDemo, hydrated } = useDemoStore();
  const capture = useCaptureMode();
  const { studio } = usePresented();
  const capturing = capture.enabled;

  return (
    <div
      className={`bg-surface ${capturing ? "min-h-screen" : "min-h-screen"}`}
      data-portfolio-capture="app"
      {...(hydrated ? { "data-portfolio-ready": "" } : {})}
    >
      {capturing ? null : <DemoBanner />}
      <header
        className={`sticky z-40 border-b border-[rgba(36,28,24,0.1)] bg-paper/95 backdrop-blur ${
          capturing ? "top-0" : "top-9"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href={captureHref("/", capturing)} className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-[11px] font-bold text-white">
              Q
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">{PRODUCT.name}</p>
              <p className="truncate text-xs text-muted">
                {capturing ? studio.short : `Author29 trial · ${studio.short}`}
              </p>
            </div>
          </Link>
          {capturing ? null : (
            <button
              type="button"
              onClick={resetDemo}
              className="rounded-full border border-[rgba(36,28,24,0.12)] px-3 py-1.5 text-xs font-semibold text-muted hover:bg-surface"
            >
              Reset trial
            </button>
          )}
        </div>
        <nav className="overflow-x-auto border-t border-[rgba(36,28,24,0.08)]">
          <div className="mx-auto flex max-w-6xl gap-1 px-4 py-2">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={captureHref(item.href, capturing)}
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

function useCaptureFromShell() {
  const searchParams = useSearchParams();
  return parseCaptureParams(searchParams);
}

export function DemoShell({ children }: { children: React.ReactNode }) {
  const capture = useCaptureFromShell();
  return (
    <CaptureContext.Provider value={capture}>
      <DemoStoreProvider capture={capture}>
        <ShellInner>{children}</ShellInner>
      </DemoStoreProvider>
    </CaptureContext.Provider>
  );
}
