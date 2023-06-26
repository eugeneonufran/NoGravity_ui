import React, { useState } from "react";
import RouteForm from "./RouteForm";
import axios from "axios";
import { IRoute } from "../models/IRoute";
import { RouteList } from "./RoutesList";
import { seed } from "../seed";
import { SortType } from "../models/SortType";

const Booking: React.FC = () => {
  const [routes, setRoutes] = useState<IRoute[] | null>(null);

  const handleSubmit = async (
    departureStarportId: number,
    arrivalStarportId: number,
    date: string,
    SortType: number
  ) => {
    const url = `https://localhost:7283/api/Booking/findroutes?departureStarportId=${departureStarportId}&arrivalStarportId=${arrivalStarportId}&date=${date}&sortType=${SortType}`;

    try {
      const response = await axios.get<IRoute[]>(url);
      setRoutes(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <h1>ЗАМОВ КВИТКИ, ДУРІК</h1>
      <RouteForm onSubmit={handleSubmit} />
      <RouteList routes={routes} />
    </div>
  );
};

export default Booking;
