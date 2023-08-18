import { ReactNode, createContext } from "react";
import { IRoute } from "../models/IRoute";
import useSessionStorage from "../hooks/useSessionStorage";
import ssSettings from "../configs/storageSettings.json";
import mapper from "../models/Mapper";

interface DataContextProps {
  chosenRoute: IRoute | null;
  setChosenRoute: (route: IRoute) => void;
  deleteChosenRoute: () => void;

  currentStep: keyof typeof mapper | null;
  setCurrentStep: (step: keyof typeof mapper) => void;
  deleteCurrentStep: () => void;
}

type DataContextProviderProps = {
  children: ReactNode;
};

export const DataContext = createContext<DataContextProps>({
  chosenRoute: null,
  setChosenRoute: () => {},
  deleteChosenRoute: () => {},

  currentStep: null,
  setCurrentStep: () => {},
  deleteCurrentStep: () => {},
});

export const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [chosenRoute, setChosenRoute, deleteChosenRoute] =
    useSessionStorage<IRoute | null>(ssSettings.ssNames.CHOSEN_ROUTE);

  const [currentStep, setCurrentStep, deleteCurrentStep] = useSessionStorage<
    keyof typeof mapper | null
  >(ssSettings.ssNames.CURRENT_STEP);

  return (
    <DataContext.Provider
      value={{
        chosenRoute: chosenRoute ?? null,
        setChosenRoute,
        deleteChosenRoute,
        currentStep: currentStep ?? null,
        setCurrentStep,
        deleteCurrentStep,
      }}>
      {children}
    </DataContext.Provider>
  );
};
