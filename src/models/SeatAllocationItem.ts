import { IPassenger } from "./_api/IPassenger";
import { ISeat } from "./_api/ISeat";

export interface SeatAllocationItem {
  passenger: IPassenger;
  seat: ISeat | null;
  error: string | null;
}
