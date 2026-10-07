"use client";

import { useEffect, useRef, useState, type DragEvent } from "react";
import { createPortal } from "react-dom";
import { focusRing } from "@/components/site/links";
import AskSelection from "./AskSelection";
import { canDrop, readDrop } from "./drop";
import Panel from "./Panel";
import { closeErinLLM, openErinLLM, useErinLLM } from "./store";
import { track } from "./track";

// "✦ erinLLM" in the top right of the header: a chat bot that answers
// questions about me from this site (src/app/api/erinllm). It opens a panel
// down the right side. Anything dragged onto this button or the panel, or
// highlighted and asked about, comes along as context.

const PANEL_ID = "erinllm";

export default function ErinLLM() {
  const { open } = useErinLLM();
  const [mounted, setMounted] = useState(false);
  const [dragging, setDragging] = useState(false); // something, anywhere
  const [over, setOver] = useState(false); // something, over this button
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // While something on the page is being dragged, the button lights up to
  // say it can take it
  useEffect(() => {
    const start = () => setDragging(true);
    const end = () => {
      setDragging(false);
      setOver(false);
    };
    document.addEventListener("dragstart", start);
    document.addEventListener("dragend", end);
    document.addEventListener("drop", end);
    return () => {
      document.removeEventListener("dragstart", start);
      document.removeEventListener("dragend", end);
      document.removeEventListener("drop", end);
    };
  }, []);

  const close = () => {
    closeErinLLM();
    trigger.current?.focus();
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    const dropped = readDrop(e.dataTransfer);
    if (!dropped) return;
    openErinLLM(dropped, "drop");
    track("erinllm_open");
  };

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => {
          if (open) return close();
          openErinLLM();
          track("erinllm_open");
        }}
        onDragOver={(e) => {
          if (!canDrop(e.dataTransfer)) return;
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        // Blue, in its own casing (the header is otherwise uppercase);
        // underlined while open or while something's dragged over it
        className={`whitespace-nowrap normal-case text-site-blue underline-offset-4 hover:underline ${focusRing} ${
          open || over || dragging ? "underline" : ""
        }`}
      >
        <span aria-hidden="true">✦ </span>erinLLM
      </button>
      {mounted &&
        createPortal(
          <>
            <Panel id={PANEL_ID} onClose={close} />
            <AskSelection />
          </>,
          document.body,
        )}
    </>
  );
}
