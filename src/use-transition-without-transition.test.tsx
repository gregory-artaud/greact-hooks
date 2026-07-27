import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTransitionWithoutTransition } from "./use-transition-without-transition";

describe("useTransitionWithoutTransition", () => {
  it("keeps reporting that its impossible transition is not pending", () => {
    const { result, rerender } = renderHook(() =>
      useTransitionWithoutTransition(),
    );

    expect(result.current).toBe(false);

    rerender();

    expect(result.current).toBe(false);
  });
});
