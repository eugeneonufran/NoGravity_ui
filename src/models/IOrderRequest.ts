import { IPassengerWithSeat } from "./IPassengerWithSeat";
import { IRoute } from "./_api/IRoute";

export interface IOrderRequest {
  route: IRoute;
  passengers: IPassengerWithSeat[];
  userId: number;
  actuallyCreateTicket: boolean;
}
