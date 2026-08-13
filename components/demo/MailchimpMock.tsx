"use client";

import { MAIL_SERVICE } from "@/lib/demo/brand";
import { STAGE_META } from "@/lib/demo/seed";
import { STAGES, type RelationshipStage } from "@/lib/demo/types";

export function MailchimpPanel({
  counts,
  onOpen,
}: {
  counts: Record<RelationshipStage, number>;
  onOpen: () => void;
}) {
  return (
    <div className="rounded-xl bg-ink px-4 py-4 text-paper">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-paper/50">
        Sits on the list you already have
      </p>
      <p className="mt-2 text-sm font-semibold">{MAIL_SERVICE.name} · mocked</p>
      <p className="mt-1 text-xs leading-relaxed text-paper/65">
        {MAIL_SERVICE.listName} · {MAIL_SERVICE.listCount} contacts · last sync{" "}
        {MAIL_SERVICE.lastSync}. Queue does not replace {MAIL_SERVICE.name} — it
        reads segments and drafts a particular note. Send is simulated.
      </p>
      <ul className="mt-3 space-y-1.5 text-xs text-paper/80">
        {STAGES.map((stage) => (
          <li key={stage} className="flex justify-between gap-3">
            <span>{STAGE_META[stage].segment}</span>
            <span className="font-semibold">{counts[stage]}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onOpen}
        className="mt-4 text-xs font-semibold text-[#e8a87c] hover:underline"
      >
        Open {MAIL_SERVICE.name} segments →
      </button>
    </div>
  );
}

export function MailchimpSheet({
  open,
  onClose,
  counts,
}: {
  open: boolean;
  onClose: () => void;
  counts: Record<RelationshipStage, number>;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#1a1411]/45 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-paper p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
              Simulated {MAIL_SERVICE.name}
            </p>
            <h2 className="font-display mt-1 text-xl font-bold text-ink">
              {MAIL_SERVICE.listName}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="text-xl text-muted">
            ×
          </button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          This trial does not talk to a live mail service. The valuable motion
          is the same: Queue sits on the segments you already keep, writes a
          note for the person in front of you, and waits for a human before
          anything would send.
        </p>
        <ul className="mt-4 divide-y divide-[rgba(36,28,24,0.08)] rounded-xl border border-[rgba(36,28,24,0.08)]">
          {STAGES.map((stage) => (
            <li key={stage} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-medium text-ink">{stage}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STAGE_META[stage].chip}`}>
                {counts[stage]}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted">
          Last sync {MAIL_SERVICE.lastSync} · send window {MAIL_SERVICE.sendWindow} ·
          nothing leaves this browser
        </p>
      </div>
    </div>
  );
}
