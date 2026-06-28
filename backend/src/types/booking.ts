import { Flight } from "./flight";

export interface Traveller {
  fullName: string;
  email: string;
  phone: string;
}

export type BookingStatus = "ACTIVE" | "CANCELLED";

export interface Booking extends Flight {
  bookingId: number;
  status: BookingStatus;
  bookedAt?: string;
  travellers: Traveller[];
  departureDate?: string;
}
