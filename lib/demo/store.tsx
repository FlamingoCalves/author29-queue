"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createSeedState } from "./seed";
import type { DemoState, MessageStatus } from "./types";

const STORAGE_KEY = "a29-queue-v3";

type DemoStore = DemoState & {
  hydrated: boolean;
  revision: number;
  queuedCount: number;
  sentCount: number;
  skippedCount: number;
  updateMessageBody: (id: string, body: string) => void;
  updateMessageSubject: (id: string, subject: string) => void;
  setMessageStatus: (id: string, status: MessageStatus) => void;
  resetDemo: () => void;
};

const DemoStoreContext = createContext<DemoStore | null>(null);

function loadState(): DemoState {
  if (typeof window === "undefined") return createSeedState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createSeedState();
    const parsed = JSON.parse(raw) as DemoState;
    if (!parsed || !Array.isArray(parsed.contacts) || !Array.isArray(parsed.messages)) {
      return createSeedState();
    }
    if (!parsed.contacts[0] || !("segment" in parsed.contacts[0])) {
      return createSeedState();
    }
    return { ...createSeedState(), ...parsed };
  } catch {
    return createSeedState();
  }
}

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(createSeedState);
  const [hydrated, setHydrated] = useState(false);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const update = useCallback((updater: (prev: DemoState) => DemoState) => {
    setState((prev) => updater(prev));
  }, []);

  const value = useMemo<DemoStore>(
    () => ({
      ...state,
      hydrated,
      revision,
      queuedCount: state.messages.filter((m) => m.status === "queued").length,
      sentCount: state.messages.filter((m) => m.status === "sent").length,
      skippedCount: state.messages.filter((m) => m.status === "skipped").length,
      updateMessageBody: (id, body) =>
        update((prev) => ({
          ...prev,
          messages: prev.messages.map((message) =>
            message.id === id ? { ...message, body } : message,
          ),
        })),
      updateMessageSubject: (id, subject) =>
        update((prev) => ({
          ...prev,
          messages: prev.messages.map((message) =>
            message.id === id ? { ...message, subject } : message,
          ),
        })),
      setMessageStatus: (id, status) =>
        update((prev) => ({
          ...prev,
          messages: prev.messages.map((message) =>
            message.id === id ? { ...message, status } : message,
          ),
        })),
      resetDemo: () => {
        window.localStorage.removeItem(STORAGE_KEY);
        setState(createSeedState());
        setRevision((n) => n + 1);
      },
    }),
    [hydrated, revision, state, update],
  );

  return <DemoStoreContext.Provider value={value}>{children}</DemoStoreContext.Provider>;
}

export function useDemoStore() {
  const ctx = useContext(DemoStoreContext);
  if (!ctx) {
    throw new Error("useDemoStore must be used within DemoStoreProvider");
  }
  return ctx;
}
