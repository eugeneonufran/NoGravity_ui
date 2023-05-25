import React from "react";

interface TicketProps {
  ticket: {
    journeyId: number;
    journeyName: string;
    startStarportId: number;
    startStarportName: string;
    endStarportId: number;
    endStarportName: string;
    passengerFirstName: string;
    passengerSecondName: string;
    CIF: string;
    userId: number;
    userEmail: string;
    seatNumber: number;
  };
}

const TicketComponent: React.FC<TicketProps> = ({ ticket }) => {
  return (
    <div>
      <h3>Ticket Details</h3>
      <p>Journey ID: {ticket.journeyId}</p>
      <p>Journey Name: {ticket.journeyName}</p>
      <p>Start Starport ID: {ticket.startStarportId}</p>
      <p>Start Starport Name: {ticket.startStarportName}</p>
      <p>End Starport ID: {ticket.endStarportId}</p>
      <p>End Starport Name: {ticket.endStarportName}</p>
      <p>Passenger First Name: {ticket.passengerFirstName}</p>
      <p>Passenger Second Name: {ticket.passengerSecondName}</p>
      <p>CIF: {ticket.CIF}</p>
      <p>User ID: {ticket.userId}</p>
      <p>User Email: {ticket.userEmail}</p>
      <p>Seat Number: {ticket.seatNumber}</p>
    </div>
  );
};

export default TicketComponent;
