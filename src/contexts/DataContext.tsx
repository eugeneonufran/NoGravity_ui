import { ReactNode, createContext } from "react";
import { IRoute } from "../models/_api/IRoute";
import useSessionStorage from "../hooks/useSessionStorage";
import ssSettings from "../configs/storageSettings.json";
import mapper from "../models/Mapper";
import { IPassenger } from "../models/_api/IPassenger";
import { IPassengerWithSeat } from "../models/IPassengerWithSeat";

interface DataContextProps {
  chosenRoute: IRoute | null;
  setChosenRoute: (route: IRoute) => void;
  deleteChosenRoute: () => void;

  currentStep: keyof typeof mapper | null;
  setCurrentStep: (step: keyof typeof mapper) => void;
  deleteCurrentStep: () => void;

  passengers: IPassenger[] | null; // Include the passengers list
  setPassengers: (passengers: IPassenger[]) => void;
  deletePassengers: () => void;

  passengersWithSeats: IPassengerWithSeat[] | null;
  setPassengersWithSeats: (data: IPassengerWithSeat[]) => void;
  deletePassengersWithSeats: () => void;

  queryParams: string | null;
  setQueryParams: (params: string) => void;
  deleteQueryParams: () => void;
}

type DataContextProviderProps = {
  children: ReactNode;
};

export const DataContext = createContext<DataContextProps>({
  chosenRoute: null,
  setChosenRoute: () => {},
  deleteChosenRoute: () => {},

  currentStep: 0,
  setCurrentStep: () => {},
  deleteCurrentStep: () => {},

  passengers: null,
  setPassengers: () => {},
  deletePassengers: () => {},

  passengersWithSeats: null,
  setPassengersWithSeats: () => {},
  deletePassengersWithSeats: () => {},

  queryParams: null,
  setQueryParams: () => {},
  deleteQueryParams: () => {},
});

export const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [chosenRoute, setChosenRoute, deleteChosenRoute] =
    useSessionStorage<IRoute | null>(ssSettings.ssNames.CHOSEN_ROUTE);

  const [currentStep, setCurrentStep, deleteCurrentStep] = useSessionStorage<
    keyof typeof mapper | null
  >(ssSettings.ssNames.CURRENT_STEP);

  const [passengers, setPassengers, deletePassengers] = useSessionStorage<
    IPassenger[]
  >(ssSettings.ssNames.PASSENGERS);

  const [
    passengersWithSeats,
    setPassengersWithSeats,
    deletePassengersWithSeats,
  ] = useSessionStorage<IPassengerWithSeat[]>(
    ssSettings.ssNames.PASSENGERS_SEATS
  );

  const [queryParams, setQueryParams, deleteQueryParams] =
    useSessionStorage<string>(ssSettings.ssNames.QUERY_PARAMS);

  return (
    <DataContext.Provider
      value={{
        chosenRoute: chosenRoute ?? null,
        setChosenRoute,
        deleteChosenRoute,

        currentStep: currentStep ?? null,
        setCurrentStep,
        deleteCurrentStep,

        passengers: passengers ?? null,
        setPassengers,
        deletePassengers,

        passengersWithSeats: passengersWithSeats ?? null,
        setPassengersWithSeats,
        deletePassengersWithSeats,

        queryParams: queryParams ?? null,
        setQueryParams,
        deleteQueryParams,
      }}>
      {children}
    </DataContext.Provider>
  );
};
