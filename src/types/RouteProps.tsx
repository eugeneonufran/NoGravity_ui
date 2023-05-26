import RouteSegmentProps from "./RouteSegmentProps";

export interface RouteProps {
  id: number;
  routeSegments: RouteSegmentProps[];
  totalPrice: number;
  totalTravelTime: string;
}
