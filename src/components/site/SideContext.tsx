"use client";

import Link from "next/link";
import {
  createContext,
  useContext,
  useState,
  type ComponentProps,
} from "react";
import { withSide } from "./side";

type SideState = {
  engineer: boolean;
  setEngineer: (engineer: boolean) => void;
};

const SideContext = createContext<SideState | null>(null);

// The homepage's side, shared by the headline switch and the project tiles.
export function SideProvider({
  engineerFirst,
  children,
}: {
  engineerFirst: boolean;
  children: React.ReactNode;
}) {
  const [engineer, setEngineer] = useState(engineerFirst);
  return (
    <SideContext.Provider value={{ engineer, setEngineer }}>
      {children}
    </SideContext.Provider>
  );
}

export function useSide() {
  const side = useContext(SideContext);
  if (!side) throw new Error("useSide must be used inside a SideProvider");
  return side;
}

/** True on the engineering side; false outside a SideProvider. */
export const useEngineerSide = () => useContext(SideContext)?.engineer ?? false;

/** A link that keeps the reader on the side they're on. */
export function SideLink({
  href,
  ...props
}: ComponentProps<typeof Link> & { href: string }) {
  return <Link href={withSide(href, useEngineerSide())} {...props} />;
}
