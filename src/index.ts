import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { bloqRouter } from "./functions/bloq/router";
import { lockerRouter } from "./functions/locker/router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/bloq", bloqRouter);
app.use("/api/locker", lockerRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
