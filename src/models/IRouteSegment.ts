import { ISeat } from "./ISeat";

export interface IRouteSegment {
  segmentId: number;
  journeyId: number;
  departureId: number;
  arrivalId: number;
  departureDateTime: string;
  arrivalDateTime: string;
  order: number;
  price: number;
  travelTime: string;
  idleTime: string | null;
  seatsAvailable: ISeat[];
}
