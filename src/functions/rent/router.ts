import express from "express";
import { RentController } from "./controller";
import { validateQueryParams, validateSchema } from "@validators/validator";
import {
  rentQueryParams,
  postRentRequest,
  putRentRequestSchema,
} from "@schemas/index";

const rentRouter = express.Router();

rentRouter.get("/:id", RentController.getRent);
rentRouter.get(
  "/",
  validateQueryParams(rentQueryParams),
  RentController.getRent
);
rentRouter.post(
  "/",
  validateSchema(postRentRequest),
  RentController.createRent
);
rentRouter.put(
  "/:id",
  validateSchema(putRentRequestSchema),
  RentController.updateRent
);
rentRouter.delete(":/id", RentController.deleteRent);
export { rentRouter };
