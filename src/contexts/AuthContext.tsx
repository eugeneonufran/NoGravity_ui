import { createContext, ReactNode, useContext, useState } from "react";
import { IUser, IUserLogin, IUserRegister } from "../models/IUser";
import { useFetch, IFetchResult } from "../hooks/useFetch";
import { ApiContext } from "./ApiContext";

type AuthContextProps = {
  user: IUser | null;
  login: (userDTO: IUserLogin) => Promise<IFetchResult>;
  logout: () => Promise<IFetchResult>;
  register: (userDTO: IUserRegister) => Promise<IFetchResult>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => ({ code: "", data: null, message: "" }), // Placeholder
  logout: async () => ({ code: "", data: null, message: "" }),
  register: async () => ({ code: "", data: null, message: "" }),
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const { api_domain } = useContext(ApiContext);
  const [user, setUser] = useState<IUser | null>(null);
  const { loginUser, logoutUser, fetchUser, registerUser } =
    useFetch(api_domain);

  const login = async ({ email, password }: IUserLogin) => {
    const result = await loginUser({ email, password });

    if (result.code === "200") {
      const fetchedUser = await fetchUser();

      setUser(fetchedUser.data as IUser); // Fetch user data after successful login
    }

    return result;
  };

  const logout = async () => {
    const result = await logoutUser();

    if (result.code === "200") {
      setUser(null); // Fetch user data after successful login
    }

    return result;
  };

  const register = async ({
    firstName,
    secondName,
    email,
    password,
  }: IUserRegister) => {
    const result = await registerUser({
      firstName,
      secondName,
      email,
      password,
    });

    if (result.code === "200") {
      // Fetch user data after successful login
    }

    return result;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
