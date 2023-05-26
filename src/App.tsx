import React from "react";
import RouteForm from "./RouteForm";
import RouteComponent from "./components/Route";

const App: React.FC = () => {
  const [routes, setRoutes] = useState<RouteProps[]>([]);

  const handleSubmit = async (
    departureStarportId: number,
    arrivalStarportId: number,
    date: string
  ) => {
    const url = `https://localhost:7283/api/Booking/findroutes?departureStarportId=${departureStarportId}&arrivalStarportId=${arrivalStarportId}&date=${date}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error occurred during fetch request");
      }

      const data = await response.json();
      setRoutes(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <h1>My App</h1>
      <RouteForm onSubmit={handleSubmit} />
      {routes.map((route) => (
        <Route key={route.id} route={route} />
      ))}
    </div>
  );
};

export default App;
