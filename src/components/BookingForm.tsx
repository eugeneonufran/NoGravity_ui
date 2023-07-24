import { IPassenger } from "../models/IPassenger";
import { PassengerDetails } from "./PassengerDetails";
import { Paypage } from "./Paypage";
import { SeatMap } from "./SeatMap";
import { useStepManager } from "./useStepManager";
import { useState } from "react";
import { StepManagerNav } from "../models/StepManagerNav";
import { PassengersInfoForm } from "./passenger/PassengersInfoForm";

export const BookingForm = () => {
  const initPassenger = { name: "", surname: "", email: "", cif: "" };
  const [passengersList, setPassengersList] = useState<IPassenger[]>([
    initPassenger,
  ]);

  const { currentStep, goForward, goBackward, isFirstStep, isLastStep } =
    useStepManager(3);

  const navigate: StepManagerNav = {
    goForward: goForward,
    goBackward: goBackward,
    isFirstStep: isFirstStep,
    isLastStep: isLastStep,
  };

  const stepForms = [
    <PassengersInfoForm goForward={goForward} />,
    // <PassengerDetails
    //   passengersList={passengersList}
    //   setPassengersList={setPassengersList}
    //   initPassenger={initPassenger}
    //   navigate={navigate}
    // />,
    <SeatMap passengersList={passengersList} navigate={navigate} />,
    <Paypage passengersList={passengersList} />,
  ];

  return (
    <div>
      <form>{stepForms[currentStep]}</form>
    </div>
  );
};
