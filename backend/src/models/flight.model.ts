import { Schema, model } from "mongoose";

const flightSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    airline: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    durationMinutes: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stops: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const FlightModel = model("Flight", flightSchema);
