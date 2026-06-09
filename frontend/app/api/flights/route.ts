import { NextResponse } from "next/server";

const flights = [
  {
    id: 1,
    airline: "IndiGo",
    from: "Hyderabad",
    to: "Mumbai",
    departureTime: "06:30",
    arrivalTime: "08:45",
    duration: "2h 15m",
    price: 4899,
    stops: 0,
  },

  {
    id: 2,
    airline: "Air India",
    from: "Hyderabad",
    to: "Mumbai",
    departureTime: "09:15",
    arrivalTime: "11:40",
    duration: "2h 25m",
    price: 5320,
    stops: 1,
  },

  {
    id: 3,
    airline: "Vistara",
    from: "Hyderabad",
    to: "Mumbai",
    departureTime: "14:10",
    arrivalTime: "16:20",
    duration: "2h 10m",
    price: 6150,
    stops: 0,
  },

  {
    id: 4,
    airline: "Akasa Air",
    from: "Hyderabad",
    to: "Mumbai",
    departureTime: "18:00",
    arrivalTime: "20:20",
    duration: "2h 20m",
    price: 4550,
    stops: 0,
  },

  {
    id: 5,
    airline: "SpiceJet",
    from: "Hyderabad",
    to: "Mumbai",
    departureTime: "21:10",
    arrivalTime: "23:55",
    duration: "2h 45m",
    price: 4200,
    stops: 1,
  },
];

export async function GET() {
  return NextResponse.json(flights);
}
