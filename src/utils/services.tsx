import { IPassengerItem } from "../pages/BookingWizard/SeatMapForm";
import { IPassenger } from "../models/IPassenger";
import { IRoute } from "../models/IRoute";
import { IOrderRequest } from "../models/IOrderRequest";
import { IPassengerWithSeat } from "../models/IPassengerWithSeat";
import {
  PersonalInfoData,
  PersonalInfoItem,
} from "../pages/BookingWizard/PassengersInfoForm";

export const Services = {
  convertToPassengersSeats: (passengers: IPassenger[]): IPassengerItem[] => {
    return passengers.map((passenger) => ({
      passenger: passenger,
      seat: null,
      error: null,
    }));
  },

  convertToOrderRequest: (
    route: IRoute,
    passengers: IPassengerWithSeat[],
    userId: number,
    actuallyCreateTicket: boolean
  ): IOrderRequest => {
    return {
      route: route,
      passengers: passengers,
      userId: userId,
      actuallyCreateTicket: actuallyCreateTicket,
    };
  },

  convertToIPassenger: (personalInfo: PersonalInfoItem[]): IPassenger[] => {
    const passengers: IPassenger[] = [];

    personalInfo.forEach((infoItem) => {
      const passenger: IPassenger = {
        firstName: infoItem.firstName.value,
        lastName: infoItem.lastName.value,
        email: infoItem.email.value,
        cif: infoItem.cif.value,
      };

      passengers.push(passenger);
    });

    return passengers;
  },

  convertPassengersToPersonalInfo: (
    passengers: IPassenger[]
  ): PersonalInfoItem[] => {
    const personalInfoArray: PersonalInfoItem[] = passengers.map(
      (passenger) => {
        const personalInfoItem: PersonalInfoItem = {} as PersonalInfoItem;

        Object.keys(passenger).forEach((key) => {
          const typedKey = key as keyof IPassenger; // Use type assertion
          personalInfoItem[typedKey] = {
            value: passenger[typedKey],
            error: null,
          };
        });

        return personalInfoItem;
      }
    );

    return personalInfoArray;
  },
};
