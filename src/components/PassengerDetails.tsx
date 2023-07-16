import { useContext, useState } from "react";
import { RouteContext } from "../contexts/RouteContext";

import webSettings from "../configs/webSettings.json";

import axios from "axios";
import { useEffect } from "react";
import { ISeat } from "../models/ISeat";
import { IPassenger } from "../models/IPassenger";

interface PassengerDetailsProps {
  passengersList: IPassenger[];
  initPassenger: IPassenger;
  setPassengersList: (passengers: IPassenger[]) => void;
}

export const PassengerDetails = ({
  passengersList,
  initPassenger,
  setPassengersList,
}: PassengerDetailsProps) => {
  const { chosenRoute } = useContext(RouteContext);
  // const storedRoute = localStorage.getItem("chosenRoute");
  // const chosenRoute = storedRoute ? JSON.parse(storedRoute) : null;

  useEffect(() => {
    getSeatsInfo();
  });

  const getSeatsInfo = async () => {
    try {
      const response = await axios.post<ISeat[]>(
        `${webSettings.api_domain}/api/Booking/seats`,
        chosenRoute
      );
      setAvailableSeats(response.data.filter((seat) => seat.isVacant === true));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleAddPassenger = () => {
    setPassengersList([...passengersList, initPassenger]);
  };

  const handleDeletePassenger = (index: number) => {
    const updatedPassengers = [...passengersList];
    updatedPassengers.splice(index, 1);
    setPassengersList(updatedPassengers);
  };

  const [availableSeats, setAvailableSeats] = useState<ISeat[]>([]);

  const handleChangePassenger = (
    index: number,
    field: keyof IPassenger,
    value: string
  ) => {
    const updatedPassengers = [...passengersList];
    updatedPassengers[index][field] = value;
    setPassengersList(updatedPassengers);
  };

  return (
    <>
      <div>
        <h1>Route id:{chosenRoute?.id}</h1>
        <h2>Available seats:{availableSeats.length}</h2>
      </div>
      <div>
        Enter the passengers:
        {passengersList.map((passenger, index) => (
          <div key={index}>
            Passenger # {index}
            <input
              type='text'
              placeholder='Name'
              value={passenger.name}
              onChange={(event) =>
                handleChangePassenger(index, "name", event.target.value)
              }
            />
            <input
              type='text'
              placeholder='Surname'
              value={passenger.surname}
              onChange={(event) =>
                handleChangePassenger(index, "surname", event.target.value)
              }
            />
            <input
              type='text'
              placeholder='Email'
              value={passenger.email}
              onChange={(event) =>
                handleChangePassenger(index, "email", event.target.value)
              }
            />
            <input
              type='text'
              placeholder='CIF'
              value={passenger.cif}
              onChange={(event) =>
                handleChangePassenger(index, "cif", event.target.value)
              }
            />
            {passengersList.length !== 1 && (
              <button
                type='button'
                onClick={() => handleDeletePassenger(index)}>
                -
              </button>
            )}
          </div>
        ))}
        {availableSeats.length > passengersList.length && (
          <button type='button' onClick={handleAddPassenger}>
            +
          </button>
        )}
      </div>
    </>
  );
};
