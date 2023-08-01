import { IPassenger } from "../models/IPassenger";
import { CheckoutForm } from "./CheckoutForm";
import { SeatMapForm } from "./SeatMapForm";
import { useStepManager } from "../hooks/useStepManager";
import { useState } from "react";
import { StepManagerNav } from "../models/StepManagerNav";
import { PassengersInfoForm } from "./passenger/PassengersInfoForm";
import { IPassengerWithSeat } from "../models/IPassengerWithSeat";

export const BookingWizard = () => {
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
    <SeatMapForm
      passengersList={passengersList}
      onNext={goForward}
      onBack={goBackward}
      setPassengersWithSeats={setPassengersWithSeats}
      navigate={navigate}
    />,
    <CheckoutForm passengerWithSeats={passengersWithSeats} />,
  ];

  return (
    <div>
      <form>{stepForms[currentStep]}</form>
    </div>
  );
};
