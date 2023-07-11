import { useState } from "react";
import { SeatMap } from "./SeatMap";
import { PassengerDetails } from "./PassengerDetails";

export const BookingFlowContainer = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  return (
    <div>
      {currentStep === 1 && <SeatMap />}
      {currentStep === 2 && <PassengerDetails />}
    </div>
  );
};
