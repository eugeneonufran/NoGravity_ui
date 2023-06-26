import { IRoute } from "../models/IRoute";
import Route from "./Route";

interface RouteListProps {
  routes: IRoute[] | null;
}

export const RouteList: React.FC<RouteListProps> = ({ routes }) => {
  return (
    <div>
      <h2>Route List</h2>
      {routes?.map((route) => (
        <div key={route.id}>
          <Route route={route} />
        </div>
      ))}
    </div>
  );
};
