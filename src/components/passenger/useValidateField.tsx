export const useValidateField = () => {
  const validateName = (value: string): boolean => {
    const latinLettersRegex = /^[A-Za-z]+$/;
    return latinLettersRegex.test(value);
  };

  const validateSurname = (value: string): boolean => {
    const latinLettersRegex = /^[A-Za-z]+$/;
    return latinLettersRegex.test(value);
  };

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
    return emailRegex.test(value);
  };

  const validateCIF = (value: string): boolean => {
    const cifRegex = /^[A-Z0-9]{4}-\d{4}-[A-Z0-9-]{3}$/;
    return cifRegex.test(value);
  };

  const nameErrorText = "Name must contain only Latin letters.";
  const surnameErrorText = "Surname must contain only Latin letters.";
  const emailErrorText = "Invalid email address.";
  const cifErrorText = "Invalid CIF format. Expected format: XXXX-0000-XXX";

  const validateField = (field: string, value: string): boolean => {
    switch (field) {
      case "name":
        return validateName(value);
      case "surname":
        return validateSurname(value);
      case "email":
        return validateEmail(value);
      case "cif":
        return validateCIF(value);
      default:
        return true; // Return true for unknown fields
    }
  };

  const getErrorMessage = (field: string): string | null => {
    switch (field) {
      case "name":
        return nameErrorText;
      case "surname":
        return surnameErrorText;
      case "email":
        return emailErrorText;
      case "cif":
        return cifErrorText;
      default:
        return null; // Return null for unknown fields
    }
  };

  return {
    validateField,
    getErrorMessage,
  };
};
