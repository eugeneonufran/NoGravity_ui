import React, { useState } from "react";
import RouteForm from "./RouteForm";
import axios from "axios";
import { IRoute } from "../types/IRoute";
import { RouteList } from "./RoutesList";
import { seed } from "../seed";

const Booking: React.FC = () => {
  const [route, setRoute] = useState<IRoute[] | null>(null);

  const handleSubmit = async (
    departureStarportId: number,
    arrivalStarportId: number,
    date: string
  ) => {
    const url = `https://localhost:7283/api/Booking/findroutes?departureStarportId=${departureStarportId}&arrivalStarportId=${arrivalStarportId}&date=${date}`;

    try {
      const response = await axios.get<IRoute[]>(url);
      setRoute(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <h1>My App</h1>
      <RouteForm onSubmit={handleSubmit} />
      <RouteList routes={seed} />
    </div>
  );
};

export default Booking;
