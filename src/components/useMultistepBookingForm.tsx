import { ReactElement, useState } from "react";

export function useMultistepBookingForm(forms: ReactElement[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const [passengerInfo, setPassengerInfo] = useState({});

  const goForward = () => {
    setCurrentStep(currentStep + 1);
  };

  const goBackward = () => {
    setCurrentStep(currentStep - 1);
  };

  return {
    currentForm: forms[currentStep],
    currentStep,
    goForward,
    goBackward,
    isFirstStep: currentStep === 0,
    isLastStep: forms.length - 1 === currentStep,
    passengerInfo,
    setPassengerInfo,
  };
}
