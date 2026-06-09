interface Flight {
  id: number;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
}

interface Props {
  flight: Flight;
}

export default function FlightDetails({ flight }: Props) {
  return (
    <div className="mb-6 rounded-lg border p-6">
      <h1 className="mb-4 text-2xl font-bold">{flight.airline}</h1>

      <div className="flex justify-between">
        <div>
          <p className="font-semibold">{flight.from}</p>
          <p>{flight.departureTime}</p>
        </div>

        <div>
          <p>{flight.duration}</p>
          <p>{flight.stops === 0 ? "Non Stop" : `${flight.stops} Stop`}</p>
        </div>

        <div>
          <p className="font-semibold">{flight.to}</p>
          <p>{flight.arrivalTime}</p>
        </div>
      </div>

      <h2 className="mt-4 text-xl font-bold">₹{flight.price}</h2>
    </div>
  );
}
