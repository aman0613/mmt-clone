import * as flightRepository from "../repositories/flight.repository";

type FlightFilters = {
  from?: string;
  to?: string;
  stops?: number;
  airlines?: string[];
  maxPrice?: number;
  sortBy?: "price" | "duration";
  sortOrder?: "asc" | "desc";
};

export const getFlights = async (filters: FlightFilters) => {
  return flightRepository.findAll(filters);
};

export const getFlightById = async (id: number) => {
  return flightRepository.findById(id);
};
