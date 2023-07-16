import { IPassenger } from "../models/IPassenger";

interface PassengersListProps {
  passengers: IPassenger[];
}

export const PassengersList = ({ passengers }: PassengersListProps) => {
  return (
    <div>
      {passengers.map((passenger, index) => (
        <div>
          #:{index}
          Name:{passenger.name}, SurName:{passenger.surname}, email:
          {passenger.email}, cif:{passenger.cif}
        </div>
      ))}
    </div>
  );
};
