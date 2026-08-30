import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSignOfSign } from "./use-sign-of-sign";

describe("useSignOfSign", () => {
  it("takes the sign of a sign", () => {
    const { result } = renderHook(() => useSignOfSign(-42));

    expect(result.current).toBe(-1);
  });

  it("recomputes the needless second sign when the value changes", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useSignOfSign(value),
      { initialProps: { value: -3 } },
    );

    rerender({ value: 8 });

    expect(result.current).toBe(1);
  });

  it("preserves Math.sign for zero and non-finite values", () => {
    const { result: zero } = renderHook(() => useSignOfSign(-0));
    const { result: nan } = renderHook(() => useSignOfSign(Number.NaN));
    const { result: infinity } = renderHook(() => useSignOfSign(Infinity));

    expect(Object.is(zero.current, -0)).toBe(true);
    expect(nan.current).toBeNaN();
    expect(infinity.current).toBe(1);
  });
});
