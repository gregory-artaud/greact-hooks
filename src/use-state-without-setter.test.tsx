import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useStateWithoutSetter } from "./use-state-without-setter";

describe("useStateWithoutSetter", () => {
  it("keeps the initial state without providing any way to change it", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useStateWithoutSetter(value),
      { initialProps: { value: "first" } },
    );

    expect(result.current).toBe("first");

    rerender({ value: "second" });

    expect(result.current).toBe("first");
  });
});
