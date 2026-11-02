"use client";
import { createContext, useContext } from "react";

export const ShellContext = createContext<{ entered: boolean }>({ entered: false });
export const useShell = () => useContext(ShellContext);
