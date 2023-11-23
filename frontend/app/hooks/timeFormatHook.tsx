import { useEffect, useState } from "react";

const useTimeInput = (initialValue = "") => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
  const [timeValue, setTimeValue] = useState(initialValue);
  const [isValidTime, setIsValidTime] = useState(true);

  useEffect(() => {
    const validationTimer = setTimeout(() => {
      validateTime();
    }, 200);

    return () => clearTimeout(validationTimer);
  }, [timeValue]);

  const validateTime = () => {
    const isValid = timeRegex.test(timeValue);
    setIsValidTime(isValid);
  };

  const formatTime = (text: string) => {
    const formattedText = text.replace(/\D/g, "").slice(0, 6);
    let formattedValue = formattedText.replace(/(\d{2})(\d{1,2})?(\d{1,2})?/, (_, p1, p2, p3) => {
      let result = "";
      if (p1) result += p1;
      if (p2) result += `:${p2}`;
      if (p3) result += `:${p3}`;
      return result;
    });

    const isValid = timeRegex.test(formattedValue) || formattedValue === "";
    setIsValidTime(isValid);
    setTimeValue(formattedValue);
  };

  return { timeValue, setTimeValue, formatTime, isValidTime };
};

export default useTimeInput;
