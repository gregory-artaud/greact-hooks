import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useArrayAndElement } from "./use-array-and-element";

describe("useArrayAndElement", () => {
  it("returns the one-item array and the element extracted from it", () => {
    const { result } = renderHook(() => useArrayAndElement("unnecessary"));

    expect(result.current[0]).toEqual(["unnecessary"]);
    expect(result.current[1]).toBe("unnecessary");
  });

  it("recomputes both outputs when the value changes", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useArrayAndElement(value),
      { initialProps: { value: 1 } },
    );

    rerender({ value: 2 });

    expect(result.current).toEqual([[2], 2]);
  });
});
