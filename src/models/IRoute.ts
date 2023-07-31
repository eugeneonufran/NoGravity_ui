import { IJourneySeatMap } from "./IJourneySeatMap";
import { IRouteSegment } from "./IRouteSegment";

export interface IRoute {
  id: number;
  routeSegments: IRouteSegment[];
  journeySeatMap: IJourneySeatMap[];
  totalPrice: number;
  totalTravelTime: string;
}
