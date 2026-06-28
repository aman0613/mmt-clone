import { Booking } from "@/types/booking";
import { API_BASE_URL } from "./api";
import { clearAuthData, getAuthToken } from "./authService";

type ApiErrorResponse = {
  message?: string;
};

export class BookingApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "BookingApiError";
    this.status = status;
  }
}

const getErrorMessage = async (response: Response): Promise<string> => {
  const errorData: ApiErrorResponse = await response.json().catch(() => ({}));

  return errorData.message || "Something went wrong. Please try again.";
};

const getAuthorizationHeaders = (): HeadersInit => {
  const token = getAuthToken();

  if (!token) {
    throw new BookingApiError("You must log in to manage bookings.", 401);
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

const handleBookingError = async (response: Response): Promise<never> => {
  const message = await getErrorMessage(response);

  if (response.status === 401) {
    clearAuthData();
  }

  throw new BookingApiError(message, response.status);
};

export const getBookings = async (): Promise<Booking[]> => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    headers: getAuthorizationHeaders(),
  });

  if (!response.ok) {
    return handleBookingError(response);
  }

  return response.json();
};

export const getBookingById = async (bookingId: number): Promise<Booking> => {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
    headers: getAuthorizationHeaders(),
  });

  if (!response.ok) {
    return handleBookingError(response);
  }

  return response.json();
};

export const createBooking = async (booking: Booking): Promise<Booking> => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationHeaders(),
    },
    body: JSON.stringify(booking),
  });

  if (!response.ok) {
    return handleBookingError(response);
  }

  return response.json();
};

export const cancelBooking = async (bookingId: number): Promise<Booking> => {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
    method: "PATCH",
    headers: getAuthorizationHeaders(),
  });

  if (!response.ok) {
    return handleBookingError(response);
  }

  return response.json();
};
