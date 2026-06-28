import { FlightModel } from "../models/flight.model";

type FlightFilters = {
  from?: string;
  to?: string;
  stops?: number;
  airlines?: string[];
  maxPrice?: number;
  sortBy?: "price" | "duration";
  sortOrder?: "asc" | "desc";
};

export const findAll = async (filters: FlightFilters) => {
  const query: Record<string, unknown> = {};

  if (filters.from) {
    query.from = filters.from;
  }

  if (filters.to) {
    query.to = filters.to;
  }

  if (filters.stops !== undefined) {
    query.stops = filters.stops;
  }

  if (filters.airlines && filters.airlines.length > 0) {
    query.airline = {
      $in: filters.airlines,
    };
  }
  if (filters.maxPrice !== undefined) {
    query.price = { $lte: filters.maxPrice };
  }

  const sort: Record<string, 1 | -1> = {};

  if (filters.sortBy) {
    const sortField =
      filters.sortBy === "duration" ? "durationMinutes" : "price";

    sort[sortField] = filters.sortOrder === "desc" ? -1 : 1;
  }

  return FlightModel.find(query).sort(sort);
};

export const findById = async (id: number) => {
  return FlightModel.findOne({ id });
};
