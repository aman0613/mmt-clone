import express from "express";
import cors from "cors";

import { env } from "./config/env";
import { connectDatabase } from "./config/database";
import apiRoutes from "./routes/index";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

app.use("/api/v1", apiRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "MMT Backend Running",
  });
});

const startServer = async () => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer();
