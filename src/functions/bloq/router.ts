import express from "express";
import { BloqController } from "./controller";
import { validateSchema } from "@validators/index";
import {
  putBloqRequestSchema,
  postBloqRequest,
  bloqQueryParams,
} from "@schemas/index";

const bloqRouter = express.Router();

bloqRouter.get("/:id", BloqController.getBloq);
bloqRouter.get("/", validateSchema(bloqQueryParams), BloqController.getBloqs);
bloqRouter.post(
  "/",
  validateSchema(postBloqRequest),
  BloqController.createBloq
);
bloqRouter.put(
  "/:id",
  validateSchema(putBloqRequestSchema),
  BloqController.updateBloq
);
bloqRouter.delete("/:id", BloqController.deleteBloq);
export { bloqRouter };
