// ------------ Types Imports ------------
import { IRoute } from "../models/_api/IRoute";
import { IRouteSegment } from "../models/_api/IRouteSegment";
import { IJourneySeatMap } from "../models/IJourneySeatMap";
import { ISeat } from "../models/_api/ISeat";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import "./Route.scss";

// ------------ Component Imports ------------
// Add your component imports here

// ------------ Context Imports ------------

type RouteComponentProps = {
  route: IRoute;
  readonly: boolean;
};

const Route = ({ route, readonly }: RouteComponentProps) => {
  const { setChosenRoute, setCurrentStep, deletePassengers } =
    useContext(DataContext);

  const navigate = useNavigate();

  const handleBookRoute = () => {
    setChosenRoute(route);
    setCurrentStep("passengers");
    navigate(`/bookingWizard/passengers`);
    deletePassengers();
  };

  return (
    <div className='route-container'>
      <h2 className='route-title'>Generated Route: {route.id}</h2>
      <p className='route-info'>Generated ID: {route.id}</p>
      <p className='route-info'>Total Price: {route.totalPrice}</p>
      <p className='route-info'>Total Travel Time: {route.totalTravelTime}</p>

      <h3 className='segment-title'>Route Segments:</h3>
      {route.routeSegments &&
        route.routeSegments.map((segment: IRouteSegment) => (
          <div className='route-segment' key={segment.segmentId}>
            <p className='segment-info'>Segment ID: {segment.segmentId}</p>
            <p className='segment-info'>Journey ID: {segment.journeyId}</p>
            <p className='segment-info'>Segment Price: {segment.price}</p>
            <p className='segment-info'>
              departureDateTime: {segment.departureDateTime}
            </p>
            <p className='segment-info'>
              arrivalDateTime: {segment.arrivalDateTime}
            </p>
            <p className='segment-info'>idleTime: {segment.idleTime}</p>
          </div>
        ))}

      <div>
        {route.journeySeatMap &&
          route.journeySeatMap.map((journey: IJourneySeatMap) => (
            <div>
              <div>Journey {journey.journeyId}</div>

              <div>
                Seats Available:
                {journey.seatsAvailable.map((seat: ISeat) => (
                  <div key={seat.id}>
                    Seat ID: {seat.id}, Segment ID: {seat.segmentId}, Seat
                    Number: {seat.seatNumber}, Is Vacant:{" "}
                    {seat.isVacant ? "Yes" : "No"}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {!readonly && (
        <button className='route button' onClick={handleBookRoute}>
          Order route {route.id}
        </button>
      )}
    </div>
  );
};

export default Route;
