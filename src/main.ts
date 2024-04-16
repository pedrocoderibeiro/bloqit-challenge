import express, { Express, Request, Response, NextFunction } from "express";

import { bloqRouter } from "./functions/bloq/router";
import { lockerRouter } from "./functions/locker/router";
import { rentRouter } from "./functions/rent/router";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/bloq", bloqRouter);
app.use("/api/locker", lockerRouter);
app.use("/api/rent", rentRouter);

app.use("/", (req: Request, res: Response): void => {
  res.json({ message: "Default Bloq code route" });
});

export default app;
