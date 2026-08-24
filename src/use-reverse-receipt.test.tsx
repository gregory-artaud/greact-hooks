import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useReverseReceipt } from "./use-reverse-receipt";

describe("useReverseReceipt", () => {
  it("reverses a string inside an unnecessary object", () => {
    const { result } = renderHook(() => useReverseReceipt("dessert"));

    expect(result.current).toEqual({ reversed: "tressed" });
  });

  it("updates the receipt when the string changes", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useReverseReceipt(value),
      { initialProps: { value: "first" } },
    );

    rerender({ value: "second" });

    expect(result.current).toEqual({ reversed: "dnoces" });
  });

  it("keeps the memoized object when the string does not change", () => {
    const { result, rerender } = renderHook(() => useReverseReceipt("same"));
    const firstReceipt = result.current;

    rerender();

    expect(result.current).toBe(firstReceipt);
  });
});
