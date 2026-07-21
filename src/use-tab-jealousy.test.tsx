import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTabJealousy } from "./use-tab-jealousy";

let originalVisibilityState: PropertyDescriptor | undefined;

function notifyVisibilityChange(visibilityState: DocumentVisibilityState) {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    value: visibilityState,
  });
  document.dispatchEvent(new Event("visibilitychange"));
}

describe("useTabJealousy", () => {
  beforeEach(() => {
    originalVisibilityState = Object.getOwnPropertyDescriptor(
      document,
      "visibilityState",
    );
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
    });
  });

  afterEach(() => {
    if (originalVisibilityState === undefined) {
      Reflect.deleteProperty(document, "visibilityState");
    } else {
      Object.defineProperty(document, "visibilityState", originalVisibilityState);
    }
    vi.restoreAllMocks();
  });

  it("gossips in a deterministic cycle after each return to the tab", () => {
    const messages = ["Where were you?", "The DOM missed you."];
    const { result } = renderHook(() => useTabJealousy({ messages }));

    expect(result.current).toBeNull();

    act(() => {
      notifyVisibilityChange("hidden");
      notifyVisibilityChange("visible");
    });
    expect(result.current).toBe("Where were you?");

    act(() => {
      notifyVisibilityChange("hidden");
      notifyVisibilityChange("visible");
    });
    expect(result.current).toBe("The DOM missed you.");

    act(() => {
      notifyVisibilityChange("hidden");
      notifyVisibilityChange("visible");
    });
    expect(result.current).toBe("Where were you?");
  });

  it("uses updated messages for the next reproach", () => {
    const { result, rerender } = renderHook(
      ({ messages }: { messages: readonly string[] }) =>
        useTabJealousy({ messages }),
      { initialProps: { messages: ["The tab is fine."] } },
    );

    rerender({ messages: ["The tab is definitely not fine."] });

    act(() => {
      notifyVisibilityChange("hidden");
      notifyVisibilityChange("visible");
    });

    expect(result.current).toBe("The tab is definitely not fine.");
  });

  it("stays quiet when its message script is empty", () => {
    const { result } = renderHook(() => useTabJealousy({ messages: [] }));

    act(() => {
      notifyVisibilityChange("hidden");
      notifyVisibilityChange("visible");
    });

    expect(result.current).toBeNull();
  });

  it("stays quiet when no usable document is available", () => {
    const unavailableDocument = {
      visibilityState: "visible",
    } as unknown as Document;
    const { result } = renderHook(() =>
      useTabJealousy({ document: unavailableDocument }),
    );

    expect(result.current).toBeNull();
  });

  it("removes its visibility listener when unmounted", () => {
    const removeEventListener = vi.spyOn(document, "removeEventListener");
    const { unmount } = renderHook(() => useTabJealousy());

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "visibilitychange",
      expect.any(Function),
    );
  });
});
