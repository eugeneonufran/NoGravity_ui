export interface StepManagerNav {
  goForward: () => void;
  goBackward: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}
