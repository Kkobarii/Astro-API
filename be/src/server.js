import express from "express";
import cors from "cors";

import { router as planetsRouter } from "./routes/planets.js";
import { router as resourcesRouter } from "./routes/resources.js";
import { router as gasesRouter } from "./routes/gases.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Infernus Ad Astra!");
});

app.use("/planets", planetsRouter);
app.use("/resources", resourcesRouter);
app.use("/gases", gasesRouter);

export { app };
