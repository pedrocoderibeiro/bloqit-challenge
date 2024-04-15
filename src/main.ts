import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { bloqRouter } from "./functions/bloq/router";
import { lockerRouter } from "./functions/locker/router";
import { rentRouter } from "./functions/rent/router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/bloq", bloqRouter);
app.use("/api/locker", lockerRouter);
app.use("/api/rent", rentRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
