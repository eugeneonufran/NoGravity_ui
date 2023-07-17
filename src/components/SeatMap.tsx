import { useContext, useEffect, useState } from "react";
import { IPassenger } from "../models/IPassenger";
import { Drawgrid } from "./Drawgrid";

import webSettings from "../configs/webSettings.json";
import axios from "axios";
import { ISeat } from "../models/ISeat";
import { RouteContext } from "../contexts/RouteContext";
import { IPassengerSeat } from "../models/IPassengerSeat";

interface SeatMapProps {
  passengersList: IPassenger[];
}

export const SeatMap = ({ passengersList }: SeatMapProps) => {
  const { chosenRoute } = useContext(RouteContext);

  const convertToPassengersSeats = (
    passengers: IPassenger[]
  ): IPassengerSeat[] => {
    return passengers.map((passenger) => ({
      passenger: passenger,
      seat: null,
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

  return (
    <>
      {/* <PassengersList passengers={passengersList} /> */}
      <Drawgrid
        seats={seats}
        passengersSeatsList={convertToPassengersSeats(passengersList)}
      />
    </>
  );
};
