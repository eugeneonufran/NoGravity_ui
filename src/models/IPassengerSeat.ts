import { IPassenger } from "./IPassenger";
import { ISeat } from "./ISeat";

export interface IPassengerSeat {
  passenger: IPassenger;
  seat: ISeat | null;
}
