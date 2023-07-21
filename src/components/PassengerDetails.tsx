import { useContext, useState } from "react";

import axios from "axios";
import { useEffect } from "react";
import { ISeat } from "../models/ISeat";
import { IPassenger } from "../models/IPassenger";
import { ApiContext } from "../contexts/ApiContext";

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
  const { api_domain } = useContext(ApiContext);

  useEffect(() => {
    const takeJS = localStorage.getItem("passengers");
    const prepassengersList = takeJS
      ? JSON.parse(takeJS)
      : [{ ...initPassenger }];

    setPassengersList(prepassengersList);
  }, []);

  useEffect(() => {
    const getSeatsInfo = async () => {
      try {
        const route2 = localStorage.getItem("chosenRoute");
        const route = route2 ? JSON.parse(route2) : [];

        const response = await axios.post<ISeat[]>(
          `${api_domain}/api/Booking/seats`,
          route
        );
        setAvailableSeats(
          response.data.filter((seat) => seat.isVacant === true)
        );
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getSeatsInfo();
  }, [api_domain]);

  const handleAddPassenger = () => {
    const updatedPassengers = [...passengersList, { ...initPassenger }];
    setPassengersList(updatedPassengers);
    localStorage.setItem("passengers", JSON.stringify(updatedPassengers));
  };

  const handleDeletePassenger = (index: number) => {
    const updatedPassengers = [...passengersList];
    updatedPassengers.splice(index, 1);
    setPassengersList(updatedPassengers);
    localStorage.setItem("passengers", JSON.stringify(updatedPassengers));
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
    localStorage.setItem("passengers", JSON.stringify(updatedPassengers));
  };

  return (
    <>
      <div>
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
