import { useState, useEffect } from "react";

function useDebounce(value: string | null, delay: number): string | null {
  const [debouncedValue, setDebouncedValue] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
