import React, { useState } from "react";

interface RouteFetcherProps {
  onSubmit: (data: {
    departureStarportId: string;
    arrivalStarportId: string;
    date: string;
  }) => void;
}

const RouteFetcher: React.FC<RouteFetcherProps> = ({ onSubmit }) => {
  const [departureStarportId, setDepartureStarportId] = useState("");
  const [arrivalStarportId, setArrivalStarportId] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      departureStarportId,
      arrivalStarportId,
      date,
    });
  };

  return (
    <div>
      <h2>Find Available Routes</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='departure'>Departure Starport:</label>
        <select
          id='departure'
          value={departureStarportId}
          onChange={(e) => setDepartureStarportId(e.target.value)}>
          {/* Render the list of start starports */}
          {/* You can map over the start starports data to generate the options */}
          <option value=''>Select Start Starport</option>
          <option value='1'>Start Starport 1</option>
          <option value='2'>Start Starport 2</option>
          {/* ... */}
        </select>

        <label htmlFor='arrival'>Arrival Starport:</label>
        <select
          id='arrival'
          value={arrivalStarportId}
          onChange={(e) => setArrivalStarportId(e.target.value)}>
          {/* Render the list of end starports */}
          {/* You can map over the end starports data to generate the options */}
          <option value=''>Select End Starport</option>
          <option value='1'>End Starport 1</option>
          <option value='2'>End Starport 2</option>
          {/* ... */}
        </select>

        <label htmlFor='date'>Date:</label>
        <input
          type='date'
          id='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type='submit'>Find Routes</button>
      </form>
    </div>
  );
};

export default RouteFetcher;
