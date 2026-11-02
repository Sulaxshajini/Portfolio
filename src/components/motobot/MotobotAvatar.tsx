"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MotobotSVG from "./MotobotSVG";
import type { Mood } from "./types";

const Motobot3D = dynamic(() => import("./Motobot3D"), { ssr: false, loading: () => null });

function canUse3D() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.innerWidth < 900 || (navigator.hardwareConcurrency ?? 8) < 4) return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

/** 3D robot on capable desktops; lightweight animated SVG everywhere else. */
export default function MotobotAvatar({ mood = "idle", className = "" }: { mood?: Mood; className?: string }) {
  const [use3D, setUse3D] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- capability detection must run client-side after hydration
  useEffect(() => { setUse3D(canUse3D()); }, []);
  return use3D ? <Motobot3D mood={mood} className={className} /> : <MotobotSVG mood={mood} className={className} />;
}
