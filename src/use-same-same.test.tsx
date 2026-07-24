import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSameSame } from "./use-same-same";

describe("useSameSame", () => {
  it("returns the exact same value, including after it changes", () => {
    const first = { value: "same" };
    const second = { value: "also same" };
    const { result, rerender } = renderHook(
      ({ value }) => useSameSame(value),
      { initialProps: { value: first } },
    );

    expect(result.current).toBe(first);

    rerender({ value: second });

    expect(result.current).toBe(second);
  });
});
