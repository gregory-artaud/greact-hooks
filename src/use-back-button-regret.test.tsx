import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useBackButtonRegret } from "./use-back-button-regret";

function revisitHistory(targetWindow: Window = window) {
  targetWindow.dispatchEvent(new PopStateEvent("popstate"));
}

describe("useBackButtonRegret", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts without regrets and cycles through them after history traversal", () => {
    const { result } = renderHook(() =>
      useBackButtonRegret({
        messages: ["That page again?", "History repeats itself."],
      }),
    );

    expect(result.current).toBeNull();

    act(() => {
      revisitHistory();
    });
    expect(result.current).toBe("That page again?");

    act(() => {
      revisitHistory();
      revisitHistory();
    });
    expect(result.current).toBe("That page again?");
  });

  it("uses updated regrets without replacing its listener", () => {
    const addEventListener = vi.spyOn(window, "addEventListener");
    const { result, rerender } = renderHook(
      ({ messages }: { messages: readonly string[] }) =>
        useBackButtonRegret({ messages }),
      { initialProps: { messages: ["Old regret."] } },
    );

    rerender({ messages: ["Fresh regret."] });

    act(() => {
      revisitHistory();
    });

    expect(result.current).toBe("Fresh regret.");
    expect(
      addEventListener.mock.calls.filter(([event]) => event === "popstate"),
    ).toHaveLength(1);
  });

  it("clears its regret and stays quiet when messages become empty", () => {
    const { result, rerender } = renderHook(
      ({ messages }: { messages: readonly string[] }) =>
        useBackButtonRegret({ messages }),
      { initialProps: { messages: ["A decision was revisited."] } },
    );

    act(() => {
      revisitHistory();
    });
    expect(result.current).toBe("A decision was revisited.");

    rerender({ messages: [] });
    expect(result.current).toBeNull();

    act(() => {
      revisitHistory();
    });
    expect(result.current).toBeNull();
  });

  it("is inert without a usable window", () => {
    const unavailableWindow = {} as Window;
    const { result } = renderHook(() =>
      useBackButtonRegret({ window: unavailableWindow }),
    );

    expect(result.current).toBeNull();
  });

  it("removes its history listener when unmounted", () => {
    const removeEventListener = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useBackButtonRegret());

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "popstate",
      expect.any(Function),
    );
  });
});
