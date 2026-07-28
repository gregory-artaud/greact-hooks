import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useIdLength } from "./use-id-length";

describe("useIdLength", () => {
  it("returns only the length of the React id it immediately discards", () => {
    const { result } = renderHook(() => useIdLength());

    expect(result.current).toBeGreaterThan(0);
    expect(Number.isInteger(result.current)).toBe(true);
  });

  it("keeps reporting the same discarded id length after a rerender", () => {
    const { result, rerender } = renderHook(() => useIdLength());
    const length = result.current;

    rerender();

    expect(result.current).toBe(length);
  });
});
