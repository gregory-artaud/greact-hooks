import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useReadThenErase } from "./use-read-then-erase";

describe("useReadThenErase", () => {
  it("returns the value once and then erases it", () => {
    const { result } = renderHook(() => useReadThenErase("already available"));

    expect(result.current.value).toBe("already available");
    expect(result.current.value).toBeUndefined();
  });

  it("starts a new erasure when the input changes", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useReadThenErase(value),
      { initialProps: { value: "first" } },
    );

    expect(result.current.value).toBe("first");
    expect(result.current.value).toBeUndefined();

    rerender({ value: "second" });

    expect(result.current.value).toBe("second");
    expect(result.current.value).toBeUndefined();
  });
});
