import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useKeyMashExcuse } from "./use-key-mash-excuse";

function pressKey(key: string, repeat = false) {
  document.dispatchEvent(new KeyboardEvent("keydown", { key, repeat }));
}

describe("useKeyMashExcuse", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("starts quietly and excuses a completed key mash", () => {
    const { result } = renderHook(() =>
      useKeyMashExcuse({ threshold: 3, messages: ["The keyboard did it."] }),
    );

    expect(result.current).toBeNull();

    act(() => {
      pressKey("a");
      pressKey("s");
      pressKey("d");
    });

    expect(result.current).toBe("The keyboard did it.");
  });

  it("cycles through its excuses for separate mashes", () => {
    const { result } = renderHook(() =>
      useKeyMashExcuse({
        threshold: 2,
        messages: ["First excuse.", "Second excuse."],
      }),
    );

    act(() => {
      pressKey("a");
      pressKey("b");
    });
    expect(result.current).toBe("First excuse.");

    act(() => {
      pressKey("c");
      pressKey("d");
    });
    expect(result.current).toBe("Second excuse.");
  });

  it("ignores repeated and non-printable keys", () => {
    const { result } = renderHook(() =>
      useKeyMashExcuse({ threshold: 2, messages: ["Noisy excuse."] }),
    );

    act(() => {
      pressKey("Shift");
      pressKey("a", true);
      pressKey("a");
    });

    expect(result.current).toBeNull();
  });

  it("forgets an unfinished mash after its configured pause", () => {
    const { result } = renderHook(() =>
      useKeyMashExcuse({
        threshold: 2,
        pause: 100,
        messages: ["Too late to explain."],
      }),
    );

    act(() => {
      pressKey("a");
      vi.advanceTimersByTime(100);
      pressKey("b");
    });

    expect(result.current).toBeNull();
  });

  it("uses updated messages for the next excuse", () => {
    const { result, rerender } = renderHook(
      ({ messages }: { messages: readonly string[] }) =>
        useKeyMashExcuse({ threshold: 2, messages }),
      { initialProps: { messages: ["Old excuse."] } },
    );

    rerender({ messages: ["New excuse."] });

    act(() => {
      pressKey("a");
      pressKey("b");
    });

    expect(result.current).toBe("New excuse.");
  });

  it("stays quiet without a usable document and cleans up an unfinished mash", () => {
    const unavailableDocument = {} as Document;
    const { result: unavailableResult } = renderHook(() =>
      useKeyMashExcuse({ document: unavailableDocument }),
    );

    expect(unavailableResult.current).toBeNull();

    const removeEventListener = vi.spyOn(document, "removeEventListener");
    const clearTimeout = vi.spyOn(globalThis, "clearTimeout");
    const { unmount } = renderHook(() => useKeyMashExcuse());

    act(() => {
      pressKey("a");
    });

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function),
    );
    expect(clearTimeout).toHaveBeenCalled();
  });
});
