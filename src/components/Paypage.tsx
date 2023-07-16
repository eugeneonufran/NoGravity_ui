import { IPassenger } from "../models/IPassenger";
import { PassengersList } from "./PassengersList";

interface PaypageProps {
  passengersList: IPassenger[];
}

export const Paypage = ({ passengersList }: PaypageProps) => {
  return <PassengersList passengers={passengersList} />;
};
