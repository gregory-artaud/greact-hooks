import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCeilThenFloor } from "./use-ceil-then-floor";

describe("useCeilThenFloor", () => {
  it("rounds up and then rounds down to the same ceiling", () => {
    const { result } = renderHook(() => useCeilThenFloor(1.2));

    expect(result.current).toBe(2);
  });

  it("repeats the needless detour for a replacement value", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useCeilThenFloor(value),
      { initialProps: { value: -2.4 } },
    );

    expect(result.current).toBe(-2);

    rerender({ value: 3.1 });

    expect(result.current).toBe(4);
  });

  it("preserves the direct ceiling result for special numbers", () => {
    const { result } = renderHook(() => useCeilThenFloor(-0.2));

    expect(Object.is(result.current, -0)).toBe(true);
  });
});
