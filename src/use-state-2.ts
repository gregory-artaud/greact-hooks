import React, { useCallback } from "react";

type Updater<T> = (p: T) => T | Partial<T>;
type Mutable = Record<PropertyKey, unknown>;

function isUpdater<T>(v: Partial<T> | Updater<T>): v is Updater<T> {
  return typeof v === "function";
}

function isObjectLike(value: unknown): value is Mutable {
  return typeof value === "object" && value !== null;
}

function cloneShallow<T>(value: T): T {
  if (!isObjectLike(value)) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.slice() as unknown as T;
  }
  return { ...(value as Mutable) } as T;
}

const READ_ONLY_TRAPS: ProxyHandler<Mutable> = {
  set: () => true,
  defineProperty: () => true,
  deleteProperty: () => true,
};

function createSnapshot<T>(value: T): T {
  if (!isObjectLike(value)) {
    return value;
  }
  const snapshot = cloneShallow(value) as Mutable;
  return new Proxy(snapshot, READ_ONLY_TRAPS) as unknown as T;
}

function mergeState<T>(current: T, patch: T | Partial<T> | undefined): T {
  if (patch === undefined) {
    return current;
  }
  if (isObjectLike(current) && isObjectLike(patch)) {
    return {
      ...(current as Mutable),
      ...(patch as Mutable),
    } as T;
  }
  return patch as T;
}

export function useState2<T>(initialState: T) {
  const [internalState, internalSetState] = React.useState(() =>
    cloneShallow(initialState),
  );

  const state = React.useMemo(
    () => createSnapshot(internalState),
    [internalState],
  );

  const setState = useCallback(
    (next: Partial<T> | Updater<T>) => {
      internalSetState((current) => {
        if (isUpdater(next)) {
          const patch = next(createSnapshot(current));
          return mergeState(current, patch);
        }
        return mergeState(current, next);
      });
    },
    [internalSetState],
  );

  return [state, setState] as const;
}
