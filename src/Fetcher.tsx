import React, { useState } from "react";
import TicketComponent from "./TicketComponent";

const TicketFetcher: React.FC = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const response = await fetch("https://localhost:7283/api/Tickets/getall");
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  return (
    <div>
      <h2>Tickets</h2>
      <button onClick={fetchTickets}>Fetch Tickets</button>
      {tickets.map((ticket, index) => (
        <TicketComponent key={index} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketFetcher;
