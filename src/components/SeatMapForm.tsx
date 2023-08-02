import { useContext, useEffect, useState } from "react";
import { IPassenger } from "../models/IPassenger";
import { Drawgrid } from "./Drawgrid";
import { useFetch } from "../hooks/useFetch";

import { Services } from "../utils/services";
import { ISeat } from "../models/ISeat";
import { RouteContext } from "../contexts/RouteContext";
import { StepManagerNav } from "../models/StepManagerNav";
import { IPassengerWithSeat } from "../models/IPassengerWithSeat";
import { ApiContext } from "../contexts/ApiContext";

interface SeatMapFormProps {
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

export const SeatMapForm = ({
  passengersList,
  navigate,
  setPassengersWithSeats,
}: SeatMapFormProps) => {
  const { api_domain } = useContext(ApiContext);
  const { chosenRoute } = useContext(RouteContext);

  const { fetchSeatsForRoute, error, loading } = useFetch(api_domain);

  useEffect(() => {
    const fetchData = async () => {
      if (chosenRoute) {
        const response = await fetchSeatsForRoute(chosenRoute);
        if (response) {
          setSeats(response);
        }
      }
    };

    fetchData();
  });

  const [seats, setSeats] = useState<ISeat[]>([]);

  const [passengerItems, setPassengerItems] = useState(
    Services.convertToPassengersSeats(passengersList)
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
