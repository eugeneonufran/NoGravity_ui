import { IPassenger } from "../models/IPassenger";
import { IPassengerWithSeat } from "../models/IPassengerWithSeat";
import { IRoute } from "../models/IRoute";
import { PassengersList } from "./PassengersList";
import Route from "./Route";

interface PaypageProps {
  passengerWithSeats: IPassengerWithSeat[] | null;
  passengersList: IPassenger[];
}

export const Paypage = ({
  passengersList,
  passengerWithSeats,
}: PaypageProps) => {
  const gI = localStorage.getItem("chosenRoute");
  const route = gI ? JSON.parse(gI) : [];

  console.log(passengerWithSeats);
  return (
    <div>
      <Route route={route} />
      <PassengersList passengers={passengersList} />
    </div>
  );
};
