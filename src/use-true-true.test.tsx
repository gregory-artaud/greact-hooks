import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTrueTrue } from "./use-true-true";

describe("useTrueTrue", () => {
  it("keeps returning true after a rerender", () => {
    const { result, rerender } = renderHook(() => useTrueTrue());

    expect(result.current).toBe(true);

    rerender();

    expect(result.current).toBe(true);
  });
});
