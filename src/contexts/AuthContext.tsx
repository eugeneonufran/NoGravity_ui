import { createContext, ReactNode, useContext, useState } from "react";
import { IUser } from "../models/IUser";
import { useFetch } from "../hooks/useFetch";
import { ApiContext } from "./ApiContext";

type AuthContextProps = {
  user: IUser | null;
  setUser: (value: IUser) => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { api_domain } = useContext(ApiContext);
  const [user, setUser] = useState<IUser | null>(null);
  const { getUser } = useFetch(api_domain);

  const getUser = (async() = {});

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
