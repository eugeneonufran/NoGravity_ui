import { ReactElement, useState } from "react";

export function useMultistepBookingForm(steps: ReactElement[]) {
  const [currentStep, setCurrentStep] = useState(0);

  const goForward = () => {
    setCurrentStep(currentStep + 1);
  };

  const goBackward = () => {
    setCurrentStep(currentStep - 1);
  };

  return {
    currentForm: steps[currentStep],
    currentStep,
    goForward,
    goBackward,
    isFirstStep: currentStep === 0,
    isLastStep: steps.length - 1 === currentStep,
  };
}
