import { IRouteSegment } from "./IRouteSegment";

export interface IRoute {
  id: number;
  routeSegments: IRouteSegment[];
  totalPrice: number;
  totalTravelTime: string;
}
