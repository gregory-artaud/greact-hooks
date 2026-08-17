import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useMiddleSplit } from "./use-middle-split";

describe("useMiddleSplit", () => {
  it("returns the two halves of an even-length string", () => {
    const { result } = renderHook(() => useMiddleSplit("abcd"));

    expect(result.current).toEqual(["ab", "cd"]);
    expect(result.current.join("")).toBe("abcd");
  });

  it("gives the extra character to the second half", () => {
    const { result } = renderHook(() => useMiddleSplit("abcde"));

    expect(result.current).toEqual(["ab", "cde"]);
  });

  it("recomputes the split after a rerender", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useMiddleSplit(value),
      { initialProps: { value: "first" } },
    );

    expect(result.current).toEqual(["fi", "rst"]);

    rerender({ value: "second" });

    expect(result.current).toEqual(["sec", "ond"]);
  });
});
