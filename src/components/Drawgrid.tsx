import { useState } from "react";
import { ISeat } from "../models/ISeat";
import "../styles/Drawgrid.css";
import { IPassengerSeat } from "../models/IPassengerSeat";

interface DrawgridProps {
  seats: ISeat[];
  passengersSeatsList: IPassengerSeat[];
  //   onClickSeat: (seat: ISeat) => void;
}

export const Drawgrid = ({ seats, passengersSeatsList }: DrawgridProps) => {
  const [selectedPassengerCIF, setSelectedPassengerCIF] = useState<
    string | null
  >(null);

  const handleSelectPassenger = (passengerCIF: string | null) => {
    setSelectedPassengerCIF(passengerCIF);
  };

  const [chosenseats, setChosenSeats] = useState<ISeat[]>([]);

  const onClickSeat = (seat: ISeat) => {
    if (seat.isVacant === false) {
      return;
    }

    // Check if the seat is already chosen
    const isSeatChosen = chosenseats.some(
      (chosenSeat) => chosenSeat.id === seat.id
    );

    if (isSeatChosen) {
      // Seat is already chosen, remove it from the list
      const updatedChosenSeats = chosenseats.filter(
        (chosenSeat) => chosenSeat.id !== seat.id
      );
      setChosenSeats(updatedChosenSeats);
    } else {
      // Seat is not chosen, add it to the list
      const updatedChosenSeats = [...chosenseats, seat];
      setChosenSeats(updatedChosenSeats);
    }
  };

  return (
    <div className='container'>
      <table className='grid'>
        <tbody>
          <tr>
            {seats.map((seat) => (
              <td
                className={`seat ${seat.isVacant ? "available" : "reserved"} ${
                  chosenseats.some((chosenSeat) => chosenSeat.id === seat.id)
                    ? "chosen"
                    : ""
                }`}
                key={seat.id}
                onClick={() => onClickSeat(seat)}>
                {seat.seatNumber}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div>
        {chosenseats.map((seat) => (
          <div key={seat.id}>{seat.seatNumber}</div>
        ))}
        Selected passenger:{selectedPassengerCIF}
        <div>
          {passengersSeatsList.map((passengerSeat, index) => (
            <div>
              #:{index}
              Name:{passengerSeat.passenger.name}, SurName:
              {passengerSeat.passenger.surname}, email:
              {passengerSeat.passenger.email}, cif:{passengerSeat.passenger.cif}
              THE SEAT: {passengerSeat.seat?.seatNumber}
              <button
                type='button'
                onClick={() =>
                  handleSelectPassenger(passengerSeat.passenger.cif)
                }>
                Select seat
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
