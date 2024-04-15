import express from "express";
import { BloqController } from "./controller";
import { validateSchema } from "src/helpers/validator";
import { postBloqRequest } from "src/schemas/postBloqRequestSchema";
import { bloqQueryParams } from "src/schemas/getSchema";
import { putBloqRequestSchema } from "src/schemas/putSchema";

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
