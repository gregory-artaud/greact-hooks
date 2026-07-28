import { useId } from "react";

export function useIdLength(): number {
  const id = useId();

  return id.length;
}
