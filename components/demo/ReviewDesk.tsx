"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MAIL_SERVICE, OPERATOR, STUDIO } from "@/lib/demo/brand";
import { STAGE_META } from "@/lib/demo/seed";
import { useDemoStore } from "@/lib/demo/store";

export function ReviewDesk() {
  const store = useDemoStore();
  const searchParams = useSearchParams();
  const fromQuery = searchParams.get("id");
  const [selectedId, setSelectedId] = useState<string | null>(fromQuery);
  const [editMode, setEditMode] = useState(false);
  const [draftSubject, setDraftSubject] = useState("");
  const [draftText, setDraftText] = useState("");
  const [flash, setFlash] = useState<string | null>(null);

  const queued = useMemo(
    () => store.messages.filter((message) => message.status === "queued"),
    [store.messages],
  );

  const selected = useMemo(() => {
    const fromId = store.messages.find((m) => m.id === selectedId);
    if (fromId) return fromId;
    return queued[0] ?? store.messages[0] ?? null;
  }, [queued, selectedId, store.messages]);

  useEffect(() => {
    if (fromQuery) setSelectedId(fromQuery);
  }, [fromQuery]);

  useEffect(() => {
    setFlash(null);
    setEditMode(false);
    setSelectedId(fromQuery ?? store.messages[0]?.id ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.revision]);

  useEffect(() => {
    if (!selected) return;
    setDraftSubject(selected.subject);
    setDraftText(selected.body);
    setEditMode(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id]);

  function contactFor(id: string) {
    return store.contacts.find((c) => c.id === id);
  }

  function simulateSend() {
    if (!selected) return;
    store.setMessageStatus(selected.id, "sent");
    setFlash("Simulated send — nothing left this browser. Mailchimp was not called.");
    const next = store.messages.find((m) => m.id !== selected.id && m.status === "queued");
    if (next) setSelectedId(next.id);
  }

  if (!store.hydrated) {
    return <div className="px-4 py-16 text-center text-sm text-muted">Loading trial state…</div>;
  }

  const selectedContact = selected ? contactFor(selected.contactId) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-xs font-bold uppercase tracking-widest text-accent">
        Human review · {MAIL_SERVICE.name}-first
      </p>
      <h1 className="font-display mt-1 text-3xl font-bold text-ink">Review before send</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Each draft is written from what this person actually needs — last touch,
        segment, the particular pause. You still approve. {STUDIO.short} never
        blasts the list.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="overflow-hidden rounded-xl bg-paper">
          <div className="border-b border-[rgba(36,28,24,0.08)] px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Drafts waiting
            </p>
            <p className="mt-1 text-sm font-semibold text-ink">
              {store.queuedCount} queued · {store.sentCount} simulated
            </p>
          </div>
          <ul>
            {store.messages.map((message) => {
              const contact = contactFor(message.contactId);
              const active = selected?.id === message.id;
              return (
                <li key={message.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(message.id)}
                    className={`flex w-full items-start justify-between gap-2 border-b border-[rgba(36,28,24,0.06)] px-4 py-3 text-left ${
                      active ? "bg-surface" : ""
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-ink">
                        {contact?.displayName ?? "Unknown"}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-muted">
                        {contact?.need}
                      </span>
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        message.status === "sent"
                          ? "bg-[#edf8f3] text-[#2f6b4a]"
                          : message.status === "skipped"
                            ? "bg-surface text-muted"
                            : "bg-[#f3e6d4] text-[#8a5a28]"
                      }`}
                    >
                      {message.status === "sent" ? "simulated" : message.status}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {selected && selectedContact ? (
          <div>
            <div className="mb-4 flex items-center gap-3 rounded-lg border border-[rgba(181,74,50,0.28)] bg-accent-light px-4 py-3 text-[13px] text-accent-dark">
              <span>
                <strong className="text-ink">Human review required.</strong> Nothing
                sends automatically. Approve every message before it would leave{" "}
                {STUDIO.short} through {MAIL_SERVICE.name} — this trial only
                simulates send.
              </span>
            </div>

            {flash ? (
              <div className="mb-4 rounded-lg border border-[#2f6b4a]/25 bg-[#edf8f3] px-4 py-3 text-sm text-[#2a3f35]">
                {flash}
              </div>
            ) : null}

            <div className="rounded-xl bg-paper">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[rgba(36,28,24,0.08)] px-6 py-5">
                <div>
                  <p className="text-xs text-muted">
                    Draft · {selectedContact.stage} · {MAIL_SERVICE.name} segment:{" "}
                    {selectedContact.segment}
                  </p>
                  <h2 className="font-display mt-1 text-[22px] text-ink">
                    Message for {selectedContact.displayName}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{selectedContact.focus}</p>
                </div>
                {selected.status === "sent" ? (
                  <span className="rounded-full bg-[#dcfce7] px-4 py-1.5 text-xs font-semibold text-[#2f6b4a]">
                    ✓ Simulated send
                  </span>
                ) : selected.status === "skipped" ? (
                  <span className="rounded-full bg-surface px-4 py-1.5 text-xs font-semibold text-muted">
                    Skipped
                  </span>
                ) : null}
              </div>

              <div className="grid gap-4 border-b border-[rgba(36,28,24,0.08)] px-6 py-4 sm:grid-cols-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    What they need
                  </p>
                  <p className="mt-1 text-sm text-ink">{selectedContact.need}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Last touch
                  </p>
                  <p className="mt-1 text-sm text-ink">{selectedContact.lastTouch}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Segment
                  </p>
                  <p className="mt-1">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STAGE_META[selectedContact.stage].chip}`}
                    >
                      {selectedContact.segment}
                    </span>
                  </p>
                </div>
              </div>

              <div className="px-6 py-6">
                {editMode ? (
                  <div className="space-y-3">
                    <input
                      value={draftSubject}
                      onChange={(e) => setDraftSubject(e.target.value)}
                      className="w-full rounded-lg border border-accent bg-surface px-4 py-2.5 text-sm font-semibold text-ink outline-none"
                      aria-label="Subject"
                    />
                    <textarea
                      value={draftText}
                      onChange={(e) => setDraftText(e.target.value)}
                      className="min-h-[240px] w-full rounded-lg border border-accent bg-surface p-4 text-sm leading-relaxed text-ink outline-none"
                      aria-label="Draft body"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Subject
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink">{selected.subject}</p>
                    <div className="mt-4 whitespace-pre-wrap rounded-lg border border-[rgba(36,28,24,0.1)] bg-surface px-6 py-5 text-[15px] leading-relaxed text-ink">
                      {selected.body}
                    </div>
                  </div>
                )}
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
                  <span>
                    {MAIL_SERVICE.name} segment:{" "}
                    <strong className="text-ink">{selectedContact.segment}</strong>
                  </span>
                  <span>Send window: {selected.sendWindow}</span>
                  <span>1 recipient · first name only</span>
                  <span>From {OPERATOR.name}</span>
                </div>
              </div>

              {selected.status === "queued" ? (
                <div className="flex flex-wrap gap-2.5 border-t border-[rgba(36,28,24,0.08)] px-6 py-4">
                  {editMode ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          store.updateMessageSubject(selected.id, draftSubject);
                          store.updateMessageBody(selected.id, draftText);
                          setEditMode(false);
                        }}
                        className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white"
                      >
                        Save edits
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDraftSubject(selected.subject);
                          setDraftText(selected.body);
                          setEditMode(false);
                        }}
                        className="rounded-md border border-[rgba(36,28,24,0.12)] px-5 py-2.5 text-sm text-muted"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={simulateSend}
                        className="rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
                      >
                        Looks good — simulate send
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditMode(true)}
                        className="rounded-md border border-[rgba(36,28,24,0.12)] px-5 py-2.5 text-sm text-ink"
                      >
                        Edit first
                      </button>
                      <button
                        type="button"
                        onClick={() => store.setMessageStatus(selected.id, "skipped")}
                        className="rounded-md px-4 py-2.5 text-sm text-red"
                      >
                        Skip
                      </button>
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="rounded-xl bg-paper px-6 py-10 text-sm text-muted">
            Nothing in the review queue. Reset trial to restore drafts.
          </p>
        )}
      </div>
    </div>
  );
}
