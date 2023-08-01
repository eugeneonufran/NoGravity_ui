// ------------ Library Imports ------------
import { useState, useContext } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useFetch } from "../../hooks/useFetch";

// ------------ Types Imports ------------
import { IRoute } from "../../models/IRoute";

// ------------ Component Imports ------------
import { RouteSearchForm } from "../../components/RouteSearchForm";
import { RouteList } from "../../components/RoutesList";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

// ------------ Context Imports ------------
import { ApiContext } from "../../contexts/ApiContext";

const BookingRoutes = () => {
  const { fetchRoutes, loading, error } = useFetch();
  const { clearLS } = useLocalStorage();
  const [routes, setRoutes] = useState<IRoute[] | null>(null);
  const { api_domain } = useContext(ApiContext);

  const handleSubmit = async (
    departureStarportId: number,
    arrivalStarportId: number,
    date: string,
    SortType: number
  ) => {
    const response = await fetchRoutes(
      api_domain,
      departureStarportId,
      arrivalStarportId,
      date,
      SortType
    );
    clearLS();
    setRoutes(response ? response : null);
  };

  return (
    <div className='container'>
      <h1>ORDER TICKETS</h1>
      <RouteSearchForm onSubmit={handleSubmit} />

      {!loading ? (
        <RouteList routes={routes} />
      ) : (
        <Loading message='Searching for routes...' />
      )}

      <Error message='Error' error={error} />
    </div>
  );
};

export default BookingRoutes;