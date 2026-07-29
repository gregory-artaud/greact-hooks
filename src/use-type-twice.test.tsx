import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTypeTwice } from "./use-type-twice";

describe("useTypeTwice", () => {
  it("reports the same obvious type twice", () => {
    const { result } = renderHook(() => useTypeTwice("hook"));

    expect(result.current()).toEqual(["string", "string"]);
    expect(result.current()).toEqual(["string", "string"]);
  });

  it("copies, compares, and repeats the replacement value's type", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: unknown }) => useTypeTwice(value),
      { initialProps: { value: "first" } as { value: unknown } },
    );

    rerender({ value: { still: "obvious" } });

    expect(result.current()).toEqual(["object", "object"]);
  });
});
