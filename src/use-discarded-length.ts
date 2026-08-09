import { useRef } from "react";

export function useDiscardedLength(value: string): number {
  const counter = useRef(0);
  const characters = [...value];
  const count = counter.current + characters.length;

  characters.length = 0;

  return count;
}
