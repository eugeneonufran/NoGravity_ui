import { IPassenger } from "./IPassenger";
import { ISeat } from "./ISeat";

export interface IPassengerWithSeat {
  passenger: IPassenger;
  seat: ISeat;
}
