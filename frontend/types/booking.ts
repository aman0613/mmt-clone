import { Flight } from "./flight";
import { Traveller } from "./traveller";

export interface Booking extends Flight {
  bookingId: number;
  status: "ACTIVE" | "CANCELLED";
  bookedAt?: string;
  travellers?: Traveller[];
}
