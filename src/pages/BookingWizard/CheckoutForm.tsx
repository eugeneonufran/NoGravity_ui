import React, { useContext, useState } from "react";
import { IPassengerWithSeat } from "../../models/IPassengerWithSeat";
import { PassengersWithSeatsList } from "./PassengersWithSeatsList";
import Route from "../../components/Route";
import { Services } from "../../utils/services";
import { useFetch } from "../../hooks/useFetch";
import { ApiContext } from "../../contexts/ApiContext";

interface CheckoutFormProps {
  passengerWithSeats: IPassengerWithSeat[] | null;
}

export const CheckoutForm = ({ passengerWithSeats }: CheckoutFormProps) => {
  const { api_domain } = useContext(ApiContext);
  const { orderRoute } = useFetch(api_domain);
  const gI = localStorage.getItem("chosenRoute");
  const route = gI ? JSON.parse(gI) : [];

  console.log(passengerWithSeats![0]);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleOnClickPay = async () => {
    const passenger = passengerWithSeats![0];
    console.log("routeDTO:", route);
    const response = await orderRoute(
      route,
      passenger.seat.seatNumber,
      passenger.passenger.name,
      passenger.passenger.surname,
      passenger.passenger.cif,
      1,
      true
    );
    console.log(response);

    const pdfBlob = new Blob([response?.data], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
  };

  return (
    <div>
      <Route route={route} readonly={true} />
      {passengerWithSeats ? (
        <PassengersWithSeatsList passengers={passengerWithSeats} />
      ) : (
        ""
      )}

      <button type='button' onClick={handleOnClickPay}>
        PAY
      </button>

      {pdfUrl && (
        <div>
          {/* Add a link to download the PDF */}
          <a href={pdfUrl} download='ticket.pdf'>
            Download Ticket PDF
          </a>
        </div>
      )}
    </div>
  );
};
