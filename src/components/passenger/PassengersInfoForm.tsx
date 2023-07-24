import { IPassenger } from "../../models/IPassenger";
import { useState } from "react";
import { FormInput } from "./FormInput";

interface PassengersInfoFormProps {
  goForward: () => void;
}

export const PassengersInfoForm = ({ goForward }: PassengersInfoFormProps) => {
  const initPassenger: IPassenger = {
    name: "",
    surname: "",
    email: "",
    cif: "",
  };

  const [data, setData] = useState<IPassenger[]>([{ ...initPassenger }]);
  const handleBlur = (field: keyof IPassenger, value: string) => {
    // Handle onBlur logic here if needed, for example, validation checks.
    // For now, we can leave it empty since the validation logic is in the child component.
  };

  const updatePassengerData = (index: number, updatedPassenger: IPassenger) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = updatedPassenger;
      return newData;
    });
  };

  const handleAddPassenger = () => {
    const updatedPassengers = [...data, { ...initPassenger }];
    setData(updatedPassengers);
    //localStorage.setItem("passengers", JSON.stringify(updatedPassengers));
  };

  const [hasError, setHasError] = useState<boolean>(false);

  const handleOnClick = () => {
    goForward();
    return;
  };

  const handleDeletePassenger = (index: number) => {
    const updatedPassengers = [...data];
    updatedPassengers.splice(index, 1);
    setData(updatedPassengers);
    //localStorage.setItem("passengers", JSON.stringify(updatedPassengers));
  };

  return (
    <>
      {data.map((passenger, index) => (
        <>
          <FormInput
            index={index}
            passenger={passenger}
            setHasError={setHasError}
            updatePassengerData={updatePassengerData}
            handleBlur={handleBlur}
          />
          <button type='button' onClick={() => handleDeletePassenger(index)}>
            -
          </button>
        </>
      ))}
      <button type='button' onClick={handleAddPassenger}>
        +
      </button>

      <button type='button' disabled={hasError} onClick={handleOnClick}>
        Next
      </button>
      {hasError && <span style={{ color: "red" }}>{"Check the form"}</span>}
    </>
  );
};
