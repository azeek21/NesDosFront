import { useCallback } from "react";

function useDebouncer(delay: number, id: string) {
  const timeoutIds = new Map();

  const debounce = useCallback(
    (callback: () => any, id: string) => {
      clearTimeout(timeoutIds.get(id));
      const newId = setTimeout(() => {
        clearTimeout(timeoutIds.get(newId));
        console.log("call");
        callback();
      }, delay);
      timeoutIds.set(id, newId);
    },
    [id],
  );
  return debounce;
}

export { useDebouncer };
