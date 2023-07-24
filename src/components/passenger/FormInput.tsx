import { IPassenger } from "../../models/IPassenger";
import { useState } from "react";
import { useValidateField } from "./useValidateField";

interface FormInputProps {
  index: number;
  passenger: IPassenger;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  handleBlur: (field: keyof IPassenger, value: string) => void;
  updatePassengerData: (index: number, updatedPassenger: IPassenger) => void;
}

export const FormInput = ({
  index,
  passenger,
  updatePassengerData,
}: FormInputProps) => {
  const { validateField, getErrorMessage } = useValidateField();
  const handleChangePassenger = (
    index: number,
    field: keyof IPassenger,
    value: string
  ) => {
    const updatedPassenger = { ...passenger, [field]: value };
    updatePassengerData(index, updatedPassenger);
    //localStorage.setItem("passengers", JSON.stringify(updatedPassengers));
  };

  const [errors, setErrors] = useState<{ [key in keyof IPassenger]: boolean }>({
    name: false,
    surname: false,
    email: false,
    cif: false,
  });

  const handleBlur = (field: string, value: string) => {
    const updatedErrors = { ...errors, [field]: !validateField(field, value) };
    setErrors(updatedErrors);
    console.log(errors);
  };

  const handleFocus = (field: string, value: string) => {
    const updatedErrors = { ...errors, [field]: false };
    setErrors(updatedErrors);
    console.log(errors);
  };

  return (
    <div key={index}>
      Passenger # {index}
      <input
        type='text'
        placeholder='Name'
        value={passenger.name}
        onBlur={(event) => handleBlur("name", event.target.value)}
        onFocus={(event) => handleFocus("name", event.target.value)}
        onChange={(event) =>
          handleChangePassenger(index, "name", event.target.value)
        }
      />
      {errors.name && (
        <span style={{ color: "red" }}>{getErrorMessage("name")}</span>
      )}
      <input
        type='text'
        placeholder='Surname'
        value={passenger.surname}
        onBlur={(event) => handleBlur("surname", event.target.value)}
        onFocus={(event) => handleFocus("surname", event.target.value)}
        onChange={(event) =>
          handleChangePassenger(index, "surname", event.target.value)
        }
      />
      {errors.surname && (
        <span style={{ color: "red" }}>{getErrorMessage("surname")}</span>
      )}
      <input
        type='text'
        placeholder='Email'
        value={passenger.email}
        onBlur={(event) => handleBlur("email", event.target.value)}
        onFocus={(event) => handleFocus("email", event.target.value)}
        onChange={(event) =>
          handleChangePassenger(index, "email", event.target.value)
        }
      />
      {errors.email && (
        <span style={{ color: "red" }}>{getErrorMessage("email")}</span>
      )}
      <input
        type='text'
        placeholder='CIF'
        value={passenger.cif}
        onBlur={(event) => handleBlur("cif", event.target.value)}
        onFocus={(event) => handleFocus("cif", event.target.value)}
        onChange={(event) =>
          handleChangePassenger(index, "cif", event.target.value)
        }
      />
      {errors.cif && (
        <span style={{ color: "red" }}>{getErrorMessage("cif")}</span>
      )}
    </div>
  );
};
