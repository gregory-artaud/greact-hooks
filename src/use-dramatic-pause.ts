import { useEffect, useState } from "react";

/**
 * Treats an idle pointer as a moment of theatrical suspense.
 */
export function useDramaticPause(delay = 1_000): boolean {
  const [isDramatic, setIsDramatic] = useState(false);
  const normalizedDelay = Number.isFinite(delay) ? Math.max(0, delay) : 0;

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.addEventListener !== "function" ||
      typeof window.removeEventListener !== "function"
    ) {
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;

    const restartPause = () => {
      setIsDramatic(false);

      if (timer !== undefined) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setIsDramatic(true);
      }, normalizedDelay);
    };

    restartPause();
    window.addEventListener("pointermove", restartPause);

    return () => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }

      window.removeEventListener("pointermove", restartPause);
    };
  }, [normalizedDelay]);

  return isDramatic;
}
