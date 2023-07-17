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
  const [passengersSeats, setPassengersSeats] =
    useState<IPassengerSeat[]>(passengersSeatsList);

  const [selectedPassengerCIF, setSelectedPassengerCIF] = useState<
    string | null
  >(null);

  const handleSelectPassenger = (passengerCIF: string | null) => {
    setSelectedPassengerCIF(passengerCIF);
  };

  const handleRemoveSelection = () => {
    setSelectedPassengerCIF(null);
  };

  // const [chosenseats, setChosenSeats] = useState<ISeat[]>([]);

  const onClickSeat = (seat: ISeat) => {
    if (seat.isVacant === false) {
      return;
    }

    // Check if the seat is already chosen
    const isSeatChosen = passengersSeats.some(
      (passengerSeat) => passengerSeat.seat?.id === seat.id
    );

    if (isSeatChosen && selectedPassengerCIF === null) {
      const updatedPassengersSeatsList = passengersSeats.map(
        (chosenPS: IPassengerSeat) => {
          if (chosenPS.seat?.id === seat.id) {
            return {
              ...chosenPS,
              seat: null,
            };
          }
          return chosenPS;
        }
      );

      setSelectedPassengerCIF(null);
      setPassengersSeats(updatedPassengersSeatsList);
      return;
    }

    if (isSeatChosen && selectedPassengerCIF !== null) {
      const updatedPassengersSeatsList = passengersSeats.map(
        (chosenPS: IPassengerSeat) => {
          if (chosenPS.seat?.id === seat.id) {
            return {
              ...chosenPS,
              seat: null,
            };
          }
          return chosenPS;
        }
      );

      const updatedPassengersSeatsList2 = updatedPassengersSeatsList.map(
        (chosenPS: IPassengerSeat) => {
          if (chosenPS.passenger.cif.toString() === selectedPassengerCIF) {
            return {
              ...chosenPS,
              seat: seat,
            };
          }
          return chosenPS;
        }
      );

      setSelectedPassengerCIF(null);
      setPassengersSeats(updatedPassengersSeatsList2);
      return;
    }

    if (!isSeatChosen && selectedPassengerCIF !== null) {
      console.log(!isSeatChosen, selectedPassengerCIF);
      console.log(passengersSeats);
      const updatedPassengersSeatsList = passengersSeats.map(
        (chosenPS: IPassengerSeat) => {
          if (chosenPS.passenger.cif.toString() === selectedPassengerCIF) {
            return {
              ...chosenPS,
              seat: seat,
            };
          }
          return chosenPS;
        }
      );
      console.log(updatedPassengersSeatsList);
      setPassengersSeats(updatedPassengersSeatsList);
      setSelectedPassengerCIF(null);
      return;
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
                  passengersSeats.some(
                    (chosenSeat) => chosenSeat.seat?.id === seat.id
                  )
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
        {passengersSeats.map((seat) => (
          <div key={seat.seat?.id}>{seat.seat?.seatNumber}</div>
        ))}
        Selected passenger:{selectedPassengerCIF}
        <div>
          {passengersSeats.map((passengerSeat, index) => (
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
        <button type='button' onClick={handleRemoveSelection}>
          Remove passenger selection
        </button>
      </div>
    </div>
  );
};
