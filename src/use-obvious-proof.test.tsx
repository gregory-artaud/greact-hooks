import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useObviousProof } from "./use-obvious-proof";

describe("useObviousProof", () => {
  it("returns the value alongside proof that it is itself", () => {
    const value = { answer: 42 };
    const { result } = renderHook(() => useObviousProof(value));

    expect(result.current[0]).toBe(value);
    expect(result.current[1]).toBe(true);
  });

  it("checks the new value after a rerender", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useObviousProof(value),
      { initialProps: { value: 1 } },
    );

    expect(result.current).toEqual([1, true]);

    rerender({ value: 2 });

    expect(result.current).toEqual([2, true]);
  });

  it("also proves NaN is itself", () => {
    const { result } = renderHook(() => useObviousProof(Number.NaN));

    expect(result.current).toEqual([Number.NaN, true]);
  });
});
