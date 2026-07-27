import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useWasteCall } from "./use-waste-call";

describe("useWasteCall", () => {
  it("calls a callback twice and keeps only its first result", () => {
    const callback = vi
      .fn<() => string>()
      .mockReturnValueOnce("kept")
      .mockReturnValueOnce("wasted");
    const { result } = renderHook(() => useWasteCall());

    expect(result.current(callback)).toBe("kept");
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("wastes another call every time its returned function is called", () => {
    let call = 0;
    const { result } = renderHook(() => useWasteCall());

    expect(result.current(() => ++call)).toBe(1);
    expect(result.current(() => ++call)).toBe(3);
    expect(call).toBe(4);
  });

  it("returns the same wasteful function after a rerender", () => {
    const { result, rerender } = renderHook(() => useWasteCall());
    const wasteCall = result.current;

    rerender();

    expect(result.current).toBe(wasteCall);
  });
});
