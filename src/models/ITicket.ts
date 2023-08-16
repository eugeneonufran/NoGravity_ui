export interface ITicket {
  id: string;
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
}
