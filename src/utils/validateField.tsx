export const validators = {
  firstName: {
    validate: (value: string) => value.trim() !== "",
    errorMessage: "First name is required.",
  },
  lastName: {
    validate: (value: string) => value.trim() !== "",
    errorMessage: "Last name is required.",
  },
  email: {
    validate: (value: string) =>
      value.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessage: "Invalid email format.",
  },
  cif: {
    validate: (value: string) => value.trim() !== "",
    errorMessage: "CIF is required.",
  },
};

export const validateField = (key: keyof typeof validators, value: string) => {
  const { validate, errorMessage } = validators[key];
  const isValid = validate(value);
  return {
    isValid,
    error: isValid ? null : errorMessage,
  };
};
