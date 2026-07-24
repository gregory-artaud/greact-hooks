import { useEffect, useRef, useState } from "react";

const DEFAULT_REGRETS = [
  "Going back already? The current page had almost learned your name.",
  "History has been consulted. It recommends pretending this never happened.",
  "A previous page has been summoned for an unnecessary second opinion.",
] as const;

export interface UseBackButtonRegretOptions {
  /** Regrets delivered in order whenever session history is traversed. */
  messages?: readonly string[];
  /** The window whose history traversal should be judged. */
  window?: Window | null;
}

function getDefaultWindow(): Window | null {
  return typeof window === "undefined" ? null : window;
}

/**
 * Turns browser history traversal into melodrama about revisiting old decisions.
 */
export function useBackButtonRegret(
  options: UseBackButtonRegretOptions = {},
): string | null {
  const messages = options.messages ?? DEFAULT_REGRETS;
  const monitoredWindow =
    options.window === undefined ? getDefaultWindow() : options.window;
  const [regret, setRegret] = useState<string | null>(null);
  const messageIndex = useRef(0);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;

    if (messages.length === 0) {
      setRegret(null);
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

    const regretHistory = () => {
      const currentMessages = messagesRef.current;

      if (currentMessages.length === 0) {
        setRegret(null);
        return;
      }

      setRegret(currentMessages[messageIndex.current % currentMessages.length]);
      messageIndex.current += 1;
    };

    monitoredWindow.addEventListener("popstate", regretHistory);

    return () => {
      monitoredWindow.removeEventListener("popstate", regretHistory);
    };
  }, [monitoredWindow]);

  return regret;
}
