import { useEffect, useRef, useState } from "react";

const DEFAULT_TAB_JEALOUSIES = [
  "I noticed you left. I will pretend this meant nothing.",
  "Welcome back. The DOM has been staring at the wall.",
  "While you were gone, the CSS considered its options.",
] as const;

export interface UseTabJealousyOptions {
  /** Messages delivered in order whenever the monitored tab returns. */
  messages?: readonly string[];
  /** The document whose feelings should be monitored. Defaults to the current document. */
  document?: Document | null;
}

function getDefaultDocument(): Document | null {
  return typeof document === "undefined" ? null : document;
}

/**
 * Makes a tab sound offended whenever its visitor returns from somewhere else.
 */
export function useTabJealousy(
  options: UseTabJealousyOptions = {},
): string | null {
  const messages = options.messages ?? DEFAULT_TAB_JEALOUSIES;
  const monitoredDocument =
    options.document === undefined ? getDefaultDocument() : options.document;
  const [jealousy, setJealousy] = useState<string | null>(null);
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

    let hasBeenHidden = monitoredDocument.visibilityState === "hidden";

    const reportJealousy = () => {
      if (monitoredDocument.visibilityState === "hidden") {
        hasBeenHidden = true;
        return;
      }

      if (monitoredDocument.visibilityState !== "visible" || !hasBeenHidden) {
        return;
      }

      hasBeenHidden = false;
      const currentMessages = messagesRef.current;

      if (currentMessages.length === 0) {
        setJealousy(null);
        return;
      }

      setJealousy(currentMessages[messageIndex.current % currentMessages.length]);
      messageIndex.current += 1;
    };

    monitoredDocument.addEventListener("visibilitychange", reportJealousy);

    return () => {
      monitoredDocument.removeEventListener("visibilitychange", reportJealousy);
    };
  }, [monitoredDocument]);

  return jealousy;
}
