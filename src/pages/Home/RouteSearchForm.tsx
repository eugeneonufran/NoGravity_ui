// ------------ Types Imports ------------
import { IStarport } from "../../models/_api/IStarport";
import { SortType } from "../../models/SortType";

// ------------ Library Imports ------------
import React, { useState, useEffect, useContext } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

// ------------ Context Imports ------------
import { ApiContext } from "../../contexts/ApiContext";

interface RouteSearchFormProps {
  onSubmit: (
    departureStarportId: number,
    arrivalStarportId: number,
    date: string,
    sortType: number
  ) => void;
}

export const RouteSearchForm = ({ onSubmit }: RouteSearchFormProps) => {
  const { api_domain } = useContext(ApiContext);
  const { fetchPorts, loading, error } = useFetch(api_domain);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const navigate = useNavigate();

  // ------------ State ------------

  const [startStarportId, setStartStarportId] = useState<number>(
    Number(queryParams.get("DeparturePortId")) || 0
  );
  const [endStarportId, setEndStarportId] = useState<number>(
    Number(queryParams.get("DestinationPortId")) || 0
  );
  const [date, setDate] = useState<string>(queryParams.get("date") || "");

  const [startports, setStartports] = useState<IStarport[]>([]);
  const [endports, setEndports] = useState<IStarport[]>([]);

  const [sortType, setSortType] = useState<SortType>(
    Number(queryParams.get("sortType")) || SortType.Optimal
  );

  // ------------ Event Handlers ------------

  const handleSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(Number(e.target.value) as SortType);
  };

  const handleStartStarportChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStartStarportId(Number(e.target.value));
  };

  const handleEndStarportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndStarportId(Number(e.target.value));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(startStarportId, endStarportId, date, sortType);

    const newQueryParams = new URLSearchParams({
      DeparturePortId: String(startStarportId),
      DestinationPortId: String(endStarportId),
      date,
      sortType: String(sortType),
    });
    navigate(`/?${newQueryParams}`);
  };

  // ------------ Side Effects ------------

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchPorts();
      if (response) {
        setStartports(response);
        setEndports(response);
      }
    };

    fetchData();
  }, []);

  const zeroValueDN = loading
    ? "Loading"
    : error
    ? "Error occurred"
    : "---Select Destination Starport---";
  const zeroValueDE = loading
    ? "Loading"
    : error
    ? "Error occurred"
    : "---Select Departure Starport---";

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='startStarport'>Start Starport:</label>
        <select
          id='startStarport'
          name='startStarport'
          value={startStarportId}
          onChange={handleStartStarportChange}>
          <option value={0}>{zeroValueDE}</option>
          {startports.map((startport) => (
            <option key={startport.id} value={startport.id}>
              {startport.name}
            </option>
          ))}
        </select>

        <label htmlFor='endStarport'>End Starport:</label>
        <select
          id='endStarport'
          name='endStarport'
          value={endStarportId}
          onChange={handleEndStarportChange}>
          <option value={0}>{zeroValueDN}</option>
          {endports.map((endport) => (
            <option key={endport.id} value={endport.id}>
              {endport.name}
            </option>
          ))}
        </select>

        <label htmlFor='date'>Date:</label>
        <input
          type='date'
          id='date'
          name='date'
          value={date}
          onChange={handleDateChange}
        />

        <label htmlFor='sortType'>Sort Type:</label>
        <select
          id='sortType'
          name='sortType'
          value={sortType}
          onChange={handleSortTypeChange}>
          <option value={SortType.Optimal}>Optimal</option>
          <option value={SortType.Price}>Price</option>
          <option value={SortType.Time}>Time</option>
        </select>

        <button type='submit'>Fetch</button>
      </form>
    </div>
  );
};
