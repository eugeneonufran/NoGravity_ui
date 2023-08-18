import { IPassenger } from "../../models/IPassenger";
import { CheckoutForm } from "./CheckoutForm";
import { SeatMapForm } from "./SeatMapForm";
import { useState } from "react";
import { PassengersInfoForm } from "./PassengersInfoForm";
import { IPassengerWithSeat } from "../../models/IPassengerWithSeat";
import { useNavigate, useParams } from "react-router-dom";
import mapper from "../../models/Mapper";

export const BookingWizard = () => {
  const initPassenger = { firstName: "", lastName: "", email: "", cif: "" };
  const [passengersList, setPassengersList] = useState<IPassenger[]>([
    initPassenger,
  ]);

  const { step } = useParams();

  const currentStep = step ? mapper[step] - 1 : 1;
  const navigator = useNavigate();

  const [passengersWithSeats, setPassengersWithSeats] = useState<
    IPassengerWithSeat[] | null
  >(null);

  const stepForms = [
    <PassengersInfoForm
      onNext={() => navigator(`/bookingWizard/seat-map`)}
      onBack={() => navigator(`/bookingWizard/passengers`)}
      setPassengersInfo={setPassengersList}
    />,
    <SeatMapForm
      passengersList={passengersList}
      onNext={() => navigator(`/bookingWizard/checkout`)}
      onBack={() => navigator(`/bookingWizard/seat-map`)}
      setPassengersWithSeats={setPassengersWithSeats}
    />,
    <CheckoutForm passengerWithSeats={passengersWithSeats} />,
  ];

  return (
    <div>
      <form>{stepForms[currentStep]}</form>
    </div>
  );
};
