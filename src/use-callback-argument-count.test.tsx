import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useCallbackArgumentCount } from "./use-callback-argument-count";

describe("useCallbackArgumentCount", () => {
  it("throws away the callback result and returns the argument count", () => {
    const callback = vi.fn((first: string, second: number) => first.length + second);
    const { result } = renderHook(() => useCallbackArgumentCount(callback));

    expect(result.current("ignored", 4)).toBe(2);
    expect(callback).toHaveBeenCalledWith("ignored", 4);
  });

  it("uses the replacement callback after a rerender", () => {
    const first = vi.fn((..._args: number[]) => "first");
    const second = vi.fn((..._args: number[]) => "second");
    const { result, rerender } = renderHook(
      ({ callback }: { callback: (...args: number[]) => string }) =>
        useCallbackArgumentCount(callback),
      { initialProps: { callback: first } },
    );

    expect(result.current()).toBe(0);
    rerender({ callback: second });

    expect(result.current(1, 2, 3)).toBe(3);
    expect(first).toHaveBeenCalledOnce();
    expect(second).toHaveBeenCalledOnce();
  });
});
