// ------------ Library Imports ------------
import React, { useState, useContext } from "react";
import axios from "axios";

// ------------ Types Imports ------------
import { IRoute } from "../models/IRoute";

// ------------ Component Imports ------------
import RouteForm from "./RouteSearchForm";
import { RouteList } from "./RoutesList";

// ------------ Context Imports ------------
import { ApiContext } from "../contexts/ApiContext";

const BookingPage = () => {
  const [routes, setRoutes] = useState<IRoute[] | null>(null);
  const { api_domain } = useContext(ApiContext);

  const handleSubmit = async (
    departureStarportId: number,
    arrivalStarportId: number,
    date: string,
    SortType: number
  ) => {
    const url = `${api_domain}/api/Booking/findroutes?departureStarportId=${departureStarportId}&arrivalStarportId=${arrivalStarportId}&date=${date}&sortType=${SortType}`;

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

export default BookingPage;
