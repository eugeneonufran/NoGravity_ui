import React, { useContext, useState } from "react";
import { IPassengerWithSeat } from "../../models/IPassengerWithSeat";
import { PassengersWithSeatsList } from "./PassengersWithSeatsList";
import Route from "../../components/Route";
import { Services } from "../../utils/services";
import { useFetch } from "../../hooks/useFetch";
import { ApiContext } from "../../contexts/ApiContext";
import stSettings from "../../configs/storageSettings.json";
import { AuthContext } from "../../contexts/AuthContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { IRoute } from "../../models/IRoute";
import { DataContext } from "../../contexts/DataContext";

interface CheckoutFormProps {
  passengerWithSeats: IPassengerWithSeat[] | null;
}

export const CheckoutForm = ({ passengerWithSeats }: CheckoutFormProps) => {
  const { api_domain } = useContext(ApiContext);
  const { user } = useContext(AuthContext);
  const { orderRouteM, loading } = useFetch(api_domain);
  const { chosenRoute: route } = useContext(DataContext);

  console.log(passengerWithSeats![0]);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleOnClickPay = async () => {
    console.log("routeDTO:", route);

    const or = Services.convertToOrderRequest(
      route!,
      passengerWithSeats!,
      user!.id,
      false
    );
    const response = await orderRouteM(or);
    console.log(response);

    const pdfBlob = new Blob([response], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
  };

  return (
    <div>
      <Route route={route!} readonly={true} />
      {passengerWithSeats ? (
        <PassengersWithSeatsList passengers={passengerWithSeats} />
      ) : (
        ""
      )}

      <button type='button' onClick={handleOnClickPay}>
        PAY
      </button>

      {!loading && pdfUrl && (
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
