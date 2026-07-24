import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useRefRef } from "./use-ref-ref";

describe("useRefRef", () => {
  it("keeps a stable ref inside another stable ref", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useRefRef(value),
      { initialProps: { value: "first" } },
    );
    const outerRef = result.current;
    const innerRef = result.current.current;

    expect(innerRef.current).toBe("first");

    rerender({ value: "second" });

    expect(result.current).toBe(outerRef);
    expect(result.current.current).toBe(innerRef);
    expect(result.current.current.current).toBe("first");
  });
});
