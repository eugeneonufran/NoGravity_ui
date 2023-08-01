import { useState } from "react";

export function useStepManager(steps: number) {
  const [currentStep, setCurrentStep] = useState(0);

  const goForward = () => {
    setCurrentStep(currentStep + 1);
  };

  const goBackward = () => {
    setCurrentStep(currentStep - 1);
  };

  return {
    currentStep,
    goForward,
    goBackward,
    isFirstStep: currentStep === 0,
    isLastStep: steps - 1 === currentStep,
  };
}
