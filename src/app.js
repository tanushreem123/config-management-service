import express from "express";
import configRoutes from "./routes/configRoutes.js";

const app = express();

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Register config routes
app.use("/api", configRoutes);

export default app;
