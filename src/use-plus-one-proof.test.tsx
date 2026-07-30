import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePlusOneProof } from "./use-plus-one-proof";

describe("usePlusOneProof", () => {
  it("adds one and returns the one as unnecessary proof", () => {
    const { result } = renderHook(() => usePlusOneProof(4));

    expect(result.current).toEqual([5, 1]);
  });

  it("repeats the obvious addition for a replacement value", () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePlusOneProof(value),
      { initialProps: { value: -2 } },
    );

    rerender({ value: 10 });

    expect(result.current).toEqual([11, 1]);
  });
});
