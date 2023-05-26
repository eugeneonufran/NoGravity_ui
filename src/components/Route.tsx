import { RouteProps } from "../types/RouteProps";
import RouteSegmentProps from "../types/RouteSegmentProps";
import React from "react";
import { SeatProps } from "../types/SeatProps";

interface RouteComponentProps {
  route: RouteProps;
}

const RouteComponent: React.FC<RouteComponentProps> = ({ route }) => {
  return (
    <div>
      <h2>Route Details</h2>
      <p>ID: {route.id}</p>
      <p>Total Price: {route.totalPrice}</p>
      <p>Total Travel Time: {route.totalTravelTime}</p>

      <h3>Route Segments:</h3>
      {route.routeSegments.map((segment: RouteSegmentProps) => (
        <div key={segment.segmentId}>
          <p>Segment ID: {segment.segmentId}</p>
          <p>Journey ID: {segment.journeyId}</p>
          {/* Render other segment details */}

          <h4>Available Seats:</h4>
          {segment.seatsAvailable.map((seat: SeatProps) => (
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
