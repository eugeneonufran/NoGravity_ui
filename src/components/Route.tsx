// ------------ Types Imports ------------
import { IRoute } from "../models/IRoute";
import { IRouteSegment } from "../models/IRouteSegment";
import { IJourneySeatMap } from "../models/IJourneySeatMap";
import { ISeat } from "../models/ISeat";

// ------------ Style Imports ------------

// ------------ Library Imports ------------
import React from "react";

import { useNavigate } from "react-router-dom";

// ------------ Component Imports ------------
// Add your component imports here

// ------------ Context Imports ------------
import { RouteContext } from "../contexts/RouteContext";
import { useContext } from "react";

type RouteComponentProps = {
  route: IRoute;
};

const Route = ({ route }: RouteComponentProps) => {
  const navigate = useNavigate();

  const { setChosenRoute } = useContext(RouteContext);

  const handleBookRoute = () => {
    setChosenRoute(route);
    localStorage.setItem("chosenRoute", JSON.stringify(route));
    navigate("/BookingForm");
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
        {route.journeySeatMaps &&
          route.journeySeatMaps.map((journey: IJourneySeatMap) => (
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

      <button className='route button' onClick={handleBookRoute}>
        Order route {route.id}
      </button>
    </div>
  );
};

export default Route;
