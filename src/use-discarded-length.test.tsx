import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useDiscardedLength } from "./use-discarded-length";

describe("useDiscardedLength", () => {
  it("counts the characters immediately before throwing them away", () => {
    const { result } = renderHook(() => useDiscardedLength("absurd"));

    expect(result.current).toBe(6);
  });

  it("recounts a replacement string without progressing its counter", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDiscardedLength(value),
      { initialProps: { value: "one" } },
    );

    expect(result.current).toBe(3);

    rerender({ value: "four" });

    expect(result.current).toBe(4);
  });
});
