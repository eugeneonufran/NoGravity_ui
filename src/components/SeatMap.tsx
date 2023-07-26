import { useContext, useEffect, useState } from "react";
import { IPassenger } from "../models/IPassenger";
import { Drawgrid } from "./Drawgrid";

import webSettings from "../configs/webSettings.json";
import axios from "axios";
import { ISeat } from "../models/ISeat";
import { RouteContext } from "../contexts/RouteContext";
import { StepManagerNav } from "../models/StepManagerNav";
import { IPassengerWithSeat } from "../models/IPassengerWithSeat";

interface SeatMapProps {
  passengersList: IPassenger[];
  setPassengersWithSeats: React.Dispatch<
    React.SetStateAction<IPassengerWithSeat[] | null>
  >;
  onNext: () => void;
  onBack: () => void;
  navigate: StepManagerNav;
}

export interface IPassengerItem {
  passenger: IPassenger;
  seat: ISeat | null;
  error: string | null;
}

export const SeatMap = ({
  passengersList,
  navigate,
  setPassengersWithSeats,
}: SeatMapProps) => {
  const { chosenRoute } = useContext(RouteContext);

  const convertToPassengersSeats = (
    passengers: IPassenger[]
  ): IPassengerItem[] => {
    return passengers.map((passenger) => ({
      passenger: passenger,
      seat: null,
      error: null,
    }));
  };

  useEffect(() => {
    getSeatsInfo();
  });

  const getSeatsInfo = async () => {
    try {
      const response = await axios.post<ISeat[]>(
        `${webSettings.api_domain}/api/Booking/seats`,
        chosenRoute
      );
      setSeats(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const [seats, setSeats] = useState<ISeat[]>([]);

  const [passengerItems, setPassengerItems] = useState(
    convertToPassengersSeats(passengersList)
  );

  const validate = () => {
    const updatePassengerItems = [...passengerItems];

    updatePassengerItems.forEach((passenger) => {
      if (passenger.seat === null) {
        passenger.error = "Huy";
      }
    });

    setPassengerItems(updatePassengerItems);
    const updatedPassengersWithSeats: IPassengerWithSeat[] =
      updatePassengerItems
        .filter((passengerItem) => passengerItem.seat !== null) // Filter out items with null seats
        .map((passengerItem) => ({
          passenger: passengerItem.passenger,
          seat: passengerItem.seat!,
        }));

    setPassengersWithSeats(updatedPassengersWithSeats);

    const allSeatsNotNull = updatePassengerItems.every((passenger) => {
      return passenger.seat !== null;
    });

    if (allSeatsNotNull) {
      navigate.goForward();
    }
  };

  return (
    <>
      <Drawgrid
        seats={seats}
        passengersItems={passengerItems}
        setPassengerItems={setPassengerItems}
      />

      {navigate.isLastStep && <button type='button'>Finish</button>}
      {!navigate.isFirstStep && (
        <button type='button' onClick={navigate.goBackward}>
          Back
        </button>
      )}
      {!navigate.isLastStep && (
        <button type='button' onClick={validate}>
          Next
        </button>
      )}
    </>
  );
};
