import React, { useContext, useState } from "react";
import { PassengersWithSeatsList } from "./PassengersWithSeatsList";
import Route from "../../components/Route";
import { Services } from "../../utils/services";
import { useFetch } from "../../hooks/useFetch";
import { ApiContext } from "../../contexts/ApiContext";
import { AuthContext } from "../../contexts/AuthContext";
import { DataContext } from "../../contexts/DataContext";
import { useNavigate } from "react-router-dom";

interface CheckoutFormProps {
  onBack: () => void;
}

export const CheckoutForm = ({ onBack }: CheckoutFormProps) => {
  const { api_domain } = useContext(ApiContext);
  const { user } = useContext(AuthContext);
  const { orderRouteM, loading } = useFetch(api_domain);
  const { chosenRoute: route, passengersWithSeats } = useContext(DataContext);
  const navigate = useNavigate();

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleOnClickPay = async () => {
    console.log("routeDTO:", route);

    const or = Services.convertToOrderRequest(
      route!,
      passengersWithSeats!,
      user!.id,
      false
    );
    const response = await orderRouteM(or);
    console.log(response);

    const pdfBlob = new Blob([response], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
  };

  const handleOnLogin = () => {
    navigate("/loginFromOrder");
  };
  const handleOnBackingClick = () => {
    onBack();
  };

  return (
    <div>
      <Route route={route!} readonly={true} />
      {passengersWithSeats ? (
        <PassengersWithSeatsList passengers={passengersWithSeats} />
      ) : null}

      {user ? (
        <h1>
          Logged as {user.firstName}, {user.secondName}
        </h1>
      ) : null}

      {user ? (
        <button type='button' onClick={handleOnClickPay}>
          PAY
        </button>
      ) : (
        <button type='button' onClick={handleOnLogin}>
          Login to Pay
        </button>
      )}

      <button type='button' onClick={handleOnBackingClick}>
        back
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
