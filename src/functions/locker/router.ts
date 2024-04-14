import express, { Request, Response, NextFunction } from "express";
import { LockerController } from "./controller";
import {
  validateBloq,
  validateQueryParams,
  validateSchema,
} from "../../validators/validator";
import { lockerQueryParams } from "../../schemas/getLockerSchema";
import { postLockerRequest } from "src/schemas/postSchema";

const lockerRouter = express.Router();

lockerRouter.get("/:id", LockerController.getLocker);
lockerRouter.get(
  "/",
  validateQueryParams(lockerQueryParams),
  LockerController.getLockers
);
lockerRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //First function validates if property bloqId matches with a existing bloq, otherwise return 404
      await validateBloq(req, res, () => {
        validateSchema(postLockerRequest)(req, res, () => {
          LockerController.createLocker(req, res);
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

export { lockerRouter };
