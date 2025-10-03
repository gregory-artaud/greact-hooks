// useState2.test.tsx
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { useState2 } from "./use-state-2";
import { describe, expect, test } from "vitest";

type S = { a: number; b: number; deep?: { x: number } };

describe("useState2", () => {
  test("retourne l'état initial (copie superficielle)", () => {
    const initial: S = { a: 1, b: 2, deep: { x: 1 } };
    const { result } = renderHook(() => useState2(initial));
    const [state] = result.current;
    expect(state).toEqual(initial);
    expect(state).not.toBe(initial); // copie
    expect(state!.deep).toBe(initial.deep); // shallow copy only
  });

  test("merge un patch objet (Partial<T>)", () => {
    const { result } = renderHook(() => useState2<S>({ a: 1, b: 2 }));
    act(() => {
      const [, setState] = result.current;
      setState({ b: 5 });
    });
    const [state] = result.current;
    expect(state).toEqual({ a: 1, b: 5 });
  });

  test("updater: reçoit le prev et peut retourner un patch", () => {
    const { result } = renderHook(() => useState2<S>({ a: 1, b: 2 }));
    act(() => {
      const [, setState] = result.current;
      setState((prev) => ({ b: prev.a + prev.b }));
    });
    const [state] = result.current;
    expect(state).toEqual({ a: 1, b: 3 });
  });

  test("updater: peut retourner un T complet", () => {
    const { result } = renderHook(() => useState2<S>({ a: 0, b: 0 }));
    act(() => {
      const [, setState] = result.current;
      setState(() => ({ a: 10, b: 20, deep: { x: 7 } }));
    });
    const [state] = result.current;
    expect(state).toEqual({ a: 10, b: 20, deep: { x: 7 } });
  });

  test("immutabilité: modifier l'objet retourné ne touche pas l'interne", () => {
    const { result } = renderHook(() => useState2<S>({ a: 1, b: 2 }));
    const [stateBefore] = result.current;
    (stateBefore as any).a = 999; // mutation externe
    const [stateAfter] = result.current; // même rendu
    expect(stateAfter.a).toBe(1);
  });

  test("références: state change à chaque update, setState reste stable", () => {
    const { result, rerender } = renderHook(() => useState2<S>({ a: 1, b: 2 }));
    const [, setState1] = result.current;

    rerender();
    const [, setState2] = result.current;
    expect(setState2).toBe(setState1); // stable

    const [s1] = result.current;
    act(() => {
      const [, setState] = result.current;
      setState({ a: 2 });
    });
    const [s2] = result.current;
    expect(s2).not.toBe(s1); // nouvelle référence
    expect(s2).toEqual({ a: 2, b: 2 });
  });

  test("patch vide n'altère pas les autres clés", () => {
    const { result } = renderHook(() => useState2<S>({ a: 1, b: 2 }));
    act(() => {
      const [, setState] = result.current;
      setState({});
    });
    const [state] = result.current;
    expect(state).toEqual({ a: 1, b: 2 });
  });

  test("merge est superficiel (shallow)", () => {
    const { result } = renderHook(() =>
      useState2<S>({ a: 1, b: 2, deep: { x: 1 } }),
    );
    act(() => {
      const [, setState] = result.current;
      setState({ deep: { x: 9 } });
    });
    const [state] = result.current;
    expect(state.deep).toEqual({ x: 9 }); // remplace l'objet, ne merge pas en profondeur
  });
});
