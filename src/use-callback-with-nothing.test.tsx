import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useCallbackWithNothing } from "./use-callback-with-nothing";

describe("useCallbackWithNothing", () => {
  it("returns the callback result beside nothing", () => {
    const callback = vi.fn((value: string) => value.length);
    const { result } = renderHook(() => useCallbackWithNothing(callback));

    expect(result.current("unnecessary")).toEqual([11, undefined]);
    expect(callback).toHaveBeenCalledOnce();
    expect(callback).toHaveBeenCalledWith("unnecessary");
  });

  it("keeps the wrapper when the callback stays the same", () => {
    const callback = (value: number) => value * 2;
    const { result, rerender } = renderHook(() => useCallbackWithNothing(callback));
    const firstWrapper = result.current;

    rerender();

    expect(result.current).toBe(firstWrapper);
    expect(result.current(3)).toEqual([6, undefined]);
  });

  it("uses a replacement callback after rerender", () => {
    const first = vi.fn(() => "first");
    const second = vi.fn(() => "second");
    const { result, rerender } = renderHook(
      ({ callback }: { callback: () => string }) =>
        useCallbackWithNothing(callback),
      { initialProps: { callback: first } },
    );

    rerender({ callback: second });

    expect(result.current()).toEqual(["second", undefined]);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledOnce();
  });
});
