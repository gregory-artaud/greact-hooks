import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useLowerThenUpper } from "./use-lower-then-upper";

describe("useLowerThenUpper", () => {
  it("lowers a string and immediately raises it again", () => {
    const { result } = renderHook(() => useLowerThenUpper("MiXeD"));

    expect(result.current).toBe("MIXED");
  });

  it("repeats the pointless detour for a replacement string", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useLowerThenUpper(value),
      { initialProps: { value: "First" } },
    );

    expect(result.current).toBe("FIRST");

    rerender({ value: "sEcOnD" });

    expect(result.current).toBe("SECOND");
  });
});
