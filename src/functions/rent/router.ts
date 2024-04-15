import express, { Request, Response, NextFunction } from "express";
import { RentController } from "./controller";

const rentRouter = express.Router();

rentRouter.get("/:id", RentController.getRent);
rentRouter.get("/", RentController.getRent);
rentRouter.post("/", RentController.createRent);
rentRouter.put("/:id", RentController.updateRent);
rentRouter.delete(":/id", RentController.deleteRent);
export { rentRouter };
