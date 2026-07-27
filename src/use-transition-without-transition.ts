import { useTransition } from "react";

export function useTransitionWithoutTransition(): boolean {
  const [isPending] = useTransition();

  return isPending;
}
