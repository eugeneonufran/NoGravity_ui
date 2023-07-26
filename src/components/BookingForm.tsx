import { IPassenger } from "../models/IPassenger";
import { PassengerDetails } from "./PassengerDetails";
import { Paypage } from "./Paypage";
import { SeatMap } from "./SeatMap";
import { useStepManager } from "./useStepManager";
import { useState } from "react";
import { StepManagerNav } from "../models/StepManagerNav";
import { PassengersInfoForm } from "./passenger/PassengersInfoForm";
import { IPassengerWithSeat } from "../models/IPassengerWithSeat";

export const BookingForm = () => {
  const initPassenger = { name: "", surname: "", email: "", cif: "" };
  const [passengersList, setPassengersList] = useState<IPassenger[]>([
    initPassenger,
  ]);

  const [passengersWithSeats, setPassengersWithSeats] = useState<
    IPassengerWithSeat[] | null
  >(null);

  const { currentStep, goForward, goBackward, isFirstStep, isLastStep } =
    useStepManager(3);

  const navigate: StepManagerNav = {
    goForward: goForward,
    goBackward: goBackward,
    isFirstStep: isFirstStep,
    isLastStep: isLastStep,
  };

  const stepForms = [
    <PassengersInfoForm
      onNext={goForward}
      onBack={goBackward}
      setPassengersInfo={setPassengersList}
    />,
    <SeatMap
      passengersList={passengersList}
      onNext={goForward}
      onBack={goBackward}
      setPassengersWithSeats={setPassengersWithSeats}
      navigate={navigate}
    />,
    <Paypage
      passengersList={passengersList}
      passengerWithSeats={passengersWithSeats}
    />,
  ];

  return (
    <div>
      <form>{stepForms[currentStep]}</form>
    </div>
  );
};
