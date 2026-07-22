import { useEffect, useRef, useState } from "react";

const DEFAULT_KEY_MASH_EXCUSES = [
  "That was not a typo. It was an experimental keyboard solo.",
  "The keyboard panicked first; you merely documented it.",
  "A small flock of keys has requested legal representation.",
] as const;

export interface UseKeyMashExcuseOptions {
  /** Number of printable, non-repeating key presses required for an excuse. */
  threshold?: number;
  /** Milliseconds of keyboard silence that end an unfinished mash. */
  pause?: number;
  /** Excuses delivered in order whenever a mash reaches the threshold. */
  messages?: readonly string[];
  /** The document whose keyboard drama should be monitored. */
  document?: Document | null;
}

function getDefaultDocument(): Document | null {
  return typeof document === "undefined" ? null : document;
}

function normalizeThreshold(threshold: number | undefined): number {
  if (threshold === undefined || !Number.isFinite(threshold)) {
    return 4;
  }

  return Math.max(1, Math.floor(threshold));
}

function normalizePause(pause: number | undefined): number {
  if (pause === undefined || !Number.isFinite(pause)) {
    return 500;
  }

  return Math.max(0, pause);
}

/**
 * Turns a hurried burst of typing into an entirely unnecessary formal excuse.
 */
export function useKeyMashExcuse(
  options: UseKeyMashExcuseOptions = {},
): string | null {
  const messages = options.messages ?? DEFAULT_KEY_MASH_EXCUSES;
  const monitoredDocument =
    options.document === undefined ? getDefaultDocument() : options.document;
  const threshold = normalizeThreshold(options.threshold);
  const pause = normalizePause(options.pause);
  const [excuse, setExcuse] = useState<string | null>(null);
  const messageIndex = useRef(0);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (
      monitoredDocument === null ||
      typeof monitoredDocument.addEventListener !== "function" ||
      typeof monitoredDocument.removeEventListener !== "function"
    ) {
      return;
    }

    let keyPresses = 0;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    const resetMash = () => {
      keyPresses = 0;
      resetTimer = undefined;
    };

    const scheduleReset = () => {
      if (resetTimer !== undefined) {
        clearTimeout(resetTimer);
      }

      resetTimer = setTimeout(resetMash, pause);
    };

    const reportKeyMash = (event: KeyboardEvent) => {
      if (event.repeat || event.key.length !== 1) {
        return;
      }

      keyPresses += 1;

      if (keyPresses < threshold) {
        scheduleReset();
        return;
      }

      if (resetTimer !== undefined) {
        clearTimeout(resetTimer);
      }

      resetMash();
      const currentMessages = messagesRef.current;

      if (currentMessages.length === 0) {
        setExcuse(null);
        return;
      }

      setExcuse(currentMessages[messageIndex.current % currentMessages.length]);
      messageIndex.current += 1;
    };

    monitoredDocument.addEventListener("keydown", reportKeyMash);

    return () => {
      if (resetTimer !== undefined) {
        clearTimeout(resetTimer);
      }

      monitoredDocument.removeEventListener("keydown", reportKeyMash);
    };
  }, [monitoredDocument, pause, threshold]);

  return excuse;
}
