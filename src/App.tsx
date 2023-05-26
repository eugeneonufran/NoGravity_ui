import React, { useState } from "react";
import axios from "axios";
import { ITicket } from "./types/ITicket";

import { Ticket } from "./components/Ticket";

function App() {
  const [tickets, setTickets] = useState<ITicket[]>([]);

  async function fetchTickets() {
    const response = await axios.get<ITicket[]>(
      "https://localhost:7283/api/Tickets/getall"
    );
    setTickets(response.data);
  }

  return (
    <div>
      <button onClick={fetchTickets}>fetch</button>
      {tickets.map((ticket, index) => (
        <Ticket key={index} ticket={ticket} />
      ))}
    </div>
  );
}

export default App;
