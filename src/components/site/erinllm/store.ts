"use client";

import { Chat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useSyncExternalStore } from "react";
import type { Attached, ErinMessage } from "@/lib/erinllm/types";
import { readPage } from "./pageContext";

// ErinLLM's state lives here, outside React, because the header (and the
// panel in it) remounts on every page. The conversation, whether the panel
// is open and what's attached all carry over when someone follows a link,
// and an answer keeps streaming. The conversation is also saved to this
// tab's sessionStorage, so a reload keeps it.

export type AttachedFrom = "selection" | "drop" | "paste";

type State = {
  open: boolean;
  attached: Attached | null;
  attachedFrom: AttachedFrom | null;
  /** Bumped to move focus to the question box */
  focus: number;
};

let state: State = {
  open: false,
  attached: null,
  attachedFrom: null,
  focus: 0,
};
const listeners = new Set<() => void>();

const set = (next: Partial<State>) => {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const CLOSED = state;
export const useErinLLM = () =>
  useSyncExternalStore(
    subscribe,
    () => state,
    () => CLOSED,
  );

export const openErinLLM = (attached?: Attached, from?: AttachedFrom) =>
  set({
    open: true,
    focus: state.focus + 1,
    ...(attached ? { attached, attachedFrom: from ?? null } : {}),
  });

export const closeErinLLM = () => set({ open: false });

export const clearAttached = () => set({ attached: null, attachedFrom: null });

// The conversation

const SAVED = "erinllm:messages";
const KEEP = 30; // messages kept across reloads

function restore(): ErinMessage[] {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SAVED) ?? "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function save(messages: ErinMessage[]) {
  try {
    sessionStorage.setItem(SAVED, JSON.stringify(messages.slice(-KEEP)));
  } catch {
    // Private mode or full storage: the conversation just won't survive a reload
  }
}

let chat: Chat<ErinMessage> | null = null;

// Made on first use, in the browser only
export function getChat() {
  chat ??= new Chat<ErinMessage>({
    id: "erinllm",
    messages: restore(),
    transport: new DefaultChatTransport({
      api: "/api/erinllm",
      body: () => ({ page: readPage() }),
    }),
    onFinish: ({ messages }) => save(messages),
  });
  return chat;
}
