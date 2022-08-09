import { useState } from "react";

const useValidation = (validate) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validate(value);
  const hasError = !isValid && isTouched;

  const inputHandler = (event) => {
    setValue(event.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    isTouched,
    isValid,
    hasError,
    inputHandler,
    blurHandler,
    reset,
  };
};

export default useValidation;
