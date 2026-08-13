"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MAIL_SERVICE, OPERATOR, STUDIO } from "@/lib/demo/brand";
import { STAGE_META } from "@/lib/demo/seed";
import { useDemoStore } from "@/lib/demo/store";
import { STAGES, type RelationshipStage } from "@/lib/demo/types";
import { MailchimpPanel, MailchimpSheet } from "./MailchimpMock";

function kindLabel(kind: string) {
  if (kind === "inquiry") return "New inquiry follow-up";
  if (kind === "quote") return "Quote sitting";
  if (kind === "project") return "In-project note";
  return "Re-engage";
}

export function TodayHome() {
  const store = useDemoStore();
  const [mailOpen, setMailOpen] = useState(false);

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

  const dueToday = store.contacts.filter((contact) => contact.dueToday);
  const draftsWaiting = store.messages.filter((message) => message.status === "queued");
  const dueDrafts = draftsWaiting.filter((message) => {
    const contact = store.contacts.find((c) => c.id === message.contactId);
    return contact?.dueToday;
  });

  if (!store.hydrated) {
    return <div className="px-4 py-16 text-center text-sm text-muted">Loading trial state…</div>;
  }

  const dateLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            {STUDIO.name} · {OPERATOR.firstName}&apos;s book
          </p>
          <h1 className="font-display mt-1 text-3xl font-bold text-ink">Outreach — Today</h1>
          <p className="mt-2 text-sm text-muted">
            {dateLabel} · {dueToday.length} need a touch · {draftsWaiting.length} drafts
            waiting · on {MAIL_SERVICE.name}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMailOpen(true)}
          className="rounded-md border border-[rgba(36,28,24,0.12)] bg-paper px-4 py-2 text-sm font-semibold text-accent"
        >
          Open {MAIL_SERVICE.name} →
        </button>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((stage) => (
          <Link
            key={stage}
            href={`/stages?stage=${encodeURIComponent(stage)}`}
            className="rounded-xl border-t-[3px] bg-paper px-5 py-4"
            style={{
              borderTopColor:
                stage === "New inquiry"
                  ? "#b54a32"
                  : stage === "Quote out"
                    ? "#a67c52"
                    : stage === "In project"
                      ? "#2f6b4a"
                      : "#5c534c",
            }}
          >
            <p className="font-display text-3xl leading-none text-ink">{counts[stage]}</p>
            <p className="mt-2 text-sm font-semibold text-ink">{stage}</p>
            <p className="mt-1 text-[11px] text-muted">{STAGE_META[stage].segment} segment</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-xl bg-paper">
          <div className="flex items-center justify-between border-b border-[rgba(36,28,24,0.08)] px-5 py-4">
            <p className="text-sm font-semibold text-ink">Who needs a touch</p>
            <Link href="/stages" className="text-xs font-semibold text-accent">
              View stages →
            </Link>
          </div>
          <ul>
            {dueToday.map((contact) => (
              <li
                key={contact.id}
                className="flex flex-wrap items-center gap-3 border-b border-[rgba(36,28,24,0.06)] px-5 py-3.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">{contact.displayName}</p>
                  <p className="mt-0.5 text-xs text-muted">{contact.need}</p>
                </div>
                <p className="text-xs text-muted">{contact.lastTouch}</p>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STAGE_META[contact.stage].chip}`}
                >
                  {contact.stage}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-xl bg-paper">
            <div className="flex items-center justify-between border-b border-[rgba(36,28,24,0.08)] px-4 py-3">
              <p className="text-sm font-semibold text-ink">Drafts waiting</p>
              <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-white">
                {dueDrafts.length}
              </span>
            </div>
            <ul>
              {dueDrafts.slice(0, 4).map((message) => {
                const contact = store.contacts.find((c) => c.id === message.contactId);
                return (
                  <li key={message.id} className="border-b border-[rgba(36,28,24,0.06)] px-4 py-3">
                    <p className="text-sm font-medium text-ink">
                      {contact?.displayName ?? "Unknown"}
                    </p>
                    <p className="text-xs text-muted">{kindLabel(message.kind)}</p>
                    <Link
                      href={`/review?id=${message.id}`}
                      className="mt-1 inline-block text-xs font-semibold text-accent"
                    >
                      Review draft →
                    </Link>
                  </li>
                );
              })}
            </ul>
            {dueDrafts.length === 0 ? (
              <p className="px-4 py-4 text-xs text-muted">
                No drafts waiting for today. Reset trial to start over.
              </p>
            ) : null}
          </div>
          <MailchimpPanel counts={counts} onOpen={() => setMailOpen(true)} />
        </div>
      </div>

      <MailchimpSheet open={mailOpen} onClose={() => setMailOpen(false)} counts={counts} />
    </div>
  );
}
