import { ISeat } from "./_api/ISeat";

export interface IJourneySeatMap {
  journeyId: number;
  seatsAvailable: ISeat[];
}
