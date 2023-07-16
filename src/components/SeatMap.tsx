import { IPassenger } from "../models/IPassenger";
import { PassengersList } from "./PassengersList";

interface SeatMapProps {
  passengersList: IPassenger[];
}

export const SeatMap = ({ passengersList }: SeatMapProps) => {
  return <PassengersList passengers={passengersList} />;
};
