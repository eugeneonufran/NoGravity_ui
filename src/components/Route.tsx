import { IRoute } from "../types/IRoute";
import { IRouteSegment } from "../types/IRouteSegment";
import { ISeat } from "../types/ISeat";
import { FC } from "react";

interface RouteComponentProps {
  route: IRoute;
}

const Route: FC<RouteComponentProps> = ({ route }) => {
  return (
    <div>
      <h2>Route :{route.id}</h2>
      <p>ID: {route.id}</p>
      <p>Total Price: {route.totalPrice}</p>
      <p>Total Travel Time: {route.totalTravelTime}</p>

      <h3>Route Segments:</h3>
      {route.routeSegments &&
        route.routeSegments.map((segment: IRouteSegment) => (
          <div key={segment.segmentId}>
            <p>Segment ID: {segment.segmentId}</p>
            <p>Journey ID: {segment.journeyId}</p>
            <p>Segment Price: {segment.price}</p>

            <h4>Available Seats:</h4>
            {segment.seatsAvailable.map((seat: ISeat) => (
              <div key={seat.id}>
                <p>Seat Number: {seat.seatNumber}</p>
                <p>Is Vacant: {seat.isVacant ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Route;
