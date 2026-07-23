import { useEffect, useRef, useState } from "react";

const DEFAULT_FOCUS_FANFARES = [
  "A cursor has entered the room. Please remain seated.",
  "This field is now accepting applause instead of input.",
  "The focus ring has been promoted to principal character.",
] as const;

export interface UseFocusFanfareOptions {
  /** Announcements delivered in order whenever something receives focus. */
  messages?: readonly string[];
  /** The document whose tiny celebrity entrances should be observed. */
  document?: Document | null;
}

function getDefaultDocument(): Document | null {
  return typeof document === "undefined" ? null : document;
}

/**
 * Gives every focus change the unearned importance of a royal entrance.
 */
export function useFocusFanfare(
  options: UseFocusFanfareOptions = {},
): string | null {
  const messages = options.messages ?? DEFAULT_FOCUS_FANFARES;
  const monitoredDocument =
    options.document === undefined ? getDefaultDocument() : options.document;
  const [fanfare, setFanfare] = useState<string | null>(null);
  const messageIndex = useRef(0);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;

    if (messages.length === 0) {
      setFanfare(null);
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

    const announceFanfare = () => {
      const currentMessages = messagesRef.current;

      if (currentMessages.length === 0) {
        setFanfare(null);
        return;
      }

      setFanfare(
        currentMessages[messageIndex.current % currentMessages.length],
      );
      messageIndex.current += 1;
    };

    monitoredDocument.addEventListener("focusin", announceFanfare);

    return () => {
      monitoredDocument.removeEventListener("focusin", announceFanfare);
    };
  }, [monitoredDocument]);

  return fanfare;
}
