import { SetStateAction, useState } from "react";
import { ISeat } from "../../models/_api/ISeat";
import { SeatAllocationItem } from "../../models/SeatAllocationItem";

import "./Drawgrid.scss";

interface DrawgridProps {
  seats: ISeat[];
  passengersItems: SeatAllocationItem[];
  setPassengerItems: React.Dispatch<SetStateAction<SeatAllocationItem[]>>;
}

export const Drawgrid = ({
  seats,
  passengersItems,
  setPassengerItems,
}: DrawgridProps) => {
  const [selectedPassengerCIF, setSelectedPassengerCIF] = useState<
    string | null
  >(null);

  const handleSelectPassenger = (
    passengerCIF: string | null,
    index: number
  ) => {
    setSelectedPassengerCIF(passengerCIF);
    const updatedPassengerItems = passengersItems.map((passenger, p_index) => ({
      ...passenger,
      error: index === p_index ? null : passenger.error,
    }));
    setPassengerItems(updatedPassengerItems);
  };

  const handleRemoveSelection = () => {
    setSelectedPassengerCIF(null);
  };

  const onClickSeat = (seat: ISeat) => {
    if (seat.isVacant === false) {
      return;
    }

    // Check if the seat is already chosen
    const isSeatChosen = passengersItems.some(
      (passengerSeat) => passengerSeat.seat?.id === seat.id
    );

    if (isSeatChosen && selectedPassengerCIF === null) {
      const updatedPassengersSeatsList = passengersItems.map(
        (chosenPS: SeatAllocationItem) => {
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
      setPassengerItems(updatedPassengersSeatsList);
      return;
    }

    if (isSeatChosen && selectedPassengerCIF !== null) {
      const updatedPassengersSeatsList = passengersItems.map(
        (chosenPS: SeatAllocationItem) => {
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
        (chosenPS: SeatAllocationItem) => {
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
      setPassengerItems(updatedPassengersSeatsList2);
      return;
    }

    if (!isSeatChosen && selectedPassengerCIF !== null) {
      console.log(!isSeatChosen, selectedPassengerCIF);
      console.log(passengersItems);
      const updatedPassengersSeatsList = passengersItems.map(
        (chosenPS: SeatAllocationItem) => {
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
      setPassengerItems(updatedPassengersSeatsList);
      setSelectedPassengerCIF(null);

      return;
    }
  };

  return (
    <div className='container'>
      <table className='grid'>
        <tbody>
          <tr>
            {seats.map((seat, index) => (
              <td
                className={`seat ${seat.isVacant ? "available" : "reserved"} ${
                  passengersItems.some(
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
        {passengersItems.map((seat) => (
          <div key={seat.seat?.id}>{seat.seat?.seatNumber}</div>
        ))}
        Selected passenger:{selectedPassengerCIF}
        <div>
          {passengersItems.map((passengerSeat, index) => (
            <div>
              #:{index}
              firstName:{passengerSeat.passenger.firstName}, lastName:
              {passengerSeat.passenger.lastName}, email:
              {passengerSeat.passenger.email}, cif:{passengerSeat.passenger.cif}
              THE SEAT: {passengerSeat.seat?.seatNumber}
              <button
                type='button'
                onClick={() =>
                  handleSelectPassenger(passengerSeat.passenger.cif, index)
                }>
                Select seat
              </button>
              {passengerSeat.error && <span>"Select the seat beatch"</span>}
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
