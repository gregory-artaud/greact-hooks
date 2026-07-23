import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useFocusFanfare } from "./use-focus-fanfare";

function announceFocus() {
  document.dispatchEvent(new Event("focusin"));
}

describe("useFocusFanfare", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts quietly and applauds the first focus change", () => {
    const { result } = renderHook(() =>
      useFocusFanfare({ messages: ["The input has arrived."] }),
    );

    expect(result.current).toBeNull();

    act(() => {
      announceFocus();
    });

    expect(result.current).toBe("The input has arrived.");
  });

  it("cycles through fanfares for later focus changes", () => {
    const { result } = renderHook(() =>
      useFocusFanfare({ messages: ["First entrance.", "Second entrance."] }),
    );

    act(() => {
      announceFocus();
    });
    expect(result.current).toBe("First entrance.");

    act(() => {
      announceFocus();
    });
    expect(result.current).toBe("Second entrance.");

    act(() => {
      announceFocus();
    });
    expect(result.current).toBe("First entrance.");
  });

  it("uses updated messages and falls silent for an empty programme", () => {
    const { result, rerender } = renderHook(
      ({ messages }: { messages: readonly string[] }) =>
        useFocusFanfare({ messages }),
      { initialProps: { messages: ["Old applause."] } },
    );

    rerender({ messages: ["New applause."] });

    act(() => {
      announceFocus();
    });
    expect(result.current).toBe("New applause.");

    rerender({ messages: [] });
    expect(result.current).toBeNull();

    act(() => {
      announceFocus();
    });
    expect(result.current).toBeNull();
  });

  it("is inert without a usable document and removes its listener on unmount", () => {
    const unavailableDocument = {} as Document;
    const { result: unavailableResult } = renderHook(() =>
      useFocusFanfare({ document: unavailableDocument }),
    );

    expect(unavailableResult.current).toBeNull();

    const removeEventListener = vi.spyOn(document, "removeEventListener");
    const { unmount } = renderHook(() => useFocusFanfare());

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "focusin",
      expect.any(Function),
    );
  });
});
