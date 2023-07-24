import React from "react";

interface FormInputProps {
  field_name: string;
  placeholder: string;
  value: string;
  onItemBlur: (value: string) => void;
  onItemChange: (value: string) => void;
  hasError: boolean;
}

export const FormInput = ({
  field_name,
  placeholder,
  value,
  onItemChange,
  hasError,
  onItemBlur,
}: FormInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const inputValue = event.target.value;
    onItemChange(inputValue);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    const inputValue = event.target.value;
    onItemBlur(inputValue);
  };

  return (
    <div>
      {field_name}
      <input
        placeholder={placeholder}
        type='text'
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ border: hasError ? "1px solid red" : "1px solid #ccc" }}
      />
      {hasError && <span style={{ color: "red" }}>Error message here</span>}
    </div>
  );
};
