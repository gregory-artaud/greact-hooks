import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useNoChangeReducer } from "./use-no-change-reducer";

describe("useNoChangeReducer", () => {
  it("provides a dispatch that cannot change the state", () => {
    const { result } = renderHook(() => useNoChangeReducer("unchanged"));

    act(() => {
      result.current[1]();
      result.current[1]();
    });

    expect(result.current[0]).toBe("unchanged");
  });

  it("ignores a replacement initial value and keeps the same dispatch", () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useNoChangeReducer(initialValue),
      { initialProps: { initialValue: "first" } },
    );
    const dispatch = result.current[1];

    rerender({ initialValue: "ignored" });

    expect(result.current[0]).toBe("first");
    expect(result.current[1]).toBe(dispatch);
  });
});
