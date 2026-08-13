"use client";

import Link from "next/link";
import { useState } from "react";
import { OPERATOR, PRODUCT, STUDIO, USE_CASES, type UseCaseId } from "@/lib/demo/brand";

export function StartScreen() {
  const [activeId, setActiveId] = useState<UseCaseId>(USE_CASES[0].id);
  const active = USE_CASES.find((useCase) => useCase.id === activeId) ?? USE_CASES[0];

  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink">
      <header className="border-b border-[rgba(36,28,24,0.1)] bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-sm font-bold text-white">
              Q
            </div>
            <div>
              <p className="text-sm font-bold">{PRODUCT.name}</p>
              <p className="text-xs text-muted">Author29 · interactive trial</p>
            </div>
          </div>
          <Link
            href="/today"
            className="rounded-full bg-accent px-4 py-2 text-xs font-bold text-white sm:text-sm"
          >
            Enter trial
          </Link>
        </div>
      </header>

      <main className="relative flex flex-1 flex-col">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 80% 0%, rgba(181,74,50,0.16), transparent), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(166,124,82,0.16), transparent)",
          }}
        />

        <section className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            Try the product · fictional sample · nothing sends
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.1] md:text-6xl">
            Who needs a touch today.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {PRODUCT.name} sits on the list you already have — Mailchimp, in this
            sample — and writes a particular note for the person in front of you.
            Today, stages, then human review. Not a blast. Not an inherited-book
            launch. The playable sample is {STUDIO.name}, with {OPERATOR.name} as
            principal.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/today"
              className="rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white hover:bg-accent-dark"
            >
              Enter {PRODUCT.name} →
            </Link>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl bg-paper">
            <div className="grid gap-0 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)]">
              <div className="border-b border-[rgba(36,28,24,0.08)] px-5 py-6 md:border-b-0 md:border-r md:px-7 md:py-8">
                <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
                  Same motion · any book
                </p>
                <p className="font-display mt-3 text-2xl font-bold leading-snug text-ink md:text-[28px]">
                  One pattern for every living book.
                </p>
                <div className="mt-5 rounded-xl bg-accent-light px-4 py-4">
                  <p className="text-sm font-semibold text-accent-dark">{active.label}</p>
                  <p className="mt-1 text-xs font-medium text-accent">{active.example}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/80">{active.how}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{active.value}</p>
                </div>
              </div>

              <div className="px-5 py-6 md:px-7 md:py-8">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted">
                  Who this is for
                </p>
                <div className="mt-4 grid gap-2" role="tablist" aria-label="Use cases">
                  {USE_CASES.map((useCase) => {
                    const selected = useCase.id === activeId;
                    return (
                      <button
                        key={useCase.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActiveId(useCase.id)}
                        className={`rounded-xl px-3.5 py-3 text-left transition ${
                          selected
                            ? "bg-accent text-white"
                            : "bg-surface text-ink hover:bg-accent-light"
                        }`}
                      >
                        <p className="text-sm font-semibold">{useCase.label}</p>
                        <p
                          className={`mt-0.5 text-xs leading-relaxed ${
                            selected ? "text-white/75" : "text-muted"
                          }`}
                        >
                          {useCase.example}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <ol className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              "Today — who needs a touch, on the list you already keep",
              "Stages — the living book, Mailchimp-first",
              "Review — a particular draft. You still send.",
            ].map((step, i) => (
              <li key={step} className="rounded-2xl bg-paper px-4 py-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm font-semibold leading-snug">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="border-t border-[rgba(36,28,24,0.1)] py-6 text-center text-xs text-muted">
        Author29 trial · your copy stays in this browser · nothing sends
      </footer>
    </div>
  );
}
