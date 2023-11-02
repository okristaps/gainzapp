import { useState, useEffect } from "react";

function useDebounce(value: string | null, delay: number): string | null {
  const [debouncedValue, setDebouncedValue] = useState<string | null>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value || debouncedValue?.length) {
        setDebouncedValue(value);
      }
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
