import { useEffect, useRef, useState } from "react";

const DEFAULT_DOOM_SCROLL_PROPHECIES = [
  "The bottom of this page believes in you. It may be mistaken.",
  "A prophecy has been unlocked: there is still more page.",
  "Your scroll wheel has chosen a side in this quest.",
] as const;

export interface UseDoomScrollOracleOptions {
  /** Pixels between each entirely unearned prophecy. */
  distance?: number;
  /** Prophecies delivered in order when a new scroll milestone is crossed. */
  messages?: readonly string[];
  /** The window whose scrolling fate should be observed. */
  window?: Window | null;
}

function getDefaultWindow(): Window | null {
  return typeof window === "undefined" ? null : window;
}

function normalizeDistance(distance: number | undefined): number {
  if (distance === undefined || !Number.isFinite(distance)) {
    return 1_000;
  }

  return Math.max(1, Math.floor(distance));
}

function getScrollY(monitoredWindow: Window): number {
  const scrollY = monitoredWindow.scrollY;
  return Number.isFinite(scrollY) ? Math.max(0, scrollY) : 0;
}

/**
 * Predicts an entirely fictional future from how far someone has scrolled.
 */
export function useDoomScrollOracle(
  options: UseDoomScrollOracleOptions = {},
): string | null {
  const messages = options.messages ?? DEFAULT_DOOM_SCROLL_PROPHECIES;
  const monitoredWindow =
    options.window === undefined ? getDefaultWindow() : options.window;
  const distance = normalizeDistance(options.distance);
  const [prophecy, setProphecy] = useState<string | null>(null);
  const messageIndex = useRef(0);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;

    if (messages.length === 0) {
      setProphecy(null);
    }
  }, [messages]);

  useEffect(() => {
    if (
      monitoredWindow === null ||
      typeof monitoredWindow.addEventListener !== "function" ||
      typeof monitoredWindow.removeEventListener !== "function"
    ) {
      return;
    }

    let lastMilestone = Math.floor(getScrollY(monitoredWindow) / distance);

    const announceProphecy = () => {
      const milestone = Math.floor(getScrollY(monitoredWindow) / distance);

      if (milestone <= lastMilestone) {
        lastMilestone = milestone;
        return;
      }

      lastMilestone = milestone;
      const currentMessages = messagesRef.current;

      if (currentMessages.length === 0) {
        setProphecy(null);
        return;
      }

      setProphecy(
        currentMessages[messageIndex.current % currentMessages.length],
      );
      messageIndex.current += 1;
    };

    monitoredWindow.addEventListener("scroll", announceProphecy);

    return () => {
      monitoredWindow.removeEventListener("scroll", announceProphecy);
    };
  }, [distance, monitoredWindow]);

  return prophecy;
}
