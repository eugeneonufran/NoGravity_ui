import { IPassengerWithSeat } from "../../models/IPassengerWithSeat";
import { PassengersWithSeatsList } from "./PassengersWithSeatsList";
import Route from "../../components/Route";

interface CheckoutFormProps {
  passengerWithSeats: IPassengerWithSeat[] | null;
}

export const CheckoutForm = ({ passengerWithSeats }: CheckoutFormProps) => {
  const gI = localStorage.getItem("chosenRoute");
  const route = gI ? JSON.parse(gI) : [];

  console.log(passengerWithSeats);
  return (
    <div>
      <Route route={route} readonly={true} />
      {passengerWithSeats ? (
        <PassengersWithSeatsList passengers={passengerWithSeats} />
      ) : (
        ""
      )}
    </div>
  );
};
