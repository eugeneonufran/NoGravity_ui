import React, { FC, useState } from "react";
import axios from "axios";

interface RouteFormProps {
  onSubmit: (
    departureStarportId: number,
    arrivalStarportId: number,
    date: string
  ) => void;
}

const RouteForm: FC<RouteFormProps> = ({ onSubmit }) => {
  const [startStarportId, setStartStarportId] = useState<number>(0);
  const [endStarportId, setEndStarportId] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  const handleStartStarportChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartStarportId(Number(e.target.value));
  };

  const handleEndStarportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndStarportId(Number(e.target.value));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(startStarportId, endStarportId, date);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='startStarport'>Start Starport:</label>
        <input
          type='number'
          id='startStarport'
          name='startStarport'
          value={startStarportId}
          onChange={handleStartStarportChange}
        />

        <label htmlFor='endStarport'>End Starport:</label>
        <input
          type='number'
          id='endStarport'
          name='endStarport'
          value={endStarportId}
          onChange={handleEndStarportChange}
        />

        <label htmlFor='date'>Date:</label>
        <input
          type='date'
          id='date'
          name='date'
          value={date}
          onChange={handleDateChange}
        />

        <button type='submit'>Fetch</button>
      </form>
    </div>
  );
};

export default RouteForm;
