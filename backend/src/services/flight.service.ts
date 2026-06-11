import { Flight } from "../types/flight";
import { flights } from "../data/flights";

export const getFlights = (from?: string, to?: string): Flight[] => {
  let filteredFlights = flights;

  if (from) {
    filteredFlights = filteredFlights.filter(
      (flight) => flight.from.toLowerCase() === from.toLowerCase(),
    );
  }

  if (to) {
    filteredFlights = filteredFlights.filter(
      (flight) => flight.to.toLowerCase() === to.toLowerCase(),
    );
  }

  return filteredFlights;
};

export const getFlightById = (id: number): Flight | undefined => {
  return flights.find((flight) => flight.id === id);
};
