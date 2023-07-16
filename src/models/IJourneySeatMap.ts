import { ISeat } from "./ISeat";

export interface IJourneySeatMap {
  journeyId: number;
  seatsAvailable: ISeat[];
}
