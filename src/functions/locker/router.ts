import express from "express";
import { LockerController } from "./controller";
import { validateQueryParams, validateSchema } from "@validators/validator";
import {
  putLockerRequestSchema,
  postLockerRequest,
  lockerQueryParams,
} from "@schemas/index";

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
