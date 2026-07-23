import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useClipboardSuspicion } from "./use-clipboard-suspicion";

describe("useClipboardSuspicion", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts quietly and cycles through accusations after copy events", () => {
    const { result } = renderHook(() =>
      useClipboardSuspicion({
        messages: ["Caught a copy.", "Another duplicate."],
      }),
    );

    expect(result.current).toBeNull();

    act(() => {
      document.dispatchEvent(new Event("copy"));
    });
    expect(result.current).toBe("Caught a copy.");

    act(() => {
      document.dispatchEvent(new Event("copy"));
      document.dispatchEvent(new Event("copy"));
    });
    expect(result.current).toBe("Caught a copy.");
  });

  it("uses updated accusations without replacing its listener", () => {
    const addEventListener = vi.spyOn(document, "addEventListener");
    const { result, rerender } = renderHook(
      ({ messages }: { messages: readonly string[] }) =>
        useClipboardSuspicion({ messages }),
      { initialProps: { messages: ["Old evidence."] } },
    );

    rerender({ messages: ["Fresh evidence."] });

    act(() => {
      document.dispatchEvent(new Event("copy"));
    });

    expect(result.current).toBe("Fresh evidence.");
    expect(
      addEventListener.mock.calls.filter(([event]) => event === "copy"),
    ).toHaveLength(1);
  });

  it("clears its accusation and stays quiet when messages become empty", () => {
    const { result, rerender } = renderHook(
      ({ messages }: { messages: readonly string[] }) =>
        useClipboardSuspicion({ messages }),
      { initialProps: { messages: ["Highly suspicious."] } },
    );

    act(() => {
      document.dispatchEvent(new Event("copy"));
    });
    expect(result.current).toBe("Highly suspicious.");

    rerender({ messages: [] });
    expect(result.current).toBeNull();

    act(() => {
      document.dispatchEvent(new Event("copy"));
    });
    expect(result.current).toBeNull();
  });

  it("is inert without a usable document", () => {
    const unavailableDocument = {} as Document;
    const { result } = renderHook(() =>
      useClipboardSuspicion({ document: unavailableDocument }),
    );

    expect(result.current).toBeNull();
  });

  it("removes its copy listener when unmounted", () => {
    const removeEventListener = vi.spyOn(document, "removeEventListener");
    const { unmount } = renderHook(() => useClipboardSuspicion());

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "copy",
      expect.any(Function),
    );
  });
});
