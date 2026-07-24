import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useZeroZero } from "./use-zero-zero";

describe("useZeroZero", () => {
  it("keeps returning zero after a rerender", () => {
    const { result, rerender } = renderHook(() => useZeroZero());

    expect(result.current).toBe(0);

    rerender();

    expect(result.current).toBe(0);
  });
});
