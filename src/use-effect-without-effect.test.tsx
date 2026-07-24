import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useEffectWithoutEffect } from "./use-effect-without-effect";

describe("useEffectWithoutEffect", () => {
  it("keeps having no effect after a rerender", () => {
    const { result, rerender } = renderHook(() => useEffectWithoutEffect());

    expect(result.current).toBeUndefined();

    rerender();

    expect(result.current).toBeUndefined();
  });
});
