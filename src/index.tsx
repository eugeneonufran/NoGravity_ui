import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";

import { AuthContextProvider } from "./contexts/AuthContext";
import { DataContextProvider } from "./contexts/DataContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthContextProvider>
    <DataContextProvider>
      <div className='index'>
        <App />
      </div>
    </DataContextProvider>
  </AuthContextProvider>
);
