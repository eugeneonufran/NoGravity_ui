import { NothingToShow } from "../../components/NothingToShow";
import { Ticket } from "../../components/Ticket";
import { ITicket } from "../../models/ITicket";

interface TicketsListProps {
  tickets: ITicket[] | null;
}

export const TicketsList = ({ tickets }: TicketsListProps) => {
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
