import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDiscardThenReturn } from "./use-discard-then-return";

describe("useDiscardThenReturn", () => {
  it("calls the callback, discards its result, and returns the callback", () => {
    const callback = vi.fn((value: string) => value.length);
    const { result } = renderHook(() => useDiscardThenReturn(callback));

    expect(result.current("hook")).toBe(callback);
    expect(callback).toHaveBeenCalledWith("hook");
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("passes each invocation to the current callback", () => {
    const first = vi.fn((value: number) => value + 1);
    const second = vi.fn((value: number) => value + 2);
    const { result, rerender } = renderHook(
      ({ callback }: { callback: (value: number) => number }) =>
        useDiscardThenReturn(callback),
      { initialProps: { callback: first } },
    );

    expect(result.current(1)).toBe(first);
    rerender({ callback: second });
    expect(result.current(1)).toBe(second);

    expect(first).toHaveBeenCalledWith(1);
    expect(second).toHaveBeenCalledWith(1);
  });
});
