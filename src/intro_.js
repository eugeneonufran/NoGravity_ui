import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [seatReserved, setSeatReserved] = useState([]);

  const onClickSeat = (seat) => {
    setSeatReserved((prevReserved) => {
      if (prevReserved.includes(seat)) {
        return prevReserved.filter((res) => res !== seat);
      } else {
        return [...prevReserved, seat];
      }
    });
  };

  return (
    <div>
      <h1>Seat Reservation System</h1>
      <DrawGrid reserved={seatReserved} onClickSeat={onClickSeat} />
    </div>
  );
}

function DrawGrid({ reserved, onClickSeat }) {
  const seats = [
    "Front1",
    "Front2",
    "Front3",
    "Middle1",
    "Middle2",
    "Middle3",
    "Back1",
    "Back2",
    "Back3",
  ];

  return (
    <div className='container'>
      <table className='grid'>
        <tbody>
          <tr>
            {seats.map((seat) => (
              <td
                className={reserved.includes(seat) ? "reserved" : "available"}
                key={seat}
                onClick={() => onClickSeat(seat)}>
                {seat}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <SeatList seats={seats} reserved={reserved} />
    </div>
  );
}

function SeatList({ seats, reserved }) {
  const availableSeats = seats.filter((seat) => !reserved.includes(seat));

  return (
    <div className='seat-list'>
      <h4>
        Available Seats:{" "}
        {availableSeats.length === 0
          ? "No seats available"
          : availableSeats.length}
      </h4>
      <ul>
        {availableSeats.map((seat) => (
          <li key={seat}>{seat}</li>
        ))}
      </ul>
      <h4>Reserved Seats: ({reserved.length})</h4>
      <ul>
        {reserved.map((seat) => (
          <li key={seat}>{seat}</li>
        ))}
      </ul>
    </div>
  );
}
