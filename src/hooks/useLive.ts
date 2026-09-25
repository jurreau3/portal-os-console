import { useEffect, useRef } from 'react';

/** Run a callback immediately and then at a fixed interval while mounted. */
export function useLive(callback: () => void, interval = 2000): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    callbackRef.current();
    const id = window.setInterval(() => callbackRef.current(), interval);
    return () => window.clearInterval(id);
  }, [interval]);
}
