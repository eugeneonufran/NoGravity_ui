import React, { useState, useEffect } from "react";
import RouteForm from "../RouteForm";
import RouteComponent from "./Route";
import axios from "axios";
import { IRoute } from "../types/IRoute";

const Booking: React.FC = () => {
  const [route, setRoute] = useState<IRoute | null>(null);

  const handleSubmit = async (
    departureStarportId: number,
    arrivalStarportId: number,
    date: string
  ) => {
    const url = `https://localhost:7283/api/Booking/findroutes?departureStarportId=${departureStarportId}&arrivalStarportId=${arrivalStarportId}&date=${date}`;

    try {
      const response = await axios.get<IRoute>(url);
      setRoute(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    // Fetch initial route on component mount
    handleSubmit(1, 2, "2023-05-10");
  }, []);

  return (
    <div>
      <h1>My App</h1>
      <RouteForm onSubmit={handleSubmit} />
      {route && <RouteComponent route={route} />}
    </div>
  );
};

export default Booking;
