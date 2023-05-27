import React, { useState } from "react";
import axios from "axios";
import { ITicket } from "./types/ITicket";

import { Ticket } from "./components/Ticket";
import Booking from "./components/Booking";

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
      <Booking />
    </div>
  );
}

export default App;
