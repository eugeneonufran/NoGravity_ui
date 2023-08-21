import { IPassenger } from "../models/_api/IPassenger";

interface PassengersListProps {
  passengers: IPassenger[];
}

export const PassengersList = ({ passengers }: PassengersListProps) => {
  return (
    <div>
      {passengers.map((passenger, index) => (
        <div>
          #:{index}
          Name:{passenger.firstName}, SurName:{passenger.lastName}, email:
          {passenger.email}, cif:{passenger.cif}
        </div>
      ))}
    </div>
  );
};
