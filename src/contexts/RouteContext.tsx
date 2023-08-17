import { ReactNode, useState, createContext } from "react";
import { IRoute } from "../models/IRoute";

interface RouteContextProps {
  chosenRoute: IRoute | null;
  setChosenRoute: (route: IRoute) => void;
}

type RouteContextProviderProps = {
  children: ReactNode;
};

export const RouteContext = createContext<RouteContextProps>({
  chosenRoute: null,
  setChosenRoute: () => {},
});

export const RouteContextProvider = ({
  children,
}: RouteContextProviderProps) => {
  const [chosenRoute, setChosenRoute] = useState<IRoute | null>(null);
  // const [user, setUser, deleteUserStorage] = useLocalStorage<IUser | null>(
  //   stSettings.lsNames.USER
  // );
  return (
    <RouteContext.Provider value={{ chosenRoute, setChosenRoute }}>
      {children}
    </RouteContext.Provider>
  );
};
