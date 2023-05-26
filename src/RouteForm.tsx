import React, { useState } from "react";
import axios from "axios";

interface RouteFormProps {
  onSubmit: (
    departureStarportId: number,
    arrivalStarportId: number,
    date: string
  ) => void;
}

const RouteForm: React.FC<RouteFormProps> = ({ onSubmit }) => {
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const url = `https://localhost:7283/api/Booking/findroutes?departureStarportId=${startStarportId}&arrivalStarportId=${endStarportId}&date=${date}`;

    try {
      const response = await axios.get(url);

      if (response.status === 200) {
        const data = response.data;
        console.log("Response data:", data);
        // Call the onSubmit prop with the form values
        onSubmit(startStarportId, endStarportId, date);
      } else {
        throw new Error("Error occurred during fetch request");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <h2>Route Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='startStarport'>Start Starport:</label>
        <input
          type='number'
          id='startStarport'
          value={startStarportId}
          onChange={handleStartStarportChange}
        />

        <label htmlFor='endStarport'>End Starport:</label>
        <input
          type='number'
          id='endStarport'
          value={endStarportId}
          onChange={handleEndStarportChange}
        />

        <label htmlFor='date'>Date:</label>
        <input type='date' id='date' value={date} onChange={handleDateChange} />

        <button type='submit'>Fetch</button>
      </form>
    </div>
  );
};

export default RouteForm;
