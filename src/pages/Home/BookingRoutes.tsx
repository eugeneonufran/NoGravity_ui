// ------------ Library Imports ------------
import { useState, useContext } from "react";
import { useFetch } from "../../hooks/useFetch";

// ------------ Types Imports ------------
import { IRoute } from "../../models/_api/IRoute";

// ------------ Component Imports ------------
import { RouteSearchForm } from "./RouteSearchForm";
import { RouteList } from "../../components/RoutesList";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

// ------------ Context Imports ------------
import { ApiContext } from "../../contexts/ApiContext";

import styles from "./BookingRoutes.module.scss";
import { DataContext } from "../../contexts/DataContext";
import { RouteSearchFormParameters } from "../../models/_uitypes/RouteSearchFormParameters";

const BookingRoutes = () => {
  const { api_domain } = useContext(ApiContext);
  const { fetchRoutes, loading, error } = useFetch(api_domain);
  const { deleteChosenRoute } = useContext(DataContext);

  const [routes, setRoutes] = useState<IRoute[] | null>(null);

  const handleSubmit = async (params: RouteSearchFormParameters) => {
    const response = await fetchRoutes(
      params.departureStarportId,
      params.arrivalStarportId,
      params.date,
      params.sortType,
      params.numberOfPassengers
    );
    deleteChosenRoute();
    setRoutes(response ? response : null);
  };

  return (
    <div id='booking_routes' className={styles.booking_routes}>
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
