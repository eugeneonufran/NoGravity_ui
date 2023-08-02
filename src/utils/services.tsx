import { IPassengerItem } from "../components/SeatMapForm";
import { IPassenger } from "../models/IPassenger";

export const Services = {
  convertToPassengersSeats: (passengers: IPassenger[]): IPassengerItem[] => {
    return passengers.map((passenger) => ({
      passenger: passenger,
      seat: null,
      error: null,
    }));
  },
};
