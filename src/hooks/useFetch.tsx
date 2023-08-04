import axios from "axios";
import { IRoute } from "../models/IRoute";
import { useState } from "react";
import { IStarport } from "../models/IStarport";
import { ISeat } from "../models/ISeat";
import { IPassenger } from "../models/IPassenger";
import { IPassengerWithSeat } from "../models/IPassengerWithSeat";
import { IOrderRequest } from "../models/IOrderRequest";

export const useFetch = (api_domain: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchRoutes = async (
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

  const fetchPorts = async () => {
    setLoading(true);
    setError(null);
    const url = `${api_domain}/api/Starports/getall`;
    try {
      const response = await axios.get<IStarport[]>(url);
      return response.data;
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSeatsForRoute = async (route: IRoute) => {
    setLoading(true);
    setError(null);
    const url = `${api_domain}/api/Booking/seats`;
    try {
      const response = await axios.post<ISeat[]>(url, route);
      return response.data;
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const orderRoute = async (
    route: IRoute,
    seatNumber: number,
    firstName: string,
    lastName: string,
    cif: string,
    userId: number,
    actuallyCreateTicket: boolean
  ) => {
    const url = `${api_domain}/api/Booking/order?seatNumber=${seatNumber}&firstName=${firstName}&lastName=${lastName}&cif=${cif}&userId=${userId}&actuallyCreateTicket=${actuallyCreateTicket}`;

    try {
      const response = await axios.post(url, route, {
        responseType: "blob", // Specify that the response should be treated as a Blob
      });

      return response?.data;
    } catch (error) {
      console.error(error);
      //throw new Error("An error occurred while processing the order.");
    }
  };

  const orderRouteM = async (orderRequest: IOrderRequest) => {
    const url = `${api_domain}/api/Booking/orderM`;

    try {
      const response = await axios.post(url, orderRequest, {
        responseType: "blob", // Specify that the response should be treated as a Blob
      });

      return response?.data;
    } catch (error) {
      console.error(error);
      //throw new Error("An error occurred while processing the order.");
    }
  };

  return {
    fetchRoutes,
    fetchPorts,
    fetchSeatsForRoute,
    orderRoute,
    orderRouteM,
    loading,
    error,
  };
};
