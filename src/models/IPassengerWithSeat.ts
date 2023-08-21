import { IPassenger } from "./_api/IPassenger";
import { ISeat } from "./_api/ISeat";

export interface IPassengerWithSeat {
  passenger: IPassenger;
  seat: ISeat;
}
