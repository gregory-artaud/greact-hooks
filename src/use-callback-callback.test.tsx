import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useCallbackCallback } from "./use-callback-callback";

describe("useCallbackCallback", () => {
  it("calls the callback through another callback", () => {
    const callback = vi.fn((value: number) => value + 1);
    const { result } = renderHook(() => useCallbackCallback(callback));

    expect(result.current(1)).toBe(2);
    expect(callback).toHaveBeenCalledWith(1);
  });

  it("stays stable until the original callback changes", () => {
    const first = (value: string) => value;
    const second = (value: string) => value;
    const { result, rerender } = renderHook(
      ({ callback }) => useCallbackCallback(callback),
      { initialProps: { callback: first } },
    );
    const callbackCallback = result.current;

    rerender({ callback: first });
    expect(result.current).toBe(callbackCallback);

    rerender({ callback: second });
    expect(result.current).not.toBe(callbackCallback);
  });
});
