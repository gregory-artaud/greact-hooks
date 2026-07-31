import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePopThenPeek } from "./use-pop-then-peek";

describe("usePopThenPeek", () => {
  it("copies a list just to remove and return its last item", () => {
    const { result } = renderHook(() => usePopThenPeek(["first", "last"]));

    expect(result.current).toBe("last");
  });

  it("returns undefined for an empty list and updates for a new list", () => {
    const { result, rerender } = renderHook(
      ({ values }: { values: readonly string[] }) => usePopThenPeek(values),
      { initialProps: { values: [] as string[] } },
    );

    expect(result.current).toBeUndefined();

    rerender({ values: ["next"] });

    expect(result.current).toBe("next");
  });
});
