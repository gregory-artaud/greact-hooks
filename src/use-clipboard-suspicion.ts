import { useEffect, useRef, useState } from "react";

const DEFAULT_CLIPBOARD_SUSPICIONS = [
  "Something has been copied. The clipboard refuses to name names.",
  "A suspicious duplicate is now at large.",
  "The clipboard has acquired evidence and immediately lost the context.",
] as const;

export interface UseClipboardSuspicionOptions {
  /** Accusations delivered in order whenever a copy event occurs. */
  messages?: readonly string[];
  /** The document whose copying activity should be viewed with suspicion. */
  document?: Document | null;
}

function getDefaultDocument(): Document | null {
  return typeof document === "undefined" ? null : document;
}

/**
 * Treats every copy event as an entirely unjustified clipboard investigation.
 */
export function useClipboardSuspicion(
  options: UseClipboardSuspicionOptions = {},
): string | null {
  const messages = options.messages ?? DEFAULT_CLIPBOARD_SUSPICIONS;
  const monitoredDocument =
    options.document === undefined ? getDefaultDocument() : options.document;
  const [suspicion, setSuspicion] = useState<string | null>(null);
  const messageIndex = useRef(0);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;

    if (messages.length === 0) {
      setSuspicion(null);
    }
  }, [messages]);

  useEffect(() => {
    if (
      monitoredDocument === null ||
      typeof monitoredDocument.addEventListener !== "function" ||
      typeof monitoredDocument.removeEventListener !== "function"
    ) {
      return;
    }

    const investigateCopy = () => {
      const currentMessages = messagesRef.current;

      if (currentMessages.length === 0) {
        setSuspicion(null);
        return;
      }

      setSuspicion(
        currentMessages[messageIndex.current % currentMessages.length],
      );
      messageIndex.current += 1;
    };

    monitoredDocument.addEventListener("copy", investigateCopy);

    return () => {
      monitoredDocument.removeEventListener("copy", investigateCopy);
    };
  }, [monitoredDocument]);

  return suspicion;
}
