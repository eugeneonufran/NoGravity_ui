import { IRoute } from "../types/IRoute";
import { IRouteSegment } from "../types/IRouteSegment";
import { ISeat } from "../types/ISeat";
import React from "react";

interface RouteComponentProps {
  route: IRoute;
}

const RouteComponent: React.FC<RouteComponentProps> = ({ route }) => {
  return (
    <div>
      <h2>Route Details</h2>
      <p>ID: {route.id}</p>
      <p>Total Price: {route.totalPrice}</p>
      <p>Total Travel Time: {route.totalTravelTime}</p>

      <h3>Route Segments:</h3>
      {route.routeSegments.map((segment: IRouteSegment) => (
        <div key={segment.segmentId}>
          <p>Segment ID: {segment.segmentId}</p>
          <p>Journey ID: {segment.journeyId}</p>
          {/* Render other segment details */}

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

export default RouteComponent;
