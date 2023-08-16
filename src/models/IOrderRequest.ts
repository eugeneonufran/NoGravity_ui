import { IPassengerWithSeat } from "./IPassengerWithSeat";
import { IRoute } from "./IRoute";

export interface IOrderRequest {
  route: IRoute;
  passengers: IPassengerWithSeat[];
  userId: number;
  actuallyCreateTicket: boolean;
}
