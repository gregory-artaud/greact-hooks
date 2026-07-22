import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDoomScrollOracle } from "./use-doom-scroll-oracle";

let originalScrollY: PropertyDescriptor | undefined;

function setScrollY(scrollY: number) {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value: scrollY,
  });
}

function reportScroll(scrollY: number) {
  setScrollY(scrollY);
  window.dispatchEvent(new Event("scroll"));
}

describe("useDoomScrollOracle", () => {
  beforeEach(() => {
    originalScrollY = Object.getOwnPropertyDescriptor(window, "scrollY");
    setScrollY(0);
  });

  afterEach(() => {
    if (originalScrollY === undefined) {
      Reflect.deleteProperty(window, "scrollY");
    } else {
      Object.defineProperty(window, "scrollY", originalScrollY);
    }
    vi.restoreAllMocks();
  });

  it("starts quietly and announces a prophecy at the chosen scroll distance", () => {
    const { result } = renderHook(() =>
      useDoomScrollOracle({
        distance: 100,
        messages: ["The scroll wheel has spoken."],
      }),
    );

    expect(result.current).toBeNull();

    act(() => {
      reportScroll(99);
    });
    expect(result.current).toBeNull();

    act(() => {
      reportScroll(100);
    });
    expect(result.current).toBe("The scroll wheel has spoken.");
  });

  it("cycles through prophecies at later milestones", () => {
    const { result } = renderHook(() =>
      useDoomScrollOracle({
        distance: 100,
        messages: ["First omen.", "Second omen."],
      }),
    );

    act(() => {
      reportScroll(100);
    });
    expect(result.current).toBe("First omen.");

    act(() => {
      reportScroll(200);
    });
    expect(result.current).toBe("Second omen.");

    act(() => {
      reportScroll(300);
    });
    expect(result.current).toBe("First omen.");
  });

  it("does not applaud an already-scrolled page until the next milestone", () => {
    setScrollY(500);
    const { result } = renderHook(() =>
      useDoomScrollOracle({ distance: 100, messages: ["A fresh omen."] }),
    );

    expect(result.current).toBeNull();

    act(() => {
      reportScroll(599);
    });
    expect(result.current).toBeNull();

    act(() => {
      reportScroll(600);
    });
    expect(result.current).toBe("A fresh omen.");
  });

  it("uses updated prophecies for the next milestone", () => {
    const { result, rerender } = renderHook(
      ({ messages }: { messages: readonly string[] }) =>
        useDoomScrollOracle({ distance: 100, messages }),
      { initialProps: { messages: ["Old omen."] } },
    );

    rerender({ messages: ["New omen."] });

    act(() => {
      reportScroll(100);
    });

    expect(result.current).toBe("New omen.");
  });

  it("uses the default distance when given a non-finite one", () => {
    const { result } = renderHook(() =>
      useDoomScrollOracle({ distance: Number.NaN, messages: ["Default omen."] }),
    );

    act(() => {
      reportScroll(999);
    });
    expect(result.current).toBeNull();

    act(() => {
      reportScroll(1_000);
    });
    expect(result.current).toBe("Default omen.");
  });

  it("is inert without a usable window and removes its listener on unmount", () => {
    const unavailableWindow = {} as Window;
    const { result: unavailableResult } = renderHook(() =>
      useDoomScrollOracle({ window: unavailableWindow }),
    );

    expect(unavailableResult.current).toBeNull();

    const removeEventListener = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useDoomScrollOracle());

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
  });
});
