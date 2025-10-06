import { describe, it, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useToggleToggle } from "./useToggleToggle";

describe("useToggleToggle", () => {
  it("defaults to false when no initial state is provided", () => {
    const { result } = renderHook(() => useToggleToggle());
    const [state] = result.current;
    expect(state).toBe(false);
  });

  it("respects the provided initial state", () => {
    const { result } = renderHook(() => useToggleToggle(true));
    const [state] = result.current;
    expect(state).toBe(true);
  });

  it("toggles the state when the toggle function is called", () => {
    const { result } = renderHook(() => useToggleToggle(false));

    act(() => {
      const [, toggle] = result.current;
      toggle();
    });

    let [state] = result.current;
    expect(state).toBe(true);

    act(() => {
      const [, toggle] = result.current;
      toggle();
    });

    [state] = result.current;
    expect(state).toBe(false);
  });

  it("keeps the same toggle reference across rerenders", () => {
    const { result } = renderHook(() => useToggleToggle(true));

    const [, firstToggle] = result.current;

    act(() => {
      const [, toggle] = result.current;
      toggle();
    });

    const [, secondToggle] = result.current;
    expect(secondToggle).toBe(firstToggle);
  });
});
