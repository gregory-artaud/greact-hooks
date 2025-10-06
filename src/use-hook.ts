import { useCallback } from "react";

type Param = {
  hook: () => void;
  name: string;
};

export function useHook({ hook, name }: Param) {
  if (typeof hook !== "function" || !name.startsWith("use")) {
    throw new Error("Invalid hook");
  }

  return useCallback(() => {
    hook();
  }, [hook, name]);
}
