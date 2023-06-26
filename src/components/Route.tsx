import { IRoute } from "../models/IRoute";
import { IRouteSegment } from "../models/IRouteSegment";
import { ISeat } from "../models/ISeat";
import { FC } from "react";
import "../styles/Route.css"; // Import the CSS file

interface RouteComponentProps {
  route: IRoute;
}

const Route: FC<RouteComponentProps> = ({ route }) => {
  return (
    <div className='route-container'>
      <h2 className='route-title'>Route: {route.id}</h2>
      <p className='route-info'>ID: {route.id}</p>
      <p className='route-info'>Total Price: {route.totalPrice}</p>
      <p className='route-info'>Total Travel Time: {route.totalTravelTime}</p>

      <h3 className='segment-title'>Route Segments:</h3>
      {route.routeSegments &&
        route.routeSegments.map((segment: IRouteSegment) => (
          <div className='route-segment' key={segment.segmentId}>
            <p className='segment-info'>Segment ID: {segment.segmentId}</p>
            <p className='segment-info'>Journey ID: {segment.journeyId}</p>
            <p className='segment-info'>Segment Price: {segment.price}</p>

            <h4 className='seat-title'>Available Seats:</h4>
            <div className='seat-container'>
              {segment.seatsAvailable.map((seat: ISeat) => (
                <div className='seat' key={seat.id}>
                  <p className='seat-info'>Seat Number: {seat.seatNumber}</p>
                  <p className='seat-info'>
                    Is Vacant: {seat.isVacant ? "Yes" : "No"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Route;
