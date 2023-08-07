import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";

import Route from "../src/components/Route";
import { seed } from "./seed";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div className='index'>
    <App />
  </div>
);
