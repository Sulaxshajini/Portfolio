"use client";
import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import IntroExperience from "@/components/intro/IntroExperience";
import SmoothScroll from "./SmoothScroll";
import { ShellContext } from "./ShellContext";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { MotobotProvider } from "@/components/motobot/MotobotProvider";
import { scrollToId } from "@/lib/scroll";

const MotobotRoot = dynamic(() => import("@/components/motobot/MotobotRoot"), { ssr: false });

/**
 * Holds the in-memory (never persisted) intro state. Because this lives in the
 * root layout, client-side navigation does not replay the intro, while every
 * full page load / refresh starts again at 0%.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.style.overflow = introDone ? "" : "hidden";
    return () => { el.style.overflow = ""; };
  }, [introDone]);

  const onEnter = useCallback(() => {
    setEntered(true);
    // Safety net: never let a stalled exit animation leave the overlay mounted.
    setTimeout(() => setIntroDone(true), 4500);
    const hash = window.location.hash.replace("#", "");
    if (hash) setTimeout(() => scrollToId(hash), 700);
    else window.scrollTo(0, 0);
  }, []);

  return (
    <ShellContext.Provider value={{ entered }}>
      <MotobotProvider>
        <SmoothScroll enabled={entered} />
        <div inert={!entered} aria-hidden={!entered}>
          <ScrollProgress />
          <Navbar />
          {children}
          {entered && <MotobotRoot />}
        </div>
        {!introDone && <IntroExperience onEnter={onEnter} onDone={() => setIntroDone(true)} />}
      </MotobotProvider>
    </ShellContext.Provider>
  );
}
