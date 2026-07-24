import { useEffect } from "react";

export function useEffectWithoutEffect(): void {
  useEffect(() => {}, []);
}
