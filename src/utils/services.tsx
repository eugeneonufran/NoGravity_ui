import { SeatAllocationItem } from "../models/SeatAllocationItem";
import { IPassenger } from "../models/_api/IPassenger";
import { IRoute } from "../models/_api/IRoute";
import { IOrderRequest } from "../models/IOrderRequest";
import { IPassengerWithSeat } from "../models/IPassengerWithSeat";
import {
  PersonalInfoData,
  PersonalInfoItem,
} from "../pages/BookingWizard/PassengersInfoForm";
import { ISeat } from "../models/_api/ISeat";

export const Services = {
  convertToPassengersSeats: (
    passengers: IPassenger[]
  ): SeatAllocationItem[] => {
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

  convertSeatsAllocationToPassengersWithSeats: (
    seatAllocationItems: SeatAllocationItem[]
  ): IPassengerWithSeat[] => {
    return seatAllocationItems
      .filter((item) => item.seat !== null) // Filter out items with null seats
      .map((item) => ({
        passenger: item.passenger,
        seat: item.seat as ISeat, // We are sure it's not null due to the filter
      }));
  },

  convertPassengersWithSeatsToSeatAllocation: (
    passengersWithSeats: IPassengerWithSeat[]
  ): SeatAllocationItem[] => {
    return passengersWithSeats.map((item) => ({
      passenger: item.passenger,
      seat: item.seat,
      error: null,
    }));
  },
};
