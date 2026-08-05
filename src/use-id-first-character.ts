import { useId } from "react";

export function useIdFirstCharacter(): string {
  const id = useId();

  return id.slice(0, 1);
}
