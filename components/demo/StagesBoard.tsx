"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { MAIL_SERVICE, STUDIO } from "@/lib/demo/brand";
import { STAGE_META } from "@/lib/demo/seed";
import { useDemoStore } from "@/lib/demo/store";
import { STAGES, type RelationshipStage } from "@/lib/demo/types";

function isStage(value: string | null): value is RelationshipStage {
  return STAGES.includes(value as RelationshipStage);
}

export function StagesBoard() {
  const store = useDemoStore();
  const searchParams = useSearchParams();
  const fromQuery = searchParams.get("stage");
  const active: RelationshipStage | "All" = isStage(fromQuery) ? fromQuery : "All";

  const filtered = useMemo(
    () =>
      active === "All"
        ? store.contacts
        : store.contacts.filter((contact) => contact.stage === active),
    [active, store.contacts],
  );

  const counts = useMemo(() => {
    const next = Object.fromEntries(STAGES.map((stage) => [stage, 0])) as Record<
      RelationshipStage,
      number
    >;
    for (const contact of store.contacts) {
      next[contact.stage] += 1;
    }
    return next;
  }, [store.contacts]);

  function draftFor(contactId: string) {
    return store.messages.find((message) => message.contactId === contactId);
  }

  if (!store.hydrated) {
    return <div className="px-4 py-16 text-center text-sm text-muted">Loading trial state…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-xs font-bold uppercase tracking-widest text-accent">
        {MAIL_SERVICE.name}-first · the living book
      </p>
      <h1 className="font-display mt-1 text-3xl font-bold text-ink">Lead stages</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Everyone on the {STUDIO.short} list, by the segment they already sit in.
        Today is a slice of this board — not a separate spreadsheet.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterChip href="/stages" selected={active === "All"} label={`All ${store.contacts.length}`} />
        {STAGES.map((stage) => (
          <FilterChip
            key={stage}
            href={`/stages?stage=${encodeURIComponent(stage)}`}
            selected={active === stage}
            label={`${stage} ${counts[stage]}`}
          />
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-xl bg-paper">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface">
                {["Person", "What they need", "Last touch", "Segment", ""].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact) => {
                const draft = draftFor(contact.id);
                return (
                  <tr key={contact.id} className="border-t border-[rgba(36,28,24,0.06)]">
                    <td className="px-5 py-3.5 text-sm font-medium text-ink">
                      {contact.displayName}
                      {contact.dueToday ? (
                        <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-accent">
                          today
                        </span>
                      ) : null}
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-muted">{contact.need}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-[13px] text-muted">
                      {contact.lastTouch}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STAGE_META[contact.stage].chip}`}
                      >
                        {contact.stage}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {draft ? (
                        <Link
                          href={`/review?id=${draft.id}`}
                          className="rounded-md border border-[rgba(36,28,24,0.12)] px-3 py-1.5 text-xs font-semibold text-accent"
                        >
                          Open draft
                        </Link>
                      ) : (
                        <span className="text-xs text-muted">On the list · no draft yet</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  href,
  selected,
  label,
}: {
  href: string;
  selected: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-1.5 text-sm font-medium ${
        selected ? "bg-accent text-white" : "bg-paper text-ink hover:bg-accent-light"
      }`}
    >
      {label}
    </Link>
  );
}
