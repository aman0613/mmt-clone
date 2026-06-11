import { Flight } from "./flight";

export interface Traveller {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type BookingStatus = "ACTIVE" | "CANCELLED";

export interface Booking extends Flight {
  bookingId: number;
  status: BookingStatus;
  bookedAt?: string;
  traveller?: Traveller;
}
