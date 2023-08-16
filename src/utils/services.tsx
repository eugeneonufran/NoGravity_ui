import { IPassengerItem } from "../pages/BookingWizard/SeatMapForm";
import { IPassenger } from "../models/IPassenger";
import { IRoute } from "../models/IRoute";
import { IOrderRequest } from "../models/IOrderRequest";
import { IPassengerWithSeat } from "../models/IPassengerWithSeat";

export const Services = {
  convertToPassengersSeats: (passengers: IPassenger[]): IPassengerItem[] => {
    return passengers.map((passenger) => ({
      passenger: passenger,
      seat: null,
      error: null,
    }));
  },

  convertToOrderRequest: (
    route: IRoute,
    passengers: IPassengerWithSeat[],
    userId: number,
    actuallyCreateTicket: boolean
  ): IOrderRequest => {
    return {
      route: route,
      passengers: passengers,
      userId: userId,
      actuallyCreateTicket: actuallyCreateTicket,
    };
  },
};
