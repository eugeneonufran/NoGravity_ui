import { IPassenger } from "../models/IPassenger";
import { PassengerDetails } from "./PassengerDetails";
import { Paypage } from "./Paypage";
import { SeatMap } from "./SeatMap";
import { useMultistepBookingForm } from "./useMultistepBookingForm";
import { useState } from "react";

export const BookingForm = () => {
  const initPassenger = { name: "", surname: "", email: "", cif: "" };
  const [passengersList, setPassengersList] = useState<IPassenger[]>([
    initPassenger,
  ]);

  const {
    currentForm,
    currentStep,
    goForward,
    goBackward,
    isFirstStep,
    isLastStep,
  } = useMultistepBookingForm([
    <PassengerDetails
      passengersList={passengersList}
      setPassengersList={setPassengersList}
      initPassenger={initPassenger}
    />,
    <SeatMap passengersList={passengersList} />,
    <Paypage passengersList={passengersList} />,
  ]);

  return (
    <div>
      <form>
        {currentForm}
        {!isLastStep && (
          <button type='button' onClick={goForward}>
            Next
          </button>
        )}
        {isLastStep && <button type='button'>Finish</button>}
        {!isFirstStep && (
          <button type='button' onClick={goBackward}>
            Back
          </button>
        )}
        current formstep:{currentStep}
      </form>
    </div>
  );
};
