import { useContext, useEffect, useState } from "react";
import { IPassenger } from "../../models/IPassenger";
import { Drawgrid } from "./Drawgrid";
import { useFetch } from "../../hooks/useFetch";

import { Services } from "../../utils/services";
import { ISeat } from "../../models/ISeat";
import { IPassengerWithSeat } from "../../models/IPassengerWithSeat";
import { ApiContext } from "../../contexts/ApiContext";
import { DataContext } from "../../contexts/DataContext";

interface SeatMapFormProps {
  passengersList: IPassenger[];
  setPassengersWithSeats: React.Dispatch<
    React.SetStateAction<IPassengerWithSeat[] | null>
  >;
  onNext: () => void;
  onBack: () => void;
}

export interface IPassengerItem {
  passenger: IPassenger;
  seat: ISeat | null;
  error: string | null;
}

export const SeatMapForm = ({
  passengersList,
  onNext,
  onBack,
  setPassengersWithSeats,
}: SeatMapFormProps) => {
  const { api_domain } = useContext(ApiContext);
  const { chosenRoute, setCurrentStep } = useContext(DataContext);

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
      setCurrentStep("checkout");
      onNext();
    }
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Drawgrid
        seats={seats}
        passengersItems={passengerItems}
        setPassengerItems={setPassengerItems}
      />

      <button type='button'>Finish</button>

      <button type='button' onClick={handleBack}>
        Back
      </button>

      <button type='button' onClick={validate}>
        Next
      </button>
    </div>
  );
};
