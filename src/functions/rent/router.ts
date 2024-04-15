import express, { Request, Response, NextFunction } from "express";
import { RentController } from "./controller";

const rentRouter = express.Router();

rentRouter.get("/:id", RentController.getRent);
rentRouter.get("/", RentController.getRent);
rentRouter.post("/", RentController.createRent);

export { rentRouter };
