import { Flight } from "@/types/flight";
import { API_BASE_URL } from "./api";

export const getFlights = async (
  from?: string,
  to?: string,
): Promise<Flight[]> => {
  console.trace("getflight");
  const params = new URLSearchParams();

  if (from) {
    params.append("from", from);
  }

  if (to) {
    params.append("to", to);
  }

  const response = await fetch(`${API_BASE_URL}/flights?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch flights");
  }

  return response.json();
};

export const getFlightById = async (id: string): Promise<Flight> => {
  const response = await fetch(`${API_BASE_URL}/flights/${id}`);

  if (!response.ok) {
    throw new Error("Flight not found");
  }

  return response.json();
};
