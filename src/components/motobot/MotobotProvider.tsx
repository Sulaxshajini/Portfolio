"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface Ctx {
  open: boolean;
  /** one-shot prompt to send when the chat opens (e.g. from a topic label) */
  pendingPrompt: string | null;
  openChat: (prompt?: string) => void;
  closeChat: () => void;
  clearPrompt: () => void;
}

const MotobotCtx = createContext<Ctx>({
  open: false, pendingPrompt: null, openChat: () => {}, closeChat: () => {}, clearPrompt: () => {},
});

export function MotobotProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pendingPrompt, setPending] = useState<string | null>(null);
  const openChat = useCallback((p?: string) => { setPending(p ?? null); setOpen(true); }, []);
  const closeChat = useCallback(() => setOpen(false), []);
  const clearPrompt = useCallback(() => setPending(null), []);
  const value = useMemo(() => ({ open, pendingPrompt, openChat, closeChat, clearPrompt }), [open, pendingPrompt, openChat, closeChat, clearPrompt]);
  return <MotobotCtx.Provider value={value}>{children}</MotobotCtx.Provider>;
}

export const useMotobot = () => useContext(MotobotCtx);
