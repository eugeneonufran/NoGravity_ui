import { SeatProps } from "./SeatProps";

export default interface RouteSegmentProps {
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
  seatsAvailable: SeatProps[];
}
