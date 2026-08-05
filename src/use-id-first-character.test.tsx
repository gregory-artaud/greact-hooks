import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useIdFirstCharacter } from "./use-id-first-character";

describe("useIdFirstCharacter", () => {
  it("returns only the first character of its discarded React id", () => {
    const { result } = renderHook(() => useIdFirstCharacter());

    expect(result.current).toHaveLength(1);
    expect(typeof result.current).toBe("string");
  });

  it("keeps the same character after a rerender", () => {
    const { result, rerender } = renderHook(() => useIdFirstCharacter());
    const character = result.current;

    rerender();

    expect(result.current).toBe(character);
  });
});
