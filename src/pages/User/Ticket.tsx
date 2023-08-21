import React, { useContext, useEffect, useState } from "react";
import { ITicket } from "../../models/_api/ITicket";
import styles from "./Ticket.module.scss";
import { useFetch } from "../../hooks/useFetch";
import { ApiContext } from "../../contexts/ApiContext";

interface ITicketProps {
  ticket: ITicket;
}

export const Ticket = ({ ticket }: ITicketProps) => {
  const { api_domain } = useContext(ApiContext);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { getTicketPDFByPath, error, loading } = useFetch(api_domain);

  useEffect(() => {
    const fetchData = async () => {
      console.log("ticket.file_path:", ticket.filePath);
      const response = await getTicketPDFByPath(ticket.filePath);
      const pdfUrl = URL.createObjectURL(response);
      setPdfUrl(pdfUrl);
    };

    fetchData();
  }, []);
  return (
    <div className={styles.ticket}>
      <h3>Ticket Details</h3>
      <p>Id: {ticket.id}</p>
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
      <p>Path: {ticket.filePath}</p>
      {pdfUrl ? (
        <a href={pdfUrl} download='ticket.pdf'>
          Download Ticket PDF
        </a>
      ) : null}
    </div>
  );
};
