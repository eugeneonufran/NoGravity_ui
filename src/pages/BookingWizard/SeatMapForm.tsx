import { useContext, useEffect, useState } from "react";
import { IPassenger } from "../../models/_api/IPassenger";
import { Drawgrid } from "./Drawgrid";
import { useFetch } from "../../hooks/useFetch";

import { Services } from "../../utils/services";
import { ISeat } from "../../models/_api/ISeat";
import { IPassengerWithSeat } from "../../models/IPassengerWithSeat";
import { ApiContext } from "../../contexts/ApiContext";
import { DataContext } from "../../contexts/DataContext";
import { SeatAllocationItem } from "../../models/SeatAllocationItem";

interface SeatMapFormProps {
  passengersList: IPassenger[];
  setPassengersWithSeats: React.Dispatch<
    React.SetStateAction<IPassengerWithSeat[] | null>
  >;
  onNext: () => void;
  onBack: () => void;
}

export const SeatMapForm = ({
  passengersList,
  onNext,
  onBack,
  setPassengersWithSeats,
}: SeatMapFormProps) => {
  const { api_domain } = useContext(ApiContext);
  const {
    chosenRoute,
    currentStep,
    setCurrentStep,
    passengersWithSeats,
    setPassengersWithSeats: setPassengersAndSeats,
  } = useContext(DataContext);

  const { fetchSeatsForRoute, error, loading } = useFetch(api_domain);

  const [seats, setSeats] = useState<ISeat[]>([]);

  const [seatAllocationItems, setSeatAllocationItems] = useState(
    Services.convertToPassengersSeats(passengersList)
  );

  useEffect(() => {
    const fetchData = async () => {
      if (chosenRoute) {
        const response = await fetchSeatsForRoute(chosenRoute);
        if (response) {
          setSeats(response);
        }
      }
    };

    if (currentStep === "checkout" && passengersWithSeats) {
      const updatedSeatAllocationItems =
        Services.convertPassengersWithSeatsToSeatAllocation(
          passengersWithSeats
        );
      setSeatAllocationItems(updatedSeatAllocationItems);
    }

    fetchData();
  }, []);

  const validate = () => {
    const updateSeatAllocationItems = [...seatAllocationItems];

    updateSeatAllocationItems.forEach((passenger) => {
      if (passenger.seat === null) {
        passenger.error = "Huy";
      }
    });

    setSeatAllocationItems(updateSeatAllocationItems);
    const updatedPassengersWithSeats: IPassengerWithSeat[] =
      updateSeatAllocationItems
        .filter((seatAllocationItem) => seatAllocationItem.seat !== null) // Filter out items with null seats
        .map((seatAllocationItem) => ({
          passenger: seatAllocationItem.passenger,
          seat: seatAllocationItem.seat!,
        }));

    setPassengersWithSeats(updatedPassengersWithSeats);

    const allSeatsNotNull = seatAllocationItems.every((seatAllocationItem) => {
      return seatAllocationItem.seat !== null;
    });

    if (allSeatsNotNull) {
      setCurrentStep("checkout");
      setPassengersAndSeats(updatedPassengersWithSeats);
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
        passengersItems={seatAllocationItems}
        setPassengerItems={setSeatAllocationItems}
      />

      <button type='button' onClick={handleBack}>
        Back
      </button>

      <button type='button' onClick={validate}>
        Next
      </button>
    </div>
  );
};
