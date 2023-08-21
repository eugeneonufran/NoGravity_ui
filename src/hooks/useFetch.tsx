import axios, { AxiosError } from "axios";
import { IRoute } from "../models/_api/IRoute";
import { useState } from "react";
import { IStarport } from "../models/_api/IStarport";
import { ISeat } from "../models/_api/ISeat";
import { IOrderRequest } from "../models/IOrderRequest";
import { IUserRegister, IUserLogin, IUser } from "../models/IUser";
import { ITicket } from "../models/_api/ITicket";

export interface IFetchResult {
  code: string;
  message: string;
  data: any;
}

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

  const registerUser = async (userDTO: IUserRegister) => {
    const api = axios.create({
      baseURL: `${api_domain}/api/Auth`, // Update with your API URL
      withCredentials: true, // This is important for handling cookies
    });

    try {
      const response = await api.post("/register", userDTO);
      return { code: "200", message: "Success", data: response?.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError !== null) {
        return {
          code: axiosError.response?.status.toString() || "500", // Default to 500 if status is not available
          message: axiosError.response?.data as string,
          data: null,
        };
      }
      return {
        code: "500",
        message: "An error occurred",
        data: null,
      };
    }
  };

  const fetchUser = async (): Promise<IFetchResult> => {
    const api = axios.create({
      baseURL: `${api_domain}/api/Auth`, // Update with your API URL
      withCredentials: true, // This is important for handling cookies
    });

    try {
      const response = await api.get<IUser>("/user");

      return { code: "200", message: "Success", data: response?.data };
    } catch (error) {
      console.error(error);
      return {
        code: "500",
        message: "An error occurred while processing the request.",
        data: null,
      };
    }
  };

  const loginUser = async (userDTO: IUserLogin): Promise<IFetchResult> => {
    const api = axios.create({
      baseURL: `${api_domain}/api/Auth`, // Update with your API URL
      withCredentials: true, // This is important for handling cookies
    });

    try {
      const response = await api.post("/login", userDTO);
      return { code: "200", message: "Success", data: response?.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError !== null) {
        return {
          code: axiosError.response?.status.toString() || "500", // Default to 500 if status is not available
          message: axiosError.response?.data as string,
          data: null,
        };
      }
      return {
        code: "500",
        message: "An error occurred",
        data: null,
      };
    }
  };

  const getTicketsForUser = async (userId: number): Promise<IFetchResult> => {
    setLoading(true);
    setError(null);
    const endpoint = `/api/Account/getUserProfile?userId=${userId}`;

    const api = axios.create({
      baseURL: api_domain,
      withCredentials: true,
    });

    try {
      const response = await api.post(endpoint);
      return {
        code: "200",
        message: "Success",
        data: response?.data as ITicket[],
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError !== null) {
        return {
          code: axiosError.response?.status.toString() || "500", // Default to 500 if status is not available
          message: axiosError.response?.data as string,
          data: null,
        };
      }
      return {
        code: "500",
        message: "An error occurred",
        data: null,
      };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    const api = axios.create({
      baseURL: `${api_domain}/api/Auth`, // Update with your API URL
      withCredentials: true, // This is important for handling cookies
    });

    try {
      const response = await api.post("/logout");

      return { code: "200", message: "Success", data: response?.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError !== null) {
        return {
          code: axiosError.response?.status.toString() || "500", // Default to 500 if status is not available
          message: axiosError.response?.data as string,
          data: null,
        };
      }
      return {
        code: "500",
        message: "An error occurred",
        data: null,
      };
    }
  };

  const getTicketPDFByPath = async (path: string): Promise<Blob> => {
    console.log("path:", path);
    const endpoint = `/api/Account/getTicket?path=${encodeURIComponent(path)}`;
    console.log("endpoint:", endpoint);
    const api = axios.create({
      baseURL: api_domain,
      responseType: "blob", // Set the response type to 'blob' for binary data
      withCredentials: true,
    });

    try {
      const response = await api.post(endpoint);
      return new Blob([response.data], { type: "application/pdf" });
    } catch (error) {
      // Handle error
      throw error;
    }
  };

  return {
    fetchRoutes,
    fetchPorts,
    fetchSeatsForRoute,
    orderRoute,
    orderRouteM,
    loginUser,
    fetchUser,
    logoutUser,
    registerUser,
    getTicketsForUser,
    loading,
    getTicketPDFByPath,
    error,
  };
};
