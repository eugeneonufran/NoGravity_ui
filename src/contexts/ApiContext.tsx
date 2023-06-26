import { createContext, ReactNode, useState } from "react";
import webSettings from "../configs/webSettings.json";

type ApiContextProps = {
  api_domain: string;
  setApiDomain: (api_domain: string) => void;
};

type ApiContextProviderProps = {
  children: ReactNode;
};

export const ApiContext = createContext<ApiContextProps>({
  api_domain: webSettings.api_domain,
  setApiDomain: () => {},
});

export const ApiContextProvider = ({ children }: ApiContextProviderProps) => {
  const [api_domain, setApiDomain] = useState<string>(webSettings.api_domain);

  return (
    <ApiContext.Provider value={{ api_domain, setApiDomain }}>
      {children}
    </ApiContext.Provider>
  );
};
