import express, { Request, Response, NextFunction } from "express";
import { LockerController } from "./controller";
import {
  validateBloq,
  validateQueryParams,
  validateSchema,
} from "../../helpers/validator";
import { lockerQueryParams } from "../../schemas/getLockerSchema";
import { postLockerRequest } from "src/schemas/postSchema";
import { putLockerRequestSchema } from "src/schemas/putSchema";

const lockerRouter = express.Router();

lockerRouter.get("/:id", LockerController.getLocker);
lockerRouter.get(
  "/",
  validateQueryParams(lockerQueryParams),
  LockerController.getLockers
);
lockerRouter.post(
  "/",
  validateSchema(postLockerRequest),
  LockerController.createLocker
);
lockerRouter.put(
  "/:id",
  validateSchema(putLockerRequestSchema),
  LockerController.updateLocker
);
lockerRouter.delete("/:id", LockerController.deleteLocker);
export { lockerRouter };
