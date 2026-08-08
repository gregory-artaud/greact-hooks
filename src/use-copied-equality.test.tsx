import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCopiedEquality } from "./use-copied-equality";

describe("useCopiedEquality", () => {
  it("copies a pair only to report whether its entries are identical", () => {
    const shared = { answer: 42 };
    const { result } = renderHook(() => useCopiedEquality([shared, shared]));

    expect(result.current).toEqual({ equal: true });
  });

  it("reports a changed equality result for a replacement pair", () => {
    const first = { answer: 42 };
    const second = { answer: 42 };
    const { result, rerender } = renderHook(
      ({ values }: { values: readonly [object, object] }) =>
        useCopiedEquality(values),
      { initialProps: { values: [first, first] as const } },
    );

    expect(result.current.equal).toBe(true);

    rerender({ values: [first, second] });

    expect(result.current.equal).toBe(false);
  });
});
