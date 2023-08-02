import { IPassengerWithSeat } from "../../models/IPassengerWithSeat";

interface PassengersWithSeatsListProps {
  passengers: IPassengerWithSeat[];
}

export const PassengersWithSeatsList = ({
  passengers,
}: PassengersWithSeatsListProps) => {
  return (
    <div>
      {passengers.map((passenger, index) => (
        <div key={index}>
          #:{index}
          Name:{passenger.passenger.name}, SurName:{passenger.passenger.surname}
          , email:
          {passenger.passenger.email}, cif:{passenger.passenger.cif}
          seat: {passenger.seat.seatNumber}
        </div>
      ))}
    </div>
  );
};
