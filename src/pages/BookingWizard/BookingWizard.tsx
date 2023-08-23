import { IPassenger } from "../../models/_api/IPassenger";
import { CheckoutForm } from "./CheckoutForm";
import { SeatMapForm } from "./SeatMapForm";
import { useContext, useState } from "react";
import { PassengersInfoForm } from "./PassengersInfoForm";
import { IPassengerWithSeat } from "../../models/IPassengerWithSeat";
import { useNavigate, useParams } from "react-router-dom";
import mapper from "../../models/Mapper";
import { DataContext } from "../../contexts/DataContext";
import { NotFound } from "../NotFound/NotFound";
import Breadcrumbs from "./Breadcrumbs";

export const BookingWizard = () => {
  const initPassenger = { firstName: "", lastName: "", email: "", cif: "" };
  const [passengersList, setPassengersList] = useState<IPassenger[]>([
    initPassenger,
  ]);

  const { currentStep, queryParams } = useContext(DataContext);

  const { step } = useParams();

  const currentStepURL = step ? mapper[step] : 0;

  const navigator = useNavigate();

  const [passengersWithSeats, setPassengersWithSeats] = useState<
    IPassengerWithSeat[] | null
  >(null);

  const stepForms = [
    <PassengersInfoForm
      onNext={() => navigator(`/bookingWizard/seat-map`)}
      onBack={() => navigator(queryParams ? queryParams : `/`)}
      setPassengersInfo={setPassengersList}
    />,
    <SeatMapForm
      passengersList={passengersList}
      onNext={() => navigator(`/bookingWizard/checkout`)}
      onBack={() => navigator(`/bookingWizard/passengers`)}
      setPassengersWithSeats={setPassengersWithSeats}
    />,
    <CheckoutForm onBack={() => navigator(`/bookingWizard/seat-map`)} />,
  ];

  return (
    <div>
      {currentStepURL === undefined || currentStepURL > mapper[currentStep!] ? (
        <NotFound />
      ) : (
        <div>
          <Breadcrumbs />
          <form>{stepForms[currentStepURL]}</form>
        </div>
      )}
    </div>
  );
};
