// ------------ Types Imports ------------
import { IStarport } from "../models/IStarport";
import { SortType } from "../models/SortType";

// ------------ Library Imports ------------
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

// ------------ Context Imports ------------
import { ApiContext } from "../contexts/ApiContext";

interface RouteSearchFormProps {
  onSubmit: (
    departureStarportId: number,
    arrivalStarportId: number,
    date: string,
    sortType: number
  ) => void;
}

const RouteSearchForm = ({ onSubmit }: RouteSearchFormProps) => {
  const { api_domain } = useContext(ApiContext);

  // ------------ State ------------

  const [startStarportId, setStartStarportId] = useState<number>(0);
  const [endStarportId, setEndStarportId] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  const [startports, setStartports] = useState<IStarport[]>([]);
  const [endports, setEndports] = useState<IStarport[]>([]);

  const [sortType, setSortType] = useState<SortType>(SortType.Optimal);

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
  };

  // ------------ Side Effects ------------

  useEffect(() => {
    const fetchStartports = async () => {
      try {
        const response = await axios.get<IStarport[]>(
          `${api_domain}/api/Starports/getall`
        );
        setStartports(response.data);
        setEndports(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchStartports();
  }, [api_domain]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='startStarport'>Start Starport:</label>
        <select
          id='startStarport'
          name='startStarport'
          value={startStarportId}
          onChange={handleStartStarportChange}>
          <option value={0}>---Select Departure Starport---</option>
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
          <option value={0}>---Select Destination Starport---</option>
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

export default RouteSearchForm;
