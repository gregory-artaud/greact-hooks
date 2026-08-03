import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useEraseThenReverse } from "./use-erase-then-reverse";

describe("useEraseThenReverse", () => {
  it("erases the last character before reversing what remains", () => {
    const { result } = renderHook(() => useEraseThenReverse("abcd"));

    expect(result.current).toBe("cba");
  });

  it("returns an empty string for strings with zero or one character", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useEraseThenReverse(value),
      { initialProps: { value: "a" } },
    );

    expect(result.current).toBe("");

    rerender({ value: "" });

    expect(result.current).toBe("");
  });

  it("repeats the detour for a replacement string", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useEraseThenReverse(value),
      { initialProps: { value: "first" } },
    );

    rerender({ value: "second" });

    expect(result.current).toBe("noces");
  });
});
