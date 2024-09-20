import { useState, useEffect, useCallback } from "react";

let timeout: number = 0;

export function useTextTransition(duration = 1000) {
  const [ready, setReady] = useState(false);

  const resetTransition = useCallback((timeout: number = 0) => {
    timeout && window.clearTimeout(timeout);
    setReady(false);
  }, []);

  useEffect(() => {
    if (ready) {
      return;
    }

    timeout = window.setTimeout(() => {
      setReady(true);
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [duration, ready]);

  return { ready, resetTransition };
}
