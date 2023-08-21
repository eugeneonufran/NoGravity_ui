import { NothingToShow } from "../../components/NothingToShow";
import { Ticket } from "./Ticket";
import { ITicket } from "../../models/_api/ITicket";

interface TicketsListProps {
  tickets: ITicket[] | null;
}

export const TicketsList = ({ tickets }: TicketsListProps) => {
  console.log("tickets:", tickets);
  return (
    <div>
      <h2>Tickets List</h2>
      {tickets && tickets?.length !== 0 ? (
        tickets.map((ticket) => <Ticket key={ticket.id} ticket={ticket} />)
      ) : (
        <NothingToShow message={"No tickets...yet..."} />
      )}
    </div>
  );
};
