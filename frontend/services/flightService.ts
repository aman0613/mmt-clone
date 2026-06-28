import { Flight } from "@/types/flight";

const API_BASE_URL = "http://localhost:5000/api/v1";

type GetFlightsParams = {
  from?: string;
  to?: string;
  stops?: number;
  airlines?: string[];
  sortBy?: "price" | "duration";
  sortOrder?: "asc" | "desc";
  maxPrice?: number;
};

export const getFlights = async (
  params: GetFlightsParams = {},
): Promise<Flight[]> => {
  const searchParams = new URLSearchParams();

  if (params.from) {
    searchParams.set("from", params.from);
  }

  if (params.to) {
    searchParams.set("to", params.to);
  }

  if (params.stops !== undefined) {
    searchParams.set("stops", String(params.stops));
  }
  if (params.maxPrice !== undefined) {
    searchParams.set("maxPrice", String(params.maxPrice));
  }
  if (params.airlines && params.airlines.length > 0) {
    searchParams.set("airlines", params.airlines.join(","));
  }

  if (params.sortBy) {
    searchParams.set("sortBy", params.sortBy);
  }

  if (params.sortOrder) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  const queryString = searchParams.toString();

  const response = await fetch(
    `${API_BASE_URL}/flights${queryString ? `?${queryString}` : ""}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch flights");
  }

  return response.json();
};

export const getFlightById = async (id: string | number): Promise<Flight> => {
  const response = await fetch(`${API_BASE_URL}/flights/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch flight");
  }

  return response.json();
};
