import express from "express";
import cors from "cors";
import ticketRoutes from "./routes/ticketRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";
import "./database/database.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use(logger);
app.use("/tickets", ticketRoutes);
app.use(errorHandler);
app.get("/dashboard", (req, res) => {
  res.send("Hello from express");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
