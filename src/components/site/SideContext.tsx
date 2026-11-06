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

// A case study's side and the way to flip it (see CaseStudy).
export const CaseStudySide = createContext<{
  engineer: boolean;
  flip: (engineer: boolean) => void;
} | null>(null);

/** A link that keeps the reader on the side they're on. */
export function SideLink({
  href,
  ...props
}: ComponentProps<typeof Link> & { href: string }) {
  return <Link href={withSide(href, useEngineerSide())} {...props} />;
}

// A link to a case study's engineering side. Followed from inside that case
// study, Next keeps the page and its side as they were, so the side wouldn't
// change; instead it flips the switch on screen, the way a reader would,
// so the engineering side grows out of the knob and the reader sees where
// the switch is. Opened in a new tab, or from anywhere else, it's a plain
// link.
export function EngineeringSideLink({
  href,
  ...props
}: Omit<ComponentProps<typeof Link>, "href" | "onClick"> & { href: string }) {
  const side = useContext(CaseStudySide);
  return (
    <Link
      href={`${href}?side=engineer`}
      onClick={(event) => {
        if (
          !side ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        if (side.engineer) return;
        // The switch showing at this width.
        const shown = [
          ...document.querySelectorAll<HTMLElement>(
            '[role="switch"][data-side]',
          ),
        ].find((el) => el.getClientRects().length > 0);
        if (shown) shown.click();
        else side.flip(true);
      }}
      {...props}
    />
  );
}
