import { connectDatabase } from "../config/database";
import { FlightModel } from "../models/flight.model";
import { flights } from "../data/flights";

const seedFlights = async () => {
  try {
    await connectDatabase();

    await FlightModel.deleteMany({});

    await FlightModel.insertMany(flights);

    console.log("Flights seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed", error);

    process.exit(1);
  }
};

seedFlights();
