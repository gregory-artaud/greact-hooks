import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useCallbackSelfCheck } from "./use-callback-self-check";

describe("useCallbackSelfCheck", () => {
  it("checks whether the callback returns itself after copying the result", () => {
    let callback: () => unknown;
    callback = () => callback;

    const { result } = renderHook(() => useCallbackSelfCheck(callback));

    expect(result.current).toBe(true);
  });

  it("returns false for an ordinary result and calls the callback once", () => {
    const callback = vi.fn(() => "not the callback");
    const { result } = renderHook(() => useCallbackSelfCheck(callback));

    expect(result.current).toBe(false);
    expect(callback).toHaveBeenCalledOnce();
  });

  it("checks the replacement callback after a rerender", () => {
    const first = vi.fn(() => "first");
    const second = vi.fn(() => "second");
    const { result, rerender } = renderHook(
      ({ callback }: { callback: () => string }) =>
        useCallbackSelfCheck(callback),
      { initialProps: { callback: first } },
    );

    expect(result.current).toBe(false);

    rerender({ callback: second });

    expect(result.current).toBe(false);
    expect(first).toHaveBeenCalledOnce();
    expect(second).toHaveBeenCalledOnce();
  });
});
