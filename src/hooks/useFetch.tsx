import axios from "axios";
import { IRoute } from "../models/IRoute";
import { useState } from "react";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchRoutes = async (
    api_domain: string,
    departureStarportId: number,
    arrivalStarportId: number,
    date: string,
    SortType: number
  ) => {
    const url = `${api_domain}/api/Booking/findroutes?departureStarportId=${departureStarportId}&arrivalStarportId=${arrivalStarportId}&date=${date}&sortType=${SortType}`;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<IRoute[]>(url);
      return response.data;
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchRoutes, loading, error };
};
