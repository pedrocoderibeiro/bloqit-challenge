import express from "express";
import { LockerController } from "./controller";
import { validateQueryParams } from "../../validators/validator";
import { lockerQueryParams } from "../../schemas/getLockerSchema";

const lockerRouter = express.Router();

lockerRouter.get("/:id", LockerController.getLocker);
lockerRouter.get(
  "/",
  validateQueryParams(lockerQueryParams),
  LockerController.getLockers
);
/*bloqRouter.post(
  "/",
  validateSchema(postBloqRequest),
  BloqController.createBloq
);*/

export { lockerRouter };
