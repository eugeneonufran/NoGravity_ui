// ------------ Library Imports ------------
import { useState, useContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useFetch } from "../../hooks/useFetch";
import LSSettings from "../../configs/storageSettings.json";

// ------------ Types Imports ------------
import { IRoute } from "../../models/IRoute";

// ------------ Component Imports ------------
import { RouteSearchForm } from "./RouteSearchForm";
import { RouteList } from "../../components/RoutesList";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

// ------------ Context Imports ------------
import { ApiContext } from "../../contexts/ApiContext";

import styles from "./BookingRoutes.module.scss";

const BookingRoutes = () => {
  const { api_domain } = useContext(ApiContext);
  const { fetchRoutes, loading, error } = useFetch(api_domain);
  const [, , deleteChosenRoute] = useLocalStorage<IRoute>(
    LSSettings.lsNames.CHOSEN_ROUTE
  );

  const [routes, setRoutes] = useState<IRoute[] | null>(null);

  const handleSubmit = async (
    departureStarportId: number,
    arrivalStarportId: number,
    date: string,
    SortType: number
  ) => {
    const response = await fetchRoutes(
      departureStarportId,
      arrivalStarportId,
      date,
      SortType
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
