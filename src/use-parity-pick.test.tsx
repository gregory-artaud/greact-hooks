import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useParityPick } from "./use-parity-pick";

describe("useParityPick", () => {
  it("uses the list length parity as the index of its picked value", () => {
    const even = renderHook(() => useParityPick(["first", "second"]));
    const odd = renderHook(() => useParityPick(["first", "second", "third"]));

    expect(even.result.current).toBe("first");
    expect(odd.result.current).toBe("second");
  });

  it("returns undefined when the parity index is missing", () => {
    const { result } = renderHook(() => useParityPick(["only"]));

    expect(result.current).toBeUndefined();
  });

  it("recounts a replacement list", () => {
    const { result, rerender } = renderHook(
      ({ values }: { values: readonly number[] }) => useParityPick(values),
      { initialProps: { values: [10, 20] } },
    );

    expect(result.current).toBe(10);

    rerender({ values: [10, 20, 30] });

    expect(result.current).toBe(20);
  });
});
